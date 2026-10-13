import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle2, CirclePlay, Sparkles, ArrowLeft, Trophy, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

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
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] flex flex-col justify-center items-center py-20">
        <div className="w-12 h-12 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin mb-4" />
        <p className="text-slate-600 dark:text-slate-400 font-medium animate-pulse">
          Loading learning environment...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] flex flex-col justify-center items-center py-20 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Course Load Error
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
          Unable to access course progress. Please verify your enrollment or try again later.
        </p>
        <Link to="/my-learning">
          <Button className="bg-[#FF5533] hover:bg-[#e04422] text-white rounded-xl font-semibold">
            Back to My Learning
          </Button>
        </Link>
      </div>
    );

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle, lectures = [] } = courseDetails;

  const initialLecture =
    currentLecture || (lectures && lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const completedCount = progress.filter((p) => p.viewed).length;
  const progressPercent = lectures.length > 0 ? Math.round((completedCount / lectures.length) * 100) : 0;

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Jodne Header Banner */}
        <div className="bg-card dark:bg-[#151821] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2 max-w-2xl">
            <Link
              to="/my-learning"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#FF5533] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Learning Path
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {courseTitle}
            </h1>
            <div className="flex items-center gap-4 pt-1">
              <div className="flex-1 min-w-[160px] max-w-xs space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                  <span>Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2 bg-slate-200 dark:bg-slate-800" />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {completedCount} / {lectures.length} Lessons
              </span>
            </div>
          </div>

          <Button
            onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
            variant={completed ? "outline" : "default"}
            className={
              completed
                ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl px-5"
                : "bg-[#FF5533] hover:bg-[#e04422] text-white shadow-md rounded-xl px-6 font-semibold"
            }
          >
            {completed ? (
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Course Completed</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span>Mark as Completed</span>
              </div>
            )}
          </Button>
        </div>

        {/* Video Player & Lectures Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Screen */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-video flex items-center justify-center">
              {initialLecture?.videoUrl ? (
                <video
                  key={currentLecture?._id || initialLecture?._id}
                  src={currentLecture?.videoUrl || initialLecture?.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onPlay={() =>
                    handleLectureProgress(currentLecture?._id || initialLecture?._id)
                  }
                />
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <Play className="w-12 h-12 mx-auto mb-3 text-slate-600 animate-pulse" />
                  <p className="font-medium">No video content selected</p>
                </div>
              )}
            </div>

            {/* Current Watching Meta */}
            <div className="bg-card dark:bg-[#151821] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-[#FF5533]">
                <Sparkles className="w-3.5 h-3.5" />
                Currently Playing
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Lesson{" "}
                {lectures.findIndex(
                  (lec) => lec._id === (currentLecture?._id || initialLecture?._id)
                ) + 1}
                : {currentLecture?.lectureTitle || initialLecture?.lectureTitle || "Introductory Overview"}
              </h3>
            </div>
          </div>

          {/* Lecture Playlist Drawer */}
          <div className="lg:col-span-4 bg-card dark:bg-[#151821] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                Course Lessons
              </h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {lectures.length} Modules
              </span>
            </div>

            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {lectures.map((lecture, idx) => {
                const isCurrent = lecture._id === (currentLecture?._id || initialLecture?._id);
                const isDone = isLectureCompleted(lecture._id);

                return (
                  <Card
                    key={lecture._id}
                    className={`cursor-pointer transition-all duration-200 border rounded-xl ${
                      isCurrent
                        ? "border-[#FF5533] bg-orange-500/5 dark:bg-orange-500/10 shadow-sm"
                        : "border-slate-200/60 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-transparent"
                    }`}
                    onClick={() => handleSelectLecture(lecture)}
                  >
                    <CardContent className="p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {isDone ? (
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                            <CheckCircle2 size={18} />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-8 h-8 rounded-lg bg-[#FF5533] text-white flex items-center justify-center shrink-0 shadow-sm">
                            <Play size={15} className="ml-0.5" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
                            <CirclePlay size={18} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs text-slate-400 font-medium">Lesson {idx + 1}</p>
                          <h4 className={`text-sm font-semibold truncate ${isCurrent ? "text-[#FF5533]" : "text-slate-800 dark:text-slate-200"}`}>
                            {lecture.lectureTitle}
                          </h4>
                        </div>
                      </div>

                      {isDone && (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] shrink-0 font-medium">
                          Completed
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
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

