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
import { mockNewsItems } from '@/data/mockNews';
import { ExtendedProfile } from '@/types/profile';

export default function NewsDashboard() {
  const [scrollStyle, setScrollStyle] = useState('continuous');
  const [scrollActive, setScrollActive] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const [viewMode, setViewMode] = useState('hybrid');
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const { theme } = useTheme();
  const { userInterests } = usePersonalization();
  const [profile, setProfile] = useState<ExtendedProfile | null>(null);
  const [newsItems, setNewsItems] = useState(mockNewsItems);

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
    <div className="w-full min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6">
        <div className="lg:col-span-8 space-y-6">
          <Card className="overflow-hidden border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="border-b bg-card">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-4">
                  <CardTitle>Latest Updates</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToPreviousArticle}
                      title="Previous article"
                      className="h-8 w-8"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToNextArticle}
                      title="Next article"
                      className="h-8 w-8"
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
            <CardContent className="p-0">
              <div className="h-[calc(100vh-16rem)] overflow-y-auto pt-6"> {/* Added pt-6 for top spacing */}
                <ScrollableNews 
                  newsItems={processNewsItems(newsItems)}
                  scrollStyle={scrollStyle}
                  scrollActive={scrollActive}
                  scrollSpeed={scrollSpeed}
                  viewMode={viewMode}
                  currentArticleIndex={currentArticleIndex}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-6 space-y-6">
            <BreakingNews />
            <SportsTicker />
            <WeatherWidget />
            <MarketsWidget />
            <PersonalizationLink />
          </div>
        </div>
      </div>
    </div>
  );
}
