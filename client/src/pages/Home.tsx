import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Microscope, Zap, Users, ArrowRight, Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import AISearchBar from "@/components/AISearchBar";
import ResearchNetworkAnimation from "@/components/ResearchNetworkAnimation";
import ContactCard from "@/components/ContactCard";
import ForestBackground from "@/components/ForestBackground";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const handleSearchResults = (results: any) => {
    sessionStorage.setItem("lastSearchResults", JSON.stringify(results));
    setLocation("/search-results");
  };

  return (
    <div className="min-h-screen relative bg-white">
      {/* Forest background */}
      <div className="fixed inset-0 z-0">
        <ForestBackground />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-white/80 via-blue-50/40 to-purple-50/30">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Microscope className="w-5 h-5 text-accent" style={{backgroundColor: '#3e3c3c'}} />
            </div>
            <span className="font-semibold text-lg">ResearchHub</span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Button variant="outline" size="sm" onClick={() => setLocation("/dashboard")}>
                  Dashboard
                </Button>
              </>
            ) : (
              <Button size="sm" asChild>
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Headline */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">AI-Powered Research Matching</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                Connect with Research
                <br />
                <span className="text-accent" style={{color: '#226241'}}>Excellence</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Find university labs, equipment, and researchers for your collaboration. 
                Powered by AI-driven semantic search that understands your research needs.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={() => setLocation("/search-results")}>
                Explore Labs <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div>
                <p className="text-2xl font-bold" style={{color: '#226241'}}>5</p>
                <p className="text-xs text-muted-foreground">Research Labs</p>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{color: '#226241'}}>4</p>
                <p className="text-xs text-muted-foreground">Expert Researchers</p>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{color: '#226241'}}>5</p>
                <p className="text-xs text-muted-foreground">Equipment Items</p>
              </div>
            </div>
          </div>

          {/* Right: Animation */}
          <div className="h-96 md:h-full min-h-96">
            <ResearchNetworkAnimation />
          </div>
        </div>
      </section>

      {/* AI Search Bar */}
      <section className="container py-12 border-t border-border/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Search for Research Opportunities</h2>
          <AISearchBar onResults={handleSearchResults} />
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 border-t border-border/40">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 border-border/40 hover:border-border hover:shadow-sm transition-all group cursor-pointer">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/15 transition">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-semibold text-base mb-2">AI-Powered Search</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Natural language queries matched to the right labs and equipment using semantic AI.
            </p>
          </Card>

          <Card className="p-6 border-border/40 hover:border-border hover:shadow-sm transition-all group cursor-pointer">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/15 transition">
              <Microscope className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-semibold text-base mb-2">Comprehensive Labs</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Access detailed information about UEF research facilities and capabilities.
            </p>
          </Card>

          <Card className="p-6 border-border/40 hover:border-border hover:shadow-sm transition-all group cursor-pointer">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/15 transition">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-semibold text-base mb-2">Expert Researchers</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect with leading researchers and their expertise across disciplines.
            </p>
          </Card>
        </div>
      </section>

      {/* Department Colors Preview */}
      <section className="container py-16 border-t border-border/40">
        <h2 className="text-2xl font-bold mb-8 text-center">Featured Research Areas</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { name: "Photonics", color: "#6366f1", light: "#e0e7ff" },
            { name: "Chemistry", color: "#f97316", light: "#fed7aa" },
            { name: "Forestry", color: "#22c55e", light: "#dcfce7" },
            { name: "XR & Tech", color: "#a855f7", light: "#f3e8ff" },
            { name: "Resources", color: "#06b6d4", light: "#cffafe" },
          ].map((dept, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-border/40 hover:shadow-md transition-all cursor-pointer"
              style={{ backgroundColor: dept.light }}
            >
              <div
                className="w-8 h-8 rounded-lg mb-3"
                style={{ backgroundColor: dept.color }}
              />
              <h3 className="font-semibold text-sm" style={{ color: dept.color }}>
                {dept.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="container py-16 border-t border-border/40">
        <h2 className="text-2xl font-bold mb-8 text-center">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <ContactCard
            name="General Inquiries"
            email="info@uef.fi"
            phone="+358 50 000 0000"
            location="Joensuu Campus, Finland"
            departmentColor="#6366f1"
            departmentColorLight="#e0e7ff"
          />
          <ContactCard
            name="Research Partnerships"
            email="research@uef.fi"
            phone="+358 50 111 1111"
            website="https://www.uef.fi"
            departmentColor="#22c55e"
            departmentColorLight="#dcfce7"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 border-t border-border/40">
        <div className="bg-card border border-border/40 rounded-2xl p-8 md:p-12 text-center space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Ready to collaborate?</h2>
            <p className="text-muted-foreground">
              Search for labs and equipment, then submit a collaboration request directly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => setLocation("/search-results")}>
              Browse All Labs <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/20 py-8 mt-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8 text-sm">
            <div>
              <h4 className="font-semibold mb-3 text-base">About</h4>
              <p className="text-muted-foreground">
                AI Research Collaboration Platform for UEF Joensuu Campus.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-base">For Companies</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Find Labs</a></li>
                <li><a href="#" className="hover:text-foreground transition">Browse Equipment</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact Researchers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-base">For Researchers</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Manage Profile</a></li>
                <li><a href="#" className="hover:text-foreground transition">View Requests</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-base">Contact</h4>
              <p className="text-muted-foreground">
                University of Eastern Finland<br />
                Joensuu Campus
              </p>
            </div>
          </div>
          <div className="border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
            <p>&copy; 2026 Ashik Elahee. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
