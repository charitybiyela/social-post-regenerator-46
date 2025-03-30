
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "keen-slider/keen-slider.min.css"
import "./styles/keen-slider.css"

// Ensure we're using the correct DOM root element
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(<App />);
