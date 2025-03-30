
/// <reference types="vite/client" />

interface Window {
  twttr: {
    widgets: {
      load: (element?: HTMLElement) => void;
      createTweet: (
        tweetId: string, 
        element: HTMLElement, 
        options?: {
          theme?: string;
          align?: string;
          width?: number;
          dnt?: boolean;
        }
      ) => void;
    };
  };
}
