export interface Player {
  name: string;
  currentMoney: number;
  level: number;
  xp: number;
  achievements: Achievement[];
  projects: string[];
  stats: PlayerStats;
  tutorial: {
    completed: string[];
    current: string;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  reward: {
    xp: number;
    money: number;
  };
  unlocked: boolean;
}

export interface PlayerStats {
  totalRevenue: number;
  totalCustomers: number;
  successfulCampaigns: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stage: 'ideation' | 'mvp' | 'beta' | 'launched';
  quality: number;
  revenue: {
    mrr: number;
    customers: number;
  };
  marketing: {
    adSpent: number;
    reach: number;
    conversions: number;
  };
}



export type ProjectStage = 
  | 'ideation'
  | 'validation'
  | 'development'
  | 'launch'
  | 'growth';

export interface ProjectStats {
  validation: number;
  development: number;
  userSatisfaction: number;
  marketFit: number;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  cost: number;
  timeToComplete: number;
  completed: boolean;
  impact: {
    revenue?: number;
    satisfaction?: number;
    churn?: number;
  };
}

export interface Marketing {
  advertising: {
    budget: number;
    reach: number;
    conversion: number;
    campaigns: Campaign[];
  };
  seo: {
    score: number;
    traffic: number;
    keywords: string[];
  };
  social: {
    followers: number;
    engagement: number;
    platforms: {
      name: string;
      followers: number;
      posts: number;
    }[];
  };
}

export interface Campaign {
  id: string;
  type: 'ads' | 'content' | 'social' | 'email';
  name: string;
  budget: number;
  startDate: string;
  endDate?: string;
  status: 'running' | 'completed' | 'failed';
  results: {
    reach: number;
    clicks: number;
    conversions: number;
    cost: number;
    revenue: number;
  };
}

export interface Revenue {
  mrr: number;
  customers: number;
  history: {
    date: string;
    mrr: number;
    customers: number;
  }[];
}

export interface ProjectCosts {
  total: number;
  development: number;
  marketing: number;
  infrastructure: number;
  history: {
    date: string;
    amount: number;
    category: 'development' | 'marketing' | 'infrastructure';
  }[];
}

export interface ProjectMetrics {
  userSatisfaction: number;
  churnRate: number;
  growthRate: number;
  profitMargin: number;
}
