
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "keen-slider/keen-slider.min.css"
import "./styles/keen-slider.css"

// Force dark mode on the entire document
document.addEventListener('DOMContentLoaded', () => {
  // Force dark mode classes on both html and body elements
  document.documentElement.classList.add('dark');
  document.body.classList.add('dark');
  
  // Set dark background colors explicitly
  document.documentElement.style.backgroundColor = "hsl(240 10% 3.9%)";
  document.body.style.backgroundColor = "hsl(240 10% 3.9%)";
  
  // Force the theme in localStorage
  localStorage.setItem('theme', 'dark');
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
