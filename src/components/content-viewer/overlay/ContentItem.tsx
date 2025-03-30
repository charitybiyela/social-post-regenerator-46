
import React from "react";
import { Music, Video, Link, Image } from "lucide-react";

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

export const ContentItem: React.FC<ContentItemProps> = ({ 
  item, 
  isActive, 
  onClick 
}) => {
  // Get media icon based on type
  const getMediaIcon = () => {
    if (!item.media || item.media.length === 0) return null;
    
    const mediaType = item.media[0].type;
    
    switch (mediaType) {
      case 'music':
        return <Music className="h-5 w-5 text-muted-foreground" />;
      case 'video':
        return <Video className="h-5 w-5 text-muted-foreground" />;
      case 'website':
        return <Link className="h-5 w-5 text-muted-foreground" />;
      case 'image':
        return <Image className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  // Check if item is a Twitter post
  const isTwitterPost = item.media && 
    item.media.length > 0 && 
    item.media[0].type === 'website' && 
    item.media[0].url && 
    (item.media[0].url.includes('twitter.com') || item.media[0].url.includes('x.com'));

  return (
    <div
      className={`p-2 rounded-md cursor-pointer transition-colors ${
        isActive ? "bg-primary/10" : "hover:bg-muted"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        {item.media && item.media.length > 0 && (
          <div className="w-12 h-12 rounded bg-muted flex-shrink-0 flex items-center justify-center">
            {isTwitterPost ? (
              <div className="flex items-center justify-center w-full h-full bg-sky-500">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
            ) : (
              getMediaIcon() || (
                <span className="text-[10px] text-muted-foreground">{item.media[0].type}</span>
              )
            )}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-medium truncate">{item.title}</h4>
          <p className="text-[10px] text-muted-foreground line-clamp-1">
            {item.content}
          </p>
          <div className="flex items-center mt-1">
            <div className="text-[8px] text-muted-foreground">{item.author}</div>
            {item.isAI && (
              <div className="ml-1 text-[8px] bg-primary/10 text-primary px-1 rounded-full">
                AI
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
