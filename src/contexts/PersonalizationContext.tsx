import React, { createContext, useContext, useState } from 'react';
import { UserInterests } from '@/types/personalization';

interface PersonalizationContextType {
  userInterests: UserInterests;
  updateInterest: (category: keyof UserInterests, interest: string, value: boolean) => void;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
};

export const PersonalizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInterests, setUserInterests] = useState<UserInterests>({
    sports: {
      football: true,
      cricket: true,
      basketball: false,
      'american-football': false,
      tennis: false,
      formula1: false,
      rugby: false
    },
    finance: {
      stocks: true,
      forex: true,
      crypto: false,
      commodities: false,
      realestate: false,
      startups: false
    },
    technology: {
      fintech: true,
      ai: false,
      blockchain: false,
      cybersecurity: false,
      cloud: false,
      iot: false
    },
    entertainment: {
      movies: false,
      music: false,
      tv: false,
      books: false,
      gaming: false
    },
    lifestyle: {
      food: false,
      travel: false,
      health: false,
      fitness: false,
      culture: false
    },
    regions: {
      local: true,
      caribbean: true,
      global: true,
      northAmerica: false,
      europe: false,
      asia: false
    }
  });

  const updateInterest = (category: keyof UserInterests, interest: string, value: boolean) => {
    setUserInterests(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [interest]: value
      }
    }));
  };

  return (
    <PersonalizationContext.Provider value={{ userInterests, updateInterest }}>
      {children}
    </PersonalizationContext.Provider>
  );
};