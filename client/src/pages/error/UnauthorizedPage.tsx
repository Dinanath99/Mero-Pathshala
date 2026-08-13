import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, LogIn, Home } from "lucide-react";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-slate-50 dark:bg-[#020817] px-4">
      <div className="max-w-lg w-full text-center bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
        <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <Lock size={48} />
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold text-red-500 tracking-tight">403</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h2>
          <p className="text-sm font-bold text-red-500 font-serif">पहुँच अस्वीकृत गरियो</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pt-2">
            You do not have permission to view this resource or perform this action. Please log in with authorized credentials.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-6 text-xs font-bold"
          >
            <Link to="/">
              <Home size={14} className="mr-2" /> Home
            </Link>
          </Button>
          <Button
            asChild
            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-6 text-xs"
          >
            <Link to="/login">
              <LogIn size={14} className="mr-2" /> Log In
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
