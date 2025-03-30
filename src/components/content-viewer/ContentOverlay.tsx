
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ContentOverlayHeader } from "./overlay/ContentOverlayHeader";
import { ContentList } from "./overlay/ContentList";

interface ContentItemType {
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
  items: ContentItemType[];
  activeItem?: ContentItemType;
  onSelect: (item: ContentItemType) => void;
  visible: boolean;
  onClose: () => void;
}

export const ContentOverlay: React.FC<ContentOverlayProps> = ({ 
  items, 
  activeItem, 
  onSelect, 
  visible, 
  onClose 
}) => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [autoScroll, setAutoScroll] = useState(false);
  const [viewMode, setViewMode] = useState<string>('live');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Filter user's own posts when in "mine" mode
  const userPosts = items.filter(item => item.author === "You" || item.author === "Current User");
  const displayItems = viewMode === 'mine' ? userPosts : items;

  // Auto-scroll effect
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      const timer = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [autoScroll]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`fixed top-0 right-0 bottom-0 w-92 flex flex-col ${
        isTransparent ? "bg-transparent" : "bg-background/95 backdrop-blur-md border-l border-border/30"
      } shadow-lg z-20`}
    >
      <ContentOverlayHeader
        isTransparent={isTransparent}
        setIsTransparent={setIsTransparent}
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        onClose={onClose}
        title={viewMode === 'mine' ? "My Posts" : "Live Posts"}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      <div className="flex-1 overflow-hidden h-full">
        <ContentList
          items={displayItems}
          activeItem={activeItem}
          onItemSelect={onSelect}
          scrollRef={scrollRef}
          autoScroll={autoScroll}
          viewMode={viewMode}
        />
      </div>
    </motion.div>
  );
};
