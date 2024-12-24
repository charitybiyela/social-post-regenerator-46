import React, { useState } from 'react';
import { MoodSelector } from './dashboard/MoodSelector';
import { WeightAdjuster } from './dashboard/WeightAdjuster';
import { ImpactDisplay } from './dashboard/ImpactDisplay';
import { WeightImpactAnalyzer } from '@/utils/WeightImpactAnalyzer';

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

  const weightImpactAnalyzer = new WeightImpactAnalyzer(weights);

  const handleWeightChange = (category: string, value: number) => {
    const newWeights = { ...weights, [category]: value };
    setWeights(newWeights);
    
    const weightChanges = { [category]: value - weights[category] };
    const cascadeEffects = weightImpactAnalyzer.calculateCascadeEffects(weightChanges);
    
    const newImpacts: Impact[] = [
      {
        category,
        impact: ((value - weights[category]) / weights[category] * 100).toFixed(1),
        severity: Math.abs(value - weights[category]) > 5 ? 'high' as const : 
                 Math.abs(value - weights[category]) > 2 ? 'medium' as const : 
                 'low' as const
      },
      ...Object.entries(cascadeEffects).map(([affectedCategory, effect]) => ({
        category: affectedCategory,
        impact: (effect * 100).toFixed(1),
        severity: Math.abs(effect) > 0.5 ? 'high' as const : 
                 Math.abs(effect) > 0.2 ? 'medium' as const : 
                 'low' as const
      }))
    ];
    
    setImpacts(newImpacts);
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