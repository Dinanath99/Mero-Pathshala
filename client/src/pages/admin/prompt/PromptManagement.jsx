import React, { useState } from "react";
import { useGetAdminPromptsQuery, useDeletePromptMutation, useUpdatePromptMutation } from "@/features/api/promptApi";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Sparkles,
  Eye,
  Copy,
  Star,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

const PromptManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, refetch } = useGetAdminPromptsQuery();
  const [deletePrompt] = useDeletePromptMutation();
  const [updatePrompt] = useUpdatePromptMutation();

  const prompts = data?.prompts || [];

  const filteredPrompts = prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.englishDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deletePrompt(id).unwrap();
        toast.success("Prompt deleted successfully!");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete prompt.");
      }
    }
  };

  const handleToggleFeatured = async (prompt) => {
    try {
      await updatePrompt({
        id: prompt._id,
        promptData: { featured: !prompt.featured },
      }).unwrap();
      toast.success(`Prompt ${!prompt.featured ? "marked as featured" : "unfeatured"}.`);
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-orange-500" /> Prompt Library CMS
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Create, edit, feature, and manage production-grade AI prompts for learners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/admin/prompt-categories")}
            variant="outline"
            className="rounded-full"
          >
            Manage Categories
          </Button>
          <Button
            onClick={() => navigate("/admin/prompts/create")}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold shadow-md"
          >
            <Plus size={18} className="mr-1" /> Add New Prompt
          </Button>
        </div>
      </div>

      {/* Search & Actions Bar */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 text-gray-400" size={18} />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search prompts by title, category, or keyword..."
            className="pl-11 rounded-full border-gray-200 dark:border-slate-800"
          />
        </div>
        <span className="text-xs font-bold text-gray-500">Total: {filteredPrompts.length} Prompts</span>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">Loading prompt directory...</div>
        ) : filteredPrompts.length === 0 ? (
          <div className="p-12 text-center">
            <Sparkles className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 font-semibold">No prompts found.</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="font-bold">Prompt Title</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Difficulty</TableHead>
                <TableHead className="font-bold">Copies</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Featured</TableHead>
                <TableHead className="font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrompts.map((prompt) => (
                <TableRow key={prompt._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50">
                  <TableCell className="font-bold text-gray-900 dark:text-white">
                    <div className="max-w-xs truncate">{prompt.title}</div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {prompt.category?.name || "Uncategorized"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={
                        prompt.difficulty === "Beginner"
                          ? "bg-blue-500 text-white text-[10px]"
                          : prompt.difficulty === "Intermediate"
                          ? "bg-amber-500 text-white text-[10px]"
                          : "bg-purple-500 text-white text-[10px]"
                      }
                    >
                      {prompt.difficulty}
                    </Badge>
                  </TableCell>

                  <TableCell className="font-mono text-xs font-semibold">
                    📋 {prompt.copiesCount || 0}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={
                        prompt.status === "Published"
                          ? "bg-emerald-500 text-white text-[10px]"
                          : "bg-gray-400 text-white text-[10px]"
                      }
                    >
                      {prompt.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <button
                      onClick={() => handleToggleFeatured(prompt)}
                      className="p-1 rounded bg-gray-100 dark:bg-slate-800 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={18}
                        className={prompt.featured ? "text-amber-500 fill-amber-500" : "text-gray-400"}
                      />
                    </button>
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/prompts/${prompt.slug}`)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/admin/prompts/${prompt._id}`)}
                      className="h-8 w-8 p-0 text-blue-500"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(prompt._id, prompt.title)}
                      className="h-8 w-8 p-0 text-red-500"
                    >
                      <Trash2 size={16} />
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

export default PromptManagement;
