import _ from 'lodash';

interface CascadeMatrix {
  [key: string]: {
    [key: string]: number;
  };
}

interface WeightChanges {
  [key: string]: number;
}

interface ContentPrediction {
  increasedTopics: string[];
  decreasedTopics: string[];
  newTopics: string[];
  removedTopics: string[];
}

interface CategoryShift {
  shifts: { [key: string]: number };
  majorChanges: string[];
  balanceMetrics: { [key: string]: number };
}

export class WeightImpactAnalyzer {
  private currentWeightings: { [key: string]: number };
  private cascadeMatrix: CascadeMatrix;
  private historicalData: WeightHistoryManager;

  constructor(currentWeightings: { [key: string]: number }) {
    this.currentWeightings = currentWeightings;
    this.cascadeMatrix = this.initializeCascadeMatrix();
    this.historicalData = new WeightHistoryManager();
  }

  private initializeCascadeMatrix(): CascadeMatrix {
    return {
      political: {
        culturalRelevance: 0.4,
        regional: 0.3,
        lifestyle: 0.2
      },
      regional: {
        culturalRelevance: 0.5,
        language: 0.3,
        lifestyle: 0.2
      },
      interests: {
        professionalRelevance: 0.4,
        lifestyle: 0.3,
        personalGoals: 0.3
      },
      emotional: {
        healthAlignment: 0.4,
        contentSensitivity: 0.4,
        personalGoals: 0.2
      }
    };
  }

  calculateCascadeEffects(weightChanges: WeightChanges): { [key: string]: number } {
    const cascadeEffects: { [key: string]: number } = {};
    
    Object.entries(weightChanges).forEach(([category, change]) => {
      if (this.cascadeMatrix[category]) {
        Object.entries(this.cascadeMatrix[category]).forEach(([affectedCategory, multiplier]) => {
          cascadeEffects[affectedCategory] = (cascadeEffects[affectedCategory] || 0) + (change * multiplier);
        });
      }
    });

    return cascadeEffects;
  }

  predictContentChanges(weightChanges: WeightChanges): ContentPrediction {
    const significantChange = 3; // threshold for significant weight change
    const increasedTopics: string[] = [];
    const decreasedTopics: string[] = [];

    Object.entries(weightChanges).forEach(([category, change]) => {
      if (change > significantChange) {
        increasedTopics.push(this.mapCategoryToTopic(category));
      } else if (change < -significantChange) {
        decreasedTopics.push(this.mapCategoryToTopic(category));
      }
    });

    return {
      increasedTopics,
      decreasedTopics,
      newTopics: this.predictNewTopics(weightChanges),
      removedTopics: this.predictRemovedTopics(weightChanges)
    };
  }

  private mapCategoryToTopic(category: string): string {
    const topicMapping: { [key: string]: string } = {
      political: 'Political News',
      regional: 'Local News',
      interests: 'Personal Interests',
      emotional: 'Emotional Content',
      lifestyle: 'Lifestyle Content'
    };
    return topicMapping[category] || category;
  }

  private predictNewTopics(weightChanges: WeightChanges): string[] {
    return Object.entries(weightChanges)
      .filter(([_, change]) => change > 5)
      .map(([category]) => `New ${this.mapCategoryToTopic(category)}`);
  }

  private predictRemovedTopics(weightChanges: WeightChanges): string[] {
    return Object.entries(weightChanges)
      .filter(([_, change]) => change < -5)
      .map(([category]) => `Removed ${this.mapCategoryToTopic(category)}`);
  }

  analyzeCategoryShifts(weightChanges: WeightChanges): CategoryShift {
    const currentDistribution = this.calculateCategoryDistribution(this.currentWeightings);
    const newWeightings = { ...this.currentWeightings, ...weightChanges };
    const newDistribution = this.calculateCategoryDistribution(newWeightings);
    
    return {
      shifts: this.compareDistributions(currentDistribution, newDistribution),
      majorChanges: this.identifyMajorShifts(currentDistribution, newDistribution),
      balanceMetrics: this.calculateBalanceMetrics(newDistribution)
    };
  }

  private calculateCategoryDistribution(weightings: { [key: string]: number }): { [key: string]: number } {
    const total = Object.values(weightings).reduce((sum, weight) => sum + weight, 0);
    return Object.entries(weightings).reduce((dist, [category, weight]) => {
      dist[category] = (weight / total) * 100;
      return dist;
    }, {} as { [key: string]: number });
  }

  private compareDistributions(current: { [key: string]: number }, updated: { [key: string]: number }): { [key: string]: number } {
    return Object.keys(current).reduce((shifts, category) => {
      shifts[category] = updated[category] - current[category];
      return shifts;
    }, {} as { [key: string]: number });
  }

  private identifyMajorShifts(current: { [key: string]: number }, updated: { [key: string]: number }): string[] {
    const threshold = 5; // 5% change threshold for major shifts
    return Object.keys(current).filter(category => 
      Math.abs(updated[category] - current[category]) > threshold
    );
  }

  private calculateBalanceMetrics(distribution: { [key: string]: number }): { [key: string]: number } {
    const idealBalance = 100 / Object.keys(distribution).length;
    return Object.entries(distribution).reduce((metrics, [category, value]) => {
      metrics[category] = Math.abs(value - idealBalance);
      return metrics;
    }, {} as { [key: string]: number });
  }

  generateBalancingRecommendations(weightChanges: WeightChanges): {
    immediate: string[];
    longTerm: string[];
    userSpecific: string[];
  } {
    const imbalances = this.identifyImbalances(weightChanges);
    
    return {
      immediate: this.generateImmediateAdjustments(imbalances),
      longTerm: this.generateLongTermSuggestions(imbalances),
      userSpecific: this.generatePersonalizedRecommendations(imbalances)
    };
  }

  private identifyImbalances(weightChanges: WeightChanges): string[] {
    const threshold = 10; // 10% threshold for imbalance
    return Object.entries(weightChanges)
      .filter(([_, change]) => Math.abs(change) > threshold)
      .map(([category]) => category);
  }

  private generateImmediateAdjustments(imbalances: string[]): string[] {
    return imbalances.map(category => 
      `Consider moderating ${category} weight to maintain content balance`
    );
  }

  private generateLongTermSuggestions(imbalances: string[]): string[] {
    return imbalances.map(category =>
      `Gradually adjust ${category} weight over time for optimal content mix`
    );
  }

  private generatePersonalizedRecommendations(imbalances: string[]): string[] {
    return imbalances.map(category =>
      `Based on your profile, you might want to explore more ${this.mapCategoryToTopic(category).toLowerCase()} content`
    );
  }
}

class WeightHistoryManager {
  private history: Array<{ changes: WeightChanges; timestamp: Date }>;
  private satisfactionMetrics: Map<string, number>;

  constructor() {
    this.history = [];
    this.satisfactionMetrics = new Map();
  }

  findSimilarChanges(weightChanges: WeightChanges): Array<{ changes: WeightChanges; timestamp: Date }> {
    const similarityThreshold = 0.8;
    return this.history.filter(historical => 
      this.calculateSimilarity(historical.changes, weightChanges) > similarityThreshold
    );
  }

  private calculateSimilarity(changes1: WeightChanges, changes2: WeightChanges): number {
    const categories = new Set([...Object.keys(changes1), ...Object.keys(changes2)]);
    let similarity = 0;
    
    categories.forEach(category => {
      const diff = Math.abs((changes1[category] || 0) - (changes2[category] || 0));
      similarity += 1 - (diff / 10); // Normalize difference to 0-1 scale
    });
    
    return similarity / categories.size;
  }

  trackSatisfaction(weightConfig: string, satisfaction: number): void {
    this.satisfactionMetrics.set(weightConfig, satisfaction);
  }
}