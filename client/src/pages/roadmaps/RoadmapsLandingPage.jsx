import React, { useState } from "react";
import { useGetRoadmapsQuery } from "@/features/api/roadmapApi";
import RoadmapAdvisor from "./RoadmapAdvisor";
import RoadmapCard from "./RoadmapCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Sparkles,
  Compass,
  Filter,
  Rocket,
  BookOpen,
  SlidersHorizontal,
} from "lucide-react";
import SEO from "@/components/SEO";
import { RoadmapSkeleton } from "@/components/skeletons/SkeletonLoaders";
import EmptyState from "@/components/EmptyState";

const categories = ["All", "AI Basics", "Development", "Business", "Education", "Content Creation"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

const RoadmapsLandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [isFreeFilter, setIsFreeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [showAdvisor, setShowAdvisor] = useState(false);

  const { data, isLoading } = useGetRoadmapsQuery({
    search: searchQuery,
    category: selectedCategory,
    difficulty: selectedDifficulty,
    isFree: isFreeFilter === "Free" ? "true" : isFreeFilter === "Premium" ? "false" : undefined,
    sort: sortBy,
  });

  const roadmaps = data?.roadmaps || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-28 pb-20 px-4 sm:px-6 lg:px-8 space-y-12">
      <SEO
        title="Learning Roadmaps — AI Guru Nepal"
        description="Structured step-by-step AI learning roadmaps for beginners, developers, teachers, and business owners."
      />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* 1. HERO SECTION */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-8 sm:p-14 text-white border border-purple-500/20 shadow-2xl overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-3xl mx-auto relative z-10">
            <Badge className="bg-orange-500 text-white font-extrabold text-xs px-4 py-1.5 uppercase tracking-wider">
              AI Guru Nepal Roadmaps
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
              Learning Roadmaps
            </h1>
            <p className="text-2xl sm:text-4xl font-extrabold text-orange-400 font-serif">
              AI सिकाइ मार्गचित्र
            </p>

            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed pt-2">
              Choose a structured learning journey based on your goals and experience.
            </p>
            <p className="text-xs sm:text-sm text-gray-400 font-serif">
              आफ्नो लक्ष्य र अनुभव अनुसार AI सिकाइ यात्रा सुरु गर्नुहोस्।
            </p>
          </div>

          {/* Search Bar & Action Buttons */}
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roadmaps by title, skill, or keyword..."
                className="w-full pl-11 pr-4 py-6 rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={() => {
                  const el = document.getElementById("roadmap-grid");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-6 py-5 text-xs shadow-lg"
              >
                <Rocket size={14} className="mr-1.5" /> Start Learning
              </Button>

              <Button
                onClick={() => setShowAdvisor(!showAdvisor)}
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-white font-bold rounded-full px-6 py-5 text-xs"
              >
                <Compass size={14} className="mr-1.5 text-orange-400" /> {showAdvisor ? "Hide Advisor" : "Find My Roadmap"}
              </Button>
            </div>
          </div>
        </div>

        {/* 2. ROADMAP ADVISOR COMPONENT (HERO FEATURE) */}
        {showAdvisor && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
            <RoadmapAdvisor />
          </div>
        )}

        {/* 3. FILTERS & SEARCH CONTROLS */}
        <div id="roadmap-grid" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="text-orange-500" size={20} />
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Explore All Roadmaps</h2>
              <Badge variant="outline" className="text-xs font-bold text-gray-400">
                {roadmaps.length} Available
              </Badge>
            </div>

            {/* Category Filters Pill List */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty & Free/Paid Secondary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-500">Difficulty:</span>
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded-lg font-bold border transition-colors ${
                    selectedDifficulty === diff
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900"
                      : "border-gray-200 dark:border-slate-800 text-gray-500 hover:border-gray-400"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-500">Access:</span>
              {["All", "Free", "Premium"].map((f) => (
                <button
                  key={f}
                  onClick={() => setIsFreeFilter(f)}
                  className={`px-3 py-1 rounded-lg font-bold border transition-colors ${
                    isFreeFilter === f
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-200 dark:border-slate-800 text-gray-500 hover:border-gray-400"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. ROADMAP CARDS GRID */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <RoadmapSkeleton key={n} />
            ))}
          </div>
        ) : roadmaps.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((rm) => (
              <RoadmapCard key={rm._id} roadmap={rm} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Roadmaps Found"
            description="We couldn't find any learning roadmaps matching your criteria."
            actionText="Clear Filters"
            onAction={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedDifficulty("All");
              setIsFreeFilter("All");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RoadmapsLandingPage;
