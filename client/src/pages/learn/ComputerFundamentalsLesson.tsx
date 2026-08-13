import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  CheckCircle2, 
  RotateCw, 
  HelpCircle, 
  Award,
  Layers,
  Sparkles,
  BookMarked
} from "lucide-react";
import { 
  allComputerFundamentalsLessons, 
  operatingComputerLessons,
  fileManagementLessons,
  computerFundamentalsModuleInfo,
  operatingComputerModuleMeta,
  fileManagementModuleMeta
} from "./computerSkillsData";
import { QuizEngine } from "@/components/learn/QuizEngine";
import { FlashcardDeck } from "@/components/learn/FlashcardDeck";
import { InteractivePractice } from "@/components/learn/InteractivePractice";
import { DiagramViewer } from "@/components/learn/DiagramViewer";
import { MisconceptionCard } from "@/components/learn/MisconceptionCard";
import { InteractiveKeyboard } from "@/components/learn/InteractiveKeyboard";
import { DragDropFilePractice } from "@/components/learn/DragDropFilePractice";
import { ShortcutPractice } from "@/components/learn/ShortcutPractice";
import { WindowManagerDemo } from "@/components/learn/WindowManagerDemo";
import { TenTasksChallenge } from "@/components/learn/TenTasksChallenge";
import { FileExplorerSimulator } from "@/components/learn/FileExplorerSimulator";
import { FileExtensionMatcher } from "@/components/learn/FileExtensionMatcher";
import { ZipCompressionDemo } from "@/components/learn/ZipCompressionDemo";
import { FolderStructureBuilder } from "@/components/learn/FolderStructureBuilder";

// Tutorial Architecture Components
import { LearningLayout } from "@/components/learn/LearningLayout";
import { LessonHeader } from "@/components/learn/LessonHeader";
import { LearningObjectives } from "@/components/learn/LearningObjectives";
import { CalloutBox } from "@/components/learn/CalloutBox";
import { NextLessonCard } from "@/components/learn/NextLessonCard";
import { LessonNavigation } from "@/components/learn/LessonNavigation";
import { TocItem } from "@/components/learn/TableOfContents";
import { SidebarLessonItem } from "@/components/learn/ModuleSidebar";

export const ComputerFundamentalsLesson: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<string>("lesson");
  const [completedLessonKeys, setCompletedLessonKeys] = useState<string[]>([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [languageMode, setLanguageMode] = useState<"both" | "en" | "ne">("both");

  // Check if current slug belongs to Module 3, Module 2, or Module 1
  const mod3Index = fileManagementLessons.findIndex(
    l => l.slug === slug || `m3-${l.id}` === slug || `m3-l${l.id}` === slug
  );
  const isMod3 = mod3Index !== -1;

  const mod2Index = !isMod3 ? operatingComputerLessons.findIndex(
    l => l.slug === slug || `m2-${l.id}` === slug || `m2-l${l.id}` === slug
  ) : -1;
  const isMod2 = mod2Index !== -1;

  const mod1Index = (!isMod3 && !isMod2) ? allComputerFundamentalsLessons.findIndex(
    l => l.slug === slug || String(l.id) === slug
  ) : -1;

  // Active module configuration
  let moduleNumber = 1;
  let moduleTitleEn = computerFundamentalsModuleInfo.titleEn;
  let moduleTitleNe = computerFundamentalsModuleInfo.titleNe;
  let moduleKeyPrefix = "mod1";
  let sidebarLessons: SidebarLessonItem[] = [];

  if (isMod3) {
    moduleNumber = 3;
    moduleTitleEn = fileManagementModuleMeta.titleEn;
    moduleTitleNe = fileManagementModuleMeta.titleNe;
    moduleKeyPrefix = "mod3";
    sidebarLessons = fileManagementLessons.map(l => ({
      id: l.id,
      slug: l.slug,
      lessonNumber: l.lessonNumber,
      titleEn: l.titleEn,
      titleNe: l.titleNe,
      duration: l.duration
    }));
  } else if (isMod2) {
    moduleNumber = 2;
    moduleTitleEn = operatingComputerModuleMeta.titleEn;
    moduleTitleNe = operatingComputerModuleMeta.titleNe;
    moduleKeyPrefix = "mod2";
    sidebarLessons = operatingComputerLessons.map(l => ({
      id: l.id,
      slug: l.slug,
      lessonNumber: l.lessonNumber,
      titleEn: l.titleEn,
      titleNe: l.titleNe,
      duration: l.duration
    }));
  } else {
    moduleNumber = 1;
    moduleTitleEn = computerFundamentalsModuleInfo.titleEn;
    moduleTitleNe = computerFundamentalsModuleInfo.titleNe;
    moduleKeyPrefix = "mod1";
    sidebarLessons = allComputerFundamentalsLessons.map(l => ({
      id: l.id,
      slug: l.slug,
      lessonNumber: l.id,
      titleEn: l.title,
      titleNe: l.titleNp,
      duration: l.duration
    }));
  }

  // Active lesson data
  const currentMod3Lesson = isMod3 ? fileManagementLessons[mod3Index] : null;
  const currentMod2Lesson = isMod2 ? operatingComputerLessons[mod2Index] : null;
  const currentMod1Lesson = (!isMod3 && !isMod2 && mod1Index !== -1) 
    ? allComputerFundamentalsLessons[mod1Index] 
    : allComputerFundamentalsLessons[0];

  const currentLessonKey = isMod3 
    ? `mod3-${currentMod3Lesson?.id}` 
    : isMod2 
      ? `mod2-${currentMod2Lesson?.id}` 
      : `mod1-${currentMod1Lesson.id}`;

  const currentLessonSlug = isMod3
    ? (currentMod3Lesson?.slug || "")
    : isMod2
      ? (currentMod2Lesson?.slug || "")
      : (currentMod1Lesson?.slug || "");

  // Navigation: Previous & Next within the active module or cross-module
  let prevLessonSlug: string | null = null;
  let prevLessonTitle: string | null = null;
  let nextLessonSlug: string | null = null;
  let nextLessonTitle: string | null = null;
  let nextLessonNe: string | null = null;
  let nextSummary: string | null = null;
  let nextLessonNum = 2;
  const isFirstLesson = (isMod3 && mod3Index === 0) || (isMod2 && mod2Index === 0) || (!isMod3 && !isMod2 && mod1Index === 0);
  const isLastLesson = (isMod3 && mod3Index === fileManagementLessons.length - 1) || 
                       (isMod2 && mod2Index === operatingComputerLessons.length - 1) || 
                       (!isMod3 && !isMod2 && mod1Index === allComputerFundamentalsLessons.length - 1);

  if (isMod3) {
    if (mod3Index > 0) {
      prevLessonSlug = fileManagementLessons[mod3Index - 1].slug;
      prevLessonTitle = fileManagementLessons[mod3Index - 1].titleEn;
    }
    if (mod3Index < fileManagementLessons.length - 1) {
      const nextL = fileManagementLessons[mod3Index + 1];
      nextLessonSlug = nextL.slug;
      nextLessonTitle = nextL.titleEn;
      nextLessonNe = nextL.titleNe;
      nextSummary = nextL.summaryEn;
      nextLessonNum = nextL.lessonNumber;
    }
  } else if (isMod2) {
    if (mod2Index > 0) {
      prevLessonSlug = operatingComputerLessons[mod2Index - 1].slug;
      prevLessonTitle = operatingComputerLessons[mod2Index - 1].titleEn;
    }
    if (mod2Index < operatingComputerLessons.length - 1) {
      const nextL = operatingComputerLessons[mod2Index + 1];
      nextLessonSlug = nextL.slug;
      nextLessonTitle = nextL.titleEn;
      nextLessonNe = nextL.titleNe;
      nextSummary = nextL.summaryEn;
      nextLessonNum = nextL.lessonNumber;
    }
  } else {
    if (mod1Index > 0) {
      prevLessonSlug = allComputerFundamentalsLessons[mod1Index - 1].slug;
      prevLessonTitle = allComputerFundamentalsLessons[mod1Index - 1].title;
    }
    if (mod1Index < allComputerFundamentalsLessons.length - 1) {
      const nextL = allComputerFundamentalsLessons[mod1Index + 1];
      nextLessonSlug = nextL.slug;
      nextLessonTitle = nextL.title;
      nextLessonNe = nextL.titleNp;
      nextSummary = nextL.summaryEn;
      nextLessonNum = nextL.id;
    }
  }

  // Load completed lessons
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aiguru_digital_skills_completed");
      if (saved) {
        setCompletedLessonKeys(JSON.parse(saved));
      } else {
        const legacy = localStorage.getItem("aiguru_computer_fundamentals_completed");
        if (legacy) {
          const ids: number[] = JSON.parse(legacy);
          const converted = ids.map(id => `mod1-${id}`);
          setCompletedLessonKeys(converted);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentTab("lesson");
  }, [slug]);

  const markLessonComplete = () => {
    if (!completedLessonKeys.includes(currentLessonKey)) {
      const updated = [...completedLessonKeys, currentLessonKey];
      setCompletedLessonKeys(updated);
      try {
        localStorage.setItem("aiguru_digital_skills_completed", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleQuizComplete = (score: number, total: number) => {
    markLessonComplete();
    const isLastMod1 = !isMod2 && !isMod3 && currentMod1Lesson.id === 12;
    const isLastMod2 = isMod2 && currentMod2Lesson?.id === 11;
    const isLastMod3 = isMod3 && currentMod3Lesson?.id === 11;
    if ((isLastMod1 || isLastMod2 || isLastMod3) && (score / total) >= 0.6) {
      setShowCompletionModal(true);
    }
  };

  const isCompleted = completedLessonKeys.includes(currentLessonKey);

  // Active Lesson Metadata
  let lessonNumber = 1;
  let totalInModule = 12;
  let titleEn = "";
  let titleNe = "";
  let duration = "10 min";
  let level = "Beginner";
  let summaryEn = "";
  let summaryNe = "";
  let flashcardList: any[] = [];
  let quizList: any[] = [];
  let keyTermsList: any[] = [];
  let objectivesList: any[] = [];

  const activeLessonObject = isMod3 ? currentMod3Lesson : isMod2 ? currentMod2Lesson : null;

  if (isMod3 && currentMod3Lesson) {
    lessonNumber = currentMod3Lesson.lessonNumber;
    totalInModule = fileManagementLessons.length;
    titleEn = currentMod3Lesson.titleEn;
    titleNe = currentMod3Lesson.titleNe;
    duration = currentMod3Lesson.duration;
    level = currentMod3Lesson.difficulty || "Beginner";
    summaryEn = currentMod3Lesson.summaryEn;
    summaryNe = currentMod3Lesson.summaryNe;
    flashcardList = currentMod3Lesson.flashcards || [];
    quizList = currentMod3Lesson.quiz || [];
    keyTermsList = currentMod3Lesson.keyTerms || [];
    objectivesList = currentMod3Lesson.objectives || [];
  } else if (isMod2 && currentMod2Lesson) {
    lessonNumber = currentMod2Lesson.lessonNumber;
    totalInModule = operatingComputerLessons.length;
    titleEn = currentMod2Lesson.titleEn;
    titleNe = currentMod2Lesson.titleNe;
    duration = currentMod2Lesson.duration;
    level = currentMod2Lesson.difficulty || "Beginner";
    summaryEn = currentMod2Lesson.summaryEn;
    summaryNe = currentMod2Lesson.summaryNe;
    flashcardList = currentMod2Lesson.flashcards || [];
    quizList = currentMod2Lesson.quiz || [];
    keyTermsList = currentMod2Lesson.keyTerms || [];
    objectivesList = currentMod2Lesson.objectives || [];
  } else {
    lessonNumber = currentMod1Lesson.id;
    totalInModule = allComputerFundamentalsLessons.length;
    titleEn = currentMod1Lesson.title;
    titleNe = currentMod1Lesson.titleNp;
    duration = currentMod1Lesson.duration;
    level = currentMod1Lesson.level;
    summaryEn = currentMod1Lesson.summaryEn;
    summaryNe = currentMod1Lesson.summaryNp;
    flashcardList = currentMod1Lesson.flashcards || [];
    quizList = currentMod1Lesson.quiz || [];
    keyTermsList = currentMod1Lesson.keyTerms || [];
    objectivesList = currentMod1Lesson.objectives || [];
  }

  // Construct Table of Contents Items dynamically
  const tocItems: TocItem[] = [];

  if (objectivesList.length > 0) {
    tocItems.push({ id: "learning-objectives", titleEn: "Learning Objectives", titleNe: "उद्देश्यहरू" });
  }

  // Interactive Lab anchor
  const hasInteractiveLab = (isMod3 && [2, 3, 7, 10].includes(lessonNumber)) || (isMod2 && [2, 3, 4, 5, 10].includes(lessonNumber));
  if (hasInteractiveLab) {
    tocItems.push({ id: "interactive-lab", titleEn: "Interactive Practice Lab", titleNe: "अभ्यास ल्याब" });
  }

  // Add section anchors
  if (isMod2 || isMod3) {
    activeLessonObject?.sections?.forEach((sec, idx) => {
      tocItems.push({
        id: `section-${idx}`,
        titleEn: sec.titleEn,
        titleNe: sec.titleNe
      });
    });
  } else if (currentMod1Lesson.contentBlocks) {
    currentMod1Lesson.contentBlocks.forEach((b, idx) => {
      if (b.type === "heading") {
        tocItems.push({
          id: `heading-block-${idx}`,
          titleEn: b.title || "",
          titleNe: b.titleNe
        });
      }
    });
  }

  if ((isMod2 || isMod3) && activeLessonObject?.caseStudyEn) {
    tocItems.push({ id: "case-study", titleEn: "Nepal Workplace Example", titleNe: "कार्यक्षेत्र उदाहरण" });
  }

  if (keyTermsList.length > 0) {
    tocItems.push({ id: "key-terms", titleEn: "Key Vocabulary", titleNe: "प्राविधिक शब्दहरू" });
  }

  if (quizList.length > 0) {
    tocItems.push({ id: "quiz-section", titleEn: `Assessment Quiz (${quizList.length} Qs)`, titleNe: "प्रश्नोत्तरी" });
  }

  if (flashcardList.length > 0) {
    tocItems.push({ id: "flashcards-section", titleEn: `Flashcards Deck (${flashcardList.length})`, titleNe: "फ्ल्यासकार्ड" });
  }

  const showEn = languageMode === "both" || languageMode === "en";
  const showNe = languageMode === "both" || languageMode === "ne";

  return (
    <LearningLayout
      moduleNumber={moduleNumber}
      moduleTitleEn={moduleTitleEn}
      moduleTitleNe={moduleTitleNe}
      lessons={sidebarLessons}
      currentLessonSlug={currentLessonSlug}
      completedLessonKeys={completedLessonKeys}
      moduleKeyPrefix={moduleKeyPrefix}
      tocItems={tocItems}
    >
      <article className="space-y-8">
        
        {/* 1. LESSON HEADER */}
        <LessonHeader
          moduleNumber={moduleNumber}
          lessonNumber={lessonNumber}
          totalInModule={totalInModule}
          titleEn={titleEn}
          titleNe={titleNe}
          summaryEn={summaryEn}
          summaryNe={summaryNe}
          duration={duration}
          level={level}
          isCompleted={isCompleted}
          languageMode={languageMode}
          onLanguageChange={setLanguageMode}
        />

        {/* 2. LEARNING OBJECTIVES */}
        {objectivesList.length > 0 && (
          <LearningObjectives
            objectives={objectivesList}
            languageMode={languageMode}
          />
        )}

        {/* 3. TABS / DIRECT CONTENT MODES */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
          <TabsList className="grid grid-cols-3 p-1.5 rounded-2xl bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 max-w-lg mx-auto shadow-2xs">
            <TabsTrigger
              value="lesson"
              className="rounded-xl font-bold text-xs sm:text-sm py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-xs"
            >
              <BookOpen size={16} className="mr-1.5" /> Tutorial Notes
            </TabsTrigger>
            <TabsTrigger
              value="quiz"
              className="rounded-xl font-bold text-xs sm:text-sm py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-xs"
            >
              <HelpCircle size={16} className="mr-1.5" /> Quiz ({quizList.length})
            </TabsTrigger>
            <TabsTrigger
              value="flashcards"
              className="rounded-xl font-bold text-xs sm:text-sm py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-xs"
            >
              <RotateCw size={16} className="mr-1.5" /> Flashcards ({flashcardList.length})
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: MAIN TUTORIAL ARTICLE CONTENT */}
          <TabsContent value="lesson" className="space-y-10 animate-in fade-in duration-200">
            
            {/* MODULE 3 INTERACTIVE PRACTICE LABS */}
            {isMod3 && (
              <section id="interactive-lab" className="space-y-4">
                {currentMod3Lesson?.id === 2 && (
                  <FileExtensionMatcher onComplete={markLessonComplete} />
                )}
                {currentMod3Lesson?.id === 3 && (
                  <FileExplorerSimulator onActionComplete={markLessonComplete} />
                )}
                {currentMod3Lesson?.id === 7 && (
                  <ZipCompressionDemo onComplete={markLessonComplete} />
                )}
                {currentMod3Lesson?.id === 10 && (
                  <FolderStructureBuilder onComplete={markLessonComplete} />
                )}
              </section>
            )}

            {/* MODULE 2 INTERACTIVE PRACTICE LABS */}
            {isMod2 && (
              <section id="interactive-lab" className="space-y-4">
                {currentMod2Lesson?.id === 2 && (
                  <DragDropFilePractice onComplete={markLessonComplete} />
                )}
                {currentMod2Lesson?.id === 3 && (
                  <InteractiveKeyboard />
                )}
                {currentMod2Lesson?.id === 4 && (
                  <ShortcutPractice onComplete={markLessonComplete} />
                )}
                {currentMod2Lesson?.id === 5 && (
                  <WindowManagerDemo />
                )}
                {currentMod2Lesson?.id === 10 && (
                  <TenTasksChallenge onComplete={markLessonComplete} />
                )}
              </section>
            )}

            {/* STRUCTURED ARTICLE SECTIONS FOR MODULE 2 & MODULE 3 */}
            {(isMod2 || isMod3) && activeLessonObject?.sections && (
              <div className="space-y-10">
                {activeLessonObject.sections.map((section, idx) => (
                  <section
                    key={section.id || idx}
                    id={`section-${idx}`}
                    className="space-y-4 pt-4 first:pt-0"
                  >
                    {/* Section Headings */}
                    <div className="space-y-1 pb-2 border-b border-gray-200/80 dark:border-slate-800">
                      {showEn && (
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-snug">
                          {section.titleEn}
                        </h2>
                      )}
                      {showNe && section.titleNe && (
                        <h3 className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400 font-nepali">
                          {section.titleNe}
                        </h3>
                      )}
                    </div>

                    {/* Section English Explanation */}
                    {showEn && section.contentEn && (
                      <p className="text-educational-body font-medium leading-relaxed">
                        {section.contentEn}
                      </p>
                    )}

                    {/* Section Nepali Explanation: "नेपालीमा बुझौं" */}
                    {showNe && section.contentNe && (
                      <div className="rounded-2xl p-5 sm:p-6 bg-slate-50/80 dark:bg-slate-900/60 border border-gray-200/80 dark:border-slate-800/80 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">
                            🇳🇵 नेपालीमा बुझौं (Detailed Explanation in Nepali)
                          </span>
                        </div>
                        <p className="text-educational-nepali font-normal leading-relaxed text-gray-800 dark:text-gray-200">
                          {section.contentNe}
                        </p>
                      </div>
                    )}

                    {/* Bullet Points */}
                    {section.bulletPointsEn && (
                      <div className="grid grid-cols-1 gap-3 pt-2">
                        {section.bulletPointsEn.map((pt, pIdx) => {
                          const nepaliPt = section.bulletPointsNe?.[pIdx];
                          return (
                            <div
                              key={pIdx}
                              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-2xs space-y-1.5 transition-all hover:border-gray-300 dark:hover:border-slate-700"
                            >
                              {showEn && (
                                <p
                                  className="text-base sm:text-[17px] font-semibold text-gray-900 dark:text-gray-100 leading-snug"
                                  dangerouslySetInnerHTML={{ __html: pt }}
                                />
                              )}
                              {showNe && nepaliPt && (
                                <p
                                  className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 font-nepali leading-relaxed pt-1 border-t border-gray-100 dark:border-slate-800"
                                  dangerouslySetInnerHTML={{ __html: nepaliPt }}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>
                ))}
              </div>
            )}

            {/* MODULE 1 CONTENT BLOCKS */}
            {!isMod2 && !isMod3 && currentMod1Lesson.contentBlocks && (
              <div className="space-y-8">
                {currentMod1Lesson.contentBlocks.map((block, idx) => {
                  if (block.type === "paragraph") {
                    return (
                      <div key={idx} className="space-y-3">
                        {showEn && (
                          <p className="text-educational-body font-medium leading-relaxed">
                            {block.text}
                          </p>
                        )}
                        {showNe && block.textNe && (
                          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-800">
                            <p className="text-educational-nepali font-normal leading-relaxed text-gray-800 dark:text-gray-200">
                              {block.textNe}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (block.type === "heading") {
                    return (
                      <div
                        key={idx}
                        id={`heading-block-${idx}`}
                        className="pt-6 border-t border-gray-200/80 dark:border-slate-800 space-y-1"
                      >
                        {showEn && (
                          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-snug">
                            {block.title}
                          </h2>
                        )}
                        {showNe && block.titleNe && (
                          <h3 className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400 font-nepali">
                            {block.titleNe}
                          </h3>
                        )}
                      </div>
                    );
                  }

                  if (block.type === "callout") {
                    return (
                      <CalloutBox
                        key={idx}
                        variant="remember"
                        titleEn={block.title}
                        contentEn={showEn ? block.text : undefined}
                        contentNe={showNe ? block.textNe : undefined}
                      />
                    );
                  }

                  if (block.type === "nepalExample") {
                    return (
                      <CalloutBox
                        key={idx}
                        variant="nepal"
                        titleEn={block.title}
                        titleNe={block.titleNe}
                        contentEn={showEn ? block.text : undefined}
                        contentNe={showNe ? block.textNe : undefined}
                      />
                    );
                  }

                  if (block.type === "diagram" && block.items) {
                    return <DiagramViewer key={idx} items={block.items} />;
                  }

                  return null;
                })}
              </div>
            )}

            {/* VISUAL DIAGRAMS FOR MODULE 2 & 3 */}
            {(isMod2 || isMod3) && activeLessonObject?.diagrams && activeLessonObject.diagrams.length > 0 && (
              <section id="visual-diagram" className="space-y-3 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">
                    📊 Visual Architecture & Flow
                  </span>
                </div>
                <DiagramViewer items={activeLessonObject.diagrams} />
              </section>
            )}

            {/* REAL-WORLD NEPAL CASE STUDY */}
            {(isMod2 || isMod3) && activeLessonObject?.caseStudyEn && (
              <section id="case-study">
                <CalloutBox
                  variant="nepal"
                  titleEn="Nepal Workplace Case Study"
                  titleNe="नेपालको कार्यक्षेत्रमा व्यावहारिक प्रयोग"
                  contentEn={showEn ? activeLessonObject.caseStudyEn : undefined}
                  contentNe={showNe ? activeLessonObject.caseStudyNe : undefined}
                />
              </section>
            )}

            {/* COMMON MISCONCEPTIONS */}
            {(((isMod2 || isMod3) && activeLessonObject?.misconceptions) || (!isMod2 && !isMod3 && currentMod1Lesson.misconceptions)) && (
              <section id="misconceptions" className="pt-2">
                <MisconceptionCard
                  items={(isMod2 || isMod3) ? activeLessonObject!.misconceptions! : currentMod1Lesson.misconceptions}
                />
              </section>
            )}

            {/* MODULE 1 INTERACTIVE DRAG-DROP ACTIVITY */}
            {!isMod2 && !isMod3 && currentMod1Lesson.practiceActivity && (
              <section id="practice-activity" className="pt-4">
                <InteractivePractice activity={currentMod1Lesson.practiceActivity} />
              </section>
            )}

            {/* KEY TERMS / VOCABULARY GLOSSARY */}
            {keyTermsList.length > 0 && (
              <section id="key-terms" className="space-y-4 pt-8 border-t border-gray-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <BookMarked className="text-orange-500" size={20} />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                      Key Technical Terms
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400 font-nepali">
                      यस पाठका महत्वपूर्ण प्राविधिक शब्दहरू
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {keyTermsList.map((term, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-black text-base text-gray-900 dark:text-white">
                          {term.termEn}
                        </h4>
                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 font-nepali">
                          {term.termNe}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-snug">
                        {term.definitionEn}
                      </p>
                      {term.definitionNe && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-nepali italic pt-1 border-t border-gray-100 dark:border-slate-800">
                          {term.definitionNe}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PRACTICE / ASSESSMENT CALL TO ACTION BLOCK */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 border-2 border-orange-500/20 dark:border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs my-8">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                  Ready to test your understanding?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Review flashcards or test yourself with the interactive lesson quiz ({quizList.length} Questions).
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <Button
                  onClick={() => setCurrentTab("flashcards")}
                  variant="outline"
                  className="rounded-xl font-bold text-xs sm:text-sm py-5 px-5 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                >
                  <RotateCw size={15} className="mr-1.5 text-orange-500" />
                  Flashcards ({flashcardList.length})
                </Button>
                <Button
                  onClick={() => setCurrentTab("quiz")}
                  className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-5 px-6 shadow-xs"
                >
                  <HelpCircle size={15} className="mr-1.5" />
                  Take Quiz ({quizList.length} Qs) →
                </Button>
              </div>
            </div>

            {/* UP NEXT LESSON CARD PREVIEW */}
            <NextLessonCard
              nextLessonNumber={nextLessonNum}
              nextTitleEn={nextLessonTitle || undefined}
              nextTitleNe={nextLessonNe || undefined}
              nextSummaryEn={nextSummary || undefined}
              onContinue={() => {
                markLessonComplete();
                if (nextLessonSlug) {
                  navigate(`/learn/computer-skills/${nextLessonSlug}`);
                } else {
                  navigate("/learn/computer-skills");
                }
              }}
              isLastLesson={isLastLesson}
            />

          </TabsContent>

          {/* TAB 2: ASSESSMENT QUIZ */}
          <TabsContent value="quiz" id="quiz-section" className="space-y-6 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
              <QuizEngine
                questions={quizList}
                title={`${titleEn} — Assessment Quiz`}
                onComplete={handleQuizComplete}
              />
            </div>
          </TabsContent>

          {/* TAB 3: FLASHCARDS DECK */}
          <TabsContent value="flashcards" id="flashcards-section" className="space-y-6 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
              <FlashcardDeck cards={flashcardList} title={`${titleEn} — Flashcards Deck`} />
            </div>
          </TabsContent>
        </Tabs>

        {/* BOTTOM LESSON NAVIGATION BAR */}
        <LessonNavigation
          prevLessonSlug={prevLessonSlug}
          prevLessonTitle={prevLessonTitle}
          nextLessonSlug={nextLessonSlug}
          nextLessonTitle={nextLessonTitle}
          onNavigatePrev={() => {
            if (prevLessonSlug) {
              navigate(`/learn/computer-skills/${prevLessonSlug}`);
            } else {
              navigate("/learn/computer-skills");
            }
          }}
          onNavigateNext={() => {
            markLessonComplete();
            if (nextLessonSlug) {
              navigate(`/learn/computer-skills/${nextLessonSlug}`);
            } else {
              setShowCompletionModal(true);
            }
          }}
          isFirstLesson={isFirstLesson}
          isLastLesson={isLastLesson}
        />

        {/* COMPLETION MODAL */}
        {showCompletionModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <Card className="max-w-lg w-full rounded-3xl p-8 bg-white dark:bg-slate-900 border-2 border-orange-500 text-center space-y-6 shadow-2xl">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20">
                <Award size={44} className="animate-bounce" />
              </div>

              <div className="space-y-2">
                <Badge className="bg-orange-500 text-white font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
                  Module Completed Successfully
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  Congratulations! 🎓
                </h3>
                <p className="text-sm sm:text-base font-bold text-orange-600 dark:text-orange-400 font-nepali">
                  बधाई छ! तपाईंले {moduleTitleNe} सफलतापूर्वक पूरा गर्नुभयो।
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  You have mastered all {totalInModule} lessons in {moduleTitleEn}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 text-sm font-extrabold text-orange-900 dark:text-orange-200">
                Badge Earned: "{isMod3 ? "File & Data Management Specialist 🗂️" : isMod2 ? "Computer Operator Specialist ⚡" : "Computer Fundamentals Graduate 🎓"}"
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={() => {
                    setShowCompletionModal(false);
                    const currentModId = isMod3 ? "mod3" : isMod2 ? "mod2" : "mod1";
                    navigate(`/learn/computer-skills/module/${currentModId}`);
                  }}
                  variant="outline"
                  className="flex-1 rounded-2xl text-xs sm:text-sm font-bold py-5 border-gray-300 dark:border-slate-700"
                >
                  Review Module
                </Button>
                <Button
                  onClick={() => {
                    setShowCompletionModal(false);
                    const nextModId = isMod3 ? "mod4" : isMod2 ? "mod3" : "mod2";
                    navigate(`/learn/computer-skills/module/${nextModId}`);
                  }}
                  className="flex-1 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-5 shadow-xs"
                >
                  Next Module →
                </Button>
              </div>
            </Card>
          </div>
        )}

      </article>
    </LearningLayout>
  );
};

export default ComputerFundamentalsLesson;
