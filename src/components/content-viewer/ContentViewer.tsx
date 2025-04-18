
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
  isPlaying?: boolean;
  togglePlayPause?: () => void;
  mediaType?: 'music' | 'video';
}

export const ContentViewer = ({ 
  items, 
  activeItem, 
  onSelectItem, 
  isDimmed = false,
  isPlaying = false,
  togglePlayPause = () => {},
  mediaType = 'video'
}: ContentViewerProps) => {
  const [viewMode, setViewMode] = React.useState<"scroll" | "panels">("scroll");
  
  // If no active item is provided, use the first item
  const currentItem = activeItem || items[0];
  
  const handleItemClick = (item: ContentItem) => {
    if (onSelectItem) onSelectItem(item);
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
          mediaType={mediaType}
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
