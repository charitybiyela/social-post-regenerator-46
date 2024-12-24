import React from 'react';
import { useTheme } from 'next-themes';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MessageSquare, Share2, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
  const { theme } = useTheme();
  
  const renderMedia = (media: NewsCardProps['article']['media']) => {
    if (!media || viewMode === 'text') return null;

    return (
      <div className="w-full mb-4">
        <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg overflow-hidden">
          {media.type === 'chart' ? (
            <div className="w-full h-full bg-gray-800 p-4">
              <h4 className="text-sm font-semibold mb-4 text-center text-white">
                {media.data?.title}
              </h4>
              <div className="h-[calc(100%-2rem)] flex items-end justify-between gap-2">
                {media.data?.values.map((value, i) => (
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
          ) : (
            <img 
              src={media.src || '/placeholder.svg'} 
              alt={media.alt || article.title}
              className="object-cover w-full h-full"
            />
          )}
        </AspectRatio>
      </div>
    );
  };

  return (
    <Card className="w-full bg-background animate-fadeIn">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            article.importance === 'high' 
              ? 'bg-red-100 text-red-500 dark:bg-red-500/20' 
              : 'bg-blue-100 text-blue-500 dark:bg-blue-500/20'
          }`}>
            {article.importance.toUpperCase()}
          </span>
          <span className="text-sm text-muted-foreground">{article.time}</span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight">{article.title}</h2>
        
        <div className="text-base font-medium text-blue-400/90 dark:text-blue-400">
          {article.category}
        </div>
        
        {renderMedia(article.media)}
        
        <p className="text-muted-foreground leading-relaxed">
          {article.content}
        </p>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, i) => (
              <span 
                key={i}
                className="px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ThumbsUp className="w-4 h-4 mr-2" />
              <span>Like</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>Comment</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Share2 className="w-4 h-4 mr-2" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};