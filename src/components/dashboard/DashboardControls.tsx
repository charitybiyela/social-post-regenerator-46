import React from 'react';
import { Newspaper, Image, Layout, Sun, Moon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className={`flex items-center justify-between gap-4 p-4 rounded-lg mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="flex items-center gap-4">
        <Tabs defaultValue={scrollStyle} onValueChange={(value) => setScrollStyle(value)} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="continuous">Continuous Scroll</TabsTrigger>
            <TabsTrigger value="oneAtATime">One at a Time</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className={`flex rounded-md border ${
          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
        }`}>
          <button
            onClick={() => setViewMode('text')}
            className={`p-1.5 rounded-l transition-colors ${
              viewMode === 'text' 
                ? 'bg-blue-500 text-white' 
                : darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
            title="Text Only"
          >
            <Newspaper className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('media')}
            className={`p-1.5 transition-colors ${
              viewMode === 'media' 
                ? 'bg-blue-500 text-white' 
                : darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
            title="Media Only"
          >
            <Image className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('hybrid')}
            className={`p-1.5 rounded-r transition-colors ${
              viewMode === 'hybrid' 
                ? 'bg-blue-500 text-white' 
                : darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
            title="Hybrid View"
          >
            <Layout className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setScrollActive(!scrollActive)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              scrollActive 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'
            } border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
          >
            {scrollActive ? '⏸️ Pause' : '▶️ Play'}
          </button>

          <div className="flex items-center gap-2">
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Speed:
            </span>
            <input
              type="range"
              min="1"
              max="10"
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(Number(e.target.value))}
              className="w-24"
              title={`Speed: ${scrollSpeed}`}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-md transition-colors ${
          darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'
        } border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </div>
  );
};