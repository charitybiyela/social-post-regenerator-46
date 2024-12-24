import { useState } from "react";
import NewsDashboard from "@/components/NewsDashboard";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [scrollStyle, setScrollStyle] = useState('continuous');
  const [scrollActive, setScrollActive] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const [viewMode, setViewMode] = useState('hybrid');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation 
        scrollStyle={scrollStyle}
        setScrollStyle={setScrollStyle}
        viewMode={viewMode}
        setViewMode={setViewMode}
        scrollActive={scrollActive}
        setScrollActive={setScrollActive}
        scrollSpeed={scrollSpeed}
        setScrollSpeed={setScrollSpeed}
      />
      <div className="pl-12 md:pl-48 pt-16">
        <NewsDashboard />
      </div>
    </div>
  );
};

export default Index;