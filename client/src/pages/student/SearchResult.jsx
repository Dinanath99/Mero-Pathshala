import { Badge } from "@/components/ui/badge";
import { User, Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="bg-card dark:bg-[#151821] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
      >
        <div className="flex flex-col md:flex-row gap-5 items-start md:items-center w-full">
          {/* Thumbnail */}
          <div className="relative w-full md:w-56 h-36 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
            <img
              src={course.courseThumbnail}
              alt={course.courseTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {course.isPublished && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-[#FF5533] text-white text-[10px] font-semibold border-none">
                  Verified
                </Badge>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="flex flex-col gap-2 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-medium border-slate-200 dark:border-slate-800 text-slate-500 uppercase">
                {course.courseLevel || "All Levels"}
              </Badge>
              {course.category && (
                <span className="text-[11px] text-slate-400 font-medium capitalize">
                  • {course.category}
                </span>
              )}
            </div>

            <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-[#FF5533] transition-colors line-clamp-1">
              {course.courseTitle}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
              {course.subTitle}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
              <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <User size={12} />
              </div>
              <span>
                Instructor: <strong className="text-slate-800 dark:text-slate-200">{course.creator?.name || "Expert Mentor"}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Price Tag */}
        <div className="md:text-right shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 flex md:flex-col justify-between items-center md:items-end">
          <span className="text-xs text-slate-400 md:hidden">Course Price</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
            ₹{course.coursePrice || 0}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;

