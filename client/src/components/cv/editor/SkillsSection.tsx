import React, { useState } from "react";
import { ICVSkill } from "@/types/cv.types";
import { Plus, X, Tag, Sparkles } from "lucide-react";

interface Props {
  skills: ICVSkill[];
  onChange: (updated: ICVSkill[]) => void;
}

const COMMON_SKILL_SUGGESTIONS = [
  { name: "TypeScript", category: "Technical Skills" as const },
  { name: "React", category: "Technical Skills" as const },
  { name: "Node.js", category: "Technical Skills" as const },
  { name: "Python", category: "Technical Skills" as const },
  { name: "MongoDB", category: "Technical Skills" as const },
  { name: "PostgreSQL", category: "Technical Skills" as const },
  { name: "Docker", category: "Tools & Technologies" as const },
  { name: "Git & GitHub", category: "Tools & Technologies" as const },
  { name: "REST APIs", category: "Technical Skills" as const },
  { name: "Tailwind CSS", category: "Technical Skills" as const },
  { name: "Next.js", category: "Technical Skills" as const },
  { name: "Problem Solving", category: "Soft Skills" as const },
  { name: "Team Leadership", category: "Soft Skills" as const },
  { name: "Agile / Scrum", category: "Soft Skills" as const },
];

export const SkillsSection: React.FC<Props> = ({ skills, onChange }) => {
  const [newSkillName, setNewSkillName] = useState("");
  const [newCategory, setNewCategory] = useState<ICVSkill["category"]>("Technical Skills");
  const [newLevel, setNewLevel] = useState<ICVSkill["level"]>("Intermediate");

  const categories: ICVSkill["category"][] = [
    "Technical Skills",
    "Soft Skills",
    "Tools & Technologies",
    "Languages",
    "General",
  ];

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSkillName.trim()) return;

    // Check if already exists
    if (skills.some((s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      setNewSkillName("");
      return;
    }

    const newSkill: ICVSkill = {
      id: `sk_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: newSkillName.trim(),
      category: newCategory,
      level: newLevel,
    };

    onChange([...skills, newSkill]);
    setNewSkillName("");
  };

  const handleRemove = (id: string) => {
    onChange(skills.filter((s) => s.id !== id));
  };

  const handleQuickAdd = (sug: { name: string; category: ICVSkill["category"] }) => {
    if (skills.some((s) => s.name.toLowerCase() === sug.name.toLowerCase())) return;
    const newSkill: ICVSkill = {
      id: `sk_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: sug.name,
      category: sug.category,
      level: "Advanced",
    };
    onChange([...skills, newSkill]);
  };

  return (
    <div className="space-y-5">
      {/* Add New Skill Form */}
      <form
        onSubmit={handleAddSkill}
        className="p-3.5 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
          <div className="sm:col-span-5">
            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Skill Name
            </label>
            <input
              type="text"
              placeholder="e.g. React, Docker, Leadership"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3 flex items-end">
            <button
              type="submit"
              disabled={!newSkillName.trim()}
              className="w-full text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 active:scale-95 text-white transition-all shadow-xs disabled:opacity-50 inline-flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus size={14} /> Add Skill
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div>
          <span className="text-[10.5px] font-semibold text-gray-500 flex items-center gap-1 mb-1.5">
            <Sparkles size={11} className="text-orange-500" /> Popular Skill Suggestions:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_SKILL_SUGGESTIONS.filter((sug) => !skills.some((s) => s.name.toLowerCase() === sug.name.toLowerCase()))
              .slice(0, 8)
              .map((sug) => (
                <button
                  key={sug.name}
                  type="button"
                  onClick={() => handleQuickAdd(sug)}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-orange-400 hover:text-orange-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={10} /> {sug.name}
                </button>
              ))}
          </div>
        </div>
      </form>

      {/* Categorized Skills List */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const categorySkills = skills.filter((s) => (s.category || "Technical Skills") === cat);
          if (categorySkills.length === 0) return null;

          return (
            <div key={cat} className="space-y-2">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-1">
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{cat}</span>
                <span className="text-[10.5px] text-gray-400">{categorySkills.length} skills</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {categorySkills.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-orange-50 dark:bg-orange-950/30 text-orange-950 dark:text-orange-200 border border-orange-200 dark:border-orange-900/60 shadow-2xs group"
                  >
                    <span>{s.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemove(s.id)}
                      className="text-orange-400 hover:text-rose-600 transition-colors p-0.5 rounded"
                      title="Remove skill"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {skills.length === 0 && (
          <div className="p-6 text-center text-xs text-gray-500 bg-gray-50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            No skills added yet. Add your core technical and domain skills above.
          </div>
        )}
      </div>
    </div>
  );
};
