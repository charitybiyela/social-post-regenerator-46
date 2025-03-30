
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import { Button } from "@/components/ui/button";
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
  ChevronLeft,
  ChevronRight,
  GripHorizontal
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null); // Reference for Draggable

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const handleDrag = (e: any, data: { x: number, y: number }) => {
    setPosition({ x: data.x, y: data.y });
  };

  // Buttons configuration
  const leftButtons = [
    { icon: <Bot className="h-4 w-4" />, variant: agentVisible ? "default" : "ghost", onClick: onToggleAgent, title: "AI Assistant" },
    { icon: <ListFilter className="h-4 w-4" />, variant: postsVisible ? "default" : "ghost", onClick: onTogglePosts, title: "Posts" },
    { icon: <MessageSquare className="h-4 w-4" />, variant: "ghost", onClick: () => {}, title: "Chat" },
    { icon: <FileText className="h-4 w-4" />, variant: "ghost", onClick: () => {}, title: "Articles" },
  ];
  
  const rightButtons = [
    { icon: <Bell className="h-4 w-4" />, variant: "ghost", onClick: () => {}, title: "Notifications" },
    { icon: <ExternalLink className="h-4 w-4" />, variant: "ghost", onClick: () => {}, title: "Share" },
    { icon: <Heart className="h-4 w-4" />, variant: "ghost", onClick: () => {}, title: "Like" },
    { icon: <MessageCircle className="h-4 w-4" />, variant: "ghost", onClick: () => {}, title: "Comment" },
    { icon: isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />, variant: "ghost", onClick: toggleTheme, title: isDark ? "Light mode" : "Dark mode" },
    { 
      icon: <div className="h-4 w-4 flex items-center justify-center font-bold text-xs">{isDimmed ? "B" : "D"}</div>, 
      variant: isDimmed ? "default" : "ghost", 
      onClick: onDimBackground, 
      title: isDimmed ? "Bright mode" : "Dim mode" 
    }
  ];

  return (
    <Draggable 
      nodeRef={nodeRef}
      handle=".panel-drag-handle"
      bounds="parent"
      position={position}
      onDrag={handleDrag}
      defaultPosition={{ x: 0, y: 0 }}
    >
      <motion.div
        ref={nodeRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 left-[35%] transform -translate-x-1/2 neo-blur rounded-full px-3 py-1.5 shadow-lg z-50 glow-effect"
      >
        <div className="flex items-center justify-between gap-2">
          {/* Left side buttons */}
          {!isMinimized && (
            <div className="flex items-center space-x-1.5">
              <div className="panel-drag-handle cursor-move p-1 hover:bg-muted/40 rounded-full transition-colors mr-1">
                <GripHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              {leftButtons.map((btn, index) => (
                <Button 
                  key={`left-${index}`}
                  variant={btn.variant as any} 
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={btn.onClick}
                  title={btn.title}
                >
                  {btn.icon}
                </Button>
              ))}
            </div>
          )}
          
          {/* Center minimize/expand button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={toggleMinimized}
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          
          {/* Right side buttons */}
          {!isMinimized && (
            <div className="flex items-center space-x-1.5">
              {rightButtons.map((btn, index) => (
                <Button 
                  key={`right-${index}`}
                  variant={btn.variant as any} 
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={btn.onClick}
                  title={btn.title}
                >
                  {btn.icon}
                </Button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Draggable>
  );
};
