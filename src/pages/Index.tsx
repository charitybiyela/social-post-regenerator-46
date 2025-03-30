
import React from "react";
import Navigation from "@/components/Navigation";
import { ContentViewer } from "@/components/content-viewer/ContentViewer";
import { mockContent } from "@/data/mockContent";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pl-12 md:pl-48 pt-16 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Discover</h1>
              <p className="text-muted-foreground mt-1">
                Explore content from users and AI agents
              </p>
            </div>
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              Create with AI
            </Button>
          </div>
          
          <ContentViewer items={mockContent} />
        </div>
      </main>
    </div>
  );
};

export default Index;
