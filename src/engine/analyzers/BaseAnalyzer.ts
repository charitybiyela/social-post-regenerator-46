export abstract class BaseAnalyzer {
  protected config: any;

  constructor(config: any) {
    this.config = config;
  }

  abstract calculateScore(item: any, profile: any): number;
}