import React from "react";
import { AlertCircle } from "lucide-react"; // Optional: use any icon library
import { cn } from "@/lib/utils"; // Optional helper for conditional classes
import { AlertTriangle } from "lucide-react";


interface IncompleteDataPageProps {
  message?: string;
  onBack?: () => void;
}

const NoResults: React.FC<IncompleteDataPageProps> = ({
 message = "Cannot process your application as enough data is not available.",
  onBack,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-4 text-center">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />

      <h1 className="text-2xl font-semibold mb-2">Application Incomplete</h1>
      <p className="text-base max-w-md mb-6">{message}</p>

      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition"
        >
          Go Back
        </button>
      )}
    </div>
  );
};
export default NoResults
