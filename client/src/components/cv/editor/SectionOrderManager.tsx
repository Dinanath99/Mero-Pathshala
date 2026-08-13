import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Eye, EyeOff, Sparkles, Briefcase, GraduationCap, BookOpen, Globe, Award, Languages, Layers } from "lucide-react";
import { ICVCustomSection } from "@/types/cv.types";

interface Props {
  sectionOrder: string[];
  hiddenSections: string[];
  customSections: ICVCustomSection[];
  onReorder: (newOrder: string[]) => void;
  onToggleHidden: (sectionKey: string) => void;
}

const SECTION_METADATA: Record<string, { label: string; icon: React.ReactNode }> = {
  summary: { label: "Professional Summary", icon: <Sparkles size={14} className="text-orange-500" /> },
  experience: { label: "Work Experience", icon: <Briefcase size={14} className="text-blue-500" /> },
  education: { label: "Education & Degrees", icon: <GraduationCap size={14} className="text-emerald-500" /> },
  skills: { label: "Skills & Competencies", icon: <BookOpen size={14} className="text-purple-500" /> },
  projects: { label: "Featured Projects", icon: <Globe size={14} className="text-cyan-500" /> },
  certifications: { label: "Certifications", icon: <Award size={14} className="text-amber-500" /> },
  languages: { label: "Languages", icon: <Languages size={14} className="text-rose-500" /> },
  achievements: { label: "Honors & Achievements", icon: <Award size={14} className="text-yellow-500" /> },
};

export const SectionOrderManager: React.FC<Props> = ({
  sectionOrder,
  hiddenSections,
  customSections,
  onReorder,
  onToggleHidden,
}) => {
  const allAvailableKeys = [
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
    "achievements",
    ...customSections.map((cs) => cs.id),
  ];

  // Merge any keys missing from sectionOrder
  const fullOrder = Array.from(new Set([...sectionOrder, ...allAvailableKeys])).filter((key) =>
    allAvailableKeys.includes(key)
  );

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(fullOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onReorder(items);
  };

  const getSectionInfo = (key: string) => {
    if (SECTION_METADATA[key]) {
      return SECTION_METADATA[key];
    }
    const custom = customSections.find((cs) => cs.id === key);
    return {
      label: custom?.title || "Custom Section",
      icon: <Layers size={14} className="text-indigo-500" />,
    };
  };

  return (
    <div className="space-y-3">
      <div className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Drag and drop items to reorder sections on your CV. Click the eye icon to hide or show any section.
        </p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {fullOrder.map((sectionKey, index) => {
                const info = getSectionInfo(sectionKey);
                const isHidden = hiddenSections.includes(sectionKey);

                return (
                  <Draggable key={sectionKey} draggableId={sectionKey} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          snapshot.isDragging
                            ? "bg-orange-50 dark:bg-orange-950/40 border-orange-400 shadow-lg scale-[1.02]"
                            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-2xs hover:border-gray-300"
                        } ${isHidden ? "opacity-50" : "opacity-100"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            {...provided.dragHandleProps}
                            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-grab active:cursor-grabbing p-1"
                          >
                            <GripVertical size={16} />
                          </div>
                          <div className="flex items-center gap-2">
                            {info.icon}
                            <span className="text-xs font-bold text-gray-900 dark:text-white">
                              {info.label}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10.5px] font-medium text-gray-400">
                            {isHidden ? "Hidden" : "Visible"}
                          </span>
                          <button
                            type="button"
                            onClick={() => onToggleHidden(sectionKey)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isHidden
                                ? "text-gray-400 hover:text-gray-700 bg-gray-100 dark:bg-gray-800"
                                : "text-orange-600 hover:text-orange-700 bg-orange-50 dark:bg-orange-950/40"
                            }`}
                            title={isHidden ? "Show section" : "Hide section"}
                          >
                            {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
