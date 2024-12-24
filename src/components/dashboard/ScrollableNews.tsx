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
    // Adjust base speed to be slower (5 pixels per second at speed 1)
    const pixelsPerSecond = scrollSpeed * 5;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      
      if (scrollActive && scrollStyle === 'continuous') {
        const scrollAmount = (pixelsPerSecond * deltaTime) / 1000;
        scrollContainer.scrollTop += scrollAmount;

        // Reset scroll position when reaching bottom with a smooth transition
        if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 100) {
          // When near the bottom, smoothly reset to top
          scrollContainer.scrollTo({
            top: 0,
            behavior: 'auto'
          });
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

  if (scrollStyle === 'continuous') {
    return (
      <div 
        ref={scrollContainerRef}
        className="h-full overflow-y-auto scroll-smooth"
      >
        <div className="space-y-6 px-6">
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
      </div>
    );
  }

  // One at a time view
  return (
    <div className="h-full flex items-center justify-center px-6 overflow-hidden">
      <div className="w-full max-w-2xl animate-fadeIn">
        <NewsCard 
          article={newsItems[currentArticleIndex]} 
          viewMode={viewMode} 
        />
      </div>
    </div>
  );
};