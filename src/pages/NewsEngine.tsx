import React from 'react';
import { Rocket, Brain, BarChart2, Database, SignalHigh, Globe, Heart, Users, Calendar } from 'lucide-react';
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
      title: "Variable Configurations",
      description: "Comprehensive profiling system including demographics, geography, interests, professional context, circumstances, emotional state, and lifestyle factors.",
      icon: Brain
    },
    {
      title: "Processing Systems",
      description: "Advanced content, format, timing, and tone adaptation systems that ensure perfectly tailored news delivery.",
      icon: BarChart2
    },
    {
      title: "Analysis Components",
      description: "Sophisticated relevance, impact, and preference analysis for optimal content matching and delivery.",
      icon: Database
    },
    {
      title: "Geographic Intelligence",
      description: "Global and local context awareness for region-specific content adaptation and timing optimization.",
      icon: Globe
    },
    {
      title: "Emotional Intelligence",
      description: "Mood-aware content delivery with emotional trigger awareness and sensitivity level adjustment.",
      icon: Heart
    },
    {
      title: "Demographic Processing",
      description: "Age, gender, and culturally sensitive content adaptation with education and income considerations.",
      icon: Users
    },
    {
      title: "Circumstantial Awareness",
      description: "Life event consideration and challenge-specific support with temporal relevance matching.",
      icon: Calendar
    },
    {
      title: "Real-time Adaptation",
      description: "Dynamic content weighting system that evolves with user preferences and behavior patterns.",
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
            Our advanced AI-driven news personalization system combines multiple variables and processing systems to deliver perfectly tailored content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Technical Capabilities
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our engine processes multiple variables to deliver personalized content:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Comprehensive variable configurations</li>
                <li>Sophisticated processing systems</li>
                <li>Advanced analysis components</li>
                <li>Real-time adaptation mechanisms</li>
                <li>Multi-factor content scoring</li>
                <li>Dynamic weight adjustment</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsEngine;