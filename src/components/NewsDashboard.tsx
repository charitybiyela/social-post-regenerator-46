import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardControls } from './dashboard/DashboardControls';
import { NewsCard } from './dashboard/NewsCard';
import { SportsTicker } from './dashboard/SportsTicker';
import { WeatherWidget } from './dashboard/WeatherWidget';
import { MarketsWidget } from './dashboard/MarketsWidget';
import { NewsItem } from '@/types/news';

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Tech Innovation in Caribbean Markets",
      category: "Technology",
      importance: "high",
      content: "Revolutionary AI solutions are transforming how Caribbean businesses operate, with a 200% increase in adoption rates across key sectors...",
      tags: ["AI", "Innovation", "Caribbean"],
      time: "2 minutes ago",
      media: {
        type: "chart",
        data: {
          labels: ["Q1", "Q2", "Q3", "Q4"],
          values: [45, 85, 150, 200],
          title: "AI Adoption Growth (%)"
        }
      }
    },
    {
      id: 2,
      title: "Sustainable Tourism Initiative Launches",
      category: "Environment",
      importance: "medium",
      content: "A groundbreaking eco-tourism program is set to transform the Caribbean tourism sector, focusing on environmental preservation while boosting local economies...",
      tags: ["Tourism", "Sustainability", "Economy"],
      time: "15 minutes ago",
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
        alt: "Aerial view of pristine Caribbean beach"
      }
    },
    {
      id: 3,
      title: "Digital Banking Revolution",
      category: "Finance",
      importance: "high",
      content: "Mobile banking adoption in the Caribbean reaches unprecedented levels, with over 5 million new users in the past quarter...",
      tags: ["Banking", "Digital", "Growth"],
      time: "1 hour ago",
      media: {
        type: "chart",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr"],
          values: [1.2, 2.5, 4.0, 5.0],
          title: "Mobile Banking Users (Millions)"
        }
      }
    },
    {
      id: 4,
      title: "Marine Conservation Breakthrough",
      category: "Science",
      importance: "medium",
      content: "Scientists discover new coral restoration technique that could revitalize Caribbean reef systems within decades...",
      tags: ["Marine", "Conservation", "Research"],
      time: "2 hours ago",
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
        alt: "Vibrant coral reef ecosystem"
      }
    },
    {
      id: 5,
      title: "Renewable Energy Milestone",
      category: "Energy",
      importance: "high",
      content: "Caribbean nations achieve 40% renewable energy adoption, setting new global standards for sustainable power generation...",
      tags: ["Energy", "Sustainability", "Progress"],
      time: "3 hours ago",
      media: {
        type: "chart",
        data: {
          labels: ["2020", "2021", "2022", "2023"],
          values: [15, 25, 35, 40],
          title: "Renewable Energy Adoption (%)"
        }
      }
    }
  ];

export default function NewsDashboard() {
  const [scrollStyle, setScrollStyle] = useState('continuous');
  const [darkMode, setDarkMode] = useState(true);
  const [scrollActive, setScrollActive] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const [viewMode, setViewMode] = useState('hybrid');
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Enhanced continuous scroll with smooth behavior
  useEffect(() => {
    if (!scrollActive || !scrollContainerRef.current || scrollStyle !== 'continuous') return;

    let animationFrameId: number;
    const scrollContainer = scrollContainerRef.current;
    const baseSpeed = 0.5;
    const speedMultiplier = scrollSpeed;

    const animate = () => {
      if (!scrollContainer) return;

      scrollContainer.scrollTop += (baseSpeed * speedMultiplier);

      // Reset scroll position when reaching bottom
      if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 10) {
        scrollContainer.scrollTop = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [scrollActive, scrollSpeed, scrollStyle]);

  // Enhanced one-at-a-time scroll with smooth transitions
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (scrollActive && scrollStyle === 'oneAtATime') {
      const scrollDuration = 8000 / scrollSpeed;
      interval = setInterval(() => {
        setCurrentArticleIndex((prev) => (prev + 1) % newsItems.length);
      }, scrollDuration);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [scrollActive, scrollStyle, scrollSpeed, newsItems.length]);

  return (
    <div className={`min-h-screen w-full ${darkMode ? 'dark' : ''} bg-background`}>
      <div className="container py-4 min-h-screen">
        <div className="grid grid-cols-12 gap-4 min-h-[calc(100vh-2rem)]">
          <div className="col-span-12 lg:col-span-8 flex flex-col">
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

            <Card className="mt-4 flex-1">
              <CardHeader>
                <CardTitle>Latest Updates</CardTitle>
              </CardHeader>
              <CardContent className="relative h-[calc(100vh-16rem)]">
                {scrollStyle === 'continuous' ? (
                  <div 
                    ref={scrollContainerRef}
                    className="absolute inset-0 overflow-hidden bg-background"
                  >
                    <div className="space-y-6 p-4">
                      {[...newsItems, ...newsItems, ...newsItems].map((article, index) => (
                        <div 
                          key={`${article.id}-${index}`} 
                          className="transition-opacity duration-500"
                        >
                          <NewsCard 
                            article={article}
                            darkMode={darkMode}
                            viewMode={viewMode}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-4 bg-background">
                    <div className="w-full transition-opacity duration-500 animate-fadeIn">
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

          <div className="col-span-12 lg:col-span-4 space-y-4">
            <SportsTicker darkMode={darkMode} />
            <WeatherWidget />
            <MarketsWidget />
          </div>
        </div>
      </div>
    </div>
  );
}