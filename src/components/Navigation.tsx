
import React from 'react';
import { Sparkles } from 'lucide-react';

const Navigation = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-background/50 backdrop-blur-sm border-b z-50 flex items-center px-4">
      <div className="flex-1 flex items-center">
        <Sparkles className="h-4 w-4 mr-2 text-primary" />
        <span className="font-medium text-sm">VibeSpace</span>
      </div>
    </div>
  );
};

export default Navigation;
