import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const PersonalizationLink = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card className="p-4 relative animate-fadeIn">
      <button 
        onClick={() => setIsVisible(false)} 
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
      <Link to="/personalize" className="block group">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          Customize your feed!
        </h3>
        <p className="text-muted-foreground text-sm">
          Refine your news feed by selecting your interests below. Your feed will update in real-time!
        </p>
      </Link>
    </Card>
  );
}