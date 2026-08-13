import React, { useState } from "react";
import { useGetPromptsQuery, useGetCategoriesQuery, useGetFeaturedPromptsQuery, useIncrementPromptCopyMutation } from "@/features/api/promptApi";
import { useGetToolsQuery } from "@/features/api/toolApi";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Sparkles,
  Copy,
  Check,
  Filter,
  ArrowRight,
  ChevronRight,
  Flame,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DIFFICULTY_OPTIONS = ["All", "Beginner", "Intermediate", "Advanced"];

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const PromptList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTool] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data: categoriesData } = useGetCategoriesQuery(undefined);
  const { data: featuredData } = useGetFeaturedPromptsQuery(undefined);
  const { data: toolsData } = useGetToolsQuery({ limit: 50 } as any);
  const [incrementCopy] = useIncrementPromptCopyMutation();

  const { data: promptsData, isLoading, isFetching } = useGetPromptsQuery({
    category: selectedCategory,
    aiTool: selectedTool,
    difficulty: selectedDifficulty,
    search: search.trim(),
    sort: sortBy,
    page,
    limit: 12,
  });

  const categories: Category[] = categoriesData?.categories || [];
  const featuredPrompts: any[] = featuredData?.prompts || [];
  const prompts: any[] = promptsData?.prompts || [];
  const pagination = (promptsData as any)?.pagination || { total: promptsData?.total || 0, pages: promptsData?.pages || 1 };

  const handleCopyPrompt = async (e: React.MouseEvent, prompt: any) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.promptContent);
      setCopiedId(prompt._id);
      toast.success("Prompt copied to clipboard! Ready to paste into ChatGPT/Gemini.");
      await incrementCopy(prompt._id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error("Failed to copy prompt.");
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedDifficulty("All");
    setSortBy("popular");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>Prompt Library | Discover & Master AI Prompts - AI Guru Nepal</title>
        <meta
          name="description"
          content="Nepal's largest bilingual AI Prompt Library. Discover, copy, and learn prompt engineering for ChatGPT, Gemini, Claude, and Midjourney."
        />
      </Helmet>

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-500/10 via-purple-500/5 to-transparent pt-12 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 border-orange-200 dark:border-orange-900/50 mb-4 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 mr-1.5 inline text-orange-500" /> Nepal's #1 AI Prompt Engineering Hub
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Discover & Learn{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600">
              High-Impact AI Prompts
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Copy tested prompts for ChatGPT, Gemini, Claude, and Midjourney. Learn the prompt engineering logic behind why every prompt works!
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
                placeholder="Search prompts (e.g. Study notes generator, Code debugger, Resume writer)..."
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

      {/* Featured Prompts Carousel / Highlights Section */}
      {!selectedCategory && !search && selectedDifficulty === "All" && featuredPrompts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Flame className="text-orange-500 fill-orange-500" size={24} />
              <h2 className="text-2xl font-extrabold tracking-tight">Featured Prompts</h2>
            </div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Top Rated & Trending</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPrompts.slice(0, 3).map((prompt: any) => (
              <div
                key={prompt._id}
                onClick={() => navigate(`/prompts/${prompt.slug}`)}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-orange-500/30 dark:border-orange-500/20 shadow-lg hover:shadow-2xl hover:border-orange-500 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">
                  <Award size={13} className="text-amber-500" /> Featured
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-[11px] font-bold border-orange-500/30 text-orange-500">
                      {typeof prompt.category === "object" ? prompt.category?.name : (prompt.category || "Prompt")}
                    </Badge>
                    <Badge className="bg-emerald-500 text-white text-[10px]">Free</Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {prompt.difficulty}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors mb-2 line-clamp-1">
                    {prompt.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                    {prompt.englishDescription}
                  </p>
                </div>

                <div className="border-t dark:border-slate-800 pt-4 flex items-center justify-between">
                  <Button
                    size="sm"
                    onClick={(e) => handleCopyPrompt(e, prompt)}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs font-bold px-4"
                  >
                    {copiedId === prompt._id ? (
                      <>
                        <Check size={14} className="mr-1" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="mr-1" /> Copy Prompt
                      </>
                    )}
                  </Button>

                  <span className="text-xs font-bold text-orange-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    View Logic <ChevronRight size={14} />
                  </span>
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

        {/* Secondary Bar: Difficulty & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
          {/* Difficulty filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter size={14} /> Difficulty:
            </span>
            {DIFFICULTY_OPTIONS.map((diff) => (
              <button
                key={diff}
                onClick={() => {
                  setSelectedDifficulty(diff);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedDifficulty === diff
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                }`}
              >
                {diff}
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
              <option value="popular">Most Popular & Copied</option>
              <option value="name">Alphabetical (A-Z)</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </div>

        {/* Prompts Grid */}
        {isLoading || isFetching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 h-64 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-3/4" />
                </div>
                <div className="space-y-2 my-4">
                  <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-2/3" />
                </div>
                <div className="h-10 bg-gray-200 dark:bg-slate-800 rounded-xl" />
              </div>
            ))}
          </div>
        ) : prompts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm p-8 max-w-xl mx-auto">
            <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Prompts Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              We couldn't find any prompts matching your current search or difficulty filters.
            </p>
            <Button onClick={handleResetFilters} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt: any) => (
              <div
                key={prompt._id}
                onClick={() => navigate(`/prompts/${prompt.slug}`)}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[11px] font-bold border-orange-500/30 text-orange-500">
                      {typeof prompt.category === "object" ? prompt.category?.name : (prompt.category || "Prompt")}
                    </Badge>
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-emerald-500 text-white text-[10px]">Free</Badge>
                      <Badge
                        variant="secondary"
                        className={
                          prompt.difficulty === "Beginner"
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-[10px]"
                            : prompt.difficulty === "Intermediate"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px]"
                            : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-[10px]"
                        }
                      >
                        {prompt.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors mb-2 line-clamp-1">
                    {prompt.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                    {prompt.englishDescription}
                  </p>

                  {/* AI Tool Badges */}
                  {prompt.aiTools && prompt.aiTools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prompt.aiTools.slice(0, 3).map((tool: any) => (
                        <span
                          key={tool._id || tool}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 font-medium"
                        >
                          {tool.name || "AI Tool"}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t dark:border-slate-800 pt-4 flex items-center justify-between">
                  <Button
                    size="sm"
                    onClick={(e) => handleCopyPrompt(e, prompt)}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs font-bold px-4"
                  >
                    {copiedId === prompt._id ? (
                      <>
                        <Check size={14} className="mr-1" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="mr-1" /> Copy Prompt
                      </>
                    )}
                  </Button>

                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-orange-500 transition-colors flex items-center gap-1">
                    View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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

export default PromptList;
