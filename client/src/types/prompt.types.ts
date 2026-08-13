import { User } from "./user.types";

export interface PromptCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface PromptBreakdown {
  sectionTitle: string;
  explanationEn: string;
  explanationNe: string;
}

export interface PromptItem {
  _id: string;
  title: string;
  slug: string;
  englishDescription: string;
  nepaliDescription?: string;
  promptContent: string;
  promptBreakdown?: PromptBreakdown[];
  expectedOutputEn?: string;
  expectedOutputNe?: string;
  customizationTipsEn?: string[];
  customizationTipsNe?: string[];
  practiceChallengeEn?: string;
  practiceChallengeNe?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  bestFor?: string[];
  tags?: string[];
  category: PromptCategory;
  aiTools?: any[];
  relatedBlogs?: any[];
  relatedCourses?: any[];
  featuredImage?: string;
  faq?: Array<{ question: string; answer: string }>;
  featured?: boolean;
  status?: "Draft" | "Published";
  copiesCount?: number;
  views?: number;
  createdBy?: User | string;
  createdAt?: string;
  updatedAt?: string;
}

export type Prompt = PromptItem;

