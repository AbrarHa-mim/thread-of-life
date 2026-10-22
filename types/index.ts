// Data structure matching the AI output schema

export interface ThreadData {
  reference: string;
  user: {
    name: string;
    age: number;
    gender: string;
    hobby: string;
  };
  events: ThreadEvent[];
  threadStyle: {
    knotsAt: number[];
    loopsAt: number[];
    straightFrom: number;
    uncertainAt: number[];
  };
  rejectedFutures: RejectedFuture[];
  footnotes: Footnote[];
  fateDice: FateDice[];
  warning: string;
}

export interface ThreadEvent {
  year: number;
  side: 'left' | 'right';
  category: 'career' | 'personal' | 'absurd';
  title: string;
  description: string;
  twist: string;
  icon: 'briefcase' | 'heart' | 'cat' | 'graduation' | 'home' | 'child' | 'dice';
}

export interface RejectedFuture {
  title: string;
  reason: string;
}

export interface Footnote {
  year: number;
  text: string;
}

export interface FateDice {
  year: number;
  roll: number;
}

export interface FormData {
  name: string;
  age: number;
  gender: string;
  hobby: string;
  busReaction: string;
  paymentFrequency: number;
}

export type Language = 'bn' | 'en';
