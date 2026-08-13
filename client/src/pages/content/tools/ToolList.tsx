import React, { useState } from "react";
import { useGetToolsQuery, useGetCategoriesQuery, useGetFeaturedToolsQuery } from "@/features/api/toolApi";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Search, Star, Filter, Sparkles, ArrowRight, ChevronRight, BookOpen, GraduationCap, Flame, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const PRICING_OPTIONS = ["All", "Free", "Freemium", "Paid", "Free Trial"];

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface ToolItem {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  tagline?: string;
  description?: string;
  pricingType?: string;
  featured?: boolean;
  category?: { name: string } | string;
}

const ToolList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPricing, setSelectedPricing] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [page, setPage] = useState(1);

  const { data: categoriesData } = useGetCategoriesQuery(undefined);
  const { data: featuredData } = useGetFeaturedToolsQuery(undefined);
  const { data: toolsData, isLoading, isFetching } = useGetToolsQuery({
    category: selectedCategory,
    search: search.trim(),
    pricingType: selectedPricing,
    sort: sortBy,
    page,
    limit: 12,
  });

  const categories: Category[] = categoriesData?.categories || [];
  const featuredTools: ToolItem[] = featuredData?.tools || [];
  const tools: ToolItem[] = toolsData?.tools || [];
  const pagination = toolsData?.pagination || { total: 0, pages: 1 };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedPricing("All");
    setSortBy("popular");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>AI Tools Learning Platform | Free Mini-Courses & Tutorials - AI Guru Nepal</title>
        <meta
          name="description"
          content="Master every AI tool through structured free mini-courses, step-by-step tutorials, bilingual Nepali guides, interactive practice, and quizzes."
        />
      </Helmet>

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-500/10 via-purple-500/5 to-transparent pt-12 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 border-orange-200 dark:border-orange-900/50 mb-4 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase">
            <GraduationCap className="w-4 h-4 mr-1.5 inline" /> AI Tools Educational Platform
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Master AI Tools with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600">
              Free Mini-Courses
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Don't just discover tools—understand, practice, and master every AI application with step-by-step bilingual tutorials, Nepal use cases, prompt templates, and interactive quizzes.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto relative shadow-2xl rounded-full">
            <div className="relative flex items-center">
              <Search className="absolute left-5 text-gray-400" size={22} />
              <Input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search AI tools (e.g. ChatGPT, Midjourney, Cursor, Claude)..."
                className="w-full pl-14 pr-32 py-7 rounded-full text-base bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 focus:border-orange-500 dark:focus:border-orange-500 shadow-xl outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-28 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  Clear
                </button>
              )}
              <Button className="absolute right-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-5 font-bold shadow-md">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Carousel / Highlights Section */}
      {!selectedCategory && !search && selectedPricing === "All" && featuredTools.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Flame className="text-orange-500 fill-orange-500" size={24} />
              <h2 className="text-2xl font-extrabold tracking-tight">Featured AI Learning Modules</h2>
            </div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Most Popular Courses</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.slice(0, 3).map((tool) => (
              <div
                key={tool._id}
                onClick={() => navigate(`/ai-tools/${tool.slug}`)}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-orange-500/30 dark:border-orange-500/20 shadow-lg hover:shadow-2xl hover:border-orange-500 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">
                  <Award size={13} className="text-amber-500" /> Free Course
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-gray-100 dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {typeof tool.category === "object" ? tool.category?.name : (tool.category || "AI Tool")}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                    {tool.tagline || tool.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between border-t dark:border-slate-800 pt-4 mt-2">
                    <Badge
                      className={
                        tool.pricingType === "Free"
                          ? "bg-emerald-500 text-white"
                          : tool.pricingType === "Freemium"
                          ? "bg-blue-500 text-white"
                          : tool.pricingType === "Free Trial"
                          ? "bg-purple-500 text-white"
                          : "bg-amber-500 text-white"
                      }
                    >
                      {tool.pricingType}
                    </Badge>
                    <span className="text-xs font-bold text-orange-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Start Mini-Course <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Directory Filters & Listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Pills Header */}
        <div className="mb-8 overflow-x-auto pb-3 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => {
                setSelectedCategory("");
                setPage(1);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                selectedCategory === ""
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                  : "bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-800 hover:border-orange-500"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setPage(1);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat.slug
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                    : "bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-800 hover:border-orange-500"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Bar: Pricing Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
          {/* Pricing filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter size={14} /> Pricing:
            </span>
            {PRICING_OPTIONS.map((priceOption) => (
              <button
                key={priceOption}
                onClick={() => {
                  setSelectedPricing(priceOption);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedPricing === priceOption
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                }`}
              >
                {priceOption}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs font-semibold px-3 py-2 outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="name">Alphabetical (A-Z)</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </div>

        {/* Tools Cards Grid */}
        {isLoading || isFetching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 h-64 flex flex-col justify-between"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-slate-800 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-1/3" />
                  </div>
                </div>
                <div className="space-y-2 my-4">
                  <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-2/3" />
                </div>
                <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded-xl" />
              </div>
            ))}
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm p-8 max-w-xl mx-auto">
            <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No AI Tool Modules Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              We couldn't find any learning modules matching your current search or category filters.
            </p>
            <Button onClick={handleResetFilters} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool._id}
                onClick={() => navigate(`/ai-tools/${tool.slug}`)}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-slate-800 shadow-sm group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center gap-1.5">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          {typeof tool.category === "object" ? tool.category?.name : (tool.category || "AI Tool")}
                        </p>
                      </div>
                    </div>
                    {tool.featured && (
                      <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] px-2 py-0.5">
                        <Star size={10} className="fill-amber-500 mr-1" /> Featured
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                    {tool.tagline || tool.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-orange-500 mb-4 bg-orange-50 dark:bg-orange-950/30 p-2 rounded-xl border border-orange-500/10">
                    <BookOpen size={14} /> Full Mini-Course with Quiz & Exercises
                  </div>
                </div>

                <div className="border-t dark:border-slate-800 pt-4 flex items-center justify-between">
                  <Badge
                    className={
                      tool.pricingType === "Free"
                        ? "bg-emerald-500 text-white"
                        : tool.pricingType === "Freemium"
                        ? "bg-blue-500 text-white"
                        : tool.pricingType === "Free Trial"
                        ? "bg-purple-500 text-white"
                        : "bg-amber-500 text-white"
                    }
                  >
                    {tool.pricingType}
                  </Badge>

                  <span className="text-xs font-bold text-orange-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Start Learning <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-full"
            >
              Previous
            </Button>
            <span className="text-sm font-semibold px-4 text-gray-600 dark:text-gray-400">
              Page {page} of {pagination.pages}
            </span>
            <Button
              variant="outline"
              disabled={page === pagination.pages}
              onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
              className="rounded-full"
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ToolList;
