import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const MarketsWidget = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5" />
          Markets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">JSE</span>
            <span className="text-green-500">+1.2%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">USD/JMD</span>
            <span>156.75</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};