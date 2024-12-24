export const VariableConfigurations = {
  DEMOGRAPHIC: {
    age: {
      ranges: ['0-12', '13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
      weightingFactors: {
        contentComplexity: 0.8,
        topicRelevance: 0.9,
        formatPreference: 0.7
      }
    },
    gender: {
      options: ['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say'],
      contentConsiderations: ['representation', 'perspective', 'sensitivity']
    },
    race: {
      categories: ['Asian', 'Black', 'Hispanic', 'White', 'Mixed', 'Other'],
      culturalFactors: ['traditions', 'celebrations', 'historical context']
    },
    ethnicity: {
      culturalElements: ['language', 'customs', 'celebrations', 'historical significance'],
      communityFocus: ['local news', 'community events', 'cultural developments']
    },
    income: {
      ranges: ['0-25k', '26k-50k', '51k-75k', '76k-100k', '100k+'],
      contentFocus: ['financial news', 'lifestyle', 'investment', 'economy']
    },
    education: {
      levels: ['High School', 'Some College', 'Bachelor', 'Master', 'Doctorate'],
      contentAdaptation: ['complexity', 'depth', 'academic focus']
    }
  },

  GEOGRAPHIC: {
    global: {
      continents: ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'],
      regions: {
        Africa: ['North', 'South', 'East', 'West', 'Central'],
        Asia: ['East', 'South', 'Southeast', 'Central', 'West'],
        Europe: ['North', 'South', 'East', 'West', 'Central'],
        'North America': ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West'],
        'South America': ['North', 'Central', 'East', 'West', 'South'],
        Oceania: ['Australia', 'New Zealand', 'Pacific Islands']
      },
      timeZones: [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    local: {
      urbanRural: ['Urban', 'Suburban', 'Rural', 'Remote'],
      communitySize: ['Metropolis', 'Large City', 'Small City', 'Town', 'Village'],
      localContext: ['economic zone', 'cultural district', 'development area']
    }
  },

  INTERESTS: {
    categories: {
      primary: ['Technology', 'Science', 'Arts', 'Sports', 'Politics', 'Business'],
      secondary: ['Gaming', 'Travel', 'Food', 'Fashion', 'Music', 'Literature'],
      niche: ['Cryptocurrency', 'Sustainable Living', 'DIY', 'Collectibles']
    },
    depth: {
      levels: ['Casual', 'Enthusiast', 'Expert', 'Professional'],
      engagement: ['Browse', 'Read', 'Analyze', 'Contribute']
    },
    interaction: {
      preferred: ['Text', 'Video', 'Audio', 'Interactive'],
      frequency: ['Daily', 'Weekly', 'Monthly', 'Occasional']
    }
  },

  PROFESSIONAL: {
    career: {
      fields: ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Service'],
      levels: ['Entry', 'Mid-level', 'Senior', 'Executive'],
      focus: ['Technical', 'Management', 'Creative', 'Analysis']
    },
    skills: {
      technical: ['Programming', 'Data Analysis', 'Design', 'Writing'],
      soft: ['Leadership', 'Communication', 'Problem Solving'],
      certifications: ['Professional', 'Technical', 'Industry-specific']
    },
    goals: {
      shortTerm: ['Skill Development', 'Project Completion', 'Career Change'],
      longTerm: ['Leadership', 'Entrepreneurship', 'Expertise']
    }
  },

  CIRCUMSTANCES: {
    lifeEvents: {
      personal: ['Marriage', 'Divorce', 'Birth', 'Death', 'Relocation'],
      professional: ['Job Change', 'Promotion', 'Layoff', 'Business Start/End'],
      health: ['Illness', 'Recovery', 'Lifestyle Change']
    },
    challenges: {
      types: ['Financial', 'Health', 'Relationship', 'Career', 'Personal'],
      duration: ['Temporary', 'Ongoing', 'Chronic'],
      severity: ['Minor', 'Moderate', 'Severe']
    },
    support: {
      needs: ['Emotional', 'Financial', 'Professional', 'Medical'],
      resources: ['Community', 'Professional', 'Online', 'Family']
    }
  },

  EMOTIONAL_STATE: {
    moods: {
      primary: ['Happy', 'Sad', 'Anxious', 'Excited', 'Calm', 'Stressed'],
      intensity: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      duration: ['Moment', 'Hour', 'Day', 'Week', 'Month']
    },
    triggers: {
      external: ['News', 'Work', 'Relationships', 'Environment'],
      internal: ['Health', 'Goals', 'Memories', 'Expectations']
    },
    preferences: {
      contentTone: ['Positive', 'Neutral', 'Critical', 'Analytical'],
      topicSensitivity: ['Low', 'Medium', 'High']
    }
  },

  LIFESTYLE: {
    schedule: {
      routine: ['Early Bird', 'Night Owl', 'Flexible', 'Structured'],
      availability: ['Morning', 'Afternoon', 'Evening', 'Late Night']
    },
    health: {
      focus: ['Fitness', 'Nutrition', 'Mental Health', 'Medical Conditions'],
      goals: ['Prevention', 'Treatment', 'Improvement', 'Maintenance']
    },
    social: {
      interaction: ['Very Social', 'Moderately Social', 'Reserved', 'Private'],
      networks: ['Family', 'Friends', 'Professional', 'Community']
    }
  }
};
