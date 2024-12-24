import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { SportsTicker } from './dashboard/SportsTicker';
import { WeatherWidget } from './dashboard/WeatherWidget';
import { MarketsWidget } from './dashboard/MarketsWidget';
import { BreakingNews } from './dashboard/BreakingNews';
import { DashboardControls } from './dashboard/DashboardControls';
import { ScrollableNews } from './dashboard/ScrollableNews';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonalizationLink } from './PersonalizationLink';
import { usePersonalization } from '@/contexts/PersonalizationContext';
import { loadProfile } from '@/utils/profileStorage';
import { newsRegenerationEngine } from '@/utils/newsRegeneration';

export default function NewsDashboard() {
  const [scrollStyle, setScrollStyle] = useState('continuous');
  const [scrollActive, setScrollActive] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const [viewMode, setViewMode] = useState('hybrid');
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const { theme } = useTheme();
  const { userInterests } = usePersonalization();
  const [profile, setProfile] = useState<ExtendedProfile | null>(null);

  useEffect(() => {
    const savedProfile = loadProfile();
    if (savedProfile) {
      setProfile(savedProfile as ExtendedProfile);
    }
  }, []);

  const processNewsItems = useCallback((items: any[]) => {
    if (!profile) return items;

    return items.map(item => 
      newsRegenerationEngine.adaptContent(item, profile)
    ).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }, [profile]);

  const goToPreviousArticle = () => {
    setCurrentArticleIndex(prev => 
      prev === 0 ? newsItems.length - 1 : prev - 1
    );
  };

  const goToNextArticle = () => {
    setCurrentArticleIndex(prev => 
      (prev + 1) % newsItems.length
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <Card className="min-h-[500px] max-h-[80vh] h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <CardTitle>Latest Updates</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToPreviousArticle}
                      title="Previous article"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToNextArticle}
                      title="Next article"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
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
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)] overflow-y-auto">
              <ScrollableNews 
                newsItems={processNewsItems(newsItems)}
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
          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            <BreakingNews />
            <SportsTicker />
            <WeatherWidget />
            <MarketsWidget />
            <PersonalizationLink />
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
