import React, { useState } from "react";
import {
  useGetNewsCategoriesQuery,
  useGetNewsTagsQuery,
  useCreateNewsCategoryMutation,
  useDeleteNewsCategoryMutation,
  useCreateNewsTagMutation,
  useDeleteNewsTagMutation,
  useSeedNewsCategoriesMutation,
} from "@/features/api/newsApi";
import { ArrowLeft, Plus, Trash2, Sparkles, FolderPlus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NewsCategoryManagement = () => {
  const navigate = useNavigate();
  const { data: catData, refetch: refetchCats } = useGetNewsCategoriesQuery();
  const { data: tagData, refetch: refetchTags } = useGetNewsTagsQuery();

  const [createCategory] = useCreateNewsCategoryMutation();
  const [deleteCategory] = useDeleteNewsCategoryMutation();
  const [createTag] = useCreateNewsTagMutation();
  const [deleteTag] = useDeleteNewsTagMutation();
  const [seedNewsCategories] = useSeedNewsCategoriesMutation();

  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [tagName, setTagName] = useState("");

  const categories = catData?.categories || [];
  const tags = tagData?.tags || [];

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!catName) return;
    try {
      await createCategory({ name: catName, description: catDesc }).unwrap();
      toast.success("Category created successfully");
      setCatName("");
      setCatDesc("");
      refetchCats();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create category");
    }
  };

  const handleCreateTag = async (e) => {
    e.preventDefault();
    if (!tagName) return;
    try {
      await createTag({ name: tagName }).unwrap();
      toast.success("Tag created successfully");
      setTagName("");
      refetchTags();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create tag");
    }
  };

  const handleSeed = async () => {
    try {
      await seedNewsCategories().unwrap();
      toast.success("Seeded default categories and tags!");
      refetchCats();
      refetchTags();
    } catch (err) {
      toast.error("Failed to seed.");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/news")}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to AI News Management
        </button>

        <Button onClick={handleSeed} variant="outline" className="rounded-full text-xs font-bold">
          <Sparkles size={14} className="mr-1 text-amber-500" /> Auto-Seed Default Categories & Tags
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Categories Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <FolderPlus className="text-blue-600" /> News Categories ({categories.length})
          </h2>

          <form onSubmit={handleCreateCategory} className="space-y-3">
            <div>
              <Label className="text-xs font-bold">Category Name</Label>
              <Input
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                placeholder="e.g. OpenAI, Google Gemini, Robotics"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Description</Label>
              <Input
                value={catDesc}
                onChange={(e) => setCatDesc(e.target.value)}
                placeholder="Short category summary..."
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold">
              Add Category
            </Button>
          </form>

          <div className="space-y-2 pt-4 border-t dark:border-slate-800">
            {categories.map((c) => (
              <div key={c._id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <div>
                  <h4 className="text-sm font-bold dark:text-white">{c.name}</h4>
                  <p className="text-[11px] text-gray-500 line-clamp-1">{c.description || c.slug}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={async () => {
                    if (window.confirm(`Delete category ${c.name}?`)) {
                      await deleteNewsCategory(c._id);
                      refetchCats();
                    }
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Tag className="text-purple-600" /> News Tags ({tags.length})
          </h2>

          <form onSubmit={handleCreateTag} className="space-y-3">
            <div>
              <Label className="text-xs font-bold">Tag Name</Label>
              <Input
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="e.g. GPT-5, DeepMind, Healthcare"
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold">
              Add Tag
            </Button>
          </form>

          <div className="flex flex-wrap gap-2 pt-4 border-t dark:border-slate-800">
            {tags.map((t) => (
              <div
                key={t._id}
                className="flex items-center gap-1 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-full text-xs font-bold"
              >
                <span>#{t.name}</span>
                <button
                  onClick={async () => {
                    await deleteTag(t._id);
                    refetchTags();
                  }}
                  className="hover:text-red-500 ml-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCategoryManagement;
