
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
    if (document.documentElement) {
      document.documentElement.classList.add('transition-colors');
    }
    if (document.body) {
      document.body.classList.add('transition-colors');
    }
    
    // Set up a mutation observer to check when theme-provider changes the class
    try {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class' && document.documentElement && document.body) {
            const isDark = document.documentElement.classList.contains('dark');
            document.body.classList.toggle('dark', isDark);
          }
        });
      });
      
      if (document.documentElement) {
        observer.observe(document.documentElement, { attributes: true });
      }
      
      return () => {
        observer.disconnect();
      };
    } catch (error) {
      console.error("Error setting up theme observer:", error);
    }
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
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
              {/* Move Toaster components outside of the Router context but still inside React context */}
              <Toaster />
              <Sonner />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
