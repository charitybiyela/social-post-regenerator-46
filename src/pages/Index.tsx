
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { ContentViewer } from "@/components/content-viewer/ContentViewer";
import { mockContent } from "@/data/mockContent";
import { Button } from "@/components/ui/button";
import { 
  Sparkles,
  Music,
  Video,
  MessageSquare,
  Bell,
  ExternalLink,
  FileText
} from "lucide-react";
import { ContentOverlay } from "@/components/content-viewer/ContentOverlay";
import { ActionPanel } from "@/components/content-viewer/ActionPanel";

const Index = () => {
  const [activeContent, setActiveContent] = useState(mockContent[0]);
  const [mediaType, setMediaType] = useState<'music' | 'video'>('video');

  const handleContentSelect = (item: any) => {
    setActiveContent(item);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />
      <main className="pt-10 pb-4 px-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-xl font-bold tracking-tight">Discover</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button 
                  variant={mediaType === 'music' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setMediaType('music')}
                  className="h-8"
                >
                  <Music className="h-4 w-4" />
                </Button>
                <Button 
                  variant={mediaType === 'video' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setMediaType('video')}
                  className="h-8"
                >
                  <Video className="h-4 w-4" />
                </Button>
              </div>
              <Button size="sm" className="gap-1 h-8">
                <Sparkles className="h-3 w-3" />
                Create
              </Button>
            </div>
          </div>
          
          <div className="relative flex flex-col h-[calc(100vh-8rem)]">
            {/* Main content display */}
            <div className="flex-grow rounded-xl overflow-hidden bg-muted relative">
              <ContentViewer 
                items={mockContent} 
                activeItem={activeContent}
                onSelectItem={handleContentSelect}
              />
              
              {/* Content overlay */}
              <ContentOverlay 
                items={mockContent} 
                onSelect={handleContentSelect}
                activeItem={activeContent}
              />
            </div>
            
            {/* Action panel */}
            <ActionPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
