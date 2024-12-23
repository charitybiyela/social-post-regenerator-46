import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardControls } from './DashboardControls';
import { ScrollableNewsContainer } from './ScrollableNewsContainer';
import { NewsItem } from '@/types/news';

interface MainContentProps {
  newsItems: NewsItem[];
  scrollStyle: string;
  setScrollStyle: (style: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  scrollActive: boolean;
  setScrollActive: (active: boolean) => void;
  scrollSpeed: number;
  setScrollSpeed: (speed: number) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  currentArticleIndex: number;
}

export const MainContent = ({
  newsItems,
  scrollStyle,
  setScrollStyle,
  viewMode,
  setViewMode,
  scrollActive,
  setScrollActive,
  scrollSpeed,
  setScrollSpeed,
  darkMode,
  setDarkMode,
  scrollContainerRef,
  currentArticleIndex,
}: MainContentProps) => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-8 flex flex-col">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <DashboardControls 
          scrollStyle={scrollStyle}
          setScrollStyle={setScrollStyle}
          viewMode={viewMode}
          setViewMode={setViewMode}
          scrollActive={scrollActive}
          setScrollActive={setScrollActive}
          scrollSpeed={scrollSpeed}
          setScrollSpeed={setScrollSpeed}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </div>

      <Card className="mt-4 flex-1">
        <CardHeader className="border-b">
          <CardTitle>Latest Updates</CardTitle>
        </CardHeader>
        <CardContent className="p-0 relative h-[calc(100vh-16rem)]">
          <ScrollableNewsContainer 
            newsItems={newsItems}
            darkMode={darkMode}
            viewMode={viewMode}
            scrollContainerRef={scrollContainerRef}
            scrollStyle={scrollStyle}
            currentArticleIndex={currentArticleIndex}
          />
        </CardContent>
      </Card>
    </div>
  );
};