
import React from "react";
import { MediaContent } from "./MediaContent";

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

interface ScrollViewProps {
  currentItem: ContentItem;
  isPlaying: boolean;
  togglePlayPause: () => void;
}

export const ScrollView: React.FC<ScrollViewProps> = ({
  currentItem,
  isPlaying,
  togglePlayPause
}) => {
  return (
    <div className="h-full overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {currentItem.author[0]}
            </div>
            <div>
              <div className="font-medium">{currentItem.author}</div>
              <div className="text-xs text-muted-foreground">{currentItem.timestamp}</div>
            </div>
          </div>
          {currentItem.isAI && (
            <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              AI Generated
            </div>
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-4">{currentItem.title}</h2>
        
        <MediaContent 
          item={currentItem} 
          isPlaying={isPlaying} 
          togglePlayPause={togglePlayPause} 
        />
        
        <p className="text-muted-foreground mb-6">{currentItem.content}</p>

        {currentItem.tags && (
          <div className="flex flex-wrap gap-2">
            {currentItem.tags.map((tag, i) => (
              <div key={i} className="px-3 py-1 rounded-full text-xs bg-muted">
                #{tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
