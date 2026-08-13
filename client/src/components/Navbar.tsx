import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import DarkMode from "@/DarkMode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sparkles,
  BookOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  Search,
  ChevronDown,
  FileText,
  Compass,
  Wrench,
  Newspaper,
  Laptop,
  GraduationCap,
  Layers,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Navbar: React.FC = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const logoutHandler = async () => {
    await logoutUser();
  };

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMobileOpen(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out successfully.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  const isActiveRoute = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="h-16 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800/80 fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6 shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-sm shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Sparkles size={18} />
            </div>
            <div className="leading-none">
              <span className="font-extrabold text-lg sm:text-xl text-gray-900 dark:text-white tracking-tight group-hover:text-orange-500 transition-colors">
                AI Guru Nepal
              </span>
              <span className="hidden sm:block text-[10px] font-bold text-gray-400 font-nepali">
                नेपालकै AI सिकाइ
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          
          {/* Learn Mega Dropdown */}
          <div className="relative group py-4">
            <button
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                isActiveRoute("/learn")
                  ? "text-orange-600 dark:text-orange-400 bg-orange-500/10"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-slate-900"
              }`}
            >
              <span>Learn</span>
              <ChevronDown
                size={13}
                className="group-hover:rotate-180 transition-transform duration-200"
              />
            </button>

            {/* Hover bridge */}
            <div className="absolute top-full left-0 w-full h-2"></div>

            {/* Dropdown Content */}
            <div className="absolute top-full left-0 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 ease-out bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xl rounded-2xl p-2 z-50">
              <Link
                to="/learn/computer-skills"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800/80 transition-colors group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <Laptop size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-orange-600">
                    Computer Skills
                  </div>
                  <div className="text-[11px] text-gray-500 font-nepali">
                    कम्प्युटरका आधारभूत सीप
                  </div>
                </div>
              </Link>

              <Link
                to="/learn/ai-basics"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800/80 transition-colors group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-amber-600">
                    AI Basics & ChatGPT
                  </div>
                  <div className="text-[11px] text-gray-500 font-nepali">
                    कृत्रिम बौद्धिकताको आधार
                  </div>
                </div>
              </Link>

              <Link
                to="/roadmaps"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800/80 transition-colors group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Compass size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-blue-600">
                    Learning Roadmaps
                  </div>
                  <div className="text-[11px] text-gray-500 font-nepali">
                    सिकाइ मार्गचित्र
                  </div>
                </div>
              </Link>

              <Link
                to="/free-tutorials"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800/80 transition-colors group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <BookOpen size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white group-hover/item:text-emerald-600">
                    Free Tutorials
                  </div>
                  <div className="text-[11px] text-gray-500 font-nepali">
                    नि:शुल्क पाठहरू
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Roadmaps */}
          <Link
            to="/roadmaps"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              isActiveRoute("/roadmaps")
                ? "text-orange-600 dark:text-orange-400 bg-orange-500/10"
                : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-slate-900"
            }`}
          >
            Roadmaps
          </Link>

          {/* AI Tools */}
          <Link
            to="/ai-tools"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              isActiveRoute("/ai-tools")
                ? "text-orange-600 dark:text-orange-400 bg-orange-500/10"
                : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-slate-900"
            }`}
          >
            AI Tools
          </Link>

          {/* Prompts */}
          <Link
            to="/prompt-library"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              isActiveRoute("/prompt-library") || isActiveRoute("/prompts")
                ? "text-orange-600 dark:text-orange-400 bg-orange-500/10"
                : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-slate-900"
            }`}
          >
            Prompts
          </Link>

          {/* AI News */}
          <Link
            to="/news"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              isActiveRoute("/news")
                ? "text-orange-600 dark:text-orange-400 bg-orange-500/10"
                : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-slate-900"
            }`}
          >
            News
          </Link>

          {/* Blogs */}
          <Link
            to="/blogs"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              isActiveRoute("/blogs") || isActiveRoute("/blog")
                ? "text-orange-600 dark:text-orange-400 bg-orange-500/10"
                : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-slate-900"
            }`}
          >
            Blog
          </Link>

          {/* CV Builder */}
          <Link
            to="/cv-builder"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 ${
              isActiveRoute("/cv-builder") || isActiveRoute("/my-cvs")
                ? "text-orange-600 dark:text-orange-400 bg-orange-500/10"
                : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-slate-900"
            }`}
          >
            <span>CV Builder</span>
            <span className="text-[10px] bg-orange-500/20 text-orange-600 dark:text-orange-400 px-1.5 py-0.2 rounded font-black uppercase">
              Free
            </span>
          </Link>

          {/* Courses */}
          <Link
            to="/course/search"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              isActiveRoute("/course")
                ? "text-orange-600 dark:text-orange-400 bg-orange-500/10"
                : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-slate-900"
            }`}
          >
            Courses
          </Link>
        </nav>

        {/* Right: Quick Search + Dark Mode + Auth */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Quick Search Box (Desktop) */}
          <form onSubmit={searchHandler} className="hidden xl:flex relative w-48 2xl:w-60">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-orange-500/40 rounded-full py-1.5 pl-3.5 pr-8 text-xs text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Search size={14} />
            </button>
          </form>

          {/* Dark Mode Toggle */}
          <DarkMode />

          {/* User Auth Buttons / Profile Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-orange-500/40 hover:border-orange-500 transition-all shadow-xs h-8 w-8">
                  <AvatarImage
                    src={user?.photoUrl || "https://avatar.iran.liara.run/public/boy"}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="text-xs font-bold bg-orange-500 text-white">
                    {user?.name?.slice(0, 2).toUpperCase() || "AI"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 p-1.5">
                <div className="px-3 py-2.5 border-b border-gray-100 dark:border-slate-800 mb-1">
                  <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>

                <DropdownMenuGroup className="space-y-0.5">
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer rounded-xl text-xs font-semibold hover:bg-orange-50 dark:hover:bg-slate-800"
                  >
                    <Link to="/my-learning" className="flex items-center gap-2 px-2.5 py-2">
                      <BookOpen size={14} className="text-orange-500" />
                      <span>My Learning</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer rounded-xl text-xs font-semibold hover:bg-orange-50 dark:hover:bg-slate-800"
                  >
                    <Link to="/my-cvs" className="flex items-center gap-2 px-2.5 py-2">
                      <FileText size={14} className="text-amber-500" />
                      <span>My Resumes / CVs</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer rounded-xl text-xs font-semibold hover:bg-orange-50 dark:hover:bg-slate-800"
                  >
                    <Link to="/profile" className="flex items-center gap-2 px-2.5 py-2">
                      <User size={14} className="text-blue-500" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  {(user?.role === "instructor" || user?.role === "admin") && (
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-xl text-xs font-semibold hover:bg-orange-50 dark:hover:bg-slate-800"
                    >
                      <Link to="/admin/dashboard" className="flex items-center gap-2 px-2.5 py-2">
                        <LayoutDashboard size={14} className="text-purple-500" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="cursor-pointer rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 px-2.5 py-2 flex items-center gap-2"
                >
                  <LogOut size={14} />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="text-xs font-bold hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-slate-900 rounded-xl px-3 py-1.5 h-8"
              >
                Log In
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="text-xs font-bold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl px-3.5 py-1.5 h-8 shadow-xs shadow-orange-500/20"
              >
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile Sheet Trigger Button */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-8 w-8 rounded-xl text-gray-700 dark:text-gray-300"
              >
                <Menu size={20} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80 bg-white dark:bg-slate-950 p-6 flex flex-col justify-between border-l border-gray-200 dark:border-slate-800">
              <div className="space-y-6">
                <SheetHeader className="text-left pb-2 border-b border-gray-100 dark:border-slate-800">
                  <SheetTitle className="text-base font-black flex items-center gap-2 text-gray-900 dark:text-white">
                    <Sparkles className="text-orange-500" size={18} />
                    <span>AI Guru Nepal</span>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Search */}
                <form onSubmit={searchHandler} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses, tools, prompts..."
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-transparent rounded-xl py-2 pl-3.5 pr-8 text-xs text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <Search size={14} />
                  </button>
                </form>

                {/* Mobile Navigation Categories */}
                <div className="space-y-4 text-xs font-bold overflow-y-auto max-h-[60vh] pr-1">
                  
                  {/* Category: Learn */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">
                      Curricula & Modules
                    </span>
                    <Link
                      to="/learn/computer-skills"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-900"
                    >
                      <Laptop size={15} className="text-orange-500" />
                      <span>Computer Skills (कम्प्युटर सीप)</span>
                    </Link>
                    <Link
                      to="/learn/ai-basics"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-900"
                    >
                      <Sparkles size={15} className="text-amber-500" />
                      <span>AI Basics & ChatGPT</span>
                    </Link>
                    <Link
                      to="/roadmaps"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-900"
                    >
                      <Compass size={15} className="text-blue-500" />
                      <span>Learning Roadmaps</span>
                    </Link>
                  </div>

                  {/* Category: Discovery & Tools */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">
                      Ecosystem & Tools
                    </span>
                    <Link
                      to="/ai-tools"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-900"
                    >
                      <Wrench size={15} className="text-purple-500" />
                      <span>AI Tools Directory</span>
                    </Link>
                    <Link
                      to="/prompt-library"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-900"
                    >
                      <Sparkles size={15} className="text-pink-500" />
                      <span>Prompt Library</span>
                    </Link>
                    <Link
                      to="/news"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-900"
                    >
                      <Newspaper size={15} className="text-red-500" />
                      <span>AI News Hub</span>
                    </Link>
                    <Link
                      to="/blogs"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-900"
                    >
                      <FileText size={15} className="text-indigo-500" />
                      <span>Insights & Blogs</span>
                    </Link>
                  </div>

                  {/* Category: Career & Courses */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">
                      Career & Learning
                    </span>
                    <Link
                      to="/cv-builder"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-900 font-bold"
                    >
                      <span className="flex items-center gap-2.5">
                        <FileText size={15} className="text-orange-500" />
                        <span>AI CV Builder</span>
                      </span>
                      <span className="text-[9px] bg-orange-500/20 text-orange-600 px-1.5 py-0.5 rounded font-black uppercase">
                        Free
                      </span>
                    </Link>
                    <Link
                      to="/course/search"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-900"
                    >
                      <BookOpen size={15} className="text-emerald-500" />
                      <span>All Courses</span>
                    </Link>
                    <Link
                      to="/become-an-instructor"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-900"
                    >
                      <GraduationCap size={15} className="text-amber-500" />
                      <span>Become an Instructor</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Auth Bottom Bar */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-900 rounded-xl">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={user?.photoUrl} />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="truncate text-xs">
                        <p className="font-bold text-gray-900 dark:text-white truncate">{user?.name}</p>
                        <p className="text-gray-400 truncate">{user?.email}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setIsMobileOpen(false);
                        logoutHandler();
                      }}
                      variant="outline"
                      className="w-full text-xs font-bold text-red-600 border-red-200 dark:border-red-900/50 rounded-xl"
                    >
                      <LogOut size={14} className="mr-2" /> Log Out
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => {
                        setIsMobileOpen(false);
                        navigate("/login");
                      }}
                      variant="outline"
                      className="text-xs font-bold rounded-xl"
                    >
                      Log In
                    </Button>
                    <Button
                      onClick={() => {
                        setIsMobileOpen(false);
                        navigate("/signup");
                      }}
                      className="text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-xs"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
