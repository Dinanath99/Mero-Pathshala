import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ArrowRight, Sparkles, BookOpen, Monitor, Folder, Settings, Award } from "lucide-react";
import { allCurriculumModules } from "@/pages/learn/curriculumData";

interface ContinueLearningBannerProps {
  completedLessonKeys: string[];
  totalAllLessons: number;
}

export const ContinueLearningBanner: React.FC<ContinueLearningBannerProps> = ({
  completedLessonKeys,
  totalAllLessons
}) => {
  const navigate = useNavigate();
  const completedCount = completedLessonKeys.length;
  const isNewUser = completedCount === 0;

  if (isNewUser) {
    const mod1 = allCurriculumModules.find(m => m.id === "mod1") || allCurriculumModules[0];
    const firstLesson = mod1.lessons[0];

    return (
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 border-2 border-orange-500/30 dark:border-orange-500/20 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-500 text-white font-black text-xs px-2.5 py-0.5 uppercase tracking-wide">
              Recommended Starting Point
            </Badge>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">100% Free & Open</span>
          </div>

          <div className="space-y-0.5">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Welcome to Computer Skills
            </h3>
            <p className="text-sm sm:text-base font-bold text-orange-600 dark:text-orange-400 font-nepali">
              कम्प्युटर सीप सिक्न स्वागत छ। शुरुवातबाट चरणबद्ध सिक्नुहोस्।
            </p>
          </div>

          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
            Start with <strong>Module 01: Computer Fundamentals</strong> to master how computers, CPUs, RAM, and hardware work.
          </p>
        </div>

        <Button
          onClick={() => navigate(`/learn/computer-skills/${firstLesson.slug}`)}
          className="rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base py-6 px-8 shadow-md flex items-center gap-2 shrink-0 w-full sm:w-auto justify-center"
        >
          <Play size={18} className="fill-white" />
          <span>Start Learning Now →</span>
        </Button>
      </div>
    );
  }

  // Find user's active module (first module with uncompleted lessons)
  let activeModule = allCurriculumModules.find(m => {
    if (m.status !== "available") return false;
    const modCompleted = m.lessons.filter(l => completedLessonKeys.includes(`${m.id}-${l.id}`)).length;
    return modCompleted < m.lessons.length;
  }) || allCurriculumModules[0];

  const modTotal = activeModule.lessons.length;
  const modCompletedCount = activeModule.lessons.filter(l => completedLessonKeys.includes(`${activeModule.id}-${l.id}`)).length;
  const nextLesson = activeModule.lessons.find(l => !completedLessonKeys.includes(`${activeModule.id}-${l.id}`)) || activeModule.lessons[0];

  const overallPercent = Math.round((completedCount / totalAllLessons) * 100);

  return (
    <div className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border-2 border-orange-500/40 dark:border-orange-500/30 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="space-y-3 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 flex items-center gap-1">
            <Sparkles size={14} /> Continue Learning (पढाइ जारी राख्नुहोस्)
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
            {completedCount} of {totalAllLessons} total lessons completed ({overallPercent}%)
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase">
              Module 0{activeModule.moduleNumber} •
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight truncate">
              {activeModule.titleEn}
            </h3>
          </div>

          <p className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span className="text-orange-600 dark:text-orange-400">Next Up:</span>
            <span>Lesson 0{nextLesson.lessonNumber} — {nextLesson.titleEn}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 max-w-md pt-1">
          <div className="w-full bg-gray-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.round((modCompletedCount / modTotal) * 100)}%` }}
            />
          </div>
          <span className="text-xs font-bold text-gray-500 shrink-0">
            {modCompletedCount}/{modTotal} in Module
          </span>
        </div>
      </div>

      <Button
        onClick={() => navigate(`/learn/computer-skills/${nextLesson.slug}`)}
        className="rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base py-6 px-8 shadow-md flex items-center gap-2 shrink-0 w-full md:w-auto justify-center"
      >
        <span>Continue →</span>
      </Button>
    </div>
  );
};
