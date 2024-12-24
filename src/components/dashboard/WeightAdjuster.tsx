import React from 'react';
import { Sliders } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Weights {
  [key: string]: number;
}

interface WeightAdjusterProps {
  weights: Weights;
  onWeightChange: (category: string, value: number) => void;
}

export const WeightAdjuster = ({ weights, onWeightChange }: WeightAdjusterProps) => {
  return (
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
                onChange={(e) => onWeightChange(category, parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};