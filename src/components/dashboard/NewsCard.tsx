import React from 'react';
import { useTheme } from 'next-themes';

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

    switch (media.type) {
      case 'chart':
        return (
          <div className="aspect-square w-full bg-gray-800 p-4">
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

  return (
    <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
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
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {article.content}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, i) => (
            <span 
              key={i}
              className="px-2 py-1 rounded-full text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};