import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Users, Zap, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface SearchResult {
  labs: any[];
  equipment: any[];
  researchers: any[];
  query?: any;
}

export default function SearchResults() {
  const [, setLocation] = useLocation();
  const [results, setResults] = useState<SearchResult | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"labs" | "equipment">("labs");

  useEffect(() => {
    const storedResults = sessionStorage.getItem("lastSearchResults");
    const storedQuery = sessionStorage.getItem("lastSearchQuery");

    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
    if (storedQuery) {
      setSearchQuery(storedQuery);
    }
  }, []);

  const searchMutation = trpc.search.semantic.useMutation();

  const handleNewSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const newResults = await searchMutation.mutateAsync({ query: searchQuery });
      setResults(newResults);
      sessionStorage.setItem("lastSearchResults", JSON.stringify(newResults));
      sessionStorage.setItem("lastSearchQuery", searchQuery);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
        <div className="container py-20">
          <p className="text-muted-foreground">Loading search results...</p>
        </div>
      </div>
    );
  }

  const labs = results.labs || [];
  const equipment = results.equipment || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b border-border/40 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <form onSubmit={handleNewSearch} className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Refine your search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm bg-white"
              />
              <Button type="submit" size="sm">
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="container py-12">
        {/* Category Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border/40 pb-4">
          <button
            onClick={() => setSelectedCategory("labs")}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              selectedCategory === "labs"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Labs ({labs.length})
          </button>
          <button
            onClick={() => setSelectedCategory("equipment")}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              selectedCategory === "equipment"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Equipment ({equipment.length})
          </button>
        </div>

        {/* Labs Results */}
        {selectedCategory === "labs" && (
          <div className="space-y-4">
            {labs.length === 0 ? (
              <Card className="p-8 text-center border-border/40 bg-white/80">
                <p className="text-muted-foreground">No labs found matching your search.</p>
              </Card>
            ) : (
              labs.map((lab) => (
                <Card
                  key={lab.id}
                  className="p-6 hover:shadow-md transition-all cursor-pointer group border-border/40 bg-white/90 backdrop-blur-sm"
                  onClick={() => setLocation(`/labs/${lab.id}`)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold group-hover:text-accent transition" style={{color: '#046c10'}}>
                        {lab.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{lab.department}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="font-semibold">{lab.impactScore}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Impact</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{lab.description}</p>

                  <div className="flex flex-wrap gap-3 mb-3 text-xs">
                    {lab.location && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {lab.location}
                      </div>
                    )}
                    {lab.publicationsCount > 0 && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {lab.publicationsCount} Pubs
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {Array.isArray(lab.researchFields) &&
                      lab.researchFields.slice(0, 2).map((field: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium"
                          style={{color: '#046c10'}}
                        >
                          {field}
                        </span>
                      ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto text-xs h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation(`/labs/${lab.id}`);
                    }}
                  >
                    View Details
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Equipment Results */}
        {selectedCategory === "equipment" && (
          <div className="space-y-4">
            {equipment.length === 0 ? (
              <Card className="p-8 text-center border-border/40 bg-white/80">
                <p className="text-muted-foreground">No equipment found matching your search.</p>
              </Card>
            ) : (
              equipment.map((item) => (
                <Card
                  key={item.id}
                  className="p-6 hover:shadow-md transition-all cursor-pointer group border-border/40 bg-white/90 backdrop-blur-sm"
                  onClick={() => setLocation(`/equipment/${item.id}`)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold group-hover:text-accent transition">
                        {item.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {item.manufacturer} {item.model && `- ${item.model}`}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-4 ${
                        item.bookingStatus === "available"
                          ? "bg-green-100/50 text-green-700"
                          : item.bookingStatus === "booked"
                            ? "bg-yellow-100/50 text-yellow-700"
                            : "bg-red-100/50 text-red-700"
                      }`}
                    >
                      {item.bookingStatus}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

                  {Array.isArray(item.capabilities) && item.capabilities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.capabilities.slice(0, 3).map((cap: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto mt-2 text-xs h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation(`/equipment/${item.id}`);
                    }}
                  >
                    View Details
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
