import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit, Plus, Search, BookOpen, Layers, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading, isError } = useGetCreatorCourseQuery();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const courses = data?.courses || [];

  const filteredCourses = courses.filter((c) =>
    c.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="text-orange-500" size={24} /> Course Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Create, update curriculum, manage lectures, and publish your courses.
          </p>
        </div>

        <Button
          onClick={() => navigate("/admin/course/create")}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold shadow-md self-start sm:self-auto"
        >
          <Plus size={16} className="mr-1.5" /> Create Course
        </Button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 text-gray-400" size={18} />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your courses by title or category..."
            className="pl-11 rounded-full border-gray-200 dark:border-slate-800"
          />
        </div>
        <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
          Total Courses: {courses.length}
        </span>
      </div>

      {/* Courses Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium">Loading your courses...</div>
        ) : isError ? (
          <div className="p-12 text-center text-red-500 font-medium">Failed to load courses. Please try again.</div>
        ) : filteredCourses.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-3">
            <p className="font-semibold">No courses found.</p>
            <Button
              onClick={() => navigate("/admin/course/create")}
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-bold"
            >
              <Plus size={14} className="mr-1" /> Create your first course
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="font-bold">Course</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold">Lectures</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50">
                  <TableCell className="font-bold text-gray-900 dark:text-white">
                    <div className="flex items-center gap-3">
                      {course.courseThumbnail ? (
                        <img
                          src={course.courseThumbnail}
                          alt={course.courseTitle}
                          className="w-12 h-8 rounded-lg object-cover border border-gray-200 dark:border-slate-700 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-8 rounded-lg bg-orange-100 dark:bg-slate-800 flex items-center justify-center text-orange-500 text-[10px] font-extrabold shrink-0">
                          AI
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-sm truncate max-w-xs">{course.courseTitle}</p>
                        <p className="text-[11px] text-gray-400 font-normal">{course.courseLevel || "All Levels"}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {course.category || "General"}
                  </TableCell>
                  <TableCell className="text-xs font-bold text-emerald-600">
                    {course.coursePrice ? `Rs. ${course.coursePrice}` : "Free"}
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    {course.lectures?.length || 0} Lectures
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-[10px] ${
                        course.isPublished
                          ? "bg-emerald-500 text-white hover:bg-emerald-600"
                          : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/admin/course/${course._id}/lecture`)}
                        className="rounded-full text-xs font-bold h-8 px-3"
                      >
                        <Layers size={14} className="mr-1" /> Lectures
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/admin/course/${course._id}`)}
                        className="text-orange-500 hover:text-orange-600 rounded-full h-8 w-8 p-0"
                      >
                        <Edit size={16} />
                      </Button>
                    </div>
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

export default CourseTable;
