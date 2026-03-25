import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface AISearchBarProps {
  onSearch?: (query: string) => void;
  onResults?: (results: any) => void;
}

export default function AISearchBar({ onSearch, onResults }: AISearchBarProps) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchMutation = trpc.search.semantic.useMutation();

  // AI-powered search suggestions
  const exampleQueries = [
    "I need photonics laser measurement equipment",
    "Looking for wood durability testing services",
    "Chemical analysis for material characterization",
    "VR and simulation technology research",
    "Water quality analysis and environmental testing",
  ];

  useEffect(() => {
    if (query.length > 2) {
      // Filter suggestions based on input
      const filtered = exampleQueries.filter(q =>
        q.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowSuggestions(false);

    try {
      const results = await searchMutation.mutateAsync({ query: searchQuery });
      onResults?.(results);
      onSearch?.(searchQuery);
      sessionStorage.setItem("lastSearchResults", JSON.stringify(results));
      sessionStorage.setItem("lastSearchQuery", searchQuery);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        {/* Main Search Input */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-accent/10 to-accent/5 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative flex items-center gap-3 bg-card/80 backdrop-blur-sm border-2 border-accent/20 rounded-2xl p-4 shadow-lg hover:shadow-xl hover:border-accent/40 transition-all duration-300">
            {/* Search Icon */}
            <div className="flex-shrink-0">
              {isSearching ? (
                <Loader2 className="w-6 h-6 text-accent animate-spin" />
              ) : (
                <Search className="w-6 h-6 text-accent" />
              )}
            </div>

            {/* Input Field */}
            <Input
              ref={inputRef}
              type="text"
              placeholder="Describe your research need... (e.g., 'I need photonics laser measurement')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(query);
                }
              }}
              onFocus={() => query.length > 2 && setShowSuggestions(true)}
              disabled={isSearching}
              className="flex-1 border-0 bg-transparent placeholder-muted-foreground/40 focus:outline-none focus:ring-0 text-base"
            />

            {/* AI Badge */}
            <div className="flex items-center gap-1 px-3 py-1 bg-accent/10 rounded-full text-xs font-medium text-accent whitespace-nowrap">
              <Sparkles className="w-3 h-3" />
              AI Powered
            </div>

            {/* Search Button */}
            <Button
              onClick={() => handleSearch(query)}
              disabled={isSearching || !query.trim()}
              className="flex-shrink-0 gap-2"
              size="lg"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  Search
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* AI Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <Card className="absolute top-full left-0 right-0 mt-3 p-3 border-accent/20 shadow-xl z-50 bg-card/95 backdrop-blur-sm">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground px-2">AI Suggestions</p>
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-3 rounded-lg hover:bg-accent/10 transition-colors group"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {suggestion}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Example Queries */}
        {!query && (
          <div className="absolute top-full left-0 right-0 mt-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground px-2">Try asking:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {exampleQueries.slice(0, 4).map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(example)}
                  className="text-left p-3 rounded-lg bg-card/50 border border-border/40 hover:border-accent/40 hover:bg-accent/5 transition-all group"
                >
                  <p className="text-xs text-muted-foreground group-hover:text-accent transition-colors line-clamp-2">
                    {example}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Status */}
      {isSearching && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <Loader2 className="w-4 h-4 text-accent animate-spin" />
            <span className="text-sm text-accent">Searching labs and equipment...</span>
          </div>
        </div>
      )}
    </div>
  );
}
