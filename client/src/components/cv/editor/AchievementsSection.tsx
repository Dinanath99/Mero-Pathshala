import React from "react";
import { ICVAchievement } from "@/types/cv.types";
import { Plus, Trash2, Award } from "lucide-react";

interface Props {
  achievements: ICVAchievement[];
  onChange: (updated: ICVAchievement[]) => void;
}

export const AchievementsSection: React.FC<Props> = ({ achievements, onChange }) => {
  const handleAdd = () => {
    const newAch: ICVAchievement = {
      id: `ach_${Date.now()}`,
      title: "1st Place – National Hackathon",
      organization: "CAN Federation Nepal",
      date: "2023-09",
      description: "Recognized for architecting an offline AI educational toolkit for remote schools.",
    };
    onChange([...achievements, newAch]);
  };

  const handleRemove = (id: string) => {
    onChange(achievements.filter((a) => a.id !== id));
  };

  const handleUpdate = (id: string, field: keyof ICVAchievement, value: any) => {
    onChange(
      achievements.map((a) => {
        if (a.id === id) {
          return { ...a, [field]: value };
        }
        return a;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
          {achievements.length} {achievements.length === 1 ? "Award / Honor" : "Awards & Honors"}
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-700 active:scale-95 text-white transition-all shadow-xs cursor-pointer"
        >
          <Plus size={14} /> Add Achievement
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="p-6 text-center text-xs text-gray-500 bg-gray-50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          No awards or achievements listed yet.
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-3.5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-2.5"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Award size={15} className="text-orange-500" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    {ach.title || "Achievement"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(ach.id)}
                  className="text-gray-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Award Title
                  </label>
                  <input
                    type="text"
                    value={ach.title}
                    onChange={(e) => handleUpdate(ach.id, "title", e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Awarding Organization
                  </label>
                  <input
                    type="text"
                    value={ach.organization || ""}
                    onChange={(e) => handleUpdate(ach.id, "organization", e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Description / Significance
                </label>
                <textarea
                  rows={2}
                  value={ach.description || ""}
                  onChange={(e) => handleUpdate(ach.id, "description", e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
