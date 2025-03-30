
import React from "react";
import { AudioPlayer } from "./media/AudioPlayer";
import { VideoPlayer } from "./media/VideoPlayer";
import { TextContent } from "./media/TextContent";
import { ImageContent } from "./media/ImageContent";
import { WebsiteContent } from "./media/WebsiteContent";
import { UnsupportedContent } from "./media/UnsupportedContent";

interface MediaContentProps {
  item: {
    title: string;
    author: string;
    media?: {
      type: string;
      url?: string;
    }[];
  };
  isPlaying: boolean;
  togglePlayPause: () => void;
  currentMediaType?: 'music' | 'video';
}

export const MediaContent: React.FC<MediaContentProps> = ({ 
  item, 
  isPlaying, 
  togglePlayPause,
  currentMediaType = 'video'
}) => {
  if (!item.media || item.media.length === 0) {
    return null;
  }

  const media = item.media[0];
  
  switch (media.type) {
    case 'music':
      return (
        <AudioPlayer
          title={item.title}
          author={item.author}
          url={media.url}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
        />
      );
    
    case 'video':
      return (
        <VideoPlayer
          title={item.title}
          author={item.author}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
        />
      );
    
    case 'text':
      return <TextContent title={item.title} />;
    
    case 'website':
      return <WebsiteContent title={item.title} url={media.url} />;
      
    case 'image':
      return <ImageContent title={item.title} url={media.url} />;
      
    default:
      return <UnsupportedContent mediaType={media.type} />;
  }
};
