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
  politicalLeaning: string;
}

export type FormSection = {
  title: string;
  description: string;
  fields: FormField[];
};

export type FormField = {
  name: keyof Profile;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
};