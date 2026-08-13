import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  BookOpen,
  DollarSign,
  Plus,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface InstructorHomepageProps {
  data?: any;
  onLogClick?: (action: string, type: string, id: string) => void;
}

const InstructorHomepage: React.FC<InstructorHomepageProps> = ({ data, onLogClick }) => {
  const navigate = useNavigate();
  const user = data?.user;
  const inst = data?.instructorData || {};

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <Badge className="bg-orange-500 text-white text-[10px] uppercase font-bold">Instructor Portal</Badge>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
            Welcome Back, Professor {user?.name}! 🎓
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage your courses, track student engagement, and view your business metrics.</p>
        </div>

        <Button
          onClick={() => navigate("/admin/course/create")}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold px-6 py-6 shadow-md"
        >
          <Plus size={18} className="mr-2" /> Create New Course
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Total Students</span>
            <Users size={18} className="text-blue-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{inst.totalStudents || 0}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Total Revenue</span>
            <DollarSign size={18} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-600">Rs. {inst.totalRevenue || 0}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Published Courses</span>
            <BookOpen size={18} className="text-orange-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{inst.totalCourses || 0}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Course Views</span>
            <BarChart3 size={18} className="text-purple-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{inst.courseViews || 0}</p>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/admin/instructor-students")}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-orange-500 transition-all cursor-pointer space-y-2"
        >
          <Users className="text-blue-500" size={24} />
          <h3 className="text-lg font-bold">Student Roster</h3>
          <p className="text-xs text-gray-500">Track student course progress & completion rates.</p>
        </div>

        <div
          onClick={() => navigate("/admin/instructor-analytics")}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-orange-500 transition-all cursor-pointer space-y-2"
        >
          <BarChart3 className="text-emerald-500" size={24} />
          <h3 className="text-lg font-bold">Teaching Analytics</h3>
          <p className="text-xs text-gray-500">View traffic trends, monthly growth, and revenues.</p>
        </div>

        <div
          onClick={() => navigate("/admin/instructor-resources")}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-orange-500 transition-all cursor-pointer space-y-2"
        >
          <Lightbulb className="text-amber-500" size={24} />
          <h3 className="text-lg font-bold">Educator Knowledge Base</h3>
          <p className="text-xs text-gray-500">Recording tips, thumbnail standards, and policies.</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorHomepage;
