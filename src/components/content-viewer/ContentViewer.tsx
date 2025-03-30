
import React from "react";
import { 
  ScrollText, 
  Grid3X3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/ui/content-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  
  // If no active item is provided, use the first item
  const currentItem = activeItem || items[0];
  
  const handleItemClick = (item: ContentItem) => {
    if (onSelectItem) onSelectItem(item);
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
        <ScrollArea className="h-full">
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
            <p className="text-muted-foreground mb-6">{currentItem.content}</p>

            {currentItem.media && currentItem.media.length > 0 && (
              <div className="rounded-md bg-muted aspect-video mb-6 flex items-center justify-center">
                <span className="text-muted-foreground">[{currentItem.media[0].type}]</span>
              </div>
            )}

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
        </ScrollArea>
      )}

      {viewMode === "panels" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full">
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
                    <span className="text-xs text-muted-foreground">[{item.media[0].type}]</span>
                  </div>
                )}
                
                <div className="relative">
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {item.content}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent"></div>
                </div>
              </div>
            </ContentCard>
          ))}
        </div>
      )}
    </div>
  );
};
