
import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface WebsiteContentProps {
  title: string;
  url?: string;
}

export const WebsiteContent: React.FC<WebsiteContentProps> = ({ title, url }) => {
  const [tweetLoaded, setTweetLoaded] = useState(false);
  const tweetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!url) return;
    
    // Handle Twitter content
    if (url.includes('twitter.com') || url.includes('x.com')) {
      // First load the Twitter widget script if it doesn't exist
      if (!window.twttr) {
        const script = document.createElement('script');
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          loadTweet(url);
        };
        document.head.appendChild(script);
      } else {
        loadTweet(url);
      }
    }
  }, [url]);

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

  const isTwitter = url && (url.includes('twitter.com') || url.includes('x.com'));
  
  if (isTwitter) {
    return (
      <div className="rounded-md overflow-hidden bg-white dark:bg-black h-full min-h-[400px] max-h-[600px] flex justify-center items-center">
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
      {url ? (
        <iframe 
          src={url} 
          className="w-full h-full rounded-md" 
          title={title}
          sandbox="allow-same-origin allow-scripts allow-popups"
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-muted">
          <span className="text-muted-foreground">Website URL not provided</span>
        </div>
      )}
    </div>
  );
};
