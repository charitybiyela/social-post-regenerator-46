import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import styles from '@/styles/ticker.module.css';

interface SportsTickerProps {
  darkMode: boolean;
}

export const SportsTicker = ({ darkMode }: SportsTickerProps) => {
  const games = [
    { teams: "MUN vs ARS", score: "2-1", time: "85'" },
    { teams: "LAL vs GSW", score: "98-92", time: "Q4" },
    { teams: "WI vs ENG", score: "245/6", time: "LIVE" },
    { teams: "MUN vs ARS", score: "2-1", time: "85'" },
    { teams: "LAL vs GSW", score: "98-92", time: "Q4" },
    { teams: "WI vs ENG", score: "245/6", time: "LIVE" }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Activity className="w-4 h-4" />
          Live Sports
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden pt-0">
        <div className={`flex whitespace-nowrap ${styles.animateTicker}`}>
          {games.map((game, index) => (
            <div key={index} className="inline-flex items-center gap-3 px-4">
              <span className={`px-2 py-1 text-xs rounded ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {game.time}
              </span>
              <span className="font-medium">{game.teams}</span>
              <span className="text-blue-500 font-bold">{game.score}</span>
              <span className="text-gray-400 px-2">|</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};