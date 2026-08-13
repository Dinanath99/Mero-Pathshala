import React, { useState } from "react";
import { ICVExperience } from "@/types/cv.types";
import { useImproveBulletAIMutation } from "@/features/api/cvApi";
import { Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Loader2, GripVertical, Check } from "lucide-react";
import { toast } from "sonner";

interface Props {
  experience: ICVExperience[];
  onChange: (updated: ICVExperience[]) => void;
}

export const ExperienceSection: React.FC<Props> = ({ experience, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);
  const [improveBulletAI, { isLoading }] = useImproveBulletAIMutation();
  const [optimizingKey, setOptimizingKey] = useState<string | null>(null);

  const handleAddExperience = () => {
    const newExp: ICVExperience = {
      id: `exp_${Date.now()}`,
      jobTitle: "Software Engineer",
      company: "Company Name",
      location: "Kathmandu, Nepal",
      employmentType: "Full-time",
      startDate: "2023-01",
      endDate: "",
      current: true,
      description: "Led development of core features and collaborated with cross-functional teams.",
      achievements: ["Increased application performance by 25% through query optimization."],
    };
    onChange([newExp, ...experience]);
    setExpandedId(newExp.id);
  };

  const handleRemove = (id: string) => {
    onChange(experience.filter((e) => e.id !== id));
  };

  const handleUpdate = (id: string, field: keyof ICVExperience, value: any) => {
    onChange(
      experience.map((e) => {
        if (e.id === id) {
          return { ...e, [field]: value };
        }
        return e;
      })
    );
  };

  const handleAddAchievement = (expId: string) => {
    onChange(
      experience.map((e) => {
        if (e.id === expId) {
          const achs = e.achievements || [];
          return { ...e, achievements: [...achs, "Delivered scalable feature that reduced user churn."] };
        }
        return e;
      })
    );
  };

  const handleUpdateAchievement = (expId: string, index: number, value: string) => {
    onChange(
      experience.map((e) => {
        if (e.id === expId) {
          const achs = [...(e.achievements || [])];
          achs[index] = value;
          return { ...e, achievements: achs };
        }
        return e;
      })
    );
  };

  const handleRemoveAchievement = (expId: string, index: number) => {
    onChange(
      experience.map((e) => {
        if (e.id === expId) {
          const achs = [...(e.achievements || [])];
          achs.splice(index, 1);
          return { ...e, achievements: achs };
        }
        return e;
      })
    );
  };

  const handleOptimizeBullet = async (expId: string, index: number, bulletText: string, jobTitle: string, company: string) => {
    const key = `${expId}_${index}`;
    setOptimizingKey(key);
    try {
      const res = await improveBulletAI({
        bulletText,
        context: { jobTitle, company },
        goal: "achievement-driven and impactful",
      }).unwrap();

      if (res.success && res.improvedBullet) {
        handleUpdateAchievement(expId, index, res.improvedBullet);
        toast.success("Bullet point optimized with action verbs!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to optimize bullet point.");
    } finally {
      setOptimizingKey(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
          {experience.length} {experience.length === 1 ? "Experience" : "Experiences"} Listed
        </span>
        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-700 active:scale-95 text-white transition-all shadow-xs cursor-pointer"
        >
          <Plus size={14} /> Add Work Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-xs text-gray-500 mb-2">No work experience added yet.</p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="text-xs font-semibold text-orange-600 hover:underline"
          >
            + Add your first role
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {experience.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs overflow-hidden transition-all"
              >
                {/* Header Accordion */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="flex items-center justify-between p-3.5 bg-gray-50/70 dark:bg-gray-800/50 hover:bg-gray-100/70 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center gap-2.5">
                    <GripVertical size={14} className="text-gray-400" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        {exp.jobTitle || "Job Title"}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        {exp.company || "Company"} • {exp.startDate || "Date"} –{" "}
                        {exp.current ? "Present" : exp.endDate || "Present"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(exp.id);
                      }}
                      className="p-1 rounded text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 size={13} />
                    </button>
                    {isExpanded ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                  </div>
                </div>

                {/* Body Form */}
                {isExpanded && (
                  <div className="p-4 space-y-3.5 animate-in fade-in duration-150">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Job Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => handleUpdate(exp.id, "jobTitle", e.target.value)}
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Company / Employer <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleUpdate(exp.id, "company", e.target.value)}
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location || ""}
                          onChange={(e) => handleUpdate(exp.id, "location", e.target.value)}
                          placeholder="e.g. Kathmandu, Nepal or Remote"
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Employment Type
                        </label>
                        <select
                          value={exp.employmentType || "Full-time"}
                          onChange={(e) => handleUpdate(exp.id, "employmentType", e.target.value)}
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Remote">Remote</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Start Date (YYYY-MM)
                        </label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => handleUpdate(exp.id, "startDate", e.target.value)}
                          placeholder="2023-01"
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                            End Date
                          </label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="checkbox"
                              id={`curr_${exp.id}`}
                              checked={exp.current}
                              onChange={(e) => handleUpdate(exp.id, "current", e.target.checked)}
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-3 w-3"
                            />
                            <label htmlFor={`curr_${exp.id}`} className="text-[10.5px] text-gray-600 dark:text-gray-400 cursor-pointer">
                              Present / Current
                            </label>
                          </div>
                        </div>
                        <input
                          type="text"
                          disabled={exp.current}
                          value={exp.current ? "Present" : exp.endDate || ""}
                          onChange={(e) => handleUpdate(exp.id, "endDate", e.target.value)}
                          placeholder="2024-02"
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Role Description */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Role Overview & Scope
                      </label>
                      <textarea
                        rows={2}
                        value={exp.description || ""}
                        onChange={(e) => handleUpdate(exp.id, "description", e.target.value)}
                        placeholder="Brief summary of your responsibilities, team structure, or technical scope..."
                        className="w-full text-xs p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>

                    {/* Key Achievements Bullets */}
                    <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">
                          Key Achievements & Impact Points
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddAchievement(exp.id)}
                          className="text-[11px] font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Plus size={12} /> Add Achievement
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(exp.achievements || []).map((ach, aIdx) => {
                          const isThisOptimizing = optimizingKey === `${exp.id}_${aIdx}`;
                          return (
                            <div key={aIdx} className="flex items-start gap-2">
                              <span className="text-gray-400 mt-2 text-xs">•</span>
                              <input
                                type="text"
                                value={ach}
                                onChange={(e) => handleUpdateAchievement(exp.id, aIdx, e.target.value)}
                                className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                              />
                              <button
                                type="button"
                                disabled={isThisOptimizing || !ach.trim()}
                                onClick={() =>
                                  handleOptimizeBullet(exp.id, aIdx, ach, exp.jobTitle, exp.company)
                                }
                                title="Optimize bullet with AI action verbs"
                                className="px-2 py-1.5 rounded-lg text-[10px] font-bold bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 hover:bg-orange-200 inline-flex items-center gap-1 border border-orange-200 dark:border-orange-800 shrink-0 cursor-pointer disabled:opacity-50"
                              >
                                {isThisOptimizing ? <Loader2 size={11} className="animate-spin" /> : <Sparkles size={11} />}
                                <span>AI Polish</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveAchievement(exp.id, aIdx)}
                                className="p-1.5 text-gray-400 hover:text-rose-600"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
