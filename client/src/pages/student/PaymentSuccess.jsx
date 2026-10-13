import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useVerifyEsewaPaymentMutation } from "@/features/api/purchaseApi";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Loader2, BookOpen, ArrowRight, ShieldCheck } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rawData = searchParams.get("data");

  const [verifyPayment, { isLoading }] = useVerifyEsewaPaymentMutation();
  const [verificationResult, setVerificationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    if (!rawData) {
      setErrorMessage("No payment confirmation data received from eSewa.");
      return;
    }

    if (hasAttempted) return;
    setHasAttempted(true);

    const performVerification = async () => {
      try {
        const response = await verifyPayment({ data: rawData }).unwrap();
        setVerificationResult(response);
      } catch (err) {
        console.error("Payment verification failure:", err);
        const msg =
          err?.data?.message ||
          err?.message ||
          "Payment verification failed. Your transaction could not be validated.";
        setErrorMessage(msg);
      }
    };

    performVerification();
  }, [rawData, verifyPayment, hasAttempted]);

  // Loading state
  if (isLoading || (!verificationResult && !errorMessage)) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] flex flex-col justify-center items-center py-20 px-4">
        <Card className="max-w-md w-full bg-card dark:bg-[#151821] border border-slate-200 dark:border-slate-800 shadow-xl p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto animate-pulse">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
            Verifying eSewa Payment
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Please wait while we cryptographically verify your payment signature and confirm your enrollment with eSewa servers...
          </p>
          <div className="pt-2 text-xs text-slate-400">
            Do not refresh or close this page.
          </div>
        </Card>
      </div>
    );
  }

  // Error / Tampered / Failed verification state
  if (errorMessage) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] flex flex-col justify-center items-center py-20 px-4">
        <Card className="max-w-md w-full bg-card dark:bg-[#151821] border border-red-500/30 dark:border-red-500/20 shadow-xl p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Verification Unsuccessful
          </CardTitle>
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            {errorMessage}
          </p>
          <p className="text-xs text-slate-500">
            For security, course access is granted only after verified confirmation. If your eSewa account was debited, please contact our support team.
          </p>
          <div className="pt-4 flex flex-col gap-2">
            <Link to="/courses">
              <Button className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-semibold">
                Browse Courses
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // Success state
  const courseId = verificationResult?.courseId;
  const transactionCode = verificationResult?.transactionCode;

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] flex flex-col justify-center items-center py-20 px-4">
      <Card className="max-w-lg w-full bg-card dark:bg-[#151821] border border-emerald-500/30 dark:border-emerald-500/20 shadow-2xl p-6 sm:p-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> eSewa Verified Transaction
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Enrollment Confirmed!
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Your payment via eSewa has been verified successfully. You now have lifetime access to this course.
          </p>
        </div>

        {transactionCode && (
          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex justify-between items-center">
            <span>Transaction Ref ID:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-slate-200">
              {transactionCode}
            </span>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          {courseId && (
            <Button
              onClick={() => navigate(`/course-progress/${courseId}`)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold py-6 text-base shadow-md flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" /> Start Learning Now <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
          <Link to="/my-learning" className="flex-1">
            <Button
              variant="outline"
              className="w-full rounded-xl font-semibold py-6 border-slate-200 dark:border-slate-800"
            >
              My Learning Path
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
