import React from 'react';

interface NewsCardHeaderProps {
  importance: string;
  time: string;
}

export const NewsCardHeader = ({ importance, time }: NewsCardHeaderProps) => (
  <div className="flex justify-between items-center mb-4">
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
      importance === 'high' 
        ? 'bg-[#FFDEE2] text-red-500 dark:bg-red-500/20' 
        : 'bg-[#D3E4FD] text-blue-500 dark:bg-blue-500/20'
    }`}>
      {importance.toUpperCase()}
    </span>
    <span className="text-sm text-muted-foreground">{time}</span>
  </div>
);