import React from "react";
import { useGetUserRoadmapBookmarksQuery } from "@/features/api/roadmapApi";
import RoadmapCard from "./RoadmapCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import EmptyState from "@/components/EmptyState";
import { RoadmapSkeleton } from "@/components/skeletons/SkeletonLoaders";

const MyRoadmapsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserRoadmapBookmarksQuery();
  const roadmaps = data?.roadmaps || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-28 pb-20 px-4 sm:px-6 lg:px-8 space-y-8">
      <SEO title="My Saved Roadmaps — AI Guru Nepal" />

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Badge className="bg-orange-500 text-white font-extrabold text-xs px-3 py-1 uppercase">
              My Saved Journeys
            </Badge>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              My Bookmarked Roadmaps
            </h1>
          </div>

          <Button
            onClick={() => navigate("/roadmaps")}
            variant="outline"
            className="rounded-full text-xs font-bold"
          >
            <ArrowLeft size={14} className="mr-1.5" /> Explore All Roadmaps
          </Button>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <RoadmapSkeleton key={n} />
            ))}
          </div>
        ) : roadmaps.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((rm) => (
              <RoadmapCard key={rm._id} roadmap={rm} isBookmarked={true} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Saved Roadmaps"
            description="You haven't bookmarked any learning roadmaps yet. Browse our roadmaps directory to save your favorite learning paths."
            actionText="Browse Roadmaps"
            onAction={() => navigate("/roadmaps")}
          />
        )}
      </div>
    </div>
  );
};

export default MyRoadmapsPage;
