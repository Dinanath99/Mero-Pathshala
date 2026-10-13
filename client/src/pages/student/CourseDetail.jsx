import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle, Users, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams, Link } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] flex flex-col justify-center items-center py-20">
        <div className="w-12 h-12 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin mb-4" />
        <p className="text-slate-600 dark:text-slate-400 font-medium animate-pulse">
          Loading course specifications...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] flex flex-col justify-center items-center py-20 px-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Unable to Load Course
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
          Failed to fetch course details. Please verify the link or try again later.
        </p>
        <Link to="/courses">
          <Button className="bg-[#FF5533] hover:bg-[#e04422] text-white rounded-xl font-semibold">
            Explore All Courses
          </Button>
        </Link>
      </div>
    );

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  const previewLecture = course?.lectures && course.lectures.length > 0 ? course.lectures[0] : null;

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#FF5533] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
        </Link>

        {/* Jodne Hero Banner */}
        <div className="bg-[#111318] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-[#FF5533] border border-orange-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Jodne Certified Program
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {course?.courseTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              {course?.subTitle}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-400">
              <p className="flex items-center gap-1.5">
                Created by{" "}
                <span className="font-semibold text-white underline underline-offset-4 decoration-[#FF5533]">
                  {course?.creator?.name || "Platform Instructor"}
                </span>
              </p>

              <div className="flex items-center gap-1.5">
                <BadgeInfo size={15} className="text-[#FF5533]" />
                <span>Updated {course?.createdAt ? course.createdAt.split("T")[0] : "Recently"}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Users size={15} className="text-[#FF5533]" />
                <span>{course?.enrolledStudents?.length || 0} Students Enrolled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Description & Syllabus */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-card dark:bg-[#151821] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Course Description
              </h2>
              <div
                className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: course?.description || "" }}
              />
            </div>

            {/* Course Syllabus */}
            <Card className="bg-card dark:bg-[#151821] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <CardHeader className="p-6 border-b border-slate-200/80 dark:border-slate-800">
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  Curriculum & Modules
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  {course?.lectures?.length || 0} Video Lessons Included
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {course?.lectures?.map((lecture, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-[#FF5533] flex items-center justify-center shrink-0">
                        <PlayCircle size={18} />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {lecture.lectureTitle}
                      </span>
                    </div>
                    {lecture.isPreviewFree && (
                      <Badge variant="outline" className="border-orange-500/30 text-[#FF5533] bg-orange-500/5 text-[10px]">
                        Free Preview
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Floating Purchase Card */}
          <div className="lg:col-span-5">
            <Card className="bg-card dark:bg-[#151821] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg sticky top-24 overflow-hidden">
              <CardContent className="p-5 space-y-4">
                {/* Video Preview */}
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-md border border-slate-800">
                  {previewLecture?.videoUrl ? (
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      url={previewLecture.videoUrl}
                      controls={true}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                      Preview Unavailable
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    Course Preview
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                    {previewLecture?.lectureTitle || "Overview"}
                  </h3>
                </div>

                <Separator className="bg-slate-200 dark:bg-slate-800" />

                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-slate-500">Total Investment</span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    ₹{course?.coursePrice || 0}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0">
                <BuyCourseButton courseId={courseId} course={course} purchased={purchased} />
              </CardFooter>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CourseDetail;

