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
    <div className="bg-background border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 animate-fadeIn flex flex-col h-full">
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <NewsCardHeader importance={article.importance} time={article.time} />
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold hover:text-accent transition-colors duration-200">
            {article.title}
          </h3>
          
          <div className="text-sm text-[#0EA5E9]">
            {article.category}
          </div>
        </div>
        
        <NewsCardMedia media={article.media} viewMode={viewMode} />
        
        <p className="text-muted-foreground text-sm line-clamp-3 hover:line-clamp-none transition-all duration-200">
          {article.content}
        </p>
        
        <div className="mt-auto pt-4">
          <NewsCardFooter tags={article.tags} />
        </div>
      </div>
    </div>
  );
};