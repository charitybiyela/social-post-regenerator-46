
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
  mediaType?: 'music' | 'video';
}

export const ScrollView: React.FC<ScrollViewProps> = ({
  currentItem,
  isPlaying,
  togglePlayPause,
  mediaType = 'video'
}) => {
  const hasMedia = currentItem.media && currentItem.media.length > 0;
  const contentMediaType = hasMedia ? currentItem.media[0].type : null;
  const isMediaContent = contentMediaType === 'music' || contentMediaType === 'video';
  const isWebsiteContent = contentMediaType === 'website';

  return (
    <div className="h-full overflow-hidden">
      <div className="h-full overflow-auto custom-scrollbar">
        {isMediaContent ? (
          <div className="relative h-full flex flex-col">
            {/* Overlay header for media content */}
            <div className="bg-gradient-to-b from-background/80 to-transparent pt-2 pb-4 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {currentItem.author[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{currentItem.author}</div>
                    <div className="text-xs text-muted-foreground">{currentItem.timestamp}</div>
                  </div>
                </div>
                {currentItem.isAI && (
                  <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    AI Generated
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold mt-3">{currentItem.title}</h2>
            </div>
            
            {/* Media content */}
            <div className="flex-1 px-4">
              <MediaContent 
                item={currentItem} 
                isPlaying={isPlaying} 
                togglePlayPause={togglePlayPause} 
                currentMediaType={mediaType}
              />
            </div>
            
            {/* Description and tags under the media */}
            <div className="px-4 py-3 max-w-prose">
              <p className="text-muted-foreground mb-3 text-sm">{currentItem.content}</p>
              
              {/* Tags section for media content */}
              {currentItem.tags && currentItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentItem.tags.map((tag, i) => (
                    <div key={i} className="px-2 py-0.5 rounded-full text-xs bg-muted">
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
            <div className="px-4 pt-2 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {currentItem.author[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{currentItem.author}</div>
                    <div className="text-xs text-muted-foreground">{currentItem.timestamp}</div>
                  </div>
                </div>
                {currentItem.isAI && (
                  <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    AI Generated
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold mt-3 mb-2">{currentItem.title}</h2>
              <p className="text-muted-foreground mb-3 text-sm max-w-prose">{currentItem.content}</p>
            </div>
            
            {/* Website embed */}
            <div className="flex-1 px-4 pb-3">
              <MediaContent 
                item={currentItem} 
                isPlaying={isPlaying} 
                togglePlayPause={togglePlayPause} 
                currentMediaType={mediaType}
              />
            </div>
            
            {/* Tags section */}
            {currentItem.tags && currentItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 px-4 pb-4">
                {currentItem.tags.map((tag, i) => (
                  <div key={i} className="px-2 py-0.5 rounded-full text-xs bg-muted">
                    #{tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="px-4 py-2">
            {/* Regular content (non-media) */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {currentItem.author[0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{currentItem.author}</div>
                  <div className="text-xs text-muted-foreground">{currentItem.timestamp}</div>
                </div>
              </div>
              {currentItem.isAI && (
                <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  AI Generated
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold mb-3">{currentItem.title}</h2>
            
            <MediaContent 
              item={currentItem} 
              isPlaying={isPlaying} 
              togglePlayPause={togglePlayPause} 
              currentMediaType={mediaType}
            />
            
            <p className="text-muted-foreground my-4 max-w-prose text-sm">{currentItem.content}</p>
            
            {/* Tags section */}
            {currentItem.tags && currentItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentItem.tags.map((tag, i) => (
                  <div key={i} className="px-2 py-0.5 rounded-full text-xs bg-muted">
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
