export abstract class BaseAdapter {
  protected config: any;

  constructor(config: any) {
    this.config = config;
  }

  abstract adapt(item: any, profile: any): any;
}