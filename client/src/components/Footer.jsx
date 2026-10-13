import React from "react";
import { Link } from "react-router-dom";
import { Github, Instagram, Youtube, Linkedin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0B0C0E] text-slate-400 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          {/* Jodne-style Brand & Tagline */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-full bg-[#FF5533] text-white flex items-center justify-center font-black text-sm shadow-md">
                M
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                MeroPathshala<span className="w-2 h-2 rounded-full bg-[#FF5533] inline-block ml-0.5" />
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The creator-student collaboration e-learning platform. Direct course access, smart AI matching, zero middlemen. "Pathshala" means school.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://github.com/Dinanath99/meropathsala"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#FF5533] transition-colors"
                aria-label="GitHub Repository"
              >
                <Github size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#FF5533] transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#FF5533] transition-colors"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Platform Column */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              PLATFORM
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold">
              <li>
                <Link to="/course/search" className="hover:text-white transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/my-learning" className="hover:text-white transition-colors">
                  My Learning
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-white transition-colors">
                  Instructor Studio
                </Link>
              </li>
              <li>
                <Link to="/course/search?query=AI" className="hover:text-white transition-colors">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              RESOURCES
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  About MeroPathshala
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              LEGAL & SUPPORT
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li className="pt-2 text-slate-500 font-mono text-[11px]">
                support@meropathshala.edu.np
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} MeroPathshala Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Nepal's Premier Learning Hub
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


