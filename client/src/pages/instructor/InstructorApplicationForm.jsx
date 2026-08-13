import React, { useState } from "react";
import {
  useSubmitInstructorApplicationMutation,
  useGetMyApplicationStatusQuery,
} from "@/features/api/instructorApi";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  User,
  Briefcase,
  Globe,
  BookOpen,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  Send,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const InstructorApplicationForm = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((store) => store.auth || {});

  const { data: appData, isLoading: isFetchingApp } = useGetMyApplicationStatusQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [submitApp, { isLoading: isSubmitting }] = useSubmitInstructorApplicationMutation();

  const application = appData?.application;

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    profilePhoto: user?.photoUrl || "",
    email: user?.email || "",
    phoneNumber: "",
    shortBio: "",
    jobTitle: "",
    organization: "",
    yearsOfExperience: 3,
    expertise: "AI & Machine Learning, Prompt Engineering",
    linkedIn: "",
    gitHub: "",
    portfolio: "",
    website: "",
    languages: "English, Nepali",
    courseTopics: "ChatGPT Masterclass, Generative AI for Engineers",
    teachingExperience: "",
    whyTeach: "",
    courseIdea: "",
    sampleOutline: "",
    termsAgreed: true,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 text-center px-4">
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-4">
          <ShieldCheck className="w-12 h-12 text-orange-500 mx-auto" />
          <h2 className="text-2xl font-bold">Log in to Apply</h2>
          <p className="text-gray-500 text-sm">Please log in to your AI Guru Nepal account to submit an instructor application.</p>
          <Button onClick={() => navigate("/login")} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-full font-bold">
            Log In Now
          </Button>
        </div>
      </div>
    );
  }

  if (isFetchingApp) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 text-center text-gray-500">
        Checking application status...
      </div>
    );
  }

  // Handle existing submitted applications
  if (application) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-24 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-6 text-center">
          {application.status === "Pending" && (
            <>
              <Clock className="w-16 h-16 text-amber-500 mx-auto animate-pulse" />
              <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">Application Under Review</Badge>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Your Application is Pending</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-lg mx-auto">
                Thank you for applying to become an instructor! Our admin desk is currently reviewing your application for <span className="font-bold text-gray-900 dark:text-white">{application.fullName}</span>.
              </p>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl text-left text-xs space-y-2 font-mono">
                <p><strong>Job Title:</strong> {application.jobTitle}</p>
                <p><strong>Organization:</strong> {application.organization}</p>
                <p><strong>Submitted Date:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
              </div>
              <Button onClick={() => navigate("/")} variant="outline" className="rounded-full">
                Back to Home
              </Button>
            </>
          )}

          {application.status === "Approved" && (
            <>
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Approved Instructor</Badge>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Congratulations! You're Approved</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-lg mx-auto">
                Your instructor application has been officially approved. You can now access your instructor dashboard and publish AI courses!
              </p>
              <Button onClick={() => navigate("/admin/dashboard")} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold px-8">
                Go to Instructor Dashboard
              </Button>
            </>
          )}

          {application.status === "Rejected" && (
            <>
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <Badge className="bg-red-500/10 text-red-600 border-red-200">Application Not Approved</Badge>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Application Status</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-lg mx-auto">
                Thank you for applying. Unfortunately, your application was not approved at this time.
              </p>
              {application.adminNotes && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 rounded-2xl text-xs text-left">
                  <strong>Admin Feedback:</strong> {application.adminNotes}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.shortBio || !formData.jobTitle) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        ...formData,
        expertise: formData.expertise.split(",").map((s) => s.trim()),
        languages: formData.languages.split(",").map((s) => s.trim()),
        courseTopics: formData.courseTopics.split(",").map((s) => s.trim()),
      };

      await submitApp(payload).unwrap();
      toast.success("Instructor application submitted successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit application.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>Instructor Application Form - AI Guru Nepal</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 mb-8">
        <button
          onClick={() => navigate("/become-an-instructor")}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Overview
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-10 space-y-3">
          <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200">
            Instructor Application
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Apply to Teach AI at AI Guru Nepal
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Please fill out your professional background, teaching preferences, and course outline proposal.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Personal Information */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <User className="text-orange-500" size={20} /> 1. Personal Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-bold">Full Name *</Label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Dr. Aashish Sharma"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="font-bold">Profile Photo URL</Label>
                <Input
                  value={formData.profilePhoto}
                  onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="font-bold">Email Address *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@domain.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="font-bold">Phone Number *</Label>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+977 98XXXXXXXX"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Professional Information */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Briefcase className="text-blue-500" size={20} /> 2. Professional Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-bold">Current Job Title *</Label>
                <Input
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="e.g. Senior Machine Learning Engineer"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="font-bold">Organization / Company</Label>
                <Input
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. Fusemachines Nepal / Independent"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="font-bold">Years of Practical Experience *</Label>
                <Input
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="font-bold">Primary Expertise (Comma separated)</Label>
                <Input
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  placeholder="e.g. PyTorch, LLMs, Computer Vision"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="font-bold">Short Bio *</Label>
              <Textarea
                rows={3}
                value={formData.shortBio}
                onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                placeholder="A short summary of your technical background and accomplishments..."
                className="mt-1"
              />
            </div>
          </div>

          {/* Section 3: Online Presence */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Globe className="text-purple-500" size={20} /> 3. Online Presence
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-bold">LinkedIn URL</Label>
                <Input
                  value={formData.linkedIn}
                  onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="font-bold">GitHub Profile</Label>
                <Input
                  value={formData.gitHub}
                  onChange={(e) => setFormData({ ...formData, gitHub: e.target.value })}
                  placeholder="https://github.com/..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="font-bold">Portfolio / Resume Link</Label>
                <Input
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="font-bold">Personal Website</Label>
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Teaching & Course Proposal */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <BookOpen className="text-emerald-500" size={20} /> 4. Course Proposal & Experience
            </h3>
            <div>
              <Label className="font-bold">Teaching Languages</Label>
              <Input
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                placeholder="English, Nepali"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-bold">Teaching & Public Speaking Experience *</Label>
              <Textarea
                rows={2}
                value={formData.teachingExperience}
                onChange={(e) => setFormData({ ...formData, teachingExperience: e.target.value })}
                placeholder="Describe any previous mentoring, workshops, or video tutorial creation..."
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-bold">Why do you want to teach at AI Guru Nepal? *</Label>
              <Textarea
                rows={2}
                value={formData.whyTeach}
                onChange={(e) => setFormData({ ...formData, whyTeach: e.target.value })}
                placeholder="Explain your motivation for empowering Nepali learners..."
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-bold">Proposed Course Title & Concept *</Label>
              <Input
                value={formData.courseIdea}
                onChange={(e) => setFormData({ ...formData, courseIdea: e.target.value })}
                placeholder="e.g. Building Production RAG Applications with LangChain & Python"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-bold">Sample Course Outline *</Label>
              <Textarea
                rows={3}
                value={formData.sampleOutline}
                onChange={(e) => setFormData({ ...formData, sampleOutline: e.target.value })}
                placeholder="Module 1: Intro, Module 2: Embeddings, Module 3: Vector DB Setup..."
                className="mt-1"
              />
            </div>
          </div>

          {/* Section 5: Terms Agreement */}
          <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-slate-900/80 rounded-2xl border border-orange-200 dark:border-slate-800">
            <Checkbox
              id="terms"
              checked={formData.termsAgreed}
              onCheckedChange={(checked) => setFormData({ ...formData, termsAgreed: Boolean(checked) })}
            />
            <Label htmlFor="terms" className="text-xs font-semibold cursor-pointer">
              I agree to the AI Guru Nepal Instructor Terms & Conditions and certify that all provided details are accurate.
            </Label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !formData.termsAgreed}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full font-extrabold px-10 py-6 text-base shadow-lg"
            >
              <Send size={18} className="mr-2" />
              {isSubmitting ? "Submitting Application..." : "Submit Instructor Application"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorApplicationForm;
