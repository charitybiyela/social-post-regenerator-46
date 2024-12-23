import React from 'react';
import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const WeatherWidget = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">28°C</div>
            <div className="text-sm text-gray-500">Feels like 30°C</div>
          </div>
          <div className="text-right">
            <div className="text-lg">Partly Cloudy</div>
            <div className="text-sm text-gray-500">Kingston, JA</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};