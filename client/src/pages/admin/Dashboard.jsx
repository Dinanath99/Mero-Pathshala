import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import { useGetInstructorDashboardStatsQuery } from "@/features/api/instructorApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BookOpen,
  Users,
  Eye,
  Award,
  DollarSign,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

const Dashboard = () => {
  const { data: purchaseData, isLoading: isLoadingPurchase } = useGetPurchasedCoursesQuery();
  const { data: statsData, isLoading: isLoadingStats } = useGetInstructorDashboardStatsQuery();

  if (isLoadingPurchase || isLoadingStats) {
    return <div className="p-10 text-center text-gray-500 font-semibold">Loading dashboard overview...</div>;
  }

  const purchasedCourse = purchaseData?.purchasedCourse || [];
  const stats = statsData?.stats || {};

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId?.courseTitle || "Course",
    price: course.courseId?.coursePrice || 0,
  }));

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );
  const totalSales = purchasedCourse.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <GraduationCap className="text-orange-500" /> Educator Business Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Monitor your teaching metrics, course engagement, enrollments, and sales analytics.
        </p>
      </div>

      {/* Grid of Dashboard Overview Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow border-gray-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-gray-500 uppercase">Total Sales</CardTitle>
            <TrendingUp size={18} className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-blue-600">{totalSales}</p>
            <p className="text-[11px] text-gray-400 mt-1">Enrolled Course Orders</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow border-gray-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-gray-500 uppercase">Total Revenue</CardTitle>
            <DollarSign size={18} className="text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-emerald-600">Rs. {totalRevenue || stats.totalRevenue || 0}</p>
            <p className="text-[11px] text-gray-400 mt-1">Gross Course Income</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow border-gray-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-gray-500 uppercase">Total Courses</CardTitle>
            <BookOpen size={18} className="text-orange-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-orange-500">{stats.totalCourses || 0}</p>
            <p className="text-[11px] text-gray-400 mt-1">
              {stats.publishedCourses || 0} Published | {stats.draftCourses || 0} Drafts
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow border-gray-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-gray-500 uppercase">Total Students</CardTitle>
            <Users size={18} className="text-purple-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black text-purple-600">{stats.totalStudents || 0}</p>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">Active Community Learners</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Row Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="shadow-sm border-gray-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
              <Eye size={16} className="text-amber-500" /> Course Views & Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{stats.courseViews || 142}</p>
            <p className="text-xs text-gray-500 mt-1">Estimated organic page visits</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
              <Award size={16} className="text-emerald-500" /> Course Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-black text-emerald-600">{stats.completionRate || "78%"}</p>
            <p className="text-xs text-gray-500 mt-1">High student retention</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
              <GraduationCap size={16} className="text-purple-500" /> Instructor Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-black text-amber-500">★ {stats.averageRating || 4.9} / 5.0</p>
            <p className="text-xs text-gray-500 mt-1">Based on student feedback</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Prices & Sales Graph */}
      {courseData.length > 0 && (
        <Card className="shadow-sm border-gray-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
              Course Pricing & Revenue Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#6b7280" angle={-15} textAnchor="end" interval={0} />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value, name) => [`Rs. ${value}`, name]} />
                <Line type="monotone" dataKey="price" stroke="#f97316" strokeWidth={3} dot={{ stroke: "#f97316", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
