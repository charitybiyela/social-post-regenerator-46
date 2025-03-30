
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { ContentViewer } from "@/components/content-viewer/ContentViewer";
import { mockContent } from "@/data/mockContent";
import { Button } from "@/components/ui/button";
import { 
  Music,
  Video,
  Sparkles,
} from "lucide-react";
import { ContentOverlay } from "@/components/content-viewer/ContentOverlay";
import { AgentOverlay } from "@/components/content-viewer/AgentOverlay";
import { ActionPanel } from "@/components/content-viewer/ActionPanel";
import { toast } from "sonner";

// Define the content item type to ensure consistency
interface ContentItem {
  id: number;
  title: string;
  content: string;
  author: string;
  isAI: boolean;
  timestamp: string;
  media?: {
    type: string;
    url?: string;
  }[];
  tags: string[];
}

const Index = () => {
  const [activeContent, setActiveContent] = useState<ContentItem>(mockContent[0]);
  const [mediaType, setMediaType] = useState<'music' | 'video'>('video');
  const [postsOverlayVisible, setPostsOverlayVisible] = useState(true);
  const [agentOverlayVisible, setAgentOverlayVisible] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);

  const handleContentSelect = (item: ContentItem) => {
    setActiveContent(item);
  };

  const toggleDimBackground = () => {
    setIsDimmed(prev => !prev);
  };

  const handleMediaTypeChange = (type: 'music' | 'video') => {
    setMediaType(type);
    
    // Create media content based on selected type without scroll effect
    const mediaContent: ContentItem = {
      id: Date.now(),
      title: type === 'music' ? "Music Player" : "Video Player",
      content: `This is a ${type} player. In a real application, this would play actual ${type} content.`,
      author: "Media System",
      isAI: false,
      timestamp: new Date().toLocaleString(),
      media: [{ type }],
      tags: [type, "media", "player"]
    };
    
    setActiveContent(mediaContent);
    toast.success(`Switched to ${type} player`);
  };

  const handleCreateContent = () => {
    // Display a toast notification
    toast.success("Create functionality would open here");
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
                  onClick={() => handleMediaTypeChange('music')}
                  className="h-8"
                >
                  <Music className="h-4 w-4" />
                </Button>
                <Button 
                  variant={mediaType === 'video' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => handleMediaTypeChange('video')}
                  className="h-8"
                >
                  <Video className="h-4 w-4" />
                </Button>
              </div>
              <Button size="sm" className="gap-1 h-8" onClick={handleCreateContent}>
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
                isDimmed={isDimmed && (postsOverlayVisible || agentOverlayVisible)}
              />
              
              {/* Live Posts overlay (right side) */}
              <ContentOverlay 
                items={mockContent} 
                onSelect={handleContentSelect}
                activeItem={activeContent}
                visible={postsOverlayVisible}
                onClose={() => setPostsOverlayVisible(false)}
              />

              {/* Agent overlay (left side) */}
              <AgentOverlay 
                visible={agentOverlayVisible}
                onClose={() => setAgentOverlayVisible(false)}
                onSendToMain={(item) => {
                  // Add the generated item to the mock content temporarily
                  // Create a properly typed item that matches our ContentItem interface
                  const newItem: ContentItem = { 
                    ...item, 
                    id: Date.now(),
                    isAI: true,
                    media: item.media || [],
                    tags: item.tags || []
                  };
                  // For demo purposes, we're just setting it as active
                  setActiveContent(newItem);
                  
                  // Show success toast
                  toast.success("Content loaded from agent");
                }}
              />
              
              {/* Action panel at the bottom */}
              <ActionPanel 
                onTogglePosts={() => setPostsOverlayVisible(prev => !prev)}
                postsVisible={postsOverlayVisible}
                onToggleAgent={() => setAgentOverlayVisible(prev => !prev)}
                agentVisible={agentOverlayVisible}
                onDimBackground={toggleDimBackground}
                isDimmed={isDimmed}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
