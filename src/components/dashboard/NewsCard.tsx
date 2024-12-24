import React from 'react';
import { NewsCardHeader } from './news/NewsCardHeader';
import { NewsCardMedia } from './news/NewsCardMedia';
import { NewsCardFooter } from './news/NewsCardFooter';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

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
    <div 
      className="bg-background border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 animate-fadeIn"
      role="article"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Author's profile picture" />
              <AvatarFallback aria-label="Author initials">AU</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Author Name</span>
              <time className="text-xs text-muted-foreground">{article.time}</time>
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
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag, i) => (
              <button 
                key={i}
                className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-pointer"
                title={`View ${tag} tagged posts`}
              >
                #{tag}
              </button>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 h-10 gap-2"
              title="Like this post"
            >
              <ThumbsUp className="h-4 w-4" aria-hidden="true" />
              <span>24</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 h-10 gap-2"
              title="Comment on this post"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>12</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 h-10 gap-2"
              title="Share this post"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};