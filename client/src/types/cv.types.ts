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
  _id?: string;
  userId?: string;
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
  createdAt?: string;
  updatedAt?: string;
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

export interface ICVAnalysis {
  _id?: string;
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
  createdAt?: string;
}

export const INITIAL_CV_DATA: ICVData = {
  title: "My Professional CV",
  template: "modern",
  personalInfo: {
    fullName: "Aarav Sharma",
    professionalTitle: "Full Stack Engineer & AI Developer",
    email: "aarav.sharma@example.com",
    phone: "+977 9801234567",
    location: "Kathmandu, Nepal",
    website: "https://aaravsharma.dev",
    linkedin: "https://linkedin.com/in/aaravsharma",
    github: "https://github.com/aaravsharma",
    portfolio: "https://aaravsharma.dev/portfolio",
    photoUrl: "",
    showPhoto: true,
  },
  summary:
    "Proactive Full Stack Engineer with 3+ years of experience building performant web applications and deploying applied AI solutions. Skilled across React, TypeScript, Node.js, and Cloud Infrastructure with a strong emphasis on clean code and user experience.",
  experience: [
    {
      id: "exp_1",
      jobTitle: "Senior Software Engineer",
      company: "Tech Himal Innovations",
      location: "Kathmandu, Nepal",
      employmentType: "Full-time",
      startDate: "2024-01",
      endDate: "",
      current: true,
      description:
        "Lead the core platform engineering team in designing scalable microservices and intuitive student-facing web interfaces.",
      achievements: [
        "Architected modular Node.js & TypeScript microservices, reducing API latency by 35%.",
        "Mentored junior developers and established CI/CD automated test suites.",
      ],
    },
    {
      id: "exp_2",
      jobTitle: "Full Stack Developer",
      company: "Nepal Web Solutions",
      location: "Lalitpur, Nepal",
      employmentType: "Full-time",
      startDate: "2022-06",
      endDate: "2023-12",
      current: false,
      description:
        "Developed responsive web applications, secure RESTful APIs, and integrated local digital payment gateways.",
      achievements: [
        "Migrated legacy codebase to React and Tailwind CSS, improving core web vitals by 40%.",
        "Integrated eSewa, Khalti, and Stripe checkout pipelines.",
      ],
    },
  ],
  education: [
    {
      id: "edu_1",
      degree: "B.Sc. in Computer Science & IT (B.Sc. CSIT)",
      institution: "Tribhuvan University",
      location: "Kathmandu, Nepal",
      startDate: "2018",
      endDate: "2022",
      current: false,
      gpa: "3.85 / 4.0",
      description: "Graduated with Honors. Focused on Distributed Systems and Machine Learning.",
    },
  ],
  skills: [
    { id: "sk_1", name: "TypeScript", category: "Technical Skills", level: "Expert" },
    { id: "sk_2", name: "React / Next.js", category: "Technical Skills", level: "Expert" },
    { id: "sk_3", name: "Node.js / Express", category: "Technical Skills", level: "Advanced" },
    { id: "sk_4", name: "MongoDB / PostgreSQL", category: "Technical Skills", level: "Advanced" },
    { id: "sk_5", name: "Python", category: "Technical Skills", level: "Intermediate" },
    { id: "sk_6", name: "Docker & CI/CD", category: "Tools & Technologies", level: "Intermediate" },
    { id: "sk_7", name: "Git / GitHub", category: "Tools & Technologies", level: "Advanced" },
    { id: "sk_8", name: "REST APIs & GraphQL", category: "Technical Skills", level: "Advanced" },
    { id: "sk_9", name: "Agile Leadership", category: "Soft Skills", level: "Advanced" },
    { id: "sk_10", name: "English & Nepali", category: "Languages", level: "Expert" },
  ],
  projects: [
    {
      id: "proj_1",
      name: "AI Pathsala — Interactive Learning Platform",
      description:
        "Engineered an interactive EdTech platform featuring automated lesson quizzes, real-time video progress tracking, and AI career recommendations.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
      projectUrl: "https://aigurunepal.com",
      githubUrl: "https://github.com/aaravsharma/ai-pathsala",
      startDate: "2023-08",
      endDate: "2024-02",
    },
  ],
  certifications: [
    {
      id: "cert_1",
      name: "AWS Certified Solutions Architect – Associate",
      organization: "Amazon Web Services",
      issueDate: "2023-11",
      expiryDate: "2026-11",
      credentialId: "AWS-9874521",
      credentialUrl: "https://aws.amazon.com/verify",
    },
  ],
  languages: [
    { id: "lang_1", language: "English", proficiency: "Fluent" },
    { id: "lang_2", language: "Nepali", proficiency: "Native" },
    { id: "lang_3", language: "Hindi", proficiency: "Professional" },
  ],
  achievements: [
    {
      id: "ach_1",
      title: "1st Place — National AI & Web Innovation Hackathon 2023",
      organization: "CAN Federation Nepal",
      date: "2023-09",
      description: "Recognized for building an offline-first AI educational toolkit.",
    },
  ],
  customSections: [],
  sectionOrder: [
    "personalInfo",
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
    "achievements",
  ],
  hiddenSections: [],
  settings: {
    fontFamily: "inter",
    fontSize: "medium",
    spacing: "normal",
    primaryColor: "#ea580c",
    margins: "normal",
    showSectionIcons: true,
  },
  isPublic: false,
};
