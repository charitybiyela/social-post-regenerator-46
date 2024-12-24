import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

interface NewsCardFooterProps {
  tags: string[];
}

export const NewsCardFooter = ({ tags }: NewsCardFooterProps) => (
  <div className="space-y-4">
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span 
          key={i}
          className="px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
        >
          #{tag}
        </span>
      ))}
    </div>
    
    <div className="flex justify-between items-center pt-4 border-t">
      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
        <ThumbsUp className="w-4 h-4 mr-2" />
        <span>Like</span>
      </Button>
      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
        <MessageSquare className="w-4 h-4 mr-2" />
        <span>Comment</span>
      </Button>
      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
        <Share2 className="w-4 h-4 mr-2" />
        <span>Share</span>
      </Button>
    </div>
  </div>
);