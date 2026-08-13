import React from "react";
import { Misconception } from "@/pages/learn/computerSkillsData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { XCircle, CheckCircle2, AlertTriangle } from "lucide-react";

interface MisconceptionCardProps {
  items: Misconception[];
}

export const MisconceptionCard: React.FC<MisconceptionCardProps> = ({ items }) => {
  return (
    <div className="space-y-5 my-8">
      <div className="flex items-center gap-2.5">
        <AlertTriangle className="text-amber-500" size={24} />
        <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
          Common Misconceptions (सामान्य भ्रम र वास्तविकता)
        </h4>
      </div>

      <div className="space-y-5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 rounded-3xl p-6 border-2 border-amber-200 dark:border-amber-900/40 bg-amber-50/20 dark:bg-amber-950/10"
          >
            {/* Myth Column */}
            <div className="p-5 sm:p-6 rounded-2xl bg-red-50/90 dark:bg-red-950/40 border-2 border-red-200 dark:border-red-900/50 space-y-3">
              <div className="flex items-center gap-2">
                <XCircle size={22} className="text-red-500 shrink-0" />
                <Badge className="bg-red-600 text-white font-black text-xs px-3 py-1 uppercase tracking-wider">
                  MYTH (सामान्य भ्रम)
                </Badge>
              </div>
              <p className="text-base sm:text-lg font-black text-red-950 dark:text-red-100 leading-relaxed">
                "{item.mythEn}"
              </p>
              {item.mythNe && (
                <p className="text-base font-nepali font-semibold text-red-900 dark:text-red-200 leading-relaxed pt-2 border-t border-red-200 dark:border-red-900">
                  "{item.mythNe}"
                </p>
              )}
            </div>

            {/* Reality Column */}
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-900/50 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={22} className="text-emerald-500 shrink-0" />
                <Badge className="bg-emerald-600 text-white font-black text-xs px-3 py-1 uppercase tracking-wider">
                  REALITY (वास्तविकता)
                </Badge>
              </div>
              <p className="text-base sm:text-lg font-bold text-emerald-950 dark:text-emerald-100 leading-relaxed">
                {item.realityEn}
              </p>
              {item.realityNe && (
                <p className="text-base font-nepali font-semibold text-emerald-900 dark:text-emerald-200 leading-relaxed pt-2 border-t border-emerald-200 dark:border-emerald-900">
                  {item.realityNe}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
