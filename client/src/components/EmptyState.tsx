import React from "react";
import { useNavigate } from "react-router-dom";
import { FolderOpen, ArrowRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  titleNp?: string;
  description?: string;
  actionText?: string;
  actionLink?: string;
  onActionClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FolderOpen,
  title = "No Items Found",
  titleNp = "कुनै सामग्री भेटिएन",
  description = "We couldn't find any data matching your criteria. Try adjusting your filters or explore other categories.",
  actionText = "Explore Courses",
  actionLink = "/course/search",
  onActionClick,
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onActionClick) {
      onActionClick();
    } else if (actionLink) {
      navigate(actionLink);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 my-8 bg-slate-50/50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto">
      <div className="p-4 rounded-3xl bg-orange-500/10 text-orange-500 shrink-0 shadow-inner">
        <Icon size={44} />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
          {title}
        </h3>
        {titleNp && (
          <p className="text-sm font-bold text-orange-500 font-serif">
            {titleNp}
          </p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pt-1 max-w-md mx-auto">
          {description}
        </p>
      </div>

      {actionText && (
        <Button
          onClick={handleAction}
          className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-6 py-2.5 text-xs shadow-md mt-2"
        >
          {actionText} <ArrowRight size={14} className="ml-1.5" />
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
