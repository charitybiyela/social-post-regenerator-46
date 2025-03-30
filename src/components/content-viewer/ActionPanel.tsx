
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { 
  MessageSquare, 
  FileText, 
  Bell, 
  ExternalLink,
  ListFilter,
  Bot,
  Moon,
  Sun,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useTheme } from "next-themes";

interface ActionPanelProps {
  onTogglePosts: () => void;
  postsVisible: boolean;
  onToggleAgent: () => void;
  agentVisible: boolean;
  onDimBackground: () => void;
  isDimmed: boolean;
}

export const ActionPanel = ({ 
  onTogglePosts, 
  postsVisible, 
  onToggleAgent, 
  agentVisible, 
  onDimBackground,
  isDimmed
}: ActionPanelProps) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed left-4 bottom-4 neo-blur rounded-full px-2 py-1.5 shadow-lg z-50 glow-effect flex items-center`}
      style={{ zIndex: 1000 }} // Ensure it's above everything
    >
      <Button 
        variant="ghost" 
        size="icon"
        className="h-8 w-8 rounded-full mr-1"
        onClick={toggleMinimized}
        title={isMinimized ? "Expand" : "Minimize"}
      >
        {isMinimized ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
      
      {!isMinimized && (
        <div className="flex items-center space-x-2">
          <Button 
            variant={agentVisible ? "default" : "ghost"} 
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onToggleAgent}
            title="AI Assistant"
          >
            <Bot className="h-4 w-4" />
          </Button>
          <Button 
            variant={postsVisible ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onTogglePosts}
            title="Posts"
          >
            <ListFilter className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-border/30 mx-1"></div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Chat">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Articles">
            <FileText className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Share">
            <ExternalLink className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-border/30 mx-1"></div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Like">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Comment">
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Share">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Save">
            <Bookmark className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-border/30 mx-1"></div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={toggleTheme}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button 
            variant={isDimmed ? "default" : "ghost"} 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={onDimBackground}
            title={isDimmed ? "Bright mode" : "Dim mode"}
          >
            <div className="h-4 w-4 flex items-center justify-center font-bold text-xs">
              {isDimmed ? "B" : "D"}
            </div>
          </Button>
        </div>
      )}
    </motion.div>
  );
};
