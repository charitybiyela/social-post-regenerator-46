import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { SportsTicker } from './dashboard/SportsTicker';
import { WeatherWidget } from './dashboard/WeatherWidget';
import { MarketsWidget } from './dashboard/MarketsWidget';
import { DashboardControls } from './dashboard/DashboardControls';
import { ScrollableNews } from './dashboard/ScrollableNews';

export default function NewsDashboard() {
  const [scrollStyle, setScrollStyle] = useState('continuous');
  const [scrollActive, setScrollActive] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const [viewMode, setViewMode] = useState('hybrid');
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const { theme } = useTheme();

  // Sample news data
  const newsItems = [
    {
      id: 1,
      title: "Jamaica's FinTech Sector Sees Major Growth",
      category: "Financial Technology",
      importance: "high",
      content: "Leading financial institutions in Jamaica are reporting unprecedented adoption of digital banking solutions...",
      tags: ["FinTech", "Banking", "Jamaica"],
      time: "2 minutes ago",
      media: {
        type: "chart",
        data: {
          labels: ["Q1", "Q2", "Q3", "Q4"],
          values: [120, 180, 240, 350],
          title: "Digital Banking Growth"
        }
      }
    },
    {
      id: 2,
      title: "Caribbean Forex Markets Update",
      category: "Financial Markets",
      importance: "medium",
      content: "New trade policies across the Caribbean region are creating ripples in the forex markets...",
      tags: ["Forex", "Caribbean", "Economic Policy"],
      time: "15 minutes ago",
      media: {
        type: "image",
        src: "/placeholder.svg",
        alt: "Caribbean Forex Market Trends"
      }
    }
  ];

  // Handle one-at-a-time scrolling
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (scrollActive && scrollStyle === 'oneAtATime') {
      const scrollInterval = 11000 - (scrollSpeed * 1000);
      interval = setInterval(() => {
        setCurrentArticleIndex(prev => (prev + 1) % newsItems.length);
      }, scrollInterval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [scrollActive, scrollStyle, scrollSpeed, newsItems.length]);

  return (
    <div className="w-full min-h-screen p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <DashboardControls 
        scrollStyle={scrollStyle}
        setScrollStyle={setScrollStyle}
        viewMode={viewMode}
        setViewMode={setViewMode}
        scrollActive={scrollActive}
        setScrollActive={setScrollActive}
        scrollSpeed={scrollSpeed}
        setScrollSpeed={setScrollSpeed}
      />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <Card className="h-[calc(100vh-280px)]">
            <CardHeader>
              <CardTitle>Latest Updates</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)] overflow-hidden">
              <ScrollableNews 
                newsItems={newsItems}
                scrollStyle={scrollStyle}
                scrollActive={scrollActive}
                scrollSpeed={scrollSpeed}
                viewMode={viewMode}
                currentArticleIndex={currentArticleIndex}
              />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-4">
          <div className="h-[calc(100vh-280px)] space-y-4 overflow-y-auto">
            <SportsTicker />
            <WeatherWidget />
            <MarketsWidget />
          </div>
        </div>
      </div>

      <style>
        {`
          .scroll-container {
            transition: transform 0.5s ease;
            position: relative;
          }
          
          .scroll-container.scrolling {
            animation: scroll linear infinite;
          }
          
          @keyframes scroll {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
          
          .scroll-container:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
}
