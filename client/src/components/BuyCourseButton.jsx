import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetCourseEnrollmentStatusQuery } from "@/features/api/enrollmentApi";
import {
  useGetCourseDetailWithStatusQuery,
  useInitiateCoursePaymentMutation,
} from "@/features/api/purchaseApi";
import {
  Loader2,
  CheckCircle2,
  Clock,
  CreditCard,
  Sparkles,
} from "lucide-react";

const BuyCourseButton = ({ courseId, course: propCourse, purchased: propPurchased }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth || {});

  // Fetch enrollment status and course details if not passed as props
  const { data: statusData, isLoading: isStatusLoading } =
    useGetCourseEnrollmentStatusQuery(courseId, { skip: !courseId });

  const { data: detailData, isLoading: isDetailLoading } =
    useGetCourseDetailWithStatusQuery(courseId, {
      skip: Boolean(propCourse && propPurchased !== undefined),
    });

  const [initiatePayment, { isLoading: isInitiating }] =
    useInitiateCoursePaymentMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const course = propCourse || detailData?.course;
  const isDirectlyPurchased =
    propPurchased !== undefined ? propPurchased : detailData?.purchased;
  const enrollmentStatus = statusData?.status || "none";

  const isEnrolled =
    Boolean(isDirectlyPurchased) || enrollmentStatus === "active";
  const coursePrice = Number(course?.coursePrice) || 0;
  const isFree = coursePrice <= 0;

  const handleEnrollClick = async () => {
    // 1. Require authentication
    if (!user || !user._id) {
      toast.info("Please log in to enroll in this course.");
      navigate("/login");
      return;
    }

    // 2. Already enrolled -> Navigate to course player
    if (isEnrolled) {
      navigate(`/course-progress/${courseId}`);
      return;
    }

    // 3. Application under review
    if (enrollmentStatus === "pending") {
      toast.info(
        "Your enrollment application is currently under review by our team."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await initiatePayment({ courseId }).unwrap();

      if (res?.isFree) {
        toast.success("Successfully enrolled in this free course!");
        navigate(`/course-progress/${courseId}`);
        return;
      }

      if (res?.gatewayUrl && res?.formData) {
        toast.info("Redirecting to eSewa sandbox payment gateway...");

        // Construct HTML form to POST fields securely to eSewa sandbox
        const form = document.createElement("form");
        form.method = "POST";
        form.action = res.gatewayUrl;

        Object.entries(res.formData).forEach(([key, value]) => {
          const hiddenInput = document.createElement("input");
          hiddenInput.type = "hidden";
          hiddenInput.name = key;
          hiddenInput.value = value;
          form.appendChild(hiddenInput);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        toast.error("Failed to generate payment session. Please try again.");
      }
    } catch (error) {
      console.error("Course enrollment initiation error:", error);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to initiate enrollment. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isStatusLoading || isDetailLoading;
  const isProcessing = isInitiating || isSubmitting;

  if (isLoading) {
    return (
      <Button
        disabled
        className="w-full bg-slate-300 dark:bg-slate-800 text-slate-600 py-6 rounded-xl font-bold"
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Checking Enrollment Status...
      </Button>
    );
  }

  // Already enrolled user -> direct access
  if (isEnrolled) {
    return (
      <Button
        onClick={() => navigate(`/course-progress/${courseId}`)}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl font-bold shadow-md text-base flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-5 h-5" />
        Continue to Course
      </Button>
    );
  }

  // Pending application
  if (enrollmentStatus === "pending") {
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

  // Free course enrollment button
  if (isFree) {
    return (
      <Button
        onClick={handleEnrollClick}
        disabled={isProcessing}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl font-bold shadow-md text-base flex items-center justify-center gap-2 transition-all"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enrolling in Free Course...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Enroll for Free
          </>
        )}
      </Button>
    );
  }

  // Paid course -> eSewa sandbox payment button
  return (
    <Button
      onClick={handleEnrollClick}
      disabled={isProcessing}
      className="w-full bg-[#60bb46] hover:bg-[#52a43b] text-white py-6 rounded-xl font-bold shadow-md text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Securing Payment Session...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4" />
          Pay with eSewa (₹{coursePrice})
        </>
      )}
    </Button>
  );
};

export default BuyCourseButton;
