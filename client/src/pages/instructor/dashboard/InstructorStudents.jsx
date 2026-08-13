import React, { useState } from "react";
import { useGetInstructorStudentsQuery } from "@/features/api/instructorApi";
import { Search, Users, BookOpen, GraduationCap, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InstructorStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetInstructorStudentsQuery();

  const students = data?.students || [];

  const filtered = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="text-blue-500" /> Student Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Monitor student enrollments, track completion progress, and view student engagement.
        </p>
      </div>

      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 text-gray-400" size={18} />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students by name, email, or course..."
            className="pl-11 rounded-full border-gray-200 dark:border-slate-800"
          />
        </div>
        <span className="text-xs font-bold text-gray-500">Total Enrolled: {filtered.length}</span>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">Loading student directory...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No students enrolled yet.</div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="font-bold">Student</TableHead>
                <TableHead className="font-bold">Enrolled Course</TableHead>
                <TableHead className="font-bold">Enrolled Date</TableHead>
                <TableHead className="font-bold">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((st, idx) => (
                <TableRow key={idx} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50">
                  <TableCell className="font-bold text-gray-900 dark:text-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={st.photoUrl || "https://github.com/shadcn.png"}
                        alt="avatar"
                        className="w-9 h-9 rounded-full object-cover border shrink-0"
                      />
                      <div>
                        <p className="truncate font-bold">{st.name}</p>
                        <p className="text-[11px] text-gray-500 font-normal">{st.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs font-semibold text-gray-800 dark:text-gray-200 max-w-xs truncate">
                    {st.courseTitle}
                  </TableCell>

                  <TableCell className="text-xs text-gray-500">
                    {new Date(st.enrolledDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${st.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-emerald-600">{st.progressPercent}%</span>
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

export default InstructorStudents;
