import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
 
const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  const courses = data?.courses || [];

  return (
    <div className="bg-gray-50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
            Our Featured Courses / हाम्रा उत्कृष्ट कोर्सहरू
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Explore practical AI courses designed for students, developers, and professionals in Nepal.
          </p>
        </div>

        {isError ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-medium">
            Unable to load courses at the moment. Please refresh or try again later.
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-medium">
            No published courses found. Check back soon for new AI masterclasses!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course: any, index: number) => (
              <Course key={course._id || index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
