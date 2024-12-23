import React from 'react';
import { NewsItem } from '@/types/news';
import { NewsCard } from './NewsCard';

interface NewsGridProps {
  newsItems: NewsItem[];
  darkMode: boolean;
  viewMode: string;
}

export const NewsGrid = ({ newsItems, darkMode, viewMode }: NewsGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {newsItems.map((article, index) => (
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
  );
};