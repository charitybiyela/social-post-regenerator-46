
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { 
  X, 
  Bot, 
  ExternalLink, 
  Send, 
  Mail, 
  Globe, 
  Youtube, 
  Music
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

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
  const [activeTab, setActiveTab] = useState("chat");
  const [urlToLoad, setUrlToLoad] = useState("");
  const [emailData, setEmailData] = useState({ to: "", subject: "", body: "" });
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
    toast.success("Content sent to main view");
  };

  const handleLoadWebsite = () => {
    if (!urlToLoad) return;
    
    // Create a mock content item with an iframe
    const mockWebContent: ContentItem = {
      id: Date.now(),
      title: `Website: ${urlToLoad}`,
      content: `Loading web content from ${urlToLoad}`,
      author: "Web Agent",
      isAI: true,
      timestamp: "Just now",
      media: [{ 
        type: "website", 
        url: urlToLoad.startsWith("http") ? urlToLoad : `https://${urlToLoad}`
      }],
      tags: ["website", "external"]
    };
    
    onSendToMain(mockWebContent);
    toast.success(`Loading website: ${urlToLoad}`);
    setUrlToLoad("");
  };

  const handleSendEmail = () => {
    if (!emailData.to || !emailData.subject) {
      toast.error("Please fill in the required email fields");
      return;
    }
    
    // In a real app, you would send the email here
    // For demo, we'll just show a success toast and add to conversation
    toast.success(`Email sent to ${emailData.to}`);
    
    const emailSummary = `Email to: ${emailData.to}\nSubject: ${emailData.subject}\nBody: ${emailData.body}`;
    
    const newAgentMessage = {
      id: messages.length + 1,
      text: `I've sent the email for you:\n${emailSummary}`,
      isUser: false,
      timestamp: "Just now"
    };
    
    setMessages(prev => [...prev, newAgentMessage]);
    setEmailData({ to: "", subject: "", body: "" });
    setActiveTab("chat");
  };

  const handlePlayMedia = (mediaType: string, title: string) => {
    // Create a mock media content
    const mockMediaContent: ContentItem = {
      id: Date.now(),
      title: title,
      content: `Playing ${mediaType} content`,
      author: "Media Agent",
      isAI: true,
      timestamp: "Just now",
      media: [{ type: mediaType }],
      tags: [mediaType, "media"]
    };
    
    onSendToMain(mockMediaContent);
    toast.success(`Loading ${mediaType} player`);
  };

  if (!visible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={`absolute left-4 top-20 max-w-xs z-10 ${isTransparent ? 'bg-background/80' : 'bg-background'} backdrop-blur-md rounded-lg shadow-lg border border-border/50 mt-5 ml-1.5`}
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex justify-between p-1 bg-muted/50">
          <TabsTrigger value="chat" className="text-xs">Chat</TabsTrigger>
          <TabsTrigger value="web" className="text-xs">Web</TabsTrigger>
          <TabsTrigger value="email" className="text-xs">Email</TabsTrigger>
          <TabsTrigger value="media" className="text-xs">Media</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="m-0">
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
        </TabsContent>
        
        <TabsContent value="web" className="m-0 p-2">
          <div className="space-y-3">
            <div className="text-xs text-muted-foreground mb-2">
              Enter a URL to load a website in the main view
            </div>
            <div className="flex gap-2">
              <input
                value={urlToLoad}
                onChange={(e) => setUrlToLoad(e.target.value)}
                placeholder="https://example.com"
                className="w-full text-xs p-2 bg-muted rounded-md border border-border/50"
                onKeyDown={(e) => e.key === 'Enter' && handleLoadWebsite()}
              />
              <Button 
                size="sm"
                className="h-8 p-0 px-3"
                onClick={handleLoadWebsite}
              >
                <Globe className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            <div className="pt-2 mt-2 border-t">
              <div className="text-xs font-medium mb-2">Quick navigation</div>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={() => setUrlToLoad("youtube.com")}
                >
                  YouTube
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={() => setUrlToLoad("spotify.com")}
                >
                  Spotify
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={() => setUrlToLoad("netflix.com")}
                >
                  Netflix
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={() => setUrlToLoad("gmail.com")}
                >
                  Gmail
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="email" className="m-0 p-2">
          <div className="space-y-3">
            <div className="text-xs text-muted-foreground mb-2">
              Compose and send an email
            </div>
            <div className="space-y-2">
              <input
                value={emailData.to}
                onChange={(e) => setEmailData({...emailData, to: e.target.value})}
                placeholder="To: email@example.com"
                className="w-full text-xs p-2 bg-muted rounded-md border border-border/50"
              />
              <input
                value={emailData.subject}
                onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                placeholder="Subject"
                className="w-full text-xs p-2 bg-muted rounded-md border border-border/50"
              />
              <textarea
                value={emailData.body}
                onChange={(e) => setEmailData({...emailData, body: e.target.value})}
                placeholder="Message"
                rows={5}
                className="w-full text-xs p-2 bg-muted rounded-md border border-border/50 resize-none"
              />
              <Button 
                size="sm"
                className="w-full h-8"
                onClick={handleSendEmail}
              >
                <Mail className="h-3.5 w-3.5 mr-1" /> Send Email
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="media" className="m-0 p-2">
          <div className="space-y-3">
            <div className="text-xs text-muted-foreground mb-2">
              Play media in the main view
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handlePlayMedia("video", "Sample Video")}
                >
                  <Youtube className="h-4 w-4 mr-2" /> Play Video
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handlePlayMedia("music", "Sample Music")}
                >
                  <Music className="h-4 w-4 mr-2" /> Play Music
                </Button>
              </div>
              
              <div className="pt-2 mt-2 border-t">
                <div className="text-xs font-medium mb-2">Quick Media</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-16 flex-col text-xs"
                    onClick={() => handlePlayMedia("video", "Nature Documentary")}
                  >
                    <Youtube className="h-5 w-5 mb-1" /> 
                    <span>Nature Doc</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-16 flex-col text-xs"
                    onClick={() => handlePlayMedia("music", "Relaxing Playlist")}
                  >
                    <Music className="h-5 w-5 mb-1" /> 
                    <span>Relaxing Music</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
