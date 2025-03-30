
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ContentOverlayHeader } from "./overlay/ContentOverlayHeader";
import { ContentList } from "./overlay/ContentList";

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
      <ContentOverlayHeader 
        isTransparent={isTransparent}
        setIsTransparent={setIsTransparent}
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        onClose={onClose}
      />
      
      <ContentList 
        items={items}
        activeItem={activeItem}
        onItemSelect={onSelect}
        scrollRef={scrollRef}
        autoScroll={autoScroll}
      />
    </motion.div>
  );
};
