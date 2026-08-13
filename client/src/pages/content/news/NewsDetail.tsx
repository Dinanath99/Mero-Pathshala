import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetNewsBySlugQuery } from "@/features/api/newsApi";
import { Helmet } from "react-helmet-async";
import {
  Calendar,
  Clock,
  Share2,
  CheckCircle2,
  Lightbulb,
  Globe,
  Sparkles,
  GraduationCap,
  ChevronRight,
  Check,
  Flag,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const NewsDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetNewsBySlugQuery(slug || "");

  const [copied, setCopied] = useState(false);
  const [langMode, setLangMode] = useState<"en" | "ne" | "both">("both");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4" />
        <p className="text-sm font-semibold text-gray-500">Loading AI News Article...</p>
      </div>
    );
  }

  if (isError || !(data as any)?.news) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 text-center px-4">
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl">
          <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
          <p className="text-gray-500 mb-6">The requested news story is unavailable or has been archived.</p>
          <Button onClick={() => navigate("/news")} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
            Back to AI News Hub
          </Button>
        </div>
      </div>
    );
  }

  const article = (data as any).news;
  const similarNews = ((data as any).relatedNews || []) as any[];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.subtitle || article.whyItMattersEn,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>{article.seoTitle || `${article.title} - AI News Hub | AI Guru Nepal`}</title>
        <meta name="description" content={article.seoDescription || article.subtitle || article.whyItMattersEn} />
      </Helmet>

      {/* Top Sticky Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Breadcrumb Bar & Language Switcher */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={12} />
          <Link to="/news" className="hover:text-blue-600">AI News</Link>
          <ChevronRight size={12} />
          <span className="text-gray-900 dark:text-white truncate max-w-[200px]">{article.title}</span>
        </div>

        {/* Bilingual Switcher */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-full border border-gray-200 dark:border-slate-800 shadow-sm self-start sm:self-auto">
          <span className="text-xs font-bold text-gray-400 px-2 flex items-center gap-1">
            <Languages size={14} /> Language:
          </span>
          <button
            onClick={() => setLangMode("both")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
              langMode === "both" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 dark:text-gray-400"
            }`}
          >
            Both (द्विभाषिक)
          </button>
          <button
            onClick={() => setLangMode("en")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
              langMode === "en" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 dark:text-gray-400"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLangMode("ne")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
              langMode === "ne" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 dark:text-gray-400"
            }`}
          >
            नेपाली
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        <header className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-slate-800 shadow-sm space-y-6 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs font-bold border-blue-500/30 text-blue-600 dark:text-blue-400">
              {typeof article.category === "object" ? article.category?.name : (article.category || "AI News")}
            </Badge>
            {article.breakingNews && <Badge className="bg-red-600 text-white text-xs">Breaking News</Badge>}
            {article.featured && <Badge className="bg-purple-600 text-white text-xs">Featured Story</Badge>}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              {article.subtitle}
            </p>
          )}

          <div className="pt-4 border-t dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author?.avatar || "https://github.com/shadcn.png"}
                alt={article.author?.name}
                className="w-10 h-10 rounded-full border border-blue-500/30"
              />
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">{article.author?.name || "AI Guru Nepal Editorial Desk"}</p>
                <p className="text-[11px] text-gray-500">{article.author?.role || "Research Desk"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 font-semibold">
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {new Date(article.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {article.readingTime || "4 min read"}
              </span>
              <Button size="sm" variant="outline" onClick={handleShare} className="rounded-full text-xs font-bold">
                {copied ? <Check size={14} className="mr-1 text-emerald-500" /> : <Share2 size={14} className="mr-1" />}
                {copied ? "Copied!" : "Share"}
              </Button>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden mb-10 border border-gray-200 dark:border-slate-800 shadow-lg max-h-[500px]">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="mb-10 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 p-6 sm:p-8 rounded-3xl border border-blue-500/20 shadow-sm space-y-4">
            <h3 className="text-xl font-extrabold dark:text-white flex items-center gap-2">
              <Sparkles className="text-blue-600" size={22} /> Key Takeaways (मुख्य बुँदाहरू)
            </h3>
            <ul className="space-y-3">
              {article.keyTakeaways.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                  <CheckCircle2 className="text-blue-600 shrink-0 mt-1" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Why It Matters Box (Bilingual) */}
        {(article.whyItMattersEn || article.whyItMattersNe) && (
          <div className="mb-10 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-extrabold dark:text-white flex items-center gap-2">
              <Lightbulb className="text-amber-500" size={22} /> Why It Matters (यसको महत्त्व के छ?)
            </h3>
            <div className="space-y-4">
              {(langMode === "en" || langMode === "both") && article.whyItMattersEn && (
                <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border-l-4 border-amber-500 text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base font-medium">
                  <span className="text-xs font-bold uppercase text-amber-600 block mb-1">English Overview</span>
                  {article.whyItMattersEn}
                </div>
              )}
              {(langMode === "ne" || langMode === "both") && article.whyItMattersNe && (
                <div className="p-4 bg-orange-50/50 dark:bg-orange-950/20 rounded-2xl border-l-4 border-orange-500 text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base font-medium">
                  <span className="text-xs font-bold uppercase text-orange-600 block mb-1">नेपाली विश्लेषण (Nepali Insight)</span>
                  {article.whyItMattersNe}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Nepal Perspective */}
        {article.nepalPerspective && Object.values(article.nepalPerspective).some(Boolean) && (
          <div className="mb-10 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-extrabold dark:text-white flex items-center gap-2">
              <Flag className="text-red-500" size={22} /> Nepal Perspective (नेपालमा असर र सम्भावना)
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {article.nepalPerspective.students && (
                <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">🎓 For Students & Learners:</span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{article.nepalPerspective.students}</p>
                </div>
              )}
              {article.nepalPerspective.developers && (
                <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">💻 For Developers & Engineers:</span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{article.nepalPerspective.developers}</p>
                </div>
              )}
              {article.nepalPerspective.businesses && (
                <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 rounded-2xl border border-purple-100 dark:border-purple-900/40">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mb-1">💼 For Businesses & IT Firms:</span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{article.nepalPerspective.businesses}</p>
                </div>
              )}
              {article.nepalPerspective.teachers && (
                <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/40">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">📚 For Teachers & Schools:</span>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{article.nepalPerspective.teachers}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Body Content */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm mb-12">
          <div className="prose dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed whitespace-pre-line text-gray-800 dark:text-gray-200">
            {article.content}
          </div>
        </div>

        {/* Related AI Tools */}
        {article.relatedTools && article.relatedTools.length > 0 && (
          <div className="mb-10 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-extrabold dark:text-white flex items-center gap-2">
              <Sparkles className="text-orange-500" size={22} /> Mentioned & Related AI Tools
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {article.relatedTools.map((tool: any) => (
                <Link
                  key={tool._id}
                  to={`/ai-tools/${tool.slug}`}
                  className="group flex items-center gap-3 p-3 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-orange-500 transition-colors"
                >
                  <img src={tool.logo} alt={tool.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold group-hover:text-orange-500 transition-colors dark:text-white">{tool.name}</h4>
                    <span className="text-[10px] text-gray-500">{tool.pricingType || "AI Tool"}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Courses */}
        {article.relatedCourses && article.relatedCourses.length > 0 && (
          <div className="mb-10 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-extrabold dark:text-white flex items-center gap-2">
              <GraduationCap className="text-blue-600" size={22} /> Recommended AI Courses
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {article.relatedCourses.map((course: any) => (
                <Link
                  key={course._id}
                  to={`/course-detail/${course._id}`}
                  className="group flex items-center gap-4 p-3 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-blue-500 transition-colors"
                >
                  <img src={course.courseThumbnail} alt={course.courseTitle} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs font-bold group-hover:text-blue-600 transition-colors line-clamp-1 dark:text-white">{course.courseTitle}</h4>
                    <p className="text-[11px] text-emerald-600 font-bold mt-1">Rs. {course.coursePrice}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Similar News */}
        {similarNews.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold dark:text-white flex items-center gap-2">
              <Globe size={22} className="text-blue-600" /> Similar News Stories
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {similarNews.map((sim: any) => (
                <Link
                  key={sim._id}
                  to={`/news/${sim.slug}`}
                  className="group bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-blue-500 shadow-sm transition-all"
                >
                  <Badge variant="outline" className="text-[10px] mb-2 border-blue-500/30 text-blue-500">
                    {typeof sim.category === "object" ? sim.category?.name : (sim.category || "AI News")}
                  </Badge>
                  <h4 className="text-sm font-bold group-hover:text-blue-600 transition-colors line-clamp-2 dark:text-white">
                    {sim.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default NewsDetail;
