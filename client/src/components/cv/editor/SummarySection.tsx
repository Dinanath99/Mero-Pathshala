import React, { useState } from "react";
import { ICVPersonalInfo, ICVExperience, ICVSkill } from "@/types/cv.types";
import { useImproveSummaryAIMutation } from "@/features/api/cvApi";
import { Sparkles, Loader2, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Props {
  summary: string;
  personalInfo: ICVPersonalInfo;
  experience: ICVExperience[];
  skills: ICVSkill[];
  onChange: (newSummary: string) => void;
}

export const SummarySection: React.FC<Props> = ({ summary, personalInfo, experience, skills, onChange }) => {
  const [improveSummaryAI, { isLoading }] = useImproveSummaryAIMutation();
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState(personalInfo.professionalTitle || "");

  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  const handleAISuggestion = async () => {
    try {
      const res = await improveSummaryAI({
        personalInfo,
        currentSummary: summary,
        experience,
        skills,
        targetRole: targetRole || personalInfo.professionalTitle,
      }).unwrap();

      if (res.success && res.improvedSummary) {
        setAiSuggestion(res.improvedSummary);
        toast.success("AI generated an optimized professional summary!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to generate AI summary.");
    }
  };

  const applyAISuggestion = () => {
    if (aiSuggestion) {
      onChange(aiSuggestion);
      setAiSuggestion(null);
      toast.success("Applied AI summary to CV.");
    }
  };

  return (
    <div className="space-y-4">
      {/* AI Assistant Header Box */}
      <div className="p-3.5 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 dark:from-orange-950/30 dark:to-amber-950/20 rounded-xl border border-orange-200 dark:border-orange-900/50">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-orange-500 text-white shadow-xs">
              <Sparkles size={14} />
            </span>
            <span className="text-xs font-bold text-gray-900 dark:text-white">AI Summary Assistant</span>
          </div>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleAISuggestion}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-700 active:scale-95 text-white transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
            <span>{summary ? "Rewrite with AI" : "Generate with AI"}</span>
          </button>
        </div>

        <p className="text-[11px] text-gray-600 dark:text-gray-400">
          The AI synthesizes your skills, experience, and target role into a concise, high-impact ATS summary.
        </p>

        {/* Target role customize */}
        <div className="mt-2 flex items-center gap-2">
          <label className="text-[11px] font-medium text-gray-700 dark:text-gray-300 shrink-0">Target Role:</label>
          <input
            type="text"
            placeholder="e.g. Senior Frontend Engineer"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="flex-1 text-[11px] px-2.5 py-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* AI Suggestion Preview Card */}
      {aiSuggestion && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-300 dark:border-emerald-800 space-y-2 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <Sparkles size={13} /> AI Suggested Summary:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleAISuggestion}
                className="text-[11px] px-2 py-1 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 inline-flex items-center gap-1"
              >
                <RefreshCw size={11} /> Regenerate
              </button>
              <button
                type="button"
                onClick={applyAISuggestion}
                className="text-[11px] px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold inline-flex items-center gap-1 shadow-xs"
              >
                <Check size={12} /> Apply to CV
              </button>
            </div>
          </div>
          <p className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium bg-white/70 dark:bg-emerald-900/20 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800/60">
            {aiSuggestion}
          </p>
        </div>
      )}

      {/* Main Textarea */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
          <label>Executive / Professional Summary</label>
          <span className={`text-[11px] ${wordCount >= 40 && wordCount <= 80 ? "text-emerald-600" : "text-gray-500"}`}>
            {wordCount} words (Recommended: 40–75 words)
          </span>
        </div>
        <textarea
          rows={5}
          placeholder="Write a concise overview of your background, technical focus, key strengths, and career ambitions..."
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-xs p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none leading-relaxed"
        />
      </div>
    </div>
  );
};
