import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Wrench,
  Users,
  BarChart3,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminHomepageProps {
  data?: any;
  onLogClick?: (action: string, type: string, id: string) => void;
}

const AdminHomepage: React.FC<AdminHomepageProps> = ({ data, onLogClick }) => {
  const navigate = useNavigate();
  const admin = data?.adminData || {};

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <Badge className="bg-orange-500 text-white text-[10px] uppercase font-bold">Executive Control Center</Badge>
          <h1 className="text-3xl font-black mt-1">Platform Admin Workspace</h1>
          <p className="text-sm text-gray-300 mt-1">Manage platform configuration, instructor approvals, and content feeds.</p>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => navigate("/admin/homepage-cms")} className="bg-orange-500 hover:bg-orange-600 font-bold rounded-full">
            <Sliders size={16} className="mr-1" /> Configure Homepage CMS
          </Button>
          <Button onClick={() => navigate("/admin/dashboard")} variant="outline" className="border-white/30 text-white font-bold rounded-full">
            Full Admin Panel
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Total Registered Users</span>
            <Users size={18} className="text-blue-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{admin.totalUsers || 0}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Pending Instructor Apps</span>
            <GraduationCap size={18} className="text-orange-500" />
          </div>
          <p className="text-3xl font-black text-orange-500">{admin.pendingApplications || 0}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Total Published Courses</span>
            <BookOpen size={18} className="text-purple-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{admin.totalCourses || 0}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Total AI Tools</span>
            <Wrench size={18} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{admin.totalTools || 0}</p>
        </div>
      </div>

      {/* Admin Operations Grid */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/admin/homepage-cms")}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-orange-500 transition-all cursor-pointer space-y-2"
        >
          <Sliders className="text-orange-500" size={24} />
          <h3 className="text-lg font-bold">Homepage CMS Settings</h3>
          <p className="text-xs text-gray-500">Edit hero titles, promo banners, and section visibility.</p>
        </div>

        <div
          onClick={() => navigate("/admin/instructors/applications")}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-orange-500 transition-all cursor-pointer space-y-2"
        >
          <GraduationCap className="text-purple-500" size={24} />
          <h3 className="text-lg font-bold">Instructor Desk</h3>
          <p className="text-xs text-gray-500">Review pending candidate applications and approve faculty.</p>
        </div>

        <div
          onClick={() => navigate("/admin/homepage-analytics")}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-orange-500 transition-all cursor-pointer space-y-2"
        >
          <BarChart3 className="text-emerald-500" size={24} />
          <h3 className="text-lg font-bold">Homepage Engagement Analytics</h3>
          <p className="text-xs text-gray-500">Track click rates, popular sections, and recommendation usage.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
