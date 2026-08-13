import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Award, Home } from "lucide-react";

interface LessonNavigationProps {
  prevLessonSlug?: string | null;
  prevLessonTitle?: string | null;
  nextLessonSlug?: string | null;
  nextLessonTitle?: string | null;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
  isFirstLesson?: boolean;
  isLastLesson?: boolean;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  prevLessonSlug,
  prevLessonTitle,
  nextLessonSlug,
  nextLessonTitle,
  onNavigatePrev,
  onNavigateNext,
  isFirstLesson = false,
  isLastLesson = false
}) => {
  return (
    <div className="pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {/* Previous Button */}
      <Button
        onClick={onNavigatePrev}
        variant="outline"
        className="rounded-2xl font-bold text-xs sm:text-sm min-h-[56px] px-6 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200 flex items-center justify-start gap-3 text-left shadow-2xs group flex-1 max-w-sm"
      >
        <ChevronLeft size={20} className="text-gray-500 group-hover:-translate-x-0.5 transition-transform shrink-0" />
        <div className="min-w-0">
          <span className="text-[11px] text-gray-400 dark:text-gray-500 block uppercase font-black">
            {isFirstLesson ? "Module Hub" : "Previous Lesson"}
          </span>
          <span className="truncate block font-bold text-gray-900 dark:text-white text-sm">
            {isFirstLesson ? "← Back to Modules Overview" : prevLessonTitle || "Previous"}
          </span>
        </div>
      </Button>

      {/* Next Button */}
      <Button
        onClick={onNavigateNext}
        className="rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm min-h-[56px] px-8 shadow-md flex items-center justify-end gap-3 text-right group flex-1 max-w-sm"
      >
        <div className="min-w-0">
          <span className="text-[11px] text-orange-200 block uppercase font-black">
            {isLastLesson ? "Assessment Complete" : "Next Lesson"}
          </span>
          <span className="truncate block font-black text-sm text-white">
            {isLastLesson ? "Complete Module & Get Badge 🎓" : nextLessonTitle || "Next Lesson"}
          </span>
        </div>
        {isLastLesson ? (
          <Award size={20} className="shrink-0 text-white" />
        ) : (
          <ChevronRight size={20} className="text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
        )}
      </Button>
    </div>
  );
};
