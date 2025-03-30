
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  FileText, 
  Bell, 
  ExternalLink,
  ListFilter,
  Bot
} from "lucide-react";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border border-border/50 z-10"
    >
      <div className="flex items-center space-x-2">
        <Button 
          variant={agentVisible ? "default" : "ghost"} 
          size="icon"
          className="h-8 w-8"
          onClick={onToggleAgent}
        >
          <Bot className="h-4 w-4" />
        </Button>
        <Button 
          variant={postsVisible ? "default" : "ghost"}
          size="icon"
          className="h-8 w-8"
          onClick={onTogglePosts}
        >
          <ListFilter className="h-4 w-4" />
        </Button>
        <div className="h-4 w-px bg-border mx-1"></div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <FileText className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ExternalLink className="h-4 w-4" />
        </Button>
        <div className="h-4 w-px bg-border mx-1"></div>
        <Button 
          variant={isDimmed ? "default" : "ghost"} 
          size="icon" 
          className="h-8 w-8"
          onClick={onDimBackground}
        >
          <div className="h-4 w-4 flex items-center justify-center font-bold text-xs">
            {isDimmed ? "B" : "W"}
          </div>
        </Button>
      </div>
    </motion.div>
  );
};
