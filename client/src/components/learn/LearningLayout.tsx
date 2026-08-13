import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Menu, X, BookOpen, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModuleSidebar, SidebarLessonItem } from "./ModuleSidebar";
import { TableOfContents, TocItem } from "./TableOfContents";

interface LearningLayoutProps {
  moduleNumber: number;
  moduleTitleEn: string;
  moduleTitleNe?: string;
  lessons: SidebarLessonItem[];
  currentLessonSlug: string;
  completedLessonKeys: string[];
  moduleKeyPrefix: string;
  tocItems?: TocItem[];
  children: React.ReactNode;
}

export const LearningLayout: React.FC<LearningLayoutProps> = ({
  moduleNumber,
  moduleTitleEn,
  moduleTitleNe,
  lessons,
  currentLessonSlug,
  completedLessonKeys,
  moduleKeyPrefix,
  tocItems = [],
  children
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLesson = lessons.find(
    l => l.slug === currentLessonSlug || `${moduleKeyPrefix}-${l.id}` === currentLessonSlug
  ) || lessons[0];

  const totalLessons = lessons.length;
  const completedCount = lessons.filter(l =>
    completedLessonKeys.includes(`${moduleKeyPrefix}-${l.id}`)
  ).length;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020817] text-gray-900 dark:text-gray-100 flex flex-col pt-16">
      
      {/* Mobile Sticky Module Header Bar */}
      <div className="lg:hidden sticky top-16 z-30 bg-white/95 dark:bg-[#070e1e]/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-2xs">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-xl font-bold text-xs flex items-center gap-2 border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-900"
        >
          {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          <span>☰ Module Contents ({completedCount}/{totalLessons})</span>
        </Button>

        <div className="text-right min-w-0 flex-1 ml-3">
          <span className="text-[10px] font-black uppercase text-orange-600 dark:text-orange-400 block">
            Module {moduleNumber} • Lesson {currentLesson?.lessonNumber || 1}
          </span>
          <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate block">
            {currentLesson?.titleEn}
          </span>
        </div>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex">
          <div className="w-80 max-w-[85vw] h-full bg-white dark:bg-[#070e1e] shadow-2xl animate-in slide-in-from-left duration-200 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Course Navigation
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg h-8 w-8 text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <X size={18} />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ModuleSidebar
                moduleNumber={moduleNumber}
                moduleTitleEn={moduleTitleEn}
                moduleTitleNe={moduleTitleNe}
                lessons={lessons}
                currentLessonSlug={currentLessonSlug}
                completedLessonKeys={completedLessonKeys}
                moduleKeyPrefix={moduleKeyPrefix}
                onSelectLesson={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main 3-Column Tutorial Container */}
      <div className="w-full max-w-[1600px] mx-auto flex-1 flex justify-center">
        
        {/* Left Sticky Sidebar (Desktop only) */}
        <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-r border-gray-200 dark:border-slate-800 overflow-hidden">
          <ModuleSidebar
            moduleNumber={moduleNumber}
            moduleTitleEn={moduleTitleEn}
            moduleTitleNe={moduleTitleNe}
            lessons={lessons}
            currentLessonSlug={currentLessonSlug}
            completedLessonKeys={completedLessonKeys}
            moduleKeyPrefix={moduleKeyPrefix}
          />
        </aside>

        {/* Center Main Learning Column */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-10 xl:px-12 py-8 lg:py-10 flex justify-center">
          <div className="reading-container space-y-8">
            
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium overflow-x-auto whitespace-nowrap pb-1">
              <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
              <ChevronRight size={14} className="mx-2 text-gray-400 shrink-0" />
              <Link to="/learn" className="hover:text-orange-500 transition-colors">Learn</Link>
              <ChevronRight size={14} className="mx-2 text-gray-400 shrink-0" />
              <Link to="/learn/computer-skills" className="hover:text-orange-500 transition-colors">Computer Skills</Link>
              <ChevronRight size={14} className="mx-2 text-gray-400 shrink-0" />
              <span className="text-orange-600 dark:text-orange-400 font-bold shrink-0">
                Module {moduleNumber}
              </span>
              <ChevronRight size={14} className="mx-2 text-gray-400 shrink-0" />
              <span className="text-gray-900 dark:text-white font-bold truncate">
                {currentLesson?.titleEn}
              </span>
            </nav>

            {/* Injected Lesson Content */}
            {children}

          </div>
        </main>

        {/* Right Sticky Table of Contents (XL Desktops only) */}
        {tocItems && tocItems.length > 0 && (
          <aside className="hidden xl:block w-64 2xl:w-72 shrink-0 px-4 py-10 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
            <TableOfContents items={tocItems} />
          </aside>
        )}

      </div>
    </div>
  );
};
