import React, { useEffect, useRef, useState } from 'react';
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
  scrollActive,
  scrollSpeed,
  viewMode,
  currentArticleIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFirstScreenPassed, setIsFirstScreenPassed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const firstArticleHeight = containerRef.current.children[0]?.getBoundingClientRect().height || 0;
        const scrollTop = containerRef.current.scrollTop;
        setIsFirstScreenPassed(scrollTop > firstArticleHeight);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (scrollStyle === 'continuous' && scrollActive && !isFirstScreenPassed) {
      const scrollInterval = setInterval(() => {
        if (containerRef.current) {
          const container = containerRef.current;
          const scrollHeight = container.scrollHeight;
          const clientHeight = container.clientHeight;
          
          let newPosition = scrollPosition + (scrollSpeed * 2);
          
          if (newPosition >= scrollHeight - clientHeight) {
            newPosition = 0;
          }
          
          container.scrollTop = newPosition;
          setScrollPosition(newPosition);
        }
      }, 50);

      return () => clearInterval(scrollInterval);
    }
  }, [scrollActive, scrollSpeed, scrollStyle, scrollPosition, isFirstScreenPassed]);

  const duplicatedItems = scrollStyle === 'continuous' 
    ? [...newsItems, ...newsItems.slice(0, 3)]
    : newsItems;

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
    <div
      ref={containerRef}
      className="h-full overflow-y-auto scrollbar-none"
      style={{ 
        scrollBehavior: scrollActive && !isFirstScreenPassed ? 'auto' : 'smooth',
      }}
    >
      {duplicatedItems.map((article, index) => (
        <div key={`${article.id}-${index}`} className="mb-6">
          <NewsCard article={article} viewMode={viewMode} />
        </div>
      ))}
    </div>
  );
};