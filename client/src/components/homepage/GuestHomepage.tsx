import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Sparkles,
  BookOpen,
  Wrench,
  ChevronRight,
  ArrowRight,
  Search,
  Code,
  FileText,
  Compass,
  GraduationCap,
  Building,
  Palette,
  Rocket,
  CheckCircle2,
  HelpCircle,
  Laptop,
  Layers,
  Award,
  Zap,
  Newspaper,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { useGetFeaturedToolsQuery } from "@/features/api/toolApi";
import Course from "@/pages/student/Course";

interface GuestHomepageProps {
  data?: any;
  onLogClick?: (action: string, type: string, id: string) => void;
}

interface JourneyCard {
  id: string;
  role: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  hoverBorder: string;
  titleEn: string;
  titleNp: string;
  highlights: string[];
  link: string;
}

const GuestHomepage: React.FC<GuestHomepageProps> = ({ data, onLogClick }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Dynamic API Fetch
  const { data: publishedCoursesData } = useGetPublishedCourseQuery();
  const { data: featuredToolsData } = useGetFeaturedToolsQuery();

  const fallbackCourses = [
    {
      _id: "c1",
      courseTitle: "AI Basics for Beginners",
      subTitle: "Master foundational artificial intelligence concepts in simple terms.",
      category: "Beginner",
      coursePrice: "Free",
      courseThumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=60",
    },
    {
      _id: "c2",
      courseTitle: "ChatGPT & Prompt Engineering",
      subTitle: "Learn to command ChatGPT for writing, research, and daily work.",
      category: "Intermediate",
      coursePrice: "Free",
      courseThumbnail: "https://images.unsplash.com/photo-1684369175833-2a832c3f81e6?w=600&auto=format&fit=crop&q=60",
    },
    {
      _id: "c3",
      courseTitle: "AI Tools & Automation",
      subTitle: "Automate daily business workflows and office tasks using AI.",
      category: "Advanced",
      coursePrice: "499",
      courseThumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60",
    },
    {
      _id: "c4",
      courseTitle: "AI for Developers & LLMs",
      subTitle: "Build AI applications, integrate OpenAI APIs, and code faster.",
      category: "Advanced",
      coursePrice: "999",
      courseThumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60",
    },
  ];

  const fallbackTools = [
    {
      _id: "t1",
      name: "ChatGPT",
      slug: "chatgpt",
      tagline: "Conversational AI model for writing, analysis, coding, and problem solving.",
      pricingType: "Freemium",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    },
    {
      _id: "t2",
      name: "Midjourney",
      slug: "midjourney",
      tagline: "Generative AI visual creation from descriptive text prompts.",
      pricingType: "Paid",
      icon: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60",
    },
    {
      _id: "t3",
      name: "Claude AI",
      slug: "claude-ai",
      tagline: "Next-generation AI assistant for nuanced thinking, writing, and coding.",
      pricingType: "Freemium",
      icon: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=100&auto=format&fit=crop&q=60",
    },
    {
      _id: "t4",
      name: "Perplexity AI",
      slug: "perplexity-ai",
      tagline: "AI research engine with cited sources and fast accurate synthesis.",
      pricingType: "Free",
      icon: "https://images.unsplash.com/photo-1684369175833-2a832c3f81e6?w=100&auto=format&fit=crop&q=60",
    },
  ];

  const featuredTools = Array.isArray(featuredToolsData) && featuredToolsData.length
    ? featuredToolsData.slice(0, 4)
    : (featuredToolsData?.tools?.length ? featuredToolsData.tools.slice(0, 4) : fallbackTools);

  const displayCourses = (publishedCoursesData?.courses && publishedCoursesData.courses.length > 0)
    ? publishedCoursesData.courses
    : fallbackCourses;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/course/search?query=${encodeURIComponent(searchQuery)}`);
  };

  // Persona-based Learning Journeys
  const journeyCards: JourneyCard[] = [
    {
      id: "student",
      role: "Student",
      icon: GraduationCap,
      iconColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
      hoverBorder: "hover:border-blue-500",
      titleEn: "Study smarter with AI notes, homework help & research.",
      titleNp: "पढाइलाई प्रभावकारी बनाउनुहोस्",
      highlights: ["Smart Notes", "Exam Prep", "Paper Summary", "Presentations"],
      link: "/learn/path/student",
    },
    {
      id: "developer",
      role: "Developer",
      icon: Code,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-500/10",
      hoverBorder: "hover:border-indigo-500",
      titleEn: "Build full-stack AI apps, integrate APIs & use AI coding agents.",
      titleNp: "AI एप्स र कोडिङ सिक्नुहोस्",
      highlights: ["OpenAI APIs", "AI Copilot", "RAG Systems", "AI Agents"],
      link: "/learn/path/developer",
    },
    {
      id: "teacher",
      role: "Teacher",
      icon: BookOpen,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10",
      hoverBorder: "hover:border-emerald-500",
      titleEn: "Generate lesson plans, interactive quizzes & student handouts.",
      titleNp: "उत्कृष्ट शिक्षण सामग्री बनाउनुहोस्",
      highlights: ["Lesson Plans", "Quiz Generator", "Handouts", "Class AI"],
      link: "/learn/path/teacher",
    },
    {
      id: "business",
      role: "Business",
      icon: Building,
      iconColor: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
      hoverBorder: "hover:border-amber-500",
      titleEn: "Automate office workflows, customer support & marketing.",
      titleNp: "व्यवसाय र कार्यस्थलमा AI प्रयोग",
      highlights: ["Marketing Copy", "Chatbots", "Excel Automation", "Sales"],
      link: "/learn/path/business",
    },
    {
      id: "creator",
      role: "Creator",
      icon: Palette,
      iconColor: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-500/10",
      hoverBorder: "hover:border-pink-500",
      titleEn: "Craft viral YouTube scripts, generative art & social media reels.",
      titleNp: "भिडियो र फोटो कन्टेन्ट बनाउनुहोस्",
      highlights: ["Video Scripts", "Image Prompts", "Voiceovers", "Thumbnails"],
      link: "/learn/path/creator",
    },
    {
      id: "beginner",
      role: "Beginner",
      icon: Rocket,
      iconColor: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-500/10",
      hoverBorder: "hover:border-orange-500",
      titleEn: "Start from zero with friendly step-by-step guidance in Nepali.",
      titleNp: "कम्प्युटर तथा AI सुरुवाती पाठ",
      highlights: ["Computer Basics", "ChatGPT 101", "Copy-Paste Prompts", "Safety"],
      link: "/learn/computer-skills",
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. HERO SECTION */}
      <section className="pt-8 sm:pt-14 text-center space-y-8 max-w-4xl mx-auto">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 px-4 py-1.5 rounded-full text-xs font-bold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>AI Guru Nepal • Free & Open Learning Ecosystem</span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">
            Master Technology & AI <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
              Step-by-Step in Nepali
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-200 font-nepali pt-1">
            नेपालकै सरल तथा आधुनिक प्रविधि र AI सिकाइ प्लेटफर्म
          </p>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed pt-2">
            Structured modular lessons, bilingual computer fundamentals, prompt templates, and AI tools for students, teachers, and professionals.
          </p>
        </div>

        {/* CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => navigate("/learn/computer-skills")}
            className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-2xl px-7 py-6 text-sm shadow-md shadow-orange-500/20 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Laptop size={18} className="mr-2" /> Start Learning Free / सीप सिक्नुहोस्
          </Button>

          <Button
            onClick={() => navigate("/roadmaps")}
            variant="outline"
            className="border-gray-300 dark:border-slate-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-900 rounded-2xl px-7 py-6 text-sm font-bold transition-all cursor-pointer"
          >
            <Compass size={18} className="mr-2 text-blue-500" /> View Roadmaps / मार्गचित्र
          </Button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto w-full pt-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search computer lessons, AI tools, prompts... / खोज्नुहोस्..."
              className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-28 text-sm text-gray-900 dark:text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {/* Fast Track Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-gray-500">
          <span className="text-gray-400">Popular:</span>
          <Link to="/learn/computer-skills" className="hover:text-orange-600 hover:underline">💻 Computer Fundamentals</Link>
          <span>•</span>
          <Link to="/ai-tools" className="hover:text-orange-600 hover:underline">🛠️ AI Tools</Link>
          <span>•</span>
          <Link to="/prompt-library" className="hover:text-orange-600 hover:underline">✨ Prompt Library</Link>
          <span>•</span>
          <Link to="/cv-builder" className="hover:text-orange-600 hover:underline">📄 AI CV Builder</Link>
        </div>
      </section>

      {/* 2. CORE CURRICULUM HIGHLIGHT CARDS (Level 1, 2, 3) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-xs px-3 py-1 font-extrabold uppercase tracking-wider">
            Structured Pathways
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Learn from Foundations to Future AI
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-nepali">
            कम्प्युटरका आधारभूत सीपदेखि आधुनिक कृत्रिम बौद्धिकतासम्म
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Computer Skills */}
          <div
            onClick={() => navigate("/learn/computer-skills")}
            className="group relative bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Laptop size={26} />
              </div>
              <div className="space-y-1">
                <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-500/30 text-[10px] uppercase font-black">
                  12 Comprehensive Modules
                </Badge>
                <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Computer Skills (कम्प्युटर सीप)
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Master hardware, Windows OS, files & folders, typing, internet navigation, and office software step-by-step.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>Explore Curriculum</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: AI Basics & ChatGPT */}
          <div
            onClick={() => navigate("/learn/ai-basics")}
            className="group relative bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-amber-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles size={26} />
              </div>
              <div className="space-y-1">
                <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] uppercase font-black">
                  Interactive AI Lessons
                </Badge>
                <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  AI Basics & ChatGPT (कृत्रिम बौद्धिकता)
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Understand generative models, command ChatGPT with prompt engineering, and avoid common AI hallucination pitfalls.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
              <span>Start AI Lessons</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Guided Roadmaps */}
          <div
            onClick={() => navigate("/roadmaps")}
            className="group relative bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Compass size={26} />
              </div>
              <div className="space-y-1">
                <Badge variant="outline" className="text-orange-600 dark:text-orange-400 border-orange-500/30 text-[10px] uppercase font-black">
                  Guided Career Timelines
                </Badge>
                <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                  Learning Roadmaps (सिकाइ मार्गचित्र)
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Follow step-by-step career roadmaps tailored for developers, students, teachers, creators, and business leaders.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-orange-600 dark:text-orange-400">
              <span>View Roadmaps</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. PERSONA GUIDED PATHS (6 Personas) */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-xs px-3.5 py-1 font-black uppercase tracking-wider">
            Targeted Learning Tracks
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
            Choose Your Learning Journey
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400 font-nepali">
            आफ्नो सिकाइ यात्रा छान्नुहोस्
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 pt-1">
            Pick your current role or goal to access tailored resources, prompts, and tool recommendations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {journeyCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => navigate(card.link)}
                className={`group bg-white dark:bg-slate-900 p-7 rounded-3xl border border-gray-200 dark:border-slate-800 ${card.hoverBorder} shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-5`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-2xl ${card.bgColor} ${card.iconColor} group-hover:scale-105 transition-transform`}>
                      <Icon size={28} />
                    </div>
                    <Badge variant="outline" className="text-xs font-bold text-gray-500 dark:text-gray-400 border-gray-200 dark:border-slate-800 px-3 py-0.5">
                      {card.role}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                      {card.titleNp}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                      {card.titleEn}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-slate-800">
                    {card.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-slate-100 dark:bg-slate-800 group-hover:bg-orange-600 group-hover:text-white text-gray-900 dark:text-white font-bold rounded-xl text-xs transition-colors py-4 shadow-none"
                >
                  <span>Start Journey</span>
                  <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* Personalized Quiz CTA Banner */}
        <div className="relative bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <Badge className="bg-orange-600 text-white text-[11px] font-black uppercase tracking-wider">
              <HelpCircle size={13} className="mr-1 inline" /> Learning Advisor
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-black">
              Not sure where to begin? / कहाँबाट सुरु गर्ने?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Answer 3 quick questions and our interactive advisor will recommend the perfect learning pathway for you.
            </p>
          </div>

          <Button
            onClick={() => setIsQuizOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-2xl px-7 py-6 text-sm shrink-0 shadow-lg cursor-pointer"
          >
            Find My Path 🎯 <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* 4. FEATURED AI TOOLS SECTION */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="outline" className="text-purple-600 dark:text-purple-400 border-purple-500/30 text-xs font-black">
              AI Tools Directory
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Essential AI Productivity Tools
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Explore 50+ curated artificial intelligence tools with guides, tips, and Nepal use cases.
            </p>
          </div>

          <Button
            onClick={() => navigate("/ai-tools")}
            variant="outline"
            className="rounded-2xl text-xs font-bold border-gray-300 dark:border-slate-800 shrink-0"
          >
            View All AI Tools <ChevronRight size={14} className="ml-1" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map((tool: any) => (
            <div
              key={tool._id}
              onClick={() => navigate(`/ai-tools/${tool.slug}`)}
              className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 hover:border-purple-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 border border-purple-500/20 flex items-center justify-center overflow-hidden p-2 group-hover:scale-105 transition-transform">
                    {tool.icon ? (
                      <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain" />
                    ) : (
                      <Wrench size={22} />
                    )}
                  </div>
                  <Badge variant="outline" className="text-[11px] font-bold border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-0.5">
                    {tool.pricingType || "Freemium"}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                    {typeof tool.category === "object" ? tool.category?.name : (tool.category || "AI Tool")}
                  </span>
                  <h3 className="text-base font-black text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {tool.tagline || tool.description || "Leading AI productivity application."}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                <span>View Details</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FREE LEARNING ECOSYSTEM (Prompts, CV Maker, Blogs, News) */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-black">
            100% Free Resources
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Free Utilities & Knowledge Hub
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-nepali">
            नि:शुल्क प्रम्प्ट, CV मेकर, समाचार र लेखहरू
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Prompt Library */}
          <div
            onClick={() => navigate("/prompt-library")}
            className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-pink-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-pink-500/10 text-pink-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles size={22} />
              </div>
              <div>
                <h3 className="text-base font-black text-gray-900 dark:text-white group-hover:text-pink-600 transition-colors">
                  Prompt Library ✨
                </h3>
                <span className="text-[11px] font-bold text-gray-500 font-nepali">प्रम्प्ट पुस्तकालय</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                500+ tested prompts ready to copy and paste for study, work, coding, and business.
              </p>
            </div>
            <div className="text-xs font-bold text-pink-600 flex items-center justify-between pt-2 border-t dark:border-slate-800">
              <span>Browse Prompts</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* AI CV Builder */}
          <div
            onClick={() => navigate("/cv-builder")}
            className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="text-base font-black text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                  AI CV Builder 📄
                </h3>
                <span className="text-[11px] font-bold text-gray-500 font-nepali">बायोडाटा / CV मेकर</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Build ATS-friendly modern resumes with live A4 preview and instant PDF download.
              </p>
            </div>
            <div className="text-xs font-bold text-orange-600 flex items-center justify-between pt-2 border-t dark:border-slate-800">
              <span>Create Resume</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* AI News */}
          <div
            onClick={() => navigate("/news")}
            className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-red-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Newspaper size={22} />
              </div>
              <div>
                <h3 className="text-base font-black text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                  AI News Hub 📰
                </h3>
                <span className="text-[11px] font-bold text-gray-500 font-nepali">ताजा AI समाचार</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Stay updated with breaking breakthroughs, model releases, and Nepal technology news.
              </p>
            </div>
            <div className="text-xs font-bold text-red-600 flex items-center justify-between pt-2 border-t dark:border-slate-800">
              <span>Read Headlines</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Blogs */}
          <div
            onClick={() => navigate("/blogs")}
            className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen size={22} />
              </div>
              <div>
                <h3 className="text-base font-black text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  Insights & Blogs 📝
                </h3>
                <span className="text-[11px] font-bold text-gray-500 font-nepali">ब्लग तथा जानकारी</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                In-depth tutorials and real-world implementation guides written for practitioners.
              </p>
            </div>
            <div className="text-xs font-bold text-indigo-600 flex items-center justify-between pt-2 border-t dark:border-slate-800">
              <span>Read Articles</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTRUCTOR INVITATION CTA */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <Badge className="bg-orange-600 text-white text-xs font-bold">Teach on AI Guru Nepal</Badge>
          <h3 className="text-2xl sm:text-4xl font-black">Share Your Knowledge as an AI Instructor</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Join our teaching network to educate thousands of learners across Nepal and build your expert brand.
          </p>
        </div>

        <Button
          onClick={() => navigate("/become-an-instructor")}
          className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-2xl px-8 py-6 text-sm shrink-0 shadow-lg cursor-pointer"
        >
          Apply as Instructor <ArrowRight size={16} className="ml-2" />
        </Button>
      </section>

      {/* Interactive Recommendation Quiz Dialog */}
      <Dialog open={isQuizOpen} onOpenChange={setIsQuizOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-slate-800 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="text-orange-500" /> Find Your Learning Path
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
              What best describes your background or current goal? / तपाईंको भूमिका वा उद्देश्य के हो?
            </p>
            <div className="space-y-2">
              {[
                { label: "💻 Complete Beginner (कम्प्युटर सुरुवाती)", link: "/learn/computer-skills" },
                { label: "🤖 AI Basics & Prompting (AI र प्रम्प्टिङ)", link: "/learn/ai-basics" },
                { label: "🎓 Student (विद्यार्थी)", link: "/learn/path/student" },
                { label: "👨‍💻 Developer (डेभलपर)", link: "/learn/path/developer" },
                { label: "👩‍🏫 Teacher (शिक्षक)", link: "/learn/path/teacher" },
                { label: "💼 Business Owner (व्यवसायी)", link: "/learn/path/business" },
                { label: "🎨 Content Creator (कन्टेन्ट क्रिएटर)", link: "/learn/path/creator" },
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsQuizOpen(false);
                    navigate(opt.link);
                  }}
                  className="w-full text-left p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-xs font-bold text-gray-800 dark:text-gray-200 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>{opt.label}</span>
                  <ChevronRight size={15} className="text-orange-500" />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestHomepage;
