
import React from "react";

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
            <span className="text-[10px] text-muted-foreground">{item.media[0].type}</span>
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
