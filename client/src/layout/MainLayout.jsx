


import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
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
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Server, UserCog, BarChart3, Presentation,
  PieChart, FileSearch, MonitorCheck, ClipboardList,
} from "lucide-react";

// Constants
const goalsOptions = ["Start my career", "Change my career", "Grow in my current role", "Explore topics outside of work"];
const rolesOptions = [
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
  "Data Science", "Machine Learning", "Python Programming", "SQL", "Data Analysis",
  "Statistics", "Algorithms", "Data Visualization", "Deep Learning",
];
const educationLevels = [
  "Less than high school diploma", "High school diploma", "Some college", "Associate Degree",
  "Bachelor's degree", "Master's degree", "Professional school degree", "Doctorate degree",
];
const experienceLevels = ["beginner", "intermediate", "advanced"];

// Variants
const stepVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 }
};
const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
};
const cardVariants = {
  hover: { y: -5, transition: { duration: 0.2 } }
};

// Main Component
const MainLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(0);

  const [goal, setGoal] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [customRole, setCustomRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [interests, setInterests] = useState("");

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "instructor") {
        navigate("/");
      } else if (!user.skills?.length) {
        setOpenModal(true);
      }
    }
  }, [user, isAuthenticated, navigate]);

  const toggleItem = (item, list, setter) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleNext = () => {
    switch (step) {
      case 0:
        if (!goal) return toast.error("Please select a goal.");
        break;
      case 1:
        if (!selectedRoles.length && !customRole.trim()) return toast.error("Select or enter a role.");
        break;
      case 2:
        if (!selectedSkills.length && !customSkill.trim()) return toast.error("Select or enter a skill.");
        break;
      case 3:
        if (!jobTitle.trim()) return toast.error("Please enter your job title.");
        break;
      case 4:
        if (!educationLevel || !experienceLevel) return toast.error("Please fill all fields.");
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
      interests: interestList, // Interests are optional, so empty array is valid
    };

    try {
      const res = await updateUser(payload).unwrap();
      toast.success(res.message || "Profile updated!", { duration: 3000 });
      setOpenModal(false);
      navigate("/"); // Replace with your desired route
    } catch (err) {
      console.error("Update user error:", err); // Log for debugging
      toast.error(err?.data?.message || "Failed to update profile. Please try again.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <DialogTitle className="text-3xl font-bold text-gray-800">Welcome, {user?.name || "User"}!</DialogTitle>
            <DialogDescription className="text-gray-500 text-lg mt-2">Choose a goal to tailor your journey.</DialogDescription>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {goalsOptions.map((g) => (
                <motion.div
                  key={g}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Button
                    onClick={() => setGoal(g)}
                    className={`w-full py-4 rounded-xl text-lg font-medium transition-all duration-300 shadow-md ${
                      goal === g
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
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
            <DialogTitle className="text-3xl font-bold text-gray-800">Interested Roles</DialogTitle>
            <DialogDescription className="text-gray-500 text-lg mt-2">Select or add roles that inspire you.</DialogDescription>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {rolesOptions.map(({ label, icon: Icon }) => (
                <motion.div
                  key={label}
                  variants={cardVariants}
                  whileHover="hover"
                  className="h-32"
                >
                  <Button
                    onClick={() => toggleItem(label, selectedRoles, setSelectedRoles)}
                    className={`w-full h-full flex flex-col items-center justify-center rounded-2xl shadow-lg transition-all duration-300 p-6 ${
                      selectedRoles.includes(label)
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 hover:shadow-xl"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Icon className="w-10 h-10 mb-3" />
                    <span className="text-base font-semibold text-center">{label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
            <Input
              placeholder="Add a custom role (optional)"
              className="mt-6 text-black border-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-lg py-3"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
            />
          </>
        );
      case 2:
        return (
          <>
            <DialogTitle className="text-3xl font-bold text-gray-800">Skills</DialogTitle>
            <DialogDescription className="text-gray-500 text-lg mt-2">Select or add skills you want to master.</DialogDescription>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              {skillsOptions.map((skill) => (
                <motion.div
                  key={skill}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Button
                    onClick={() => toggleItem(skill, selectedSkills, setSelectedSkills)}
                    className={`w-full py-3 rounded-xl text-sm font-medium shadow-md transition-all duration-300 ${
                      selectedSkills.includes(skill)
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {skill}
                  </Button>
                </motion.div>
              ))}
            </div>
            <Input
              placeholder="Add a custom skill (optional)"
              className="mt-6 text-black border-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-lg py-3"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
            />
          </>
        );
      case 3:
        return (
          <>
            <DialogTitle className="text-3xl font-bold text-gray-800">Job Title</DialogTitle>
            <DialogDescription className="text-gray-500 text-lg mt-2">Tell us about your current or most recent role.</DialogDescription>
            <Input
              className="mt-6 text-black border-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-lg py-3"
              placeholder="e.g. Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </>
        );
      case 4:
        return (
          <>
            <DialogTitle className="text-3xl font-bold text-gray-800">Education & Experience</DialogTitle>
            <DialogDescription className="text-gray-500 text-lg mt-2">Share your education and experience level.</DialogDescription>
            <Label className="mt-6 text-gray-700 font-semibold text-lg">Education</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              {educationLevels.map((ed) => (
                <motion.div
                  key={ed}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Button
                    onClick={() => setEducationLevel(ed)}
                    className={`w-full py-3 rounded-xl text-sm font-medium shadow-md transition-all duration-300 ${
                      educationLevel === ed
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {ed}
                  </Button>
                </motion.div>
              ))}
            </div>
            <Label className="mt-6 block text-gray-700 font-semibold text-lg">Experience</Label>
            <div className="flex gap-4 mt-3">
              {experienceLevels.map((ex) => (
                <motion.div
                  key={ex}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Button
                    onClick={() => setExperienceLevel(ex)}
                    className={`w-full py-3 rounded-xl capitalize text-sm font-medium shadow-md transition-all duration-300 ${
                      experienceLevel === ex
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {ex}
                  </Button>
                </motion.div>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <Dialog open={openModal}>
        <DialogContent className="max-w-lg sm:max-w-3xl bg-card text-card-foreground border border-border/80 rounded-2xl shadow-2xl p-6 sm:p-8">
          {/* Step Progress Indicator */}
          <div className="w-full mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Personalization Onboarding</span>
              <span>Step {step + 1} of 5</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
                style={{ width: `${((step + 1) / 5) * 100}%` }}
              />
            </div>
          </div>

          <DialogHeader>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </DialogHeader>

          <DialogFooter className="mt-8 flex justify-between gap-3">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={handlePrev}
                className="rounded-xl border-border text-foreground hover:bg-accent font-medium py-2.5 px-5"
              >
                Back
              </Button>
            )}
            <div className="ml-auto flex items-center gap-3">
              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium py-2.5 px-6 shadow-sm transition"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium py-2.5 px-6 shadow-sm transition"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving Preferences...
                    </>
                  ) : (
                    "Complete Setup"
                  )}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainLayout;