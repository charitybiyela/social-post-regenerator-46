
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { ContentViewer } from "@/components/content-viewer/ContentViewer";
import { mockContent } from "@/data/mockContent";
import { Button } from "@/components/ui/button";
import { 
  Music,
  Video,
} from "lucide-react";
import { ContentOverlay } from "@/components/content-viewer/ContentOverlay";
import { AgentOverlay } from "@/components/content-viewer/AgentOverlay";
import { ActionPanel } from "@/components/content-viewer/ActionPanel";
import { CreateContent } from "@/components/content-viewer/CreateContent";
import { toast } from "sonner";

// Define the content item type to ensure consistency
interface ContentItem {
  id: number | string;
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
  const [contentItems, setContentItems] = useState<ContentItem[]>(mockContent);
  const [activeContent, setActiveContent] = useState<ContentItem>(mockContent[0]);
  const [mediaType, setMediaType] = useState<'music' | 'video'>('video');
  const [postsOverlayVisible, setPostsOverlayVisible] = useState(true);
  const [agentOverlayVisible, setAgentOverlayVisible] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleContentSelect = (item: ContentItem) => {
    setActiveContent(item);
    // Reset play state when selecting new content
    setIsPlaying(false);
  };

  const toggleDimBackground = () => {
    setIsDimmed(prev => !prev);
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleMediaTypeChange = (type: 'music' | 'video') => {
    setMediaType(type);
    
    // Create media content based on selected type without scroll effect
    const mediaContent: ContentItem = {
      id: Date.now(),
      title: type === 'music' ? "Music Player" : "Video Player",
      content: `This is a ${type} player. In a real application, this would play actual ${type} content.`,
      author: "System",
      isAI: false,
      timestamp: new Date().toISOString(),
      media: [{ type }],
      tags: [type, "media", "player"]
    };
    
    setActiveContent(mediaContent);
    toast.success(`Switched to ${type} player`);
  };

  const handleContentCreate = (newContent: ContentItem) => {
    // Add the new content to the state
    setContentItems(prev => [newContent, ...prev]);
    
    // Set it as the active content
    setActiveContent(newContent);
    
    // If it's a Twitter embed, it might need a moment to load
    if (newContent.media && newContent.media[0].type === "website" && 
        (newContent.media[0].url?.includes("twitter.com") || newContent.media[0].url?.includes("x.com"))) {
      toast.info("Twitter content is loading...");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation onCreateClick={() => setCreateDialogOpen(true)} />
      
      {/* Main content area - pushing closer to top */}
      <main className="pt-[3rem]">
        <div className="h-[calc(100vh-3rem)] flex flex-col">
          <div className="relative flex-1 mx-2 mb-2">
            {/* Main content display */}
            <div className="h-full rounded-xl overflow-hidden backdrop-blur-sm relative border border-border/30 shadow-sm">
              <ContentViewer 
                items={contentItems} 
                activeItem={activeContent}
                onSelectItem={handleContentSelect}
                isDimmed={isDimmed && (postsOverlayVisible || agentOverlayVisible)}
                isPlaying={isPlaying}
                togglePlayPause={togglePlayPause}
                mediaType={mediaType}
              />
              
              {/* Media control overlays - centered horizontally at the same height */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-10 w-10 bg-background/20 backdrop-blur-md border-primary/30 hover:bg-background/30 transition-all shadow-lg"
                  onClick={() => handleMediaTypeChange('music')}
                >
                  <Music className="h-5 w-5 text-primary" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-10 w-10 bg-background/20 backdrop-blur-md border-primary/30 hover:bg-background/30 transition-all shadow-lg"
                  onClick={() => handleMediaTypeChange('video')}
                >
                  <Video className="h-5 w-5 text-primary" />
                </Button>
              </div>
              
              {/* Live Posts overlay - now draggable */}
              <ContentOverlay 
                items={contentItems} 
                onSelect={handleContentSelect}
                activeItem={activeContent}
                visible={postsOverlayVisible}
                onClose={() => setPostsOverlayVisible(false)}
              />

              {/* Agent overlay - now draggable */}
              <AgentOverlay 
                visible={agentOverlayVisible}
                onClose={() => setAgentOverlayVisible(false)}
                onSendToMain={(item) => {
                  // Add the generated item to the content items
                  const newItem: ContentItem = { 
                    ...item, 
                    id: Date.now(),
                    isAI: true,
                    media: item.media || [],
                    tags: item.tags || []
                  };
                  
                  // Add to content list and set as active
                  setContentItems(prev => [newItem, ...prev]);
                  setActiveContent(newItem);
                  
                  // Show success toast
                  toast.success("Content loaded from AI assistant");
                }}
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* Create content dialog */}
      <CreateContent 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onContentCreate={handleContentCreate}
      />
      
      {/* Action panel - now draggable */}
      <ActionPanel 
        onTogglePosts={() => setPostsOverlayVisible(prev => !prev)}
        postsVisible={postsOverlayVisible}
        onToggleAgent={() => setAgentOverlayVisible(prev => !prev)}
        agentVisible={agentOverlayVisible}
        onDimBackground={toggleDimBackground}
        isDimmed={isDimmed}
      />
    </div>
  );
};

export default Index;
