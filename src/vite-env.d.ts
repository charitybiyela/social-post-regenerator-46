
/// <reference types="vite/client" />

interface Window {
  twttr: {
    widgets: {
      load: () => void;
    };
  };
}
