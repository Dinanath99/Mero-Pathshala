import React from "react";
import { Loader } from "lucide-react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-950">
      <Loader className="animate-spin h-16 w-16 text-blue-600 dark:text-orange-500" />
      <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Loading, please wait...</p>
    </div>
  );
};

export default LoadingSpinner;
