import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetPromptsQuery, useGetCategoriesQuery, useIncrementPromptCopyMutation } from "@/features/api/promptApi";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Sparkles, Copy, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PromptCategoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = React.useState(null);

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: promptsData, isLoading } = useGetPromptsQuery({
    category: slug,
    limit: 30,
  });
  const [incrementCopy] = useIncrementPromptCopyMutation();

  const categories = categoriesData?.categories || [];
  const currentCategory = categories.find((c) => c.slug === slug);
  const prompts = promptsData?.prompts || [];

  const handleCopyPrompt = async (e, prompt) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.promptContent);
      setCopiedId(prompt._id);
      toast.success("Prompt copied to clipboard!");
      await incrementCopy(prompt._id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error("Failed to copy prompt.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>{currentCategory ? `${currentCategory.name} Prompts` : "Category"} - AI Guru Nepal</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 mb-6">
        <button
          onClick={() => navigate("/prompts")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Prompt Library
        </button>
      </div>

      {/* Category Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-sm">
          <Badge className="bg-orange-500 text-white text-xs mb-3">Category</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            {currentCategory?.name || slug} Prompts
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base max-w-2xl">
            {currentCategory?.description || `Explore top-rated AI prompts for ${currentCategory?.name || slug}.`}
          </p>
        </div>
      </section>

      {/* Prompts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {isLoading ? (
          <div className="text-center py-12">Loading category prompts...</div>
        ) : prompts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800">
            <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">No Prompts Found in this Category</h3>
            <Button onClick={() => navigate("/prompts")} className="mt-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full">
              Explore All Prompts
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt) => (
              <div
                key={prompt._id}
                onClick={() => navigate(`/prompts/${prompt.slug}`)}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-emerald-500 text-white text-[10px]">Free</Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {prompt.difficulty}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-orange-500 transition-colors mb-2 line-clamp-1 dark:text-white">
                    {prompt.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                    {prompt.englishDescription}
                  </p>
                </div>
                <div className="border-t dark:border-slate-800 pt-4 flex items-center justify-between">
                  <Button
                    size="sm"
                    onClick={(e) => handleCopyPrompt(e, prompt)}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs font-bold px-4"
                  >
                    {copiedId === prompt._id ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                    {copiedId === prompt._id ? "Copied!" : "Copy"}
                  </Button>
                  <span className="text-xs font-bold text-orange-500 flex items-center gap-1">
                    Details <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PromptCategoryDetail;
