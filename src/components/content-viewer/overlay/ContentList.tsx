
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
          {items.length > 0 ? (
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
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
              <div className="mb-2 opacity-70">
                <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 9H15M9 13H15M9 17H12M8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm mb-1">No posts found</p>
              <p className="text-xs">Content you create will appear here</p>
            </div>
          )}
        </ScrollArea>
      </div>
      
      {autoScroll && items.length > 0 && (
        <div className="py-2 flex justify-center border-t border-border/30">
          <ArrowDown className="h-3 w-3 text-muted-foreground animate-bounce" />
        </div>
      )}
    </div>
  );
};
