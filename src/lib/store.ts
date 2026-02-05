import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  experienceLevel: "beginner" | "intermediate" | "advanced" | null;
  preferredLanguage: string | null;
  interests: string[];
  goals: string[];
  learningStyle: "visual" | "hands-on" | "reading" | null;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  language: string;
  estimatedTime: string;
  skills: string[];
  steps: string[];
}

interface AppState {
  // User profile from survey
  profile: UserProfile;
  setProfile: (profile: Partial<UserProfile>) => void;
  resetProfile: () => void;

  // Generated challenge
  challenge: Challenge | null;
  setChallenge: (challenge: Challenge) => void;

  // Loading states
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;

  // Survey step
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const initialProfile: UserProfile = {
  experienceLevel: null,
  preferredLanguage: null,
  interests: [],
  goals: [],
  learningStyle: null,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profile: initialProfile,
      setProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),
      resetProfile: () => set({ profile: initialProfile, challenge: null }),

      challenge: null,
      setChallenge: (challenge) => set({ challenge }),

      isGenerating: false,
      setIsGenerating: (value) => set({ isGenerating: value }),

      currentStep: 0,
      setCurrentStep: (step) => set({ currentStep: step }),
    }),
    {
      name: "firstcode-forge-store",
      partialize: (state) => ({
        profile: state.profile,
        challenge: state.challenge,
      }),
    },
  ),
);
