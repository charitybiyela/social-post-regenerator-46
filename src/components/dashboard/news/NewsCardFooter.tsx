import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

interface NewsCardFooterProps {
  tags: string[];
}

export const NewsCardFooter = ({ tags }: NewsCardFooterProps) => (
  <div>
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag, i) => (
        <span 
          key={i}
          className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-pointer"
        >
          #{tag}
        </span>
      ))}
    </div>
    
    <div className="flex justify-between items-center pt-4 border-t">
      <Button variant="ghost" size="sm" className="flex-1 h-10 gap-2">
        <ThumbsUp className="h-4 w-4" />
        <span>24</span>
      </Button>
      <Button variant="ghost" size="sm" className="flex-1 h-10 gap-2">
        <MessageSquare className="h-4 w-4" />
        <span>12</span>
      </Button>
      <Button variant="ghost" size="sm" className="flex-1 h-10 gap-2">
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </Button>
    </div>
  </div>
);