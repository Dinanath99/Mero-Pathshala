import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { learningPathsData } from "./learningPathsData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  Clock,
  PlayCircle,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  FileText,
  Save,
  HelpCircle,
  Target,
  Trophy,
} from "lucide-react";
import SEO from "@/components/SEO";

const LearningPathHub = () => {
  const { pathId } = useParams();
  const navigate = useNavigate();

  // Find matching learning path or default to student
  const pathKey = (pathId || "student").toLowerCase();
  const currentPath = learningPathsData[pathKey] || learningPathsData.student;

  const [completedModules, setCompletedModules] = useState([]);
  const [personalNotes, setPersonalNotes] = useState("");
  const [savedStatus, setSavedStatus] = useState("");

  useEffect(() => {
    // Load completion progress from localStorage
    const savedProgress = localStorage.getItem(`path_progress_${currentPath.id}`);
    if (savedProgress) {
      try {
        setCompletedModules(JSON.parse(savedProgress));
      } catch (e) {
        setCompletedModules([]);
      }
    }

    // Load saved notes
    const savedNotes = localStorage.getItem(`path_notes_${currentPath.id}`);
    if (savedNotes) {
      setPersonalNotes(savedNotes);
    }
  }, [currentPath.id]);

  const handleSaveNotes = () => {
    localStorage.setItem(`path_notes_${currentPath.id}`, personalNotes);
    setSavedStatus("Saved!");
    setTimeout(() => setSavedStatus(""), 2000);
  };

  const progressPercent = currentPath.modules?.length
    ? Math.round((completedModules.length / currentPath.modules.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <SEO
        title={`${currentPath.titleEn} — Learning Path`}
        description={currentPath.descEn}
      />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between text-xs font-bold text-gray-500">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="rounded-full text-xs hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={14} className="mr-1.5" /> Home
          </Button>

          <div className="flex items-center gap-1.5">
            <span>Learning Hub</span>
            <ChevronRight size={12} />
            <span className="text-orange-500 font-extrabold capitalize">{currentPath.role}</span>
          </div>
        </div>

        {/* Hero Header Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-8 sm:p-12 text-white border border-purple-500/20 shadow-2xl overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-3xl relative z-10">
            <Badge className={`${currentPath.badgeColor} text-xs px-3.5 py-1 font-bold uppercase tracking-wider`}>
              {currentPath.role} Path
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              {currentPath.titleEn}
            </h1>
            <p className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-serif">
              {currentPath.titleNp}
            </p>

            <p className="text-sm text-gray-300 leading-relaxed pt-2">
              {currentPath.descEn}
            </p>
            <p className="text-xs text-gray-400 font-medium italic">
              {currentPath.descNp}
            </p>
          </div>

          {/* Progress Tracker Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 max-w-lg space-y-2 border border-white/10 relative z-10">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Trophy size={16} className="text-yellow-400" /> Your Learning Progress
              </span>
              <span className="text-orange-400 font-black">{progressPercent}% Completed</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-orange-500 to-pink-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-400 text-right">
              {completedModules.length} of {currentPath.modules.length} lessons completed
            </p>
          </div>
        </div>

        {/* Modules Grid & Content Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Modules Roadmap (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="text-orange-500" /> Learning Path Modules
              </h2>
              <Badge variant="outline" className="text-xs font-bold text-gray-500">
                {currentPath.modules.length} Modules Available
              </Badge>
            </div>

            <div className="space-y-4">
              {currentPath.modules.map((mod, index) => {
                const isCompleted = completedModules.includes(mod.id);
                return (
                  <Card
                    key={mod.id}
                    className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 hover:border-orange-500 transition-all rounded-3xl p-6 shadow-sm hover:shadow-xl group"
                  >
                    <CardContent className="p-0 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${
                            isCompleted
                              ? "bg-emerald-500 text-white"
                              : "bg-orange-500/10 text-orange-500"
                          }`}>
                            {isCompleted ? <CheckCircle size={20} /> : index + 1}
                          </div>
                          <div>
                            <h3 className="text-base font-extrabold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                              {mod.title}
                            </h3>
                            <p className="text-xs font-bold text-orange-500 font-serif">
                              {mod.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] font-bold text-gray-400">
                            <Clock size={10} className="mr-1 inline" /> {mod.duration}
                          </Badge>
                        </div>
                      </div>

                      {/* Objectives */}
                      {mod.objectives && mod.objectives.length > 0 && (
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3.5 space-y-1 text-xs text-gray-600 dark:text-gray-300">
                          {mod.objectives.map((obj, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <Target size={12} className="text-orange-500 shrink-0" />
                              <span>{obj.en}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">
                          {mod.quiz?.length ? `${mod.quiz.length} Quiz Questions` : "Interactive Lesson"}
                        </span>

                        <Button
                          onClick={() => navigate(`/learn/path/${currentPath.id}/module/${mod.slug}`)}
                          size="sm"
                          className={`${
                            isCompleted
                              ? "bg-slate-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-orange-500 hover:text-white"
                              : "bg-orange-500 hover:bg-orange-600 text-white"
                          } font-extrabold rounded-full px-5 text-xs shadow-md`}
                        >
                          {isCompleted ? "Review Lesson" : "Start Lesson"} <PlayCircle size={14} className="ml-1.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar: Notes & Hub Info (1 Column) */}
          <div className="space-y-6">
            {/* Interactive Notes Drawer */}
            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText className="text-orange-500" /> My Learning Notes
                </h3>
                {savedStatus && (
                  <span className="text-xs font-bold text-emerald-500 animate-pulse">{savedStatus}</span>
                )}
              </div>

              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="Jot down key prompt tricks, formulas, or takeaways from this path..."
                className="w-full h-40 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />

              <Button
                onClick={handleSaveNotes}
                size="sm"
                className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-orange-500 text-white font-bold rounded-full text-xs py-2.5 shadow-md"
              >
                <Save size={14} className="mr-1.5" /> Save Personal Notes
              </Button>
            </Card>

            {/* Quick Learning Tip */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-3xl p-6 space-y-2">
              <h4 className="text-sm font-black text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                <Sparkles size={16} /> Quick AI Tip
              </h4>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                Always complete the quiz at the end of each module to lock in your progress and earn path completion badges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathHub;
