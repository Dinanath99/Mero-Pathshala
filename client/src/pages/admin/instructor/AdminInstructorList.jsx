import React from "react";
import { useGetInstructorsQuery } from "@/features/api/instructorApi";
import { useNavigate } from "react-router-dom";
import {
  Users,
  GraduationCap,
  BookOpen,
  Eye,
  Star,
  ExternalLink,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminInstructorList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetInstructorsQuery();
  const instructors = data?.instructors || [];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="text-orange-500" /> Active Instructor Marketplace
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Overview of all verified AI instructors, course counts, and student engagements.
          </p>
        </div>

        <Button
          onClick={() => navigate("/admin/instructors/applications")}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold shadow-md"
        >
          View Pending Applications
        </Button>
      </div>

      {/* Instructors Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">Loading instructors...</div>
        ) : instructors.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No active instructors found.</div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="font-bold">Instructor</TableHead>
                <TableHead className="font-bold">Specialization</TableHead>
                <TableHead className="font-bold">Courses</TableHead>
                <TableHead className="font-bold">Students</TableHead>
                <TableHead className="font-bold">Rating</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instructors.map((inst) => (
                <TableRow key={inst._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50">
                  <TableCell className="font-bold text-gray-900 dark:text-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={inst.profilePhoto || inst.user?.photoUrl || "https://github.com/shadcn.png"}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover border shrink-0"
                      />
                      <div>
                        <p className="truncate font-bold">{inst.user?.name}</p>
                        <p className="text-[11px] text-gray-500 font-normal">{inst.user?.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{inst.title}</p>
                    <p className="text-[11px] text-gray-500">{inst.specialization}</p>
                  </TableCell>

                  <TableCell className="font-semibold text-xs text-orange-600">
                    {inst.coursesCount || 0} Courses
                  </TableCell>

                  <TableCell className="font-semibold text-xs text-blue-600">
                    {inst.totalStudents || 0} Enrolled
                  </TableCell>

                  <TableCell className="text-xs font-bold text-amber-500">
                    ★ {inst.rating || 4.9}
                  </TableCell>

                  <TableCell>
                    <Badge className="bg-emerald-500 text-white text-[10px]">
                      {inst.status || "Active"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/instructors/${inst.slug}`)}
                      className="text-orange-500 hover:text-orange-600"
                    >
                      <Eye size={16} className="mr-1" /> View Profile
                    </Button>
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

export default AdminInstructorList;
