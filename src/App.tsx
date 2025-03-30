
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersonalizationProvider } from "@/contexts/PersonalizationContext";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Personalize from "./pages/Personalize";
import ScrollToTop from "./components/ScrollToTop";

// Create a new QueryClient instance outside of the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Ensure the html and body elements have dark mode class when theme changes
  useEffect(() => {
    // This ensures the background color transitions are applied
    document.documentElement.classList.add('transition-colors');
    document.body.classList.add('transition-colors');
    
    // Force dark mode class for immediate styling
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && prefersDarkMode)) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    }
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <PersonalizationProvider>
                  <ScrollToTop />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/personalize" element={<Personalize />} />
                    </Routes>
                  </main>
                </PersonalizationProvider>
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
