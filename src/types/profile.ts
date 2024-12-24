export interface Profile {
  // Demographics
  age: number;
  country: string;
  region: string;
  gender: string;
  race: string;
  ethnicity: string;
  
  // Professional
  education: string;
  occupation: string;
  income: string;
  
  // Personal
  interests: string[];
  politicalLeaning: string;
  hobbies: string[];
  personalityTraits: string[];
  healthGoals: string[];
}

export interface FormField {
  name: keyof Profile;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect';
  options?: string[];
}

export interface FormSection {
  title: string;
  description: string;
  fields: FormField[];
}

export interface EmotionalState {
  currentMood: {
    primary: string | null;
    secondary: string[];
    intensity: number | null;
    duration: string | null;
    triggers: string[];
    timeOfDay: string | null;
  };
  moodPatterns: {
    daily: Record<string, any>;
    weekly: Record<string, any>;
    seasonal: Record<string, any>;
  };
  emotionalResilience: {
    adaptability: number | null;
    copingMechanisms: string[];
    supportSystems: string[];
  };
  stressLevel: {
    current: number | null;
    baseline: number | null;
    stressors: string[];
    relaxants: string[];
  };
  contentSensitivity: {
    triggerTopics: string[];
    preferredTones: string[];
    contentFilters: string[];
  };
}

export interface Circumstances {
  lifeEvents: {
    recent: string[];
    upcoming: string[];
    ongoing: string[];
  };
  personalChallenges: {
    employment: string | null;
    relationships: string | null;
    health: string | null;
    financial: string | null;
  };
  externalFactors: {
    naturalDisasters: string[];
    economicChanges: string[];
    socialChanges: string[];
    globalEvents: string[];
  };
  supportNeeds: {
    type: string[];
    urgency: string | null;
    duration: string | null;
  };
  copingPhase: {
    stage: string | null;
    resources: string[];
    progressMetrics: string[];
  };
}

export interface ExtendedProfile extends Profile {
  emotionalState: EmotionalState;
  circumstances: Circumstances;
  localContext: {
    culturalRegion: string | null;
    economicZone: string | null;
    climateZone: string | null;
  };
}
