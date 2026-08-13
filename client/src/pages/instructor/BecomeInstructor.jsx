import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  GraduationCap,
  Users,
  Award,
  DollarSign,
  BarChart3,
  Globe,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BecomeInstructor = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const benefits = [
    {
      icon: Users,
      title: "Reach Thousands of Learners",
      description: "Connect with eager students, developers, and professionals across Nepal wanting to learn AI.",
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40",
    },
    {
      icon: Award,
      title: "Build Your Personal Brand",
      description: "Establish yourself as a recognized AI expert and industry thought-leader in Nepal's tech ecosystem.",
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40",
    },
    {
      icon: DollarSign,
      title: "Earn From Your Expertise",
      description: "Monetize your practical AI skills with transparent course pricing and future revenue sharing.",
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      icon: BarChart3,
      title: "Professional Instructor Dashboard",
      description: "Track student enrollments, completion rates, and course views with real-time analytics.",
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40",
    },
    {
      icon: BookOpen,
      title: "Course Analytics & Insights",
      description: "Gain deep understanding into how students engage with your video lessons and quizzes.",
      color: "text-pink-500 bg-pink-50 dark:bg-pink-950/40",
    },
    {
      icon: Globe,
      title: "Growing AI Community",
      description: "Join Nepal's premier network of AI researchers, prompt engineers, and educators.",
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40",
    },
  ];

  const steps = [
    { number: "01", title: "Submit Application", desc: "Fill out your professional profile and course proposal." },
    { number: "02", title: "Admin Review", desc: "Our editorial team evaluates your experience and sample outline." },
    { number: "03", title: "Get Approved", desc: "Receive official instructor credentials and dashboard access." },
    { number: "04", title: "Publish Courses", desc: "Record high-quality video lessons and publish your course." },
    { number: "05", title: "Teach & Grow", desc: "Impact learners, earn income, and expand your AI career." },
  ];

  const requirements = [
    "AI Professionals & Machine Learning Researchers",
    "Software Engineers & Full-Stack Developers",
    "Prompt Engineers & LLM Specialists",
    "Data Scientists & Analytics Experts",
    "University Educators & Academic Faculty",
    "Industry Tech Leads & Solution Architects",
    "Freelancers with practical hands-on AI experience",
  ];

  const faqs = [
    {
      q: "Who can apply to become an instructor?",
      a: "Anyone with practical, verifiable expertise in Artificial Intelligence, Software Development, Machine Learning, Data Science, or Prompt Engineering can apply.",
    },
    {
      q: "How long does the approval process take?",
      a: "Our administrative team reviews applications within 24 to 48 hours. You will receive an email update once your status is updated.",
    },
    {
      q: "Can I publish both free and paid courses?",
      a: "Yes! Instructors can publish free community courses or premium paid masterclasses with customized pricing.",
    },
    {
      q: "How are instructors selected?",
      a: "Applications are evaluated based on practical experience, clarity of course outline, communication skills, and alignment with Nepal's AI learning needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 pt-20 pb-24">
      <Helmet>
        <title>Become an AI Instructor - AI Guru Nepal</title>
        <meta
          name="description"
          content="Share your AI knowledge, teach thousands of learners across Nepal, and build your personal brand at AI Guru Nepal."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-orange-500/10 via-slate-50 to-slate-50 dark:from-orange-500/5 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 mr-1.5 inline" /> Instructor Marketplace
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Become an AI Instructor at <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600">
              AI Guru Nepal
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Share your knowledge, teach thousands of learners across Nepal, and build your personal brand as a recognized AI educator.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/become-an-instructor/apply")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full font-extrabold px-8 py-6 text-lg shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105"
            >
              Apply Now <ArrowRight size={20} className="ml-2" />
            </Button>
            <a href="#why-teach">
              <Button variant="outline" className="rounded-full font-bold px-8 py-6 text-lg border-gray-300 dark:border-slate-800">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Why Teach With Us */}
      <section id="why-teach" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Why Teach With AI Guru Nepal?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base">
            We provide all the tools, analytics, and platform reach you need to focus on what you do best: teaching AI.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm hover:border-orange-500/50 hover:shadow-xl transition-all duration-300 space-y-4"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Process Workflow */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50">
              Simple 5-Step Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base">
              From application to publishing your first AI masterclass in Nepal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 relative space-y-3 text-center flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-orange-500/30 block mb-2">{step.number}</span>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="text-gray-300 dark:text-slate-700" size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <Badge className="bg-orange-500 text-white font-bold text-xs">Who Can Apply?</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Are You an Expert Ready to Inspire?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Whether you are a machine learning scientist, software engineer, or AI prompt practitioner, Nepal's tech community is waiting to learn from your real-world experience.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-orange-400">Target Instructor Profiles</h4>
            <ul className="space-y-2.5">
              {requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-gray-200">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm">Got questions about teaching at AI Guru Nepal?</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-gray-900 dark:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform ${openFaq === idx ? "rotate-180 text-orange-500" : ""}`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t dark:border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-3xl p-10 sm:p-14 text-white shadow-xl space-y-6">
          <Sparkles className="w-12 h-12 mx-auto text-yellow-300 animate-bounce" />
          <h2 className="text-3xl sm:text-4xl font-black">Ready to Teach AI in Nepal?</h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto font-medium">
            Join Nepal's premier instructor marketplace and shape the future of AI education today.
          </p>
          <Button
            onClick={() => navigate("/become-an-instructor/apply")}
            className="bg-white text-gray-900 hover:bg-gray-100 font-extrabold rounded-full px-10 py-6 text-lg shadow-2xl transition-transform hover:scale-105"
          >
            Apply Today <ArrowRight size={20} className="ml-2 text-orange-500" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BecomeInstructor;
