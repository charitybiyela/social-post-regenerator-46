import React, { useState, useEffect } from 'react';
import { 
  Globe, BarChart2, Newspaper, Image, Layout,
  Sun, Moon, Clock, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import styles from '../styles/ticker.module.css';

export default function NewsDashboard() {
  const [scrollStyle, setScrollStyle] = useState('continuous');
  const [darkMode, setDarkMode] = useState(true);
  const [scrollActive, setScrollActive] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const [viewMode, setViewMode] = useState('hybrid');
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

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
    let interval;
    if (scrollActive && scrollStyle === 'oneAtATime') {
      interval = setInterval(() => {
        setCurrentArticleIndex(prev => (prev + 1) % newsItems.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [scrollActive, scrollStyle, newsItems.length]);

  const renderMedia = (media) => {
    if (!media || viewMode === 'text') return null;

    switch (media.type) {
      case 'chart':
        return (
          <div className="aspect-square w-full bg-gray-800 p-4">
            <h4 className="text-sm font-semibold mb-4 text-center text-white">
              {media.data.title}
            </h4>
            <div className="h-[calc(100%-2rem)] flex items-end justify-between gap-2">
              {media.data.values.map((value, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all duration-500"
                    style={{ height: `${(value/350)*100}%` }}
                  />
                  <span className="text-xs mt-2 text-white">{media.data.labels[i]}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="aspect-square w-full overflow-hidden">
            <img 
              src={media.src} 
              alt={media.alt}
              className="w-full h-full object-cover"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderNewsCard = (article) => (
    <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
      {viewMode !== 'text' && article.media && renderMedia(article.media)}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-2 py-1 rounded-full text-xs ${
            article.importance === 'high' 
              ? 'bg-red-500/20 text-red-500' 
              : 'bg-blue-500/20 text-blue-500'
          }`}>
            {article.importance.toUpperCase()}
          </span>
          <span className="text-sm opacity-60">{article.time}</span>
        </div>

        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
        <div className="text-sm text-blue-400 mb-3">{article.category}</div>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
          {article.content}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, i) => (
            <span 
              key={i}
              className={`px-2 py-1 rounded-full text-xs ${
                darkMode 
                  ? 'bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`w-full min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Controls */}
      <div className={`flex items-center gap-4 p-2 rounded-lg mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <select 
          value={scrollStyle}
          onChange={(e) => setScrollStyle(e.target.value)}
          className={`rounded-md px-3 py-1.5 text-sm ${
            darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
          } border outline-none`}
        >
          <option value="continuous">Continuous</option>
          <option value="oneAtATime">One at a Time</option>
        </select>

        <div className={`flex rounded-md border ${
          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
        }`}>
          <button
            onClick={() => setViewMode('text')}
            className={`p-1.5 rounded-l transition-colors ${
              viewMode === 'text' 
                ? 'bg-blue-500 text-white' 
                : darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <Newspaper className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('media')}
            className={`p-1.5 transition-colors ${
              viewMode === 'media' 
                ? 'bg-blue-500 text-white' 
                : darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <Image className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('hybrid')}
            className={`p-1.5 rounded-r transition-colors ${
              viewMode === 'hybrid' 
                ? 'bg-blue-500 text-white' 
                : darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <Layout className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => setScrollActive(!scrollActive)}
          className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
            scrollActive 
              ? 'bg-blue-500 text-white' 
              : darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-600 border-gray-300'
          } border`}
        >
          {scrollActive ? '⏸️' : '▶️'}
        </button>

        <div className="flex items-center gap-2">
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Speed:
          </span>
          <input
            type="range"
            min="1"
            max="10"
            value={scrollSpeed}
            onChange={(e) => setScrollSpeed(Number(e.target.value))}
            className="w-24"
          />
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-1.5 rounded-md transition-colors ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-600'
          } border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          {/* News Feed */}
          <Card className={`${darkMode ? 'bg-gray-800' : 'bg-white'} mb-4`}>
            <CardHeader>
              <CardTitle>Latest Updates</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100vh-280px)] overflow-hidden">
              {scrollStyle === 'continuous' ? (
                <div className="space-y-6">
                  {newsItems.map((article) => (
                    <div key={article.id} className="max-w-2xl mx-auto">
                      {renderNewsCard(article)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="max-w-2xl w-full">
                    {renderNewsCard(newsItems[currentArticleIndex])}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-4 space-y-4">
          {/* Sports Ticker */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Activity className="w-4 h-4" />
                Live Sports
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-hidden pt-0">
              <div className={`flex whitespace-nowrap ${styles.animateTicker}`}>
                {[
                  { teams: "MUN vs ARS", score: "2-1", time: "85'" },
                  { teams: "LAL vs GSW", score: "98-92", time: "Q4" },
                  { teams: "WI vs ENG", score: "245/6", time: "LIVE" },
                  { teams: "MUN vs ARS", score: "2-1", time: "85'" },
                  { teams: "LAL vs GSW", score: "98-92", time: "Q4" },
                  { teams: "WI vs ENG", score: "245/6", time: "LIVE" }
                ].map((game, index) => (
                  <div key={index} className="inline-flex items-center gap-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      {game.time}
                    </span>
                    <span className="font-medium">{game.teams}</span>
                    <span className="text-blue-500 font-bold">{game.score}</span>
                    <span className="text-gray-400 px-2">|</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">28°C</div>
                  <div className="text-sm text-gray-500">Feels like 30°C</div>
                </div>
                <div className="text-right">
                  <div className="text-lg">Partly Cloudy</div>
                  <div className="text-sm text-gray-500">Kingston, JA</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Markets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5" />
                Markets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">JSE</span>
                  <span className="text-green-500">+1.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">USD/JMD</span>
                  <span>156.75</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
