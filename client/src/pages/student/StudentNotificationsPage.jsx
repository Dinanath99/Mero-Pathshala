import React from "react";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} from "@/features/api/slxApi";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCircle2, Flame, BookOpen, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const StudentNotificationsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetNotificationsQuery();
  const [markRead] = useMarkNotificationReadMutation();

  const notifications = data?.notifications || [];

  const handleMarkRead = async (id) => {
    try {
      await markRead(id).unwrap();
      toast.success("Marked as read.");
    } catch (err) {
      toast.error("Failed to update notification.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-8 border border-purple-500/20 shadow-xl space-y-2">
        <Badge className="bg-orange-500 text-white text-xs font-bold">
          <Bell size={14} className="mr-1 inline" /> Notification Hub
        </Badge>
        <h1 className="text-3xl font-black">In-App Notifications</h1>
        <p className="text-sm text-gray-300">
          Stay updated with course announcements, streak reminders, new AI news, and platform updates.
        </p>
      </div>

      {/* Notifications List */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500 font-bold">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-gray-300 dark:border-slate-800 space-y-3">
          <Bell size={40} className="mx-auto text-gray-400" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">No notifications</h3>
          <p className="text-xs text-gray-500">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`p-5 rounded-3xl border transition-all flex items-start justify-between gap-4 ${
                n.read
                  ? "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 opacity-75"
                  : "bg-orange-500/5 border-orange-500/30 shadow-sm"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500 shrink-0 mt-0.5">
                  <Bell size={20} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] text-orange-500 border-orange-200">
                      {n.type}
                    </Badge>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{n.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{n.message}</p>
                  {n.link && (
                    <Button
                      onClick={() => navigate(n.link)}
                      variant="link"
                      className="text-xs text-orange-500 font-bold p-0 h-auto pt-1"
                    >
                      View Details →
                    </Button>
                  )}
                </div>
              </div>

              {!n.read && (
                <Button
                  onClick={() => handleMarkRead(n._id)}
                  size="sm"
                  variant="ghost"
                  className="text-xs text-emerald-600 font-bold shrink-0"
                >
                  <CheckCircle2 size={16} className="mr-1" /> Mark Read
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotificationsPage;
