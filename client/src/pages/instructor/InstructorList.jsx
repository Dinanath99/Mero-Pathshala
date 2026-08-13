import React, { useState } from "react";
import { useGetInstructorsQuery } from "@/features/api/instructorApi";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Search,
  Award,
  Users,
  BookOpen,
  Star,
  ChevronRight,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const InstructorList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("");

  const { data, isLoading } = useGetInstructorsQuery({
    search: searchTerm,
    expertise: selectedExpertise,
  });

  const instructors = data?.instructors || [];

  const expertiseTags = [
    "All",
    "Machine Learning",
    "Prompt Engineering",
    "Full-Stack AI",
    "Computer Vision",
    "Natural Language Processing",
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>AI Instructors & Experts - AI Guru Nepal</title>
        <meta
          name="description"
          content="Learn from top AI engineers, data scientists, and industry experts in Nepal."
        />
      </Helmet>

      {/* Header */}
      <section className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200">
            <GraduationCap className="w-4 h-4 mr-1.5 inline" /> AI Faculty Directory
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Learn from Nepal's Top AI Experts
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Discover verified instructors, software engineers, and AI practitioners teaching hands-on masterclasses.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search instructors by name, title, or skill..."
                className="pl-11 rounded-full py-6 border-gray-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tag Cloud */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4 flex flex-wrap items-center justify-center gap-2">
        {expertiseTags.map((tag) => {
          const isActive = (selectedExpertise === "" && tag === "All") || selectedExpertise === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedExpertise(tag === "All" ? "" : tag)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:border-orange-500"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Instructor Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {isLoading ? (
          <div className="text-center py-20 text-gray-500 font-semibold">
            Loading AI instructors...
          </div>
        ) : instructors.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="text-xl font-bold">No Instructors Found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search criteria or explore our marketplace application.</p>
            <Button onClick={() => navigate("/become-an-instructor")} className="bg-orange-500 text-white rounded-full font-bold">
              Become First Instructor
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((inst) => (
              <div
                key={inst._id}
                onClick={() => navigate(`/instructors/${inst.slug}`)}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Cover Photo & Avatar Header */}
                  <div className="relative h-32 bg-gradient-to-r from-orange-500 to-pink-500">
                    {inst.coverImage && (
                      <img src={inst.coverImage} alt="cover" className="w-full h-full object-cover" />
                    )}
                    <div className="absolute -bottom-8 left-6">
                      <img
                        src={inst.profilePhoto || inst.user?.photoUrl || "https://github.com/shadcn.png"}
                        alt={inst.user?.name}
                        className="w-16 h-16 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-md"
                      />
                    </div>
                  </div>

                  <div className="pt-10 px-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                        {inst.user?.name || "AI Instructor"}
                      </h3>
                      {inst.featured && (
                        <Badge className="bg-amber-500 text-white text-[10px]">Featured</Badge>
                      )}
                    </div>

                    <p className="text-xs font-bold text-orange-600 dark:text-orange-400">
                      {inst.title || "AI Research Specialist"}
                    </p>

                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                      {inst.bio || "Passionate about building AI applications and empowering learners in Nepal."}
                    </p>

                    {/* Expertise Tags */}
                    {inst.expertise && inst.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {inst.expertise.slice(0, 3).map((exp, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-[10px] border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-300"
                          >
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats Footer */}
                <div className="p-6 pt-4 border-t dark:border-slate-800/60 mt-4 flex items-center justify-between text-xs font-semibold text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} className="text-orange-500" /> {inst.coursesCount || 0} Courses
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} className="text-blue-500" /> {inst.totalStudents || 0} Students
                    </span>
                  </div>
                  <span className="text-orange-500 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Profile <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default InstructorList;
