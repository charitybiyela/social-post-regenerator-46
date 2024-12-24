import React, { useState, useEffect } from 'react';
import { Newspaper, Image, Layout } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { NewsCard } from './dashboard/NewsCard';
import { SportsTicker } from './dashboard/SportsTicker';
import { WeatherWidget } from './dashboard/WeatherWidget';
import { MarketsWidget } from './dashboard/MarketsWidget';

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
    <div className="w-full min-h-screen p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Controls - Now constrained to match news feed width */}
      <div className="max-w-2xl mx-auto mb-4">
        <div className="flex items-center gap-4 p-2 rounded-lg bg-popover">
          <select 
            value={scrollStyle}
            onChange={(e) => setScrollStyle(e.target.value)}
            className="rounded-md px-3 py-1.5 text-sm bg-background border border-input outline-none"
          >
            <option value="continuous">Continuous</option>
            <option value="oneAtATime">One at a Time</option>
          </select>

          <div className="flex rounded-md border border-input bg-background">
            <button
              onClick={() => setViewMode('text')}
              className={`p-1.5 rounded-l transition-colors ${
                viewMode === 'text' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-foreground'
              }`}
            >
              <Newspaper className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('media')}
              className={`p-1.5 transition-colors ${
                viewMode === 'media' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-foreground'
              }`}
            >
              <Image className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('hybrid')}
              className={`p-1.5 rounded-r transition-colors ${
                viewMode === 'hybrid' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-foreground'
              }`}
            >
              <Layout className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setScrollActive(!scrollActive)}
            className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
              scrollActive 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background text-foreground border border-input'
            }`}
          >
            {scrollActive ? '⏸️' : '▶️'}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">Speed:</span>
            <input
              type="range"
              min="1"
              max="10"
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(Number(e.target.value))}
              className="w-24"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4">
        {/* News Feed Column */}
        <div className="col-span-8">
          <Card className="h-[calc(100vh-280px)]">
            <CardHeader>
              <CardTitle>Latest Updates</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-4rem)] overflow-hidden">
              {scrollStyle === 'continuous' ? (
                <div className="space-y-6 overflow-y-auto h-full">
                  {newsItems.map((article) => (
                    <div key={article.id} className="max-w-2xl mx-auto">
                      <NewsCard article={article} viewMode={viewMode} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="max-w-2xl w-full">
                    <NewsCard article={newsItems[currentArticleIndex]} viewMode={viewMode} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
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
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          
          .animate-ticker {
            animation: ticker 20s linear infinite;
          }
          
          .animate-ticker:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
}