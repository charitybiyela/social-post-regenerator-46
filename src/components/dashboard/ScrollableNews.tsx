
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
  // Display only one article at a time without scrolling
  if (scrollStyle === 'oneAtATime') {
    return (
      <div className="h-full flex items-center justify-center px-6">
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

  // Display all articles without scrolling effects
  return (
    <div className="h-full px-6 py-6">
      <div className="space-y-6">
        {newsItems.map((article, index) => (
          <div key={`${article.id}-${index}`}>
            <NewsCard article={article} viewMode={viewMode} />
          </div>
        ))}
      </div>
    </div>
  );
};
