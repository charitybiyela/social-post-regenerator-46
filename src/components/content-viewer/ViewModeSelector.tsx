
import React from "react";
import { ScrollText, Grid3X3 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ViewModeSelectorProps {
  viewMode: "scroll" | "panels";
  onViewModeChange: (value: string) => void;
}

export const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({ 
  viewMode, 
  onViewModeChange 
}) => {
  return (
    <div className="absolute top-2 right-2 z-10">
      <Tabs value={viewMode} onValueChange={onViewModeChange}>
        <TabsList className="bg-background/50 backdrop-blur-sm">
          <TabsTrigger value="scroll" className="flex items-center gap-1">
            <ScrollText className="h-3 w-3" />
          </TabsTrigger>
          <TabsTrigger value="panels" className="flex items-center gap-1">
            <Grid3X3 className="h-3 w-3" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
