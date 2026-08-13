import {
  ChartNoAxesColumn,
  SquareLibrary,
  Wrench,
  FolderTree,
  Sparkles,
  Newspaper,
  GraduationCap,
  Users,
  BarChart3,
  User,
  Lightbulb,
} from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  const getNavClass = ({ isActive }) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30 font-bold"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-orange-500 dark:hover:text-orange-400"
    }`;

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <aside className="hidden lg:block w-[260px] sm:w-[280px] space-y-6 border-r border-gray-200 dark:border-slate-800 p-4 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm shrink-0">
        <div className="space-y-1.5">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3 py-1">Core Dashboard</p>
          <NavLink to="dashboard" className={getNavClass}>
            <ChartNoAxesColumn size={18} />
            <span>Dashboard Overview</span>
          </NavLink>
          <NavLink to="course" className={getNavClass}>
            <SquareLibrary size={18} />
            <span>Courses</span>
          </NavLink>
          <NavLink to="roadmaps" className={getNavClass}>
            <Sparkles size={18} className="text-orange-400" />
            <span>Learning Roadmaps</span>
          </NavLink>

          <p className="text-[11px] font-extrabold uppercase tracking-wider text-orange-500 px-3 pt-4 pb-1">Instructor Marketplace</p>
          <NavLink to="instructors/applications" className={getNavClass}>
            <GraduationCap size={18} />
            <span>Applications Desk</span>
          </NavLink>
          <NavLink to="instructors" className={getNavClass}>
            <GraduationCap size={18} />
            <span>All Instructors</span>
          </NavLink>
          <NavLink to="instructor-students" className={getNavClass}>
            <Users size={18} />
            <span>Student Roster</span>
          </NavLink>
          <NavLink to="instructor-analytics" className={getNavClass}>
            <BarChart3 size={18} />
            <span>Teaching Analytics</span>
          </NavLink>
          <NavLink to="instructor-profile" className={getNavClass}>
            <User size={18} />
            <span>Marketplace Profile</span>
          </NavLink>
          <NavLink to="instructor-resources" className={getNavClass}>
            <Lightbulb size={18} />
            <span>Educator Resources</span>
          </NavLink>

          <p className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3 pt-4 pb-1">Content CMS</p>
          <NavLink to="blog" className={getNavClass}>
            <SquareLibrary size={18} />
            <span>Blogs</span>
          </NavLink>
          <NavLink to="categories" className={getNavClass}>
            <SquareLibrary size={18} />
            <span>Blog Categories</span>
          </NavLink>
          <NavLink to="tools" className={getNavClass}>
            <Wrench size={18} />
            <span>AI Tools</span>
          </NavLink>
          <NavLink to="tool-categories" className={getNavClass}>
            <FolderTree size={18} />
            <span>Tool Categories</span>
          </NavLink>
          <NavLink to="prompts" className={getNavClass}>
            <Sparkles size={18} />
            <span>Prompt Library</span>
          </NavLink>
          <NavLink to="news" className={getNavClass}>
            <Newspaper size={18} />
            <span>AI News Hub</span>
          </NavLink>

          <p className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 px-3 pt-4 pb-1">Personalized Homepage</p>
          <NavLink to="homepage-cms" className={getNavClass}>
            <Sparkles size={18} />
            <span>Homepage CMS</span>
          </NavLink>
          <NavLink to="homepage-analytics" className={getNavClass}>
            <BarChart3 size={18} />
            <span>Homepage CTR Analytics</span>
          </NavLink>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
