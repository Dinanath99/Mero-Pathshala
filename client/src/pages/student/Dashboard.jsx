import React, { useState } from "react";
import { useGetStudentDashboardQuery } from "@/features/api/slxApi";
import { useNavigate } from "react-router-dom";
import {
  Flame,
  BookOpen,
  Award,
  Clock,
  Sparkles,
  Wrench,
  Newspaper,
  FileText,
  Bookmark,
  Bell,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Calendar,
  Zap,
  Target,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetStudentDashboardQuery();

  const user = data?.user;
  const continueLearning = data?.continueLearning || [];
  const continueWatching = data?.continueWatching;
  const stats = data?.stats || {};
  const weeklyGoal = data?.weeklyGoal || {};
  const calendarDays = data?.calendarDays || [];
  const achievements = data?.achievements || [];
  const activities = data?.activities || [];
  const unreadNotificationCount = data?.unreadNotificationCount || 0;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-500 font-bold space-y-4">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Loading your personalized learning dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* 1. WELCOME SECTION */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-purple-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.photoUrl || "https://github.com/shadcn.png"}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Welcome back, {user?.name || "Learner"}! 👋
              </h1>
              <Badge className="bg-orange-500 text-white font-bold text-xs px-2.5 py-1 flex items-center gap-1">
                <Flame size={14} className="fill-current animate-pulse" /> {stats.streakDays || 5}-Day Streak
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              You've completed <span className="text-orange-400 font-bold">{stats.hoursLearned || 1.5} hours</span> of learning this week. Keep up the momentum!
            </p>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={() => navigate("/my-notes")}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 rounded-full text-xs font-bold"
          >
            <FileText size={14} className="mr-1.5" /> Study Notes
          </Button>

          <Button
            onClick={() => navigate("/my-bookmarks")}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 rounded-full text-xs font-bold"
          >
            <Bookmark size={14} className="mr-1.5" /> Bookmarks
          </Button>

          <Button
            onClick={() => navigate("/notifications")}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 rounded-full text-xs font-bold relative"
          >
            <Bell size={14} className="mr-1.5" /> Notifications
            {unreadNotificationCount > 0 && (
              <span className="w-2.5 h-2.5 bg-orange-500 rounded-full absolute -top-1 -right-1" />
            )}
          </Button>
        </div>
      </div>

      {/* 2. CONTINUE LEARNING & CONTINUE WATCHING */}
      {continueWatching && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <PlayCircle className="text-orange-500" /> Continue Watching / अगाडि बढाउनुहोस्
            </h2>
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-slate-900/10 p-6 rounded-3xl border border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={continueWatching.courseThumbnail || "https://via.placeholder.com/150"}
                alt={continueWatching.courseTitle}
                className="w-24 h-24 rounded-2xl object-cover border shrink-0"
              />
              <div className="space-y-1">
                <Badge className="bg-orange-500 text-white text-[10px]">
                  Lesson {continueWatching.completedLectures + 1} of {continueWatching.totalLectures}
                </Badge>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {continueWatching.currentLessonTitle}
                </h3>
                <p className="text-xs text-gray-500 font-medium">{continueWatching.courseTitle}</p>
                <div className="w-48 pt-1">
                  <Progress value={continueWatching.progressPercent} className="h-1.5" />
                  <span className="text-[10px] font-bold text-gray-400 mt-1 block">
                    {continueWatching.progressPercent}% Completed • Est. {continueWatching.estimatedTimeRemaining} remaining
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate(`/course-progress/${continueWatching.courseId}`)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-7 py-5 text-sm shrink-0 shadow-lg shadow-orange-500/20"
            >
              Resume Lesson <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </section>
      )}

      {/* 3. LEARNING CALENDAR & WEEKLY GOALS GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Monthly Learning Streak Calendar */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="text-purple-500" /> Learning Streak Calendar
            </h3>
            <span className="text-xs font-bold text-orange-500">🔥 5 Days Active</span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-2">
            {calendarDays.map((d, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl text-center space-y-1 ${
                  d.status === "completed"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-slate-100 dark:bg-slate-800 text-gray-400 border border-transparent"
                }`}
              >
                <span className="text-[10px] font-bold block uppercase">{d.dayName}</span>
                <span className="text-sm font-extrabold block">{d.dayNum}</span>
                <CheckCircle2
                  size={14}
                  className={`mx-auto ${d.status === "completed" ? "text-emerald-500" : "text-gray-300"}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Target Progress */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Target className="text-orange-500" /> Weekly Target Goal
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>📚 3 Course Lessons</span>
                <span className="text-orange-500">{weeklyGoal.lessons?.current || 2} / 3</span>
              </div>
              <Progress value={((weeklyGoal.lessons?.current || 2) / 3) * 100} className="h-1.5" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>📝 2 AI Blogs</span>
                <span className="text-purple-500">{weeklyGoal.blogs?.current || 2} / 2</span>
              </div>
              <Progress value={100} className="h-1.5" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>🛠 1 AI Tool Explored</span>
                <span className="text-blue-500">1 / 1</span>
              </div>
              <Progress value={100} className="h-1.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. LEARNING STATISTICS CARDS */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Learning Statistics / सिकाइ तथ्याङ्क</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase">Completed Courses</span>
            <p className="text-2xl font-black text-emerald-500">{stats.coursesCompleted || 0}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase">Courses In Progress</span>
            <p className="text-2xl font-black text-orange-500">{stats.coursesInProgress || 1}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase">Hours Learned</span>
            <p className="text-2xl font-black text-purple-500">{stats.hoursLearned || 1.5} hrs</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase">Prompts Copied</span>
            <p className="text-2xl font-black text-blue-500">{stats.promptsCopied || 12}</p>
          </div>
        </div>
      </section>

      {/* 5. ACHIEVEMENTS BADGES GRID */}
      <section className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Badge className="bg-amber-500 text-white font-bold text-xs">Gamification</Badge>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
              Achievements & Milestone Badges
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach._id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center text-xl shrink-0 font-bold">
                🏆
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{ach.title}</h3>
                <p className="text-[11px] text-gray-500">{ach.description}</p>
                <span className="text-[10px] text-emerald-600 font-bold block pt-1">Unlocked</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
