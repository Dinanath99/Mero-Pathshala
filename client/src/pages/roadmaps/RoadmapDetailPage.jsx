import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetRoadmapBySlugQuery,
  useGetUserRoadmapProgressQuery,
  useUpdateRoadmapProgressMutation,
  useToggleRoadmapBookmarkMutation,
} from "@/features/api/roadmapApi";
import RoadmapTimeline from "./RoadmapTimeline";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Sparkles,
  Share2,
  Bookmark,
  CheckCircle2,
  Trophy,
  Award,
  Target,
  Users,
  RotateCcw,
  Check,
} from "lucide-react";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const RoadmapDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetRoadmapBySlugQuery(slug);
  const roadmap = data?.roadmap;

  const [toggleBookmark] = useToggleRoadmapBookmarkMutation();
  const [updateProgress] = useUpdateRoadmapProgressMutation();

  const { data: progressData } = useGetUserRoadmapProgressQuery(roadmap?._id, {
    skip: !user || !roadmap?._id,
  });

  const [completedModules, setCompletedModules] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Guest or persistent local storage fallback
    if (roadmap) {
      if (progressData?.progress?.completedModules) {
        setCompletedModules(progressData.progress.completedModules);
      } else {
        const saved = localStorage.getItem(`rm_prog_${roadmap._id}`);
        if (saved) {
          try {
            setCompletedModules(JSON.parse(saved));
          } catch (e) {
            setCompletedModules([]);
          }
        }
      }
    }
  }, [roadmap, progressData]);

  if (isLoading || !roadmap) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-28 pb-20 px-4 max-w-7xl mx-auto flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-gray-500">Loading learning roadmap...</p>
        </div>
      </div>
    );
  }

  const handleToggleCompleteModule = async (modId) => {
    let updated = [...completedModules];
    if (updated.includes(modId)) {
      updated = updated.filter((id) => id !== modId);
    } else {
      updated.push(modId);
    }

    setCompletedModules(updated);
    localStorage.setItem(`rm_prog_${roadmap._id}`, JSON.stringify(updated));

    if (user && roadmap._id) {
      try {
        await updateProgress({
          roadmapId: roadmap._id,
          completedModules: updated,
          lastAccessedModule: modId,
        }).unwrap();
      } catch (err) {
        // silent fallback to local storage
      }
    }

    // Check completion celebration
    if (updated.length >= roadmap.modules.length) {
      setShowCompletionModal(true);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Please login to bookmark roadmaps.");
      return;
    }
    try {
      const res = await toggleBookmark(roadmap._id).unwrap();
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    } catch (err) {
      toast.error("Failed to bookmark.");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Roadmap link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = Math.round(
    (completedModules.length / (roadmap.modules?.length || 1)) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-28 pb-20 px-4 sm:px-6 lg:px-8 space-y-8">
      <SEO title={`${roadmap.title} — Learning Roadmap`} description={roadmap.description} />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between text-xs font-bold text-gray-500">
          <Button
            onClick={() => navigate("/roadmaps")}
            variant="ghost"
            className="rounded-full text-xs hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={14} className="mr-1.5" /> Back to All Roadmaps
          </Button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full border transition-colors ${
                isBookmarked ? "bg-orange-500 text-white border-orange-500" : "bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-800 hover:border-orange-500"
              }`}
            >
              <Bookmark size={14} className={isBookmarked ? "fill-current" : ""} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-800 hover:border-orange-500 transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
            </button>
          </div>
        </div>

        {/* Hero Banner Header */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-8 sm:p-12 text-white border border-purple-500/20 shadow-2xl overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-3xl relative z-10">
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-500 text-white font-extrabold text-xs px-3.5 py-1 uppercase tracking-wider">
                {roadmap.category || "AI Basics"}
              </Badge>
              <Badge variant="outline" className="text-xs font-bold text-orange-400 border-orange-400/30">
                {roadmap.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs font-bold text-emerald-400 border-emerald-400/30">
                {roadmap.isFree ? "Free Access" : "Premium"}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {roadmap.title}
            </h1>
            {roadmap.titleNp && (
              <p className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-serif">
                {roadmap.titleNp}
              </p>
            )}

            <p className="text-sm text-gray-300 leading-relaxed pt-2">
              {roadmap.description}
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 max-w-lg space-y-2 border border-white/10 relative z-10">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Trophy size={16} className="text-yellow-400" /> Overall Progress
              </span>
              <span className="text-orange-400 font-black">{progressPercent}%</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-orange-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-400 text-right">
              {completedModules.length} of {roadmap.modules?.length || 0} modules completed
            </p>
          </div>
        </div>

        {/* Content Layout: Left Timeline, Right Skills & Outcomes */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Timeline (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="text-orange-500" /> Interactive Learning Timeline
              </h2>
              <span className="text-xs text-gray-400 font-bold">
                {roadmap.modules?.length} Sequential Steps
              </span>
            </div>

            <RoadmapTimeline
              modules={roadmap.modules}
              completedModules={completedModules}
              onToggleCompleteModule={handleToggleCompleteModule}
            />
          </div>

          {/* Sidebar Metadata (1 Column) */}
          <div className="space-y-6">
            {/* Skills You'll Learn */}
            {roadmap.skills?.length > 0 && (
              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="text-orange-500" /> Skills You'll Learn
                </h3>

                <div className="flex flex-wrap gap-2 pt-1">
                  {roadmap.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      className="bg-slate-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 font-bold rounded-xl"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Learning Outcomes */}
            {roadmap.learningOutcomes?.length > 0 && (
              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Target className="text-emerald-500" /> Learning Outcomes
                </h3>

                <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                  {roadmap.learningOutcomes.map((out, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Target Audience */}
            {roadmap.targetAudience?.length > 0 && (
              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Users className="text-blue-500" /> Target Audience
                </h3>

                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  {roadmap.targetAudience.map((aud, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <span>{aud}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Completion Celebration Modal */}
      <Dialog open={showCompletionModal} onOpenChange={setShowCompletionModal}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <Trophy size={40} className="animate-bounce" />
          </div>

          <div className="space-y-2">
            <Badge className="bg-emerald-500 text-white font-bold text-xs uppercase">
              Roadmap Completed!
            </Badge>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              Congratulations! 🎉
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              You've completed all modules in <strong>{roadmap.title}</strong>!
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-xs space-y-1 text-left">
            <div className="flex justify-between">
              <span className="text-gray-500">Modules Finished:</span>
              <span className="font-bold text-emerald-500">{roadmap.modules?.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Certificate Status:</span>
              <span className="font-bold text-orange-500">Coming Soon 📜</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Button
              onClick={() => navigate("/roadmaps")}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full text-xs py-3"
            >
              Explore Next Roadmap
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full rounded-full text-xs font-bold"
            >
              Share Achievement
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoadmapDetailPage;
