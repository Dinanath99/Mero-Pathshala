import React from "react";
import { BookOpen, Video, Image, ShieldCheck, CheckCircle2, Lightbulb, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const InstructorResources = () => {
  const resourceSections = [
    {
      icon: BookOpen,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40",
      title: "Teaching Guidelines & Curriculum Structure",
      items: [
        "Structure courses into 10-15 minute bite-sized lessons for maximum retention.",
        "Include hands-on coding exercises or prompt engineering assignments after every module.",
        "Maintain bilingual clarity (English technical terms + clear Nepali explanations).",
        "Provide downloadable cheat sheets, PDF guides, and GitHub code repositories.",
      ],
    },
    {
      icon: Video,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40",
      title: "Video Recording & Audio Setup Tips",
      items: [
        "Record at 1080p Full HD resolution at 30fps or 60fps.",
        "Use a crisp external microphone (USB condenser or lavalier mic) to avoid echo.",
        "Ensure clear screen resolution scaling (125% zoom for code editor visibility).",
        "Keep background noise minimal and maintain an energetic teaching tone.",
      ],
    },
    {
      icon: Image,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40",
      title: "Thumbnail & Branding Standards",
      items: [
        "Use high-contrast 16:9 ratio thumbnails (1280x720 pixels).",
        "Feature bold text titles with 3-5 key words maximum.",
        "Include AI Guru Nepal brand badges or official technology logos (Python, PyTorch, OpenAI).",
        "Avoid clutter; maintain clean, modern medical-grade UI aesthetics.",
      ],
    },
    {
      icon: ShieldCheck,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
      title: "Platform Policies & Integrity",
      items: [
        "All course materials must be original content or properly cited open-source code.",
        "Do not share private API keys, credentials, or sensitive student data in recorded videos.",
        "Respond to student queries and discussion forums within 48 hours.",
        "Maintain professional, respectful, and inclusive teaching standards.",
      ],
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div>
        <Badge className="bg-orange-500/10 text-orange-600 border-orange-200">Educator Knowledge Base</Badge>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2 mt-2">
          <Lightbulb className="text-amber-500" /> Instructor Resources & Best Practices
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Everything you need to plan, record, publish, and market world-class AI courses in Nepal.
        </p>
      </div>

      <div className="grid gap-6">
        {resourceSections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${sec.color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{sec.title}</h3>
              </div>

              <ul className="space-y-3 pt-2">
                {sec.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InstructorResources;
