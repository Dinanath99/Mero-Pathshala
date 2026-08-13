import BuyCourseButton from "@/components/BuyCourseButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import {
  AlertCircle,
  ArrowLeft,
  BadgeInfo,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  Lock,
  PlayCircle,
  RefreshCw,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      {/* Hero Skeleton */}
      <div className="bg-slate-900 text-white py-12 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <Skeleton className="h-4 w-32 bg-slate-800" />
          <Skeleton className="h-10 w-3/4 max-w-2xl bg-slate-800" />
          <Skeleton className="h-6 w-1/2 max-w-xl bg-slate-800" />
          <div className="flex flex-wrap gap-4 pt-2">
            <Skeleton className="h-8 w-40 bg-slate-800 rounded-full" />
            <Skeleton className="h-8 w-32 bg-slate-800 rounded-full" />
            <Skeleton className="h-8 w-28 bg-slate-800 rounded-full" />
          </div>
        </div>
      </div>

      {/* Body Skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <Skeleton className="h-6 w-36 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-4 w-4/6 bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <Skeleton className="h-6 w-48 bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 sticky top-24">
            <Skeleton className="w-full aspect-video rounded-xl bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-8 w-1/2 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-12 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseDetail: React.FC = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [selectedPreviewVideo, setSelectedPreviewVideo] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } =
    useGetCourseDetailWithStatusQuery(courseId || "", {
      skip: !courseId,
    });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Course link copied to clipboard!");
    }
  };

  if (isLoading) {
    return <CourseDetailSkeleton />;
  }

  // Distinguish error categories
  if (isError || !data?.course) {
    const errStatus = (error as any)?.status;
    const is404 = errStatus === 404 || !courseId;
    const isFetchError = errStatus === "FETCH_ERROR";

    let errorTitle = "Failed to load course details";
    let errorDescription = "Something went wrong while loading this course. Please try again.";

    if (is404) {
      errorTitle = "Course Not Found";
      errorDescription = "The course you are looking for may have been removed, unpublished, or the link is invalid.";
    } else if (isFetchError) {
      errorTitle = "Network Error";
      errorDescription = "Unable to connect to the server. Please check your internet connection and try again.";
    }

    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <Card className="max-w-md w-full text-center p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-950/50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-red-600 dark:text-red-400">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{errorTitle}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
            {errorDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate("/course/search")}
              className="gap-2 rounded-xl"
            >
              <ArrowLeft size={16} />
              Browse Courses
            </Button>
            {!is404 && (
              <Button onClick={() => refetch()} className="gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
                <RefreshCw size={16} />
                Try Again
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  const { course, purchased } = data;

  const creatorName =
    typeof course.creator === "object" && course.creator?.name
      ? course.creator.name
      : "AI Guru Instructor";
  const creatorEmail =
    typeof course.creator === "object" && course.creator?.email
      ? course.creator.email
      : "";
  const creatorPhoto =
    typeof course.creator === "object" && course.creator?.photoUrl
      ? course.creator.photoUrl
      : "https://avatar.iran.liara.run/public/boy";

  const lectures = course.lectures || [];
  const previewLecture =
    lectures.find((l: any) => l.isPreviewFree && l.videoUrl) ||
    lectures.find((l: any) => l.videoUrl);

  const activeVideoUrl = selectedPreviewVideo || previewLecture?.videoUrl;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  const formattedDate = course.createdAt
    ? new Date(course.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto py-10 px-4 md:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 flex-wrap">
            <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/course/search" className="hover:text-orange-400 transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-slate-300 truncate max-w-[200px] sm:max-w-xs">{course.courseTitle}</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-2/3 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 text-xs font-semibold rounded-full">
                  {course.category || "Technology"}
                </Badge>
                <Badge className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 text-xs rounded-full">
                  {course.courseLevel || "All Levels"}
                </Badge>
                {purchased && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    Enrolled
                  </Badge>
                )}
              </div>

              <h1 className="font-extrabold text-2xl md:text-4xl leading-tight text-white tracking-tight">
                {course.courseTitle}
              </h1>

              {course.subTitle && (
                <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                  {course.subTitle}
                </p>
              )}

              {/* Creator & Meta Details */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-slate-300 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 ring-2 ring-orange-500/40">
                    <AvatarImage src={creatorPhoto} alt={creatorName} />
                    <AvatarFallback className="bg-orange-500 text-white font-bold">
                      {creatorName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-slate-400">Created by</p>
                    <p className="font-semibold text-white">{creatorName}</p>
                  </div>
                </div>

                {formattedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-orange-400" />
                    <span>Updated {formattedDate}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Users size={16} className="text-orange-400" />
                  <span>{course.enrolledStudents?.length || 0} enrolled</span>
                </div>

                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-orange-400" />
                  <span>{lectures.length} {lectures.length === 1 ? "lecture" : "lectures"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto my-8 px-4 md:px-8 flex flex-col lg:flex-row gap-10">
        {/* Left Column: Details & Curriculum */}
        <div className="w-full lg:w-2/3 space-y-8">
          {/* Course Description */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800/60 pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <Sparkles size={20} className="text-orange-500" />
                Course Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {course.description ? (
                <div
                  className="prose dark:prose-invert max-w-none text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-300"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />
              ) : (
                <p className="text-sm text-slate-500 italic">
                  No detailed description provided for this course.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Curriculum Section */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800/60 flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <GraduationCap size={20} className="text-orange-500" />
                  Course Content & Curriculum
                </CardTitle>
                <CardDescription className="mt-1">
                  {lectures.length} {lectures.length === 1 ? "lecture" : "lectures"} included in this syllabus
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-2.5">
              {lectures.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">
                  <BookOpen className="mx-auto mb-2 text-slate-400" size={32} />
                  <p>Curriculum is being prepared. Lectures will be published soon.</p>
                </div>
              ) : (
                lectures.map((lecture: any, idx: number) => {
                  const isPreviewable = lecture.isPreviewFree || purchased;
                  return (
                    <div
                      key={lecture._id || idx}
                      onClick={() => {
                        if (lecture.videoUrl && isPreviewable) {
                          setSelectedPreviewVideo(lecture.videoUrl);
                        }
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 ${
                        lecture.videoUrl && isPreviewable
                          ? "cursor-pointer hover:bg-orange-50/60 dark:hover:bg-orange-950/20 border-slate-200 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900/40"
                          : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`p-2 rounded-lg ${
                            isPreviewable
                              ? "bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                          }`}
                        >
                          {isPreviewable ? (
                            <PlayCircle size={18} />
                          ) : (
                            <Lock size={18} />
                          )}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {idx + 1}. {lecture.lectureTitle || "Untitled Lecture"}
                          </p>
                          {lecture.isPreviewFree && (
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                              Free Preview Available
                            </span>
                          )}
                        </div>
                      </div>

                      {lecture.isPreviewFree && lecture.videoUrl && (
                        <Badge
                          variant="outline"
                          className="text-xs text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/40"
                        >
                          Watch Preview
                        </Badge>
                      )}
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Instructor Bio Card */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800/60 pb-4">
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users size={20} className="text-orange-500" />
                Instructor
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex items-start gap-4">
              <Avatar className="h-16 w-16 ring-4 ring-orange-500/20">
                <AvatarImage src={creatorPhoto} alt={creatorName} />
                <AvatarFallback className="bg-orange-500 text-white font-extrabold text-lg">
                  {creatorName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{creatorName}</h3>
                {creatorEmail && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">{creatorEmail}</p>
                )}
                <p className="text-sm text-slate-600 dark:text-slate-300 pt-2">
                  Dedicated AI and technology educator on AI Guru Nepal, providing practical project-based learning tailored to real-world applications.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Pricing & Purchase Card */}
        <div className="w-full lg:w-1/3">
          <Card className="sticky top-20 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl overflow-hidden">
            {/* Preview Video or Thumbnail */}
            <div className="w-full aspect-video bg-slate-950 relative overflow-hidden group">
              {activeVideoUrl ? (
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={activeVideoUrl}
                  controls={true}
                  playing={false}
                />
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={
                      course.courseThumbnail ||
                      "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80"
                    }
                    alt={course.courseTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                    <PlayCircle size={48} className="text-orange-500 mb-2 opacity-90 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {lectures.length > 0 ? "Course Overview" : "Enroll Now"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <CardContent className="p-6 space-y-5">
              {/* Price Display */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Price</span>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {course.coursePrice ? (
                      `₹${course.coursePrice.toLocaleString("en-IN")}`
                    ) : (
                      <span className="text-emerald-500 font-extrabold">Free / नि:शुल्क</span>
                    )}
                  </div>
                </div>
                <Badge className="bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800 text-xs font-semibold">
                  Lifetime Access
                </Badge>
              </div>

              <Separator />

              {/* Action Button */}
              <div>
                {purchased ? (
                  <Button
                    onClick={handleContinueCourse}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-6 rounded-xl shadow-lg shadow-emerald-600/30 text-base"
                  >
                    Continue to Course
                  </Button>
                ) : (
                  <BuyCourseButton courseId={courseId || ""} />
                )}
              </div>

              {/* Features List */}
              <div className="space-y-3 pt-2 text-xs text-slate-600 dark:text-slate-300">
                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">This course includes:</p>
                <div className="flex items-center gap-2.5">
                  <PlayCircle size={15} className="text-orange-500 shrink-0" />
                  <span>{lectures.length} high-definition on-demand video lectures</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={15} className="text-orange-500 shrink-0" />
                  <span>Full lifetime access to all learning materials</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <GraduationCap size={15} className="text-orange-500 shrink-0" />
                  <span>Official Certificate of Completion</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={15} className="text-orange-500 shrink-0" />
                  <span>Learn at your own pace from mobile or desktop</span>
                </div>
              </div>

              <Separator />

              {/* Share Button */}
              <Button
                variant="ghost"
                onClick={handleShare}
                className="w-full text-xs text-slate-600 dark:text-slate-400 hover:text-orange-500 gap-2 h-9 rounded-xl"
              >
                <Share2 size={14} />
                Share this course with friends
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
