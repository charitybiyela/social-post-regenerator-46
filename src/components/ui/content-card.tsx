
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  depth?: number; // 0-3, controls the z-depth appearance
  active?: boolean;
  children: React.ReactNode;
}

export const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  ({ depth = 1, active = false, className, children, ...props }, ref) => {
    // Scale and shadow intensity based on depth
    const depthStyles = {
      transform: `scale(${1 - depth * 0.03}) translateZ(${depth * -10}px)`,
      boxShadow: `0 ${4 + depth * 2}px ${10 + depth * 5}px rgba(0,0,0,${0.1 + depth * 0.05})`,
      zIndex: 10 - depth,
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "transition-all duration-300 ease-out transform origin-center",
          active && "z-20",
          className
        )}
        style={depthStyles}
        whileHover={{ scale: active ? 1.02 : 1, z: active ? 10 : 0 }}
        {...props}
      >
        <Card 
          className={cn(
            "border overflow-hidden bg-card/95 backdrop-blur-sm",
            active && "ring-2 ring-primary",
          )}
        >
          {children}
        </Card>
      </motion.div>
    );
  }
);
ContentCard.displayName = "ContentCard";
