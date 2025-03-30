
import React from "react";
import { ViewModeSelector } from "./ViewModeSelector";
import { ScrollView } from "./ScrollView";
import { PanelsView } from "./PanelsView";

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
  activeItem?: ContentItem;
  onSelectItem?: (item: ContentItem) => void;
  isDimmed?: boolean;
}

export const ContentViewer = ({ 
  items, 
  activeItem, 
  onSelectItem, 
  isDimmed = false 
}: ContentViewerProps) => {
  const [viewMode, setViewMode] = React.useState<"scroll" | "panels">("scroll");
  const [isPlaying, setIsPlaying] = React.useState(false);
  
  // If no active item is provided, use the first item
  const currentItem = activeItem || items[0];
  
  const handleItemClick = (item: ContentItem) => {
    if (onSelectItem) onSelectItem(item);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleViewModeChange = (value: string) => {
    setViewMode(value as "scroll" | "panels");
  };

  return (
    <div className={`w-full h-full relative transition-all duration-300 ${isDimmed ? 'brightness-75' : ''}`}>
      <ViewModeSelector 
        viewMode={viewMode} 
        onViewModeChange={handleViewModeChange} 
      />

      {viewMode === "scroll" && (
        <ScrollView 
          currentItem={currentItem} 
          isPlaying={isPlaying} 
          togglePlayPause={togglePlayPause} 
        />
      )}

      {viewMode === "panels" && (
        <PanelsView 
          items={items} 
          currentItem={currentItem} 
          onItemClick={handleItemClick} 
        />
      )}
    </div>
  );
};
