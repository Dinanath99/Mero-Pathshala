import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetPromptBySlugQuery, useIncrementPromptCopyMutation } from "@/features/api/promptApi";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  Share2,
  BookOpen,
  GraduationCap,
  Users,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  Target,
  Code,
  Briefcase,
  Video,
  Languages,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const roleIcons: Record<string, any> = {
  Students: GraduationCap,
  Developers: Code,
  Teachers: BookOpen,
  Freelancers: Zap,
  "Business Owners": Briefcase,
  "Content Creators": Video,
};

const PromptDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetPromptBySlugQuery(slug || "");
  const [incrementCopy] = useIncrementPromptCopyMutation();

  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [langMode, setLangMode] = useState<"en" | "ne" | "both">("both");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4" />
        <p className="text-sm font-semibold text-gray-500">Loading AI Prompt Module...</p>
      </div>
    );
  }

  if (isError || !data?.prompt) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 text-center px-4">
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl">
          <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Prompt Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The requested prompt is unavailable or has been archived.
          </p>
          <Button onClick={() => navigate("/prompts")} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
            Back to Prompt Library
          </Button>
        </div>
      </div>
    );
  }

  const prompt = data.prompt as any;
  const similarPrompts = ((data as any).relatedPrompts || (data as any).similarPrompts || []) as any[];

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.promptContent);
      setCopied(true);
      toast.success("Prompt copied to clipboard! Ready to paste into ChatGPT/Gemini.");
      await incrementCopy(prompt._id);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      toast.error("Failed to copy prompt.");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: prompt.title,
        text: prompt.englishDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Prompt URL copied to clipboard!");
    }
  };

  const isLongPrompt = (prompt.promptContent || "").length > 500;
  const displayedPrompt = isLongPrompt && !isExpanded ? prompt.promptContent.slice(0, 500) + "..." : prompt.promptContent;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>{prompt.seoTitle || `${prompt.title} - AI Prompt & Logic | AI Guru Nepal`}</title>
        <meta
          name="description"
          content={prompt.seoDescription || prompt.englishDescription}
        />
      </Helmet>

      {/* Top Bar: Navigation & Language Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate("/prompts")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Prompt Library
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
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="outline" className="text-xs font-bold border-orange-500/30 text-orange-500">
              {typeof prompt.category === "object" ? prompt.category?.name : (prompt.category || "Prompt")}
            </Badge>
            <Badge className="bg-emerald-500 text-white text-xs">Free Prompt</Badge>
            <Badge
              className={
                prompt.difficulty === "Beginner"
                  ? "bg-blue-500 text-white text-xs"
                  : prompt.difficulty === "Intermediate"
                  ? "bg-amber-500 text-white text-xs"
                  : "bg-purple-500 text-white text-xs"
              }
            >
              {prompt.difficulty} Level
            </Badge>
            {prompt.copiesCount > 0 && (
              <Badge variant="secondary" className="text-xs font-semibold">
                🔥 Copied {prompt.copiesCount} times
              </Badge>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            {prompt.title}
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              onClick={handleCopyPrompt}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold px-8 py-6 rounded-full shadow-lg hover:shadow-orange-500/30 transition-all text-base flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={20} className="text-white" /> Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy size={20} /> Copy Prompt Now
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleShare}
              className="rounded-full py-6 px-6 border-gray-300 dark:border-slate-700"
            >
              <Share2 size={18} className="mr-2" /> Share Prompt
            </Button>
          </div>
        </div>
      </section>

      {/* Main Educational Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Prompt Content & Learning Sections */}
        <div className="lg:col-span-2 space-y-10">

          {/* What This Prompt Does */}
          <section id="what-it-does" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-2xl font-extrabold dark:text-white flex items-center gap-2.5">
              <BookOpen className="text-orange-500" size={26} /> What This Prompt Does (यस प्रम्प्टको काम)
            </h2>
            <div className="space-y-4">
              {(langMode === "en" || langMode === "both") && (
                <div className="p-4 bg-gray-50 dark:bg-slate-800/40 rounded-2xl border-l-4 border-orange-500 text-gray-700 dark:text-gray-200 leading-relaxed text-base">
                  <span className="text-xs font-bold uppercase text-orange-500 block mb-1">English Explanation</span>
                  {prompt.englishDescription}
                </div>
              )}
              {(langMode === "ne" || langMode === "both") && prompt.nepaliDescription && (
                <div className="p-4 bg-orange-50/50 dark:bg-orange-950/20 rounded-2xl border-l-4 border-pink-500 text-gray-800 dark:text-gray-200 leading-relaxed text-base font-medium">
                  <span className="text-xs font-bold uppercase text-pink-500 block mb-1">नेपाली विवरण (Nepali Explanation)</span>
                  {prompt.nepaliDescription}
                </div>
              )}
            </div>
          </section>

          {/* Full Prompt Display Box */}
          <section id="full-prompt" className="bg-slate-900 text-slate-100 p-8 rounded-3xl border border-slate-800 shadow-xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400">
                <Code size={16} /> FULL PROMPT TEMPLATE
              </div>
              <Button
                size="sm"
                onClick={handleCopyPrompt}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs font-bold px-4"
              >
                {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>

            <pre className="font-mono text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-slate-200 overflow-x-auto">
              {displayedPrompt}
            </pre>

            {isLongPrompt && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-bold text-orange-400 hover:underline pt-2 inline-flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    Show Less <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    Expand Full Prompt <ChevronDown size={14} />
                  </>
                )}
              </button>
            )}
          </section>

          {/* Expected Output */}
          {(prompt.expectedOutputEn || prompt.expectedOutputNe) && (
            <section id="expected-output" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-2xl font-extrabold dark:text-white flex items-center gap-2.5">
                <Sparkles className="text-emerald-500" size={26} /> Expected AI Output Example
              </h2>
              <div className="p-5 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 space-y-3">
                {(langMode === "en" || langMode === "both") && prompt.expectedOutputEn && (
                  <div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Sample English Response:</span>
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-mono text-xs bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                      {prompt.expectedOutputEn}
                    </p>
                  </div>
                )}
                {(langMode === "ne" || langMode === "both") && prompt.expectedOutputNe && (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">नेपाली उदाहरण उत्तर:</span>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-medium bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                      {prompt.expectedOutputNe}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Best For Cards */}
          {prompt.bestFor && prompt.bestFor.length > 0 && (
            <section id="best-for" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold dark:text-white mb-6 flex items-center gap-2.5">
                <Users className="text-purple-500" size={26} /> Best Suitable For (को-को का लागि उपयोगी)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {prompt.bestFor.map((role: string, idx: number) => {
                  const IconComp = roleIcons[role] || CheckCircle2;
                  return (
                    <div
                      key={idx}
                      className="p-5 bg-purple-50/50 dark:bg-purple-950/20 rounded-2xl border border-purple-100 dark:border-purple-900/40 text-center flex flex-col items-center justify-center gap-2 group hover:border-purple-500 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComp size={24} />
                      </div>
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{role}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Prompt Breakdown (Prompt Engineering Logic) */}
          {prompt.promptBreakdown && prompt.promptBreakdown.length > 0 && (
            <section id="prompt-breakdown" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold dark:text-white flex items-center gap-2.5">
                  <Target className="text-orange-500" size={26} /> Why This Prompt Works (प्रम्प्ट इन्जिनियरिङ सिद्धान्त)
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                  Deconstructing the prompt architecture into Role, Task, Context, Output Format & Constraints.
                </p>
              </div>

              <div className="space-y-4">
                {prompt.promptBreakdown.map((item: any, idx: number) => (
                  <div key={idx} className="p-5 bg-gray-50 dark:bg-slate-800/40 rounded-2xl border border-gray-200 dark:border-slate-800 space-y-2">
                    <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-extrabold border border-orange-500/20 inline-block">
                      {item.sectionTitle}
                    </span>
                    {(langMode === "en" || langMode === "both") && (
                      <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{item.explanationEn}</p>
                    )}
                    {(langMode === "ne" || langMode === "both") && item.explanationNe && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">🇳🇵 {item.explanationNe}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Customization Tips */}
          {((prompt.customizationTipsEn && prompt.customizationTipsEn.length > 0) || (prompt.customizationTipsNe && prompt.customizationTipsNe.length > 0)) && (
            <section id="customization-tips" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold dark:text-white mb-6 flex items-center gap-2.5">
                <Lightbulb className="text-amber-500" size={26} /> How to Customize This Prompt (परिमार्जन गर्ने तरिका)
              </h2>
              <div className="space-y-3">
                {prompt.customizationTipsEn?.map((tip: string, idx: number) => (
                  <div key={idx} className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-900/40 flex items-start gap-3">
                    <CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={18} />
                    <div>
                      {(langMode === "en" || langMode === "both") && (
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{tip}</p>
                      )}
                      {(langMode === "ne" || langMode === "both") && prompt.customizationTipsNe?.[idx] && (
                        <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mt-1">🇳🇵 {prompt.customizationTipsNe[idx]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Practice Challenge */}
          {(prompt.practiceChallengeEn || prompt.practiceChallengeNe) && (
            <section id="practice-challenge" className="bg-gradient-to-r from-orange-500/10 via-pink-500/5 to-purple-500/10 p-8 rounded-3xl border border-orange-500/20 shadow-sm space-y-4">
              <h2 className="text-2xl font-extrabold dark:text-white flex items-center gap-2.5">
                <Award className="text-orange-500" size={26} /> Practice Challenge (अभ्यास चुनौती)
              </h2>
              <div className="space-y-2">
                {(langMode === "en" || langMode === "both") && prompt.practiceChallengeEn && (
                  <p className="text-sm font-bold text-gray-900 dark:text-white">👉 {prompt.practiceChallengeEn}</p>
                )}
                {(langMode === "ne" || langMode === "both") && prompt.practiceChallengeNe && (
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-300">👉 🇳🇵 {prompt.practiceChallengeNe}</p>
                )}
              </div>
            </section>
          )}

          {/* Bilingual FAQ */}
          {prompt.faq && prompt.faq.length > 0 && (
            <section id="faq" className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-extrabold dark:text-white mb-6 flex items-center gap-2.5">
                <HelpCircle className="text-orange-500" size={26} /> Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {prompt.faq.map((item: any, idx: number) => {
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

        {/* Right Sticky Sidebar */}
        <div className="space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* Related AI Tools */}
            {prompt.aiTools && prompt.aiTools.length > 0 && (
              <Card className="border dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                <div className="p-5 border-b dark:border-slate-800 font-bold text-sm dark:text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-orange-500" /> Compatible AI Tools
                </div>
                <CardContent className="p-4 space-y-3">
                  {prompt.aiTools.map((tool: any) => (
                    <Link
                      key={tool._id}
                      to={`/ai-tools/${tool.slug}`}
                      className="group flex items-center gap-3 p-2.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border border-gray-100 dark:border-slate-800"
                    >
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold group-hover:text-orange-500 transition-colors dark:text-white">
                          {tool.name}
                        </p>
                        <p className="text-[11px] text-gray-500 line-clamp-1">{tool.pricingType || "AI Tool"}</p>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Related Courses */}
            {prompt.relatedCourses && prompt.relatedCourses.length > 0 && (
              <Card className="border dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                <div className="p-5 border-b dark:border-slate-800 font-bold text-sm dark:text-white flex items-center gap-2">
                  <GraduationCap size={16} className="text-orange-500" /> Related Courses
                </div>
                <CardContent className="p-4 space-y-3">
                  {prompt.relatedCourses.map((course: any) => (
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

            {/* Similar Prompts */}
            {similarPrompts.length > 0 && (
              <Card className="border dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
                <div className="p-5 border-b dark:border-slate-800 font-bold text-sm dark:text-white flex items-center gap-2">
                  <Layers size={16} className="text-orange-500" /> Similar Prompts
                </div>
                <CardContent className="p-4 space-y-3">
                  {similarPrompts.map((sim: any) => (
                    <Link
                      key={sim._id}
                      to={`/prompts/${sim.slug}`}
                      className="group block p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border border-gray-100 dark:border-slate-800"
                    >
                      <p className="text-xs font-bold group-hover:text-orange-500 transition-colors dark:text-white line-clamp-1">
                        {sim.title}
                      </p>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {typeof sim.category === "object" ? sim.category?.name : (sim.category || "Prompt")}
                      </p>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetail;
