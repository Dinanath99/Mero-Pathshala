import React from "react";
import { ChevronRight, Layers, CheckCircle2 } from "lucide-react";
import { curriculumStages } from "@/pages/learn/curriculumData";

interface LearningJourneyBarProps {
  activeStageIndex?: number;
}

export const LearningJourneyBar: React.FC<LearningJourneyBarProps> = ({
  activeStageIndex = 0
}) => {
  return (
    <div className="space-y-3 py-4">
      <div className="flex items-center gap-2">
        <Layers size={16} className="text-orange-500" />
        <span className="text-xs font-black tracking-widest uppercase text-gray-500 dark:text-gray-400">
          Your Learning Journey (सिकाइ मार्गचित्र)
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {curriculumStages.map((stg, i) => {
          const isActive = i === activeStageIndex;
          const isDone = i < activeStageIndex;

          return (
            <div
              key={stg.id}
              className={`p-3 rounded-2xl border transition-all ${
                isActive
                  ? "border-orange-500 bg-orange-50/60 dark:bg-orange-950/30 text-gray-900 dark:text-white shadow-2xs"
                  : isDone
                  ? "border-emerald-500/40 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300"
                  : "border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 text-gray-500 dark:text-gray-400"
              }`}
            >
              <div className="flex items-center justify-between gap-1 pb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  Stage 0{stg.stageNumber}
                </span>
                {isDone && <CheckCircle2 size={13} className="text-emerald-500" />}
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm tracking-tight leading-snug line-clamp-1">
                {stg.titleEn}
              </h4>
              <p className="text-[11px] font-nepali text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {stg.titleNe.split(" ")[0]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
