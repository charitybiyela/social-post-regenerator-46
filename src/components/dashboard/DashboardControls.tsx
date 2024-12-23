import React from 'react';
import { Newspaper, Image, Layout, Sun, Moon } from 'lucide-react';

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
    <div className={`flex items-center gap-4 p-2 rounded-lg mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <select 
        value={scrollStyle}
        onChange={(e) => setScrollStyle(e.target.value)}
        className={`rounded-md px-3 py-1.5 text-sm ${
          darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
        } border outline-none`}
      >
        <option value="continuous">Continuous</option>
        <option value="oneAtATime">One at a Time</option>
      </select>

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
        >
          <Layout className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={() => setScrollActive(!scrollActive)}
        className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
          scrollActive 
            ? 'bg-blue-500 text-white' 
            : darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-600 border-gray-300'
        } border`}
      >
        {scrollActive ? '⏸️' : '▶️'}
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
        />
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-1.5 rounded-md transition-colors ${
          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-600'
        } border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
      >
        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </div>
  );
};