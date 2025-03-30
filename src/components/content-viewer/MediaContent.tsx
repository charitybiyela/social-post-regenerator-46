
import React from "react";
import { Music, Video, Play, SkipBack, SkipForward, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaContentProps {
  item: {
    title: string;
    author: string;
    media?: {
      type: string;
      url?: string;
    }[];
  };
  isPlaying: boolean;
  togglePlayPause: () => void;
}

export const MediaContent: React.FC<MediaContentProps> = ({ 
  item, 
  isPlaying, 
  togglePlayPause 
}) => {
  if (!item.media || item.media.length === 0) {
    return null;
  }

  const media = item.media[0];
  
  switch (media.type) {
    case 'music':
      return (
        <div className="rounded-md bg-black aspect-video mb-6 flex flex-col items-center justify-center">
          <Music className="h-16 w-16 text-primary mb-4" />
          <div className="text-lg font-medium text-white">{item.title}</div>
          <div className="text-sm text-gray-400 mt-2">{item.author}</div>
          
          <div className="w-full max-w-md mt-6 px-4">
            <div className="h-1 bg-gray-700 rounded-full w-full">
              <div className="h-1 bg-primary rounded-full" style={{ width: '30%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1:23</span>
              <span>4:56</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <Button variant="ghost" size="icon" className="rounded-full text-white">
              <SkipBack className="h-6 w-6" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12 text-white border-white"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-white">
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>
        </div>
      );
    
    case 'video':
      return (
        <div className="rounded-md bg-black aspect-video mb-6 relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Video className="h-16 w-16 text-primary mb-4" />
            <div className="text-lg font-medium text-white">{item.title}</div>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-16 w-16 mt-4 text-white border-white"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </Button>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="h-1 bg-gray-700 rounded-full w-full">
              <div className="h-1 bg-primary rounded-full" style={{ width: '15%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>2:45</span>
              <span>18:30</span>
            </div>
          </div>
        </div>
      );
      
    case 'website':
      return (
        <div className="rounded-md border mb-6 h-96">
          {media.url ? (
            <iframe 
              src={media.url} 
              className="w-full h-full rounded-md" 
              title={item.title}
              sandbox="allow-same-origin allow-scripts"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <span className="text-muted-foreground">Website URL not provided</span>
            </div>
          )}
        </div>
      );
      
    default:
      return (
        <div className="rounded-md bg-muted aspect-video mb-6 flex items-center justify-center">
          <span className="text-muted-foreground">[{media.type}]</span>
        </div>
      );
  }
};
