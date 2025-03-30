
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Music, Video, LayoutGrid, Sparkles } from "lucide-react";

interface ContentItemData {
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

interface ContentItemProps {
  item: ContentItemData;
  isActive: boolean;
  onClick: () => void;
}

export const ContentItem: React.FC<ContentItemProps> = ({ item, isActive, onClick }) => {
  // Calculate time ago from timestamp
  const timeAgo = (() => {
    try {
      return formatDistanceToNow(new Date(item.timestamp), { addSuffix: true });
    } catch (error) {
      return item.timestamp;
    }
  })();

  // Determine the media icon
  const MediaIcon = (() => {
    if (!item.media || item.media.length === 0) return null;
    
    const mediaType = item.media[0].type;
    
    if (mediaType === "music") return Music;
    if (mediaType === "video") return Video;
    if (mediaType === "website" || mediaType === "twitter") return LayoutGrid;
    
    return null;
  })();

  // Get initial for avatar fallback
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div 
      className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive 
          ? 'bg-primary/10 border border-primary/30 shadow-sm' 
          : 'hover:bg-background/60 border border-transparent'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <Avatar className="h-7 w-7 flex-shrink-0">
          <AvatarImage src={`https://avatar.vercel.sh/${item.author}.png`} alt={item.author} />
          <AvatarFallback className="text-xs">{getInitial(item.author)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0 max-w-full overflow-hidden">
          <div className="flex items-center gap-1 mb-0.5 w-full">
            <span className="font-medium text-xs truncate max-w-[60%]">{item.author}</span>
            {item.isAI && (
              <Sparkles className="h-3 w-3 text-primary flex-shrink-0" />
            )}
            <span className="text-[10px] text-muted-foreground ml-auto flex-shrink-0">{timeAgo}</span>
          </div>
          
          <h4 className="text-xs font-medium leading-tight mb-1 truncate">{item.title}</h4>
          
          <div className="flex items-center gap-2 mb-0.5">
            {MediaIcon && (
              <div className="flex items-center text-[10px] text-muted-foreground gap-1">
                <MediaIcon className="h-2.5 w-2.5 flex-shrink-0" />
                <span className="capitalize truncate">{item.media?.[0].type}</span>
              </div>
            )}
          </div>
          
          <p className="text-[10px] text-muted-foreground line-clamp-2 break-words">{item.content}</p>
          
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {item.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="px-1 py-0.5 bg-muted/60 text-[9px] rounded-full text-muted-foreground truncate max-w-[60px]"
                >
                  #{tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-[9px] text-muted-foreground">+{item.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
