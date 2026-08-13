import React from "react";
import { CurriculumStage, CurriculumModule } from "@/pages/learn/curriculumData";
import { CurriculumModuleBlock } from "./CurriculumModuleBlock";

interface CurriculumStageSectionProps {
  stage: CurriculumStage;
  modules: CurriculumModule[];
  completedLessonKeys: string[];
  activeModuleId?: string;
}

export const CurriculumStageSection: React.FC<CurriculumStageSectionProps> = ({
  stage,
  modules,
  completedLessonKeys,
  activeModuleId
}) => {
  const stageModules = modules.filter(m => stage.moduleIds.includes(m.id));

  if (stageModules.length === 0) return null;

  const paddedStage = stage.stageNumber < 10 ? `0${stage.stageNumber}` : `${stage.stageNumber}`;

  return (
    <section className="space-y-6 pt-12 first:pt-4 border-t-2 border-orange-500/20 dark:border-orange-500/15 first:border-t-0">
      
      {/* STAGE HEADER */}
      <div className="space-y-2 pb-4 border-b-2 border-gray-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black tracking-widest text-orange-600 dark:text-orange-400 uppercase">
            STAGE {paddedStage}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
            {stageModules.length} Modules
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            {stage.titleEn}
          </h2>
          <h3 className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400 font-nepali">
            {stage.titleNe}
          </h3>
        </div>

        <div className="space-y-1 pt-1 max-w-3xl text-sm sm:text-base text-gray-600 dark:text-gray-300">
          <p className="font-medium leading-relaxed">
            {stage.descriptionEn}
          </p>
          <p className="font-nepali leading-relaxed text-gray-500 dark:text-gray-400 text-sm sm:text-[15px]">
            {stage.descriptionNe}
          </p>
        </div>
      </div>

      {/* MODULES LIST IN THIS STAGE */}
      <div className="space-y-2">
        {stageModules.map((module) => {
          const isUserActiveInThisModule = activeModuleId === module.id;
          const isFirstModule = module.id === "mod1";

          return (
            <CurriculumModuleBlock
              key={module.id}
              module={module}
              completedLessonKeys={completedLessonKeys}
              moduleKeyPrefix={module.id}
              defaultExpanded={isUserActiveInThisModule || isFirstModule}
            />
          );
        })}
      </div>

    </section>
  );
};
