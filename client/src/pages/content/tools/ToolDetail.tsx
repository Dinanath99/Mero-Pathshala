import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetToolBySlugQuery, useGetCategoriesQuery } from "@/features/api/toolApi";
import { Helmet } from "react-helmet-async";
import {
  ExternalLink,
  Star,
  Globe,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Layers,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  Play,
  Languages,
  CheckSquare,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  Award,
  Zap,
  Target,
  Users,
  Code,
  Image as ImageIcon,
  MessageSquare,
  Mic,
  Search as SearchIcon,
  Cpu,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

const featureIcons: Record<string, any> = {
  Chat: MessageSquare,
  Coding: Code,
  Images: ImageIcon,
  Voice: Mic,
  Research: SearchIcon,
  Automation: Cpu,
};

const ToolDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetToolBySlugQuery(slug || "");
  const { data: categoryData } = useGetCategoriesQuery(undefined);

  // State management for learning interactive features
  const [langMode, setLangMode] = useState<"en" | "ne" | "both">("both");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarked_ai_tools") || "[]");
    if (slug && savedBookmarks.includes(slug)) {
      setIsBookmarked(true);
    }
  }, [slug]);

  const toggleBookmark = () => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarked_ai_tools") || "[]");
    let updated;
    if (isBookmarked) {
      updated = savedBookmarks.filter((s: string) => s !== slug);
      toast.info("Removed from saved AI Tools.");
    } else {
      updated = [...savedBookmarks, slug];
      toast.success("Saved to your AI Tools learning collection!");
    }
    localStorage.setItem("bookmarked_ai_tools", JSON.stringify(updated));
    setIsBookmarked(!isBookmarked);
  };

  const toggleStepCompletion = (stepNum: number) => {
    if (completedSteps.includes(stepNum)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepNum));
    } else {
      setCompletedSteps([...completedSteps, stepNum]);
      toast.success(`Completed Step ${stepNum}! Keep going! 🎉`);
    }
  };

  const handleCopyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleOptionSelect = (qIdx: number, optIdx: number) => {
    if (isQuizSubmitted) return;
    setUserAnswers({ ...userAnswers, [qIdx]: optIdx });
  };

  const handleQuizSubmit = (quizQuestions: any[]) => {
    if (Object.keys(userAnswers).length < quizQuestions.length) {
      toast.error("Please answer all quiz questions before submitting!");
      return;
    }

    let score = 0;
    quizQuestions.forEach((q, qIdx) => {
      const selectedOptIdx = userAnswers[qIdx];
      if (selectedOptIdx !== undefined && q.options[selectedOptIdx]?.isCorrect) {
        score += 1;
      }
    });

    setQuizScore(score);
    setIsQuizSubmitted(true);
    toast.success(`Quiz Completed! You scored ${score}/${quizQuestions.length}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4" />
        <p className="text-sm font-semibold text-gray-500">Loading AI Tool Learning Experience...</p>
      </div>
    );
  }

  if (isError || !data?.tool) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 text-center px-4">
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl">
          <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">AI Tool Module Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The requested learning module is unavailable or under maintenance.
          </p>
          <Button onClick={() => navigate("/ai-tools")} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
            Back to AI Tools Directory
          </Button>
        </div>
      </div>
    );
  }

  const tool = data.tool as any;
  const relatedTools = (data.relatedTools || []) as any[];

  // Calculate learning progress percentage
  const totalTutorialSteps = tool.tutorialSteps?.length || 5;
  const quizWeight = tool.quiz?.length > 0 ? 1 : 0;
  const totalItems = totalTutorialSteps + quizWeight;
  const completedItems = completedSteps.length + (isQuizSubmitted ? 1 : 0);
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>{tool.seoTitle || `${tool.name} - Complete Tutorial & Review | AI Guru Nepal`}</title>
        <meta
          name="description"
          content={tool.seoDescription || `Master ${tool.name} with step-by-step bilingual tutorials, real-world Nepal use cases, interactive exercises, and quizzes.`}
        />
      </Helmet>

      {/* Top Bar: Navigation & Language Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate("/ai-tools")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft size={16} /> Back to AI Tools Directory
        </button>

        {/* Bilingual Language Switcher */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-full border border-gray-200 dark:border-slate-800 shadow-sm self-start sm:self-auto">
          <span className="text-xs font-bold text-gray-400 px-2 flex items-center gap-1">
            <Languages size={14} /> Language:
          </span>
          <button
            onClick={() => setLangMode("both")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
              langMode === "both"
                ? "bg-orange-500 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-orange-500"
            }`}
          >
            Both (द्विभाषिक)
          </button>
          <button
            onClick={() => setLangMode("en")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
              langMode === "en"
                ? "bg-orange-500 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-orange-500"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLangMode("ne")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
              langMode === "ne"
                ? "bg-orange-500 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-orange-500"
            }`}
          >
            नेपाली
          </button>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-lg overflow-hidden relative">
          {tool.coverImage ? (
            <div className="h-64 sm:h-80 w-full overflow-hidden relative bg-slate-900">
              <img
                src={tool.coverImage}
                alt={tool.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            </div>
          ) : (
            <div className="h-40 w-full bg-gradient-to-r from-orange-500/20 via-pink-500/10 to-purple-500/20" />
          )}

          <div className="p-6 sm:p-10 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-16 sm:-mt-24 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white dark:border-slate-900 shadow-2xl bg-white"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs font-bold border-orange-500/30 text-orange-500">
                      {typeof tool.category === "object" ? tool.category?.name : (tool.category || "AI Tool")}
                    </Badge>
                    <Badge
                      className={
                        tool.pricingType === "Free"
                          ? "bg-emerald-500 text-white"
                          : tool.pricingType === "Freemium"
                          ? "bg-blue-500 text-white"
                          : tool.pricingType === "Free Trial"
                          ? "bg-purple-500 text-white"
                          : "bg-amber-500 text-white"
                      }
                    >
                      {tool.pricingType}
                    </Badge>
                    {tool.featured && (
                      <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs">
                        <Star size={12} className="fill-amber-500 mr-1" /> Featured Tool
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {tool.name}
                  </h1>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button
                  variant="outline"
                  onClick={toggleBookmark}
                  className={`rounded-full py-6 border-gray-300 dark:border-slate-700 ${
                    isBookmarked ? "text-orange-500 border-orange-500 bg-orange-50 dark:bg-orange-950/30" : ""
                  }`}
                >
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck className="mr-2 fill-orange-500" size={18} /> Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="mr-2" size={18} /> Save Tool
                    </>
                  )}
                </Button>

                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-initial"
                >
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold px-8 py-6 rounded-full shadow-lg hover:shadow-orange-500/30 transition-all text-base flex items-center justify-center gap-2">
                    Official Website <ExternalLink size={18} />
                  </Button>
                </a>
              </div>
            </div>

            {/* Tagline */}
            {tool.tagline && (
              <p className="text-xl text-gray-700 dark:text-gray-200 font-semibold mb-6">
                {tool.tagline}
              </p>
            )}

            {/* Interactive Progress Indicator Bar */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-gray-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="flex items-center gap-1.5 text-orange-500 uppercase tracking-wider">
                  <Award size={16} /> Mini-Course Progress
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {progressPercent}% Completed ({completedItems}/{totalItems} steps)
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-pink-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Full Mini-Course Modules */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Module 1: Introduction (Bilingual) */}
          <section id="introduction" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-2xl font-extrabold dark:text-white flex items-center gap-2.5">
              <BookOpen className="text-orange-500" size={26} /> 1. What is {tool.name}? (परिचय)
            </h2>
            <div className="space-y-4">
              {(langMode === "en" || langMode === "both") && (
                <div className="p-4 bg-gray-50 dark:bg-slate-800/40 rounded-2xl border-l-4 border-orange-500 text-gray-700 dark:text-gray-200 leading-relaxed text-base">
                  <span className="text-xs font-bold uppercase text-orange-500 block mb-1">English Explanation</span>
                  {tool.description}
                </div>
              )}
              {(langMode === "ne" || langMode === "both") && tool.descriptionNe && (
                <div className="p-4 bg-orange-50/50 dark:bg-orange-950/20 rounded-2xl border-l-4 border-pink-500 text-gray-800 dark:text-gray-200 leading-relaxed text-base font-medium">
                  <span className="text-xs font-bold uppercase text-pink-500 block mb-1">नेपाली विवरण (Nepali Explanation)</span>
                  {tool.descriptionNe}
                </div>
              )}
            </div>
          </section>

          {/* Module 2: Learning Objectives */}
          {tool.learningObjectives && tool.learningObjectives.length > 0 && (
            <section id="objectives" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold dark:text-white mb-6 flex items-center gap-2.5">
                <Target className="text-emerald-500" size={26} /> 2. Learning Objectives (सिकाइका लक्ष्यहरू)
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {tool.learningObjectives.map((obj: any, idx: number) => (
                  <div key={idx} className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 flex gap-3 items-start">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20} />
                    <div className="space-y-1">
                      {(langMode === "en" || langMode === "both") && (
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{obj.en}</p>
                      )}
                      {(langMode === "ne" || langMode === "both") && obj.ne && (
                        <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">{obj.ne}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Module 3: Key Features Icon Cards */}
          {tool.features && tool.features.length > 0 && (
            <section id="features" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold dark:text-white mb-6 flex items-center gap-2.5">
                <Zap className="text-amber-500" size={26} /> 3. Key Capabilities & Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {tool.features.map((feat: string, idx: number) => {
                  const IconComp = featureIcons[feat] || CheckCircle2;
                  return (
                    <div
                      key={idx}
                      className="p-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-orange-500 transition-colors text-center flex flex-col items-center justify-center gap-2 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComp size={24} />
                      </div>
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{feat}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Module 4: Step-by-Step Tutorial Timeline */}
          {tool.tutorialSteps && tool.tutorialSteps.length > 0 && (
            <section id="tutorial" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold dark:text-white flex items-center gap-2.5">
                    <Play className="text-orange-500 fill-orange-500" size={24} /> 4. Step-by-Step Beginner Tutorial
                  </h2>
                  <p className="text-xs text-gray-500 font-semibold mt-1">चरणबद्ध सिकाई मार्गनिर्देशन</p>
                </div>
                <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-full">
                  {completedSteps.length}/{tool.tutorialSteps.length} Steps Completed
                </span>
              </div>

              <div className="space-y-6">
                {tool.tutorialSteps.map((step: any) => {
                  const isDone = completedSteps.includes(step.stepNumber);
                  return (
                    <div
                      key={step.stepNumber}
                      className={`p-6 rounded-2xl border transition-all duration-300 ${
                        isDone
                          ? "bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-300 dark:border-emerald-800/50"
                          : "bg-gray-50 dark:bg-slate-800/40 border-gray-200 dark:border-slate-800"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white ${isDone ? "bg-emerald-500" : "bg-orange-500"}`}>
                            {step.stepNumber}
                          </span>
                          <div>
                            {(langMode === "en" || langMode === "both") && (
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{step.titleEn}</h3>
                            )}
                            {(langMode === "ne" || langMode === "both") && step.titleNe && (
                              <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400">{step.titleNe}</h4>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => toggleStepCompletion(step.stepNumber)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                            isDone
                              ? "bg-emerald-500 text-white"
                              : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-500 hover:text-white"
                          }`}
                        >
                          <CheckSquare size={14} /> {isDone ? "Completed ✓" : "Mark as Done"}
                        </button>
                      </div>

                      <div className="space-y-2 pl-11">
                        {(langMode === "en" || langMode === "both") && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{step.descEn}</p>
                        )}
                        {(langMode === "ne" || langMode === "both") && step.descNe && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{step.descNe}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Module 5: Real-Life Use Cases (Nepal & Global) */}
          {tool.useCases && tool.useCases.length > 0 && (
            <section id="use-cases" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold dark:text-white mb-6 flex items-center gap-2.5">
                <Users className="text-purple-500" size={26} /> 5. Real-Life Use Cases (व्यावहारिक प्रयोगहरू)
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {tool.useCases.map((uc: any, idx: number) => (
                  <div key={idx} className="p-5 bg-gray-50 dark:bg-slate-800/40 rounded-2xl border border-gray-200 dark:border-slate-800 space-y-2">
                    <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20 text-xs">
                      For {uc.role}
                    </Badge>
                    <h3 className="font-bold text-base dark:text-white">{uc.titleEn}</h3>
                    {uc.titleNe && <h4 className="text-xs font-semibold text-purple-500">{uc.titleNe}</h4>}
                    <div className="pt-2 border-t dark:border-slate-800 space-y-1">
                      {(langMode === "en" || langMode === "both") && (
                        <p className="text-xs text-gray-600 dark:text-gray-300">💡 {uc.exampleEn}</p>
                      )}
                      {(langMode === "ne" || langMode === "both") && uc.exampleNe && (
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">🇳🇵 {uc.exampleNe}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Module 6: Interactive Practice & Prompt Playground */}
          {tool.practiceExercises && tool.practiceExercises.length > 0 && (
            <section id="practice" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-2xl font-extrabold dark:text-white flex items-center gap-2.5">
                <Sparkles className="text-orange-500" size={26} /> 6. Interactive Practice & Prompt Templates
              </h2>
              <div className="space-y-4">
                {tool.practiceExercises.map((ex: any, idx: number) => (
                  <div key={idx} className="p-6 bg-gradient-to-r from-orange-500/5 via-pink-500/5 to-transparent rounded-2xl border border-orange-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base dark:text-white">{ex.titleEn}</h3>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyPrompt(ex.promptTemplate, idx)}
                        className="rounded-full text-xs font-bold border-orange-500/30 text-orange-500"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check size={14} className="mr-1 text-emerald-500" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={14} className="mr-1" /> Copy Prompt
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
                      {ex.promptTemplate}
                    </div>

                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {(langMode === "en" || langMode === "both") && <p>👉 {ex.instructionsEn}</p>}
                      {(langMode === "ne" || langMode === "both") && ex.instructionsNe && (
                        <p className="font-medium text-gray-500 mt-1">👉 {ex.instructionsNe}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Module 7: Screenshots Lightbox */}
          {tool.screenshots && tool.screenshots.length > 0 && (
            <section id="screenshots" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold dark:text-white mb-6 flex items-center gap-2.5">
                <Layers className="text-blue-500" size={26} /> 7. Interface & Platform Screenshots
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {tool.screenshots.map((src: string, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(src)}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer border border-gray-200 dark:border-slate-800 aspect-video bg-slate-900 shadow-sm hover:shadow-md"
                  >
                    <img
                      src={src}
                      alt={`Screenshot ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                      Click to Enlarge
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Module 8: Embedded Video Tutorial */}
          {tool.videoUrl && (
            <section id="video" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold dark:text-white mb-6 flex items-center gap-2.5">
                <Play className="text-red-500 fill-red-500" size={24} /> 8. Video Tutorial
              </h2>
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-gray-200 dark:border-slate-800">
                <iframe
                  src={tool.videoUrl.replace("watch?v=", "embed/")}
                  title={`${tool.name} Video Tutorial`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {/* Module 9: Tips & Best Practices (Do's & Don'ts) */}
          {tool.bestPractices && (
            <section id="best-practices" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold dark:text-white mb-6 flex items-center gap-2.5">
                <Lightbulb className="text-amber-500" size={26} /> 9. Tips & Best Practices (उत्कृष्ट अभ्यासहरू)
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Do's */}
                <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 space-y-3">
                  <h3 className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 size={18} /> DO's (सकारात्‍मक अभ्यासहरू)
                  </h3>
                  <ul className="space-y-2">
                    {tool.bestPractices.dos?.map((item: any, idx: number) => (
                      <li key={idx} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <div>
                          {(langMode === "en" || langMode === "both") && <p>{item.en}</p>}
                          {(langMode === "ne" || langMode === "both") && item.ne && <p className="text-gray-500 font-medium">{item.ne}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Don'ts */}
                <div className="p-5 bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/50 space-y-3">
                  <h3 className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                    <XCircle size={18} /> DON'TS (नगर्नुहोस्)
                  </h3>
                  <ul className="space-y-2">
                    {tool.bestPractices.donts?.map((item: any, idx: number) => (
                      <li key={idx} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <div>
                          {(langMode === "en" || langMode === "both") && <p>{item.en}</p>}
                          {(langMode === "ne" || langMode === "both") && item.ne && <p className="text-gray-500 font-medium">{item.ne}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Module 10: Common Mistakes & Better Alternatives */}
          {tool.commonMistakes && tool.commonMistakes.length > 0 && (
            <section id="mistakes" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold dark:text-white mb-6 flex items-center gap-2.5">
                <AlertTriangle className="text-amber-500" size={26} /> 10. Common Mistakes & Solutions
              </h2>
              <div className="space-y-4">
                {tool.commonMistakes.map((m: any, idx: number) => (
                  <div key={idx} className="p-5 bg-gray-50 dark:bg-slate-800/40 rounded-2xl border border-gray-200 dark:border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-rose-500 flex items-center gap-1">
                      ❌ Common Mistake: {m.mistakeEn}
                    </p>
                    {m.mistakeNe && <p className="text-xs text-gray-500 font-medium">🇳🇵 {m.mistakeNe}</p>}
                    <div className="pt-2 border-t dark:border-slate-800">
                      <p className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                        ✅ Better Solution: {m.solutionEn}
                      </p>
                      {m.solutionNe && <p className="text-xs text-gray-500 font-medium mt-1">🇳🇵 {m.solutionNe}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Module 11: Advantages vs Limitations */}
          <section id="advantages-limitations" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-2xl font-extrabold dark:text-white flex items-center gap-2.5">
              <ShieldCheck className="text-blue-500" size={26} opacity={1} /> 11. Advantages & Limitations
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Advantages */}
              <div className="space-y-3">
                <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                  ✓ Core Advantages
                </h3>
                {tool.advantages?.map((adv: any, idx: number) => (
                  <div key={idx} className="p-4 bg-emerald-50/30 dark:bg-emerald-950/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
                    <p className="font-bold text-xs text-gray-900 dark:text-white">{adv.titleEn}</p>
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-1">{adv.descEn}</p>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              <div className="space-y-3">
                <h3 className="font-bold text-amber-600 dark:text-amber-400 text-base">
                  ⚠️ Known Limitations
                </h3>
                {tool.limitations?.map((lim: any, idx: number) => (
                  <div key={idx} className="p-4 bg-amber-50/30 dark:bg-amber-950/10 rounded-2xl border border-amber-100 dark:border-amber-900/40">
                    <p className="font-bold text-xs text-gray-900 dark:text-white">{lim.titleEn}</p>
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-1">{lim.descEn}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Module 12: Pricing Breakdown */}
          {tool.pricingTiers && tool.pricingTiers.length > 0 && (
            <section id="pricing" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold dark:text-white mb-6 flex items-center gap-2.5">
                <Globe className="text-orange-500" size={24} /> 12. Pricing Breakdown
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {tool.pricingTiers.map((tier: any, idx: number) => (
                  <div key={idx} className="p-6 bg-gray-50 dark:bg-slate-800/40 rounded-2xl border border-gray-200 dark:border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{tier.tierName}</h3>
                      <span className="font-extrabold text-orange-500">{tier.price}</span>
                    </div>
                    <ul className="space-y-1.5 pt-2 border-t dark:border-slate-800">
                      {tier.featuresEn?.map((f: string, fIdx: number) => (
                        <li key={fIdx} className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-500" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Module 13: Interactive Quiz Engine */}
          {tool.quiz && tool.quiz.length > 0 && (
            <section id="quiz" className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-2">
                    Interactive Knowledge Check
                  </Badge>
                  <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                    <Award className="text-orange-500" size={26} /> 13. Test Your Knowledge (प्रश्नोत्तरी)
                  </h2>
                </div>
                {isQuizSubmitted && (
                  <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-sm font-extrabold">
                    Score: {quizScore} / {tool.quiz.length}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {tool.quiz.map((q: any, qIdx: number) => (
                  <div key={qIdx} className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/60 space-y-4">
                    <p className="font-bold text-base text-slate-100">
                      Q{qIdx + 1}: {q.questionEn}
                    </p>
                    {q.questionNe && <p className="text-xs font-medium text-slate-400">🇳🇵 {q.questionNe}</p>}

                    <div className="space-y-2">
                      {q.options.map((opt: any, optIdx: number) => {
                        const isSelected = userAnswers[qIdx] === optIdx;
                        let optionStyle = "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700/50";

                        if (isQuizSubmitted) {
                          if (opt.isCorrect) {
                            optionStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                          } else if (isSelected && !opt.isCorrect) {
                            optionStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                          }
                        } else if (isSelected) {
                          optionStyle = "bg-orange-500/20 border-orange-500 text-orange-300 font-bold";
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleOptionSelect(qIdx, optIdx)}
                            className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt.textEn}</span>
                            {isQuizSubmitted && opt.isCorrect && (
                              <CheckCircle2 size={16} className="text-emerald-400" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {isQuizSubmitted && q.explanationEn && (
                      <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/50 text-xs text-slate-300">
                        <span className="font-bold text-orange-400 block mb-1">💡 Explanation:</span>
                        {q.explanationEn}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!isQuizSubmitted ? (
                <Button
                  onClick={() => handleQuizSubmit(tool.quiz)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-6 rounded-full text-base shadow-lg"
                >
                  Submit Quiz Answers
                </Button>
              ) : (
                <div className="text-center p-6 bg-slate-900 rounded-2xl border border-slate-800">
                  <h3 className="text-xl font-bold text-emerald-400 mb-1">Congratulations on Completing the Mini-Course! 🎉</h3>
                  <p className="text-xs text-slate-400 mb-4">You have successfully mastered {tool.name} basics.</p>
                  <Button onClick={() => navigate("/ai-tools")} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                    Explore Next AI Tool
                  </Button>
                </div>
              )}
            </section>
          )}

          {/* Module 14: Quick Summary & Takeaways */}
          {tool.summary && (
            <section id="summary" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-2xl font-extrabold dark:text-white flex items-center gap-2.5">
                <CheckSquare className="text-emerald-500" size={26} /> 14. Quick Summary (सारांश)
              </h2>
              <div className="space-y-3">
                {tool.summary.takeawaysEn?.map((takeaway: string, idx: number) => (
                  <div key={idx} className="p-4 bg-gray-50 dark:bg-slate-800/40 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                    <div>
                      {(langMode === "en" || langMode === "both") && (
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{takeaway}</p>
                      )}
                      {(langMode === "ne" || langMode === "both") && tool.summary.takeawaysNe?.[idx] && (
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">🇳🇵 {tool.summary.takeawaysNe[idx]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Module 15: FAQ Section */}
          {tool.faq && tool.faq.length > 0 && (
            <section id="faq" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold dark:text-white mb-6 flex items-center gap-2.5">
                <HelpCircle className="text-orange-500" size={26} /> 15. Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {tool.faq.map((item: any, idx: number) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left font-bold dark:text-white flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <span>{item.question}</span>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-sm text-gray-600 dark:text-gray-300 border-t dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/30">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </div>

        {/* Right Sticky Educational Sidebar */}
        <div className="space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* Sidebar Module Progress Box */}
            <Card className="border dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-base dark:text-white flex items-center gap-2">
                  <Award className="text-orange-500" size={20} /> Learning Progress
                </h3>
                <div className="w-full bg-gray-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                  {progressPercent}% Complete • {completedItems}/{totalItems} items finished
                </p>
              </CardContent>
            </Card>

            {/* Table of Contents Scroll-Spy */}
            <Card className="border dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
              <div className="p-5 border-b dark:border-slate-800 font-bold text-sm dark:text-white flex items-center gap-2">
                <BookOpen size={16} className="text-orange-500" /> Module Contents
              </div>
              <CardContent className="p-4 space-y-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                <a href="#introduction" className="block hover:text-orange-500 transition-colors">1. Overview & Introduction</a>
                <a href="#objectives" className="block hover:text-orange-500 transition-colors">2. Learning Objectives</a>
                <a href="#features" className="block hover:text-orange-500 transition-colors">3. Key Capabilities</a>
                <a href="#tutorial" className="block hover:text-orange-500 transition-colors">4. Step-by-Step Tutorial</a>
                <a href="#use-cases" className="block hover:text-orange-500 transition-colors">5. Real-Life Use Cases</a>
                <a href="#practice" className="block hover:text-orange-500 transition-colors">6. Interactive Practice</a>
                <a href="#screenshots" className="block hover:text-orange-500 transition-colors">7. Interface Screenshots</a>
                <a href="#best-practices" className="block hover:text-orange-500 transition-colors">8. Tips & Best Practices</a>
                <a href="#mistakes" className="block hover:text-orange-500 transition-colors">9. Common Mistakes</a>
                <a href="#quiz" className="block hover:text-orange-500 transition-colors">10. Interactive Quiz</a>
              </CardContent>
            </Card>

            {/* Related Courses */}
            {tool.relatedCourses && tool.relatedCourses.length > 0 && (
              <Card className="border dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                <div className="p-5 border-b dark:border-slate-800 font-bold text-sm dark:text-white flex items-center gap-2">
                  <GraduationCap size={16} className="text-orange-500" /> Master with Premium Courses
                </div>
                <CardContent className="p-4 space-y-3">
                  {tool.relatedCourses.map((course: any) => (
                    <Link
                      key={course._id}
                      to={`/course-detail/${course._id}`}
                      className="group flex gap-3 items-center p-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold group-hover:text-orange-500 transition-colors line-clamp-1 dark:text-white">
                          {course.courseTitle}
                        </p>
                        <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                          Rs. {course.coursePrice}
                        </p>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Similar AI Tools */}
            {relatedTools.length > 0 && (
              <Card className="border dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                <div className="p-5 border-b dark:border-slate-800 font-bold text-sm dark:text-white">
                  Similar Tools in {typeof tool.category === "object" ? tool.category?.name : (tool.category || "AI Tool")}
                </div>
                <CardContent className="p-4 space-y-3">
                  {relatedTools.map((rel: any) => (
                    <Link
                      key={rel._id}
                      to={`/ai-tools/${rel.slug}`}
                      className="group flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <img
                        src={rel.logo}
                        alt={rel.name}
                        className="w-10 h-10 rounded-xl object-cover border border-gray-100 dark:border-slate-800"
                      />
                      <div>
                        <p className="text-xs font-bold group-hover:text-orange-500 transition-colors dark:text-white">
                          {rel.name}
                        </p>
                        <p className="text-[11px] text-gray-500 line-clamp-1">
                          {rel.tagline || (typeof rel.category === "object" ? rel.category?.name : rel.category)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Screenshot Lightbox Dialog */}
      <Dialog open={Boolean(selectedImage)} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-2 bg-slate-950 border-none">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Screenshot Preview"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ToolDetail;
