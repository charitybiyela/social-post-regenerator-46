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
    <div className="bg-background border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 animate-fadeIn h-full flex flex-col">
      <div className="p-6 flex flex-col flex-grow">
        <NewsCardHeader importance={article.importance} time={article.time} />
        
        <div className="mt-4 mb-4">
          <h3 className="text-xl font-bold mb-2 hover:text-accent transition-colors duration-200">
            {article.title}
          </h3>
          
          <div className="text-sm text-[#0EA5E9]">
            {article.category}
          </div>
        </div>
        
        <div className="mb-4">
          <NewsCardMedia media={article.media} viewMode={viewMode} />
        </div>
        
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 hover:line-clamp-none transition-all duration-200">
          {article.content}
        </p>
        
        <div className="mt-auto">
          <NewsCardFooter tags={article.tags} />
        </div>
      </div>
    </div>
  );
};