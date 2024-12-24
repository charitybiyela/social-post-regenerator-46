import React, { useState } from 'react';
import { MoodSelector } from './dashboard/MoodSelector';
import { WeightAdjuster } from './dashboard/WeightAdjuster';
import { ImpactDisplay } from './dashboard/ImpactDisplay';

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

  const handleMoodUpdate = (mood: { label: string }) => {
    setMoodState(prev => ({
      ...prev,
      primary: mood.label,
      lastUpdated: new Date()
    }));
    setShowMoodPrompt(false);
  };

  return (
    <div className="space-y-4 p-4">
      <MoodSelector 
        onMoodUpdate={handleMoodUpdate}
        showPrompt={showMoodPrompt}
      />
      <WeightAdjuster 
        weights={weights}
        onWeightChange={handleWeightChange}
      />
      <ImpactDisplay impacts={impacts} />
    </div>
  );
};

export default ProfileDashboard;