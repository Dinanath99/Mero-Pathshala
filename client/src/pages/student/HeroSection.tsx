import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetPersonalizedHomepageQuery,
  useLogHomepageAnalyticsMutation,
} from "@/features/api/homepageApi";
import GuestHomepage from "@/components/homepage/GuestHomepage";
import StudentHomepage from "@/components/homepage/StudentHomepage";
import InstructorHomepage from "@/components/homepage/InstructorHomepage";
import AdminHomepage from "@/components/homepage/AdminHomepage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetPersonalizedHomepageQuery(undefined);
  const [logAnalytics] = useLogHomepageAnalyticsMutation();

  // ChatBot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! I am your AI Guru Nepal Assistant. How can I guide your learning today?",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleLogClick = async (eventType: string, itemType: string, itemId: string) => {
    try {
      await logAnalytics({ eventType, itemType, itemId }).unwrap();
    } catch (err) {
      // Non-blocking analytics logging
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newMessages = [
      ...chatMessages,
      { sender: "user", text: userMessage },
    ];
    setChatMessages(newMessages);
    setUserMessage("");
    setIsChatLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/v1/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const chatData = await res.json();
      setChatMessages([
        ...newMessages,
        {
          sender: "bot",
          text:
            chatData.reply ||
            "I am here to help you learn AI tools, courses, and prompts!",
        },
      ]);
    } catch (err) {
      setChatMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "Explore our courses and prompt library to master AI tools in Nepal!",
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Render Skeleton Loader while loading homepage data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        <div className="grid sm:grid-cols-4 gap-6">
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
      </div>
    );
  }

  const role = data?.role || "guest";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 pt-24 pb-20">
      {/* Promotional Top Announcement Banner */}
      {data?.config?.promoBanner?.isActive && (
        <div
          className={`bg-gradient-to-r ${data.config.promoBanner.bgColor || "from-orange-500 to-pink-600"} text-white text-xs font-bold py-2.5 px-4 text-center mb-6 flex items-center justify-center gap-2`}
        >
          <span>{data.config.promoBanner.text}</span>
          {data.config.promoBanner.linkUrl && (
            <button
              onClick={() => navigate(data.config.promoBanner.linkUrl)}
              className="underline font-black hover:opacity-90 ml-1"
            >
              {data.config.promoBanner.linkText || "Learn More"} →
            </button>
          )}
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {role === "student" && (
          <StudentHomepage data={data} onLogClick={handleLogClick} />
        )}
        {role === "instructor" && (
          <InstructorHomepage data={data} onLogClick={handleLogClick} />
        )}
        {role === "admin" && (
          <AdminHomepage data={data} onLogClick={handleLogClick} />
        )}
        {role === "guest" && (
          <GuestHomepage data={data} onLogClick={handleLogClick} />
        )}
      </main>

      {/* ChatBot Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => setIsChatOpen(true)}
          className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-full p-4 shadow-xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* ChatBot Dialog */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 border dark:border-slate-800">
          <DialogHeader className="flex justify-between items-center pb-2 border-b dark:border-slate-800">
            <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="text-orange-500" /> AI Guru Assistant
            </DialogTitle>
          </DialogHeader>

          <div
            ref={chatContainerRef}
            className="max-h-80 overflow-y-auto space-y-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border dark:border-slate-800 text-xs"
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl font-medium leading-relaxed ${
                    message.sender === "user"
                      ? "bg-orange-500 text-white"
                      : "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 shadow-sm border dark:border-slate-700"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="max-w-xs p-3 rounded-2xl bg-white dark:bg-slate-800 text-gray-400 text-xs animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleChatSubmit} className="mt-3 flex gap-2">
            <Input
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask anything about AI tools, courses..."
              className="flex-grow rounded-full text-xs"
              disabled={isChatLoading}
            />
            <Button
              type="submit"
              disabled={isChatLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroSection;
