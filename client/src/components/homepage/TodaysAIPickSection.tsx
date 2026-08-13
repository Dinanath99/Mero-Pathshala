import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Wrench, BookOpen, Newspaper, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TodaysAIPickSectionProps {
  todaysPick?: {
    tool?: any;
    prompt?: any;
    course?: any;
    news?: any;
  };
  onLogClick?: (action: string, type: string, id: string) => void;
}

const TodaysAIPickSection: React.FC<TodaysAIPickSectionProps> = ({ todaysPick, onLogClick }) => {
  const navigate = useNavigate();

  if (!todaysPick) return null;

  const picks = [
    {
      type: "Tool",
      label: "Tool of the Day",
      icon: Wrench,
      badgeColor: "bg-blue-500",
      data: todaysPick.tool,
      title: todaysPick.tool?.name || "AI Prompt Builder",
      subtitle: todaysPick.tool?.tagline || todaysPick.tool?.description,
      link: `/ai-tools/${todaysPick.tool?.slug}`,
      image: todaysPick.tool?.logo,
    },
    {
      type: "Prompt",
      label: "Prompt of the Day",
      icon: Sparkles,
      badgeColor: "bg-orange-500",
      data: todaysPick.prompt,
      title: todaysPick.prompt?.title,
      subtitle: todaysPick.prompt?.shortDescription,
      link: `/prompts/${todaysPick.prompt?.slug}`,
      image: undefined,
    },
    {
      type: "Course",
      label: "Course of the Day",
      icon: BookOpen,
      badgeColor: "bg-purple-500",
      data: todaysPick.course,
      title: todaysPick.course?.courseTitle,
      subtitle: todaysPick.course?.subTitle,
      link: `/course-detail/${todaysPick.course?._id}`,
      image: todaysPick.course?.courseThumbnail,
    },
    {
      type: "News",
      label: "AI News of the Day",
      icon: Newspaper,
      badgeColor: "bg-emerald-500",
      data: todaysPick.news,
      title: todaysPick.news?.title,
      subtitle: todaysPick.news?.summary,
      link: `/news/${todaysPick.news?.slug}`,
      image: todaysPick.news?.coverImage,
    },
  ].filter((p) => p.data);

  return (
    <section className="py-12 bg-gradient-to-b from-orange-500/5 to-transparent rounded-3xl border border-orange-500/10 p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge className="bg-orange-500 text-white font-bold text-xs uppercase tracking-wider">
            <Sparkles size={14} className="mr-1 inline animate-spin" /> Daily Editor's Choice
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-2">
            Today's AI Picks
          </h2>
          <p className="text-gray-500 text-sm">Curated daily AI recommendations handpicked for learners in Nepal.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {picks.map((pick, idx) => {
          const Icon = pick.icon;
          return (
            <div
              key={idx}
              onClick={() => {
                if (onLogClick) onLogClick("todays_pick_click", pick.type, pick.data?._id);
                navigate(pick.link);
              }}
              className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={`${pick.badgeColor} text-white text-[10px] uppercase font-bold`}>
                    <Icon size={12} className="mr-1 inline" /> {pick.label}
                  </Badge>
                  <span className="text-[10px] text-gray-400 font-bold">Featured</span>
                </div>

                {pick.image && (
                  <div className="h-28 rounded-xl overflow-hidden">
                    <img src={pick.image} alt={pick.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}

                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-2">
                    {pick.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{pick.subtitle}</p>
                </div>
              </div>

              <div className="pt-4 border-t dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-bold text-orange-500">
                <span>Explore Pick</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TodaysAIPickSection;
