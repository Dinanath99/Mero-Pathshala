import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  ChevronRight, 
  Search, 
  X,
  BookMarked,
  Layers
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  allCurriculumModules, 
  curriculumStages, 
  CurriculumModule 
} from "./curriculumData";
import { ModuleCard } from "@/components/learn/ModuleCard";
import { GlossarySearch } from "@/components/learn/GlossarySearch";
import { 
  allComputerFundamentalsLessons, 
  operatingComputerLessons, 
  fileManagementLessons 
} from "./computerSkillsData";

export const ComputerFundamentalsHub: React.FC = () => {
  const [completedLessonKeys, setCompletedLessonKeys] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "available" | "beginner" | "intermediate">("all");

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
  }, []);

  // Compute progress stats
  const availableModules = allCurriculumModules.filter(m => m.status === "available");
  const totalAvailableLessons = availableModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessonsCount = completedLessonKeys.length;

  const completedModulesCount = availableModules.filter(m => {
    const modCompleted = m.lessons.filter(l => completedLessonKeys.includes(`${m.id}-${l.id}`)).length;
    return modCompleted === m.lessons.length && m.lessons.length > 0;
  }).length;

  const overallPercent = totalAvailableLessons > 0 
    ? Math.round((completedLessonsCount / totalAvailableLessons) * 100) 
    : 0;

  // Filter modules
  const filteredModules = allCurriculumModules.filter(m => {
    if (selectedFilter === "available" && m.status !== "available") return false;
    if (selectedFilter === "beginner" && m.level !== "Beginner") return false;
    if (selectedFilter === "intermediate" && m.level !== "Intermediate") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchModTitle = m.titleEn.toLowerCase().includes(q) || m.titleNe.includes(q);
      const matchModDesc = m.descriptionEn.toLowerCase().includes(q) || m.descriptionNe.includes(q);
      const matchLesson = m.lessons.some(l => 
        l.titleEn.toLowerCase().includes(q) || l.titleNe.includes(q)
      );
      return matchModTitle || matchModDesc || matchLesson;
    }

    return true;
  });

  // Glossary terms
  const allTermsMod1 = allComputerFundamentalsLessons.flatMap(l => l.keyTerms || []);
  const allTermsMod2 = operatingComputerLessons.flatMap(l => l.keyTerms || []);
  const allTermsMod3 = fileManagementLessons.flatMap(l => l.keyTerms || []);
  const combinedTerms = [...allTermsMod1, ...allTermsMod2, ...allTermsMod3];
  const uniqueTerms = Array.from(new Map(combinedTerms.map(t => [t.termEn, t])).values());

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020817] pt-20 pb-28 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 1. BREADCRUMBS */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2 text-gray-400" />
          <Link to="/learn" className="hover:text-orange-500 transition-colors">Learn</Link>
          <ChevronRight size={14} className="mx-2 text-gray-400" />
          <span className="text-gray-900 dark:text-white font-bold">Computer Skills (कम्प्युटर सीप)</span>
        </nav>

        {/* 2. PAGE HEADER */}
        <header className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-orange-500 text-white font-black text-xs px-3 py-1 uppercase tracking-wider shadow-2xs">
              AI GURU NEPAL • DIGITAL SKILLS ROADMAP
            </Badge>
            <Badge variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-700 text-xs font-semibold">
              Level 1 Mastery
            </Badge>
            <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs font-semibold">
              100% Free & Open Access
            </Badge>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              Computer Skills
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 font-nepali tracking-normal">
              कम्प्युटर सीप
            </h2>
          </div>

          <div className="space-y-2 text-educational-lead text-gray-700 dark:text-gray-300 max-w-3xl">
            <p className="leading-relaxed text-base sm:text-lg">
              Learn computer skills from basic to advanced through step-by-step modular lessons and practical activities.
            </p>
            <p className="font-nepali leading-relaxed text-base sm:text-lg text-gray-600 dark:text-gray-400">
              कम्प्युटरका आधारभूत सिद्धान्तदेखि कार्यालयका सीप, फाइल व्यवस्थापन र AI प्रविधिसम्म क्रमबद्ध रूपमा सिक्नुहोस्।
            </p>
          </div>

          {/* PROGRESS SUMMARY */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-black">
                <GraduationCap size={18} />
                <span>Your Progress:</span>
              </span>
              <span>
                <strong>{completedModulesCount} / 12 Modules Completed</strong>
              </span>
              <span className="text-gray-300 dark:text-slate-700">•</span>
              <span className="text-gray-500 dark:text-gray-400 font-semibold">
                {completedLessonsCount} of {totalAvailableLessons} Lessons ({overallPercent}%)
              </span>
            </div>
          </div>
        </header>

        {/* 3. SEARCH & FILTER BAR */}
        <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search computer skills, modules, or नेपाली शब्द (e.g. फाइल, किबोर्ड)..."
                className="pl-10 pr-10 py-5 rounded-2xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-sm font-medium focus-visible:ring-orange-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-gray-100 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 self-start sm:self-auto">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === "all"
                    ? "bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-2xs font-extrabold"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                All (12)
              </button>
              <button
                onClick={() => setSelectedFilter("available")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === "available"
                    ? "bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-2xs font-extrabold"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Available (3)
              </button>
              <button
                onClick={() => setSelectedFilter("beginner")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === "beginner"
                    ? "bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-2xs font-extrabold"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setSelectedFilter("intermediate")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === "intermediate"
                    ? "bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-2xs font-extrabold"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Intermediate
              </button>
            </div>

          </div>

          {searchQuery && (
            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold px-1">
              Found {filteredModules.length} module{filteredModules.length === 1 ? "" : "s"} matching "{searchQuery}"
            </p>
          )}
        </div>

        {/* 4. STAGES & MODULE CARDS GRID (ROADMAP VIEW) */}
        <div className="space-y-14">
          {curriculumStages.map((stage) => {
            // Get modules that belong to this stage and match the current filter
            const stageModules = filteredModules.filter(m => stage.moduleIds.includes(m.id));
            if (stageModules.length === 0) return null;

            return (
              <section key={stage.id} className="space-y-6">
                
                {/* Stage Header */}
                <div className="border-b border-gray-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Layers size={18} className="text-orange-500" />
                      <span className="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
                        STAGE 0{stage.stageNumber}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                      {stage.titleEn}
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-orange-600 dark:text-orange-400 font-nepali">
                      {stage.titleNe}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium max-w-sm">
                    {stage.descriptionEn}
                  </p>
                </div>

                {/* Grid of Module Cards (2 columns on desktop, 1 column on mobile) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {stageModules.map((module) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      completedLessonKeys={completedLessonKeys}
                      moduleKeyPrefix={module.id}
                    />
                  ))}
                </div>

              </section>
            );
          })}
        </div>

        {/* 5. TECHNICAL VOCABULARY GLOSSARY SEARCH */}
        <div className="space-y-6 pt-12 border-t border-gray-200 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookMarked className="text-orange-500" size={20} />
              <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold text-xs px-2.5 py-0.5">
                {uniqueTerms.length} Terms
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Interactive Computer Glossary (शब्दावली केन्द्र)
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
              Look up technical computer terms across all available modules in English or नेपाली.
            </p>
          </div>

          <GlossarySearch terms={uniqueTerms} />
        </div>

      </div>
    </div>
  );
};

export default ComputerFundamentalsHub;
