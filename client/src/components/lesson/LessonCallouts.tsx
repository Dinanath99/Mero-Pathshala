import React from "react";
import { Lightbulb, AlertCircle, CheckCircle2, AlertTriangle, FileText, Sparkles } from "lucide-react";

interface CalloutCardProps {
  title?: string;
  titleNe?: string;
  children?: React.ReactNode;
  englishText?: string;
  nepaliText?: string;
}

export const KeyConceptCard: React.FC<CalloutCardProps> = ({ title = "Key Concept", titleNe, children, englishText, nepaliText }) => (
  <div className="my-8 bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-blue-500 rounded-r-3xl p-6 sm:p-7 shadow-sm transition-all duration-300 ease-out hover:scale-[0.98] hover:shadow-md">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
        <Sparkles size={20} />
      </div>
      <div>
        <h4 className="text-base font-extrabold text-blue-900 dark:text-blue-200">{title}</h4>
        {titleNe && <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-serif">{titleNe}</span>}
      </div>
    </div>
    <div className="space-y-2 text-sm md:text-base leading-relaxed text-blue-950 dark:text-blue-100">
      {englishText && <p className="font-medium">{englishText}</p>}
      {nepaliText && <p className="text-xs md:text-sm text-blue-700 dark:text-blue-300/90 font-medium font-serif leading-relaxed">{nepaliText}</p>}
      {children}
    </div>
  </div>
);

export const ImportantNoteCard: React.FC<CalloutCardProps> = ({ title = "Important Note", titleNe, children, englishText, nepaliText }) => (
  <div className="my-8 bg-amber-50/80 dark:bg-amber-950/40 border-l-4 border-amber-500 rounded-r-3xl p-6 sm:p-7 shadow-sm transition-all duration-300 ease-out hover:scale-[0.98] hover:shadow-md">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
        <AlertCircle size={20} />
      </div>
      <div>
        <h4 className="text-base font-extrabold text-amber-900 dark:text-amber-200">{title}</h4>
        {titleNe && <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-serif">{titleNe}</span>}
      </div>
    </div>
    <div className="space-y-2 text-sm md:text-base leading-relaxed text-amber-950 dark:text-amber-100">
      {englishText && <p className="font-medium">{englishText}</p>}
      {nepaliText && <p className="text-xs md:text-sm text-amber-800 dark:text-amber-300/90 font-medium font-serif leading-relaxed">{nepaliText}</p>}
      {children}
    </div>
  </div>
);

export const TipCard: React.FC<CalloutCardProps> = ({ title = "Pro Tip", titleNe, children, englishText, nepaliText }) => (
  <div className="my-8 bg-emerald-50/80 dark:bg-emerald-950/40 border-l-4 border-emerald-500 rounded-r-3xl p-6 sm:p-7 shadow-sm transition-all duration-300 ease-out hover:scale-[0.98] hover:shadow-md">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
        <CheckCircle2 size={20} />
      </div>
      <div>
        <h4 className="text-base font-extrabold text-emerald-900 dark:text-emerald-200">{title}</h4>
        {titleNe && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-serif">{titleNe}</span>}
      </div>
    </div>
    <div className="space-y-2 text-sm md:text-base leading-relaxed text-emerald-950 dark:text-emerald-100">
      {englishText && <p className="font-medium">{englishText}</p>}
      {nepaliText && <p className="text-xs md:text-sm text-emerald-800 dark:text-emerald-300/90 font-medium font-serif leading-relaxed">{nepaliText}</p>}
      {children}
    </div>
  </div>
);

export const WarningCard: React.FC<CalloutCardProps> = ({ title = "Warning / Caution", titleNe, children, englishText, nepaliText }) => (
  <div className="my-8 bg-orange-50/80 dark:bg-orange-950/40 border-l-4 border-orange-500 rounded-r-3xl p-6 sm:p-7 shadow-sm transition-all duration-300 ease-out hover:scale-[0.98] hover:shadow-md">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
        <AlertTriangle size={20} />
      </div>
      <div>
        <h4 className="text-base font-extrabold text-orange-900 dark:text-orange-200">{title}</h4>
        {titleNe && <span className="text-xs font-bold text-orange-600 dark:text-orange-400 font-serif">{titleNe}</span>}
      </div>
    </div>
    <div className="space-y-2 text-sm md:text-base leading-relaxed text-orange-950 dark:text-orange-100">
      {englishText && <p className="font-medium">{englishText}</p>}
      {nepaliText && <p className="text-xs md:text-sm text-orange-800 dark:text-orange-300/90 font-medium font-serif leading-relaxed">{nepaliText}</p>}
      {children}
    </div>
  </div>
);

export const ExampleCard: React.FC<CalloutCardProps> = ({ title = "Real-World Example", titleNe, children, englishText, nepaliText }) => (
  <div className="my-4 bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-7 shadow-sm transition-all duration-300 ease-out hover:scale-[0.98] hover:shadow-md">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
        <FileText size={20} />
      </div>
      <div>
        <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{title}</h4>
        {titleNe && <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-serif">{titleNe}</span>}
      </div>
    </div>
    <div className="space-y-2 text-sm md:text-base leading-relaxed text-slate-800 dark:text-slate-200">
      {englishText && <p className="font-medium">{englishText}</p>}
      {nepaliText && <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium font-serif leading-relaxed">{nepaliText}</p>}
      {children}
    </div>
  </div>
);

export interface SummaryItem {
  en: string;
  ne?: string;
}

export interface SummaryCardProps {
  title?: string;
  titleNe?: string;
  items?: (string | SummaryItem)[];
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title = "Key Takeaways", titleNe = "मुख्य कुराहरू", items = [] }) => (
  <div className="my-10 bg-slate-900 dark:bg-slate-900/95 text-white rounded-3xl p-7 sm:p-9 border border-slate-800 shadow-xl space-y-6 transition-all duration-300 ease-out hover:scale-[0.98]">
    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
      <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
        <Lightbulb size={22} />
      </div>
      <div>
        <h3 className="text-xl font-extrabold text-white">{title}</h3>
        <span className="text-xs font-bold text-orange-400 font-serif">{titleNe}</span>
      </div>
    </div>
    <ul className="space-y-4">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3.5 group">
          <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-orange-500 group-hover:text-white transition-colors">
            {idx + 1}
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-slate-100 text-sm sm:text-base leading-relaxed">{typeof item === 'string' ? item : item.en}</p>
            {typeof item !== 'string' && item.ne && (
              <p className="text-xs sm:text-sm text-slate-400 font-medium font-serif leading-relaxed">{item.ne}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);
