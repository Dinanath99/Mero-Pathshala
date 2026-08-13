import React, { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LessonCodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const LessonCodeBlock: React.FC<LessonCodeBlockProps> = ({ code, language = "javascript", title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
      <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <Code2 size={16} className="text-orange-400" />
          <span>{title || language}</span>
        </div>
        <Button
          onClick={handleCopy}
          size="sm"
          variant="ghost"
          className="h-8 px-3 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} className="mr-1.5 text-emerald-400" /> Copied!
            </>
          ) : (
            <>
              <Copy size={14} className="mr-1.5" /> Copy Code
            </>
          )}
        </Button>
      </div>
      <div className="p-6 overflow-x-auto text-sm font-mono text-emerald-300 leading-relaxed">
        <pre>{code}</pre>
      </div>
    </div>
  );
};
