
import React from "react";
import { Switch } from "@/components/ui/switch";
import { X, UserCircle2, Globe } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ContentOverlayHeaderProps {
  isTransparent: boolean;
  setIsTransparent: (value: boolean) => void;
  autoScroll: boolean;
  setAutoScroll: (value: boolean) => void;
  onClose: () => void;
  title: string;
  viewMode?: string;
  setViewMode?: (value: string) => void;
}

export const ContentOverlayHeader: React.FC<ContentOverlayHeaderProps> = ({ 
  isTransparent, 
  setIsTransparent,
  autoScroll,
  setAutoScroll,
  onClose,
  title,
  viewMode = 'live',
  setViewMode = () => {}
}) => {
  return (
    <div className="py-1.5 px-3 flex flex-col gap-1.5 border-b border-border/30 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gradient truncate max-w-[240px]">{title}</h3>
        <button onClick={onClose} className="p-1 hover:bg-muted/40 rounded-full transition-colors">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)} size="sm">
          <ToggleGroupItem value="live" className="text-xs px-2 py-0.5 h-6">
            <Globe className="h-3 w-3 mr-1" />
            <span>Live</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="mine" className="text-xs px-2 py-0.5 h-6">
            <UserCircle2 className="h-3 w-3 mr-1" />
            <span>My Posts</span>
          </ToggleGroupItem>
        </ToggleGroup>
        
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">BG</span>
          <Switch
            size="sm"
            checked={!isTransparent}
            onCheckedChange={(checked) => setIsTransparent(!checked)}
            className="scale-70"
          />
          <div className="flex items-center gap-1 text-xs ml-1">
            <Switch
              size="sm"
              checked={autoScroll}
              onCheckedChange={setAutoScroll}
              className="scale-70"
            />
            <span className="text-muted-foreground">Auto</span>
          </div>
        </div>
      </div>
    </div>
  );
};
