
import React, { useRef, useEffect } from "react";
import { Music, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AudioPlayerProps {
  title: string;
  author: string;
  url?: string;
  isPlaying: boolean;
  togglePlayPause: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  author,
  url = "/assets/sample-audio.mp3",
  isPlaying,
  togglePlayPause
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error("Error playing audio:", err);
          toast.error("Couldn't play audio. Try clicking play again.");
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="rounded-md bg-black aspect-video relative overflow-hidden glow-effect">
      {/* Hidden audio element for actual playback */}
      <audio 
        ref={audioRef}
        src={url} 
        preload="metadata"
        onError={() => toast.error("Audio file could not be loaded")}
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Music className="h-16 w-16 text-primary mb-4 animate-float" />
        <div className="text-lg font-medium text-white">{title}</div>
        <div className="text-sm text-gray-400 mt-2">{author}</div>
      </div>
      
      {/* Metadata Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
        <div className="text-xs text-white/70">Now Playing</div>
        <div className="flex justify-between items-center mt-1">
          <div className="text-white text-sm truncate">{title}</div>
          <div className="text-white/70 text-xs">4:56</div>
        </div>
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
            className="rounded-full h-12 w-12 text-white border-white hover-glow"
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
};
