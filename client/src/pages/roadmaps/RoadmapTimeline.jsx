import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  Clock,
  BookOpen,
  Wrench,
  FileText,
  MessageSquare,
  Newspaper,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoadmapTimeline = ({ modules = [], completedModules = [], onToggleCompleteModule }) => {
  const navigate = useNavigate();
  const [expandedModule, setExpandedModule] = React.useState(0);

  return (
    <div className="space-y-6 relative">
      {/* Central Line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200 dark:bg-slate-800 -z-10" />

      {modules.map((mod, idx) => {
        const isCompleted = completedModules.includes(mod._id || `m_${idx}`);
        const isCurrent = !isCompleted && (idx === 0 || completedModules.includes(modules[idx - 1]?._id || `m_${idx - 1}`));
        const isLocked = !isCompleted && !isCurrent;
        const isExpanded = expandedModule === idx;

        return (
          <div key={idx} className="relative pl-14">
            {/* Timeline Circle Indicator */}
            <div
              onClick={() => !isLocked && setExpandedModule(isExpanded ? null : idx)}
              className={`absolute left-0 top-6 w-12 h-12 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                isCompleted
                  ? "bg-emerald-500 border-white text-white shadow-lg shadow-emerald-500/20"
                  : isCurrent
                  ? "bg-orange-500 border-orange-200 text-white shadow-lg shadow-orange-500/20 animate-pulse"
                  : "bg-slate-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-400"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 size={20} />
              ) : isLocked ? (
                <Lock size={16} />
              ) : (
                <span className="font-extrabold text-sm">{idx + 1}</span>
              )}
            </div>

            {/* Module Card Content */}
            <Card
              className={`bg-white dark:bg-slate-900 border transition-all duration-300 rounded-3xl p-6 shadow-sm ${
                isCurrent
                  ? "border-orange-500 ring-2 ring-orange-500/20 shadow-xl"
                  : "border-gray-200 dark:border-slate-800 hover:border-gray-300"
              }`}
            >
              <CardContent className="p-0 space-y-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                        {mod.title}
                      </h3>
                      {isCompleted && (
                        <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px] font-bold">
                          Completed
                        </Badge>
                      )}
                      {isCurrent && (
                        <Badge className="bg-orange-500 text-white text-[10px] font-bold">
                          Current Step
                        </Badge>
                      )}
                    </div>

                    {mod.titleNp && (
                      <p className="text-xs font-bold text-orange-500 font-serif">
                        {mod.titleNp}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-bold text-gray-400">
                      <Clock size={10} className="mr-1 inline" /> {mod.estimatedTime || "30 mins"}
                    </Badge>

                    <button
                      onClick={() => setExpandedModule(isExpanded ? null : idx)}
                      className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-400 transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {mod.description}
                </p>

                {/* Expandable Module Resources */}
                {isExpanded && (
                  <div className="pt-4 border-t dark:border-slate-800 space-y-4 animate-in fade-in duration-200">
                    {/* Attached Courses */}
                    {mod.courses?.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                          <BookOpen size={12} className="text-orange-500" /> Attached Courses
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {mod.courses.map((c) => (
                            <div
                              key={c._id}
                              onClick={() => navigate(`/course-detail/${c._id}`)}
                              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-between text-xs"
                            >
                              <span className="font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{c.courseTitle}</span>
                              <Badge className="bg-orange-500 text-white text-[10px] shrink-0">{c.category}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Attached Blogs */}
                    {mod.blogs?.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                          <FileText size={12} className="text-blue-500" /> Attached Guides & Blogs
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {mod.blogs.map((b) => (
                            <div
                              key={b._id}
                              onClick={() => navigate(`/blogs/${b.slug}`)}
                              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-between text-xs"
                            >
                              <span className="font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{b.title}</span>
                              <span className="text-[10px] text-gray-400 shrink-0">{b.readTime}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Attached AI Tools */}
                    {mod.tools?.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                          <Wrench size={12} className="text-indigo-500" /> Essential AI Tools
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {mod.tools.map((t) => (
                            <div
                              key={t._id}
                              onClick={() => navigate(`/ai-tools/${t.slug}`)}
                              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-between text-xs"
                            >
                              <span className="font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{t.name}</span>
                              <Badge variant="outline" className="text-[10px] text-indigo-500 border-indigo-500/30">{t.pricingType}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Practice Task & Mini Project */}
                    {mod.practiceTask && (
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 space-y-1 text-xs">
                        <span className="font-bold text-orange-600 dark:text-orange-400">Practice Task: </span>
                        <span className="text-gray-700 dark:text-gray-300">{mod.practiceTask}</span>
                      </div>
                    )}

                    {mod.miniProject && (
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4 space-y-1 text-xs">
                        <span className="font-bold text-purple-600 dark:text-purple-400">Mini Project: </span>
                        <span className="text-gray-700 dark:text-gray-300">{mod.miniProject}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Module Action Bar */}
                <div className="pt-3 border-t dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    Step {idx + 1} of {modules.length}
                  </span>

                  <Button
                    onClick={() => onToggleCompleteModule(mod._id || `m_${idx}`)}
                    size="sm"
                    className={`${
                      isCompleted
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : isCurrent
                        ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md"
                        : "bg-slate-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white"
                    } font-extrabold rounded-full px-5 text-xs transition-colors`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 size={14} className="mr-1.5 inline" /> Completed
                      </>
                    ) : (
                      <>
                        <PlayCircle size={14} className="mr-1.5 inline" /> Mark Complete
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default RoadmapTimeline;
