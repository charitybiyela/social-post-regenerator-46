import React, { useEffect } from 'react';
import { NewsCard } from './NewsCard';

interface ScrollableNewsProps {
  newsItems: any[];
  scrollStyle: string;
  scrollActive: boolean;
  scrollSpeed: number;
  viewMode: string;
  currentArticleIndex: number;
}

export const ScrollableNews = ({
  newsItems,
  scrollStyle,
  scrollActive,
  scrollSpeed,
  viewMode,
  currentArticleIndex,
}: ScrollableNewsProps) => {
  useEffect(() => {
    if (scrollActive && scrollStyle === 'continuous') {
      const scrollContainer = document.querySelector('.scroll-container');
      if (scrollContainer) {
        const scrollInterval = 11000 - (scrollSpeed * 1000);
        (scrollContainer as HTMLElement).style.animationDuration = `${scrollInterval}ms`;
        scrollContainer.classList.add('scrolling');
      }
    } else {
      const scrollContainer = document.querySelector('.scroll-container');
      if (scrollContainer) {
        scrollContainer.classList.remove('scrolling');
      }
    }
  }, [scrollActive, scrollStyle, scrollSpeed]);

  if (scrollStyle === 'continuous') {
    return (
      <div className="space-y-6 scroll-container">
        {newsItems.map((article) => (
          <div key={article.id} className="max-w-2xl mx-auto">
            <NewsCard article={article} viewMode={viewMode} />
          </div>
        ))}
        {/* Duplicate articles for seamless scrolling */}
        {newsItems.map((article) => (
          <div key={`${article.id}-duplicate`} className="max-w-2xl mx-auto">
            <NewsCard article={article} viewMode={viewMode} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <NewsCard article={newsItems[currentArticleIndex]} viewMode={viewMode} />
      </div>
    </div>
  );
};