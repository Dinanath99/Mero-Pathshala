import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { XCircle, ArrowLeft, RotateCcw } from "lucide-react";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get("reason");

  return (
    <div className="min-h-screen bg-[#F9F8F6] dark:bg-[#0E1015] flex flex-col justify-center items-center py-20 px-4">
      <Card className="max-w-md w-full bg-card dark:bg-[#151821] border border-amber-500/30 dark:border-amber-500/20 shadow-2xl p-6 sm:p-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
          <XCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Payment Cancelled or Interrupted
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Your eSewa transaction was cancelled or could not be completed. No amount was charged to your account, and enrollment was not activated.
          </p>
          {reason && (
            <div className="p-3 bg-amber-500/10 rounded-xl text-xs text-amber-700 dark:text-amber-400">
              Provider notice: {reason}
            </div>
          )}
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link to="/courses">
            <Button className="w-full bg-[#FF5533] hover:bg-[#e04422] text-white rounded-xl font-bold py-6 text-base shadow-md flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Try Again / Browse Courses
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="outline"
              className="w-full rounded-xl font-semibold py-6 border-slate-200 dark:border-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Homepage
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default PaymentFailure;
