
import React from "react";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";

interface ContentOverlayHeaderProps {
  isTransparent: boolean;
  setIsTransparent: (value: boolean) => void;
  autoScroll: boolean;
  setAutoScroll: (value: boolean) => void;
  onClose: () => void;
}

export const ContentOverlayHeader: React.FC<ContentOverlayHeaderProps> = ({ 
  isTransparent, 
  setIsTransparent,
  autoScroll,
  setAutoScroll,
  onClose 
}) => {
  return (
    <div className="py-2 px-3 flex items-center justify-between border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium">Live Posts</h3>
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
        <span className="text-xs text-muted-foreground">Background</span>
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
  );
};
