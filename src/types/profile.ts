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