import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContinueLearningCard from "./ContinueLearningCard";
import TodaysAIPickSection from "./TodaysAIPickSection";
import {
  Sparkles,
  Wrench,
  ChevronRight,
  Search,
  Flame,
  CheckSquare,
  Award,
  Compass,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StudentHomepageProps {
  data?: any;
  onLogClick?: (action: string, type: string, id: string) => void;
}

interface Goal {
  id: number;
  title: string;
  completed: boolean;
}

interface Achievement {
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

const StudentHomepage: React.FC<StudentHomepageProps> = ({ data, onLogClick }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: "Complete 1 AI Course Lesson", completed: false },
    { id: 2, title: "Copy & Try 1 ChatGPT Prompt", completed: true },
    { id: 3, title: "Explore 1 New AI Tool in Directory", completed: false },
    { id: 4, title: "Read Latest AI Technology News", completed: false },
  ]);

  const user = data?.user;
  const student = data?.studentData || {};
  const todaysPick = data?.todaysPick;
  const continueItem = student.continueLearning?.[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/course/search?query=${encodeURIComponent(searchQuery)}`);
  };

  const toggleGoal = (id: number) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g)));
  };

  const achievements: Achievement[] = [
    { title: "AI Apprentice", desc: "Enrolled in first masterclass", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Streak Master", desc: "5 consecutive learning days", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Prompt Explorer", desc: "Saved 10+ prompt templates", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-purple-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.photoUrl || "https://github.com/shadcn.png"}
            alt={user?.name || "User"}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Welcome back, {user?.name || "Learner"}! 👋
              </h1>
              <Badge className="bg-orange-500 text-white font-bold text-xs px-2.5 py-1 flex items-center gap-1">
                <Flame size={14} className="fill-current animate-pulse" /> 5 Day Streak
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Resume active courses, track daily learning goals, and explore recommendations.
            </p>
          </div>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, tools..."
            className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 pl-4 pr-10 text-xs text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-orange-400">
            <Search size={16} />
          </button>
        </form>
      </div>

      {/* Continue Learning Section */}
      {continueItem && (
        <section>
          <ContinueLearningCard
            item={continueItem}
            onResumeClick={(courseId) => {
              if (onLogClick) onLogClick("resume_learning_click", "Course", courseId);
            }}
          />
        </section>
      )}

      {/* Today's Learning Goal & Achievements Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Today's Learning Goal Checklist */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CheckSquare className="text-orange-500" /> Today's Learning Goals
            </h3>
            <span className="text-xs font-bold text-emerald-500">
              {goals.filter((g) => g.completed).length} / {goals.length} Completed
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  goal.completed
                    ? "bg-emerald-500/5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 line-through"
                    : "bg-slate-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-800 text-gray-800 dark:text-gray-200"
                }`}
              >
                <CheckCircle2 size={18} className={goal.completed ? "text-emerald-500" : "text-gray-400"} />
                <span className="text-xs font-semibold">{goal.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements / Badges */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Award className="text-amber-500" /> Achievements
          </h3>

          <div className="space-y-3">
            {achievements.map((ach, idx) => {
              const Icon = ach.icon;
              return (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className={`p-2 rounded-xl ${ach.bg} ${ach.color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{ach.title}</h4>
                    <p className="text-[10px] text-gray-500">{ach.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Today's Editor Pick */}
      <TodaysAIPickSection todaysPick={todaysPick} onLogClick={onLogClick} />

      {/* Recommended Courses */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="text-orange-500 border-orange-500/30">
              <Compass size={14} className="mr-1 inline" /> Tailored For You
            </Badge>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
              Recommended Masterclasses
            </h2>
          </div>
          <Button onClick={() => navigate("/course/search")} variant="ghost" className="text-orange-500 font-bold text-xs">
            Browse All <ChevronRight size={16} />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {student.recommendedCourses?.map((course: any) => (
            <div
              key={course._id}
              onClick={() => {
                if (onLogClick) onLogClick("recommendation_click", "Course", course._id);
                navigate(`/course-detail/${course._id}`);
              }}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={course.courseThumbnail || "https://via.placeholder.com/300x180"}
                    alt={course.courseTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px]">
                    {typeof course.category === "object" ? course.category?.name : (course.category || "AI Course")}
                  </Badge>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                    {course.courseTitle}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{course.subTitle}</p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t dark:border-slate-800 mt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-600">Rs. {course.coursePrice || "Free"}</span>
                <span className="text-xs font-bold text-orange-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Enroll Now <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended AI Tools & Prompts Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Recommended AI Tools */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Wrench className="text-blue-500" /> Recommended AI Tools
            </h3>
            <Button onClick={() => navigate("/ai-tools")} variant="ghost" className="text-xs text-orange-500 font-bold">
              View All <ChevronRight size={14} />
            </Button>
          </div>

          <div className="space-y-3">
            {student.recommendedTools?.map((tool: any) => (
              <div
                key={tool._id}
                onClick={() => {
                  if (onLogClick) onLogClick("recommendation_click", "Tool", tool._id);
                  navigate(`/ai-tools/${tool.slug}`);
                }}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img src={tool.logo || "https://github.com/shadcn.png"} alt={tool.name} className="w-10 h-10 rounded-xl object-cover border" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{tool.name}</h4>
                    <p className="text-[11px] text-gray-500 line-clamp-1">{tool.tagline || (typeof tool.category === "object" ? tool.category?.name : tool.category)}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] text-blue-600 border-blue-200">
                  {tool.pricingType || "Free"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Prompts */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="text-orange-500" /> Trending AI Prompts
            </h3>
            <Button onClick={() => navigate("/prompts")} variant="ghost" className="text-xs text-orange-500 font-bold">
              View All <ChevronRight size={14} />
            </Button>
          </div>

          <div className="space-y-3">
            {student.recommendedPrompts?.map((prompt: any) => (
              <div
                key={prompt._id}
                onClick={() => {
                  if (onLogClick) onLogClick("recommendation_click", "Prompt", prompt._id);
                  navigate(`/prompts/${prompt.slug}`);
                }}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{prompt.title}</h4>
                  <p className="text-[11px] text-gray-500 line-clamp-1">{prompt.targetAI} | {typeof prompt.category === "object" ? prompt.category?.name : (prompt.category || "General")}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHomepage;
