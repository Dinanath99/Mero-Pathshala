export interface NewsCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface NewsTag {
  _id: string;
  name: string;
  slug: string;
}

export interface NepalPerspective {
  students?: string;
  developers?: string;
  businesses?: string;
  teachers?: string;
}

export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  coverImage?: string;
  content: string;
  keyTakeaways?: string[];
  whyItMattersEn?: string;
  whyItMattersNe?: string;
  nepalPerspective?: NepalPerspective;
  author?: { name?: string; role?: string; avatar?: string };
  readingTime?: string;
  breakingNews?: boolean;
  featured?: boolean;
  status?: "Draft" | "Published";
  category: NewsCategory;
  tags?: NewsTag[];
  relatedTools?: any[];
  relatedBlogs?: any[];
  relatedCourses?: any[];
  faq?: Array<{ question: string; answer: string }>;
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type News = NewsArticle;

