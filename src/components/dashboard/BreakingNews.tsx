import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const BreakingNews = () => {
  return (
    <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertTriangle className="w-5 h-5" />
          Breaking News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <span className="inline-block w-2 h-2 mt-1.5 rounded-full bg-red-500 animate-pulse" />
            <p className="text-sm">
              Major policy changes announced for Caribbean financial markets
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-block w-2 h-2 mt-1.5 rounded-full bg-red-500 animate-pulse" />
            <p className="text-sm">
              Emergency meeting called by regional banking authorities
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};