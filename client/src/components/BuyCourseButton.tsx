import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "@/app/store";

interface BuyCourseButtonProps {
  courseId: string;
}

const BuyCourseButton: React.FC<BuyCourseButtonProps> = ({ courseId }) => {
  const { isAuthenticated } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    if (!isAuthenticated) {
      toast.info("Please log in or create an account to enroll in this course.");
      const redirectUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect=${redirectUrl}`);
      return;
    }
    await createCheckoutSession(courseId);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Invalid response from server.");
      }
    }
    if (isError && error) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Failed to create checkout session");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full bg-orange-500 hover:bg-orange-600 font-extrabold text-white rounded-full py-3"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Enroll / Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
