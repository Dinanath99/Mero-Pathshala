export interface ToolCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface PricingTier {
  tierName: string;
  price: string;
  featuresEn?: string[];
  featuresNe?: string[];
}

export interface QuizOption {
  textEn: string;
  textNe: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  questionEn: string;
  questionNe: string;
  options: QuizOption[];
  explanationEn?: string;
  explanationNe?: string;
}

export interface Tool {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  descriptionNe?: string;
  logo?: string;
  coverImage?: string;
  websiteUrl: string;
  category: ToolCategory;
  pricingType: "Free" | "Freemium" | "Paid" | "Free Trial";
  pricingDetails?: string;
  features?: string[];
  platforms?: string[];
  screenshots?: string[];
  bestFor?: string[];
  faq?: Array<{ question: string; answer: string }>;
  status?: "Draft" | "Published";
  featured?: boolean;
  views?: number;
  rating?: number;
  learningObjectives?: Array<{ en: string; ne: string }>;
  tutorialSteps?: Array<{ stepNumber: number; titleEn: string; titleNe: string; descEn: string; descNe: string }>;
  useCases?: Array<{ role: string; titleEn: string; titleNe: string; exampleEn: string; exampleNe: string }>;
  practiceExercises?: Array<{ titleEn: string; titleNe: string; promptTemplate: string; instructionsEn: string; instructionsNe: string }>;
  bestPractices?: { dos: Array<{ en: string; ne: string }>; donts: Array<{ en: string; ne: string }>; tips: Array<{ en: string; ne: string }> };
  commonMistakes?: Array<{ mistakeEn: string; mistakeNe: string; solutionEn: string; solutionNe: string }>;
  advantages?: Array<{ titleEn: string; titleNe: string; descEn: string; descNe: string }>;
  limitations?: Array<{ titleEn: string; titleNe: string; descEn: string; descNe: string }>;
  pricingTiers?: PricingTier[];
  quiz?: QuizQuestion[];
  summary?: { takeawaysEn: string[]; takeawaysNe: string[] };
  relatedBlogs?: any[];
  relatedCourses?: any[];
  createdAt?: string;
  updatedAt?: string;
}
