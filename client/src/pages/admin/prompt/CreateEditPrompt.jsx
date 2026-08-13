import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useCreatePromptMutation,
  useUpdatePromptMutation,
  useGetCategoriesQuery,
  useGetAdminPromptsQuery,
} from "@/features/api/promptApi";
import { useGetToolsQuery } from "@/features/api/toolApi";
import { useGetBlogsQuery } from "@/features/api/blogApi";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { ArrowLeft, Save, Plus, Trash2, Sparkles, HelpCircle, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const BEST_FOR_OPTIONS = ["Students", "Developers", "Teachers", "Freelancers", "Business Owners", "Content Creators"];

const CreateEditPrompt = () => {
  const { promptId } = useParams();
  const isEditMode = Boolean(promptId);
  const navigate = useNavigate();

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: toolsData } = useGetToolsQuery({ limit: 100 });
  const { data: blogsData } = useGetBlogsQuery({ limit: 100 });
  const { data: coursesData } = useGetPublishedCourseQuery();
  const { data: adminPromptsData } = useGetAdminPromptsQuery(undefined, { skip: !isEditMode });

  const [createPrompt, { isLoading: isCreating }] = useCreatePromptMutation();
  const [updatePrompt, { isLoading: isUpdating }] = useUpdatePromptMutation();

  // Form State
  const [title, setTitle] = useState("");
  const [englishDescription, setEnglishDescription] = useState("");
  const [nepaliDescription, setNepaliDescription] = useState("");
  const [promptContent, setPromptContent] = useState("");
  const [expectedOutputEn, setExpectedOutputEn] = useState("");
  const [expectedOutputNe, setExpectedOutputNe] = useState("");
  const [practiceChallengeEn, setPracticeChallengeEn] = useState("");
  const [practiceChallengeNe, setPracticeChallengeNe] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState("Published");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const [bestFor, setBestFor] = useState([]);
  const [tagsInput, setTagsInput] = useState("");
  const [customizationTipsEn, setCustomizationTipsEn] = useState([""]);
  const [customizationTipsNe, setCustomizationTipsNe] = useState([""]);

  const [promptBreakdown, setPromptBreakdown] = useState([
    { sectionTitle: "Role", explanationEn: "", explanationNe: "" },
    { sectionTitle: "Task", explanationEn: "", explanationNe: "" },
  ]);

  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  useEffect(() => {
    if (isEditMode && adminPromptsData?.prompts) {
      const prompt = adminPromptsData.prompts.find((p) => p._id === promptId);
      if (prompt) {
        setTitle(prompt.title || "");
        setEnglishDescription(prompt.englishDescription || "");
        setNepaliDescription(prompt.nepaliDescription || "");
        setPromptContent(prompt.promptContent || "");
        setExpectedOutputEn(prompt.expectedOutputEn || "");
        setExpectedOutputNe(prompt.expectedOutputNe || "");
        setPracticeChallengeEn(prompt.practiceChallengeEn || "");
        setPracticeChallengeNe(prompt.practiceChallengeNe || "");
        setDifficulty(prompt.difficulty || "Beginner");
        setCategory(prompt.category?._id || prompt.category || "");
        setFeatured(prompt.featured || false);
        setStatus(prompt.status || "Published");
        setSeoTitle(prompt.seoTitle || "");
        setSeoDescription(prompt.seoDescription || "");
        setBestFor(prompt.bestFor || []);
        setTagsInput(prompt.tags?.join(", ") || "");

        if (prompt.customizationTipsEn?.length > 0) setCustomizationTipsEn(prompt.customizationTipsEn);
        if (prompt.customizationTipsNe?.length > 0) setCustomizationTipsNe(prompt.customizationTipsNe);
        if (prompt.promptBreakdown?.length > 0) setPromptBreakdown(prompt.promptBreakdown);

        if (prompt.aiTools) setSelectedTools(prompt.aiTools.map((t) => t._id || t));
        if (prompt.relatedBlogs) setSelectedBlogs(prompt.relatedBlogs.map((b) => b._id || b));
        if (prompt.relatedCourses) setSelectedCourses(prompt.relatedCourses.map((c) => c._id || c));
        if (prompt.faq?.length > 0) setFaqs(prompt.faq);
      }
    }
  }, [isEditMode, adminPromptsData, promptId]);

  const categories = categoriesData?.categories || [];
  const tools = toolsData?.tools || [];
  const blogs = blogsData?.blogs || [];
  const courses = coursesData?.courses || [];

  const handleToggleBestFor = (option) => {
    if (bestFor.includes(option)) {
      setBestFor(bestFor.filter((item) => item !== option));
    } else {
      setBestFor([...bestFor, option]);
    }
  };

  const handleAddBreakdownItem = () => {
    setPromptBreakdown([...promptBreakdown, { sectionTitle: "", explanationEn: "", explanationNe: "" }]);
  };

  const handleRemoveBreakdownItem = (index) => {
    setPromptBreakdown(promptBreakdown.filter((_, i) => i !== index));
  };

  const handleBreakdownChange = (index, field, value) => {
    const updated = [...promptBreakdown];
    updated[index][field] = value;
    setPromptBreakdown(updated);
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleFaqChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !englishDescription || !promptContent || !category) {
      toast.error("Please fill in all required fields (Title, Description, Prompt Content, Category).");
      return;
    }

    const payload = {
      title,
      englishDescription,
      nepaliDescription,
      promptContent,
      expectedOutputEn,
      expectedOutputNe,
      practiceChallengeEn,
      practiceChallengeNe,
      difficulty,
      category,
      bestFor,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      customizationTipsEn: customizationTipsEn.filter(Boolean),
      customizationTipsNe: customizationTipsNe.filter(Boolean),
      promptBreakdown: promptBreakdown.filter((b) => b.sectionTitle && b.explanationEn),
      aiTools: selectedTools,
      relatedBlogs: selectedBlogs,
      relatedCourses: selectedCourses,
      faq: faqs.filter((f) => f.question && f.answer),
      featured,
      status,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || englishDescription,
    };

    try {
      if (isEditMode) {
        await updatePrompt({ id: promptId, promptData: payload }).unwrap();
        toast.success("Prompt updated successfully!");
      } else {
        await createPrompt(payload).unwrap();
        toast.success("Prompt created successfully!");
      }
      navigate("/admin/prompts");
    } catch (err) {
      toast.error(err?.data?.message || "Operation failed.");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/prompts")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Prompt CMS
        </button>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          {isEditMode ? "Edit Prompt" : "Create New Prompt"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold dark:text-white pb-2 border-b dark:border-slate-800 flex items-center gap-2">
            <Sparkles className="text-orange-500" size={18} /> General Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold">Prompt Title *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AI Study Notes & Summary Generator"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Category *</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full mt-1 p-2.5 rounded-md border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none"
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

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold">Difficulty Level</Label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full mt-1 p-2.5 rounded-md border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <Label className="text-xs font-semibold">Tags (comma separated)</Label>
              <Input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. study, notes, exam-prep, education"
                className="mt-1"
              />
            </div>
          </div>

          {/* Best For Checkboxes */}
          <div>
            <Label className="text-xs font-semibold mb-2 block">Best Suitable For</Label>
            <div className="flex flex-wrap gap-2">
              {BEST_FOR_OPTIONS.map((opt) => {
                const isSelected = bestFor.includes(opt);
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => handleToggleBestFor(opt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      isSelected
                        ? "bg-purple-500 text-white border-purple-500"
                        : "bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold dark:text-white pb-2 border-b dark:border-slate-800">
            Bilingual Content & Full Prompt
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold">English Description *</Label>
              <Textarea
                value={englishDescription}
                onChange={(e) => setEnglishDescription(e.target.value)}
                placeholder="Clear description in English..."
                rows={3}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Nepali Description (नेपाली विवरण)</Label>
              <Textarea
                value={nepaliDescription}
                onChange={(e) => setNepaliDescription(e.target.value)}
                placeholder="नेपालीमा संक्षिप्त विवरण..."
                rows={3}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold">Full Prompt Template *</Label>
            <Textarea
              value={promptContent}
              onChange={(e) => setPromptContent(e.target.value)}
              placeholder="Paste the exact prompt text template here..."
              rows={8}
              required
              className="mt-1 font-mono text-xs"
            />
          </div>

          {/* Expected Output */}
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div>
              <Label className="text-xs font-semibold">Expected Output (English Sample)</Label>
              <Textarea
                value={expectedOutputEn}
                onChange={(e) => setExpectedOutputEn(e.target.value)}
                placeholder="Example of response in English..."
                rows={3}
                className="mt-1 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Expected Output (Nepali Sample)</Label>
              <Textarea
                value={expectedOutputNe}
                onChange={(e) => setExpectedOutputNe(e.target.value)}
                placeholder="नेपाली उदाहरण उत्तर..."
                rows={3}
                className="mt-1 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Prompt Breakdown (Logic) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b dark:border-slate-800">
            <h2 className="text-lg font-bold dark:text-white">Prompt Engineering Breakdown (Logic)</h2>
            <Button type="button" size="sm" onClick={handleAddBreakdownItem} variant="outline" className="rounded-full text-xs">
              <Plus size={14} className="mr-1" /> Add Section
            </Button>
          </div>

          {promptBreakdown.map((item, idx) => (
            <div key={idx} className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl space-y-3 relative">
              <button
                type="button"
                onClick={() => handleRemoveBreakdownItem(idx)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>

              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <Label className="text-[11px] font-bold">Section Title (e.g. Role, Task, Context)</Label>
                  <Input
                    value={item.sectionTitle}
                    onChange={(e) => handleBreakdownChange(idx, "sectionTitle", e.target.value)}
                    placeholder="Role"
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-[11px] font-bold">English Explanation</Label>
                  <Input
                    value={item.explanationEn}
                    onChange={(e) => handleBreakdownChange(idx, "explanationEn", e.target.value)}
                    placeholder="Why this section is needed..."
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-[11px] font-bold">Nepali Explanation</Label>
                  <Input
                    value={item.explanationNe}
                    onChange={(e) => handleBreakdownChange(idx, "explanationNe", e.target.value)}
                    placeholder="नेपालीमा स्पष्टीकरण..."
                    className="mt-1 text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Practice Challenge */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold dark:text-white pb-2 border-b dark:border-slate-800">
            Practice Challenge
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold">Challenge (English)</Label>
              <Input
                value={practiceChallengeEn}
                onChange={(e) => setPracticeChallengeEn(e.target.value)}
                placeholder="e.g. Try modifying this prompt to summarize a PDF article..."
                className="mt-1 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Challenge (Nepali)</Label>
              <Input
                value={practiceChallengeNe}
                onChange={(e) => setPracticeChallengeNe(e.target.value)}
                placeholder="नेपाली अभ्यास..."
                className="mt-1 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Relationships */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold dark:text-white pb-2 border-b dark:border-slate-800 flex items-center gap-2">
            <Layers size={18} className="text-orange-500" /> Linked AI Tools & Content
          </h2>

          <div>
            <Label className="text-xs font-semibold mb-2 block">Compatible AI Tools</Label>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => {
                const isSelected = selectedTools.includes(t._id);
                return (
                  <button
                    type="button"
                    key={t._id}
                    onClick={() => {
                      if (isSelected) setSelectedTools(selectedTools.filter((id) => id !== t._id));
                      else setSelectedTools([...selectedTools, t._id]);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Publish & Status */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-bold">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 w-4 h-4"
              />
              Mark as Featured Prompt
            </label>

            <div className="flex items-center gap-2">
              <Label className="text-xs font-bold">Status:</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-1.5 rounded-lg border text-xs font-bold outline-none"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-8 py-6 rounded-full shadow-lg"
          >
            <Save size={18} className="mr-2" />
            {isEditMode ? (isUpdating ? "Updating..." : "Update Prompt") : (isCreating ? "Creating..." : "Save & Publish Prompt")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditPrompt;
