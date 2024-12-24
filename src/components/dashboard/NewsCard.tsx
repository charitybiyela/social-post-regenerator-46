import React from 'react';
import { NewsCardHeader } from './news/NewsCardHeader';
import { NewsCardMedia } from './news/NewsCardMedia';
import { NewsCardFooter } from './news/NewsCardFooter';

interface NewsCardProps {
  article: {
    id: number;
    title: string;
    category: string;
    importance: string;
    content: string;
    tags: string[];
    time: string;
    media?: {
      type: string;
      data?: {
        labels: string[];
        values: number[];
        title: string;
      };
      src?: string;
      alt?: string;
    };
  };
  viewMode: string;
}

export const NewsCard = ({ article, viewMode }: NewsCardProps) => {
  return (
    <div className="bg-background border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 animate-fadeIn">
      <div className="p-4">
        <NewsCardHeader importance={article.importance} time={article.time} />
        
        <div className="mt-3 mb-4">
          <h3 className="text-2xl font-bold mb-2 hover:text-accent transition-colors duration-200">
            {article.title}
          </h3>
          
          <div className="text-sm text-[#0EA5E9]">
            {article.category}
          </div>
        </div>
        
        <NewsCardMedia media={article.media} viewMode={viewMode} />
        
        <p className="text-muted-foreground text-sm mt-4 mb-4 line-clamp-3 hover:line-clamp-none transition-all duration-200">
          {article.content}
        </p>
        
        <NewsCardFooter tags={article.tags} />
      </div>
    </div>
  );
};