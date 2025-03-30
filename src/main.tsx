
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "keen-slider/keen-slider.min.css"
import "./styles/keen-slider.css"

// Safely apply dark mode to both document elements
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('dark');
  document.body.classList.add('dark');
});

// Ensure we're using the correct DOM root element and it exists
const waitForRoot = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    // If root element isn't available yet, try again
    setTimeout(waitForRoot, 10);
  }
};

waitForRoot();
