export interface NewsItem {
  id: number;
  title: string;
  category: string;
  importance: 'high' | 'medium' | 'low';
  content: string;
  tags: string[];
  time: string;
  media?: {
    type: 'chart' | 'image';
    data?: {
      labels: string[];
      values: number[];
      title: string;
    };
    src?: string;
    alt?: string;
  };
}