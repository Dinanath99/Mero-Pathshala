import React, { useState } from "react";
import { ICVProject } from "@/types/cv.types";
import { Plus, Trash2, ChevronDown, ChevronUp, Globe, Github, ExternalLink } from "lucide-react";

interface Props {
  projects: ICVProject[];
  onChange: (updated: ICVProject[]) => void;
}

export const ProjectsSection: React.FC<Props> = ({ projects, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id || null);
  const [techInput, setTechInput] = useState<{ [key: string]: string }>({});

  const handleAddProject = () => {
    const newProj: ICVProject = {
      id: `proj_${Date.now()}`,
      name: "Interactive Web Application",
      description: "Architected and launched a full-stack platform with real-time analytics and responsive design.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
      projectUrl: "https://example.com",
      githubUrl: "https://github.com/username/project",
      startDate: "2023-01",
      endDate: "2023-06",
    };
    onChange([newProj, ...projects]);
    setExpandedId(newProj.id);
  };

  const handleRemove = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const handleUpdate = (id: string, field: keyof ICVProject, value: any) => {
    onChange(
      projects.map((p) => {
        if (p.id === id) {
          return { ...p, [field]: value };
        }
        return p;
      })
    );
  };

  const handleAddTech = (projId: string) => {
    const text = techInput[projId]?.trim();
    if (!text) return;
    const project = projects.find((p) => p.id === projId);
    if (!project) return;

    const existingTech = project.technologies || [];
    if (!existingTech.includes(text)) {
      handleUpdate(projId, "technologies", [...existingTech, text]);
    }
    setTechInput({ ...techInput, [projId]: "" });
  };

  const handleRemoveTech = (projId: string, techName: string) => {
    const project = projects.find((p) => p.id === projId);
    if (!project) return;
    handleUpdate(
      projId,
      "technologies",
      (project.technologies || []).filter((t) => t !== techName)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
          {projects.length} {projects.length === 1 ? "Project" : "Projects"} Listed
        </span>
        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-700 active:scale-95 text-white transition-all shadow-xs cursor-pointer"
        >
          <Plus size={14} /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-xs text-gray-500 mb-2">No projects listed yet.</p>
          <button
            type="button"
            onClick={handleAddProject}
            className="text-xs font-semibold text-orange-600 hover:underline"
          >
            + Add a featured project
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((proj) => {
            const isExpanded = expandedId === proj.id;
            return (
              <div
                key={proj.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs overflow-hidden transition-all"
              >
                {/* Header Accordion */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                  className="flex items-center justify-between p-3.5 bg-gray-50/70 dark:bg-gray-800/50 hover:bg-gray-100/70 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe size={15} className="text-orange-500" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        {proj.name || "Project Name"}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        {proj.technologies?.slice(0, 3).join(", ") || "Technologies"} • {proj.startDate || "Date"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(proj.id);
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
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Project Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => handleUpdate(proj.id, "name", e.target.value)}
                          placeholder="e.g. AI Career Recommendation System"
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Date Range
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Start (2023-01)"
                            value={proj.startDate || ""}
                            onChange={(e) => handleUpdate(proj.id, "startDate", e.target.value)}
                            className="w-1/2 text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="End (2023-06)"
                            value={proj.endDate || ""}
                            onChange={(e) => handleUpdate(proj.id, "endDate", e.target.value)}
                            className="w-1/2 text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Live Demo URL
                        </label>
                        <input
                          type="url"
                          value={proj.projectUrl || ""}
                          onChange={(e) => handleUpdate(proj.id, "projectUrl", e.target.value)}
                          placeholder="https://myproject.com"
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          GitHub Repository URL
                        </label>
                        <input
                          type="url"
                          value={proj.githubUrl || ""}
                          onChange={(e) => handleUpdate(proj.id, "githubUrl", e.target.value)}
                          placeholder="https://github.com/username/project"
                          className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Technologies Badges */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Technologies Used
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Type tech name (e.g. Next.js) and press Add"
                          value={techInput[proj.id] || ""}
                          onChange={(e) => setTechInput({ ...techInput, [proj.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddTech(proj.id);
                            }
                          }}
                          className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTech(proj.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 cursor-pointer"
                        >
                          Add
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {(proj.technologies || []).map((t, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                          >
                            {t}
                            <button
                              type="button"
                              onClick={() => handleRemoveTech(proj.id, t)}
                              className="text-gray-400 hover:text-rose-500"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Project Description & Impact
                      </label>
                      <textarea
                        rows={3}
                        value={proj.description || ""}
                        onChange={(e) => handleUpdate(proj.id, "description", e.target.value)}
                        placeholder="Explain the problem solved, architecture implemented, and key results achieved..."
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
