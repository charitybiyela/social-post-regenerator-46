import React from 'react';
import { NewsItem } from '@/types/news';
import { NewsGrid } from './NewsGrid';

interface ScrollableNewsContainerProps {
  newsItems: NewsItem[];
  darkMode: boolean;
  viewMode: string;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  scrollStyle: string;
  currentArticleIndex: number;
}

export const ScrollableNewsContainer = ({
  newsItems,
  darkMode,
  viewMode,
  scrollContainerRef,
  scrollStyle,
  currentArticleIndex,
}: ScrollableNewsContainerProps) => {
  return (
    <div 
      ref={scrollContainerRef}
      className="absolute inset-0 overflow-hidden bg-background"
    >
      {scrollStyle === 'continuous' ? (
        <div className="space-y-6">
          <NewsGrid 
            newsItems={[...newsItems, ...newsItems, ...newsItems]}
            darkMode={darkMode}
            viewMode={viewMode}
          />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center p-4">
          <div className="w-full transition-opacity duration-500 animate-fadeIn">
            <NewsCard 
              article={newsItems[currentArticleIndex]}
              darkMode={darkMode}
              viewMode={viewMode}
            />
          </div>
        </div>
      )}
    </div>
  );
};