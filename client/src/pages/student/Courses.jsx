import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { BookOpen, Sparkles } from "lucide-react";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-6 text-center">
        <div className="p-8 rounded-2xl bg-destructive/10 border border-destructive/20 max-w-md mx-auto">
          <p className="text-destructive font-medium">
            Could not load courses at this time. Please check backend connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-[#F9F8F6] dark:bg-[#0E1015]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Jodne Header Badge & Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black tracking-widest text-[#FF5533] uppercase">
            FEATURED COURSES
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Explore high-impact learning paths
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Hands-on learning paths curated to take you from core fundamentals to job-ready software engineering skills.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : data?.courses && data.courses.length > 0 ? (
            data.courses.map((course) => <Course key={course._id} course={course} />)
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 font-semibold">
              No published courses found. Check back soon!
            </div>
          )}
        </div>
      </div>
    </section>

  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-card border border-border/80 rounded-2xl overflow-hidden p-4 space-y-4">
      <Skeleton className="w-full aspect-video rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-4/5 rounded-lg" />
        <Skeleton className="h-3 w-3/5 rounded-lg" />
      </div>
      <div className="pt-3 border-t border-border/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-5 w-12 rounded-lg" />
      </div>
    </div>
  );
};

