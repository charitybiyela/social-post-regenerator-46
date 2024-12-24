import React from 'react';
import { Rocket, Brain, BarChart2, Database, SignalHigh } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ComponentType<any>; 
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const NewsEngine = () => {
  const features = [
    {
      title: "Advanced AI Personalization",
      description: "Sophisticated content adaptation using machine learning algorithms to deliver perfectly tailored news experiences.",
      icon: Brain
    },
    {
      title: "Real-time Weight Analysis",
      description: "Dynamic content weighting system that analyzes and adjusts content relevance based on user preferences and behavior.",
      icon: BarChart2
    },
    {
      title: "Emotional Intelligence",
      description: "Mood-aware content delivery that adapts to your emotional state and provides contextually appropriate news.",
      icon: Database
    },
    {
      title: "Cascade Effect Tracking",
      description: "Sophisticated system that understands how changes in one preference affect others, ensuring balanced content delivery.",
      icon: SignalHigh
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Rocket className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            News Regeneration Engine
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of personalized news delivery powered by advanced AI and emotional intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Behind the Scenes
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our engine processes millions of data points to understand:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Content relevance patterns</li>
                <li>Emotional response correlations</li>
                <li>User engagement metrics</li>
                <li>Temporal reading patterns</li>
                <li>Cultural context adaptation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsEngine;