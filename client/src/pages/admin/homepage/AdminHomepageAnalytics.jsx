import React from "react";
import { useGetHomepageAnalyticsStatsQuery } from "@/features/api/homepageApi";
import { BarChart3, TrendingUp, MousePointer, Sparkles, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminHomepageAnalytics = () => {
  const { data, isLoading } = useGetHomepageAnalyticsStatsQuery();
  const analytics = data?.analytics || {};

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="text-emerald-500" /> Homepage Engagement Analytics
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Monitor learner clicks, recommendation CTR, and resume learning usage to optimize homepage experience.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Total Click Events</span>
            <MousePointer size={18} className="text-blue-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">{analytics.totalEvents || 0}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Resume Learning Usage</span>
            <PlayCircle size={18} className="text-orange-500" />
          </div>
          <p className="text-3xl font-black text-orange-500">{analytics.resumeClicks || 0}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Recommendation CTR</span>
            <TrendingUp size={18} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-600">{analytics.recommendationClicks || 0}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span>Today's AI Pick Clicks</span>
            <Sparkles size={18} className="text-amber-500" />
          </div>
          <p className="text-3xl font-black text-amber-500">{analytics.todaysPickClicks || 0}</p>
        </div>
      </div>

      {/* Section Engagements Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-4 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Section Engagement Breakdown</h3>

        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading analytics table...</div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="font-bold">Homepage Section Key</TableHead>
                <TableHead className="font-bold text-right">Total Click Interactions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics.sectionEngagements?.map((sec, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-bold text-gray-800 dark:text-gray-200">
                    {sec._id || "general_click"}
                  </TableCell>
                  <TableCell className="text-right font-black text-orange-500">
                    {sec.clicks} clicks
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AdminHomepageAnalytics;
