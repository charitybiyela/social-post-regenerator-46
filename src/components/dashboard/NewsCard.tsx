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
      <div className="p-6">
        <NewsCardHeader importance={article.importance} time={article.time} />
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:line-clamp-none">
          {article.title}
        </h3>
        
        <div className="text-sm text-[#0EA5E9] mb-4">
          {article.category}
        </div>
        
        <NewsCardMedia media={article.media} viewMode={viewMode} />
        
        <p className="text-muted-foreground mb-6 line-clamp-3 hover:line-clamp-none">
          {article.content}
        </p>
        
        <NewsCardFooter tags={article.tags} />
      </div>
    </div>
  );
};