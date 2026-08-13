import React from "react";
import { Lightbulb, AlertTriangle, Info, MapPin, CheckCircle2 } from "lucide-react";

export type CalloutVariant = "remember" | "warning" | "nepal" | "tip" | "info" | "success";

interface CalloutBoxProps {
  variant?: CalloutVariant;
  titleEn?: string;
  titleNe?: string;
  contentEn?: string;
  contentNe?: string;
  children?: React.ReactNode;
  className?: string;
}

export const CalloutBox: React.FC<CalloutBoxProps> = ({
  variant = "remember",
  titleEn,
  titleNe,
  contentEn,
  contentNe,
  children,
  className = ""
}) => {
  const getStyles = () => {
    switch (variant) {
      case "warning":
        return {
          border: "border-amber-500/40 dark:border-amber-500/30",
          bg: "bg-amber-50/70 dark:bg-amber-950/20",
          textHeader: "text-amber-950 dark:text-amber-200",
          iconColor: "text-amber-600 dark:text-amber-400",
          badgeBg: "bg-amber-500 text-white",
          defaultTitleEn: "⚠️ Common Mistake (सावधानी)",
          defaultTitleNe: "ध्यान दिनुपर्ने मुख्य कुरा",
          Icon: AlertTriangle
        };
      case "nepal":
        return {
          border: "border-emerald-500/40 dark:border-emerald-500/30",
          bg: "bg-emerald-50/70 dark:bg-emerald-950/20",
          textHeader: "text-emerald-950 dark:text-emerald-200",
          iconColor: "text-emerald-600 dark:text-emerald-400",
          badgeBg: "bg-emerald-600 text-white",
          defaultTitleEn: "🇳🇵 Real-World Nepal Example",
          defaultTitleNe: "नेपालको सन्दर्भमा व्यावहारिक उदाहरण",
          Icon: MapPin
        };
      case "tip":
      case "info":
        return {
          border: "border-blue-500/40 dark:border-blue-500/30",
          bg: "bg-blue-50/70 dark:bg-blue-950/20",
          textHeader: "text-blue-950 dark:text-blue-200",
          iconColor: "text-blue-600 dark:text-blue-400",
          badgeBg: "bg-blue-600 text-white",
          defaultTitleEn: "ℹ️ Pro Tip (उपयोगी सुझाव)",
          defaultTitleNe: "विशेष जानकारी तथा सुझाव",
          Icon: Info
        };
      case "success":
        return {
          border: "border-teal-500/40 dark:border-teal-500/30",
          bg: "bg-teal-50/70 dark:bg-teal-950/20",
          textHeader: "text-teal-950 dark:text-teal-200",
          iconColor: "text-teal-600 dark:text-teal-400",
          badgeBg: "bg-teal-600 text-white",
          defaultTitleEn: "✓ Key Takeaway (मुख्य उपलब्धि)",
          defaultTitleNe: "याद राख्नुपर्ने मुख्य बुँदा",
          Icon: CheckCircle2
        };
      case "remember":
      default:
        return {
          border: "border-orange-500/40 dark:border-orange-500/30",
          bg: "bg-orange-50/70 dark:bg-orange-950/20",
          textHeader: "text-orange-950 dark:text-orange-200",
          iconColor: "text-orange-600 dark:text-orange-400",
          badgeBg: "bg-orange-500 text-white",
          defaultTitleEn: "💡 Remember (सम्झनुहोस्)",
          defaultTitleNe: "सधैं याद राख्नुहोस्",
          Icon: Lightbulb
        };
    }
  };

  const style = getStyles();
  const Icon = style.Icon;

  return (
    <div
      className={`rounded-2xl border-2 p-5 sm:p-6 my-6 shadow-sm transition-all duration-200 ${style.border} ${style.bg} ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 shadow-xs shrink-0 mt-0.5">
          <Icon className={style.iconColor} size={22} />
        </div>
        <div className="space-y-2 flex-1 min-w-0">
          <div className="space-y-0.5">
            <h4 className={`text-base sm:text-lg font-black tracking-tight ${style.textHeader}`}>
              {titleEn || style.defaultTitleEn}
            </h4>
            {titleNe && (
              <p className="text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-300 font-nepali">
                {titleNe}
              </p>
            )}
          </div>

          {contentEn && (
            <p className="text-base sm:text-[17px] text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
              {contentEn}
            </p>
          )}

          {contentNe && (
            <p className="text-base sm:text-[17px] text-gray-700 dark:text-gray-300 font-nepali leading-relaxed pt-2 border-t border-black/5 dark:border-white/5">
              {contentNe}
            </p>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};
