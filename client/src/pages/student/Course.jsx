import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`} className="group block">
      <div className="jodne-card overflow-hidden flex flex-col h-full">
        {/* Thumbnail & Category Badge */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="bg-[#111318]/90 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {course.category || "Development"}
            </span>
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="bg-[#FF5533] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm">
              {course.courseLevel || "Beginner"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 justify-between gap-4">
          <div className="space-y-2">
            <h3 className="font-extrabold text-base sm:text-lg text-slate-950 dark:text-white group-hover:text-[#FF5533] transition-colors line-clamp-2 leading-snug">
              {course.courseTitle}
            </h3>
            {course.subTitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {course.subTitle}
              </p>
            )}
          </div>

          {/* Instructor & Price Row */}
          <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
            <div className="flex items-center gap-2 overflow-hidden">
              <Avatar className="h-7 w-7 border border-slate-200">
                <AvatarImage
                  src={course.creator?.photoUrl || "https://avatar.iran.liara.run/public/boy"}
                  alt={course.creator?.name || "Instructor"}
                />
                <AvatarFallback className="text-[10px] bg-[#FF5533] text-white font-bold">
                  {course.creator?.name ? course.creator.name.slice(0, 2).toUpperCase() : "IN"}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[110px] flex items-center gap-1">
                {course.creator?.name || "Instructor"}
                <CheckCircle2 size={12} className="text-[#FF5533]" />
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-black text-base text-slate-950 dark:text-white">
                ₹{course.coursePrice}
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center group-hover:bg-[#FF5533] group-hover:text-white transition-all shadow-sm">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Course;



