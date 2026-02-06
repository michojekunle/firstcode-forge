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

export interface CourseProgress {
  [courseId: string]: {
    completedLessons: number[];
    lastAccessed: number;
  };
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

  // Course progress tracking
  courseProgress: CourseProgress;
  setCourseProgress: (courseId: string, completedLessons: number[]) => void;
  getCourseProgress: (courseId: string) => number[];
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
    (set, get) => ({
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

      courseProgress: {},
      setCourseProgress: (courseId, completedLessons) =>
        set((state) => ({
          courseProgress: {
            ...state.courseProgress,
            [courseId]: {
              completedLessons,
              lastAccessed: Date.now(),
            },
          },
        })),
      getCourseProgress: (courseId) => {
        const progress = get().courseProgress[courseId];
        return progress?.completedLessons ?? [];
      },
    }),
    {
      name: "firstcode-forge-store",
      partialize: (state) => ({
        profile: state.profile,
        challenge: state.challenge,
        courseProgress: state.courseProgress,
      }),
    },
  ),
);
