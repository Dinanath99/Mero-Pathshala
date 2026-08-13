import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, Globe, Sparkles, BookOpen } from "lucide-react";

interface LessonHeaderProps {
  moduleNumber: number;
  lessonNumber: number;
  totalInModule: number;
  titleEn: string;
  titleNe: string;
  summaryEn?: string;
  summaryNe?: string;
  duration?: string;
  level?: string;
  isCompleted?: boolean;
  languageMode: "both" | "en" | "ne";
  onLanguageChange: (mode: "both" | "en" | "ne") => void;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  moduleNumber,
  lessonNumber,
  totalInModule,
  titleEn,
  titleNe,
  summaryEn,
  summaryNe,
  duration = "10 min",
  level = "Beginner",
  isCompleted = false,
  languageMode,
  onLanguageChange
}) => {
  const paddedLesson = lessonNumber < 10 ? `0${lessonNumber}` : `${lessonNumber}`;

  return (
    <header className="space-y-6 pb-6 border-b border-gray-200 dark:border-slate-800">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-orange-500 text-white font-extrabold text-xs px-3 py-1 rounded-lg tracking-wide uppercase shadow-2xs">
            Module {moduleNumber} • Lesson {paddedLesson}
          </Badge>
          <Badge variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-700 text-xs font-semibold py-1 px-2.5">
            <Clock size={12} className="mr-1 inline text-orange-500" /> {duration} read
          </Badge>
          <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs font-semibold py-1 px-2.5">
            {level}
          </Badge>
        </div>

        {/* Completion status & Language Selector */}
        <div className="flex items-center gap-3">
          {isCompleted && (
            <Badge className="bg-emerald-600 text-white font-bold text-xs py-1 px-3 rounded-full flex items-center gap-1 shadow-2xs">
              <CheckCircle2 size={13} className="text-white" />
              <span>Completed</span>
            </Badge>
          )}

          {/* Bilingual Language Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => onLanguageChange("both")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                languageMode === "both"
                  ? "bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-2xs font-extrabold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              title="Show both English and Nepali content"
            >
              🌐 Both (दुवै)
            </button>
            <button
              onClick={() => onLanguageChange("en")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                languageMode === "en"
                  ? "bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-2xs font-extrabold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              title="Show English content only"
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange("ne")}
              className={`px-2.5 py-1 rounded-lg font-nepali transition-all ${
                languageMode === "ne"
                  ? "bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-2xs font-extrabold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              title="Show Nepali content only"
            >
              नेपाली
            </button>
          </div>
        </div>
      </div>

      {/* Main Title Hierarchy */}
      <div className="space-y-2">
        {(languageMode === "both" || languageMode === "en") && (
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            {titleEn}
          </h1>
        )}

        {(languageMode === "both" || languageMode === "ne") && titleNe && (
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600 dark:text-orange-400 font-nepali tracking-normal leading-snug">
            {titleNe}
          </h2>
        )}
      </div>

      {/* Short Introduction Paragraph */}
      {(summaryEn || summaryNe) && (
        <div className="space-y-2 pt-1 text-educational-lead">
          {(languageMode === "both" || languageMode === "en") && summaryEn && (
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {summaryEn}
            </p>
          )}
          {(languageMode === "both" || languageMode === "ne") && summaryNe && (
            <p className="text-gray-700 dark:text-gray-300 font-nepali leading-relaxed text-base sm:text-lg">
              {summaryNe}
            </p>
          )}
        </div>
      )}
    </header>
  );
};
