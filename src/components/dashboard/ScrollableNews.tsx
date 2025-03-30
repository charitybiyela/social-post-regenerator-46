
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { NewsCard } from './NewsCard';

interface ScrollableNewsProps {
  newsItems: any[];
  scrollStyle: string;
  scrollActive: boolean;
  scrollSpeed: number;
  viewMode: string;
  currentArticleIndex: number;
}

export const ScrollableNews: React.FC<ScrollableNewsProps> = ({
  newsItems,
  scrollStyle,
  viewMode,
  currentArticleIndex,
}) => {
  // Display only one article at a time without scrolling
  if (scrollStyle === 'oneAtATime') {
    return (
      <div className="h-full flex items-center justify-center px-6 overflow-hidden">
        <div 
          key={currentArticleIndex} 
          className="w-full max-w-2xl"
        >
          <NewsCard
            article={newsItems[currentArticleIndex]}
            viewMode={viewMode}
          />
        </div>
      </div>
    );
  }

  // Display all articles with proper scrolling
  return (
    <div className="h-full px-6 overflow-hidden">
      <ScrollArea className="h-full pr-2 custom-scrollbar">
        <div className="space-y-6 pb-20">
          {newsItems.map((article, index) => (
            <div key={`${article.id}-${index}`} className="pb-2">
              <NewsCard article={article} viewMode={viewMode} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
