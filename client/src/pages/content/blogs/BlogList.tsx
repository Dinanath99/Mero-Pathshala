import React, { useState } from "react";
import { useGetBlogsQuery, useGetCategoriesQuery } from "@/features/api/blogApi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, Clock, Calendar, BookOpen, ArrowRight, Sparkles } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  publishedAt?: string;
  readingTime?: number | string;
  category?: { name: string } | string;
  author?: { name: string; avatar?: string };
}

const BlogList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: catData } = useGetCategoriesQuery(undefined);
  const { data: blogData, isLoading } = useGetBlogsQuery({
    category: activeCategory,
    search: searchQuery,
    status: "Published"
  });

  const categories: Category[] = catData?.categories || [];
  const blogs: BlogItem[] = (blogData?.blogs || []) as any[];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>Insights & Tutorials | AI Guru Nepal Blog</title>
        <meta
          name="description"
          content="Explore practical AI tutorials, career guides, computer skills guides, and technology insights in Nepali and English."
        />
      </Helmet>

      {/* Header Banner */}
      <section className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 mr-1.5 inline" /> Educational Articles & Guides
              </Badge>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                Insights & <span className="text-orange-600 dark:text-orange-500">Tutorials</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                In-depth articles, practical workflows, and real-world guides written for learners and creators in Nepal.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search tutorials & articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-xs shadow-xs focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-2 no-scrollbar">
            <button
              onClick={() => setActiveCategory("")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                !activeCategory
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All Articles
            </button>
            {categories.map((c) => (
              <button
                key={c._id}
                onClick={() => setActiveCategory(c._id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === c._id
                    ? "bg-orange-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs font-bold text-gray-500">Loading educational articles...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 p-8 space-y-3">
            <BookOpen className="w-12 h-12 text-orange-500 mx-auto" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No Articles Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              We couldn't find any articles matching your search query. Try clearing the filter.
            </p>
            <Button
              onClick={() => {
                setActiveCategory("");
                setSearchQuery("");
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold px-5 mt-2"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link key={blog._id} to={`/blog/${blog.slug}`}>
                <Card className="h-full overflow-hidden bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 rounded-3xl group cursor-pointer flex flex-col justify-between">
                  <div>
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={blog.featuredImage || "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=60"} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-black text-orange-400">
                        {typeof blog.category === "object" ? blog.category?.name : (blog.category || "Guide")}
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} /> {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "Recent"}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} /> {blog.readingTime || 5} min read
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-orange-600 transition-colors leading-snug">
                        {blog.title}
                      </h2>

                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </CardContent>
                  </div>

                  <div className="p-6 pt-0 border-t border-gray-100 dark:border-slate-800/80 mt-4 flex items-center justify-between text-xs font-bold text-orange-600 dark:text-orange-400">
                    <span>Read Article</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogList;
