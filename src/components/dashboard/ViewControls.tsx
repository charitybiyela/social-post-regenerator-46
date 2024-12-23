import React from 'react';
import { Newspaper, Image, Layout } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ViewControlsProps {
  viewMode: string;
  setViewMode: (mode: string) => void;
}

export const ViewControls = ({ viewMode, setViewMode }: ViewControlsProps) => {
  return (
    <div className="flex rounded-lg overflow-hidden border border-accent">
      <button
        onClick={() => setViewMode('text')}
        className={cn(
          "p-2.5 transition-colors",
          viewMode === 'text' 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-accent/50"
        )}
        title="Text Only"
      >
        <Newspaper className="w-4 h-4" />
      </button>
      <button
        onClick={() => setViewMode('media')}
        className={cn(
          "p-2.5 transition-colors border-x border-accent",
          viewMode === 'media' 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-accent/50"
        )}
        title="Media Only"
      >
        <Image className="w-4 h-4" />
      </button>
      <button
        onClick={() => setViewMode('hybrid')}
        className={cn(
          "p-2.5 transition-colors",
          viewMode === 'hybrid' 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-accent/50"
        )}
        title="Hybrid View"
      >
        <Layout className="w-4 h-4" />
      </button>
    </div>
  );
};