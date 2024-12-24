import React from 'react';
import { Newspaper, Image, Layout } from 'lucide-react';

interface DashboardControlsProps {
  scrollStyle: string;
  setScrollStyle: (style: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  scrollActive: boolean;
  setScrollActive: (active: boolean) => void;
  scrollSpeed: number;
  setScrollSpeed: (speed: number) => void;
}

export const DashboardControls = ({
  scrollStyle,
  setScrollStyle,
  viewMode,
  setViewMode,
  scrollActive,
  setScrollActive,
  scrollSpeed,
  setScrollSpeed,
}: DashboardControlsProps) => {
  return (
    <div className="max-w-2xl mx-auto mb-4">
      <div className="flex items-center gap-4 p-2 rounded-lg bg-popover">
        <select 
          value={scrollStyle}
          onChange={(e) => setScrollStyle(e.target.value)}
          className="rounded-md px-3 py-1.5 text-sm bg-background border border-input outline-none"
        >
          <option value="continuous">Continuous</option>
          <option value="oneAtATime">One at a Time</option>
        </select>

        <div className="flex rounded-md border border-input bg-background">
          <button
            onClick={() => setViewMode('text')}
            className={`p-1.5 rounded-l transition-colors ${
              viewMode === 'text' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground'
            }`}
          >
            <Newspaper className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('media')}
            className={`p-1.5 transition-colors ${
              viewMode === 'media' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground'
            }`}
          >
            <Image className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('hybrid')}
            className={`p-1.5 rounded-r transition-colors ${
              viewMode === 'hybrid' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground'
            }`}
          >
            <Layout className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => setScrollActive(!scrollActive)}
          className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
            scrollActive 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-background text-foreground border border-input'
          }`}
        >
          {scrollActive ? '⏸️' : '▶️'}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">Speed:</span>
          <input
            type="range"
            min="1"
            max="10"
            value={scrollSpeed}
            onChange={(e) => setScrollSpeed(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};