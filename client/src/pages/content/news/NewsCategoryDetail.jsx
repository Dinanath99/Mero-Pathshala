import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetNewsQuery, useGetNewsCategoriesQuery } from "@/features/api/newsApi";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Newspaper, Clock, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NewsCategoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: categoriesData } = useGetNewsCategoriesQuery();
  const { data: newsData, isLoading } = useGetNewsQuery({ category: slug, limit: 30 });

  const categories = categoriesData?.categories || [];
  const currentCategory = categories.find((c) => c.slug === slug);
  const newsList = newsData?.news || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>{currentCategory ? `${currentCategory.name} News` : "Category"} - AI Guru Nepal</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 mb-6">
        <button
          onClick={() => navigate("/news")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to AI News Portal
        </button>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-sm">
          <Badge className="bg-blue-600 text-white text-xs mb-3">News Category</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            {currentCategory?.name || slug} AI News
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base max-w-2xl">
            {currentCategory?.description || `Explore breaking headlines and deep dives in ${currentCategory?.name || slug}.`}
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {isLoading ? (
          <div className="text-center py-12">Loading articles...</div>
        ) : newsList.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800">
            <Newspaper className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">No Articles in this Category</h3>
            <Button onClick={() => navigate("/news")} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
              View All AI News
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((article) => (
              <div
                key={article._id}
                onClick={() => navigate(`/news/${article.slug}`)}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={12} /> {new Date(article.createdAt).toLocaleDateString()}
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors line-clamp-2 dark:text-white">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
                      {article.subtitle || article.content.slice(0, 100)}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t dark:border-slate-800 mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500">By {article.author?.name || "AI Desk"}</span>
                  <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                    Read Story <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default NewsCategoryDetail;
