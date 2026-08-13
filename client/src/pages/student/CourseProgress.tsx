import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay, ArrowLeft, BookOpen, Award } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const courseId = params.courseId || "";
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData?.message || "Course completed");
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData?.message || "Course marked incomplete");
    }
  }, [completedSuccess, inCompletedSuccess, markCompleteData, markInCompleteData, refetch]);

  const [currentLecture, setCurrentLecture] = useState<any | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-slate-50 dark:bg-[#020817]">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
          <p className="text-sm font-extrabold text-gray-500">Loading course lectures...</p>
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020817] space-y-4">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Failed to load course details</h2>
        <Button onClick={() => navigate("/course/search")} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold">
          Explore Courses
        </Button>
      </div>
    );
  }

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId: string) => {
    return progress?.some((prog: any) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId: string) => {
    if (!lectureId) return;
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture: any) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  const activeIndex = courseDetails.lectures.findIndex(
    (lec: any) => lec._id === (currentLecture?._id || initialLecture?._id)
  );

  const completedCount = courseDetails.lectures.filter((lec: any) => isLectureCompleted(lec._id)).length;
  const progressPercent = Math.round((completedCount / (courseDetails.lectures.length || 1)) * 100);

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-[#020817] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Top Header Navigation */}
      <div className="max-w-[1200px] mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="rounded-full text-xs font-extrabold text-gray-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={16} className="mr-1.5" /> Back
          </Button>
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-xs px-3.5 py-1 font-bold rounded-full">
            Lecture {activeIndex + 1} of {courseDetails.lectures.length}
          </Badge>
        </div>

        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          className={completed 
            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500 hover:bg-emerald-500/20 font-extrabold rounded-full px-6 text-xs" 
            : "bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-full px-6 text-xs shadow-md"
          }
        >
          {completed ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> <span>Course Completed</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" /> <span>Mark Full Course Complete</span>
            </div>
          )}
        </Button>
      </div>

      {/* Main Workspace Layout */}
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Video Player & Lecture Info Main Column */}
        <div className="flex-1 w-full space-y-6">
          <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <video
              src={currentLecture?.videoUrl || initialLecture?.videoUrl}
              controls
              className="w-full h-auto max-h-[520px] aspect-video object-cover"
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initialLecture?._id)
              }
            />
          </div>

          {/* Current Watching Lecture Header */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-7 sm:p-8 shadow-sm space-y-3">
            <span className="text-xs font-extrabold text-orange-500 uppercase tracking-wider">
              {courseTitle}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-snug">
              Lecture {activeIndex + 1}: {currentLecture?.lectureTitle || initialLecture?.lectureTitle}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Study at your own pace. Progress updates automatically upon watching.
            </p>
          </div>
        </div>

        {/* Course Lectures Sidebar */}
        <div className="w-full lg:w-96 shrink-0 space-y-6">
          
          {/* Progress Card */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
            <h4 className="font-extrabold text-gray-900 dark:text-white text-base">Course Completion</h4>
            <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-orange-500 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-gray-500">
              <span>{progressPercent}% Completed</span>
              <span>{completedCount} / {courseDetails.lectures.length} Watched</span>
            </div>
          </div>

          {/* Lecture Playlist Container */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
            <h4 className="font-black text-gray-900 dark:text-white text-sm flex items-center gap-2 border-b dark:border-slate-800 pb-3">
              <BookOpen size={18} className="text-orange-500" /> Lectures Playlist
            </h4>

            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {courseDetails?.lectures.map((lecture: any, idx: number) => {
                const isSelected = lecture._id === (currentLecture?._id || initialLecture?._id);
                const completedLec = isLectureCompleted(lecture._id);

                return (
                  <button
                    key={lecture._id}
                    onClick={() => handleSelectLecture(lecture)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-orange-500/10 border-orange-500 text-orange-600 dark:text-orange-400 font-extrabold shadow-sm"
                        : "bg-white dark:bg-slate-900 border-gray-200/80 dark:border-slate-800 text-gray-800 dark:text-gray-200 hover:border-orange-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`shrink-0 ${completedLec ? "text-emerald-500" : isSelected ? "text-orange-500" : "text-gray-400"}`}>
                        {completedLec ? (
                          <CheckCircle2 size={20} />
                        ) : (
                          <CirclePlay size={20} />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs sm:text-sm font-extrabold truncate">
                          {idx + 1}. {lecture.lectureTitle}
                        </p>
                      </div>
                    </div>

                    {completedLec && (
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px] font-extrabold shrink-0 px-2 py-0.5">
                        Done
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CourseProgress;
