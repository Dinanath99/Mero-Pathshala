import React, { useState } from "react";
import { useGetNewsQuery, useGetNewsCategoriesQuery, useGetNewsTagsQuery } from "@/features/api/newsApi";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Search,
  Clock,
  Newspaper,
  ChevronRight,
  TrendingUp,
  Tag,
  Calendar,
  ArrowRight,
  Radio,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface NewsTag {
  _id: string;
  name: string;
  slug: string;
}

const NewsList: React.FC = () => {
  const navigate = useNavigate();
  const { slug: activeTagSlug } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState(activeTagSlug || "all");
  const [sortOption] = useState("newest");
  const [page, setPage] = useState(1);

  const { data: categoriesData } = useGetNewsCategoriesQuery(undefined);
  const { data: tagsData } = useGetNewsTagsQuery(undefined);
  const { data: newsData, isLoading } = useGetNewsQuery({
    category: selectedCategory === "all" ? "" : selectedCategory,
    tag: selectedTag === "all" ? "" : selectedTag,
    search: searchTerm,
    sort: sortOption,
    page,
    limit: 12,
  });

  const categories: Category[] = categoriesData?.categories || [];
  const tags: NewsTag[] = tagsData?.tags || [];
  const newsList: any[] = newsData?.news || [];
  const breakingList: any[] = (newsData as any)?.breakingNewsList || [];
  const pagination = (newsData as any)?.pagination || { page: newsData?.page || 1, pages: newsData?.pages || 1, total: newsData?.total || 0 };

  const featuredNews = newsList.find((n: any) => n.featured) || newsList[0];
  const regularNews = newsList.filter((n: any) => n._id !== featuredNews?._id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>AI News Hub - Breaking Artificial Intelligence & Tech News | AI Guru Nepal</title>
        <meta
          name="description"
          content="Daily breakdowns of global AI announcements, research breakthroughs, model benchmarks, and Nepal's technology ecosystem."
        />
      </Helmet>

      {/* Breaking News Ticker */}
      {breakingList.length > 0 && (
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-2.5 px-4 shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs sm:text-sm font-bold">
            <span className="bg-white text-red-600 px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px] font-black shrink-0 flex items-center gap-1">
              <Radio size={12} className="animate-pulse" /> Breaking
            </span>
            <div className="truncate flex-1">
              <Link to={`/news/${breakingList[0].slug}`} className="hover:underline">
                {breakingList[0].title}
              </Link>
            </div>
            <span className="hidden sm:inline text-white/80 text-xs shrink-0">
              Just In
            </span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Newspaper className="w-3.5 h-3.5 mr-1.5 inline" /> AI Intelligence Portal
              </Badge>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                AI News <span className="text-orange-600 dark:text-orange-500">Hub</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                Daily breakdowns of global AI announcements, research breakthroughs, model benchmarks, and Nepal's technology ecosystem.
              </p>
            </div>

            {/* Search Box */}
            <div className="w-full md:w-80 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search AI headlines..."
                className="pl-11 pr-4 py-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-xs shadow-xs focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-orange-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Tags Cloud */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100 dark:border-slate-800">
              <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                <Tag size={13} /> Tags:
              </span>
              <button
                onClick={() => setSelectedTag("all")}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedTag === "all" ? "bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold" : "text-gray-500 hover:text-orange-600"
                }`}
              >
                #All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag._id}
                  onClick={() => setSelectedTag(tag.slug)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    selectedTag === tag.slug
                      ? "bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold"
                      : "text-gray-500 dark:text-gray-400 hover:text-orange-600"
                  }`}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News Portal Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs font-bold text-gray-500">Fetching latest AI news headlines...</p>
          </div>
        ) : newsList.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 p-8 space-y-3">
            <Newspaper className="w-12 h-12 text-orange-500 mx-auto" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No Articles Found</h3>
            <p className="text-xs text-gray-500">Try clearing filters or searching for another AI topic.</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedTag("all");
              }}
              className="mt-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold px-5"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Featured Hero Article */}
            {featuredNews && selectedCategory === "all" && !searchTerm && (
              <div
                onClick={() => navigate(`/news/${featuredNews.slug}`)}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer grid lg:grid-cols-12 gap-0"
              >
                <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                  <img
                    src={featuredNews.coverImage || "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=60"}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-orange-600 text-white text-xs font-bold">Featured Story</Badge>
                    {featuredNews.breakingNews && <Badge className="bg-red-600 text-white text-xs font-bold">Breaking</Badge>}
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-semibold text-gray-500 mb-3">
                      <Badge variant="outline" className="text-orange-600 dark:text-orange-400 border-orange-500/30">
                        {typeof featuredNews.category === "object" ? featuredNews.category?.name : (featuredNews.category || "AI News")}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Clock size={13} /> {featuredNews.readingTime || "4 min read"}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors leading-tight mb-3">
                      {featuredNews.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                      {featuredNews.subtitle || featuredNews.content?.slice(0, 180) + "..."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={featuredNews.author?.avatar || "https://github.com/shadcn.png"}
                        alt="author"
                        className="w-7 h-7 rounded-full border"
                      />
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {featuredNews.author?.name || "AI Desk"}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-orange-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of Articles */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="text-orange-600" /> Latest Headlines
                </h3>
                <span className="text-xs font-bold text-gray-400">{pagination.total} articles</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularNews.map((article: any) => (
                  <div
                    key={article._id}
                    onClick={() => navigate(`/news/${article.slug}`)}
                    className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-orange-500 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <Badge className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold">
                            {typeof article.category === "object" ? article.category?.name : (article.category || "News")}
                          </Badge>
                          {article.breakingNews && <Badge className="bg-red-600 text-white text-[10px]">Breaking</Badge>}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold">
                          <span className="flex items-center gap-1">
                            <Calendar size={13} /> {new Date(article.createdAt).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock size={13} /> {article.readingTime || "3 min read"}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h4>

                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                          {article.subtitle || article.content?.slice(0, 120) + "..."}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-gray-100 dark:border-slate-800/60 mt-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500">By {article.author?.name || "AI Desk"}</span>
                      <span className="text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        View Article <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-8">
                <Button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  variant="outline"
                  className="rounded-xl text-xs font-bold"
                >
                  Previous
                </Button>
                <span className="text-xs font-bold px-4 text-gray-500">
                  Page {page} of {pagination.pages}
                </span>
                <Button
                  disabled={page === pagination.pages}
                  onClick={() => setPage(page + 1)}
                  variant="outline"
                  className="rounded-xl text-xs font-bold"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default NewsList;
