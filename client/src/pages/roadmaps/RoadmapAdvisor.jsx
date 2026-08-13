import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, CheckCircle2, ArrowRight, RotateCcw, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoadmapAdvisor = ({ onSelectRoadmap }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    role: "",
    experience: "",
    goal: "",
  });
  const [recommendation, setRecommendation] = useState(null);

  const roles = ["Student", "Developer", "Teacher", "Business Owner", "Content Creator", "Job Seeker"];
  const experiences = ["Completely New", "Beginner", "Intermediate", "Advanced"];
  const goals = ["Learn AI", "Build AI Apps", "Use AI at Work", "Create Content", "Automate Tasks", "Prepare for Career"];

  const handleSelectRole = (r) => {
    setAnswers((prev) => ({ ...prev, role: r }));
    setStep(2);
  };

  const handleSelectExperience = (exp) => {
    setAnswers((prev) => ({ ...prev, experience: exp }));
    setStep(3);
  };

  const handleSelectGoal = (g) => {
    const finalAnswers = { ...answers, goal: g };
    setAnswers(finalAnswers);
    generateRecommendation(finalAnswers);
  };

  const generateRecommendation = (ans) => {
    let recPath = {
      title: "AI Basics for Beginners",
      slug: "ai-basics-for-beginners",
      steps: ["AI Basics", "ChatGPT Mastery", "Prompt Engineering", "AI Tools", "AI Automation"],
      desc: "Ideal foundational path starting from scratch to daily productivity.",
    };

    if (ans.role === "Developer" || ans.goal === "Build AI Apps") {
      recPath = {
        title: "AI Development & API Integration",
        slug: "ai-development-api-integration",
        steps: ["JavaScript Basics", "OpenAI SDK", "RAG Architecture", "Vector Databases", "Full-Stack Deployment"],
        desc: "Designed for developers ready to build enterprise AI products.",
      };
    } else if (ans.role === "Business Owner" || ans.goal === "Automate Tasks") {
      recPath = {
        title: "AI Automation for Business & Marketing",
        slug: "ai-automation-for-business-marketing",
        steps: ["AI Copywriting", "Social Media Automation", "Customer Support Bots", "Sales Pipelines"],
        desc: "Tailored to supercharge productivity and revenue using automated workflows.",
      };
    }

    setRecommendation(recPath);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ role: "", experience: "", goal: "" });
    setRecommendation(null);
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border border-purple-500/20 text-white rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <CardContent className="p-0 space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <Badge className="bg-orange-500 text-white font-extrabold text-xs px-3 py-1 uppercase tracking-wider">
            <Compass size={14} className="mr-1.5 inline" /> Roadmap Advisor
          </Badge>

          {step > 1 && (
            <Button
              onClick={handleReset}
              variant="ghost"
              size="sm"
              className="text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
            >
              <RotateCcw size={12} className="mr-1" /> Reset
            </Button>
          )}
        </div>

        {/* Step 1: Role */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black">Question 1: Who are you?</h3>
              <p className="text-xs text-gray-300 font-serif">तपाईंको भूमिका के हो?</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => handleSelectRole(r)}
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 text-xs font-bold text-left transition-all hover:scale-[1.02]"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Experience */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black">Question 2: What is your AI experience?</h3>
              <p className="text-xs text-gray-300 font-serif">AI सम्बन्धी तपाईंको अनुभव कस्तो छ?</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {experiences.map((exp) => (
                <button
                  key={exp}
                  onClick={() => handleSelectExperience(exp)}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 text-xs font-bold text-left transition-all hover:scale-[1.02]"
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Goal */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black">Question 3: What is your main learning goal?</h3>
              <p className="text-xs text-gray-300 font-serif">तपाईंको मुख्य उद्देश्य के हो?</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {goals.map((g) => (
                <button
                  key={g}
                  onClick={() => handleSelectGoal(g)}
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 text-xs font-bold text-left transition-all hover:scale-[1.02]"
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Recommendation Output */}
        {step === 4 && recommendation && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="space-y-2">
              <Badge className="bg-emerald-500 text-white text-[10px] uppercase font-bold">
                Recommended Path Identified
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-black text-orange-400">
                {recommendation.title}
              </h3>
              <p className="text-xs text-gray-300">{recommendation.desc}</p>
            </div>

            {/* Path Steps Flow */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {recommendation.steps.map((st, i) => (
                <React.Fragment key={i}>
                  <div className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-200">
                    {st}
                  </div>
                  {i < recommendation.steps.length - 1 && (
                    <ArrowRight size={14} className="text-orange-400" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button
                onClick={() => navigate(`/roadmaps/${recommendation.slug}`)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-8 py-3 text-xs shadow-lg"
              >
                Start Learning Now <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoadmapAdvisor;
