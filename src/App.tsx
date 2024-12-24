import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersonalizationProvider } from "@/contexts/PersonalizationContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Personalize from "./pages/Personalize";
import NewsEngine from "./pages/NewsEngine";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PersonalizationProvider>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/personalize" element={<Personalize />} />
                <Route path="/news-engine" element={<NewsEngine />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </PersonalizationProvider>
  </QueryClientProvider>
);

export default App;