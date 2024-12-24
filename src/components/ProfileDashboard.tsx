import React, { useState, useEffect } from 'react';
import { AlertCircle, Moon, Sun, Sliders, Activity, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Weights {
  [key: string]: number;
}

interface MoodState {
  primary: string;
  intensity: number;
  triggers: string[];
  lastUpdated?: Date;
}

interface Impact {
  category: string;
  impact: string;
  severity: 'high' | 'medium' | 'low';
}

interface MoodOption {
  label: string;
  icon: React.ComponentType<any>;
  color: string;
}

const ProfileDashboard = () => {
  const [weights, setWeights] = useState<Weights>({
    language: 10,
    regional: 8,
    interests: 15,
    political: 5,
    demographic: 7,
    emotional: 9,
    style: 6,
    timeliness: 10,
    professionalRelevance: 12,
    industryTrends: 9,
    topicalDepth: 8,
    circumstances: 11,
    culturalRelevance: 8,
    healthAlignment: 6,
    lifestyleMatch: 7,
    personalGoals: 9
  });

  const [moodState, setMoodState] = useState<MoodState>({
    primary: 'neutral',
    intensity: 5,
    triggers: []
  });

  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [showMoodPrompt, setShowMoodPrompt] = useState(true);

  const moodOptions: MoodOption[] = [
    { label: 'Energetic', icon: Sun, color: 'text-yellow-500' },
    { label: 'Calm', icon: Moon, color: 'text-blue-400' },
    { label: 'Focused', icon: Brain, color: 'text-purple-500' },
    { label: 'Stressed', icon: Activity, color: 'text-red-500' },
  ];

  const calculateImpact = (changes: { [key: string]: number }): Impact[] => {
    const impacts: Impact[] = [];
    const totalWeight = Object.values(weights).reduce((a: number, b: number) => a + b, 0);
    
    Object.entries(changes).forEach(([category, change]) => {
      const impact = (change / totalWeight) * 100;
      impacts.push({
        category,
        impact: impact.toFixed(1),
        severity: impact > 10 ? 'high' : impact > 5 ? 'medium' : 'low'
      });
    });

    return impacts;
  };

  const handleWeightChange = (category: string, value: number) => {
    const newWeights = { ...weights, [category]: value };
    setWeights(newWeights);
    
    const impacts = calculateImpact({
      [category]: value - weights[category]
    });
    
    setImpacts(impacts);
  };

  const handleMoodUpdate = (mood: MoodOption) => {
    setMoodState(prev => ({
      ...prev,
      primary: mood.label,
      lastUpdated: new Date()
    }));
    setShowMoodPrompt(false);
  };

  return (
    <div className="space-y-4 p-4">
      {showMoodPrompt && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              How are you feeling today?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moodOptions.map((mood) => {
                const IconComponent = mood.icon;
                return (
                  <button
                    key={mood.label}
                    onClick={() => handleMoodUpdate(mood)}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
                  >
                    <IconComponent className={`w-8 h-8 ${mood.color}`} />
                    <span className="mt-2 text-sm font-medium">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sliders className="w-5 h-5" />
            Profile Weightings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(weights).map(([category, value]) => (
              <div key={category} className="space-y-2">
                <label className="flex justify-between text-sm font-medium">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  <span className="text-muted-foreground">{value}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={value}
                  onChange={(e) => handleWeightChange(category, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {impacts.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="mt-2 space-y-2">
              {impacts.map((impact, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="font-medium">{impact.category}:</span>
                  <span className={`
                    ${impact.severity === 'high' ? 'text-red-500' : ''}
                    ${impact.severity === 'medium' ? 'text-yellow-500' : ''}
                    ${impact.severity === 'low' ? 'text-green-500' : ''}
                  `}>
                    {impact.impact}% impact
                  </span>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ProfileDashboard;