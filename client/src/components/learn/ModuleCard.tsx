import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Monitor, 
  Settings, 
  Folder, 
  Globe, 
  FileText, 
  Cloud, 
  MessageSquare, 
  Shield, 
  Wrench, 
  Sparkles, 
  Bot, 
  Code2,
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurriculumModule } from "@/pages/learn/curriculumData";
import { getModuleAccent, AccentTheme } from "@/theme/accentColors";

interface ModuleCardProps {
  module: CurriculumModule;
  completedLessonKeys: string[];
  moduleKeyPrefix: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  completedLessonKeys,
  moduleKeyPrefix
}) => {
  const navigate = useNavigate();
  const accent: AccentTheme = getModuleAccent(module.id, module.accentColor || "blue");

  // Professional SVG Icon mapping
  const renderIcon = () => {
    const size = 26;
    switch (module.iconName) {
      case "Monitor": return <Monitor size={size} />;
      case "Settings": return <Settings size={size} />;
      case "Folder": return <Folder size={size} />;
      case "Globe": return <Globe size={size} />;
      case "FileText": return <FileText size={size} />;
      case "Cloud": return <Cloud size={size} />;
      case "MessageSquare": return <MessageSquare size={size} />;
      case "Shield": return <Shield size={size} />;
      case "Wrench": return <Wrench size={size} />;
      case "Sparkles": return <Sparkles size={size} />;
      case "Bot": return <Bot size={size} />;
      case "Code2": return <Code2 size={size} />;
      default: return <BookOpen size={size} />;
    }
  };

  const totalLessons = module.lessons.length;
  const completedCount = module.lessons.filter(l =>
    completedLessonKeys.includes(`${moduleKeyPrefix}-${l.id}`)
  ).length;

  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isCompleted = progressPercent === 100 && totalLessons > 0;
  const isInProgress = completedCount > 0 && !isCompleted;
  const isAvailable = module.status === "available";

  const handleCardClick = () => {
    navigate(`/learn/computer-skills/module/${module.id}`);
  };

  const paddedModNum = module.moduleNumber < 10 ? `0${module.moduleNumber}` : `${module.moduleNumber}`;

  return (
    <article
      onClick={handleCardClick}
      className={`group relative rounded-3xl border border-gray-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between ${accent.hoverBorder} ${accent.hoverBg}`}
    >
      {/* 1. TOP CARD ACCENT LINE (3-4px) */}
      <div className={`h-1 w-full ${accent.topLine} transition-all duration-300 group-hover:h-1.5`} />

      <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-5">
          
          {/* 2. MODULE ICON + NUMBER & STATUS */}
          <div className="flex items-start justify-between gap-4">
            
            {/* Animated Multi-Accent Icon Box */}
            <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center shrink-0 transition-all duration-300 shadow-2xs ${accent.iconContainer} ${accent.iconContainerHover}`}>
              {renderIcon()}
            </div>

            <div className="text-right space-y-0.5">
              <span className={`text-[12px] sm:text-[13px] font-black uppercase tracking-wider block transition-colors ${accent.text}`}>
                MODULE {paddedModNum}
              </span>
              <div className="text-xs font-bold">
                {isCompleted ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-1 font-bold">
                    <CheckCircle2 size={13} /> Completed
                  </span>
                ) : isInProgress ? (
                  <span className={`font-bold ${accent.text}`}>
                    ● In Progress • {progressPercent}%
                  </span>
                ) : !isAvailable ? (
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">
                    Roadmap • Phase 2
                  </span>
                ) : (
                  <span className="text-gray-400 dark:text-gray-500 font-medium">
                    ○ Not Started • 0%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 3. MODULE TITLES */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-[27px] font-black text-gray-900 dark:text-white tracking-tight leading-tight group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {module.titleEn}
            </h2>
            <h3 className={`text-lg sm:text-[19px] font-bold font-nepali leading-snug transition-colors ${accent.textSubtle}`}>
              {module.titleNe}
            </h3>
          </div>

          {/* 4. BILINGUAL DESCRIPTIONS */}
          <div className="space-y-2 text-educational-body">
            <p className="text-sm sm:text-[15px] text-gray-700 dark:text-gray-300 font-medium leading-relaxed line-clamp-3">
              {module.descriptionEn}
            </p>
            <p className="text-sm sm:text-[15px] text-gray-500 dark:text-gray-400 font-nepali font-medium leading-relaxed line-clamp-2">
              {module.descriptionNe}
            </p>
          </div>

          {/* 5. MODULE METADATA */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 pt-1">
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} className={accent.text} /> {totalLessons} Lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Layers size={14} className={accent.text} /> {module.level}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className={accent.text} /> {module.estimatedHours}
            </span>
          </div>

        </div>

        {/* 6. PROGRESS BAR & MULTI-ACCENT CTA */}
        <div className="space-y-4 pt-5 mt-4 border-t border-gray-100 dark:border-slate-800/80">
          {isAvailable && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-gray-600 dark:text-gray-400">
                <span>{completedCount} of {totalLessons} completed</span>
                <span className={`font-black ${accent.text}`}>{progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`${accent.progressFill} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          <div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className={`w-full rounded-2xl font-extrabold text-sm py-5 shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                isCompleted
                  ? "bg-slate-100 hover:bg-slate-200 text-gray-900 dark:bg-slate-800 dark:text-gray-100 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                  : isAvailable
                  ? `bg-gray-900 text-white dark:bg-slate-800 dark:text-white ${accent.buttonHoverFromNeutral}`
                  : "bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-gray-500"
              }`}
            >
              {isCompleted ? (
                <>
                  <span>Review Module</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              ) : isInProgress ? (
                <>
                  <span>Continue Learning</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              ) : isAvailable ? (
                <>
                  <span>View Module</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              ) : (
                <span>Roadmap Preview</span>
              )}
            </Button>
          </div>
        </div>

      </div>
    </article>
  );
};
