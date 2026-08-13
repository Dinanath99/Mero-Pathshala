import React, { useState } from "react";
import { ICVCustomSection, ICVCustomItem } from "@/types/cv.types";
import { Plus, Trash2, Layers, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  customSections: ICVCustomSection[];
  onChange: (updated: ICVCustomSection[]) => void;
}

export const CustomSections: React.FC<Props> = ({ customSections, onChange }) => {
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    const newSection: ICVCustomSection = {
      id: `custom_${Date.now()}`,
      title: newSectionTitle.trim(),
      items: [
        {
          id: `item_${Date.now()}`,
          title: "Item Title",
          subtitle: "Organization or Role",
          date: "2023",
          description: "Details regarding this custom activity or accomplishment.",
        },
      ],
    };
    onChange([...customSections, newSection]);
    setNewSectionTitle("");
  };

  const handleRemoveSection = (sectionId: string) => {
    onChange(customSections.filter((cs) => cs.id !== sectionId));
  };

  const handleAddItem = (sectionId: string) => {
    const newItem: ICVCustomItem = {
      id: `item_${Date.now()}`,
      title: "New Item",
      subtitle: "",
      date: "",
      description: "",
    };
    onChange(
      customSections.map((cs) => {
        if (cs.id === sectionId) {
          return { ...cs, items: [...cs.items, newItem] };
        }
        return cs;
      })
    );
  };

  const handleUpdateItem = (sectionId: string, itemId: string, field: keyof ICVCustomItem, value: string) => {
    onChange(
      customSections.map((cs) => {
        if (cs.id === sectionId) {
          return {
            ...cs,
            items: cs.items.map((it) => (it.id === itemId ? { ...it, [field]: value } : it)),
          };
        }
        return cs;
      })
    );
  };

  const handleRemoveItem = (sectionId: string, itemId: string) => {
    onChange(
      customSections.map((cs) => {
        if (cs.id === sectionId) {
          return {
            ...cs,
            items: cs.items.filter((it) => it.id !== itemId),
          };
        }
        return cs;
      })
    );
  };

  return (
    <div className="space-y-4">
      {/* Create Custom Section Header Bar */}
      <div className="flex gap-2 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder="New Section Name (e.g. Publications, Volunteering, Patents)"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAddSection}
          disabled={!newSectionTitle.trim()}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 active:scale-95 text-white transition-all shadow-xs disabled:opacity-50 inline-flex items-center gap-1 cursor-pointer"
        >
          <Plus size={14} /> Add Section
        </button>
      </div>

      {customSections.length === 0 ? (
        <div className="p-6 text-center text-xs text-gray-500 bg-gray-50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          No custom sections created yet. Add specialized sections to personalize your CV.
        </div>
      ) : (
        <div className="space-y-4">
          {customSections.map((cs) => (
            <div
              key={cs.id}
              className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3"
            >
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                <div className="flex items-center gap-2">
                  <Layers size={15} className="text-orange-500" />
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                    {cs.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddItem(cs.id)}
                    className="text-[11px] font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={12} /> Add Item
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveSection(cs.id)}
                    className="text-gray-400 hover:text-rose-600 transition-colors ml-2"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Custom Items */}
              <div className="space-y-3">
                {cs.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        placeholder="Item Title / Role"
                        value={item.title}
                        onChange={(e) => handleUpdateItem(cs.id, item.id, "title", e.target.value)}
                        className="text-xs font-bold px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex-1 mr-2"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(cs.id, item.id)}
                        className="text-gray-400 hover:text-rose-500"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Organization / Subtitle"
                        value={item.subtitle || ""}
                        onChange={(e) => handleUpdateItem(cs.id, item.id, "subtitle", e.target.value)}
                        className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      />
                      <input
                        type="text"
                        placeholder="Date (e.g. 2023)"
                        value={item.date || ""}
                        onChange={(e) => handleUpdateItem(cs.id, item.id, "date", e.target.value)}
                        className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Description or key points..."
                      value={item.description || ""}
                      onChange={(e) => handleUpdateItem(cs.id, item.id, "description", e.target.value)}
                      className="w-full text-xs p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
