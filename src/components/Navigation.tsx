
import React, { useEffect, useState } from 'react';
import { Sparkles, Moon, Sun, Menu, X, Bell, Search, User, Settings, TrendingUp } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavigationProps {
  onCreateClick?: () => void;
}

const Navigation = ({ onCreateClick }: NavigationProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    setMounted(true);
    
    // Force dark mode class on the body for proper background
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism navbar */}
      <div className="h-12 neo-blur border-b border-border/30 flex items-center px-4">
        <div className="flex-1 flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="relative h-6 w-6 flex items-center justify-center mr-1"
              >
                <Sparkles className="h-4 w-4 text-primary absolute animate-glow" />
                <div className="h-5 w-5 rounded-full bg-primary/20 animate-pulse" />
              </motion.div>
              <span className="font-bold text-base bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                VibeSpace
              </span>
            </Link>
            
            <div className="hidden md:block ml-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/" className={cn(
                      navigationMenuTriggerStyle(),
                      "h-8 px-3 py-1.5 text-xs",
                      location.pathname === "/" ? "bg-accent/30" : ""
                    )}>
                      Home
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/about" className={cn(
                      navigationMenuTriggerStyle(),
                      "h-8 px-3 py-1.5 text-xs",
                      location.pathname === "/about" ? "bg-accent/30" : ""
                    )}>
                      Explore
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/trending" className={cn(
                      navigationMenuTriggerStyle(),
                      "h-8 px-3 py-1.5 text-xs flex items-center",
                      location.pathname === "/trending" ? "bg-accent/30" : ""
                    )}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          
          <div className="hidden md:flex items-center bg-muted/40 backdrop-blur-sm rounded-full px-3 py-1.5 w-64">
            <Search className="h-3.5 w-3.5 text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Search VibeSpace" 
              className="bg-transparent text-xs border-none focus:outline-none w-full" 
            />
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
              className="h-8 w-8 rounded-full relative hidden md:flex"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>
            
            <Link to="/personalize" className="hidden md:block">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full overflow-hidden border border-primary/20"
              >
                <User className="h-4 w-4" />
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            
            <div className="hidden md:block">
              <Button 
                size="sm" 
                className="h-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-xs neo-blur border-none hover-glow"
                onClick={onCreateClick}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Create
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
          className="absolute top-12 left-0 right-0 neo-blur border-b border-border/30 py-3 px-4 md:hidden z-50"
        >
          <div className="flex flex-col space-y-3">
            <div className="bg-muted/40 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center">
              <Search className="h-3.5 w-3.5 text-muted-foreground mr-2" />
              <input 
                type="text" 
                placeholder="Search VibeSpace" 
                className="bg-transparent text-xs border-none focus:outline-none w-full" 
              />
            </div>
            
            <Link to="/" 
              onClick={closeMenu}
              className={`flex items-center px-3 py-2 hover:bg-muted/40 rounded-lg transition-colors ${location.pathname === "/" ? "bg-accent/30" : ""}`}
            >
              <span className="text-sm font-medium">Home</span>
            </Link>
            
            <Link to="/about" 
              onClick={closeMenu}
              className={`flex items-center px-3 py-2 hover:bg-muted/40 rounded-lg transition-colors ${location.pathname === "/about" ? "bg-accent/30" : ""}`}
            >
              <span className="text-sm font-medium">Explore</span>
            </Link>
            
            <Link to="/trending" 
              onClick={closeMenu}
              className={`flex items-center px-3 py-2 hover:bg-muted/40 rounded-lg transition-colors ${location.pathname.includes("/trending") ? "bg-accent/30" : ""}`}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Trending</span>
            </Link>
            
            <Link to="/personalize" 
              onClick={closeMenu}
              className={`flex items-center px-3 py-2 hover:bg-muted/40 rounded-lg transition-colors ${location.pathname === "/personalize" ? "bg-accent/30" : ""}`}
            >
              <User className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Profile</span>
            </Link>
            
            <Link to="/privacy" 
              onClick={closeMenu}
              className={`flex items-center px-3 py-2 hover:bg-muted/40 rounded-lg transition-colors ${location.pathname === "/privacy" ? "bg-accent/30" : ""}`}
            >
              <Settings className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Privacy</span>
            </Link>
            
            <Link to="/terms" 
              onClick={closeMenu}
              className={`flex items-center px-3 py-2 hover:bg-muted/40 rounded-lg transition-colors ${location.pathname === "/terms" ? "bg-accent/30" : ""}`}
            >
              <Settings className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Terms</span>
            </Link>
            
            <Link to="/contact" 
              onClick={closeMenu}
              className={`flex items-center px-3 py-2 hover:bg-muted/40 rounded-lg transition-colors ${location.pathname === "/contact" ? "bg-accent/30" : ""}`}
            >
              <Bell className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Contact</span>
            </Link>
            
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-sm neo-blur border-none hover-glow"
              onClick={() => {
                onCreateClick?.();
                closeMenu();
              }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Create
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Navigation;
