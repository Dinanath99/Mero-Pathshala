import React from "react";

export const CourseSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm animate-pulse space-y-4">
    <div className="w-full h-44 bg-gray-200 dark:bg-slate-800 rounded-2xl"></div>
    <div className="space-y-2">
      <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded w-3/4"></div>
      <div className="h-4 bg-gray-100 dark:bg-slate-800/60 rounded w-1/2"></div>
    </div>
    <div className="flex items-center justify-between pt-2">
      <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/4"></div>
      <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded-full w-24"></div>
    </div>
  </div>
);

export const RoadmapSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm animate-pulse space-y-4">
    <div className="w-full h-48 bg-gray-200 dark:bg-slate-800 rounded-2xl"></div>
    <div className="space-y-2">
      <div className="h-5 bg-gray-200 dark:bg-slate-800 rounded w-3/4"></div>
      <div className="h-4 bg-gray-100 dark:bg-slate-800/60 rounded w-1/2"></div>
    </div>
    <div className="flex items-center justify-between pt-2">
      <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/4"></div>
      <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded-full w-24"></div>
    </div>
  </div>
);

interface GridSkeletonProps {
  count?: number;
}

export const CourseGridSkeleton: React.FC<GridSkeletonProps> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <CourseSkeleton key={i} />
    ))}
  </div>
);

export const BlogSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-gray-100 dark:border-slate-800 shadow-sm animate-pulse space-y-4">
    <div className="w-full h-48 bg-gray-200 dark:bg-slate-800 rounded-2xl"></div>
    <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-5/6"></div>
    <div className="h-4 bg-gray-100 dark:bg-slate-800/60 rounded w-full"></div>
    <div className="h-4 bg-gray-100 dark:bg-slate-800/60 rounded w-2/3"></div>
  </div>
);

interface TableSkeletonProps {
  rows?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5 }) => (
  <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-4 space-y-3 animate-pulse">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-slate-800/50">
        <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded-full w-16"></div>
      </div>
    ))}
  </div>
);

export const PageHeaderSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 space-y-4 animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded w-1/3"></div>
    <div className="h-4 bg-gray-100 dark:bg-slate-800/60 rounded w-1/2"></div>
  </div>
);
