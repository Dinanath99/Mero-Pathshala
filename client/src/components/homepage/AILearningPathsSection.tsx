import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Laptop,
  Bot,
  MessageSquare,
  Sparkles,
  Wrench,
  Zap,
  Code,
  Palette,
  Building,
  Clock,
  BookOpen,
  ChevronRight,
  Search,
  HelpCircle,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PathItem {
  id: string;
  titleEn: string;
  titleNp: string;
  descEn: string;
  descNp: string;
  modules: number;
  time: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  isFree: boolean;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  link: string;
}

const AILearningPathsSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep] = useState(0);

  const learningPaths: PathItem[] = [
    {
      id: "computer-fundamentals",
      titleEn: "Computer Fundamentals",
      titleNp: "कम्प्युटरका आधारभूत ज्ञान 💻",
      descEn: "Hardware, software, CPU, RAM, storage, operating systems, and practical digital life skills in Nepal.",
      descNp: "कम्प्युटर के हो, यसका पार्टपुर्जा, सफ्टवेयर र दैनिक जीवनमा प्रयोग हुने सीप सरल तरिकाले सिक्नुहोस्।",
      modules: 12,
      time: "1.0 Hour",
      difficulty: "Beginner",
      isFree: true,
      icon: Laptop,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "hover:border-orange-500",
      link: "/learn/computer-skills",
    },
    {
      id: "ai-basics",
      titleEn: "AI Basics",
      titleNp: "AI को आधारभूत ज्ञान 🤖",
      descEn: "Fundamental concepts of artificial intelligence explained simply for absolute beginners.",
      descNp: "AI के हो र यसले कसरी काम गर्छ भन्ने कुरा नेपाली भाषामा सजिलै सिक्नुहोस्।",
      modules: 5,
      time: "1.5 Hours",
      difficulty: "Beginner",
      isFree: true,
      icon: Bot,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "hover:border-amber-500",
      link: "/learn/ai-basics",
    },
    {
      id: "chatgpt-mastery",
      titleEn: "ChatGPT Mastery",
      titleNp: "ChatGPT निपुणता 💬",
      descEn: "Master conversation skills, context management, and practical daily uses of ChatGPT.",
      descNp: "दैनिक काम र अध्ययनका लागि ChatGPT सजिलै र सही तरिकाले प्रयोग गर्न सिक्नुहोस्।",
      modules: 8,
      time: "2.5 Hours",
      difficulty: "Beginner",
      isFree: true,
      icon: MessageSquare,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "hover:border-emerald-500",
      link: "/course/search?query=chatgpt",
    },
    {
      id: "prompt-engineering",
      titleEn: "Prompt Engineering",
      titleNp: "प्रम्प्ट इन्जिनियरिङ ✨",
      descEn: "Learn to write system prompts, zero-shot/few-shot techniques to command AI models.",
      descNp: "AI बाट उत्कृष्ट नतिजा निकाल्न सही प्रश्न र निर्देशन लेख्ने कला सिक्नुहोस्।",
      modules: 10,
      time: "3.5 Hours",
      difficulty: "Intermediate",
      isFree: true,
      icon: Sparkles,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "hover:border-blue-500",
      link: "/prompts",
    },
    {
      id: "ai-tools",
      titleEn: "AI Tools Directory",
      titleNp: "उपयोगी AI टुलहरू 🛠",
      descEn: "Discover image generators, voice cloners, research assistants, and video AI tools.",
      descNp: "डिजाइन, रिसर्च र उत्पादन बढाउने ५०+ भन्दा बढी AI टुलहरू प्रयोग गर्नुहोस्।",
      modules: 12,
      time: "4.0 Hours",
      difficulty: "Beginner",
      isFree: true,
      icon: Wrench,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "hover:border-purple-500",
      link: "/ai-tools",
    },
    {
      id: "ai-automation",
      titleEn: "AI Automation",
      titleNp: "AI अटोमेसन ⚡",
      descEn: "Connect AI models with Make, Zapier, & Webhooks to automate business workflows.",
      descNp: "दैनिक व्यापारिक र कार्यालयका कामहरू स्वतः हुने गरी अटोमेट गर्नुहोस्।",
      modules: 7,
      time: "3.0 Hours",
      difficulty: "Advanced",
      isFree: false,
      icon: Zap,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "hover:border-orange-500",
      link: "/course/search?query=automation",
    },
    {
      id: "ai-developers",
      titleEn: "AI for Developers",
      titleNp: "डेभलपरहरूका लागि AI 👨‍💻",
      descEn: "Build LLM applications, utilize OpenAI API, LangChain, and GitHub Copilot.",
      descNp: "कोडिङ छिटो गर्न, त्रुटि सच्याउन र AI एपहरू बनाउन सिक्नुहोस्।",
      modules: 14,
      time: "6.0 Hours",
      difficulty: "Advanced",
      isFree: false,
      icon: Code,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "hover:border-indigo-500",
      link: "/course/search?query=developer",
    },
    {
      id: "ai-creators",
      titleEn: "AI for Content Creators",
      titleNp: "कन्टेन्ट क्रिएटरका लागि AI 🎨",
      descEn: "Generate viral social media captions, video scripts, Midjourney art, & thumbnails.",
      descNp: "युट्युब, टिकटक र सामाजिक सञ्जालका लागि स्क्रिप्ट र फोटोहरू बनाउनुहोस्।",
      modules: 6,
      time: "2.0 Hours",
      difficulty: "Intermediate",
      isFree: true,
      icon: Palette,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      borderColor: "hover:border-pink-500",
      link: "/course/search?query=creator",
    },
    {
      id: "ai-business",
      titleEn: "AI for Business",
      titleNp: "व्यवसायका लागि AI 🏢",
      descEn: "Transform customer service, sales outreach, & strategic decision-making with AI.",
      descNp: "ग्राहक सेवा, बजारीकरण र व्यापारिक पत्रचार AI बाट सहज बनाउनुहोस्।",
      modules: 8,
      time: "3.0 Hours",
      difficulty: "Intermediate",
      isFree: false,
      icon: Building,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "hover:border-emerald-500",
      link: "/course/search?query=business",
    },
  ];

  const filterOptions = ["All", "Beginner", "Intermediate", "Advanced", "Free", "Premium"];

  const filteredPaths = learningPaths.filter((path) => {
    // Category / Difficulty / Pricing Filter
    if (activeFilter === "Beginner" && path.difficulty !== "Beginner") return false;
    if (activeFilter === "Intermediate" && path.difficulty !== "Intermediate") return false;
    if (activeFilter === "Advanced" && path.difficulty !== "Advanced") return false;
    if (activeFilter === "Free" && !path.isFree) return false;
    if (activeFilter === "Premium" && path.isFree) return false;

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchEn = path.titleEn.toLowerCase().includes(q) || path.descEn.toLowerCase().includes(q);
      const matchNp = path.titleNp.includes(q) || path.descNp.includes(q);
      return matchEn || matchNp;
    }

    return true;
  });

  const handleQuizFinish = (pathLink: string) => {
    setIsQuizOpen(false);
    navigate(pathLink);
  };

  return (
    <section className="space-y-10 py-6">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge className="bg-orange-500/10 text-orange-600 border border-orange-500/30 text-xs px-3.5 py-1 font-bold uppercase tracking-wider">
          <BookOpen size={14} className="mr-1.5 inline text-orange-500" />
          Primary Learning Tracks / मुख्य सिकाइ मार्गहरू
        </Badge>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
          Choose Your AI Learning Journey
        </h2>
        <p className="text-xl sm:text-2xl font-bold text-orange-500 font-serif">
          आफ्नो AI सिकाइ यात्रा सुरु गर्नुहोस्
        </p>

        <div className="space-y-1 text-sm sm:text-base text-gray-600 dark:text-gray-300 pt-2 leading-relaxed">
          <p>
            Whether you're a student, teacher, developer, business owner, or complete beginner, there's a learning path designed for you.
          </p>
          <p className="text-gray-400 font-medium text-xs sm:text-sm italic">
            तपाईं विद्यार्थी, शिक्षक, डेभलपर, व्यवसायी वा पूर्ण रूपमा नयाँ सिक्ने व्यक्ति भए पनि, तपाईंका लागि उपयुक्त AI सिकाइ मार्ग यहाँ उपलब्ध छ।
          </p>
        </div>
      </div>

      {/* Filter Chips & Search Field */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                activeFilter === filter
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Bilingual Search Field */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search learning paths... / सिकाइ मार्ग खोज्नुहोस्..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full py-2.5 pl-4 pr-10 text-xs text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search size={16} className="absolute right-3.5 top-3 text-gray-400" />
        </div>
      </div>

      {/* Learning Path Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPaths.map((path) => {
          const Icon = path.icon;
          return (
            <div
              key={path.id}
              onClick={() => navigate(path.link)}
              className={`group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 ${path.borderColor} shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-5`}
            >
              <div className="space-y-4">
                {/* Header Row: Icon & Badges */}
                <div className="flex items-center justify-between">
                  <div className={`p-3.5 rounded-2xl ${path.bgColor} ${path.color}`}>
                    <Icon size={26} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold ${
                        path.isFree ? "text-emerald-600 border-emerald-200" : "text-amber-600 border-amber-200"
                      }`}
                    >
                      {path.isFree ? "Free / नि:शुल्क" : "Premium"}
                    </Badge>
                    <span className="text-[10px] font-bold text-gray-400">{path.difficulty}</span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                    {path.titleNp}
                  </h3>
                  <p className="text-xs font-bold text-gray-400">{path.titleEn}</p>
                </div>

                {/* Description */}
                <div className="space-y-1 text-xs">
                  <p className="text-gray-600 dark:text-gray-300 font-medium line-clamp-2">{path.descEn}</p>
                  <p className="text-gray-400 italic line-clamp-2">{path.descNp}</p>
                </div>
              </div>

              {/* Card Footer Meta Info & CTA */}
              <div className="space-y-4 pt-3 border-t dark:border-slate-800">
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-bold">
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} /> {path.modules} Modules
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {path.time}
                  </span>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-slate-100 dark:bg-slate-800 group-hover:bg-orange-500 group-hover:text-white text-gray-900 dark:text-white font-extrabold rounded-full text-xs transition-colors py-5"
                >
                  Start Learning / सिक्न सुरु गर्नुहोस् <ChevronRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Highlighted CTA Card (Not Sure Where to Start?) */}
      <div className="relative bg-gradient-to-r from-purple-900 via-slate-900 to-purple-950 text-white rounded-3xl p-8 sm:p-12 border border-purple-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-xl">
          <Badge className="bg-orange-500 text-white text-xs font-bold uppercase tracking-wider">
            <HelpCircle size={14} className="mr-1 inline" /> Interactive Quiz
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-black">
            Not sure where to start? / AI मा नयाँ हुनुहुन्छ?
          </h3>
          <p className="text-sm text-gray-200 font-medium">
            Take a short 2-minute quiz and we'll recommend the best personalized learning path for you.
          </p>
          <p className="text-xs text-gray-400 italic">
            २ मिनेटको छोटो क्विज खेल्नुहोस् र तपाईंका लागि सबैभन्दा उपयुक्त AI सिकाइ मार्ग सिफारिस गरिनेछ।
          </p>
        </div>

        <Button
          onClick={() => setIsQuizOpen(true)}
          className="relative z-10 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold rounded-full px-8 py-6 text-base shrink-0 shadow-xl hover:shadow-orange-500/30 transition-all"
        >
          Find My Learning Path / मेरो सिकाइ मार्ग पत्ता लगाउनुहोस् 🎯 <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>

      {/* Recommendation Quiz Dialog */}
      <Dialog open={isQuizOpen} onOpenChange={setIsQuizOpen}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="text-orange-500" /> Find Your AI Learning Path / उपयुक्त सिकाइ मार्ग
            </DialogTitle>
          </DialogHeader>

          {quizStep === 0 && (
            <div className="space-y-4 pt-2">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                1. What is your primary background? / तपाईंको मुख्य भूमिका के हो?
              </p>
              <div className="space-y-2">
                {[
                  { label: "Complete Beginner / पूर्ण रूपमा नयाँ", link: "/learn/ai-basics" },
                  { label: "Student or Researcher / विद्यार्थी वा अनुसन्धानकर्ता", link: "/prompts" },
                  { label: "Teacher or Educator / शिक्षक", link: "/course/search?query=teaching" },
                  { label: "Developer or IT / डेभलपर", link: "/course/search?query=developer" },
                  { label: "Business Owner / व्यवसायी", link: "/course/search?query=business" },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuizFinish(opt.link)}
                    className="w-full text-left p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-xs font-bold text-gray-800 dark:text-gray-200 transition-colors flex items-center justify-between"
                  >
                    <span>{opt.label}</span>
                    <ChevronRight size={16} className="text-orange-500" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AILearningPathsSection;
