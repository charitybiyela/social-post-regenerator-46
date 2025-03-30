
interface TwitterWidgets {
  createTweet: (
    tweetId: string,
    container: HTMLElement,
    options?: {
      theme?: 'light' | 'dark';
      align?: 'left' | 'center' | 'right';
      dnt?: boolean;
      [key: string]: any;
    }
  ) => Promise<HTMLElement>;
  [key: string]: any;
}

interface Window {
  twttr?: {
    widgets: TwitterWidgets;
    [key: string]: any;
  };
}
