
import React from "react";
import { 
  ScrollText, 
  Grid3X3,
  Music,
  Video,
  Play,
  SkipBack,
  SkipForward,
  Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/ui/content-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContentItem {
  id: string | number;
  title: string;
  content: string;
  author: string;
  isAI?: boolean;
  timestamp: string;
  media?: {
    type: string;
    url?: string;
  }[];
  tags?: string[];
}

interface ContentViewerProps {
  items: ContentItem[];
  activeItem?: ContentItem;
  onSelectItem?: (item: ContentItem) => void;
  isDimmed?: boolean;
}

export const ContentViewer = ({ items, activeItem, onSelectItem, isDimmed = false }: ContentViewerProps) => {
  const [viewMode, setViewMode] = React.useState<"scroll" | "panels">("scroll");
  const [isPlaying, setIsPlaying] = React.useState(false);
  
  // If no active item is provided, use the first item
  const currentItem = activeItem || items[0];
  
  const handleItemClick = (item: ContentItem) => {
    if (onSelectItem) onSelectItem(item);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Function to render content based on media type
  const renderMediaContent = () => {
    if (!currentItem.media || currentItem.media.length === 0) {
      return null;
    }

    const media = currentItem.media[0];
    
    switch (media.type) {
      case 'music':
        return (
          <div className="rounded-md bg-black aspect-video mb-6 flex flex-col items-center justify-center">
            <Music className="h-16 w-16 text-primary mb-4" />
            <div className="text-lg font-medium text-white">{currentItem.title}</div>
            <div className="text-sm text-gray-400 mt-2">{currentItem.author}</div>
            
            <div className="w-full max-w-md mt-6 px-4">
              <div className="h-1 bg-gray-700 rounded-full w-full">
                <div className="h-1 bg-primary rounded-full" style={{ width: '30%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1:23</span>
                <span>4:56</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <Button variant="ghost" size="icon" className="rounded-full text-white">
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12 text-white border-white"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white">
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="rounded-md bg-black aspect-video mb-6 relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Video className="h-16 w-16 text-primary mb-4" />
              <div className="text-lg font-medium text-white">{currentItem.title}</div>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-16 w-16 mt-4 text-white border-white"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8" />
                )}
              </Button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="h-1 bg-gray-700 rounded-full w-full">
                <div className="h-1 bg-primary rounded-full" style={{ width: '15%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>2:45</span>
                <span>18:30</span>
              </div>
            </div>
          </div>
        );
        
      case 'website':
        return (
          <div className="rounded-md border mb-6 h-96">
            {media.url ? (
              <iframe 
                src={media.url} 
                className="w-full h-full rounded-md" 
                title={currentItem.title}
                sandbox="allow-same-origin allow-scripts"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted">
                <span className="text-muted-foreground">Website URL not provided</span>
              </div>
            )}
          </div>
        );
        
      default:
        return (
          <div className="rounded-md bg-muted aspect-video mb-6 flex items-center justify-center">
            <span className="text-muted-foreground">[{media.type}]</span>
          </div>
        );
    }
  };

  return (
    <div className={`w-full h-full relative transition-all duration-300 ${isDimmed ? 'brightness-75' : ''}`}>
      <div className="absolute top-2 right-2 z-10">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
          <TabsList className="bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="scroll" className="flex items-center gap-1">
              <ScrollText className="h-3 w-3" />
            </TabsTrigger>
            <TabsTrigger value="panels" className="flex items-center gap-1">
              <Grid3X3 className="h-3 w-3" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === "scroll" && (
        <div className="h-full overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {currentItem.author[0]}
                </div>
                <div>
                  <div className="font-medium">{currentItem.author}</div>
                  <div className="text-xs text-muted-foreground">{currentItem.timestamp}</div>
                </div>
              </div>
              {currentItem.isAI && (
                <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  AI Generated
                </div>
              )}
            </div>

            <h2 className="text-2xl font-semibold mb-4">{currentItem.title}</h2>
            
            {/* Render media content based on type */}
            {renderMediaContent()}
            
            <p className="text-muted-foreground mb-6">{currentItem.content}</p>

            {currentItem.tags && (
              <div className="flex flex-wrap gap-2">
                {currentItem.tags.map((tag, i) => (
                  <div key={i} className="px-3 py-1 rounded-full text-xs bg-muted">
                    #{tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === "panels" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full overflow-hidden">
          {items.map((item, idx) => (
            <ContentCard 
              key={item.id}
              depth={Math.min(idx % 3, 2)}
              className="cursor-pointer"
              active={item.id === currentItem.id}
              onClick={() => handleItemClick(item)}
            >
              <div className="p-4 h-64 overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                      {item.author[0]}
                    </div>
                    <div className="text-sm font-medium">{item.author}</div>
                  </div>
                  {item.isAI && (
                    <div className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                      AI
                    </div>
                  )}
                </div>

                <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                
                {item.media && item.media.length > 0 && (
                  <div className="rounded bg-muted h-24 mb-2 flex items-center justify-center">
                    {item.media[0].type === 'music' ? (
                      <Music className="h-6 w-6 text-muted-foreground" />
                    ) : item.media[0].type === 'video' ? (
                      <Video className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <span className="text-xs text-muted-foreground">[{item.media[0].type}]</span>
                    )}
                  </div>
                )}
                
                <div className="relative">
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {item.content}
                  </p>
                </div>
              </div>
            </ContentCard>
          ))}
        </div>
      )}
    </div>
  );
};
