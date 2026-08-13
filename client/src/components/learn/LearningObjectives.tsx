import React from "react";
import { CheckCircle2, Target } from "lucide-react";

export interface ObjectiveItem {
  en: string;
  ne?: string;
}

interface LearningObjectivesProps {
  objectives: ObjectiveItem[];
  languageMode?: "both" | "en" | "ne";
}

export const LearningObjectives: React.FC<LearningObjectivesProps> = ({
  objectives,
  languageMode = "both"
}) => {
  if (!objectives || objectives.length === 0) return null;

  const showEn = languageMode === "both" || languageMode === "en";
  const showNe = languageMode === "both" || languageMode === "ne";

  return (
    <div id="learning-objectives" className="rounded-2xl border border-orange-500/30 bg-orange-50/50 dark:bg-orange-950/20 p-6 sm:p-7 shadow-xs my-6 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-orange-500 text-white shadow-xs">
          <Target size={18} />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">
            Learning Objectives
          </h3>
          {showNe && (
            <p className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400 font-nepali">
              यो पाठ पूरा गरेपछि तपाईं निम्न कुराहरू जान्न सक्षम हुनुहुनेछ:
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {objectives.map((obj, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-orange-200/70 dark:border-slate-800 shadow-2xs transition-all hover:border-orange-300 dark:hover:border-slate-700"
          >
            <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1 min-w-0">
              {showEn && (
                <p className="font-bold text-[15px] sm:text-base text-gray-900 dark:text-gray-100 leading-snug">
                  {obj.en}
                </p>
              )}
              {showNe && obj.ne && (
                <p className="text-sm sm:text-[15px] text-gray-600 dark:text-gray-300 font-nepali leading-snug">
                  {obj.ne}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
