
export enum AppSection {
  RADIO = 'radio'
}

// Fix: Added missing Devotional interface to satisfy imports in geminiService.ts and DevotionalView.tsx
export interface Devotional {
  title: string;
  verse: string;
  reflection: string;
  prayer: string;
}

// Fix: Added missing Message interface to satisfy imports in Assistant.tsx
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
