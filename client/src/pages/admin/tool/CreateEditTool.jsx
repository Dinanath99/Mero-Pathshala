import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetCategoriesQuery,
  useCreateToolMutation,
  useUpdateToolMutation,
  useGetToolByIdQuery,
} from "@/features/api/toolApi";
import { useGetAdminBlogsQuery } from "@/features/api/blogApi";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { ArrowLeft, Plus, Trash2, Upload, Star, Globe, ShieldCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PLATFORM_OPTIONS = ["Web", "Windows", "Mac", "Linux", "iOS", "Android", "VS Code", "Chrome Extension", "API"];
const PRICING_TYPES = ["Free", "Freemium", "Paid", "Free Trial"];

const CreateEditTool = () => {
  const { toolId } = useParams();
  const isEditMode = Boolean(toolId);
  const navigate = useNavigate();

  const { data: categoryData } = useGetCategoriesQuery();
  const { data: blogData } = useGetAdminBlogsQuery();
  const { data: courseData } = useGetPublishedCourseQuery();
  const { data: toolData, isLoading: isToolLoading } = useGetToolByIdQuery(toolId, {
    skip: !isEditMode,
  });

  const [createTool, { isLoading: isCreating }] = useCreateToolMutation();
  const [updateTool, { isLoading: isUpdating }] = useUpdateToolMutation();

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionNe, setDescriptionNe] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [category, setCategory] = useState("");
  const [pricingType, setPricingType] = useState("Freemium");
  const [pricingDetails, setPricingDetails] = useState("");
  const [status, setStatus] = useState("Published");
  const [featured, setFeatured] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  // Files
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [screenshotFiles, setScreenshotFiles] = useState([]);
  const [screenshotPreviews, setScreenshotPreviews] = useState([]);

  // Arrays & dynamic fields
  const [features, setFeatures] = useState([""]);
  const [platforms, setPlatforms] = useState(["Web"]);
  const [bestFor, setBestFor] = useState([""]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    if (isEditMode && toolData?.tool) {
      const tool = toolData.tool;
      setName(tool.name || "");
      setTagline(tool.tagline || "");
      setDescription(tool.description || "");
      setDescriptionNe(tool.descriptionNe || "");
      setVideoUrl(tool.videoUrl || "");
      setWebsiteUrl(tool.websiteUrl || "");
      setCategory(tool.category?._id || tool.category || "");
      setPricingType(tool.pricingType || "Freemium");
      setPricingDetails(tool.pricingDetails || "");
      setStatus(tool.status || "Published");
      setFeatured(tool.featured || false);
      setSeoTitle(tool.seoTitle || "");
      setSeoDescription(tool.seoDescription || "");
      setLogoPreview(tool.logo || "");
      setCoverPreview(tool.coverImage || "");
      setScreenshotPreviews(tool.screenshots || []);

      setFeatures(tool.features?.length > 0 ? tool.features : [""]);
      setPlatforms(tool.platforms?.length > 0 ? tool.platforms : ["Web"]);
      setBestFor(tool.bestFor?.length > 0 ? tool.bestFor : [""]);
      setFaqs(tool.faq?.length > 0 ? tool.faq : [{ question: "", answer: "" }]);
      setSelectedBlogs(tool.relatedBlogs ? tool.relatedBlogs.map(b => b._id || b) : []);
      setSelectedCourses(tool.relatedCourses ? tool.relatedCourses.map(c => c._id || c) : []);
    }
  }, [isEditMode, toolData]);

  // Handlers for dynamic inputs
  const handleFeatureChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };
  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index) => setFeatures(features.filter((_, i) => i !== index));

  const handleBestForChange = (index, value) => {
    const updated = [...bestFor];
    updated[index] = value;
    setBestFor(updated);
  };
  const addBestFor = () => setBestFor([...bestFor, ""]);
  const removeBestFor = (index) => setBestFor(bestFor.filter((_, i) => i !== index));

  const handlePlatformToggle = (plat) => {
    if (platforms.includes(plat)) {
      setPlatforms(platforms.filter((p) => p !== plat));
    } else {
      setPlatforms([...platforms, plat]);
    }
  };

  const handleFaqChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };
  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));

  const handleLogoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleScreenshotFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setScreenshotFiles(files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setScreenshotPreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !websiteUrl || !category) {
      toast.error("Please fill in all required fields (Name, Description, Website URL, Category)");
      return;
    }

    if (!isEditMode && !logoFile && !logoPreview) {
      toast.error("Tool logo image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("tagline", tagline);
    formData.append("description", description);
    formData.append("descriptionNe", descriptionNe);
    formData.append("videoUrl", videoUrl);
    formData.append("websiteUrl", websiteUrl);
    formData.append("category", category);
    formData.append("pricingType", pricingType);
    formData.append("pricingDetails", pricingDetails);
    formData.append("status", status);
    formData.append("featured", featured);
    formData.append("seoTitle", seoTitle || name);
    formData.append("seoDescription", seoDescription || tagline);

    formData.append("features", JSON.stringify(features.filter(Boolean)));
    formData.append("platforms", JSON.stringify(platforms));
    formData.append("bestFor", JSON.stringify(bestFor.filter(Boolean)));
    formData.append("faq", JSON.stringify(faqs.filter((f) => f.question && f.answer)));
    formData.append("relatedBlogs", JSON.stringify(selectedBlogs));
    formData.append("relatedCourses", JSON.stringify(selectedCourses));

    if (logoFile) formData.append("logo", logoFile);
    else if (logoPreview) formData.append("logo", logoPreview);

    if (coverFile) formData.append("coverImage", coverFile);
    else if (coverPreview) formData.append("coverImage", coverPreview);

    if (screenshotFiles.length > 0) {
      screenshotFiles.forEach((file) => formData.append("screenshots", file));
    }

    try {
      if (isEditMode) {
        const res = await updateTool({ id: toolId, formData }).unwrap();
        toast.success(res?.message || "AI Tool updated successfully!");
        navigate("/admin/tools");
      } else {
        const res = await createTool(formData).unwrap();
        toast.success(res?.message || "AI Tool created successfully!");
        navigate("/admin/tools");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to save AI tool.");
    }
  };

  if (isEditMode && isToolLoading) {
    return <div className="p-6 dark:text-white">Loading tool data...</div>;
  }

  const categories = categoryData?.categories || [];
  const blogs = blogData?.blogs || [];
  const courses = courseData?.courses || [];

  return (
    <div className="flex-1 p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/tools")}
          className="rounded-full"
        >
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            {isEditMode ? "Edit AI Tool" : "Add New AI Tool"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Publish or update AI tool listings in the AI Guru Nepal Directory.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold dark:text-white pb-2 border-b dark:border-slate-800 flex items-center gap-2">
            <Globe className="text-orange-500" size={20} /> Basic Tool Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold">Tool Name *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. ChatGPT, Midjourney, Cursor"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border dark:border-slate-800">
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold">Tagline / Short Subtitle</Label>
            <Input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Advanced AI coding editor for fast development"
              className="mt-1"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold">Website URL *</Label>
              <Input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://chatgpt.com"
                className="mt-1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs font-semibold">Pricing Model</Label>
                <Select value={pricingType} onValueChange={setPricingType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select Pricing" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900 border dark:border-slate-800">
                    {PRICING_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-semibold">Pricing Details</Label>
                <Input
                  value={pricingDetails}
                  onChange={(e) => setPricingDetails(e.target.value)}
                  placeholder="e.g. Free plan, $20/mo Pro"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold">Detailed Description (English) *</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a comprehensive explanation in English..."
                rows={4}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Nepali Description (नेपाली विवरण - Optional)</Label>
              <Textarea
                value={descriptionNe}
                onChange={(e) => setDescriptionNe(e.target.value)}
                placeholder="यस AI टूलको बारेमा विस्तृत जानकारी नेपालीमा..."
                rows={4}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold">Video Tutorial URL (YouTube Link - Optional)</Label>
            <Input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="mt-1"
            />
          </div>
        </div>

        {/* Media & Uploads Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold dark:text-white pb-2 border-b dark:border-slate-800 flex items-center gap-2">
            <Upload className="text-orange-500" size={20} /> Media & Assets
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-xs font-semibold">Tool Logo *</Label>
              <div className="mt-2 flex items-center gap-4">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200 dark:border-slate-800"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-xs text-gray-400">
                    No Logo
                  </div>
                )}
                <Input type="file" accept="image/*" onChange={handleLogoFileChange} className="text-xs" />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Cover / Banner Image (Optional)</Label>
              <div className="mt-2 flex items-center gap-4">
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Cover Preview"
                    className="w-24 h-16 rounded-xl object-cover border border-gray-200 dark:border-slate-800"
                  />
                ) : (
                  <div className="w-24 h-16 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-xs text-gray-400">
                    No Banner
                  </div>
                )}
                <Input type="file" accept="image/*" onChange={handleCoverFileChange} className="text-xs" />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold">Tool Screenshots (Up to 6 images)</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleScreenshotFilesChange}
              className="mt-2 text-xs"
            />
            {screenshotPreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-3">
                {screenshotPreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Screenshot ${idx}`}
                    className="w-full h-20 rounded-lg object-cover border border-gray-200 dark:border-slate-800"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Features & Metadata Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold dark:text-white pb-2 border-b dark:border-slate-800 flex items-center gap-2">
            <ShieldCheck className="text-orange-500" size={20} /> Features, Platforms & Target Audience
          </h2>

          {/* Supported Platforms */}
          <div>
            <Label className="text-xs font-semibold mb-2 block">Supported Platforms</Label>
            <div className="flex flex-wrap gap-2">
              {PLATFORM_OPTIONS.map((plat) => (
                <button
                  type="button"
                  key={plat}
                  onClick={() => handlePlatformToggle(plat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    platforms.includes(plat)
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>
          </div>

          {/* Key Features list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-semibold">Key Features</Label>
              <Button type="button" size="sm" variant="ghost" onClick={addFeature} className="text-xs text-orange-500">
                <Plus size={14} className="mr-1" /> Add Feature
              </Button>
            </div>
            <div className="space-y-2">
              {features.map((feat, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    placeholder={`Feature #${idx + 1}`}
                  />
                  {features.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(idx)}>
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Best For Tags */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-semibold">Best For (Target Audience / Use Cases)</Label>
              <Button type="button" size="sm" variant="ghost" onClick={addBestFor} className="text-xs text-orange-500">
                <Plus size={14} className="mr-1" /> Add Audience Tag
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {bestFor.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleBestForChange(idx, e.target.value)}
                    placeholder="e.g. Developers, Designers, Students"
                  />
                  {bestFor.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeBestFor(idx)}>
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-semibold">Frequently Asked Questions (FAQ)</Label>
              <Button type="button" size="sm" variant="ghost" onClick={addFaq} className="text-xs text-orange-500">
                <Plus size={14} className="mr-1" /> Add FAQ Item
              </Button>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl space-y-2 relative border border-gray-200 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500">Question #{idx + 1}</span>
                    {faqs.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeFaq(idx)} className="h-6 w-6">
                        <Trash2 size={14} className="text-red-500" />
                      </Button>
                    )}
                  </div>
                  <Input
                    value={faq.question}
                    onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                    placeholder="Question e.g. Is ChatGPT free to use?"
                  />
                  <Textarea
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                    placeholder="Answer details..."
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Publishing & SEO Controls Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold dark:text-white pb-2 border-b dark:border-slate-800 flex items-center gap-2">
            <Star className="text-orange-500" size={20} /> Publication & SEO Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
              <div>
                <Label className="font-bold">Feature Tool</Label>
                <p className="text-xs text-gray-500">Highlight this tool in hero and featured tool sections.</p>
              </div>
              <Switch checked={featured} onCheckedChange={setFeatured} />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
              <div>
                <Label className="font-bold">Status</Label>
                <p className="text-xs text-gray-500">Draft tools will not be visible on the public website.</p>
              </div>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border dark:border-slate-800">
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold">SEO Title</Label>
              <Input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Meta title for Google search results"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">SEO Description</Label>
              <Input
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Meta description summary"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Submit Action Bar */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/tools")}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating}
            className="bg-orange-500 hover:bg-orange-600 px-8 font-semibold text-white"
          >
            {isCreating || isUpdating
              ? "Saving Tool..."
              : isEditMode
              ? "Update AI Tool"
              : "Publish AI Tool"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditTool;
