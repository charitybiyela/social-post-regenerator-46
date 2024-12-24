import React from 'react';
import { Moon, Sun, Brain, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MoodOption {
  label: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface MoodSelectorProps {
  onMoodUpdate: (mood: MoodOption) => void;
  showPrompt: boolean;
}

const moodOptions: MoodOption[] = [
  { label: 'Energetic', icon: Sun, color: 'text-yellow-500' },
  { label: 'Calm', icon: Moon, color: 'text-blue-400' },
  { label: 'Focused', icon: Brain, color: 'text-purple-500' },
  { label: 'Stressed', icon: Activity, color: 'text-red-500' },
];

export const MoodSelector = ({ onMoodUpdate, showPrompt }: MoodSelectorProps) => {
  if (!showPrompt) return null;

  return (
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
                onClick={() => onMoodUpdate(mood)}
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
  );
};