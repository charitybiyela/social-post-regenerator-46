import React from "react";
import NewsDashboard from "@/components/NewsDashboard";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pl-12 md:pl-48 pt-16 pb-12">
        <NewsDashboard />
      </main>
    </div>
  );
};

export default Index;