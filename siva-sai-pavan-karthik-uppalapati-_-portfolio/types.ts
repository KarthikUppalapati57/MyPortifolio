export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  sourceUrl?: string;
}

export interface Skill {
  name: string;
  category: 'AI & Data Science' | 'Web & Backend' | 'Tools & Platforms';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export interface Certification {
  name: string;
  issuer: string;
  description: string;
  url?: string;
  category: 'Generative AI' | 'McKinsey' | 'Coursera' | 'Software Development & Management';
}
