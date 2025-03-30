
import React, { useEffect, useState } from 'react';
import { Sparkles, Moon, Sun, Menu, X, PanelLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism navbar */}
      <div className="h-12 bg-background/70 backdrop-blur-md border-b border-border/30 flex items-center px-4">
        <div className="flex-1 flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative h-6 w-6 flex items-center justify-center mr-1"
              >
                <Sparkles className="h-4 w-4 text-primary absolute" />
                <div className="h-5 w-5 rounded-full bg-primary/20 animate-pulse" />
              </motion.div>
              <span className="font-bold text-base bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                VibeSpace
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            {mounted && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="h-8 w-8 rounded-full"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            
            <div className="hidden md:flex items-center gap-2">
              <Link to="/personalize">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 bg-background/60 border-border/30 text-xs"
                >
                  My Profile
                </Button>
              </Link>
              <Button 
                size="sm" 
                className="h-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-xs"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Upgrade
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-12 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/30 py-2 px-4 md:hidden"
        >
          <div className="flex flex-col space-y-2">
            <Link to="/personalize">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-sm"
              >
                My Profile
              </Button>
            </Link>
            <Button 
              size="sm" 
              className="w-full justify-start bg-gradient-to-r from-primary to-accent hover:opacity-90 text-sm"
            >
              <Sparkles className="h-3 w-3 mr-2" />
              Upgrade
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Navigation;
