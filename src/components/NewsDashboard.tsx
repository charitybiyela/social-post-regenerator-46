import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardControls } from './dashboard/DashboardControls';
import { ScrollableNewsContainer } from './dashboard/ScrollableNewsContainer';
import { SportsTicker } from './dashboard/SportsTicker';
import { WeatherWidget } from './dashboard/WeatherWidget';
import { MarketsWidget } from './dashboard/MarketsWidget';
import { NewsItem } from '@/types/news';
import { Home, Search, Compass, Film, MessageSquare, Bell, PlusCircle, User } from 'lucide-react';

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

  const navigationItems = [
    { icon: Home, label: 'Home' },
    { icon: Search, label: 'Search' },
    { icon: Compass, label: 'Explore' },
    { icon: Film, label: 'Videos' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: Bell, label: 'Notifications' },
    { icon: PlusCircle, label: 'Create' },
    { icon: User, label: 'Profile' },
  ];

  return (
    <div className={`min-h-screen w-full ${darkMode ? 'dark' : ''} bg-background`}>
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-border bg-sidebar-background text-sidebar-foreground p-4 flex flex-col gap-6">
          <div className="text-xl font-bold mb-8">News Dashboard</div>
          {navigationItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 container py-4">
          <div className="grid grid-cols-12 gap-4">
            {/* News Feed Column */}
            <div className="col-span-8 flex flex-col">
              <div className="sticky top-0 z-10 min-h-[4rem] bg-background/80 backdrop-blur-sm">
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
                <CardHeader>
                  <CardTitle>Latest Updates</CardTitle>
                </CardHeader>
                <CardContent className="relative h-[calc(100vh-16rem)]">
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

            {/* Right Sidebar */}
            <div className="col-span-4 space-y-4">
              <SportsTicker darkMode={darkMode} />
              <WeatherWidget />
              <MarketsWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
