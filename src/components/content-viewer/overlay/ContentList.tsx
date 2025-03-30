
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContentItem } from "./ContentItem";
import { ArrowDown } from "lucide-react";

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
}

export const ContentList: React.FC<ContentListProps> = ({ 
  items, 
  activeItem, 
  onItemSelect, 
  scrollRef,
  autoScroll
}) => {
  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-2 p-3">
            {items.map((item) => (
              <ContentItem
                key={item.id}
                item={item}
                isActive={activeItem?.id === item.id}
                onClick={() => onItemSelect(item)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {autoScroll && (
        <div className="py-2 flex justify-center border-t">
          <ArrowDown className="h-3 w-3 text-muted-foreground animate-bounce" />
        </div>
      )}
    </div>
  );
};
