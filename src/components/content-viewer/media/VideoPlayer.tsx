
import React from "react";
import { Video, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  title: string;
  author: string;
  isPlaying: boolean;
  togglePlayPause: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  author,
  isPlaying,
  togglePlayPause
}) => {
  return (
    <div className="rounded-md bg-black aspect-video relative overflow-hidden glow-effect">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Video className="h-16 w-16 text-primary mb-4 animate-float" />
        <div className="text-lg font-medium text-white">{title}</div>
      </div>
      
      {/* Metadata Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-white text-sm truncate">{title}</div>
            <div className="text-white/70 text-xs">{author}</div>
          </div>
          <div className="bg-red-600 text-white text-xs px-2 py-0.5 rounded">LIVE</div>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full h-16 w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white border-white hover-glow"
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <Pause className="h-8 w-8" />
        ) : (
          <Play className="h-8 w-8" />
        )}
      </Button>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
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
};
