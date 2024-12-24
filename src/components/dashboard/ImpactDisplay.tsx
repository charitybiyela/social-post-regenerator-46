import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Impact {
  category: string;
  impact: string;
  severity: 'high' | 'medium' | 'low';
}

interface ImpactDisplayProps {
  impacts: Impact[];
}

export const ImpactDisplay = ({ impacts }: ImpactDisplayProps) => {
  if (impacts.length === 0) return null;

  return (
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
  );
};