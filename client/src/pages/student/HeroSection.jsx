import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  Laptop,
  Search,
  Send,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Star,
  Users,
  Award,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Courses from "./Courses";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "Namaste! I'm your MeroPathshala AI Learning Assistant. Ask me anything about course roadmaps or technical skills!",
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth || {});

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isChatLoading]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/course/search?query=${encodeURIComponent(searchQuery.trim())}`,
      );
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim() || isChatLoading) return;

    const currentMsg = userMessage.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: currentMsg }]);
    setUserMessage("");
    setIsChatLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentMsg }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setChatMessages((prev) => [
          ...prev,
          { sender: "ai", text: data.reply },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text:
              data.message || "Sorry, I ran into an error. Please try again.",
          },
        ]);
      }
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Network error connecting to AI service. Please make sure server is running.",
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION 1: JODNE HERO (Reference Screenshot 1) */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.05]">
              Find courses. <br />
              Learn skills. <br />
              <span className="text-[#FF5533]">Connect directly.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl font-normal">
              MeroPathshala is where students and top instructors meet — browse
              by tech stack, get{" "}
              <span className="text-[#FF5533] font-bold">smart-matched</span> to
              the right fit, and learn directly. No middlemen. No hidden fees.
            </p>

            {/* Dual Jodne Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                onClick={() => navigate("/course/search")}
                className="jodne-btn-primary px-8 py-4 text-base"
              >
                <span>I'm a student</span>
                <ChevronRight size={18} />
              </Button>
              <Button
                onClick={() =>
                  navigate(
                    user?.role === "instructor" ? "/admin/dashboard" : "/login",
                  )
                }
                className="jodne-btn-secondary px-8 py-4 text-base"
              >
                <span>I'm an instructor</span>
              </Button>
            </div>

            {/* Enrolled Learners Avatar Stack */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex -space-x-2 overflow-hidden">
                <Avatar className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
                  <AvatarFallback className="bg-[#FF5533] text-white text-xs font-bold">
                    A
                  </AvatarFallback>
                </Avatar>
                <Avatar className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" />
                  <AvatarFallback className="bg-slate-800 text-white text-xs font-bold">
                    B
                  </AvatarFallback>
                </Avatar>
                <Avatar className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" />
                  <AvatarFallback className="bg-slate-700 text-white text-xs font-bold">
                    C
                  </AvatarFallback>
                </Avatar>
                <Avatar className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900">
                  <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" />
                  <AvatarFallback className="bg-[#FF5533] text-white text-xs font-bold">
                    D
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-white font-bold">
                  123+ courses
                </strong>{" "}
                across 15 tech stacks ready for you today
              </div>
            </div>
          </div>

          {/* Right Floating Jodne Glass Mockup (Screenshot 1) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto bg-white dark:bg-[#14171F] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-2xl">
              {/* Floating Rating Pill Badge Top Right */}
              <div className="absolute -top-4 -right-2 z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-2.5 px-3.5 shadow-lg flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                  <Star size={14} className="fill-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white leading-none">
                    4.9 / 5
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">
                    Course Rating
                  </div>
                </div>
              </div>

              {/* Search Bar inside Mockup */}
              <form
                onSubmit={searchHandler}
                className="flex items-center gap-2 mb-4"
              >
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-3 text-slate-400"
                  />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses, instructors..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-xs focus-visible:ring-1 focus-visible:ring-[#FF5533]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#111318] text-white p-2.5 rounded-xl hover:bg-slate-800 transition"
                >
                  <SlidersHorizontal size={15} />
                </button>
              </form>

              {/* Filter Pills Row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar text-xs">
                <span className="jodne-pill-active cursor-pointer">All</span>
                <span className="jodne-pill-inactive cursor-pointer">
                  Development
                </span>
                <span className="jodne-pill-inactive cursor-pointer">
                  Data Science
                </span>
                <span className="jodne-pill-inactive cursor-pointer">
                  DevOps
                </span>
              </div>

              {/* Smart Match Banner Pill */}
              <div className="my-3 p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center gap-2">
                <Sparkles size={14} className="text-purple-600" />
                <span>Smart match · 40 verified courses fit your goal</span>
              </div>

              {/* Bottom Floating 0% Fee Pill */}
              <div className="mt-4 p-2.5 rounded-2xl bg-orange-50/80 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900 flex items-center gap-2 text-xs">
                <div className="w-6 h-6 rounded-lg bg-[#FF5533] text-white flex items-center justify-center font-bold text-[10px]">
                  0%
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 dark:text-white">
                    0% Platform Fee
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Students & instructors keep 100% value
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: DUAL CARDS FOR STUDENTS & INSTRUCTORS (Reference Screenshot 3) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Dark Card - FOR STUDENTS */}
          <div className="jodne-dark-card flex flex-col justify-between min-h-[480px]">
            <div className="space-y-6">
              <span className="text-xs font-extrabold tracking-widest text-[#FF5533] uppercase">
                FOR STUDENTS
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Find authentic courses that truly elevate your career
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Search courses by stack, level, and outcome. Read verified
                ratings from past learners. Enroll instantly. That's it.
              </p>

              <ul className="space-y-4 pt-2 text-xs font-semibold text-slate-300">
                <li className="flex items-center gap-3">
                  <Search size={16} className="text-[#FF5533]" />
                  <span>Search 100+ verified Nepali & Global tech courses</span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen size={16} className="text-[#FF5533]" />
                  <span>Unlimited lecture previews before enrolling</span>
                </li>
                <li className="flex items-center gap-3">
                  <Bot size={16} className="text-[#FF5533]" />
                  <span>Direct AI assistance — no rep, no wait time</span>
                </li>
                <li className="flex items-center gap-3">
                  <Star size={16} className="text-[#FF5533]" />
                  <span>Honest ratings & course progress badges</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Button
                onClick={() => navigate("/course/search")}
                className="bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-full px-8 py-3.5 text-sm shadow-md"
              >
                <span>Explore for students</span>
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>

          {/* Right Light Card - FOR INSTRUCTORS */}
          <div className="bg-white dark:bg-[#14171F] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col justify-between min-h-[480px]">
            <div className="space-y-6">
              <span className="text-xs font-extrabold tracking-widest text-[#FF5533] uppercase">
                FOR INSTRUCTORS
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white leading-tight">
                Get discovered by eager students across Nepal
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Build your studio profile once. Eager students find your
                content. Publish courses on your terms, host lectures, and earn
                directly.
              </p>

              <ul className="space-y-4 pt-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#FF5533]" />
                  <span>Free hosting forever — 0% platform commission</span>
                </li>
                <li className="flex items-center gap-3">
                  <Send size={16} className="text-[#FF5533]" />
                  <span>
                    Upload lectures directly with Cloudinary integration
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Award size={16} className="text-[#FF5533]" />
                  <span>Build an instructor portfolio students trust</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users size={16} className="text-[#FF5533]" />
                  <span>
                    Direct student questions & ratings compound over time
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Button
                onClick={() =>
                  navigate(
                    user?.role === "instructor" ? "/admin/dashboard" : "/login",
                  )
                }
                className="jodne-btn-primary px-8 py-3.5 text-sm"
              >
                <span>Create instructor profile</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: COURSE CATALOG GRID */}
      {/* ------------------------------------------------------------- */}
      <Courses />

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: READY BANNER CALLOUT (Reference Screenshot 4) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="jodne-dark-card p-12 sm:p-16 text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to make your next learning breakthrough?
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Join thousands of students and instructors connecting directly on
            MeroPathshala — free to start, no middlemen, no hidden fees.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => navigate("/course/search")}
              className="jodne-btn-primary px-8 py-4 text-sm"
            >
              <span>Get started free</span>
              <ChevronRight size={16} />
            </Button>
            <Button
              onClick={() => navigate("/login")}
              className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white rounded-full px-8 py-4 text-sm font-semibold"
            >
              <span>I'm an instructor</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Floating AI Launcher Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => setIsChatOpen(true)}
          className="w-14 h-14 bg-[#FF5533] hover:bg-[#E64626] text-white rounded-full shadow-2xl flex items-center justify-center p-0 transition-transform hover:scale-105"
        >
          <Bot size={26} />
        </Button>
      </motion.div>

      {/* AI Assistant Modal */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-[#14171F] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6">
          <DialogHeader className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
            <DialogTitle className="flex items-center gap-2 text-base font-black">
              <div className="w-7 h-7 rounded-full bg-[#FF5533] text-white flex items-center justify-center">
                <Bot size={16} />
              </div>
              <span>MeroPathshala AI Assistant</span>
            </DialogTitle>
          </DialogHeader>

          <div
            ref={chatContainerRef}
            className="max-h-80 min-h-64 overflow-y-auto space-y-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl my-3 text-xs"
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-[#FF5533] text-white rounded-br-none font-medium"
                      : "bg-white dark:bg-[#181B24] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-bl-none shadow-sm font-normal"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <Input
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask anything about courses or code..."
              disabled={isChatLoading}
              className="flex-1 bg-slate-100 dark:bg-slate-900 border-none text-xs rounded-full py-2.5 px-4 focus:ring-1 focus:ring-[#FF5533]"
            />
            <Button
              type="submit"
              disabled={isChatLoading}
              className="bg-[#FF5533] hover:bg-[#E64626] text-white rounded-full px-4 py-2"
            >
              <Send size={16} />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroSection;
