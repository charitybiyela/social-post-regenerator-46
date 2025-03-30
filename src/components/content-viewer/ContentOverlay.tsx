
import React from "react";
import { motion } from "framer-motion";
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

interface ContentOverlayProps {
  items: ContentItem[];
  activeItem?: ContentItem;
  onSelect: (item: ContentItem) => void;
}

export const ContentOverlay = ({ items, activeItem, onSelect }: ContentOverlayProps) => {
  return (
    <div className="absolute left-4 bottom-4 max-w-xs">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-background/80 backdrop-blur-md rounded-lg p-2 shadow-lg"
      >
        <h3 className="text-sm font-medium mb-2 px-2">Recent Posts</h3>
        <ScrollArea className="h-48">
          <div className="space-y-2 pr-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-2 rounded-md cursor-pointer transition-colors ${
                  activeItem?.id === item.id ? "bg-primary/10" : "hover:bg-muted"
                }`}
                onClick={() => onSelect(item)}
              >
                <div className="flex items-start gap-2">
                  {item.media && item.media.length > 0 && (
                    <div className="w-12 h-12 rounded bg-muted flex-shrink-0 flex items-center justify-center">
                      <span className="text-[10px] text-muted-foreground">{item.media[0].type}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium truncate">{item.title}</h4>
                    <p className="text-[10px] text-muted-foreground line-clamp-1">
                      {item.content}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="text-[8px] text-muted-foreground">{item.author}</div>
                      {item.isAI && (
                        <div className="ml-1 text-[8px] bg-primary/10 text-primary px-1 rounded-full">
                          AI
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </motion.div>
    </div>
  );
};
