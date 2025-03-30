
import React, { useState } from "react";
import { 
  ScrollText, 
  Grid3X3, 
  Command 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/ui/content-card";
import { Input } from "@/components/ui/input";
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
  onSelectItem?: (item: ContentItem) => void;
}

export const ContentViewer = ({ items, onSelectItem }: ContentViewerProps) => {
  const [viewMode, setViewMode] = useState<"scroll" | "panels">("scroll");
  const [activeItemId, setActiveItemId] = useState<string | number | null>(
    items.length > 0 ? items[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredItems = items.filter(item => 
    searchQuery === "" || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleItemClick = (item: ContentItem) => {
    setActiveItemId(item.id);
    if (onSelectItem) onSelectItem(item);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Tabs defaultValue={viewMode} onValueChange={(v) => setViewMode(v as any)}>
            <TabsList>
              <TabsTrigger value="scroll" className="flex items-center gap-1">
                <ScrollText className="h-4 w-4" />
                <span className="hidden sm:inline">Scroll</span>
              </TabsTrigger>
              <TabsTrigger value="panels" className="flex items-center gap-1">
                <Grid3X3 className="h-4 w-4" />
                <span className="hidden sm:inline">Panels</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="relative flex items-center max-w-sm">
          <Command className="absolute left-2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 max-w-[200px]"
          />
        </div>
      </div>

      {viewMode === "scroll" && (
        <div className="space-y-8 px-2">
          {filteredItems.map((item, index) => (
            <ContentCard 
              key={item.id}
              className="w-full cursor-pointer"
              active={item.id === activeItemId}
              onClick={() => handleItemClick(item)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {item.author[0]}
                    </div>
                    <div>
                      <div className="font-medium">{item.author}</div>
                      <div className="text-xs text-muted-foreground">{item.timestamp}</div>
                    </div>
                  </div>
                  {item.isAI && (
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      AI Generated
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <div className="overflow-auto max-h-[400px]">
                  <p className="text-muted-foreground mb-4">{item.content}</p>
                </div>

                {item.media && item.media.length > 0 && (
                  <div className="rounded-md bg-muted aspect-video mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground">[{item.media[0].type}]</span>
                  </div>
                )}

                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <div key={i} className="px-3 py-1 rounded-full text-xs bg-muted">
                        #{tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ContentCard>
          ))}
        </div>
      )}

      {viewMode === "panels" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {filteredItems.map((item, idx) => (
            <ContentCard 
              key={item.id}
              depth={Math.min(idx % 3, 2)}
              className="cursor-pointer"
              active={item.id === activeItemId}
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
