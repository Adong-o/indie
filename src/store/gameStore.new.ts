import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Type Definitions
 */
type ProjectStage = 'ideation' | 'development' | 'launched';
type CampaignStatus = 'active' | 'completed' | 'failed';

/**
 * Interface Definitions
 */
interface Campaign {
  id: string;
  name: string;
  budget: number;
  reach: number;
  conversions: number;
  status: CampaignStatus;
  startDate: string;
  endDate?: string;
}

interface Marketing {
  adSpent: number;
  reach: number;
  conversions: number;
  advertising: {
    campaigns: Campaign[];
  };
}

interface PlayerStats {
  totalRevenue: number;
  totalCustomers: number;
  successfulCampaigns: number;
}

interface PlayerTutorial {
  completed: string[];
  current: string;
}

interface PlayerSubSkills {
  frontend: number;
  backend: number;
  mobile: number;
  devops: number;
}

interface MarketingSubSkills {
  seo: number;
  socialMedia: number;
  content: number;
  analytics: number;
}

interface BusinessSubSkills {
  strategy: number;
  finance: number;
  sales: number;
  legal: number;
}

interface PlayerSkills {
  development: {
    level: number;
    subSkills: PlayerSubSkills;
  };
  marketing: {
    level: number;
    subSkills: MarketingSubSkills;
  };
  business: {
    level: number;
    subSkills: BusinessSubSkills;
  };
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  date?: string;
}

interface Player {
  name: string;
  currentMoney: number;
  level: number;
  xp: number;
  skills: PlayerSkills;
  achievements: Achievement[];
  stats: PlayerStats;
  tutorial: PlayerTutorial;
}

interface Project {
  id: string;
  name: string;
  description: string;
  stage: ProjectStage;
  quality: number;
  revenue: {
    mrr: number;
    customers: number;
  };
  marketing: Marketing;
}

interface Market {
  name: string;
  difficulty: number;
  potentialUsers: number;
  competitionLevel: number;
}

interface GameState {
  player: Player | null;
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  initialized: boolean;

  // Core Actions
  initializeGame: () => Promise<void>;
  createPlayer: (name: string, initialMoney: number) => void;
  createProject: (name: string, description: string) => void;
  selectProject: (projectId: string) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  
  // Money Management
  spendMoney: (amount: number) => boolean;
  earnMoney: (amount: number) => void;
  
  // Progress and Skills
  gainXP: (amount: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  
  // Marketing
  runAdCampaign: (projectId: string, budget: number) => void;
  updateCampaign: (projectId: string, campaignId: string, updates: Partial<Campaign>) => void;
  
  // Tutorial
  saveTutorialProgress: (step: string) => void;
}

/**
 * Utility Functions
 */
const calculateAdResults = (budget: number, projectQuality: number) => {
  const baseReach = budget * 100;
  const viralMultiplier = budget >= 100 ? 2.5 : 1;
  const qualityMultiplier = Math.min(2, Math.max(0.5, projectQuality / 50));
  
  const reach = Math.floor(baseReach * viralMultiplier * qualityMultiplier);
  const conversionRate = 0.02 + (budget >= 100 ? 0.03 : 0);
  const conversions = Math.floor(reach * conversionRate);
  
  return { reach, conversions };
};

/**
 * Constants
 */
const INITIAL_MARKETS: Market[] = [
  {
    name: 'SaaS',
    difficulty: 3,
    potentialUsers: 1000000,
    competitionLevel: 4,
  },
  {
    name: 'Mobile Apps',
    difficulty: 2,
    potentialUsers: 5000000,
    competitionLevel: 5,
  },
  {
    name: 'Developer Tools',
    difficulty: 4,
    potentialUsers: 500000,
    competitionLevel: 3,
  },
  {
    name: 'E-commerce',
    difficulty: 3,
    potentialUsers: 2000000,
    competitionLevel: 5,
  },
];

const initialPlayerSkills: PlayerSkills = {
  development: {
    level: 1,
    subSkills: {
      frontend: 0,
      backend: 0,
      mobile: 0,
      devops: 0,
    },
  },
  marketing: {
    level: 1,
    subSkills: {
      seo: 0,
      socialMedia: 0,
      content: 0,
      analytics: 0,
    },
  },
  business: {
    level: 1,
    subSkills: {
      strategy: 0,
      finance: 0,
      sales: 0,
      legal: 0,
    },
  },
};

/**
 * Game Store Implementation
 */
const useGameStore = create<GameState>((set, get) => ({
  // State
  player: null,
  projects: [],
  currentProject: null,
  loading: true,
  initialized: false,

  // Core Actions
  initializeGame: async () => {
    try {
      const savedState = await AsyncStorage.getItem('gameState');
      if (savedState) {
        const state = JSON.parse(savedState);
        set({ ...state, loading: false, initialized: true });
      } else {
        set({ loading: false, initialized: true });
      }
    } catch (err) {
      console.error('Failed to load game state:', err);
      set({ loading: false, initialized: true });
    }
  },

  createPlayer: (name: string, initialMoney: number) => {
    const player: Player = {
      name,
      currentMoney: initialMoney,
      level: 1,
      xp: 0,
      skills: initialPlayerSkills,
      achievements: [],
      stats: {
        totalRevenue: 0,
        totalCustomers: 0,
        successfulCampaigns: 0
      },
      tutorial: {
        completed: [],
        current: 'welcome'
      }
    };
    set({ player });
    AsyncStorage.setItem('gameState', JSON.stringify(get()));
  },

  createProject: (name: string, description: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      description,
      stage: 'ideation',
      quality: 50,
      revenue: {
        mrr: 0,
        customers: 0,
      },
      marketing: {
        adSpent: 0,
        reach: 0,
        conversions: 0,
        advertising: {
          campaigns: [],
        },
      },
    };

    set((state) => ({
      projects: [...state.projects, newProject],
      currentProject: newProject,
    }));
    
    AsyncStorage.setItem('gameState', JSON.stringify(get()));
  },

  selectProject: (projectId: string) => {
    set((state) => ({
      currentProject: state.projects.find((p) => p.id === projectId) || null,
    }));
  },

  updateProject: (projectId: string, updates: Partial<Project>) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, ...updates } : p
      ),
    }));
    
    AsyncStorage.setItem('gameState', JSON.stringify(get()));
  },

  // Money Management
  spendMoney: (amount: number) => {
    const { player } = get();
    if (!player || player.currentMoney < amount) return false;

    set((state) => ({
      player: {
        ...state.player!,
        currentMoney: state.player!.currentMoney - amount,
      },
    }));
    
    AsyncStorage.setItem('gameState', JSON.stringify(get()));
    return true;
  },

  earnMoney: (amount: number) => {
    set((state) => ({
      player: state.player
        ? {
            ...state.player,
            currentMoney: state.player.currentMoney + amount,
            stats: {
              ...state.player.stats,
              totalRevenue: state.player.stats.totalRevenue + amount,
            },
          }
        : null,
    }));
    
    AsyncStorage.setItem('gameState', JSON.stringify(get()));
  },

  // Progress and Skills
  gainXP: (amount: number) => {
    const { player } = get();
    if (!player) return;

    const newXP = player.xp + amount;
    const xpForNextLevel = player.level * 100;

    if (newXP >= xpForNextLevel) {
      set((state) => ({
        player: {
          ...state.player!,
          level: state.player!.level + 1,
          xp: newXP - xpForNextLevel,
        },
      }));
    } else {
      set((state) => ({
        player: {
          ...state.player!,
          xp: newXP,
        },
      }));
    }
    
    AsyncStorage.setItem('gameState', JSON.stringify(get()));
  },

  unlockAchievement: (achievement: Achievement) => {
    set((state) => ({
      player: state.player
        ? {
            ...state.player,
            achievements: [
              ...state.player.achievements,
              { ...achievement, unlocked: true, date: new Date().toISOString() },
            ],
          }
        : null,
    }));
    
    AsyncStorage.setItem('gameState', JSON.stringify(get()));
  },

  // Marketing
  runAdCampaign: (projectId: string, budget: number) => {
    const { projects, player } = get();
    if (!player || !projects.length) return;

    const project = projects.find((p) => p.id === projectId);
    if (!project || !get().spendMoney(budget)) return;

    const { reach, conversions } = calculateAdResults(budget, project.quality);
    const revenuePerCustomer = 20;

    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              marketing: {
                ...p.marketing,
                adSpent: p.marketing.adSpent + budget,
                reach: p.marketing.reach + reach,
                conversions: p.marketing.conversions + conversions,
                advertising: p.marketing.advertising,
              },
              revenue: {
                customers: p.revenue.customers + conversions,
                mrr: p.revenue.mrr + (conversions * revenuePerCustomer),
              },
            }
          : p
      ),
    }));

    set((state) => ({
      player: {
        ...state.player!,
        stats: {
          ...state.player!.stats,
          totalCustomers: state.player!.stats.totalCustomers + conversions,
          successfulCampaigns: state.player!.stats.successfulCampaigns + 1,
        },
      },
    }));

    get().gainXP(Math.floor(budget / 10));
    AsyncStorage.setItem('gameState', JSON.stringify(get()));
  },

  updateCampaign: (projectId: string, campaignId: string, updates: Partial<Campaign>) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              marketing: {
                ...p.marketing,
                advertising: {
                  ...p.marketing.advertising,
                  campaigns: p.marketing.advertising.campaigns.map((c) =>
                    c.id === campaignId ? { ...c, ...updates } : c
                  ),
                },
              },
            }
          : p
      ),
    }));
    
    AsyncStorage.setItem('gameState', JSON.stringify(get()));
  },

  // Tutorial
  saveTutorialProgress: (step: string) => {
    set((state) => ({
      player: state.player
        ? {
            ...state.player,
            tutorial: {
              ...state.player.tutorial,
              completed: [...state.player.tutorial.completed, step],
              current: step,
            },
          }
        : null,
    }));
    
    AsyncStorage.setItem('gameState', JSON.stringify(get()));
  },
}));

export default useGameStore;
