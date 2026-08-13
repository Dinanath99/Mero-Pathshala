import React from "react";
import { useGetInstructorDashboardStatsQuery } from "@/features/api/instructorApi";
import { BarChart3, TrendingUp, Users, Eye, DollarSign, Award, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const InstructorAnalytics = () => {
  const { data, isLoading } = useGetInstructorDashboardStatsQuery();
  const stats = data?.stats || {};

  const monthlyData = [
    { month: "Jan", enrollments: 14, views: 120 },
    { month: "Feb", enrollments: 28, views: 240 },
    { month: "Mar", enrollments: 45, views: 390 },
    { month: "Apr", enrollments: 62, views: 510 },
    { month: "May", enrollments: 89, views: 720 },
    { month: "Jun", enrollments: 110, views: 950 },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="text-purple-500" /> Teaching Analytics & Insights
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Detailed breakdown of student growth, course views, monthly enrollments, and estimated earnings.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Total Students</span>
            <Users size={18} className="text-blue-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.totalStudents || 0}</p>
          <span className="text-[11px] text-emerald-600 font-bold">+18% this month</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Course Views</span>
            <Eye size={18} className="text-amber-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.courseViews || 0}</p>
          <span className="text-[11px] text-emerald-600 font-bold">+24% traffic growth</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Est. Revenue</span>
            <DollarSign size={18} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">Rs. {stats.totalRevenue || 0}</p>
          <span className="text-[11px] text-gray-400">Future Khalti/eSewa ready</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Completion Rate</span>
            <Award size={18} className="text-purple-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.completionRate || "78%"}</p>
          <span className="text-[11px] text-purple-600 font-bold">Above average</span>
        </div>
      </div>

      {/* Visual Analytics Bar Chart Simulation */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-orange-500" /> Monthly Student Growth & Traffic
          </h3>
          <Badge variant="outline" className="text-xs">2026 Analytics</Badge>
        </div>

        <div className="grid grid-cols-6 gap-4 items-end h-48 pt-6 border-b dark:border-slate-800 pb-4">
          {monthlyData.map((d, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
              <div
                className="w-full max-w-[40px] bg-gradient-to-t from-orange-500 to-pink-500 rounded-t-xl transition-all duration-500"
                style={{ height: `${(d.enrollments / 110) * 100}%` }}
              />
              <span className="text-xs font-bold text-gray-500">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorAnalytics;
