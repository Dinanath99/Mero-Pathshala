import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { learningPathsData } from "./learningPathsData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Sparkles,
  Award,
  RotateCcw,
  Copy,
  Check,
  HelpCircle,
  Code2,
  CheckCircle
} from "lucide-react";
import SEO from "@/components/SEO";
import { KeyConceptCard, ImportantNoteCard, TipCard, WarningCard, ExampleCard } from "@/components/lesson/LessonCallouts";
import { LessonCodeBlock } from "@/components/lesson/LessonCodeBlock";

const LearningPathLesson = () => {
  const { pathId, moduleSlug } = useParams();
  const navigate = useNavigate();

  const pathKey = (pathId || "student").toLowerCase();
  const currentPath = learningPathsData[pathKey] || learningPathsData.student;

  const currentModule = currentPath.modules?.find((m) => m.slug === moduleSlug) || currentPath.modules[0];
  const currentIndex = currentPath.modules?.findIndex((m) => m.slug === moduleSlug) || 0;

  const nextModule = currentPath.modules[currentIndex + 1];
  const prevModule = currentPath.modules[currentIndex - 1];

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  useEffect(() => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [moduleSlug]);

  const handleOptionSelect = (qIdx, optIdx) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const markModuleComplete = () => {
    const saved = localStorage.getItem(`path_progress_${currentPath.id}`);
    let arr = [];
    if (saved) {
      try {
        arr = JSON.parse(saved);
      } catch (e) {
        arr = [];
      }
    }
    if (!arr.includes(currentModule.id)) {
      arr.push(currentModule.id);
      localStorage.setItem(`path_progress_${currentPath.id}`, JSON.stringify(arr));
    }
  };

  const handleQuizSubmit = () => {
    setIsQuizSubmitted(true);
    markModuleComplete();
  };

  const handleCopyPractice = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-[#020817] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <SEO title={`${currentModule.title} — ${currentPath.titleEn}`} />

      {/* Navigation Bar Header */}
      <div className="max-w-[1100px] mx-auto mb-8 flex items-center justify-between">
        <Button
          onClick={() => navigate(`/learn/path/${currentPath.id}`)}
          variant="ghost"
          className="rounded-full text-xs font-extrabold text-gray-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to {currentPath.role} Path
        </Button>

        <Badge className={`${currentPath.badgeColor} text-xs px-3.5 py-1.5 font-bold rounded-full`}>
          Lesson {currentIndex + 1} of {currentPath.modules.length}
        </Badge>
      </div>

      {/* Main Reading Workspace (850px-950px reading column) */}
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Lesson Reading Content Container */}
        <main className="flex-1 w-full max-w-[880px] mx-auto space-y-10">
          
          {/* Lesson Hero Banner */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-sm space-y-4 relative overflow-hidden">
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
              <span className="flex items-center gap-1.5 text-orange-500">
                <Clock size={14} /> {currentModule.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-300">
                <BookOpen size={14} /> {currentModule.level}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              {currentModule.title}
            </h1>

            {currentModule.subtitle && (
              <p className="text-lg sm:text-xl font-bold text-orange-500 font-serif leading-relaxed">
                {currentModule.subtitle}
              </p>
            )}
          </div>

          {/* Core Content Blocks */}
          <article className="space-y-8">
            {currentModule.content?.map((block, idx) => (
              <React.Fragment key={idx}>
                {block.type === "heading" && (
                  <div className="pt-6 pb-2 space-y-1 border-b border-gray-200/60 dark:border-slate-800">
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{block.text}</h2>
                    {block.textNe && <h3 className="text-sm font-bold text-orange-500 font-serif">{block.textNe}</h3>}
                  </div>
                )}

                {block.type === "paragraph" && (
                  <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-7 sm:p-9 shadow-sm transition-all duration-300 ease-out hover:scale-[0.98] hover:shadow-md space-y-3">
                    <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed font-normal">{block.text}</p>
                    {block.textNe && (
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-serif leading-relaxed italic pt-1 border-t border-gray-100 dark:border-slate-800/60">
                        {block.textNe}
                      </p>
                    )}
                  </div>
                )}

                {block.type === "highlight" && (
                  <KeyConceptCard 
                    title="Key Takeaway" 
                    englishText={block.text} 
                    nepaliText={block.textNe} 
                  />
                )}
              </React.Fragment>
            ))}
          </article>

          {/* Real-World Examples */}
          {currentModule.examples?.length > 0 && (
            <section className="space-y-6">
              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2.5">
                <Sparkles className="text-orange-500" size={22} /> Practical Real-World Examples
              </h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {currentModule.examples.map((ex, i) => (
                  <ExampleCard key={i} title={ex.title} titleNe={ex.titleNe} englishText={ex.desc} />
                ))}
              </div>
            </section>
          )}

          {/* Hands-On Practice Task */}
          {currentModule.practice && (
            <section className="bg-slate-950 text-white rounded-3xl p-7 sm:p-9 border border-purple-500/30 shadow-xl transition-all duration-300 ease-out hover:scale-[0.98] hover:shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <Badge className="bg-orange-500 text-white font-extrabold text-xs px-3 py-1">
                  Hands-On Practice Task
                </Badge>
                <Button
                  onClick={() => handleCopyPractice(currentModule.practice.action)}
                  size="sm"
                  variant="ghost"
                  className="text-xs text-orange-400 hover:text-white hover:bg-white/10 rounded-full"
                >
                  {copiedPrompt ? <Check size={14} className="mr-1.5 text-emerald-400" /> : <Copy size={14} className="mr-1.5" />}
                  {copiedPrompt ? "Copied!" : "Copy Prompt"}
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-extrabold text-white">{currentModule.practice.task}</h4>
                {currentModule.practice.taskNe && (
                  <p className="text-xs text-orange-400 font-serif font-bold">{currentModule.practice.taskNe}</p>
                )}
                <LessonCodeBlock code={currentModule.practice.action} language="prompt / instructions" title="Practice Prompt Action" />
              </div>
            </section>
          )}

          {/* Interactive Quiz Engine */}
          {currentModule.quiz?.length > 0 && (
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-7 sm:p-10 shadow-sm space-y-8">
              <div className="flex items-center justify-between border-b dark:border-slate-800 pb-5">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2.5">
                    <HelpCircle className="text-orange-500" /> Module Knowledge Quiz
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Test your understanding to earn path progress.</p>
                </div>
              </div>

              <div className="space-y-8">
                {currentModule.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="bg-slate-50/70 dark:bg-slate-800/40 rounded-3xl p-6 border border-gray-200/80 dark:border-slate-800 space-y-4">
                    <h4 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg">
                      {qIdx + 1}. {q.question}
                    </h4>

                    <div className="space-y-3">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[qIdx] === optIdx;
                        const isCorrect = optIdx === q.answer;

                        let btnClass = "w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all duration-200 flex items-center justify-between";
                        if (isQuizSubmitted) {
                          if (isCorrect) btnClass += " bg-emerald-500/10 text-emerald-600 border-emerald-500 font-bold";
                          else if (isSelected && !isCorrect) btnClass += " bg-red-500/10 text-red-500 border-red-500 font-bold";
                          else btnClass += " bg-white dark:bg-slate-900 text-gray-400 border-gray-200 dark:border-slate-800 opacity-60";
                        } else if (isSelected) {
                          btnClass += " bg-orange-500 text-white border-orange-500 font-extrabold shadow-sm";
                        } else {
                          btnClass += " bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-800 dark:text-gray-200 hover:border-orange-300 dark:hover:border-slate-600";
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleOptionSelect(qIdx, optIdx)}
                            className={btnClass}
                          >
                            <span>{opt}</span>
                            {isQuizSubmitted && isCorrect && <CheckCircle2 size={18} className="text-emerald-500 shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>

                    {isQuizSubmitted && (
                      <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-bold text-orange-600 dark:text-orange-400">Explanation: </span> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t dark:border-slate-800 flex items-center justify-between">
                {!isQuizSubmitted ? (
                  <Button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(selectedAnswers).length < currentModule.quiz.length}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-8 text-sm shadow-md"
                  >
                    Submit Answers & Complete Lesson
                  </Button>
                ) : (
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500 text-white text-xs font-bold py-1.5 px-4 rounded-full">
                      <Award size={14} className="mr-1.5 inline" /> Lesson Completed!
                    </Badge>
                    <Button
                      onClick={() => setIsQuizSubmitted(false)}
                      variant="outline"
                      className="rounded-full text-xs font-bold border-gray-300 dark:border-slate-800"
                    >
                      <RotateCcw size={14} className="mr-1.5" /> Retake Quiz
                    </Button>
                  </div>
                )}
              </div>
            </section>
          )}

          <Separator className="my-10 dark:bg-slate-800" />

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            {prevModule ? (
              <Button
                onClick={() => navigate(`/learn/path/${currentPath.id}/module/${prevModule.slug}`)}
                variant="outline"
                className="rounded-full text-xs font-bold border-gray-300 dark:border-slate-800"
              >
                <ArrowLeft size={16} className="mr-2" /> Previous: {prevModule.title}
              </Button>
            ) : <div />}

            {nextModule ? (
              <Button
                onClick={() => navigate(`/learn/path/${currentPath.id}/module/${nextModule.slug}`)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-8 text-xs shadow-md"
              >
                Next: {nextModule.title} <ChevronRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button
                onClick={() => navigate(`/learn/path/${currentPath.id}`)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-full px-8 text-xs shadow-md"
              >
                Return to Path Overview <CheckCircle2 size={16} className="ml-2" />
              </Button>
            )}
          </div>

        </main>

        {/* Sticky Sidebar Progress & Navigation */}
        <aside className="w-full lg:w-80 shrink-0 sticky top-28 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
            <h4 className="font-extrabold text-gray-900 dark:text-white text-base">Path Progress</h4>
            <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-orange-500 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${Math.round(((currentIndex + 1) / currentPath.modules.length) * 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-gray-500">
              <span>{Math.round(((currentIndex + 1) / currentPath.modules.length) * 100)}% Completed</span>
              <span>{currentIndex + 1} / {currentPath.modules.length} Modules</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
            <h4 className="font-black text-gray-900 dark:text-white text-sm flex items-center gap-2 border-b dark:border-slate-800 pb-3">
              <BookOpen size={18} className="text-orange-500" /> Module Syllabus
            </h4>

            <div className="space-y-2">
              {currentPath.modules.map((mod, idx) => {
                const isActive = mod.slug === currentModule.slug;
                return (
                  <button 
                    key={mod.id} 
                    onClick={() => navigate(`/learn/path/${currentPath.id}/module/${mod.slug}`)}
                    className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all ${
                      isActive 
                        ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30 font-bold' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className={`shrink-0 ${idx <= currentIndex ? 'text-emerald-500' : 'text-gray-300 dark:text-slate-600'}`}>
                      <CheckCircle size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-extrabold truncate">
                        {mod.title}
                      </p>
                      <span className="text-[10px] text-gray-400 font-medium">{mod.duration}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default LearningPathLesson;
