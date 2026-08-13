import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Play, 
  Clock, 
  BookOpen, 
  Layers, 
  Award, 
  ChevronRight,
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
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allCurriculumModules, CurriculumModule } from "./curriculumData";
import { getModuleAccent, AccentTheme } from "@/theme/accentColors";

export const ComputerSkillsModuleDetail: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [completedLessonKeys, setCompletedLessonKeys] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aiguru_digital_skills_completed");
      if (saved) {
        setCompletedLessonKeys(JSON.parse(saved));
      } else {
        const legacy = localStorage.getItem("aiguru_computer_fundamentals_completed");
        if (legacy) {
          const ids: number[] = JSON.parse(legacy);
          setCompletedLessonKeys(ids.map(id => `mod1-${id}`));
        }
      }
    } catch (e) {
      console.error(e);
    }
    window.scrollTo(0, 0);
  }, [moduleId]);

  // Find module by id
  const currentModule: CurriculumModule = allCurriculumModules.find(m => {
    if (!moduleId) return false;
    const cleanParam = moduleId.toLowerCase().trim();
    return (
      m.id.toLowerCase() === cleanParam ||
      m.moduleNumber.toString() === cleanParam ||
      `mod${m.moduleNumber}` === cleanParam ||
      m.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-") === cleanParam
    );
  }) || allCurriculumModules[0];

  const accent: AccentTheme = getModuleAccent(currentModule.id, currentModule.accentColor || "blue");

  // Find next module in curriculum for continuous learning
  const currentModuleIndex = allCurriculumModules.findIndex(m => m.id === currentModule.id);
  const nextModule = currentModuleIndex >= 0 && currentModuleIndex < allCurriculumModules.length - 1 
    ? allCurriculumModules[currentModuleIndex + 1] 
    : null;

  // Calculate module-specific progress
  const totalLessons = currentModule.lessons.length;
  const completedCount = currentModule.lessons.filter(l =>
    completedLessonKeys.includes(`${currentModule.id}-${l.id}`)
  ).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isCompleted = progressPercent === 100 && totalLessons > 0;
  const isInProgress = completedCount > 0 && !isCompleted;
  const isAvailable = currentModule.status === "available";

  // Identify next uncompleted lesson
  const nextUncompletedLesson = currentModule.lessons.find(
    l => !completedLessonKeys.includes(`${currentModule.id}-${l.id}`)
  ) || currentModule.lessons[0];

  const renderIcon = (iconName: string, size = 32) => {
    switch (iconName) {
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

  const handleStartLearning = () => {
    if (!isAvailable) return;
    if (nextUncompletedLesson) {
      navigate(`/learn/computer-skills/${nextUncompletedLesson.slug}`);
    } else {
      navigate(`/learn/computer-skills/${currentModule.primarySlug}`);
    }
  };

  const handleLessonRowClick = (slug: string, lessonAvailable: boolean) => {
    if (!lessonAvailable || !isAvailable) return;
    navigate(`/learn/computer-skills/${slug}`);
  };

  const paddedModNum = currentModule.moduleNumber < 10 
    ? `0${currentModule.moduleNumber}` 
    : `${currentModule.moduleNumber}`;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020817] pt-20 pb-28 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* 1. BACK NAVIGATION & BREADCRUMBS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <Link
            to="/learn/computer-skills"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Computer Skills (कम्प्युटर सीप)</span>
          </Link>

          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
            <Link to="/learn/computer-skills" className="hover:text-orange-500">Computer Skills</Link>
            <ChevronRight size={12} className="mx-1.5 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-bold">Module {paddedModNum}</span>
          </nav>
        </div>

        {/* 2. MODULE DETAIL HERO CARD */}
        <section className={`rounded-3xl border border-gray-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs space-y-8 relative`}>
          
          {/* Top Accent Line */}
          <div className={`h-1.5 w-full ${accent.topLine}`} />

          <div className="p-6 sm:p-10 md:p-12 space-y-8">
            
            {/* Header row: Module number + status */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border flex items-center justify-center shrink-0 shadow-2xs ${accent.iconContainer}`}>
                  {renderIcon(currentModule.iconName, 32)}
                </div>
                <div>
                  <span className={`text-xs sm:text-sm font-black uppercase tracking-widest ${accent.text}`}>
                    MODULE {paddedModNum}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-700 text-xs font-semibold">
                      {currentModule.level}
                    </Badge>
                    <Badge variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-700 text-xs font-semibold">
                      {currentModule.estimatedHours}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                {isCompleted ? (
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-600" /> Completed • 100%
                  </span>
                ) : isInProgress ? (
                  <span className={`px-3.5 py-1.5 rounded-full font-bold text-xs sm:text-sm border ${accent.badge}`}>
                    ● In Progress • {progressPercent}%
                  </span>
                ) : isAvailable ? (
                  <span className="px-3.5 py-1.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 font-semibold text-xs sm:text-sm">
                    ○ Not Started • 0%
                  </span>
                ) : (
                  <span className="px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-semibold text-xs sm:text-sm">
                    Roadmap • Phase 2
                  </span>
                )}
              </div>
            </div>

            {/* Module Titles */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                {currentModule.titleEn}
              </h1>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold font-nepali leading-snug ${accent.textSubtle}`}>
                {currentModule.titleNe}
              </h2>
            </div>

            {/* Full Bilingual Descriptions */}
            <div className="space-y-4 pt-2 text-educational-body">
              <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                {currentModule.descriptionEn}
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-nepali font-medium leading-relaxed">
                {currentModule.descriptionNe}
              </p>
            </div>

            {/* Progress bar */}
            {isAvailable && (
              <div className="space-y-2.5 pt-2 border-t border-gray-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                  <span className="text-gray-600 dark:text-gray-400">
                    {completedCount} of {totalLessons} completed
                  </span>
                  <span className={`font-black ${accent.text}`}>
                    {progressPercent}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    className={`${accent.progressFill} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="pt-2">
              {isAvailable ? (
                <Button
                  onClick={handleStartLearning}
                  className={`rounded-2xl font-extrabold text-base sm:text-lg py-6 sm:py-7 px-8 sm:px-10 shadow-md flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                    isCompleted
                      ? "bg-slate-100 hover:bg-slate-200 text-gray-900 dark:bg-slate-800 dark:text-gray-100"
                      : accent.buttonPrimary
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <Award size={20} />
                      <span>Review Module (Lesson 01) →</span>
                    </>
                  ) : isInProgress ? (
                    <>
                      <span>Continue Learning (Lesson {nextUncompletedLesson?.lessonNumber || 1})</span>
                      <ArrowRight size={20} />
                    </>
                  ) : (
                    <>
                      <span>Start Learning (Lesson 01) →</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  disabled
                  variant="outline"
                  className="rounded-2xl font-bold text-sm py-5 px-6 opacity-60 border-gray-300 dark:border-slate-800"
                >
                  <span>Curriculum Roadmap • Content In Development</span>
                </Button>
              )}
            </div>

          </div>

        </section>

        {/* 3. LESSON LIST SECTION */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4 px-1">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className={accent.text} />
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  Lessons ({totalLessons})
                </h3>
              </div>
              <p className={`text-base sm:text-lg font-bold font-nepali ${accent.textSubtle}`}>
                पाठहरूको सूची
              </p>
            </div>

            <span className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400">
              {completedCount} / {totalLessons} Completed
            </span>
          </div>

          {/* Clean Lesson Rows */}
          <div className="rounded-3xl border border-gray-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs divide-y divide-gray-100 dark:divide-slate-800/80">
            {currentModule.lessons.map((lesson) => {
              const isLessonDone = completedLessonKeys.includes(`${currentModule.id}-${lesson.id}`);
              const isCurrentActive = !isLessonDone && lesson.id === nextUncompletedLesson?.id && isAvailable;
              const paddedLesson = lesson.lessonNumber < 10 
                ? `0${lesson.lessonNumber}` 
                : `${lesson.lessonNumber}`;

              return (
                <div
                  key={lesson.id}
                  onClick={() => handleLessonRowClick(lesson.slug, lesson.isAvailable)}
                  className={`p-4 sm:p-6 min-h-[68px] sm:min-h-[76px] flex items-center justify-between gap-4 transition-all group ${
                    isCurrentActive
                      ? accent.activeRow
                      : ""
                  } ${
                    lesson.isAvailable && isAvailable
                      ? `${accent.hoverBg} cursor-pointer`
                      : "opacity-60 cursor-not-allowed bg-gray-50/50 dark:bg-slate-900/30"
                  }`}
                >
                  <div className="flex items-center gap-3.5 sm:gap-5 min-w-0 flex-1">
                    
                    {/* Status Indicator (✓, ●, ○) */}
                    <div className="shrink-0">
                      {isLessonDone ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                          <CheckCircle2 size={18} />
                        </div>
                      ) : isCurrentActive ? (
                        <div className={`w-6 h-6 rounded-full ${accent.activeDot} flex items-center justify-center shadow-xs`}>
                          <Play size={11} className="ml-0.5 fill-white" />
                        </div>
                      ) : (
                        <Circle size={20} className="text-gray-300 dark:text-slate-700" />
                      )}
                    </div>

                    {/* Lesson Number */}
                    <span className="text-xs sm:text-sm font-black text-gray-400 dark:text-gray-500 tracking-wider shrink-0 w-6 sm:w-8">
                      {paddedLesson}
                    </span>

                    {/* Titles: English + Nepali */}
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <h4 className={`text-[16px] sm:text-[18px] font-bold transition-colors leading-snug ${
                        isCurrentActive
                          ? `${accent.text} font-extrabold`
                          : `text-gray-900 dark:text-white group-hover:${accent.text}`
                      }`}>
                        {lesson.titleEn}
                      </h4>
                      <p className={`text-sm sm:text-[17px] font-semibold font-nepali leading-tight ${
                        isCurrentActive ? accent.textSubtle : "text-gray-600 dark:text-gray-400"
                      }`}>
                        {lesson.titleNe}
                      </p>
                    </div>

                  </div>

                  {/* Duration + Action Arrow */}
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 hidden sm:inline-block">
                      {lesson.duration}
                    </span>
                    {lesson.isAvailable && isAvailable ? (
                      <div className={`w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-white transition-all group-hover:translate-x-1 shadow-2xs ${accent.iconContainerHover}`}>
                        <ArrowRight size={16} />
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Coming Soon
                      </Badge>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* 4. NEXT MODULE RECOMMENDATION */}
        {nextModule && (
          <section className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
                UP NEXT IN CURRICULUM
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                Module 0{nextModule.moduleNumber}: {nextModule.titleEn}
              </h4>
              <p className="text-sm sm:text-base font-bold text-gray-600 dark:text-gray-400 font-nepali">
                {nextModule.titleNe}
              </p>
            </div>

            <Button
              onClick={() => navigate(`/learn/computer-skills/module/${nextModule.id}`)}
              className="rounded-2xl bg-slate-100 hover:bg-slate-200 text-gray-900 dark:bg-slate-800 dark:text-gray-100 font-bold text-sm py-5 px-6 shrink-0 flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <span>View Next Module</span>
              <ArrowRight size={16} />
            </Button>
          </section>
        )}

      </div>
    </div>
  );
};

export default ComputerSkillsModuleDetail;
