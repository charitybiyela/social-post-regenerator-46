import NewsDashboard from "@/components/NewsDashboard";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="pl-16 md:pl-64">
        <NewsDashboard />
      </div>
    </div>
  );
};

export default Index;