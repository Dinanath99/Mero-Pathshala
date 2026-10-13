import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles, Compass } from "lucide-react";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();

  if (isLoading) return <MyLearningSkeleton />;

  // Check if user is student
  if (!data?.user || data.user.role !== "student") {
    return (
      <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] flex flex-col justify-center items-center py-20 px-6 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Access Guarded</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Only enrolled students can view personal learning paths.</p>
        <Link to="/courses">
          <Button className="bg-[#FF5533] hover:bg-[#e04422] text-white rounded-xl font-semibold">
            Browse All Courses
          </Button>
        </Link>
      </div>
    );
  }

  const myLearning = data.user.enrolledCourses || [];

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Jodne Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-[#FF5533]">
              <Sparkles className="w-3 h-3" />
              PERSONAL DASHBOARD
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              My Learning Path
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Track your enrolled courses and continue active video modules
            </p>
          </div>

          <Link to="/courses">
            <Button variant="outline" className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#FF5533] rounded-xl font-medium">
              <Compass className="w-4 h-4 mr-2" /> Explore More
            </Button>
          </Link>
        </div>

        {/* Enrolled Grid or Empty State */}
        {myLearning.length === 0 ? (
          <div className="bg-card dark:bg-[#151821] rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800 space-y-4 max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-[#FF5533] flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Enrolled Courses Yet</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              You haven't enrolled in any learning programs. Explore our top recommendations to get started today.
            </p>
            <Link to="/courses" className="inline-block pt-2">
              <Button className="bg-[#FF5533] hover:bg-[#e04422] text-white rounded-xl font-semibold shadow-md px-6">
                Explore Catalog →
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myLearning.map((course, index) => (
              <Course key={course._id || index} course={course} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => (
  <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] py-10 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="h-20 bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl animate-pulse w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl h-80 animate-pulse"
          />
        ))}
      </div>
    </div>
  </div>
);

