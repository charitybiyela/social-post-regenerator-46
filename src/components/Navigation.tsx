import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const Navigation = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-end px-6 z-50 bg-background/80 backdrop-blur-sm border-b">
      
    </div>
  );
};

export default Navigation;
