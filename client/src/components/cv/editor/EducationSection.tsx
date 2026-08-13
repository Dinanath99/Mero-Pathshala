import React, { useState } from "react";
import { ICVEducation } from "@/types/cv.types";
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical, GraduationCap } from "lucide-react";

interface Props {
  education: ICVEducation[];
  onChange: (updated: ICVEducation[]) => void;
}

export const EducationSection: React.FC<Props> = ({ education, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id || null);

  const handleAddEducation = () => {
    const newEdu: ICVEducation = {
      id: `edu_${Date.now()}`,
      degree: "Bachelor of Science in Computer Science",
      institution: "University / College Name",
      location: "Kathmandu, Nepal",
      startDate: "2020",
      endDate: "2024",
      current: false,
      gpa: "3.80 / 4.0",
      description: "Graduated with honors. Relevant coursework in Data Structures, AI, and Software Architecture.",
    };
    onChange([newEdu, ...education]);
    setExpandedId(newEdu.id);
  };

  const handleRemove = (id: string) => {
    onChange(education.filter((e) => e.id !== id));
  };

  const handleUpdate = (id: string, field: keyof ICVEducation, value: any) => {
    onChange(
      education.map((e) => {
        if (e.id === id) {
          return { ...e, [field]: value };
        }
        return e;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
          {education.length} {education.length === 1 ? "Degree" : "Degrees"} Listed
        </span>
        <button
          type="button"
          onClick={handleAddEducation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-700 active:scale-95 text-white transition-all shadow-xs cursor-pointer"
        >
          <Plus size={14} /> Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-xs text-gray-500 mb-2">No education entries added yet.</p>
          <button
            type="button"
            onClick={handleAddEducation}
            className="text-xs font-semibold text-orange-600 hover:underline"
          >
            + Add degree or qualification
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {education.map((edu) => {
            const isExpanded = expandedId === edu.id;
            return (
              <div
                key={edu.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs overflow-hidden transition-all"
              >
                {/* Header Accordion */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                  className="flex items-center justify-between p-3.5 bg-gray-50/70 dark:bg-gray-800/50 hover:bg-gray-100/70 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap size={15} className="text-orange-500" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{edu.degree || "Degree"}</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        {edu.institution || "Institution"} • {edu.startDate || "Date"} –{" "}
                        {edu.current ? "Present" : edu.endDate || "Present"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(edu.id);
                      }}
                      className="p-1 rounded text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
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
                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Degree / Program <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleUpdate(edu.id, "degree", e.target.value)}
                          placeholder="e.g. B.Sc. Computer Science & Information Technology"
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Institution / University <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleUpdate(edu.id, "institution", e.target.value)}
                          placeholder="e.g. Tribhuvan University"
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={edu.location || ""}
                          onChange={(e) => handleUpdate(edu.id, "location", e.target.value)}
                          placeholder="e.g. Kathmandu, Nepal"
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Start Year / Date
                        </label>
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => handleUpdate(edu.id, "startDate", e.target.value)}
                          placeholder="2018"
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                            End Year / Date
                          </label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="checkbox"
                              id={`curr_edu_${edu.id}`}
                              checked={edu.current}
                              onChange={(e) => handleUpdate(edu.id, "current", e.target.checked)}
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-3 w-3"
                            />
                            <label htmlFor={`curr_edu_${edu.id}`} className="text-[10.5px] text-gray-600 dark:text-gray-400 cursor-pointer">
                              Currently Studying
                            </label>
                          </div>
                        </div>
                        <input
                          type="text"
                          disabled={edu.current}
                          value={edu.current ? "Present" : edu.endDate || ""}
                          onChange={(e) => handleUpdate(edu.id, "endDate", e.target.value)}
                          placeholder="2022"
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none disabled:opacity-50"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          GPA / Grade (Optional)
                        </label>
                        <input
                          type="text"
                          value={edu.gpa || ""}
                          onChange={(e) => handleUpdate(edu.id, "gpa", e.target.value)}
                          placeholder="e.g. 3.85 / 4.0 or First Division"
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Highlights & Achievements
                      </label>
                      <textarea
                        rows={2}
                        value={edu.description || ""}
                        onChange={(e) => handleUpdate(edu.id, "description", e.target.value)}
                        placeholder="e.g. Dean's List, Major project on Machine Learning, Academic awards..."
                        className="w-full text-xs p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
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
