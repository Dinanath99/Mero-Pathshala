import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BookOpen, GraduationCap } from "lucide-react";

interface NextLessonCardProps {
  nextLessonNumber?: number;
  nextTitleEn?: string;
  nextTitleNe?: string;
  nextSummaryEn?: string;
  onContinue: () => void;
  isLastLesson?: boolean;
}

export const NextLessonCard: React.FC<NextLessonCardProps> = ({
  nextLessonNumber,
  nextTitleEn,
  nextTitleNe,
  nextSummaryEn,
  onContinue,
  isLastLesson = false
}) => {
  if (isLastLesson) {
    return (
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950 text-white border border-slate-800 shadow-xl my-10 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-orange-500 text-white shadow-2xs">
            <GraduationCap size={20} />
          </div>
          <span className="text-xs font-black tracking-widest text-orange-300 uppercase">
            Module Final Assessment & Review
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            You are at the final lesson of this module!
          </h3>
          <p className="text-sm sm:text-base text-slate-300 font-nepali">
            तपाईंले यस मोड्युलका सबै पाठहरू अध्ययन गरिसक्नुभयो। अब अन्तिम मूल्याङ्कन पूरा गरी प्रमाणपत्र प्राप्त गर्नुहोस्।
          </p>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          Complete the comprehensive final assessment quiz and flashcards above to earn your official certificate badge.
        </p>

        <div className="pt-2">
          <Button
            onClick={onContinue}
            className="rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm py-6 px-8 shadow-md flex items-center gap-2"
          >
            <span>Finish Module & View Certificate</span>
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    );
  }

  if (!nextTitleEn) return null;

  const paddedNext = nextLessonNumber ? (nextLessonNumber < 10 ? `0${nextLessonNumber}` : `${nextLessonNumber}`) : "";

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm my-10 space-y-4 transition-all hover:border-orange-300 dark:hover:border-orange-500/40">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black tracking-wider text-orange-600 dark:text-orange-400 uppercase flex items-center gap-1.5">
          <Sparkles size={14} /> Up Next • Lesson {paddedNext}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
          Ready for the next concept?
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
          {nextTitleEn}
        </h3>
        {nextTitleNe && (
          <p className="text-sm sm:text-base font-bold text-orange-600 dark:text-orange-400 font-nepali">
            {nextTitleNe}
          </p>
        )}
      </div>

      {nextSummaryEn && (
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
          {nextSummaryEn}
        </p>
      )}

      <div className="pt-2">
        <Button
          onClick={onContinue}
          className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm py-5 px-7 shadow-xs flex items-center gap-2"
        >
          <span>Continue to Lesson {paddedNext}</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};
