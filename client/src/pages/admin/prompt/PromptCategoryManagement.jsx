import React, { useState } from "react";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useSeedCategoriesMutation,
} from "@/features/api/promptApi";
import { ArrowLeft, Plus, Sparkles, Edit, Trash2, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PromptCategoryManagement = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [seedCategories, { isLoading: isSeeding }] = useSeedCategoriesMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Sparkles");
  const [color, setColor] = useState("orange");

  const categories = data?.categories || [];

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setName("");
    setDescription("");
    setIcon("Sparkles");
    setColor("orange");
    setIsFormOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description || "");
    setIcon(cat.icon || "Sparkles");
    setColor(cat.color || "orange");
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("Category name is required.");

    try {
      if (editingCategory) {
        await updateCategory({
          id: editingCategory._id,
          categoryData: { name, description, icon, color },
        }).unwrap();
        toast.success("Category updated!");
      } else {
        await createCategory({ name, description, icon, color }).unwrap();
        toast.success("Category created!");
      }
      setIsFormOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Operation failed.");
    }
  };

  const handleDelete = async (id, catName) => {
    if (window.confirm(`Delete category "${catName}"?`)) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category deleted.");
        refetch();
      } catch (err) {
        toast.error("Failed to delete category.");
      }
    }
  };

  const handleSeedDefaults = async () => {
    try {
      const res = await seedCategories().unwrap();
      toast.success(res.message || "Seeded default prompt categories!");
      refetch();
    } catch (err) {
      toast.error("Failed to seed categories.");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/admin/prompts")}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-orange-500 transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Back to Prompts
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-orange-500" /> Prompt Categories
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleSeedDefaults}
            disabled={isSeeding}
            variant="outline"
            className="rounded-full text-xs font-bold"
          >
            <RefreshCw size={14} className={`mr-1 ${isSeeding ? "animate-spin" : ""}`} /> Seed 13 Default Categories
          </Button>

          <Button
            onClick={handleOpenCreate}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold shadow-md"
          >
            <Plus size={18} className="mr-1" /> Add Category
          </Button>
        </div>
      </div>

      {/* Form Modal / Inline Box */}
      {isFormOpen && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-orange-500/30 shadow-xl space-y-4">
          <h3 className="text-lg font-bold dark:text-white">
            {editingCategory ? `Edit Category: ${editingCategory.name}` : "Create New Category"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold">Category Name *</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Prompt Engineering"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">Icon Name (Lucide)</Label>
                <Input
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="GraduationCap, Code, Briefcase, etc."
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold">Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short summary of prompts in this category..."
                rows={2}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)} className="rounded-full">
                Cancel
              </Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold">
                {editingCategory ? "Update Category" : "Save Category"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Loading categories...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="outline" className="text-xs font-bold border-orange-500/30 text-orange-500">
                    {cat.slug}
                  </Badge>
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Active
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{cat.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{cat.description || "No description provided."}</p>
              </div>

              <div className="border-t dark:border-slate-800 pt-4 mt-4 flex items-center justify-end gap-2">
                <Button size="sm" variant="ghost" onClick={() => handleOpenEdit(cat)} className="text-blue-500">
                  <Edit size={16} />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(cat._id, cat.name)} className="text-red-500">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromptCategoryManagement;
