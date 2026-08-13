import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-slate-50 dark:bg-[#020817] px-4">
          <div className="max-w-lg w-full text-center bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
            <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={48} />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Something went wrong</h1>
              <p className="text-sm font-bold text-orange-500 font-serif">कुनै समस्या आयो</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pt-2">
                {this.state.error?.message || "An unexpected application error occurred."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button
                onClick={this.handleReload}
                variant="outline"
                className="rounded-full px-6 text-xs font-bold"
              >
                <RefreshCw size={14} className="mr-2" /> Reload Page
              </Button>
              <Button
                onClick={this.handleGoHome}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-6 text-xs"
              >
                <Home size={14} className="mr-2" /> Return Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
