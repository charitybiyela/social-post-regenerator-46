import React from 'react';
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
  // Simplified function that doesn't use any auto-scrolling
  
  if (scrollStyle === 'oneAtATime') {
    return (
      <div className="h-full flex items-center justify-center px-6">
        <div 
          key={currentArticleIndex} 
          className="w-full max-w-2xl animate-in fade-in duration-300"
        >
          <NewsCard
            article={newsItems[currentArticleIndex]}
            viewMode={viewMode}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6 pb-6">
        {newsItems.map((article, index) => (
          <div key={`${article.id}-${index}`}>
            <NewsCard article={article} viewMode={viewMode} />
          </div>
        ))}
      </div>
    </div>
  );
};
