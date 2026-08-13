import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useGetAdminNewsQuery,
  useGetNewsCategoriesQuery,
  useGetNewsTagsQuery,
} from "@/features/api/newsApi";
import { ArrowLeft, Save, Sparkles, Plus, Trash2, Globe, Flag, Tag, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const CreateEditNews = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(newsId);

  const { data: adminNewsData } = useGetAdminNewsQuery();
  const { data: categoriesData } = useGetNewsCategoriesQuery();
  const { data: tagsData } = useGetNewsTagsQuery();

  const [createNews, { isLoading: isCreating }] = useCreateNewsMutation();
  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation();

  const categories = categoriesData?.categories || [];
  const tagsList = tagsData?.tags || [];

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    coverImage: "",
    content: "",
    keyTakeaways: [""],
    whyItMattersEn: "",
    whyItMattersNe: "",
    nepalPerspective: {
      students: "",
      developers: "",
      businesses: "",
      teachers: "",
    },
    readingTime: "4 min read",
    authorName: "AI Guru Nepal Editorial Team",
    authorRole: "AI Research Desk",
    authorAvatar: "https://github.com/shadcn.png",
    category: "",
    selectedTags: [],
    breakingNews: false,
    featured: false,
    status: "Published",
    seoTitle: "",
    seoDescription: "",
  });

  useEffect(() => {
    if (isEdit && adminNewsData?.news) {
      const existing = adminNewsData.news.find((n) => n._id === newsId);
      if (existing) {
        setFormData({
          title: existing.title || "",
          subtitle: existing.subtitle || "",
          coverImage: existing.coverImage || "",
          content: existing.content || "",
          keyTakeaways: existing.keyTakeaways?.length ? existing.keyTakeaways : [""],
          whyItMattersEn: existing.whyItMattersEn || "",
          whyItMattersNe: existing.whyItMattersNe || "",
          nepalPerspective: existing.nepalPerspective || { students: "", developers: "", businesses: "", teachers: "" },
          readingTime: existing.readingTime || "4 min read",
          authorName: existing.author?.name || "AI Guru Nepal Editorial Team",
          authorRole: existing.author?.role || "AI Research Desk",
          authorAvatar: existing.author?.avatar || "https://github.com/shadcn.png",
          category: existing.category?._id || existing.category || "",
          selectedTags: existing.tags?.map((t) => t._id || t) || [],
          breakingNews: Boolean(existing.breakingNews),
          featured: Boolean(existing.featured),
          status: existing.status || "Published",
          seoTitle: existing.seoTitle || "",
          seoDescription: existing.seoDescription || "",
        });
      }
    }
  }, [isEdit, newsId, adminNewsData]);

  const handleTakeawayChange = (index, value) => {
    const updated = [...formData.keyTakeaways];
    updated[index] = value;
    setFormData({ ...formData, keyTakeaways: updated });
  };

  const addTakeaway = () => {
    setFormData({ ...formData, keyTakeaways: [...formData.keyTakeaways, ""] });
  };

  const removeTakeaway = (index) => {
    const updated = formData.keyTakeaways.filter((_, i) => i !== index);
    setFormData({ ...formData, keyTakeaways: updated });
  };

  const toggleTag = (tagId) => {
    const updated = formData.selectedTags.includes(tagId)
      ? formData.selectedTags.filter((id) => id !== tagId)
      : [...formData.selectedTags, tagId];
    setFormData({ ...formData, selectedTags: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.coverImage || !formData.category) {
      toast.error("Please fill in Title, Cover Image, Category, and Article Content.");
      return;
    }

    const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      coverImage: formData.coverImage,
      content: formData.content,
      keyTakeaways: formData.keyTakeaways.filter(Boolean),
      whyItMattersEn: formData.whyItMattersEn,
      whyItMattersNe: formData.whyItMattersNe,
      nepalPerspective: formData.nepalPerspective,
      author: {
        name: formData.authorName,
        role: formData.authorRole,
        avatar: formData.authorAvatar,
      },
      readingTime: formData.readingTime,
      category: formData.category,
      tags: formData.selectedTags,
      breakingNews: formData.breakingNews,
      featured: formData.featured,
      status: formData.status,
      seoTitle: formData.seoTitle || formData.title,
      seoDescription: formData.seoDescription || formData.subtitle,
    };

    try {
      if (isEdit) {
        await updateNews({ id: newsId, newsData: payload }).unwrap();
        toast.success("News article updated successfully!");
      } else {
        await createNews(payload).unwrap();
        toast.success("News article published successfully!");
      }
      navigate("/admin/news");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save article.");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* Back Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/news")}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to News Management
        </button>
        <span className="text-xs font-bold text-gray-400">
          {isEdit ? "Edit Article" : "Create New Article"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title & Header Settings */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <FileText className="text-blue-600" /> Article Overview
          </h2>

          <div className="space-y-4">
            <div>
              <Label className="font-bold">Article Title / Headline *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. OpenAI Releases GPT-5 Reasoning Capabilities"
                className="mt-1 font-bold text-lg"
              />
            </div>

            <div>
              <Label className="font-bold">Subtitle / Deck</Label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="A short single-sentence summary deck for cards and hero placement..."
                className="mt-1"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-bold">Cover Image URL *</Label>
                <Input
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="font-bold">Category *</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-md border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Article Rich Content */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Article Content & Formatting</h2>
          <Label className="font-bold">Content (Supports Markdown / Text)</Label>
          <Textarea
            rows={12}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write full article body here..."
            className="font-mono text-sm leading-relaxed"
          />
        </div>

        {/* Key Takeaways */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="text-blue-500" /> Key Takeaways
            </h2>
            <Button type="button" size="sm" onClick={addTakeaway} variant="outline" className="rounded-full">
              <Plus size={14} className="mr-1" /> Add Bullet Point
            </Button>
          </div>

          <div className="space-y-3">
            {formData.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={takeaway}
                  onChange={(e) => handleTakeawayChange(idx, e.target.value)}
                  placeholder={`Takeaway #${idx + 1}`}
                />
                {formData.keyTakeaways.length > 1 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeTakeaway(idx)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why It Matters (Bilingual) */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Globe className="text-amber-500" /> Why It Matters (द्विभाषिक महत्त्व)
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold">Why It Matters (English)</Label>
              <Textarea
                rows={3}
                value={formData.whyItMattersEn}
                onChange={(e) => setFormData({ ...formData, whyItMattersEn: e.target.value })}
                placeholder="Explain in English why this news story is critical..."
              />
            </div>

            <div>
              <Label className="font-bold">Why It Matters (Nepali / नेपाली)</Label>
              <Textarea
                rows={3}
                value={formData.whyItMattersNe}
                onChange={(e) => setFormData({ ...formData, whyItMattersNe: e.target.value })}
                placeholder="नेपालीमा यो समाचारको महत्त्व सम्झाउनुहोस्..."
              />
            </div>
          </div>
        </div>

        {/* Nepal Perspective */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Flag className="text-red-500" /> Nepal Perspective
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold">For Students</Label>
              <Input
                value={formData.nepalPerspective.students}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nepalPerspective: { ...formData.nepalPerspective, students: e.target.value },
                  })
                }
                placeholder="Impact on Nepali students..."
              />
            </div>

            <div>
              <Label className="font-bold">For Developers</Label>
              <Input
                value={formData.nepalPerspective.developers}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nepalPerspective: { ...formData.nepalPerspective, developers: e.target.value },
                  })
                }
                placeholder="Impact on Nepali developers..."
              />
            </div>
          </div>
        </div>

        {/* Tags & Flags */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Tag className="text-purple-500" /> Tags & Flags
          </h2>

          <div>
            <Label className="font-bold mb-2 block">Select Tags</Label>
            <div className="flex flex-wrap gap-2">
              {tagsList.map((tag) => (
                <button
                  key={tag._id}
                  type="button"
                  onClick={() => toggleTag(tag._id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    formData.selectedTags.includes(tag._id)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Switch
                checked={formData.breakingNews}
                onCheckedChange={(val) => setFormData({ ...formData, breakingNews: val })}
              />
              <Label className="font-bold">Breaking News</Label>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={formData.featured}
                onCheckedChange={(val) => setFormData({ ...formData, featured: val })}
              />
              <Label className="font-bold">Featured Article</Label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/news")} className="rounded-full">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold px-8"
          >
            <Save size={18} className="mr-2" />
            {isEdit ? "Update Article" : "Publish Article"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditNews;
