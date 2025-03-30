
import React from "react";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";

interface ContentOverlayHeaderProps {
  isTransparent: boolean;
  setIsTransparent: (value: boolean) => void;
  autoScroll: boolean;
  setAutoScroll: (value: boolean) => void;
  onClose: () => void;
  title: string;
}

export const ContentOverlayHeader: React.FC<ContentOverlayHeaderProps> = ({ 
  isTransparent, 
  setIsTransparent,
  autoScroll,
  setAutoScroll,
  onClose,
  title
}) => {
  return (
    <div className="py-2 px-3 flex items-center justify-between border-b border-border/30 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium text-gradient">{title}</h3>
        <div className="flex items-center gap-1 text-xs">
          <Switch
            size="sm"
            checked={autoScroll}
            onCheckedChange={setAutoScroll}
            className="scale-75"
          />
          <span className="text-muted-foreground">Auto</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">BG</span>
        <Switch
          size="sm"
          checked={!isTransparent}
          onCheckedChange={(checked) => setIsTransparent(!checked)}
          className="scale-75"
        />
        <button onClick={onClose} className="p-1 hover:bg-muted/40 rounded-full transition-colors">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
