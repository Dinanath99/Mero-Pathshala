import { User } from "./user.types";

export interface RoadmapStep {
  stepNumber: number;
  titleEn: string;
  titleNe: string;
  descEn?: string;
  descNe?: string;
  topics?: string[];
  recommendedResources?: Array<{ title: string; link: string; type: string }>;
}

export interface Roadmap {
  _id: string;
  title: string;
  slug: string;
  subtitleEn?: string;
  subtitleNe?: string;
  descriptionEn: string;
  descriptionNe?: string;
  icon?: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  estimatedWeeks?: number;
  steps: RoadmapStep[];
  status?: "Draft" | "Published";
  featured?: boolean;
  userProgress?: number;
  creator?: User | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoadmapAdvisorInput {
  targetRole: string;
  currentSkillLevel: string;
  weeklyHours: number;
  primaryLanguagePreference: string;
}
