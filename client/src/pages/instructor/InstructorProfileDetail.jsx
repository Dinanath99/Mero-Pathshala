import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetInstructorBySlugQuery } from "@/features/api/instructorApi";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  BookOpen,
  Users,
  Star,
  Award,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Youtube,
  GraduationCap,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const InstructorProfileDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetInstructorBySlugQuery(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 text-center font-semibold text-gray-500">
        Loading instructor profile...
      </div>
    );
  }

  if (isError || !data?.instructor) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 text-center px-4">
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-4">
          <GraduationCap className="w-12 h-12 text-orange-500 mx-auto" />
          <h2 className="text-2xl font-bold">Instructor Profile Not Found</h2>
          <p className="text-gray-500 text-sm">The instructor profile you are trying to view is unavailable or does not exist.</p>
          <Button onClick={() => navigate("/instructors")} className="bg-orange-500 text-white rounded-full">
            Back to All Instructors
          </Button>
        </div>
      </div>
    );
  }

  const instructor = data.instructor;
  const courses = data.courses || [];
  const social = instructor.socialLinks || {};

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>{`${instructor.user?.name || "Instructor"} - AI Guru Nepal`}</title>
        <meta name="description" content={instructor.bio || instructor.title} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 mb-6">
        <button
          onClick={() => navigate("/instructors")}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Faculty Directory
        </button>
      </div>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Cover & Avatar Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 shadow-sm">
          <div className="relative h-48 sm:h-64 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600">
            {instructor.coverImage && (
              <img src={instructor.coverImage} alt="Cover" className="w-full h-full object-cover" />
            )}
            <div className="absolute -bottom-12 left-8">
              <img
                src={instructor.profilePhoto || instructor.user?.photoUrl || "https://github.com/shadcn.png"}
                alt={instructor.user?.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white dark:border-slate-900 shadow-xl"
              />
            </div>
          </div>

          <div className="pt-16 p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                  {instructor.user?.name}
                </h1>
                <p className="text-base font-bold text-orange-600 dark:text-orange-400 mt-1">
                  {instructor.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{instructor.specialization}</p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
                {social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-blue-400 transition-colors"
                  >
                    <Twitter size={18} />
                  </a>
                )}
                {social.website && (
                  <a
                    href={social.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-orange-500 transition-colors"
                  >
                    <Globe size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-b dark:border-slate-800 text-center py-4">
              <div>
                <p className="text-2xl font-black text-orange-500">{instructor.coursesCount || courses.length}</p>
                <p className="text-xs font-semibold text-gray-500">Courses</p>
              </div>
              <div>
                <p className="text-2xl font-black text-blue-500">{instructor.totalStudents || 0}</p>
                <p className="text-xs font-semibold text-gray-500">Students Taught</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
                  <Star size={18} className="fill-amber-500" /> {instructor.rating || 4.9}
                </p>
                <p className="text-xs font-semibold text-gray-500">Rating ({instructor.reviewsCount || 14})</p>
              </div>
            </div>

            {/* About & Bio */}
            {instructor.bio && (
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">About the Instructor</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {instructor.bio}
                </p>
              </div>
            )}

            {/* Expertise & Languages */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {instructor.expertise && instructor.expertise.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-gray-400">Core Expertise</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {instructor.expertise.map((exp, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-orange-500/30 text-orange-600 dark:text-orange-400">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {instructor.languages && instructor.languages.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-gray-400">Teaching Languages</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {instructor.languages.map((lang, idx) => (
                      <Badge key={idx} className="bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-xs">
                        🗣️ {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Published Courses Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="text-orange-500" /> Courses by {instructor.user?.name} ({courses.length})
          </h2>

          {courses.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 text-center text-gray-500">
              No published courses yet. Check back soon for upcoming masterclasses!
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  onClick={() => navigate(`/course-detail/${course._id}`)}
                  className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={course.courseThumbnail || "https://via.placeholder.com/300x180"}
                        alt={course.courseTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px]">
                        {course.category || "AI Course"}
                      </Badge>
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                        {course.courseTitle}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{course.subTitle || course.description}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t dark:border-slate-800 mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-600">Rs. {course.coursePrice || "Free"}</span>
                    <span className="text-xs font-bold text-orange-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Course <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default InstructorProfileDetail;
