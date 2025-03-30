
import React from "react";
import { FileText } from "lucide-react";

interface TextContentProps {
  title: string;
}

export const TextContent: React.FC<TextContentProps> = ({ title }) => {
  return (
    <div className="rounded-md bg-muted/30 p-6 border border-border/40 my-4">
      <div className="flex items-center justify-center gap-3 mb-4">
        <FileText className="h-10 w-10 text-primary/70" />
        <div className="text-lg font-medium">{title}</div>
      </div>
      <div className="text-muted-foreground text-center mt-2">
        <p>Text content available for reading</p>
      </div>
    </div>
  );
};
