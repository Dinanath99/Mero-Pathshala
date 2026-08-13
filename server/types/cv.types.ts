import { Document, Types } from "mongoose";

export interface ICVExperience {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  employmentType?: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance" | "Remote";
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements?: string[];
}

export interface ICVEducation {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  gpa?: string;
  description?: string;
}

export interface ICVSkill {
  id: string;
  name: string;
  category: "Technical Skills" | "Soft Skills" | "Tools & Technologies" | "Languages" | "General";
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface ICVProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface ICVCertification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ICVLanguage {
  id: string;
  language: string;
  proficiency: "Native" | "Fluent" | "Professional" | "Intermediate" | "Basic";
}

export interface ICVAchievement {
  id: string;
  title: string;
  organization?: string;
  date?: string;
  description?: string;
}

export interface ICVCustomItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface ICVCustomSection {
  id: string;
  title: string;
  items: ICVCustomItem[];
}

export interface ICVSettings {
  fontFamily: "inter" | "roboto" | "merriweather" | "outfit" | "playfair" | "geist";
  fontSize: "small" | "medium" | "large";
  spacing: "compact" | "normal" | "spacious";
  primaryColor: string;
  margins: "compact" | "normal" | "spacious";
  showSectionIcons: boolean;
}

export interface ICVPersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  photoUrl?: string;
  showPhoto: boolean;
}

export interface ICVData {
  title: string;
  template: "classic" | "modern" | "developer" | "graduate" | "executive";
  personalInfo: ICVPersonalInfo;
  summary: string;
  experience: ICVExperience[];
  education: ICVEducation[];
  skills: ICVSkill[];
  projects: ICVProject[];
  certifications: ICVCertification[];
  languages: ICVLanguage[];
  achievements: ICVAchievement[];
  customSections: ICVCustomSection[];
  sectionOrder: string[];
  hiddenSections: string[];
  settings: ICVSettings;
  isPublic?: boolean;
}

export interface ICVDocument extends ICVData, Document {
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICVRecommendation {
  id: string;
  section: "summary" | "experience" | "skills" | "education" | "general" | "formatting";
  type: "warning" | "improvement" | "grammar" | "action_verb" | "missing_keyword" | "success";
  issue: string;
  originalText?: string;
  suggestedText?: string;
  explanation: string;
  applied?: boolean;
}

export interface ICVJobMatch {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  roleSuitability: string;
  tailoredAdvice: string[];
}

export interface ICVAnalysisDocument extends Document {
  cvId?: Types.ObjectId;
  userId?: Types.ObjectId;
  overallScore: number;
  scores: {
    atsScore: number;
    contentQuality: number;
    skillsScore: number;
    experienceScore: number;
    educationScore: number;
    formattingScore: number;
    readabilityScore: number;
  };
  breakdown: {
    atsFeedback: string;
    contentFeedback: string;
    skillsFeedback: string;
    experienceFeedback: string;
    formattingFeedback: string;
  };
  recommendations: ICVRecommendation[];
  targetRole?: string;
  jobDescription?: string;
  jobMatch?: ICVJobMatch;
  createdAt: Date;
}
