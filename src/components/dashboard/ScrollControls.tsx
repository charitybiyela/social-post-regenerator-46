import React from 'react';
import { Play, Pause } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ScrollControlsProps {
  scrollActive: boolean;
  setScrollActive: (active: boolean) => void;
  scrollSpeed: number;
  setScrollSpeed: (speed: number) => void;
}

export const ScrollControls = ({
  scrollActive,
  setScrollActive,
  scrollSpeed,
  setScrollSpeed
}: ScrollControlsProps) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setScrollActive(!scrollActive)}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
          scrollActive 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "bg-accent hover:bg-accent/90"
        )}
        aria-label={scrollActive ? "Pause" : "Play"}
      >
        {scrollActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      <div className="flex items-center gap-3">
        <div className="w-24 h-24 relative">
          <input
            type="range"
            min="1"
            max="10"
            value={scrollSpeed}
            onChange={(e) => setScrollSpeed(Number(e.target.value))}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
            style={{
              transform: 'rotate(-90deg)',
              WebkitAppearance: 'none',
            }}
          />
          <div className="absolute inset-2 rounded-full border-2 border-accent opacity-20"></div>
          <div 
            className="absolute inset-2 rounded-full border-2 border-primary"
            style={{
              clipPath: `polygon(0 ${100 - (scrollSpeed/10) * 100}%, 100% ${100 - (scrollSpeed/10) * 100}%, 100% 100%, 0 100%)`
            }}
          ></div>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
            {scrollSpeed}
          </span>
        </div>
      </div>
    </div>
  );
};