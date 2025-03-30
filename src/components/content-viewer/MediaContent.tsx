import React, { useState, useEffect, useRef } from "react";
import { Music, Video, Play, SkipBack, SkipForward, Pause, Volume2, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  const [tweetLoaded, setTweetLoaded] = useState(false);
  const tweetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item.media || item.media.length === 0) return;
    const media = item.media[0];
    
    if (media.type === 'website' && media.url && (media.url.includes('twitter.com') || media.url.includes('x.com'))) {
      // First load the Twitter widget script if it doesn't exist
      if (!window.twttr) {
        const script = document.createElement('script');
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          loadTweet(media.url as string);
        };
        document.head.appendChild(script);
      } else {
        loadTweet(media.url as string);
      }
    }
  }, [item.media]);

  const loadTweet = (tweetUrl: string) => {
    if (!tweetContainerRef.current) return;
    
    // Extract the tweet ID from the URL
    const tweetId = tweetUrl.split('/').pop();
    if (!tweetId) return;
    
    // Clear any existing content
    tweetContainerRef.current.innerHTML = '';
    
    // Create a container for the tweet
    const tweetElement = document.createElement('div');
    tweetContainerRef.current.appendChild(tweetElement);
    
    // Use Twitter's API to render the tweet
    window.twttr.widgets.createTweet(
      tweetId, 
      tweetElement, 
      {
        theme: 'light',
        align: 'center',
        dnt: true
      }
    ).then(() => {
      setTweetLoaded(true);
      toast.success("Tweet loaded successfully");
    }).catch(() => {
      toast.error("Failed to load tweet");
    });
  };

  if (!item.media || item.media.length === 0) {
    return null;
  }

  const media = item.media[0];
  
  switch (media.type) {
    case 'music':
      return (
        <div className="rounded-md bg-black aspect-video relative overflow-hidden glow-effect">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Music className="h-16 w-16 text-primary mb-4 animate-float" />
            <div className="text-sm text-gray-400 mt-2">{item.author}</div>
          </div>
          
          {/* Metadata Overlay */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
            <div className="text-xs text-white/70">Now Playing</div>
            <div className="flex justify-between items-center mt-1">
              <div className="text-white text-sm truncate">{item.title}</div>
              <div className="text-white/70 text-xs">4:56</div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="h-1 bg-gray-700 rounded-full w-full">
              <div className="h-1 bg-primary rounded-full" style={{ width: '30%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1:23</span>
              <span>4:56</span>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-4">
              <Button variant="ghost" size="icon" className="rounded-full text-white">
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12 text-white border-white hover-glow"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white">
                <SkipForward className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white">
                <Volume2 className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      );
    
    case 'video':
      return (
        <div className="rounded-md bg-black aspect-video relative overflow-hidden glow-effect">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Video className="h-16 w-16 text-primary mb-4 animate-float" />
          </div>
          
          {/* Metadata Overlay */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white text-sm truncate">{item.title}</div>
                <div className="text-white/70 text-xs">{item.author}</div>
              </div>
              <div className="bg-red-600 text-white text-xs px-2 py-0.5 rounded">LIVE</div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-16 w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white border-white hover-glow"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8" />
            )}
          </Button>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="h-1 bg-gray-700 rounded-full w-full">
              <div className="h-1 bg-primary rounded-full" style={{ width: '15%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>2:45</span>
              <span>18:30</span>
            </div>
          </div>
        </div>
      );
      
    case 'website':
      const isTwitter = media.url && (
        media.url.includes('twitter.com') || 
        media.url.includes('x.com')
      );
      
      if (isTwitter) {
        return (
          <div className="rounded-md overflow-hidden bg-white h-full min-h-[400px] max-h-[600px] flex justify-center items-center">
            {!tweetLoaded && (
              <div className="flex flex-col items-center justify-center p-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p className="text-sm text-muted-foreground">Loading tweet...</p>
              </div>
            )}
            <div 
              ref={tweetContainerRef} 
              className="w-full h-full flex items-center justify-center p-4"
            ></div>
          </div>
        );
      }
      
      return (
        <div className="rounded-md border h-96 relative overflow-hidden">
          {media.url ? (
            <iframe 
              src={media.url} 
              className="w-full h-full rounded-md" 
              title={item.title}
              sandbox="allow-same-origin allow-scripts allow-popups"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <span className="text-muted-foreground">Website URL not provided</span>
            </div>
          )}
        </div>
      );
      
    case 'image':
      return (
        <div className="rounded-md overflow-hidden">
          <img 
            src={media.url || "/placeholder.svg"} 
            alt={item.title}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
      );
      
    default:
      // Show a fallback based on the selected media type (music or video)
      if (currentMediaType === 'music') {
        return (
          <div className="rounded-md bg-black aspect-video relative overflow-hidden glow-effect">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Music className="h-16 w-16 text-primary mb-4 animate-float" />
              <div className="text-lg font-medium text-white">{item.title}</div>
              <div className="text-sm text-gray-400 mt-2">{item.author}</div>
            </div>
            
            {/* Metadata Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
              <div className="text-xs text-white/70">Now Playing</div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-white text-sm truncate">{item.title}</div>
                <div className="text-white/70 text-xs">4:56</div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="h-1 bg-gray-700 rounded-full w-full">
                <div className="h-1 bg-primary rounded-full" style={{ width: '30%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1:23</span>
                <span>4:56</span>
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button variant="ghost" size="icon" className="rounded-full text-white">
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-12 w-12 text-white border-white hover-glow"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-white">
                  <SkipForward className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-white">
                  <Volume2 className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="rounded-md bg-black aspect-video relative overflow-hidden glow-effect">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Video className="h-16 w-16 text-primary mb-4 animate-float" />
              <div className="text-lg font-medium text-white">{item.title}</div>
            </div>
            
            {/* Metadata Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white text-sm truncate">{item.title}</div>
                  <div className="text-white/70 text-xs">{item.author}</div>
                </div>
                <div className="bg-red-600 text-white text-xs px-2 py-0.5 rounded">LIVE</div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-16 w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white border-white hover-glow"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </Button>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="h-1 bg-gray-700 rounded-full w-full">
                <div className="h-1 bg-primary rounded-full" style={{ width: '15%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>2:45</span>
                <span>18:30</span>
              </div>
            </div>
          </div>
        );
      }
  }
};
