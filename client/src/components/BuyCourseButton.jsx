import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetCourseEnrollmentStatusQuery } from "@/features/api/enrollmentApi";
import { Loader2, ExternalLink, CheckCircle2, Clock, RotateCcw } from "lucide-react";

const DEFAULT_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc_EXAMPLE_FORM_ID/viewform";

const BuyCourseButton = ({ courseId }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth || {});

  const { data: statusData, isLoading } = useGetCourseEnrollmentStatusQuery(courseId, {
    skip: !courseId,
  });

  const status = statusData?.status || "none";

  const getFormUrl = () => {
    const baseUrl =
      import.meta.env.VITE_GOOGLE_ENROLLMENT_FORM_URL || DEFAULT_FORM_URL;
    const url = new URL(baseUrl);
    url.searchParams.set("usp", "pp_url");
    url.searchParams.set("courseId", courseId);
    if (user?.email) {
      url.searchParams.set("email", user.email);
    }
    if (user?.name) {
      url.searchParams.set("studentName", user.name);
    }
    return url.toString();
  };

  const handleEnrollClick = () => {
    if (status === "active") {
      navigate(`/course-progress/${courseId}`);
      return;
    }

    if (status === "pending") {
      toast.info("Your enrollment application for this course is currently under review by our team.");
      return;
    }

    // Open Google Form for 'none', 'unauthenticated', or 'rejected'
    const targetUrl = getFormUrl();
    toast.info("Opening Google Enrollment Form in a new tab...");
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  if (isLoading) {
    return (
      <Button disabled className="w-full bg-slate-300 dark:bg-slate-800 text-slate-600 py-6 rounded-xl font-bold">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Checking Enrollment Status...
      </Button>
    );
  }

  if (status === "active") {
    return (
      <Button
        onClick={handleEnrollClick}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl font-bold shadow-md text-base flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-5 h-5" />
        Continue to Course
      </Button>
    );
  }

  if (status === "pending") {
    return (
      <Button
        onClick={handleEnrollClick}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6 rounded-xl font-bold shadow-md text-base flex items-center justify-center gap-2"
      >
        <Clock className="w-5 h-5 animate-pulse" />
        Application Under Review
      </Button>
    );
  }

  if (status === "rejected") {
    return (
      <Button
        onClick={handleEnrollClick}
        className="w-full bg-[#FF5533] hover:bg-[#e04422] text-white py-6 rounded-xl font-bold shadow-md text-base flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        Re-Apply via Google Form
      </Button>
    );
  }

  return (
    <Button
      onClick={handleEnrollClick}
      className="w-full bg-[#FF5533] hover:bg-[#e04422] text-white py-6 rounded-xl font-bold shadow-md text-base flex items-center justify-center gap-2"
    >
      Enroll Now <ExternalLink className="w-4 h-4 ml-1" />
    </Button>
  );
};

export default BuyCourseButton;
