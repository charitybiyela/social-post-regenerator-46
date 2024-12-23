import React from 'react';
import { SportsTicker } from './SportsTicker';
import { WeatherWidget } from './WeatherWidget';
import { MarketsWidget } from './MarketsWidget';

export const RightPanel = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <div className="hidden lg:block col-span-4 space-y-4 h-screen sticky top-0 pt-4 px-4">
      <SportsTicker darkMode={darkMode} />
      <WeatherWidget />
      <MarketsWidget />
    </div>
  );
};