
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Bell, 
  FileText, 
  ExternalLink,
  X
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActionPanelProps {}

export const ActionPanel = ({}: ActionPanelProps) => {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const togglePanel = (panel: string) => {
    if (activePanel === panel) {
      setActivePanel(null);
    } else {
      setActivePanel(panel);
    }
  };

  return (
    <div className="flex items-center justify-center mt-2 relative">
      <div className="bg-background/80 backdrop-blur-sm rounded-full p-1 flex items-center gap-1 shadow-md">
        <Button
          variant={activePanel === "messages" ? "default" : "ghost"}
          size="sm"
          className="h-8 w-8 p-0 rounded-full"
          onClick={() => togglePanel("messages")}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button
          variant={activePanel === "notifications" ? "default" : "ghost"}
          size="sm"
          className="h-8 w-8 p-0 rounded-full"
          onClick={() => togglePanel("notifications")}
        >
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          variant={activePanel === "notes" ? "default" : "ghost"}
          size="sm"
          className="h-8 w-8 p-0 rounded-full"
          onClick={() => togglePanel("notes")}
        >
          <FileText className="h-4 w-4" />
        </Button>
        <Button
          variant={activePanel === "external" ? "default" : "ghost"}
          size="sm"
          className="h-8 w-8 p-0 rounded-full"
          onClick={() => togglePanel("external")}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence>
        {activePanel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-2 right-4 w-72 bg-background/95 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="text-sm font-medium">
                {activePanel === "messages" && "Messages"}
                {activePanel === "notifications" && "Notifications"}
                {activePanel === "notes" && "Notes"}
                {activePanel === "external" && "External Portals"}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setActivePanel(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <ScrollArea className="h-64">
              {activePanel === "messages" && (
                <div className="p-3 space-y-2">
                  <PanelItem 
                    title="Alice" 
                    content="Hey, did you see the new content I posted?"
                    time="Just now" 
                  />
                  <PanelItem 
                    title="Bob" 
                    content="Let's collaborate on a new project"
                    time="2h ago" 
                  />
                  <PanelItem 
                    title="TechBot" 
                    content="Your analysis is ready for review"
                    time="Yesterday" 
                    isAI
                  />
                </div>
              )}
              {activePanel === "notifications" && (
                <div className="p-3 space-y-2">
                  <PanelItem 
                    title="New Follower" 
                    content="Charlie started following you"
                    time="1h ago" 
                  />
                  <PanelItem 
                    title="Content Liked" 
                    content="Your post received 5 new likes"
                    time="3h ago" 
                  />
                  <PanelItem 
                    title="Featured Content" 
                    content="Your post was featured on the discover page"
                    time="1d ago" 
                  />
                </div>
              )}
              {activePanel === "notes" && (
                <div className="p-3 space-y-2">
                  <PanelItem 
                    title="Research Ideas" 
                    content="Investigate quantum computing applications"
                    time="Edited 30m ago" 
                  />
                  <PanelItem 
                    title="Project Tasks" 
                    content="Complete UI design by Friday"
                    time="Edited 2d ago" 
                  />
                </div>
              )}
              {activePanel === "external" && (
                <div className="p-3 space-y-2">
                  <PanelItem 
                    title="GitHub" 
                    content="Connect to your repositories"
                    time="Developer Portal" 
                    isLink
                  />
                  <PanelItem 
                    title="Creative Hub" 
                    content="Access design resources and tools"
                    time="Creative Portal" 
                    isLink
                  />
                  <PanelItem 
                    title="Analytics" 
                    content="View content performance metrics"
                    time="Data Portal" 
                    isLink
                  />
                </div>
              )}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface PanelItemProps {
  title: string;
  content: string;
  time: string;
  isAI?: boolean;
  isLink?: boolean;
}

const PanelItem = ({ title, content, time, isAI, isLink }: PanelItemProps) => {
  return (
    <div className={`p-2 rounded-md ${isLink ? "hover:bg-muted cursor-pointer" : ""}`}>
      <div className="flex justify-between items-start">
        <h4 className="text-xs font-medium">{title}</h4>
        <div className="flex items-center">
          {isAI && (
            <div className="text-[8px] bg-primary/10 text-primary px-1 rounded-full mr-1">
              AI
            </div>
          )}
          <div className="text-[8px] text-muted-foreground">{time}</div>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">{content}</p>
    </div>
  );
};
