
import React from "react";
import { Music, Video, Play, SkipBack, SkipForward, Pause, Volume2 } from "lucide-react";
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
        <div className="rounded-md bg-black aspect-video relative overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Music className="h-16 w-16 text-primary mb-4" />
            <div className="text-lg font-medium text-white">{item.title}</div>
            <div className="text-sm text-gray-400 mt-2">{item.author}</div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="h-1 bg-gray-700 rounded-full w-full">
              <div className="h-1 bg-primary rounded-full" style={{ width: '30%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1:23</span>
              <span>4:56</span>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-4">
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
              <Button variant="ghost" size="icon" className="rounded-full text-white">
                <Volume2 className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      );
    
    case 'video':
      return (
        <div className="rounded-md bg-black aspect-video relative overflow-hidden">
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
        <div className="rounded-md border h-96 relative overflow-hidden">
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
        <div className="rounded-md bg-muted aspect-video flex items-center justify-center overflow-hidden">
          <span className="text-muted-foreground">[{media.type}]</span>
        </div>
      );
  }
};
