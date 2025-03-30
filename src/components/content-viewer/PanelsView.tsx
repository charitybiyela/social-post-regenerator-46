
import React from "react";
import { ContentCard } from "@/components/ui/content-card";
import { Music, Video } from "lucide-react";

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

interface PanelsViewProps {
  items: ContentItem[];
  currentItem: ContentItem;
  onItemClick: (item: ContentItem) => void;
}

export const PanelsView: React.FC<PanelsViewProps> = ({
  items,
  currentItem,
  onItemClick
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full overflow-hidden">
      {items.map((item, idx) => (
        <ContentCard 
          key={item.id}
          depth={Math.min(idx % 3, 2)}
          className="cursor-pointer"
          active={item.id === currentItem.id}
          onClick={() => onItemClick(item)}
        >
          <div className="p-4 h-64 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                  {item.author[0]}
                </div>
                <div className="text-sm font-medium">{item.author}</div>
              </div>
              {item.isAI && (
                <div className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                  AI
                </div>
              )}
            </div>

            <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
            
            {item.media && item.media.length > 0 && (
              <div className="rounded bg-muted h-24 mb-2 flex items-center justify-center">
                {item.media[0].type === 'music' ? (
                  <Music className="h-6 w-6 text-muted-foreground" />
                ) : item.media[0].type === 'video' ? (
                  <Video className="h-6 w-6 text-muted-foreground" />
                ) : (
                  <span className="text-xs text-muted-foreground">[{item.media[0].type}]</span>
                )}
              </div>
            )}
            
            <div className="relative">
              <p className="text-xs text-muted-foreground line-clamp-3">
                {item.content}
              </p>
            </div>
          </div>
        </ContentCard>
      ))}
    </div>
  );
};
