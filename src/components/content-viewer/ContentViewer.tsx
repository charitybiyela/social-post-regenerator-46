
import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  ScrollText, 
  Grid3X3, 
  Command 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/ui/content-card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKeenSlider } from "@/hooks/use-keen-slider";

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
  const [viewMode, setViewMode] = useState<"scroll" | "slides" | "panels">("slides");
  const [activeItemId, setActiveItemId] = useState<string | number | null>(
    items.length > 0 ? items[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter items based on search query
  const filteredItems = items.filter(item => 
    searchQuery === "" || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Set up slider for slides mode
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 20,
    },
    slideChanged(s) {
      const currentSlide = s.track.details.abs;
      setActiveItemId(filteredItems[currentSlide]?.id);
    },
  });

  const handleItemClick = (item: ContentItem) => {
    setActiveItemId(item.id);
    if (onSelectItem) onSelectItem(item);
  };

  // Navigate in slides mode
  const navigateSlider = (direction: "prev" | "next") => {
    if (instanceRef.current) {
      direction === "prev" 
        ? instanceRef.current.prev() 
        : instanceRef.current.next();
    }
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
              <TabsTrigger value="slides" className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span className="hidden sm:inline">Slides</span>
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

      {/* Scroll Mode */}
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
                <p className="text-muted-foreground mb-4">{item.content}</p>

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

      {/* Slides Mode */}
      {viewMode === "slides" && (
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full" 
            onClick={() => navigateSlider("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={() => navigateSlider("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="mx-10">
            <div ref={sliderRef} className="keen-slider h-[calc(100vh-18rem)]">
              {filteredItems.map((item) => (
                <div key={item.id} className="keen-slider__slide">
                  <ContentCard active className="h-full">
                    <div className="p-8 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
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

                      <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                      
                      {item.media && item.media.length > 0 && (
                        <div className="rounded-md bg-muted aspect-video mb-6 flex items-center justify-center">
                          <span className="text-muted-foreground">[{item.media[0].type}]</span>
                        </div>
                      )}
                      
                      <p className="text-muted-foreground flex-grow overflow-y-auto">
                        {item.content}
                      </p>
                      
                      {item.tags && (
                        <div className="flex flex-wrap gap-2 mt-6">
                          {item.tags.map((tag, i) => (
                            <div key={i} className="px-3 py-1 rounded-full text-xs bg-muted">
                              #{tag}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </ContentCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Panels Mode */}
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
                
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {item.content}
                </p>
              </div>
            </ContentCard>
          ))}
        </div>
      )}
    </div>
  );
};
