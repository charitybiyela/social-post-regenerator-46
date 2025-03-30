
import React from "react";

interface UnsupportedContentProps {
  mediaType: string;
}

export const UnsupportedContent: React.FC<UnsupportedContentProps> = ({ mediaType }) => {
  return (
    <div className="rounded-md bg-muted/30 p-6 border border-border/40 text-center">
      <p className="text-muted-foreground">
        Content type "{mediaType}" is not supported for preview
      </p>
    </div>
  );
};
