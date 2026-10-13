import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [selectedCategories, setSelectedCatgories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses?.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCatgories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Search Header Banner */}
        <div className="bg-card dark:bg-[#151821] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-[#FF5533]">
            <Search className="w-3.5 h-3.5" />
            CATALOG SEARCH
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Results for <span className="text-[#FF5533]">"{query || "All Courses"}"</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {data?.courses?.length || 0} Learning programs match your filters
          </p>
        </div>

        {/* Filter & Results Layout */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Filter handleFilterChange={handleFilterChange} />
          
          <div className="flex-1 w-full space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <CourseSkeleton key={idx} />
              ))
            ) : isEmpty ? (
              <CourseNotFound />
            ) : (
              data?.courses?.map((course) => (
                <SearchResult key={course._id} course={course} />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="bg-card dark:bg-[#151821] rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800 space-y-4 max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h2 className="font-extrabold text-2xl text-slate-900 dark:text-white">
        No Matching Courses
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        We couldn't find any courses matching your search query or active category filters.
      </p>
      <Link to="/courses" className="inline-block pt-2">
        <Button className="bg-[#FF5533] hover:bg-[#e04422] text-white rounded-xl font-semibold shadow-md px-6">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="bg-card dark:bg-[#151821] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-5 items-center justify-between animate-pulse">
      <div className="flex flex-col md:flex-row gap-5 items-center w-full">
        <Skeleton className="w-full md:w-56 h-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="flex flex-col gap-2 flex-1 w-full">
          <Skeleton className="h-4 w-24 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-4 w-32 bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
      <Skeleton className="h-8 w-20 bg-slate-200 dark:bg-slate-800 shrink-0" />
    </div>
  );
};

