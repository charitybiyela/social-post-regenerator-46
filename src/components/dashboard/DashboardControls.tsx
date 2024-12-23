import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollControls } from './ScrollControls';
import { ViewControls } from './ViewControls';
import { cn } from "@/lib/utils";

interface DashboardControlsProps {
  scrollStyle: string;
  setScrollStyle: (style: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  scrollActive: boolean;
  setScrollActive: (active: boolean) => void;
  scrollSpeed: number;
  setScrollSpeed: (speed: number) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
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
  darkMode,
  setDarkMode,
}: DashboardControlsProps) => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-4 p-4 backdrop-blur-sm bg-background/80">
      <div className="flex items-center gap-6">
        <Tabs defaultValue={scrollStyle} onValueChange={setScrollStyle} className="w-[300px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="continuous">Continuous</TabsTrigger>
            <TabsTrigger value="oneAtATime">One at a Time</TabsTrigger>
          </TabsList>
        </Tabs>

        <ViewControls viewMode={viewMode} setViewMode={setViewMode} />
        
        <ScrollControls 
          scrollActive={scrollActive}
          setScrollActive={setScrollActive}
          scrollSpeed={scrollSpeed}
          setScrollSpeed={setScrollSpeed}
        />
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
          "hover:bg-accent"
        )}
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {darkMode ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};