
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContentItem } from "./ContentItem";
import { ArrowDown, UserCircle2, Globe } from "lucide-react";

interface ContentItemData {
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

interface ContentListProps {
  items: ContentItemData[];
  activeItem?: ContentItemData;
  onItemSelect: (item: ContentItemData) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  autoScroll: boolean;
  viewMode?: string;
}

export const ContentList: React.FC<ContentListProps> = ({ 
  items, 
  activeItem, 
  onItemSelect, 
  scrollRef,
  autoScroll,
  viewMode = 'live'
}) => {
  // Filter based on view mode (could be used to filter user's own posts)
  const displayItems = items;

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-hidden">
        <ScrollArea className="h-full custom-scrollbar">
          {displayItems.length > 0 ? (
            <div className="space-y-1.5 p-2 pb-20">
              {displayItems.map((item) => (
                <ContentItem
                  key={item.id}
                  item={item}
                  isActive={activeItem?.id === item.id}
                  onClick={() => onItemSelect(item)}
                />
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
              <div className="mb-2 opacity-70">
                {viewMode === 'mine' ? (
                  <UserCircle2 className="w-10 h-10 mx-auto" />
                ) : (
                  <Globe className="w-10 h-10 mx-auto" />
                )}
              </div>
              <p className="text-sm mb-1">
                {viewMode === 'mine' ? 'No personal posts found' : 'No posts found'}
              </p>
              <p className="text-xs">
                {viewMode === 'mine' 
                  ? 'Content you create will appear here' 
                  : 'Live posts will appear here'}
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
      
      {autoScroll && displayItems.length > 0 && (
        <div className="py-1 flex justify-center border-t border-border/30">
          <ArrowDown className="h-3 w-3 text-muted-foreground animate-bounce" />
        </div>
      )}
    </div>
  );
};
