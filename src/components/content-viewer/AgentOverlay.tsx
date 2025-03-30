
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { X, Bot, ExternalLink, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/ui/content-card";

interface ContentItem {
  id: string | number;
  title: string;
  content: string;
  author: string;
  isAI?: boolean;
  timestamp: string;
  media?: {
    type: string;
    url?: string;
  }[];
  tags?: string[];
}

interface AgentMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface AgentOverlayProps {
  visible: boolean;
  onClose: () => void;
  onSendToMain: (item: ContentItem) => void;
}

export const AgentOverlay = ({ visible, onClose, onSendToMain }: AgentOverlayProps) => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<AgentMessage[]>([
    { id: 1, text: "Hello! How can I assist you today?", isUser: false, timestamp: "Just now" },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: message,
      isUser: true,
      timestamp: "Just now"
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setMessage("");
    
    // Simulate agent response
    setTimeout(() => {
      const newAgentMessage = {
        id: messages.length + 2,
        text: "I've processed your request. Would you like me to create content based on this?",
        isUser: false,
        timestamp: "Just now"
      };
      
      setMessages(prev => [...prev, newAgentMessage]);
    }, 1000);
  };

  const handleCreateContent = () => {
    // Create a mock content item from the conversation
    const mockContent: ContentItem = {
      id: Date.now(),
      title: "Generated from Agent Conversation",
      content: messages.map(m => `${m.isUser ? "You" : "Agent"}: ${m.text}`).join("\n"),
      author: "Agent",
      isAI: true,
      timestamp: "Just now",
      tags: ["generated", "conversation"]
    };
    
    onSendToMain(mockContent);
  };

  if (!visible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={`absolute left-4 bottom-4 max-w-xs z-10 ${isTransparent ? 'bg-background/80' : 'bg-background'} backdrop-blur-md rounded-lg shadow-lg border border-border/50`}
      style={{ width: "300px" }}
    >
      <div className="p-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Agent</h3>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            size="sm"
            checked={!isTransparent}
            onCheckedChange={(checked) => setIsTransparent(!checked)}
            className="scale-75"
          />
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <ScrollArea className="h-64 p-2">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded-md ${
                msg.isUser ? "bg-muted ml-6" : "bg-primary/10 mr-6"
              }`}
            >
              <p className="text-xs">{msg.text}</p>
              <div className="text-[10px] text-muted-foreground mt-1 flex justify-between">
                <span>{msg.isUser ? "You" : "Agent"}</span>
                <span>{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-2 border-t">
        <div className="flex gap-2 mb-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs w-full"
            onClick={handleCreateContent}
          >
            <Send className="h-3 w-3 mr-1" /> Send to Main
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="h-7 text-xs"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask the agent..."
            className="w-full text-xs p-2 bg-muted rounded-md border border-border/50"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button 
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleSend}
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
