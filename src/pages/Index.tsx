import { useState } from "react";
import NewsDashboard from "@/components/NewsDashboard";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pl-12 md:pl-48 pt-16">
        <NewsDashboard />
      </div>
    </div>
  );
};

export default Index;