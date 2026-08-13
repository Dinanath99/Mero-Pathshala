import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, AlertCircle, Laptop, Sparkles, Compass, Wrench } from "lucide-react";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="max-w-lg w-full text-center bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
        <div className="w-16 h-16 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle size={36} />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-black text-orange-600 dark:text-orange-500 tracking-tight block">404</span>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Page Not Found</h1>
          <p className="text-sm font-bold text-orange-600 dark:text-orange-400 font-nepali">पहुँच नभएको वा नभेटिएको पाना</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pt-1">
            The page you are looking for might have been moved or does not exist. Explore our open learning modules instead.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="grid grid-cols-2 gap-2 text-left pt-2">
          <Link
            to="/learn/computer-skills"
            className="p-3 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Laptop size={15} className="text-orange-500" />
            <span>Computer Skills</span>
          </Link>
          <Link
            to="/learn/ai-basics"
            className="p-3 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Sparkles size={15} className="text-amber-500" />
            <span>AI Basics</span>
          </Link>
          <Link
            to="/roadmaps"
            className="p-3 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Compass size={15} className="text-blue-500" />
            <span>Roadmaps</span>
          </Link>
          <Link
            to="/ai-tools"
            className="p-3 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Wrench size={15} className="text-purple-500" />
            <span>AI Tools</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="rounded-xl px-5 text-xs font-bold border-gray-300 dark:border-slate-800"
          >
            <ArrowLeft size={14} className="mr-1.5" /> Go Back
          </Button>
          <Button
            asChild
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl px-5 text-xs shadow-xs"
          >
            <Link to="/">
              <Home size={14} className="mr-1.5" /> Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
