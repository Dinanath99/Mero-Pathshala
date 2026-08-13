import React, { useState } from "react";
import {
  useGetAdminInstructorApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/features/api/instructorApi";
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  FileText,
  User,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const AdminInstructorApplications = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");

  const { data, isLoading, refetch } = useGetAdminInstructorApplicationsQuery(statusFilter);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateApplicationStatusMutation();

  const applications = data?.applications || [];

  const handleAction = async (newStatus) => {
    if (!selectedApp) return;
    try {
      await updateStatus({
        applicationId: selectedApp._id,
        status: newStatus,
        adminNotes,
      }).unwrap();

      toast.success(`Application marked as ${newStatus}!`);
      setSelectedApp(null);
      setAdminNotes("");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update status.");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="text-orange-500" /> Instructor Applications
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Review, evaluate, approve, or reject instructor applicant credentials.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-full border border-gray-200 dark:border-slate-800 shadow-sm">
          {["All", "Pending", "Approved", "Rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                statusFilter === st
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No instructor applications found under <strong>{statusFilter}</strong>.
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="font-bold">Applicant</TableHead>
                <TableHead className="font-bold">Title / Organization</TableHead>
                <TableHead className="font-bold">Experience</TableHead>
                <TableHead className="font-bold">Proposed Course</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold text-right">Review</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50">
                  <TableCell className="font-bold text-gray-900 dark:text-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={app.profilePhoto || app.user?.photoUrl || "https://github.com/shadcn.png"}
                        alt="thumb"
                        className="w-10 h-10 rounded-full object-cover border shrink-0"
                      />
                      <div>
                        <p className="truncate font-bold">{app.fullName}</p>
                        <p className="text-[11px] text-gray-500 font-normal">{app.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{app.jobTitle}</p>
                    <p className="text-[11px] text-gray-500">{app.organization}</p>
                  </TableCell>

                  <TableCell className="text-xs font-semibold">
                    {app.yearsOfExperience} Years
                  </TableCell>

                  <TableCell className="max-w-xs text-xs text-gray-600 dark:text-gray-300 truncate">
                    {app.courseIdea}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={
                        app.status === "Approved"
                          ? "bg-emerald-500 text-white text-[10px]"
                          : app.status === "Rejected"
                          ? "bg-red-500 text-white text-[10px]"
                          : "bg-amber-500 text-white text-[10px]"
                      }
                    >
                      {app.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedApp(app);
                        setAdminNotes(app.adminNotes || "");
                      }}
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white text-gray-700 dark:text-gray-200 text-xs font-bold rounded-full"
                    >
                      Review Application
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Application Review Dialog */}
      <Dialog open={Boolean(selectedApp)} onOpenChange={() => setSelectedApp(null)}>
        {selectedApp && (
          <DialogContent className="max-w-3xl bg-white dark:bg-slate-900 rounded-3xl p-8 max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="text-orange-500" /> Instructor Application Review
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Submitted on {new Date(selectedApp.createdAt).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 pt-4 text-sm text-gray-700 dark:text-gray-300">
              {/* Applicant Card Header */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                <img
                  src={selectedApp.profilePhoto || selectedApp.user?.photoUrl || "https://github.com/shadcn.png"}
                  alt="avatar"
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedApp.fullName}</h3>
                  <p className="text-xs text-orange-600 font-semibold">{selectedApp.jobTitle} @ {selectedApp.organization}</p>
                  <p className="text-xs text-gray-500">Email: {selectedApp.email} | Phone: {selectedApp.phoneNumber}</p>
                </div>
              </div>

              {/* Bio & Experience */}
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 dark:text-white">Short Bio & Background</h4>
                <p className="p-3 bg-gray-50 dark:bg-slate-950 rounded-xl text-xs leading-relaxed">{selectedApp.shortBio}</p>
              </div>

              {/* Social & Portfolio Links */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><strong>LinkedIn:</strong> {selectedApp.linkedIn || "N/A"}</div>
                <div><strong>GitHub:</strong> {selectedApp.gitHub || "N/A"}</div>
                <div><strong>Portfolio:</strong> {selectedApp.portfolio || "N/A"}</div>
                <div><strong>Website:</strong> {selectedApp.website || "N/A"}</div>
              </div>

              {/* Course Proposal & Outline */}
              <div className="space-y-3 pt-2 border-t dark:border-slate-800">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Proposed Course Concept</h4>
                  <p className="text-xs font-semibold text-orange-600 mt-1">{selectedApp.courseIdea}</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Sample Course Outline</h4>
                  <p className="p-3 bg-gray-50 dark:bg-slate-950 rounded-xl text-xs leading-relaxed font-mono whitespace-pre-line">
                    {selectedApp.sampleOutline}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Motivation to Teach</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{selectedApp.whyTeach}</p>
                </div>
              </div>

              {/* Admin Notes Input */}
              <div className="space-y-2 pt-2 border-t dark:border-slate-800">
                <h4 className="font-bold text-gray-900 dark:text-white">Admin Evaluation Notes</h4>
                <Textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Optional notes or feedback for the applicant..."
                  className="text-xs"
                />
              </div>
            </div>

            <DialogFooter className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={() => handleAction("Rejected")}
                disabled={isUpdating}
                className="border-red-500 text-red-500 hover:bg-red-50 rounded-full font-bold"
              >
                <XCircle size={16} className="mr-1" /> Reject Application
              </Button>
              <Button
                onClick={() => handleAction("Approved")}
                disabled={isUpdating}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold px-6"
              >
                <CheckCircle size={16} className="mr-1" /> Approve & Promote to Instructor
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default AdminInstructorApplications;
