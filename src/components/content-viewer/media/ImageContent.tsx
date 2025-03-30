
import React from "react";
import { toast } from "sonner";

interface ImageContentProps {
  title: string;
  url?: string;
}

export const ImageContent: React.FC<ImageContentProps> = ({ 
  title, 
  url = "/placeholder.svg" 
}) => {
  return (
    <div className="rounded-md overflow-hidden">
      <img 
        src={url} 
        alt={title}
        className="w-full h-auto object-cover rounded-md"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/placeholder.svg";
          toast.error("Image could not be loaded");
        }}
      />
    </div>
  );
};
