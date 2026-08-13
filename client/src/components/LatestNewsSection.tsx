import React from "react";
import { useGetLatestNewsQuery } from "@/features/api/newsApi";
import { useNavigate } from "react-router-dom";
import { Newspaper, Clock, ArrowRight, Radio, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { News } from "@/types/news.types";

const LatestNewsSection: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetLatestNewsQuery();
  const newsList = data?.news || [];

  if (isLoading || newsList.length === 0) return null;

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-b border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50 mb-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5 mr-1 inline" /> AI Intelligence Desk
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              📰 Latest AI News
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-1">
              Stay ahead with breaking Artificial Intelligence model updates, research, and Nepal perspectives.
            </p>
          </div>

          <Button
            onClick={() => navigate("/news")}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold px-6 py-5 text-sm shadow-md hover:shadow-blue-500/25 transition-all self-start sm:self-auto"
          >
            View All News <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.slice(0, 3).map((article: News) => (
            <div
              key={article._id}
              onClick={() => navigate(`/news/${article.slug}`)}
              className="group bg-slate-50 dark:bg-slate-950 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-blue-600 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <Badge className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                      {article.category?.name || "AI News"}
                    </Badge>
                    {article.breakingNews && (
                      <Badge className="bg-red-600 text-white text-[10px] animate-pulse flex items-center gap-1">
                        <Radio size={10} /> Breaking
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Calendar size={13} /> {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : ""}
                    <span>•</span>
                    <Clock size={13} /> {article.readingTime || "3 min read"}
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                    {article.subtitle || article.content.slice(0, 100) + "..."}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t dark:border-slate-800/60 mt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">By {article.author?.name || "AI Desk"}</span>
                <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Story <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
