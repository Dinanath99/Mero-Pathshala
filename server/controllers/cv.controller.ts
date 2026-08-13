import { Request, Response } from "express";
import mongoose from "mongoose";
import OpenAI from "openai";
import { CV } from "../models/cv.model.js";
import { CVAnalysis } from "../models/cvAnalysis.model.js";
import { ICVData, ICVRecommendation } from "../types/cv.types.js";

const apiKey =
  process.env.OPENROUTER_API_KEY ||
  process.env.OPENAI_API_KEY ||
  "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";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey,
});

// Default starter CV structure
export const defaultStarterCV: Omit<ICVData, "title"> & { title: string } = {
  title: "Professional Resume",
  template: "modern",
  personalInfo: {
    fullName: "Aarav Sharma",
    professionalTitle: "Full Stack Engineer & AI Enthusiast",
    email: "aarav.sharma@example.com",
    phone: "+977 9801234567",
    location: "Kathmandu, Nepal",
    website: "https://aaravsharma.dev",
    linkedin: "https://linkedin.com/in/aaravsharma",
    github: "https://github.com/aaravsharma",
    portfolio: "https://aaravsharma.dev/projects",
    photoUrl: "",
    showPhoto: true,
  },
  summary:
    "Proactive Full Stack Engineer with 3+ years of experience engineering scalable web applications and integrating modern AI capabilities. Proficient in React, TypeScript, Node.js, and MongoDB with a track record of boosting system performance and team productivity.",
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
        "Lead frontend and API architecture for high-traffic SaaS applications serving over 50,000 active monthly learners.",
      achievements: [
        "Architected modular microservices in Node.js & TypeScript, cutting response times by 35%.",
        "Mentored 6 junior developers and established CI/CD automated test pipelines.",
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
        "Developed responsive user interfaces and robust RESTful APIs for regional e-commerce and fintech clients.",
      achievements: [
        "Migrated legacy codebase to React and Tailwind CSS, reducing page load latency by 40%.",
        "Integrated payment gateways including eSewa, Khalti, and Stripe for frictionless checkout.",
      ],
    },
  ],
  education: [
    {
      id: "edu_1",
      degree: "Bachelor of Science in Computer Science & IT (B.Sc. CSIT)",
      institution: "Tribhuvan University",
      location: "Kathmandu, Nepal",
      startDate: "2018",
      endDate: "2022",
      current: false,
      gpa: "3.85 / 4.0",
      description: "Graduated with distinction. Specialized in Distributed Systems and Machine Learning.",
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
    { id: "sk_10", name: "English (Fluent) & Nepali (Native)", category: "Languages", level: "Expert" },
  ],
  projects: [
    {
      id: "proj_1",
      name: "AI Pathsala — Interactive Learning Platform",
      description:
        "Built a comprehensive EdTech platform with personalized AI recommendations, video progress tracking, and interactive quizzes.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
      projectUrl: "https://aigurunepal.com",
      githubUrl: "https://github.com/aaravsharma/ai-pathsala",
      startDate: "2023-08",
      endDate: "2024-02",
    },
    {
      id: "proj_2",
      name: "Nepali Sentiment NLP Pipeline",
      description:
        "Fine-tuned transformer models for sentiment classification of Nepali Romanized and Devanagari text with 92% accuracy.",
      technologies: ["Python", "PyTorch", "Hugging Face", "FastAPI"],
      projectUrl: "",
      githubUrl: "https://github.com/aaravsharma/nepali-sentiment-ai",
      startDate: "2023-01",
      endDate: "2023-05",
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
      title: "1st Place Winner — National AI & Web Hackathon 2023",
      organization: "CAN Federation Nepal",
      date: "2023-09",
      description: "Recognized for building an offline-first AI educational toolkit for rural schools.",
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

// 1. Create CV
export const createCV = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    const payload = req.body || {};
    const cvData = {
      ...defaultStarterCV,
      ...payload,
      userId,
      title: payload.title || "My Professional CV",
    };

    const newCV = await CV.create(cvData);
    return res.status(201).json({
      success: true,
      message: "CV created successfully.",
      cv: newCV,
    });
  } catch (error) {
    console.error("createCV error:", error);
    return res.status(500).json({ success: false, message: "Failed to create CV." });
  }
};

// 2. Get all CVs for current user
export const getUserCVs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    const cvs = await CV.find({ userId }).sort({ updatedAt: -1 });
    return res.status(200).json({
      success: true,
      cvs: cvs || [],
    });
  } catch (error) {
    console.error("getUserCVs error:", error);
    return res.status(500).json({ success: false, message: "Failed to retrieve CVs." });
  }
};

// 3. Get CV by ID
export const getCVById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = req.params.id as string;
    const userId = req.id as string | undefined;

    if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "CV not found." });
    }

    const cv = await CV.findById(id);
    if (!cv) {
      return res.status(404).json({ success: false, message: "CV not found." });
    }

    // Allow access if owner or public
    if (cv.userId.toString() !== userId && !cv.isPublic) {
      return res.status(403).json({ success: false, message: "Unauthorized access to this CV." });
    }

    return res.status(200).json({
      success: true,
      cv,
    });
  } catch (error) {
    console.error("getCVById error:", error);
    return res.status(500).json({ success: false, message: "Failed to retrieve CV." });
  }
};

// 4. Update CV
export const updateCV = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = req.params.id as string;
    const userId = req.id as string | undefined;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "CV not found." });
    }

    const existingCV = await CV.findById(id);
    if (!existingCV) {
      return res.status(404).json({ success: false, message: "CV not found." });
    }

    if (existingCV.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to edit this CV." });
    }

    const updatedCV = await CV.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    return res.status(200).json({
      success: true,
      message: "CV updated successfully.",
      cv: updatedCV,
    });
  } catch (error) {
    console.error("updateCV error:", error);
    return res.status(500).json({ success: false, message: "Failed to update CV." });
  }
};

// 5. Delete CV
export const deleteCV = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = req.params.id as string;
    const userId = req.id as string | undefined;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "CV not found." });
    }

    const existingCV = await CV.findById(id);
    if (!existingCV) {
      return res.status(404).json({ success: false, message: "CV not found." });
    }

    if (existingCV.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this CV." });
    }

    await CV.findByIdAndDelete(id);
    await CVAnalysis.deleteMany({ cvId: id });

    return res.status(200).json({
      success: true,
      message: "CV deleted successfully.",
    });
  } catch (error) {
    console.error("deleteCV error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete CV." });
  }
};

// 6. Duplicate CV
export const duplicateCV = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = req.params.id as string;
    const userId = req.id as string | undefined;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "CV not found." });
    }

    const existingCV = await CV.findById(id);
    if (!existingCV) {
      return res.status(404).json({ success: false, message: "CV not found." });
    }

    if (existingCV.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized to duplicate this CV." });
    }

    const cvObject = existingCV.toObject();
    delete (cvObject as any)._id;
    delete (cvObject as any).createdAt;
    delete (cvObject as any).updatedAt;
    delete (cvObject as any).__v;

    cvObject.title = `${existingCV.title} (Copy)`;
    cvObject.userId = new mongoose.Types.ObjectId(userId);

    const duplicated = await CV.create(cvObject);

    return res.status(201).json({
      success: true,
      message: "CV duplicated successfully.",
      cv: duplicated,
    });
  } catch (error) {
    console.error("duplicateCV error:", error);
    return res.status(500).json({ success: false, message: "Failed to duplicate CV." });
  }
};

// 7. AI Improve Summary (Strictly grounded in provided user info)
export const improveSummaryAI = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { personalInfo, currentSummary, experience, skills, targetRole } = req.body;

    const skillsList = Array.isArray(skills)
      ? skills.map((s: any) => (typeof s === "string" ? s : s.name)).filter(Boolean).join(", ")
      : "";

    const expList = Array.isArray(experience)
      ? experience
          .map((e: any) => `${e.jobTitle || ""} at ${e.company || ""} (${e.description || ""})`)
          .join("; ")
      : "";

    const userPrompt = `
Generate a concise, impactful, ATS-friendly professional summary (2 to 4 sentences) for a resume.

Context provided by the user:
- Candidate Name: ${personalInfo?.fullName || "Candidate"}
- Current Title / Target Role: ${targetRole || personalInfo?.professionalTitle || "Professional"}
- Existing Draft Summary: "${currentSummary || ""}"
- Key Skills: ${skillsList || "Relevant industry skills"}
- Work Experience Context: ${expList || "Experienced background"}

CRITICAL RULES:
1. Ground the summary strictly in the provided skills, role, and experience.
2. DO NOT invent fake companies, fake degrees, or unmentioned technologies.
3. Use strong action-oriented vocabulary, highlight core competencies, and keep it between 40-75 words.
4. Output ONLY the refined summary text without commentary or quotes.
`;

    let refinedSummary = "";

    try {
      const completion = await openai.chat.completions.create({
        model: "google/gemma-4-26b-a4b-it:free",
        messages: [
          {
            role: "system",
            content:
              "You are an expert career consultant and resume architect. You craft precise, high-impact, factual resume summaries.",
          },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 250,
        temperature: 0.7,
      });

      refinedSummary = completion.choices[0]?.message?.content?.trim().replace(/^"|"$/g, "") || "";
    } catch (aiErr) {
      console.warn("OpenAI API call fallback for summary:", aiErr);
    }

    if (!refinedSummary) {
      const title = targetRole || personalInfo?.professionalTitle || "Results-driven professional";
      refinedSummary = `${title} with demonstrated expertise in ${
        skillsList || "modern software engineering and problem-solving"
      }. Proven track record of delivering scalable solutions, optimizing workflows, and collaborating in agile environments to achieve tangible business outcomes.`;
    }

    return res.status(200).json({
      success: true,
      improvedSummary: refinedSummary,
    });
  } catch (error) {
    console.error("improveSummaryAI error:", error);
    return res.status(500).json({ success: false, message: "Failed to improve summary." });
  }
};

// 8. AI Improve Bullet Point
export const improveBulletAI = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { bulletText, context, goal } = req.body;

    if (!bulletText || typeof bulletText !== "string") {
      return res.status(400).json({ success: false, message: "Valid bullet text is required." });
    }

    const userPrompt = `
Improve the following resume bullet point to make it more professional, ATS-optimized, and achievement-focused.

Original Bullet: "${bulletText}"
Job Context: ${context?.jobTitle ? `${context.jobTitle} at ${context.company || ""}` : "Professional Role"}
Goal: ${goal || "achievement-oriented and concise"}

Rules:
- Preserve the exact factual truth (do not fabricate unmentioned metrics or tools).
- Start with a powerful past-tense action verb (e.g., Spearheaded, Architected, Accelerated, Streamlined).
- Return ONLY the improved bullet text without formatting, prefixes, or quotes.
`;

    let improvedBullet = "";

    try {
      const completion = await openai.chat.completions.create({
        model: "google/gemma-4-26b-a4b-it:free",
        messages: [
          {
            role: "system",
            content: "You are a professional resume editor. Rewrite bullets to be concise, active, and impactful.",
          },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 150,
        temperature: 0.6,
      });

      improvedBullet = completion.choices[0]?.message?.content?.trim().replace(/^[-•*"\s]+|["\s]+$/g, "") || "";
    } catch (aiErr) {
      console.warn("OpenAI API call fallback for bullet:", aiErr);
    }

    if (!improvedBullet) {
      improvedBullet = bulletText.replace(/^(worked on|helped with|responsible for)\s+/i, "Engineered and delivered ");
    }

    return res.status(200).json({
      success: true,
      improvedBullet,
    });
  } catch (error) {
    console.error("improveBulletAI error:", error);
    return res.status(500).json({ success: false, message: "Failed to improve bullet point." });
  }
};

// Helper: Heuristic Analysis Engine
function runHeuristicCVAnalysis(cvData: ICVData): {
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
} {
  const recommendations: ICVRecommendation[] = [];
  let ats = 70;
  let content = 70;
  let skillsScore = 70;
  let expScore = 70;
  let eduScore = 75;
  let formatScore = 80;
  let readScore = 80;

  // 1. Personal Info Check
  if (!cvData.personalInfo?.fullName || cvData.personalInfo.fullName.length < 3) {
    ats -= 15;
    formatScore -= 10;
    recommendations.push({
      id: "rec_name",
      section: "general",
      type: "warning",
      issue: "Missing full name",
      explanation: "A clear, complete full name at the top is vital for ATS parsing and recruiter recognition.",
    });
  }

  if (!cvData.personalInfo?.email || !cvData.personalInfo.email.includes("@")) {
    ats -= 15;
    recommendations.push({
      id: "rec_email",
      section: "general",
      type: "warning",
      issue: "Invalid or missing email address",
      explanation: "ATS and recruiters need a professional email address to contact you.",
    });
  }

  if (!cvData.personalInfo?.phone) {
    ats -= 5;
    recommendations.push({
      id: "rec_phone",
      section: "general",
      type: "improvement",
      issue: "Phone number is recommended",
      explanation: "Adding a valid phone number with country code improves hiring outreach response rates.",
    });
  }

  if (!cvData.personalInfo?.linkedin && !cvData.personalInfo?.github) {
    ats -= 5;
    recommendations.push({
      id: "rec_socials",
      section: "general",
      type: "improvement",
      issue: "No LinkedIn or GitHub profile linked",
      explanation: "Recruiters frequently verify professional presence and code portfolios online.",
    });
  }

  // 2. Summary Check
  if (!cvData.summary || cvData.summary.trim().length === 0) {
    content -= 20;
    ats -= 10;
    recommendations.push({
      id: "rec_summary_missing",
      section: "summary",
      type: "warning",
      issue: "Professional summary is missing",
      suggestedText:
        "Passionate professional with expertise in technical problem-solving and delivering high-value software solutions.",
      explanation:
        "A compelling 2-3 sentence executive summary quickly hooks recruiters and establishes your key value proposition.",
    });
  } else if (cvData.summary.length < 60) {
    content -= 10;
    recommendations.push({
      id: "rec_summary_short",
      section: "summary",
      type: "improvement",
      issue: "Professional summary is too brief",
      originalText: cvData.summary,
      explanation: "Expand your summary to 2-4 sentences highlighting years of experience, core domains, and key impact.",
    });
  } else {
    content += 10;
  }

  // 3. Experience Check
  if (!cvData.experience || cvData.experience.length === 0) {
    expScore -= 25;
    content -= 15;
    recommendations.push({
      id: "rec_exp_missing",
      section: "experience",
      type: "warning",
      issue: "No work experience listed",
      explanation:
        "Add relevant internships, freelance work, or full-time roles to demonstrate practical industry application.",
    });
  } else {
    let hasShortDesc = false;
    let missingMetrics = false;

    cvData.experience.forEach((e) => {
      if (!e.description || e.description.length < 30) {
        hasShortDesc = true;
      }
      const combined = (e.description || "") + (e.achievements?.join(" ") || "");
      if (!/\d+%|\d+x|\$\d+|\d+\+|\d+ (users|clients|projects|developers)/i.test(combined)) {
        missingMetrics = true;
      }
    });

    if (hasShortDesc) {
      expScore -= 10;
      recommendations.push({
        id: "rec_exp_desc",
        section: "experience",
        type: "improvement",
        issue: "Brief experience descriptions",
        explanation: "Detail your key responsibilities and technologies used in each role for higher ATS keyword density.",
      });
    }

    if (missingMetrics) {
      expScore -= 8;
      recommendations.push({
        id: "rec_exp_metrics",
        section: "experience",
        type: "improvement",
        issue: "Include quantifiable achievements",
        explanation:
          "Use numbers and percentages (e.g. 'boosted performance by 30%', 'managed team of 5') to demonstrate concrete business impact.",
      });
    }
  }

  // 4. Skills Check
  if (!cvData.skills || cvData.skills.length < 4) {
    skillsScore -= 25;
    ats -= 15;
    recommendations.push({
      id: "rec_skills_low",
      section: "skills",
      type: "warning",
      issue: "Low skill keyword count",
      explanation: "Add at least 6-10 targeted technical and soft skills to pass ATS keyword filtering filters.",
    });
  } else {
    skillsScore += Math.min(20, cvData.skills.length * 2);
  }

  // 5. Education Check
  if (!cvData.education || cvData.education.length === 0) {
    eduScore -= 20;
    recommendations.push({
      id: "rec_edu_missing",
      section: "education",
      type: "warning",
      issue: "No educational background listed",
      explanation: "Include your highest degree, university/college, and graduation year.",
    });
  }

  // 6. Projects Check
  if (!cvData.projects || cvData.projects.length === 0) {
    content -= 10;
    recommendations.push({
      id: "rec_proj_missing",
      section: "general",
      type: "improvement",
      issue: "Consider adding notable projects",
      explanation: "Highlighting 1-3 key projects demonstrates hands-on initiative and real-world technology application.",
    });
  }

  // Clamp scores
  const clamp = (num: number) => Math.max(20, Math.min(100, Math.round(num)));
  const finalAts = clamp(ats);
  const finalContent = clamp(content);
  const finalSkills = clamp(skillsScore);
  const finalExp = clamp(expScore);
  const finalEdu = clamp(eduScore);
  const finalFormat = clamp(formatScore);
  const finalRead = clamp(readScore);

  const overall = Math.round(
    finalAts * 0.25 +
      finalContent * 0.25 +
      finalSkills * 0.2 +
      finalExp * 0.15 +
      finalEdu * 0.05 +
      finalFormat * 0.05 +
      finalRead * 0.05
  );

  return {
    overallScore: overall,
    scores: {
      atsScore: finalAts,
      contentQuality: finalContent,
      skillsScore: finalSkills,
      experienceScore: finalExp,
      educationScore: finalEdu,
      formattingScore: finalFormat,
      readabilityScore: finalRead,
    },
    breakdown: {
      atsFeedback:
        finalAts >= 80
          ? "Strong ATS compatibility. Standard section headings and clear contact details will parse cleanly."
          : "ATS scoring can be improved by adding more targeted industry keywords and completing all contact fields.",
      contentFeedback:
        finalContent >= 80
          ? "Well-structured content with clear progression and professional tone."
          : "Enhance descriptions with quantifiable metrics and active verbs to increase recruiter engagement.",
      skillsFeedback: `Identified ${cvData.skills?.length || 0} skills. Categorized skills present a clean visual overview.`,
      experienceFeedback:
        cvData.experience?.length > 0
          ? `Documented ${cvData.experience.length} work experience entries.`
          : "No work experience entries recorded.",
      formattingFeedback: "Clean layout, legible typography hierarchy, and consistent margins.",
    },
    recommendations,
  };
}

// 9. Comprehensive AI CV Analyzer
export const analyzeCVAI = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { cvData, cvId, targetRole } = req.body;

    if (!cvData) {
      return res.status(400).json({ success: false, message: "CV data is required for analysis." });
    }

    const heuristic = runHeuristicCVAnalysis(cvData);
    let finalAnalysis = { ...heuristic };

    try {
      const summaryText = cvData.summary || "";
      const skillsArr = (cvData.skills || []).map((s: any) => s.name || s).join(", ");
      const expArr = (cvData.experience || [])
        .map((e: any) => `${e.jobTitle} at ${e.company}: ${e.description}`)
        .join("\n");

      const prompt = `
Analyze this resume for a ${targetRole || cvData.personalInfo?.professionalTitle || "technology professional"}:

Summary: ${summaryText}
Skills: ${skillsArr}
Experience:
${expArr}

Provide:
1. Overall Score out of 100
2. ATS Score out of 100
3. Content Quality Score out of 100
4. 2-4 concrete, actionable improvement recommendations with:
   - section (summary, experience, skills, or general)
   - issue title
   - suggestedText (concrete revised sample wording)
   - explanation

Format strictly as JSON:
{
  "overallScore": 82,
  "atsScore": 85,
  "contentQuality": 80,
  "recommendations": [
    {
      "id": "rec_ai_1",
      "section": "experience",
      "type": "action_verb",
      "issue": "Replace passive language with strong action verbs",
      "originalText": "worked on backend",
      "suggestedText": "Architected high-throughput REST APIs using Node.js and TypeScript",
      "explanation": "Active phrasing immediately showcases technical ownership and impact."
    }
  ]
}
`;

      const completion = await openai.chat.completions.create({
        model: "google/gemma-4-26b-a4b-it:free",
        messages: [
          { role: "system", content: "You are a senior technical recruiter and ATS specialist. Return strictly valid JSON." },
          { role: "user", content: prompt },
        ],
        max_tokens: 700,
        temperature: 0.4,
      });

      const raw = completion.choices[0]?.message?.content?.trim() || "";
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.overallScore) {
          finalAnalysis.overallScore = Math.round((heuristic.overallScore + parsed.overallScore) / 2);
        }
        if (Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0) {
          finalAnalysis.recommendations = [
            ...parsed.recommendations.map((r: any, idx: number) => ({
              id: r.id || `ai_rec_${idx}`,
              section: r.section || "experience",
              type: r.type || "improvement",
              issue: r.issue || "Improvement suggestion",
              originalText: r.originalText || "",
              suggestedText: r.suggestedText || "",
              explanation: r.explanation || "",
              applied: false,
            })),
            ...heuristic.recommendations.filter(
              (hr) => !parsed.recommendations.some((pr: any) => pr.issue?.toLowerCase() === hr.issue?.toLowerCase())
            ),
          ];
        }
      }
    } catch (aiErr) {
      console.warn("AI analysis augmentation fallback:", aiErr);
    }

    // Save analysis in database if user is logged in
    const userId = req.id;
    if (userId && cvId && mongoose.Types.ObjectId.isValid(cvId)) {
      await CVAnalysis.create({
        cvId: new mongoose.Types.ObjectId(cvId),
        userId: new mongoose.Types.ObjectId(userId),
        overallScore: finalAnalysis.overallScore,
        scores: finalAnalysis.scores,
        breakdown: finalAnalysis.breakdown,
        recommendations: finalAnalysis.recommendations,
        targetRole,
      });
    }

    return res.status(200).json({
      success: true,
      analysis: finalAnalysis,
    });
  } catch (error) {
    console.error("analyzeCVAI error:", error);
    return res.status(500).json({ success: false, message: "Failed to analyze CV." });
  }
};

// 10. Job Description Matcher AI
export const matchJobDescriptionAI = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { cvData, jobDescription, targetRole } = req.body;

    if (!cvData || !jobDescription || typeof jobDescription !== "string") {
      return res.status(400).json({
        success: false,
        message: "CV data and a valid job description are required.",
      });
    }

    const cvSkills = (cvData.skills || []).map((s: any) => (typeof s === "string" ? s : s.name).toLowerCase());
    const cvText = JSON.stringify(cvData).toLowerCase();

    // Common technical and functional keywords list for comparison
    const matchedSkills: string[] = [];
    const potentialSkills = [
      "react", "node.js", "typescript", "javascript", "python", "mongodb", "postgresql", "sql",
      "aws", "docker", "kubernetes", "git", "ci/cd", "rest", "graphql", "tailwind", "next.js",
      "express", "microservices", "redis", "linux", "html", "css", "agile", "scrum", "jest",
      "pytorch", "machine learning", "ai", "figma", "ui/ux", "devops", "leadership", "communication"
    ];

    potentialSkills.forEach((skill) => {
      if (jobDescription.toLowerCase().includes(skill)) {
        if (cvText.includes(skill) || cvSkills.some((s: string) => s.includes(skill))) {
          matchedSkills.push(skill.toUpperCase());
        }
      }
    });

    const missingSkills: string[] = [];
    potentialSkills.forEach((skill) => {
      if (jobDescription.toLowerCase().includes(skill) && !matchedSkills.includes(skill.toUpperCase())) {
        missingSkills.push(skill.toUpperCase());
      }
    });

    let matchPercentage = Math.round(
      matchedSkills.length + missingSkills.length > 0
        ? (matchedSkills.length / (matchedSkills.length + missingSkills.length)) * 100
        : 75
    );
    matchPercentage = Math.max(45, Math.min(95, matchPercentage));

    const tailoredAdvice = [
      missingSkills.length > 0
        ? `Incorporate missing keywords like ${missingSkills.slice(0, 3).join(", ")} into your skills and project descriptions if you have experience with them.`
        : "Excellent keyword alignment with this job description.",
      "Tailor your Professional Summary to explicitly mention the primary title and requirements of this role.",
      "Highlight metrics in your work experience that mirror the company's core challenges.",
    ];

    try {
      const prompt = `
Compare this candidate's resume with the job description.

Target Role: ${targetRole || "Specified Position"}
Candidate Summary: ${cvData.summary || ""}
Candidate Skills: ${cvSkills.join(", ")}

Job Description:
${jobDescription.substring(0, 1500)}

Output JSON:
{
  "matchPercentage": 85,
  "matchedSkills": ["REACT", "NODE.JS", "TYPESCRIPT"],
  "missingSkills": ["DOCKER", "REDIS"],
  "roleSuitability": "Strong candidate match for frontend and full-stack responsibilities.",
  "tailoredAdvice": [
    "Emphasize experience building scalable distributed APIs.",
    "Add Docker containerization projects to your project list."
  ]
}
`;

      const completion = await openai.chat.completions.create({
        model: "google/gemma-4-26b-a4b-it:free",
        messages: [
          { role: "system", content: "You are an ATS parser and recruitment matching engine. Output strictly valid JSON." },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.3,
      });

      const raw = completion.choices[0]?.message?.content?.trim() || "";
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return res.status(200).json({
          success: true,
          jobMatch: {
            matchPercentage: parsed.matchPercentage || matchPercentage,
            matchedSkills: parsed.matchedSkills || matchedSkills,
            missingSkills: parsed.missingSkills || missingSkills,
            roleSuitability: parsed.roleSuitability || "Compatible skillset matching the primary job specifications.",
            tailoredAdvice: parsed.tailoredAdvice || tailoredAdvice,
          },
        });
      }
    } catch (aiErr) {
      console.warn("AI job match fallback:", aiErr);
    }

    return res.status(200).json({
      success: true,
      jobMatch: {
        matchPercentage,
        matchedSkills,
        missingSkills,
        roleSuitability:
          matchPercentage >= 75
            ? "Strong match with primary requirements of this job description."
            : "Moderate match with relevant transferrable foundations.",
        tailoredAdvice,
      },
    });
  } catch (error) {
    console.error("matchJobDescriptionAI error:", error);
    return res.status(500).json({ success: false, message: "Failed to match job description." });
  }
};
