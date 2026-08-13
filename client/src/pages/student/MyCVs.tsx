import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  useGetUserCVsQuery,
  useDeleteCVMutation,
  useDuplicateCVMutation,
} from "@/features/api/cvApi";
import {
  FileText,
  Plus,
  Trash2,
  Copy,
  Edit3,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  Loader2,
  Download,
} from "lucide-react";
import { toast } from "sonner";

export const MyCVs: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetUserCVsQuery();
  const [deleteCV, { isLoading: isDeleting }] = useDeleteCVMutation();
  const [duplicateCV, { isLoading: isDuplicating }] = useDuplicateCVMutation();

  const cvs = data?.cvs || [];

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this CV?")) return;

    try {
      const res = await deleteCV(id).unwrap();
      if (res.success) {
        toast.success("CV deleted successfully.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete CV.");
    }
  };

  const handleDuplicate = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await duplicateCV(id).unwrap();
      if (res.success && res.cv?._id) {
        toast.success("CV duplicated!");
        navigate(`/cv-builder/${res.cv._id}`);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to duplicate CV.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>My CVs & Career Toolkit — AI Guru Nepal</title>
        <meta
          name="description"
          content="Manage, edit, duplicate, and analyze all your AI-tailored CVs and resumes in one dashboard."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 md:p-8 text-white shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
              <Sparkles size={13} /> AI Career Hub
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">AI CV Builder & Analyzer</h1>
            <p className="text-orange-100 text-xs md:text-sm max-w-xl">
              Create ATS-optimized resumes tailored for modern tech roles, analyze keyword gaps, and export high-resolution PDFs.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/cv-builder")}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Plus size={16} /> Create New CV
          </button>
        </div>

        {/* CV Grid */}
        {isLoading ? (
          <div className="py-24 text-center space-y-3">
            <Loader2 size={36} className="animate-spin text-orange-600 mx-auto" />
            <p className="text-xs font-semibold text-gray-500">Loading your CVs...</p>
          </div>
        ) : cvs.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center border border-dashed border-gray-300 dark:border-gray-800 space-y-4 max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center mx-auto">
              <FileText size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">No CVs Created Yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Jumpstart your job applications with our free AI CV generator, customizable layouts, and instant ATS scoring.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/cv-builder")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Plus size={15} /> Build Your First CV
            </button>
          </div>
        ) : (
          /* CVs List Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cvs.map((cv) => (
              <div
                key={cv._id}
                onClick={() => navigate(`/cv-builder/${cv._id}`)}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500/80 shadow-xs hover:shadow-lg transition-all cursor-pointer p-5 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Accent Top Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: cv.settings?.primaryColor || "#ea580c" }}
                />

                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900/60">
                      {cv.template} Template
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Calendar size={11} />
                      {cv.updatedAt ? new Date(cv.updatedAt).toLocaleDateString() : "Recently"}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                      {cv.title || "Untitled Resume"}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {cv.personalInfo?.professionalTitle || "No role specified"}
                    </p>
                  </div>

                  {/* Summary Snippet */}
                  {cv.summary && (
                    <p className="text-[11.5px] text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {cv.summary}
                    </p>
                  )}

                  {/* Skills count */}
                  <div className="flex items-center gap-3 text-[11px] text-gray-500 pt-1">
                    <span>{cv.experience?.length || 0} Experiences</span>
                    <span>•</span>
                    <span>{cv.skills?.length || 0} Skills</span>
                    <span>•</span>
                    <span>{cv.education?.length || 0} Degrees</span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Edit CV <ArrowRight size={13} />
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleDuplicate(cv._id!, e)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      title="Duplicate CV"
                    >
                      <Copy size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(cv._id!, e)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete CV"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCVs;
