import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Play, Circle, ChevronLeft, BookOpen, Layers, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export interface SidebarLessonItem {
  id: number;
  slug: string;
  lessonNumber: number;
  titleEn: string;
  titleNe?: string;
  duration?: string;
}

interface ModuleSidebarProps {
  moduleNumber: number;
  moduleTitleEn: string;
  moduleTitleNe?: string;
  lessons: SidebarLessonItem[];
  currentLessonSlug: string;
  completedLessonKeys: string[];
  moduleKeyPrefix: string; // e.g. "mod3" or "mod2" or "mod1"
  onSelectLesson?: (slug: string) => void;
}

export const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
  moduleNumber,
  moduleTitleEn,
  moduleTitleNe,
  lessons,
  currentLessonSlug,
  completedLessonKeys,
  moduleKeyPrefix,
  onSelectLesson
}) => {
  const navigate = useNavigate();

  const totalLessons = lessons.length;
  const completedCount = lessons.filter(l =>
    completedLessonKeys.includes(`${moduleKeyPrefix}-${l.id}`)
  ).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleLessonClick = (slug: string) => {
    if (onSelectLesson) {
      onSelectLesson(slug);
    } else {
      navigate(`/learn/computer-skills/${slug}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#070e1e] border-r border-gray-200 dark:border-slate-800 text-gray-900 dark:text-gray-100">
      
      {/* Module Title Header */}
      <div className="p-5 border-b border-gray-200 dark:border-slate-800 space-y-3 shrink-0">
        <Link
          to="/learn/computer-skills"
          className="inline-flex items-center text-xs font-extrabold text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors gap-1 uppercase tracking-wider"
        >
          <ChevronLeft size={14} />
          <span>All Modules (सबै मोड्युल)</span>
        </Link>

        <div className="space-y-1">
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-[11px] font-black tracking-wider uppercase px-2 py-0.5">
            Module {moduleNumber}
          </Badge>
          <h2 className="text-lg font-black text-gray-900 dark:text-white leading-tight tracking-tight">
            {moduleTitleEn}
          </h2>
          {moduleTitleNe && (
            <p className="text-xs font-bold text-orange-600 dark:text-orange-400 font-nepali">
              {moduleTitleNe}
            </p>
          )}
        </div>

        {/* Compact Progress Widget */}
        <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-gray-600 dark:text-gray-400 uppercase tracking-wide text-[10px]">Your Progress</span>
            <span className="text-orange-600 dark:text-orange-400">{progressPercent}%</span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-orange-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 pt-0.5 font-medium">
            <span>{completedCount} of {totalLessons} completed</span>
            {progressPercent === 100 && (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                <Award size={12} /> Certified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Lesson List Items */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
        <div className="px-2 py-1.5 text-[11px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Module Lessons ({totalLessons})
        </div>

        {lessons.map((lesson) => {
          const paddedNum = lesson.lessonNumber < 10 ? `0${lesson.lessonNumber}` : `${lesson.lessonNumber}`;
          const isCurrent = lesson.slug === currentLessonSlug || `${moduleKeyPrefix}-${lesson.id}` === currentLessonSlug;
          const isDone = completedLessonKeys.includes(`${moduleKeyPrefix}-${lesson.id}`);

          return (
            <button
              key={lesson.id}
              onClick={() => handleLessonClick(lesson.slug)}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 group relative ${
                isCurrent
                  ? "bg-orange-50 dark:bg-orange-950/40 border border-orange-500/30 text-orange-950 dark:text-orange-200 shadow-2xs font-bold"
                  : "hover:bg-gray-100 dark:hover:bg-slate-800/70 text-gray-700 dark:text-gray-300 border border-transparent font-medium"
              }`}
            >
              {/* Active Indicator Bar */}
              {isCurrent && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-orange-500 rounded-r-md" />
              )}

              {/* Status Indicator Icon */}
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 size={18} className="text-emerald-500 dark:text-emerald-400" />
                ) : isCurrent ? (
                  <div className="w-[18px] h-[18px] rounded-full bg-orange-500 text-white flex items-center justify-center">
                    <Play size={10} className="ml-0.5 fill-white" />
                  </div>
                ) : (
                  <Circle size={18} className="text-gray-300 dark:text-slate-700 group-hover:text-gray-400" />
                )}
              </div>

              {/* Lesson Info */}
              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-black tracking-wider ${isCurrent ? "text-orange-600 dark:text-orange-400" : "text-gray-400 dark:text-gray-500"}`}>
                    {paddedNum}
                  </span>
                  <h4 className={`text-[15px] sm:text-[16px] leading-snug truncate ${
                    isCurrent ? "font-black text-gray-900 dark:text-white" : "font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"
                  }`}>
                    {lesson.titleEn}
                  </h4>
                </div>

                {lesson.titleNe && (
                  <p className={`text-xs font-nepali truncate leading-normal ${
                    isCurrent ? "text-orange-700 dark:text-orange-300 font-bold" : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {lesson.titleNe}
                  </p>
                )}

                {lesson.duration && (
                  <span className="inline-block text-[10px] text-gray-400 dark:text-gray-500 font-semibold pt-0.5">
                    {lesson.duration}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer Link */}
      <div className="p-3 border-t border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 shrink-0">
        <Link
          to="/learn/computer-skills"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-extrabold text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          <Layers size={14} />
          <span>Explore All 3 Modules</span>
        </Link>
      </div>
    </div>
  );
};
