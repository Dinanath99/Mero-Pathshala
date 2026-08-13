import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, LucideIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useUpdateUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Server,
  UserCog,
  BarChart3,
  Presentation,
  PieChart,
  FileSearch,
  MonitorCheck,
  ClipboardList,
} from "lucide-react";

// Constants
const goalsOptions = [
  "Start my career",
  "Change my career",
  "Grow in my current role",
  "Explore topics outside of work",
];

interface RoleOption {
  label: string;
  icon: LucideIcon;
}

const rolesOptions: RoleOption[] = [
  { label: "Data Scientist", icon: Brain },
  { label: "IT Project Manager", icon: ClipboardList },
  { label: "Technology Consultant", icon: UserCog },
  { label: "Machine Learning Engineer", icon: Server },
  { label: "Business Intelligence Analyst", icon: BarChart3 },
  { label: "Product Manager", icon: Presentation },
  { label: "Business Analyst", icon: PieChart },
  { label: "Data Analyst", icon: FileSearch },
  { label: "Data Warehouse Developer", icon: MonitorCheck },
];
const skillsOptions = [
  "Data Science",
  "Machine Learning",
  "Python Programming",
  "SQL",
  "Data Analysis",
  "Statistics",
  "Algorithms",
  "Data Visualization",
  "Deep Learning",
];
const educationLevels = [
  "High school diploma",
  "Some college",
  "Associate Degree",
  "Bachelor's degree",
  "Master's degree",
  "Professional school degree",
  "Doctorate degree",
];
const experienceLevels = ["beginner", "intermediate", "advanced"];

// Variants
const stepVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
const cardVariants = {
  hover: { y: -3, transition: { duration: 0.2 } },
};

// Main Component
const MainLayout: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth || {});
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(0);

  const [goal, setGoal] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [customRole, setCustomRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [interests] = useState("");

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role !== "instructor" && (!user.skills || !user.skills.length)) {
        setOpenModal(true);
      }
    }
  }, [user, isAuthenticated]);

  const toggleItem = (
    item: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleNext = () => {
    switch (step) {
      case 0:
        if (!goal) return toast.error("Please select a goal.");
        break;
      case 1:
        if (!selectedRoles.length && !customRole.trim())
          return toast.error("Select or enter a role.");
        break;
      case 2:
        if (!selectedSkills.length && !customSkill.trim())
          return toast.error("Select or enter a skill.");
        break;
      case 3:
        if (!jobTitle.trim()) return toast.error("Please enter your job title.");
        break;
      case 4:
        if (!educationLevel || !experienceLevel)
          return toast.error("Please fill all fields.");
        break;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    const allRoles = [...selectedRoles, ...(customRole ? [customRole.trim()] : [])];
    const allSkills = [...selectedSkills, ...(customSkill ? [customSkill.trim()] : [])];
    const interestList = interests.split(",").map((i) => i.trim()).filter(Boolean);

    const payload = {
      goal,
      preferredRoles: allRoles,
      skills: allSkills,
      jobTitle,
      educationLevel,
      experienceLevel,
      interests: interestList,
    };

    try {
      const res = await updateUser(payload).unwrap();
      toast.success(res.message || "Profile updated!", { duration: 3000 });
      setOpenModal(false);
      navigate("/");
    } catch (err: any) {
      console.error("Update user error:", err);
      toast.error(err?.data?.message || "Failed to update profile. Please try again.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white">
              Welcome, {user?.name || "Learner"}!
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-sm mt-1">
              Choose your primary goal to personalize your AI Guru learning journey.
            </DialogDescription>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {goalsOptions.map((g) => (
                <motion.div key={g} variants={cardVariants} whileHover="hover">
                  <Button
                    onClick={() => setGoal(g)}
                    className={`w-full py-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      goal === g
                        ? "bg-orange-600 text-white shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {g}
                  </Button>
                </motion.div>
              ))}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white">
              Interested Roles
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-sm mt-1">
              Select or add the professional roles that inspire you.
            </DialogDescription>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              {rolesOptions.map(({ label, icon: Icon }) => (
                <motion.div key={label} variants={cardVariants} whileHover="hover">
                  <Button
                    onClick={() => toggleItem(label, selectedRoles, setSelectedRoles)}
                    className={`w-full h-24 flex flex-col items-center justify-center rounded-2xl shadow-xs transition-all p-3 text-center ${
                      selectedRoles.includes(label)
                        ? "bg-orange-600 text-white"
                        : "bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-1.5 shrink-0" />
                    <span className="text-xs font-bold line-clamp-2 leading-tight">{label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
            <Input
              placeholder="Add a custom role (optional)"
              className="mt-4 text-xs border-gray-200 dark:border-slate-700 rounded-xl py-2.5"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
            />
          </>
        );
      case 2:
        return (
          <>
            <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white">
              Skills of Interest
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-sm mt-1">
              Select key skills you would like to build.
            </DialogDescription>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-6">
              {skillsOptions.map((skill) => (
                <motion.div key={skill} variants={cardVariants} whileHover="hover">
                  <Button
                    onClick={() => toggleItem(skill, selectedSkills, setSelectedSkills)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all ${
                      selectedSkills.includes(skill)
                        ? "bg-orange-600 text-white"
                        : "bg-slate-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {skill}
                  </Button>
                </motion.div>
              ))}
            </div>
            <Input
              placeholder="Add a custom skill (optional)"
              className="mt-4 text-xs border-gray-200 dark:border-slate-700 rounded-xl py-2.5"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
            />
          </>
        );
      case 3:
        return (
          <>
            <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white">
              Current Job Title
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-sm mt-1">
              Tell us about your current or most recent profession.
            </DialogDescription>
            <Input
              className="mt-6 border-gray-200 dark:border-slate-700 rounded-xl py-3 text-xs"
              placeholder="e.g. Student, School Teacher, Web Developer, Business Owner"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </>
        );
      case 4:
        return (
          <>
            <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white">
              Education & Experience Level
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-sm mt-1">
              Help us tailor lesson difficulty for you.
            </DialogDescription>
            <Label className="mt-4 text-gray-700 dark:text-gray-300 font-bold text-xs block">Education</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {educationLevels.map((ed) => (
                <Button
                  key={ed}
                  onClick={() => setEducationLevel(ed)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                    educationLevel === ed
                      ? "bg-orange-600 text-white"
                      : "bg-slate-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700"
                  }`}
                >
                  {ed}
                </Button>
              ))}
            </div>
            <Label className="mt-4 block text-gray-700 dark:text-gray-300 font-bold text-xs">Experience Level</Label>
            <div className="flex gap-2 mt-2">
              {experienceLevels.map((ex) => (
                <Button
                  key={ex}
                  onClick={() => setExperienceLevel(ex)}
                  className={`flex-1 py-2 rounded-xl capitalize text-xs font-bold transition-all ${
                    experienceLevel === ex
                      ? "bg-orange-600 text-white"
                      : "bg-slate-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700"
                  }`}
                >
                  {ex}
                </Button>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />
      
      <main className="flex-1 w-full">
        <React.Suspense
          fallback={
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 py-16">
              <div className="w-10 h-10 border-4 border-orange-200 dark:border-orange-950 border-t-orange-600 rounded-full animate-spin"></div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">Loading AI Guru content...</p>
            </div>
          }
        >
          <Outlet />
        </React.Suspense>
      </main>

      <Footer />

      {/* Onboarding Dialog */}
      <Dialog open={openModal}>
        <DialogContent className="max-w-lg sm:max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-200 dark:border-slate-800">
          <DialogHeader>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </DialogHeader>

          <DialogFooter className="mt-6 flex justify-between gap-3">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={handlePrev}
                className="border-gray-200 dark:border-slate-800 text-xs font-bold rounded-xl px-5"
              >
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button
                onClick={handleNext}
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 text-xs font-bold shadow-xs ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 text-xs font-bold shadow-xs ml-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save & Continue"
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainLayout;
