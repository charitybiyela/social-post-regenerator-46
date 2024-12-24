export const GeoMapping = {
  CONTINENTS: ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica'],
  REGIONS: {
    Africa: ['North Africa', 'West Africa', 'East Africa', 'Central Africa', 'Southern Africa'],
    Asia: ['East Asia', 'South Asia', 'Southeast Asia', 'Central Asia', 'Western Asia'],
    Europe: ['Northern Europe', 'Western Europe', 'Eastern Europe', 'Southern Europe'],
    'North America': ['Northern America', 'Central America', 'Caribbean'],
    'South America': ['Northern South America', 'Eastern South America', 'Western South America', 'Southern South America'],
    Oceania: ['Australasia', 'Melanesia', 'Micronesia', 'Polynesia']
  }
};

export const ProfileCategories = {
  DEMOGRAPHICS: {
    age: null,
    gender: null,
    race: null,
    ethnicity: null,
    location: {
      continent: null,
      region: null,
      country: null,
      stateProvince: null,
      city: null,
      urbanRural: null,
      timeZone: null,
      localContext: {
        culturalRegion: null,
        economicZone: null,
        climateZone: null
      }
    },
    language: [],
    income: null,
    education: null
  },
  INTERESTS: {
    categories: [],
    intensity: {},
    hobbies: [],
    sports: [],
    entertainment: [],
    technology: []
  },
  PROFESSIONAL: {
    occupation: null,
    industry: null,
    seniority: null,
    skills: [],
    goals: [],
    networkConnections: []
  },
  LIFESTYLE: {
    personality: null,
    healthInterests: [],
    dietaryPreferences: [],
    fashion: {
      style: null,
      preferences: []
    },
    activities: []
  },
  CONTENT_PREFERENCES: {
    readingLevel: null,
    preferredFormats: [],
    topicDepth: null,
    mediaPreferences: [],
    updateFrequency: null
  },
  POLITICAL: {
    orientation: null,
    activeIssues: [],
    engagementLevel: null
  },
  
  EMOTIONAL_STATE: {
    currentMood: {
      primary: null,
      secondary: [],
      intensity: null,
      duration: null,
      triggers: [],
      timeOfDay: null
    },
    moodPatterns: {
      daily: {},
      weekly: {},
      seasonal: {}
    },
    emotionalResilience: {
      adaptability: null,
      copingMechanisms: [],
      supportSystems: []
    },
    stressLevel: {
      current: null,
      baseline: null,
      stressors: [],
      relaxants: []
    },
    contentSensitivity: {
      triggerTopics: [],
      preferredTones: [],
      contentFilters: []
    }
  },
  CIRCUMSTANCES: {
    lifeEvents: {
      recent: [],
      upcoming: [],
      ongoing: []
    },
    personalChallenges: {
      employment: null,
      relationships: null,
      health: null,
      financial: null
    },
    externalFactors: {
      naturalDisasters: [],
      economicChanges: [],
      socialChanges: [],
      globalEvents: []
    },
    supportNeeds: {
      type: [],
      urgency: null,
      duration: null
    },
    copingPhase: {
      stage: null,
      resources: [],
      progressMetrics: []
    }
  }
};

export interface ContentAdapter {
  adapt(content: any, profile: any): any;
}
