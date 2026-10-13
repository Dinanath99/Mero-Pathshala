
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import DarkMode from "@/DarkMode";
import {
  BookOpen,
  Compass,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Sparkles,
  User,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth || {});
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Successfully logged out.");
      navigate("/login");
    }
  }, [isSuccess, navigate, data]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/course/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="h-16 fixed top-0 left-0 right-0 z-50 glass-navbar">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center h-full px-6">
        {/* Jodne-style Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-[#111318] text-white flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
            M
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5">
            MeroPathshala<span className="w-2 h-2 rounded-full bg-[#FF5533] inline-block ml-0.5" />
          </span>
        </Link>

        {/* Center Jodne Navigation Links */}
        <div className="flex items-center gap-6 text-xs lg:text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Link to="/course/search" className="hover:text-[#FF5533] dark:hover:text-[#FF5533] transition-colors">
            Browse Courses
          </Link>
          <Link to="/course/search?query=Web" className="hover:text-[#FF5533] dark:hover:text-[#FF5533] transition-colors">
            Opportunities
          </Link>
          <Link to="/course/search?query=AI" className="hover:text-[#FF5533] dark:hover:text-[#FF5533] transition-colors">
            Instructor Jobs
          </Link>
          {user && (
            <Link to="/my-learning" className="hover:text-[#FF5533] dark:hover:text-[#FF5533] transition-colors">
              My Learning
            </Link>
          )}
          {user?.role === "instructor" && (
            <Link to="/admin/dashboard" className="text-[#FF5533] font-bold hover:underline">
              Instructor Studio
            </Link>
          )}
        </div>

        {/* Right Action & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Search Trigger */}
          <form onSubmit={handleSearchSubmit} className="relative hidden lg:block w-48">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-900 border-none rounded-full text-xs focus:ring-1 focus:ring-[#FF5533]"
            />
            <Search size={14} className="absolute left-2.5 top-2 text-slate-400" />
          </form>

          <DarkMode />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#FF5533]/40 transition-all focus:outline-none">
                  <Avatar className="w-9 h-9 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <AvatarImage
                      src={user?.photoUrl || "https://avatar.iran.liara.run/public/boy"}
                      alt={user?.name || "User Avatar"}
                    />
                    <AvatarFallback className="bg-[#FF5533] text-white text-xs font-bold">
                      {user?.name ? user.name.slice(0, 2).toUpperCase() : "MP"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64 mt-2 bg-card border-border/80 rounded-2xl shadow-xl p-1.5">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-foreground">{user?.name || "Student"}</span>
                    <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                    <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF5533]/10 text-[#FF5533] w-max capitalize">
                      {user?.role || "Student"}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  {user?.role === "student" && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm font-medium rounded-xl hover:bg-accent">
                        <LayoutDashboard size={16} className="text-[#FF5533]" />
                        <span>Student Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/my-learning" className="flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm font-medium rounded-xl hover:bg-accent">
                      <BookOpen size={16} className="text-[#FF5533]" />
                      <span>My Learning</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm font-medium rounded-xl hover:bg-accent">
                      <User size={16} className="text-slate-500" />
                      <span>My Profile & Settings</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard" className="flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm font-medium rounded-xl hover:bg-accent">
                        <Sparkles size={16} className="text-amber-500" />
                        <span>Instructor Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm font-medium text-destructive hover:bg-destructive/10 rounded-xl"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full px-4 py-2"
              >
                Log In
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="jodne-btn-primary text-xs py-2 px-5"
              >
                <span>Get started</span>
                <ChevronRight size={14} />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to="/" className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-full bg-[#111318] text-white flex items-center justify-center font-bold text-xs">
            M
          </div>
          <span className="font-extrabold text-base text-slate-900 dark:text-white flex items-center">
            MeroPathshala<span className="w-1.5 h-1.5 rounded-full bg-[#FF5533] inline-block ml-0.5" />
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <DarkMode />
          <MobileNavbar user={user} logoutHandler={logoutHandler} />
        </div>
      </div>


    </header>
  );
};

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-xl border-slate-200 dark:border-slate-800">
          <Menu size={20} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col bg-card text-card-foreground border-l border-border p-6 w-80 sm:w-96">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <GraduationCap size={18} />
            </div>
            <span className="font-bold text-lg">MeroPathshala</span>
          </SheetTitle>
        </SheetHeader>

        <Separator className="my-4" />

        <nav className="flex flex-col gap-2 flex-1">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl font-medium hover:bg-accent text-sm"
          >
            <span className="flex items-center gap-3"><Compass size={18} className="text-blue-500" /> Explore Courses</span>
            <ChevronRight size={16} className="text-slate-400" />
          </Link>

          {user && (
            <>
              <Link
                to="/my-learning"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-medium hover:bg-accent text-sm"
              >
                <span className="flex items-center gap-3"><BookOpen size={18} className="text-indigo-500" /> My Learning</span>
                <ChevronRight size={16} className="text-slate-400" />
              </Link>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-medium hover:bg-accent text-sm"
              >
                <span className="flex items-center gap-3"><User size={18} className="text-slate-500" /> My Profile</span>
                <ChevronRight size={16} className="text-slate-400" />
              </Link>
            </>
          )}

          {user?.role === "instructor" && (
            <Link
              to="/admin/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-sm my-1"
            >
              <span className="flex items-center gap-3"><LayoutDashboard size={18} /> Instructor Studio</span>
              <ChevronRight size={16} />
            </Link>
          )}
        </nav>

        <div className="pt-4 border-t border-border">
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-2 bg-muted rounded-xl">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user?.photoUrl || "https://avatar.iran.liara.run/public/boy"} />
                  <AvatarFallback className="bg-blue-600 text-white font-bold">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : "MP"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold text-sm truncate">{user?.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={() => {
                  setOpen(false);
                  logoutHandler();
                }}
                className="w-full justify-center gap-2 rounded-xl"
              >
                <LogOut size={16} /> Log Out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="w-full rounded-xl"
              >
                Log In
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;

