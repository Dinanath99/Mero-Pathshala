import React from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircle, Clock, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ContinueLearningItem {
  courseId: string;
  courseTitle: string;
  courseThumbnail?: string;
  category?: string;
  lastLectureTitle?: string;
  progressPercent: number;
  estimatedTimeRemaining?: string;
}

interface ContinueLearningCardProps {
  item: ContinueLearningItem | null;
  onResumeClick?: (courseId: string) => void;
}

const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({ item, onResumeClick }) => {
  const navigate = useNavigate();

  if (!item) return null;

  const handleResume = () => {
    if (onResumeClick) onResumeClick(item.courseId);
    navigate(`/course-progress/${item.courseId}`);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-purple-500/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <img
            src={item.courseThumbnail || "https://via.placeholder.com/150"}
            alt={item.courseTitle}
            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-2 border-orange-500/50 shadow-md shrink-0"
          />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-500 text-white text-[10px] uppercase font-bold">
                <BookOpen size={12} className="mr-1 inline" /> Continue Learning
              </Badge>
              <span className="text-xs text-gray-300 font-semibold">{item.category || "AI Module"}</span>
            </div>

            <h3 className="text-xl md:text-2xl font-black text-white">{item.courseTitle}</h3>

            <p className="text-xs text-gray-300 flex items-center gap-2">
              <span>Next Lesson:</span>
              <strong className="text-orange-400">{item.lastLectureTitle}</strong>
            </p>

            {/* Progress Bar */}
            <div className="flex items-center gap-3 pt-1">
              <div className="w-48 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-orange-500 to-pink-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-emerald-400">{item.progressPercent}% Completed</span>
            </div>
          </div>
        </div>

        {/* Resume Action Box */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="text-right hidden lg:block">
            <p className="text-[11px] text-gray-400">Est. Time Remaining</p>
            <p className="text-xs font-bold text-gray-200 flex items-center gap-1">
              <Clock size={14} className="text-orange-400" /> {item.estimatedTimeRemaining || "15 mins"}
            </p>
          </div>

          <Button
            onClick={handleResume}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold rounded-full px-7 py-6 text-sm shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-2"
          >
            <PlayCircle size={20} /> Resume Lesson <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearningCard;
