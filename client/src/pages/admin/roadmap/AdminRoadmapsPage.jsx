import React, { useState } from "react";
import {
  useGetRoadmapsQuery,
  useCreateRoadmapMutation,
  useUpdateRoadmapMutation,
  useDeleteRoadmapMutation,
  useTogglePublishRoadmapMutation,
} from "@/features/api/roadmapApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  Check,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const AdminRoadmapsPage = () => {
  const { data, isLoading } = useGetRoadmapsQuery({});
  const roadmaps = data?.roadmaps || [];

  const [createRoadmap] = useCreateRoadmapMutation();
  const [updateRoadmap] = useUpdateRoadmapMutation();
  const [deleteRoadmap] = useDeleteRoadmapMutation();
  const [togglePublish] = useTogglePublishRoadmapMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    titleNp: "",
    description: "",
    descriptionNp: "",
    category: "AI Basics",
    difficulty: "Beginner",
    estimatedDuration: "2 Hours",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    isFree: true,
    isFeatured: false,
    skills: "",
    learningOutcomes: "",
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: "",
      titleNp: "",
      description: "",
      descriptionNp: "",
      category: "AI Basics",
      difficulty: "Beginner",
      estimatedDuration: "2 Hours",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
      isFree: true,
      isFeatured: false,
      skills: "",
      learningOutcomes: "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (rm) => {
    setEditingId(rm._id);
    setFormData({
      title: rm.title || "",
      titleNp: rm.titleNp || "",
      description: rm.description || "",
      descriptionNp: rm.descriptionNp || "",
      category: rm.category || "AI Basics",
      difficulty: rm.difficulty || "Beginner",
      estimatedDuration: rm.estimatedDuration || "2 Hours",
      coverImage: rm.coverImage || "",
      isFree: rm.isFree !== false,
      isFeatured: rm.isFeatured || false,
      skills: Array.isArray(rm.skills) ? rm.skills.join(", ") : "",
      learningOutcomes: Array.isArray(rm.learningOutcomes) ? rm.learningOutcomes.join(", ") : "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
      learningOutcomes: formData.learningOutcomes.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await updateRoadmap({ id: editingId, ...payload }).unwrap();
        toast.success("Roadmap updated successfully!");
      } else {
        await createRoadmap(payload).unwrap();
        toast.success("Roadmap created successfully!");
      }
      setIsDialogOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save roadmap.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this roadmap?")) {
      try {
        await deleteRoadmap(id).unwrap();
        toast.success("Roadmap deleted.");
      } catch (err) {
        toast.error("Failed to delete roadmap.");
      }
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await togglePublish(id).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error("Failed to change status.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-28 pb-20 px-4 sm:px-6 lg:px-8 space-y-8">
      <SEO title="Manage Learning Roadmaps — Admin" />

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Badge className="bg-orange-500 text-white text-xs font-bold px-3 py-1 uppercase">
              Admin CMS
            </Badge>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
              Learning Roadmaps Management
            </h1>
          </div>

          <Button
            onClick={handleOpenCreate}
            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-6 text-xs shadow-md"
          >
            <Plus size={16} className="mr-1.5" /> Create Roadmap
          </Button>
        </div>

        {/* Roadmaps Table Grid */}
        <div className="space-y-4">
          {roadmaps.map((rm) => (
            <Card
              key={rm._id}
              className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <img
                  src={rm.coverImage}
                  alt={rm.title}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                      {rm.title}
                    </h3>
                    <Badge variant="outline" className="text-[10px] font-bold">
                      {rm.category}
                    </Badge>
                    <Badge className={`${rm.isPublished ? "bg-emerald-500" : "bg-gray-400"} text-white text-[10px]`}>
                      {rm.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-xs font-bold text-orange-500 font-serif">{rm.titleNp}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{rm.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <Button
                  onClick={() => handleTogglePublish(rm._id)}
                  size="sm"
                  variant="outline"
                  className="rounded-full text-xs font-bold"
                >
                  {rm.isPublished ? <EyeOff size={14} className="mr-1" /> : <Eye size={14} className="mr-1" />}
                  {rm.isPublished ? "Unpublish" : "Publish"}
                </Button>

                <Button
                  onClick={() => handleOpenEdit(rm)}
                  size="sm"
                  variant="outline"
                  className="rounded-full text-xs font-bold"
                >
                  <Edit size={14} className="mr-1" /> Edit
                </Button>

                <Button
                  onClick={() => handleDelete(rm._id)}
                  size="sm"
                  variant="destructive"
                  className="rounded-full text-xs font-bold"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-gray-900 dark:text-white">
              {editingId ? "Edit Roadmap" : "Create Learning Roadmap"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">English Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="e.g. ChatGPT Mastery"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">Nepali Title</label>
              <Input
                value={formData.titleNp}
                onChange={(e) => setFormData({ ...formData, titleNp: e.target.value })}
                placeholder="e.g. ChatGPT ज्ञान"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-3 text-xs focus:ring-2 focus:ring-orange-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-bold"
                >
                  <option value="AI Basics">AI Basics</option>
                  <option value="Development">Development</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                  <option value="Content Creation">Content Creation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-gray-300">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-bold"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">Cover Image URL</label>
              <Input
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 dark:text-gray-300">Skills (Comma-separated)</label>
              <Input
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="ChatGPT, Prompt Writing, Productivity"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                variant="outline"
                className="rounded-full text-xs font-bold"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-6 text-xs"
              >
                {editingId ? "Update Roadmap" : "Create Roadmap"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRoadmapsPage;
