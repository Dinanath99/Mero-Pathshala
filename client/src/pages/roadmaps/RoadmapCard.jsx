import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  BookOpen,
  Bookmark,
  Share2,
  Sparkles,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Check,
} from "lucide-react";
import { useToggleRoadmapBookmarkMutation } from "@/features/api/roadmapApi";
import { toast } from "sonner";

const RoadmapCard = ({ roadmap, isBookmarked: initialBookmarked = false, progress = 0 }) => {
  const navigate = useNavigate();
  const [toggleBookmark] = useToggleRoadmapBookmarkMutation();
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [copied, setCopied] = useState(false);

  const handleBookmark = async (e) => {
    e.stopPropagation();
    try {
      const res = await toggleBookmark(roadmap._id).unwrap();
      setBookmarked(res.isBookmarked);
      toast.success(res.message);
    } catch (err) {
      toast.error("Please login to bookmark roadmaps.");
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/roadmaps/${roadmap.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Roadmap link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const difficultyColors = {
    Beginner: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    Intermediate: "bg-orange-500/10 text-orange-500 border-orange-500/30",
    Advanced: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  };

  return (
    <Card
      onClick={() => navigate(`/roadmaps/${roadmap.slug}`)}
      className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-orange-500 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Cover Image Header */}
        <div className="h-48 overflow-hidden relative">
          <img
            src={roadmap.coverImage}
            alt={roadmap.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {roadmap.isFeatured && (
              <Badge className="bg-orange-500 text-white font-bold text-[10px] px-2.5 py-0.5">
                <Sparkles size={10} className="mr-1 inline" /> Featured
              </Badge>
            )}
            <Badge variant="outline" className={`text-[10px] font-bold ${difficultyColors[roadmap.difficulty] || "text-white"}`}>
              {roadmap.difficulty}
            </Badge>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                bookmarked ? "bg-orange-500 text-white" : "bg-slate-900/60 text-white hover:bg-orange-500"
              }`}
            >
              <Bookmark size={14} className={bookmarked ? "fill-current" : ""} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-slate-900/60 text-white hover:bg-orange-500 backdrop-blur-md transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
            </button>
          </div>

          {/* Price / Free Badge bottom right */}
          <Badge className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-[10px] font-bold">
            {roadmap.isFree ? "Free" : "Premium"}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-1">
              {roadmap.title}
            </h3>
            {roadmap.titleNp && (
              <p className="text-xs font-bold text-orange-500 font-serif line-clamp-1">
                {roadmap.titleNp}
              </p>
            )}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {roadmap.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-400 font-medium pt-1">
            <span className="flex items-center gap-1">
              <Clock size={12} /> {roadmap.estimatedDuration || "2 Hours"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <BookOpen size={12} /> {roadmap.modules?.length || 0} Modules
            </span>
          </div>

          {/* Progress Bar (if available) */}
          {progress > 0 && (
            <div className="pt-2 space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-gray-500">
                <span>Progress</span>
                <span className="text-orange-500">{progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-6 pt-0 border-t dark:border-slate-800 mt-2 flex items-center justify-between">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          {roadmap.category || "AI Basics"}
        </span>

        <Button
          size="sm"
          className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-5 text-xs shadow-sm"
        >
          {progress > 0 ? "Continue" : "Start Learning"} <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
    </Card>
  );
};

export default RoadmapCard;
