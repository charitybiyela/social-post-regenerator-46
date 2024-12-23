import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardControls } from './dashboard/DashboardControls';
import { NewsCard } from './dashboard/NewsCard';
import { SportsTicker } from './dashboard/SportsTicker';
import { WeatherWidget } from './dashboard/WeatherWidget';
import { MarketsWidget } from './dashboard/MarketsWidget';
import { NewsItem } from '@/types/news';

export default function NewsDashboard() {
  const [scrollStyle, setScrollStyle] = useState('continuous');
  const [darkMode, setDarkMode] = useState(true);
  const [scrollActive, setScrollActive] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const [viewMode, setViewMode] = useState('hybrid');
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  // Sample news data
  const newsItems: NewsItem[] = [
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

  // Continuous scroll effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (scrollActive && scrollStyle === 'oneAtATime') {
      interval = setInterval(() => {
        setCurrentArticleIndex(prev => (prev + 1) % newsItems.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [scrollActive, scrollStyle, newsItems.length]);

  return (
    <div className={`w-full min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
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

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <Card className={`${darkMode ? 'bg-gray-800' : 'bg-white'} mb-4`}>
            <CardHeader>
              <CardTitle>Latest Updates</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100vh-280px)] overflow-hidden">
              {scrollStyle === 'continuous' ? (
                <div className="space-y-6">
                  {newsItems.map((article) => (
                    <div key={article.id} className="max-w-2xl mx-auto">
                      <NewsCard 
                        article={article}
                        darkMode={darkMode}
                        viewMode={viewMode}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="max-w-2xl w-full">
                    <NewsCard 
                      article={newsItems[currentArticleIndex]}
                      darkMode={darkMode}
                      viewMode={viewMode}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-4 space-y-4">
          <SportsTicker darkMode={darkMode} />
          <WeatherWidget />
          <MarketsWidget />
        </div>
      </div>
    </div>
  );
}