import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface NewsCardMediaProps {
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
  viewMode: string;
}

export const NewsCardMedia = ({ media, viewMode }: NewsCardMediaProps) => {
  if (!media || viewMode === 'text') return null;

  return (
    <div className="w-full">
      <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden">
        {media.type === 'chart' ? (
          <div className="w-full h-full bg-gray-800 p-4">
            <h4 className="text-sm font-semibold mb-4 text-center text-white">
              {media.data?.title}
            </h4>
            <div className="h-[calc(100%-2rem)] flex items-end justify-between gap-2">
              {media.data?.values.map((value, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-[#0EA5E9] rounded-t transition-all duration-500"
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
            alt={media.alt || 'News media'}
            className="object-cover w-full h-full"
          />
        )}
      </AspectRatio>
    </div>
  );
};