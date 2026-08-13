import React from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  BookOpen, 
  Compass, 
  Wrench, 
  Newspaper, 
  FileText, 
  GraduationCap, 
  Github, 
  Heart,
  ExternalLink,
  Laptop
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 border-t border-slate-800 transition-colors">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Col 1 & 2: Brand Story & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Sparkles size={20} />
              </div>
              <div className="leading-tight">
                <span className="text-xl font-black text-white tracking-tight block">
                  AI Guru Nepal
                </span>
                <span className="text-[11px] font-bold text-orange-400 font-nepali">
                  नेपालकै सरल तथा उत्कृष्ट AI सिकाइ प्लेटफर्म
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Empowering students, developers, teachers, and professionals across Nepal to master practical artificial intelligence, modern computer fundamentals, and everyday productivity tools in English and Nepali.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com/Dinanath99/meropathsala"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                title="GitHub Repository"
              >
                <Github size={18} />
              </a>
              <span className="text-xs text-gray-400 font-medium">
                Open Educational Ecosystem
              </span>
            </div>
          </div>

          {/* Col 3: Learn & Curricula */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Curriculum & Learn
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/learn/computer-skills"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Laptop size={14} className="text-orange-500" />
                  <span>Computer Skills</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/learn/ai-basics"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <span>AI Basics</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/roadmaps"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Compass size={14} className="text-blue-500" />
                  <span>Learning Roadmaps</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/course/search"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen size={14} className="text-emerald-500" />
                  <span>Explore Courses</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: AI Ecosystem & Discovery */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              AI Ecosystem
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/ai-tools"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Wrench size={14} className="text-purple-500" />
                  <span>AI Tools Directory</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/prompt-library"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles size={14} className="text-pink-500" />
                  <span>Prompt Library</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <Newspaper size={14} className="text-red-500" />
                  <span>AI News Hub</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <FileText size={14} className="text-indigo-500" />
                  <span>Insights & Blogs</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Tools & Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Tools & Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/cv-builder"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <FileText size={14} className="text-orange-500" />
                  <span>AI CV Builder</span>
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded font-black">Free</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/become-an-instructor"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                >
                  <GraduationCap size={14} className="text-amber-500" />
                  <span>Become an Instructor</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/instructors"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Faculty Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} AI Guru Nepal. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <Heart size={13} className="text-red-500 fill-current" />
            <span>for Nepal's Learners & Developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
