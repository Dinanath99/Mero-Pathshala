import React, { useState } from "react";
import { ICVLanguage } from "@/types/cv.types";
import { Plus, Trash2, Languages } from "lucide-react";

interface Props {
  languages: ICVLanguage[];
  onChange: (updated: ICVLanguage[]) => void;
}

export const LanguagesSection: React.FC<Props> = ({ languages, onChange }) => {
  const [langName, setLangName] = useState("");
  const [proficiency, setProficiency] = useState<ICVLanguage["proficiency"]>("Professional");

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!langName.trim()) return;

    const newLang: ICVLanguage = {
      id: `lang_${Date.now()}`,
      language: langName.trim(),
      proficiency,
    };
    onChange([...languages, newLang]);
    setLangName("");
  };

  const handleRemove = (id: string) => {
    onChange(languages.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="flex gap-2 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Language (e.g. English, Nepali, German)"
            value={langName}
            onChange={(e) => setLangName(e.target.value)}
            className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
        <select
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value as any)}
          className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        >
          <option value="Native">Native</option>
          <option value="Fluent">Fluent</option>
          <option value="Professional">Professional</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Basic">Basic</option>
        </select>
        <button
          type="submit"
          disabled={!langName.trim()}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 active:scale-95 text-white transition-all shadow-xs disabled:opacity-50 inline-flex items-center gap-1 cursor-pointer"
        >
          <Plus size={14} /> Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {languages.map((l) => (
          <span
            key={l.id}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs"
          >
            <Languages size={13} className="text-orange-500" />
            <span className="font-semibold text-gray-900 dark:text-white">{l.language}</span>
            <span className="text-gray-500 dark:text-gray-400 text-[11px]">({l.proficiency})</span>
            <button
              type="button"
              onClick={() => handleRemove(l.id)}
              className="text-gray-400 hover:text-rose-500 ml-1"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
