import React, { useState, useEffect } from "react";
import { ICVData, ICVAnalysis, ICVJobMatch, ICVRecommendation } from "@/types/cv.types";
import { useAnalyzeCVAIMutation, useMatchJobDescriptionAIMutation } from "@/features/api/cvApi";
import {
  Sparkles,
  X,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  Target,
  ArrowRight,
  RefreshCw,
  Award,
} from "lucide-react";
import { toast } from "sonner";

interface Props {
  cvData: ICVData;
  cvId?: string;
  onApplyRecommendation: (rec: ICVRecommendation) => void;
  onClose: () => void;
}

export const CVAnalyzerModal: React.FC<Props> = ({ cvData, cvId, onApplyRecommendation, onClose }) => {
  const [activeTab, setActiveTab] = useState<"analysis" | "jobMatch">("analysis");
  const [targetRole, setTargetRole] = useState(cvData.personalInfo?.professionalTitle || "");
  const [jobDescription, setJobDescription] = useState("");

  const [analyzeCVAI, { isLoading: isAnalyzing }] = useAnalyzeCVAIMutation();
  const [matchJobDescriptionAI, { isLoading: isMatching }] = useMatchJobDescriptionAIMutation();

  const [analysisResult, setAnalysisResult] = useState<ICVAnalysis | null>(null);
  const [jobMatchResult, setJobMatchResult] = useState<ICVJobMatch | null>(null);
  const [appliedRecIds, setAppliedRecIds] = useState<string[]>([]);

  // Automatically trigger analysis on open
  useEffect(() => {
    runAnalysis();
  }, []);

  const runAnalysis = async () => {
    try {
      const res = await analyzeCVAI({
        cvData,
        cvId,
        targetRole,
      }).unwrap();

      if (res.success && res.analysis) {
        setAnalysisResult(res.analysis);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to analyze CV.");
    }
  };

  const handleMatchJob = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description first.");
      return;
    }
    try {
      const res = await matchJobDescriptionAI({
        cvData,
        jobDescription,
        targetRole,
      }).unwrap();

      if (res.success && res.jobMatch) {
        setJobMatchResult(res.jobMatch);
        toast.success("Job description match calculated!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to match job description.");
    }
  };

  const handleApply = (rec: ICVRecommendation) => {
    onApplyRecommendation(rec);
    setAppliedRecIds((prev) => [...prev, rec.id]);
    toast.success(`Applied suggestion for ${rec.section}!`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30";
    if (score >= 60) return "text-amber-500 border-amber-500 bg-amber-50 dark:bg-amber-950/30";
    return "text-rose-500 border-rose-500 bg-rose-50 dark:bg-rose-950/30";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-orange-600 text-white shadow-xs">
              <Sparkles size={16} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                AI CV Analyzer & ATS Job Matcher
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Instant ATS diagnostics, keyword coverage, and role tailoring
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100 dark:border-gray-800 px-4 bg-gray-50/50 dark:bg-gray-800/30">
          <button
            type="button"
            onClick={() => setActiveTab("analysis")}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "analysis"
                ? "border-orange-600 text-orange-600 dark:text-orange-400"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <FileCheck size={14} /> Comprehensive Score & ATS Check
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("jobMatch")}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "jobMatch"
                ? "border-orange-600 text-orange-600 dark:text-orange-400"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Target size={14} /> Job Description Matcher
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          {activeTab === "analysis" ? (
            <div>
              {isAnalyzing ? (
                <div className="py-16 text-center space-y-3">
                  <Loader2 size={32} className="animate-spin text-orange-600 mx-auto" />
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Analyzing CV structure, ATS keyword density, and phrasing...
                  </p>
                </div>
              ) : analysisResult ? (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Score Top Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Overall Score Circle */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 dark:from-orange-950/40 dark:to-amber-950/20 border border-orange-200 dark:border-orange-900/50 flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-black shrink-0 ${getScoreColor(
                          analysisResult.overallScore
                        )}`}
                      >
                        {analysisResult.overallScore}
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Overall CV Score
                        </div>
                        <p className="text-xs text-gray-800 dark:text-gray-200 mt-0.5 font-medium">
                          {analysisResult.overallScore >= 80
                            ? "Excellent resume! Ready for high-competition submissions."
                            : analysisResult.overallScore >= 65
                            ? "Good foundation with high-impact optimization potential."
                            : "Needs improvements in keyword depth and formatting."}
                        </p>
                      </div>
                    </div>

                    {/* ATS Score */}
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">ATS Parse Score</span>
                        <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                          {analysisResult.scores?.atsScore || 80}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mt-2">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${analysisResult.scores?.atsScore || 80}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2">
                        {analysisResult.breakdown?.atsFeedback || "Good standard headings for ATS scanning."}
                      </p>
                    </div>

                    {/* Content Quality */}
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Content & Action Verbs</span>
                        <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                          {analysisResult.scores?.contentQuality || 75}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mt-2">
                        <div
                          className="bg-emerald-600 h-full rounded-full"
                          style={{ width: `${analysisResult.scores?.contentQuality || 75}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2">
                        {analysisResult.breakdown?.contentFeedback || "Clear role metrics and achievements."}
                      </p>
                    </div>
                  </div>

                  {/* Recommendations List */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                        <TrendingUp size={14} className="text-orange-500" /> Actionable Recommendations (
                        {analysisResult.recommendations?.length || 0})
                      </h4>
                      <button
                        type="button"
                        onClick={runAnalysis}
                        className="text-xs text-orange-600 dark:text-orange-400 font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <RefreshCw size={11} /> Re-scan
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {(analysisResult.recommendations || []).map((rec) => {
                        const isApplied = appliedRecIds.includes(rec.id);
                        return (
                          <div
                            key={rec.id}
                            className={`p-3.5 rounded-xl border transition-all ${
                              isApplied
                                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800"
                                : rec.type === "warning"
                                ? "bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50"
                                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2.5">
                                {rec.type === "warning" ? (
                                  <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                                ) : (
                                  <CheckCircle2 size={16} className="text-orange-500 shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                                      {rec.issue}
                                    </span>
                                    <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full uppercase bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                      {rec.section}
                                    </span>
                                  </div>
                                  <p className="text-[11.5px] text-gray-600 dark:text-gray-400 mt-1">
                                    {rec.explanation}
                                  </p>

                                  {rec.suggestedText && (
                                    <div className="mt-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-[11px] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium">
                                      <span className="font-bold text-orange-600 dark:text-orange-400">
                                        Suggested wording:{" "}
                                      </span>
                                      &quot;{rec.suggestedText}&quot;
                                    </div>
                                  )}
                                </div>
                              </div>

                              {rec.suggestedText && (
                                <button
                                  type="button"
                                  disabled={isApplied}
                                  onClick={() => handleApply(rec)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 inline-flex items-center gap-1 ${
                                    isApplied
                                      ? "bg-emerald-600 text-white cursor-default"
                                      : "bg-orange-600 hover:bg-orange-700 active:scale-95 text-white shadow-xs cursor-pointer"
                                  }`}
                                >
                                  {isApplied ? (
                                    <>
                                      <CheckCircle2 size={12} /> Applied
                                    </>
                                  ) : (
                                    <>
                                      <Sparkles size={12} /> Apply Fix
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            /* Job Description Matcher Tab */
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
                <label className="block text-xs font-bold text-gray-900 dark:text-white">
                  Paste the Job Description (JD) to Compare:
                </label>
                <textarea
                  rows={4}
                  placeholder="Paste the target job description or requirements here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <button
                  type="button"
                  disabled={isMatching || !jobDescription.trim()}
                  onClick={handleMatchJob}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 active:scale-95 text-white transition-all shadow-xs disabled:opacity-50 inline-flex items-center gap-2 cursor-pointer"
                >
                  {isMatching ? <Loader2 size={13} className="animate-spin" /> : <Target size={14} />}
                  <span>Calculate Job Match Percentage</span>
                </button>
              </div>

              {jobMatchResult && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200 dark:border-blue-900/50 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase text-gray-500">Match Compatibility</div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                        {jobMatchResult.roleSuitability}
                      </h3>
                    </div>
                    <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
                      {jobMatchResult.matchPercentage}%
                    </div>
                  </div>

                  {/* Matched vs Missing Skills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40 space-y-2">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 size={14} /> Matched Keywords ({jobMatchResult.matchedSkills?.length || 0})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(jobMatchResult.matchedSkills || []).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-rose-50/40 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-900/40 space-y-2">
                      <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                        <AlertTriangle size={14} /> Missing / Target Keywords (
                        {jobMatchResult.missingSkills?.length || 0})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(jobMatchResult.missingSkills || []).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tailored Advice */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      AI Tailored Recommendations for this Role:
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                      {(jobMatchResult.tailoredAdvice || []).map((adv, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight size={13} className="text-orange-500 shrink-0 mt-0.5" />
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
