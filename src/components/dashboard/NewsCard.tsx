import React from 'react';
import { NewsCardHeader } from './news/NewsCardHeader';
import { NewsCardMedia } from './news/NewsCardMedia';
import { NewsCardFooter } from './news/NewsCardFooter';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Author" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Author Name</span>
              <span className="text-xs text-muted-foreground">{article.time}</span>
            </div>
          </div>
          <NewsCardHeader importance={article.importance} time={article.time} />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold hover:text-accent transition-colors duration-200">
              {article.title}
            </h3>
            <div className="text-sm text-[#0EA5E9] mt-1">
              {article.category}
            </div>
          </div>

          {article.media && (
            <div className="relative w-full h-[240px] rounded-lg overflow-hidden">
              <NewsCardMedia media={article.media} viewMode={viewMode} />
            </div>
          )}

          <p className="text-muted-foreground text-sm line-clamp-3 hover:line-clamp-none transition-all duration-200">
            {article.content}
          </p>
        </div>

        <div className="mt-6">
          <NewsCardFooter tags={article.tags} />
        </div>
      </div>
    </div>
  );
};