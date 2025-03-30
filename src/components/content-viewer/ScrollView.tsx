
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
  const hasMedia = currentItem.media && currentItem.media.length > 0;
  const mediaType = hasMedia ? currentItem.media[0].type : null;
  const isMediaContent = mediaType === 'music' || mediaType === 'video';
  const isWebsiteContent = mediaType === 'website';

  return (
    <div className="h-full overflow-hidden">
      <div className="h-full overflow-auto">
        {isMediaContent ? (
          <div className="relative h-full flex flex-col">
            {/* Overlay header for media content */}
            <div className="bg-gradient-to-b from-background/80 to-transparent pt-4 pb-8 px-6">
              <div className="flex items-center justify-between">
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
              <h2 className="text-2xl font-semibold mt-4">{currentItem.title}</h2>
            </div>
            
            {/* Media content */}
            <div className="flex-1 px-6">
              <MediaContent 
                item={currentItem} 
                isPlaying={isPlaying} 
                togglePlayPause={togglePlayPause} 
              />
            </div>
            
            {/* Description and tags under the media */}
            <div className="px-6 py-4">
              <p className="text-muted-foreground mb-4">{currentItem.content}</p>
              
              {/* Tags section for media content */}
              {currentItem.tags && currentItem.tags.length > 0 && (
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
        ) : isWebsiteContent ? (
          <div className="flex flex-col h-full">
            {/* Header for website content */}
            <div className="px-6 pt-4 pb-4">
              <div className="flex items-center justify-between">
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
              <h2 className="text-2xl font-semibold mt-4 mb-4">{currentItem.title}</h2>
              <p className="text-muted-foreground mb-4">{currentItem.content}</p>
            </div>
            
            {/* Website embed */}
            <div className="flex-1 px-6 pb-4">
              <MediaContent 
                item={currentItem} 
                isPlaying={isPlaying} 
                togglePlayPause={togglePlayPause} 
              />
            </div>
            
            {/* Tags section */}
            {currentItem.tags && currentItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 px-6 pb-6">
                {currentItem.tags.map((tag, i) => (
                  <div key={i} className="px-3 py-1 rounded-full text-xs bg-muted">
                    #{tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="px-6 py-4">
            {/* Regular content (non-media) */}
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
            
            <p className="text-muted-foreground my-6">{currentItem.content}</p>
            
            {/* Tags section */}
            {currentItem.tags && currentItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentItem.tags.map((tag, i) => (
                  <div key={i} className="px-3 py-1 rounded-full text-xs bg-muted">
                    #{tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
