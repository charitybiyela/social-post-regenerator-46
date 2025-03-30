import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { X, ArrowDown } from "lucide-react";

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
  visible: boolean;
  onClose: () => void;
}

export const ContentOverlay = ({ 
  items, 
  activeItem, 
  onSelect, 
  visible, 
  onClose 
}: ContentOverlayProps) => {
  const [autoScroll, setAutoScroll] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (autoScroll && scrollRef.current && visible) {
      const interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          
          if (scrollTop + clientHeight >= scrollHeight - 10) {
            scrollRef.current.scrollTop = 0;
          } else {
            scrollRef.current.scrollTop += 1;
          }
        }
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [autoScroll, visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`absolute right-4 bottom-4 max-w-xs z-10 ${isTransparent ? 'bg-background/80' : 'bg-background'} backdrop-blur-md rounded-lg shadow-lg border border-border/50`}
    >
      <div className="p-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Live Posts</h3>
          <div className="flex items-center gap-1 text-xs">
            <Switch
              size="sm"
              checked={autoScroll}
              onCheckedChange={setAutoScroll}
              className="scale-75"
            />
            <span className="text-muted-foreground">Auto</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            size="sm"
            checked={!isTransparent}
            onCheckedChange={(checked) => setIsTransparent(!checked)}
            className="scale-75"
          />
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div ref={scrollRef} className="h-48 overflow-auto">
        <ScrollArea className="h-full p-2">
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
      </div>
      
      {autoScroll && (
        <div className="p-2 flex justify-center border-t">
          <ArrowDown className="h-3 w-3 text-muted-foreground animate-bounce" />
        </div>
      )}
    </motion.div>
  );
};
