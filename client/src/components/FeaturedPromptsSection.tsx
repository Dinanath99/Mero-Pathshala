import React, { useState } from "react";
import { useGetFeaturedPromptsQuery, useIncrementPromptCopyMutation } from "@/features/api/promptApi";
import { useNavigate } from "react-router-dom";
import { Copy, Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Prompt } from "@/types/prompt.types";

const FeaturedPromptsSection: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetFeaturedPromptsQuery();
  const [incrementCopy] = useIncrementPromptCopyMutation();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prompts = data?.prompts || [];

  const handleCopyPrompt = async (e: React.MouseEvent, prompt: Prompt) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.promptContent);
      setCopiedId(prompt._id);
      toast.success("Prompt copied to clipboard!");
      await incrementCopy(prompt._id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy prompt.");
    }
  };

  if (isLoading || prompts.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent dark:via-orange-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/50 mb-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 mr-1 inline" /> Prompt Library
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              🔥 Featured AI Prompts
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-1">
              Copy production-tested prompts and learn prompt engineering logic.
            </p>
          </div>

          <Button
            onClick={() => navigate("/prompts")}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold px-6 py-5 text-sm shadow-md hover:shadow-orange-500/25 transition-all self-start sm:self-auto"
          >
            View All Prompts <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.slice(0, 6).map((prompt: Prompt) => (
            <div
              key={prompt._id}
              onClick={() => navigate(`/prompts/${prompt.slug}`)}
              className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="outline" className="text-[11px] font-bold border-orange-500/30 text-orange-500">
                    {prompt.category?.name || "Prompt"}
                  </Badge>
                  <div className="flex items-center gap-1.5">
                    <Badge className="bg-emerald-500 text-white text-[10px]">Free</Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {prompt.difficulty}
                    </Badge>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors mb-2 line-clamp-1">
                  {prompt.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                  {prompt.englishDescription}
                </p>
              </div>

              <div className="border-t dark:border-slate-800 pt-4 flex items-center justify-between">
                <Button
                  size="sm"
                  onClick={(e) => handleCopyPrompt(e, prompt)}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs font-bold px-4"
                >
                  {copiedId === prompt._id ? (
                    <>
                      <Check size={14} className="mr-1" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="mr-1" /> Copy Prompt
                    </>
                  )}
                </Button>

                <span className="text-xs font-bold text-orange-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  View Logic <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPromptsSection;
