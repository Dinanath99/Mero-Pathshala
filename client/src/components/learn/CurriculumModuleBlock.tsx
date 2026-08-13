import React, { useState } from "react";
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
  Circle, 
  Play, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  Award,
  Layers,
  Sparkle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CurriculumModule } from "@/pages/learn/curriculumData";

interface CurriculumModuleBlockProps {
  module: CurriculumModule;
  completedLessonKeys: string[];
  moduleKeyPrefix: string;
  defaultExpanded?: boolean;
}

export const CurriculumModuleBlock: React.FC<CurriculumModuleBlockProps> = ({
  module,
  completedLessonKeys,
  moduleKeyPrefix,
  defaultExpanded = false
}) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  // Icon mapping
  const renderIcon = () => {
    const iconClass = "text-orange-600 dark:text-orange-400";
    const size = 26;
    switch (module.iconName) {
      case "Monitor":
        return <Monitor size={size} className={iconClass} />;
      case "Settings":
        return <Settings size={size} className={iconClass} />;
      case "Folder":
        return <Folder size={size} className={iconClass} />;
      case "Globe":
        return <Globe size={size} className={iconClass} />;
      case "FileText":
        return <FileText size={size} className={iconClass} />;
      case "Cloud":
        return <Cloud size={size} className={iconClass} />;
      case "MessageSquare":
        return <MessageSquare size={size} className={iconClass} />;
      case "Shield":
        return <Shield size={size} className={iconClass} />;
      case "Wrench":
        return <Wrench size={size} className={iconClass} />;
      case "Sparkles":
        return <Sparkles size={size} className={iconClass} />;
      case "Bot":
        return <Bot size={size} className={iconClass} />;
      case "Code2":
        return <Code2 size={size} className={iconClass} />;
      default:
        return <BookOpen size={size} className={iconClass} />;
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

  // Find next uncompleted lesson or first lesson
  const nextUncompleted = module.lessons.find(l => !completedLessonKeys.includes(`${moduleKeyPrefix}-${l.id}`)) || module.lessons[0];

  const handleActionClick = () => {
    if (!isAvailable) return;
    if (nextUncompleted) {
      navigate(`/learn/computer-skills/${nextUncompleted.slug}`);
    } else {
      navigate(`/learn/computer-skills/${module.primarySlug}`);
    }
  };

  const handleLessonRowClick = (slug: string, lessonAvailable: boolean) => {
    if (!lessonAvailable || !isAvailable) return;
    navigate(`/learn/computer-skills/${slug}`);
  };

  const paddedModNum = module.moduleNumber < 10 ? `0${module.moduleNumber}` : `${module.moduleNumber}`;

  return (
    <section className="space-y-6 pt-8 pb-10 border-b border-gray-200/90 dark:border-slate-800 last:border-b-0">
      
      {/* MODULE HEADER */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          
          <div className="flex items-start gap-4">
            {/* Icon Box */}
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/20 flex items-center justify-center shrink-0 shadow-2xs">
              {renderIcon()}
            </div>

            {/* Title & Badge */}
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
                  MODULE {paddedModNum}
                </span>
                {!isAvailable && (
                  <Badge variant="outline" className="text-[11px] font-bold text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700/60 bg-amber-50/50 dark:bg-amber-950/30">
                    Coming in Phase 2
                  </Badge>
                )}
                {isCompleted && (
                  <Badge className="bg-emerald-600 text-white text-[11px] font-extrabold flex items-center gap-1">
                    <CheckCircle2 size={12} /> Completed
                  </Badge>
                )}
                {isInProgress && (
                  <Badge className="bg-orange-500 text-white text-[11px] font-extrabold">
                    In Progress • {progressPercent}%
                  </Badge>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                {module.titleEn}
              </h2>

              <h3 className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400 font-nepali leading-snug">
                {module.titleNe}
              </h3>
            </div>
          </div>

          {/* Module Expand / Collapse Button */}
          <div className="sm:self-start">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-xl font-bold text-xs border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 shadow-2xs flex items-center gap-1.5"
            >
              <span>{isExpanded ? "Hide Lessons" : `View ${totalLessons} Lessons`}</span>
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </Button>
          </div>
        </div>

        {/* BILINGUAL INTRO PARAGRAPHS */}
        <div className="space-y-2 pt-1 max-w-4xl text-educational-body">
          <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
            {module.descriptionEn}
          </p>
          <p className="text-gray-600 dark:text-gray-300 font-nepali leading-relaxed text-base sm:text-lg">
            {module.descriptionNe}
          </p>
        </div>

        {/* METADATA & PROGRESS ROW */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-orange-500" /> {totalLessons} Lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Layers size={14} className="text-orange-500" /> {module.level}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-orange-500" /> {module.estimatedHours}
            </span>
          </div>

          {/* Module Level Progress Indicator */}
          {isAvailable && (
            <div className="flex items-center gap-3 min-w-[200px] text-xs font-bold">
              <span className="text-gray-500 dark:text-gray-400">
                {isCompleted ? "Completed" : isInProgress ? `${completedCount} of ${totalLessons} done` : "Not Started"}
              </span>
              <div className="w-24 bg-gray-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-orange-600 dark:text-orange-400 font-black">{progressPercent}%</span>
            </div>
          )}
        </div>
      </div>

      {/* LESSON LIST — CLEAN ROWS (NO CARDS!) */}
      {isExpanded && (
        <div className="space-y-1 pt-2 animate-in fade-in duration-200">
          <div className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 pb-2 px-3">
            Lessons ({totalLessons})
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-2xs divide-y divide-gray-100 dark:divide-slate-800/80">
            {module.lessons.map((lesson) => {
              const isLessonDone = completedLessonKeys.includes(`${moduleKeyPrefix}-${lesson.id}`);
              const isNextUp = !isLessonDone && lesson.id === nextUncompleted?.id && isAvailable;
              const paddedLesson = lesson.lessonNumber < 10 ? `0${lesson.lessonNumber}` : `${lesson.lessonNumber}`;

              return (
                <div
                  key={lesson.id}
                  onClick={() => handleLessonRowClick(lesson.slug, lesson.isAvailable)}
                  className={`p-4 sm:p-4.5 flex items-center justify-between gap-4 transition-colors group ${
                    lesson.isAvailable && isAvailable
                      ? "hover:bg-orange-50/60 dark:hover:bg-orange-950/20 cursor-pointer"
                      : "opacity-60 cursor-not-allowed bg-gray-50/50 dark:bg-slate-900/30"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    {/* Status Indicator */}
                    <div className="shrink-0">
                      {isLessonDone ? (
                        <CheckCircle2 size={20} className="text-emerald-500 dark:text-emerald-400" />
                      ) : isNextUp ? (
                        <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xs">
                          <Play size={10} className="ml-0.5 fill-white" />
                        </div>
                      ) : (
                        <Circle size={20} className="text-gray-300 dark:text-slate-700" />
                      )}
                    </div>

                    {/* Lesson Number */}
                    <span className="text-xs sm:text-sm font-black text-gray-400 dark:text-gray-500 tracking-wider shrink-0 w-6">
                      {paddedLesson}
                    </span>

                    {/* Title Group: English + Nepali */}
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[16px] sm:text-[18px] font-black text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug">
                          {lesson.titleEn}
                        </span>
                      </div>
                      <p className="text-sm sm:text-[16px] font-bold text-orange-700/80 dark:text-orange-400/90 font-nepali leading-tight">
                        {lesson.titleNe}
                      </p>
                    </div>
                  </div>

                  {/* Duration & Navigation Arrow */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 hidden sm:inline-block">
                      {lesson.duration}
                    </span>
                    {lesson.isAvailable && isAvailable ? (
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-orange-500 group-hover:text-white transition-all group-hover:translate-x-1">
                        <ArrowRight size={15} />
                      </div>
                    ) : (
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Soon
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SINGLE PRIMARY ACTION CTA AT BOTTOM OF MODULE */}
      <div className="pt-2">
        {isAvailable ? (
          <Button
            onClick={handleActionClick}
            className={`rounded-2xl font-extrabold text-sm py-5 px-7 shadow-xs flex items-center gap-2 ${
              isCompleted
                ? "bg-slate-100 hover:bg-slate-200 text-gray-900 dark:bg-slate-800 dark:text-gray-100"
                : isInProgress
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {isCompleted ? (
              <>
                <Award size={16} />
                <span>Review Module {paddedModNum} 🎓</span>
              </>
            ) : isInProgress ? (
              <>
                <span>Continue Learning (Lesson {nextUncompleted?.lessonNumber || 1})</span>
                <ArrowRight size={16} />
              </>
            ) : (
              <>
                <span>Start Module {paddedModNum} →</span>
              </>
            )}
          </Button>
        ) : (
          <Button
            disabled
            variant="outline"
            className="rounded-2xl font-bold text-xs py-4 px-5 opacity-60 border-gray-300 dark:border-slate-800"
          >
            <span>Roadmap Module • Coming in Next Phase</span>
          </Button>
        )}
      </div>

    </section>
  );
};
