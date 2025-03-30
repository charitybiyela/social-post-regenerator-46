
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ContentOverlayHeader } from "./overlay/ContentOverlayHeader";
import { ContentList } from "./overlay/ContentList";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Globe, User } from "lucide-react";

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
  const [viewMode, setViewMode] = useState<'live' | 'user'>('live');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Filter items based on view mode
  const filteredItems = viewMode === 'user' 
    ? items.filter(item => item.author === 'You') // Assuming 'You' is the current user
    : items;
  
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
      className={`absolute right-4 bottom-4 top-4 w-80 max-h-[calc(100%-2rem)] z-10 flex flex-col ${isTransparent ? 'glass-morphism' : 'bg-background'} rounded-lg shadow-lg border border-border/30 overflow-hidden`}
    >
      <ContentOverlayHeader 
        isTransparent={isTransparent}
        setIsTransparent={setIsTransparent}
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        onClose={onClose}
        title={viewMode === 'live' ? 'Live Posts' : 'My Posts'}
      />
      
      <div className="p-2 border-b border-border/30">
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'live' | 'user')} className="w-full justify-center">
          <ToggleGroupItem value="live" className="flex-1 h-8 gap-1">
            <Globe className="h-3.5 w-3.5" />
            <span className="text-xs">Live Posts</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="user" className="flex-1 h-8 gap-1">
            <User className="h-3.5 w-3.5" />
            <span className="text-xs">My Posts</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ContentList 
          items={filteredItems}
          activeItem={activeItem}
          onItemSelect={onSelect}
          scrollRef={scrollRef}
          autoScroll={autoScroll}
        />
      </div>
    </motion.div>
  );
};
