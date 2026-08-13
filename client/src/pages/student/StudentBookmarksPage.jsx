import React, { useState } from "react";
import { useGetBookmarksQuery, useRemoveBookmarkMutation } from "@/features/api/slxApi";
import { useNavigate } from "react-router-dom";
import {
  Bookmark as BookmarkIcon,
  Trash2,
  ExternalLink,
  BookOpen,
  Wrench,
  Sparkles,
  Newspaper,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const StudentBookmarksPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookmarksQuery();
  const [removeBookmark] = useRemoveBookmarkMutation();
  const [filterType, setFilterType] = useState("All");

  const bookmarks = data?.bookmarks || [];

  const handleRemove = async (id) => {
    try {
      await removeBookmark(id).unwrap();
      toast.success("Bookmark removed.");
    } catch (err) {
      toast.error("Failed to remove bookmark.");
    }
  };

  const getItemIcon = (type) => {
    switch (type) {
      case "Course":
        return BookOpen;
      case "Tool":
        return Wrench;
      case "Prompt":
        return Sparkles;
      case "Blog":
        return FileText;
      case "News":
        return Newspaper;
      default:
        return BookmarkIcon;
    }
  };

  const filteredBookmarks = bookmarks.filter((b) => filterType === "All" || b.itemType === filterType);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-8 border border-purple-500/20 shadow-xl space-y-2">
        <Badge className="bg-orange-500 text-white text-xs font-bold">
          <BookmarkIcon size={14} className="mr-1 inline" /> Saved Resources
        </Badge>
        <h1 className="text-3xl font-black">My Saved Bookmarks</h1>
        <p className="text-sm text-gray-300">
          Access all your bookmarked courses, AI tools, prompt templates, blogs, and news articles in one location.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {["All", "Course", "Tool", "Prompt", "Blog", "News"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterType === type
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                : "bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-800"
            }`}
          >
            {type}s
          </button>
        ))}
      </div>

      {/* Bookmarks Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500 font-bold">Loading your bookmarks...</div>
      ) : filteredBookmarks.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-gray-300 dark:border-slate-800 space-y-3">
          <BookmarkIcon size={40} className="mx-auto text-gray-400" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">No bookmarks saved yet</h3>
          <p className="text-xs text-gray-500">
            Bookmark items while browsing courses, tools, or prompts to save them here.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookmarks.map((item) => {
            const Icon = getItemIcon(item.itemType);
            return (
              <div
                key={item._id}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] text-orange-500 border-orange-200 flex items-center gap-1">
                      <Icon size={12} /> {item.itemType}
                    </Badge>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1">{item.title}</h3>
                  {item.subtitle && <p className="text-xs text-gray-500 line-clamp-2">{item.subtitle}</p>}
                </div>

                <Button
                  onClick={() => navigate(item.link)}
                  className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white text-gray-900 dark:text-white font-bold rounded-full text-xs transition-colors py-4 flex items-center justify-center gap-2"
                >
                  Open Resource <ExternalLink size={14} />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentBookmarksPage;
