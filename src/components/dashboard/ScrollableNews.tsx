import React, { useEffect, useRef } from 'react';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    let animationFrameId: number;
    let lastTimestamp: number;
    
    // Increased base speed to 60 pixels per second for smoother scrolling
    const pixelsPerSecond = scrollSpeed * 60;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      
      if (scrollActive && scrollStyle === 'continuous') {
        const scrollAmount = (pixelsPerSecond * deltaTime) / 1000;
        scrollContainer.scrollTop += scrollAmount;

        // Reset scroll position when reaching bottom
        if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 10) {
          scrollContainer.scrollTop = 0;
        }
      }

      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };

    if (scrollActive && scrollStyle === 'continuous') {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [scrollActive, scrollStyle, scrollSpeed]);

  // For continuous scrolling
  if (scrollStyle === 'continuous') {
    return (
      <div 
        ref={scrollContainerRef}
        className="h-full overflow-y-auto"
      >
        <div className="space-y-6 px-6">
          {newsItems.map((article) => (
            <div key={article.id} className="max-w-2xl mx-auto">
              <NewsCard article={article} viewMode={viewMode} />
            </div>
          ))}
          {/* Duplicate first few articles for seamless loop */}
          {newsItems.slice(0, 3).map((article) => (
            <div key={`${article.id}-duplicate`} className="max-w-2xl mx-auto">
              <NewsCard article={article} viewMode={viewMode} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // One at a time view with fade animation
  return (
    <div className="h-full flex items-center justify-center px-6">
      <div 
        key={currentArticleIndex} 
        className="w-full max-w-2xl transition-opacity duration-300 ease-in-out"
        style={{
          opacity: 1,
          animation: 'fadeIn 0.3s ease-in-out'
        }}
      >
        <NewsCard 
          article={newsItems[currentArticleIndex]} 
          viewMode={viewMode} 
        />
      </div>
    </div>
  );
};