import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MousePointer, Folder, FileText, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";

interface DragDropFilePracticeProps {
  onComplete?: () => void;
}

export const DragDropFilePractice: React.FC<DragDropFilePracticeProps> = ({ onComplete }) => {
  const [fileLocation, setFileLocation] = useState<"desktop" | "folder">("desktop");
  const [isHoveringFolder, setIsHoveringFolder] = useState(false);
  const [actionHistory, setActionHistory] = useState<string[]>([]);

  const handleMoveFile = () => {
    setFileLocation("folder");
    setActionHistory(prev => [...prev, "Dragged 'Nepal_Report.docx' into 'Office Documents' folder"]);
    if (onComplete) {
      onComplete();
    }
  };

  const handleReset = () => {
    setFileLocation("desktop");
    setActionHistory([]);
    setIsHoveringFolder(false);
  };

  return (
    <Card className="border-2 border-orange-500/30 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm my-8">
      <CardContent className="p-0 space-y-7">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-gray-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MousePointer className="text-orange-500" size={24} />
              <Badge className="bg-orange-500 text-white font-black text-xs px-3.5 py-1 uppercase tracking-wider">
                MOUSE SKILL PRACTICE
              </Badge>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 font-nepali">माउस अभ्यास</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              Drag-and-Drop Practice: Move File into Folder
            </h3>
            <p className="text-base font-bold text-orange-600 dark:text-orange-400 font-nepali">
              फाइललाई थिचेर (Drag गरी) फोल्डरभित्र राख्ने (Drop गर्ने) अभ्यास गर्नुहोस्
            </p>
          </div>

          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="rounded-full text-xs font-bold border-gray-300 dark:border-slate-700 self-start sm:self-center"
          >
            <RotateCcw size={14} className="mr-1.5" /> Reset Desktop
          </Button>
        </div>

        {/* Instructions */}
        <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-sm sm:text-base font-bold text-blue-950 dark:text-blue-200 space-y-1">
          <p>🎯 <strong>Objective:</strong> Click or drag the document icon <strong>"Nepal_Report.docx"</strong> and drop it into the <strong>"Office Documents"</strong> folder.</p>
          <p className="font-nepali text-blue-900 dark:text-blue-300 font-semibold">लक्ष्य: "Nepal_Report.docx" फाइललाई छानेर "Office Documents" फोल्डरमा सार्नुहोस्।</p>
        </div>

        {/* Simulated Desktop Workspace */}
        <div className="min-h-[260px] bg-gradient-to-br from-slate-100 via-sky-50 to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 rounded-3xl p-8 border-2 border-slate-300 dark:border-slate-800 relative flex flex-col sm:flex-row items-center justify-around gap-8 shadow-inner overflow-hidden">
          {/* Wallpaper subtle tag */}
          <span className="absolute top-3 left-4 text-[11px] font-black uppercase text-slate-400">
            SIMULATED DESKTOP SCREEN
          </span>

          {/* Desktop File Item */}
          {fileLocation === "desktop" ? (
            <div
              onClick={handleMoveFile}
              onMouseEnter={() => setIsHoveringFolder(true)}
              onMouseLeave={() => setIsHoveringFolder(false)}
              className="cursor-pointer group flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border-2 border-blue-300 dark:border-blue-700 hover:border-orange-500 hover:shadow-2xl transition-all scale-100 hover:scale-105 select-none animate-bounce"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <FileText size={36} />
              </div>
              <span className="text-xs sm:text-sm font-black text-gray-900 dark:text-white group-hover:text-orange-500">
                Nepal_Report.docx
              </span>
              <Badge className="bg-orange-500 text-white text-[10px] font-black px-2 py-0.5">
                CLICK TO DRAG 👆
              </Badge>
            </div>
          ) : (
            <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 text-center text-slate-400 text-xs font-bold">
              [Desktop Space Empty - File moved]
            </div>
          )}

          {/* Arrow Indicator */}
          <div className="text-center space-y-1">
            <span className="text-2xl font-black text-orange-500">➔</span>
            <span className="block text-[11px] font-bold text-gray-500">Drag & Drop Target</span>
          </div>

          {/* Folder Target */}
          <div
            onClick={handleMoveFile}
            className={`cursor-pointer flex flex-col items-center gap-2 p-6 rounded-3xl border-3 transition-all select-none min-w-[180px] ${
              fileLocation === "folder"
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-xl"
                : isHoveringFolder
                ? "bg-orange-50 dark:bg-orange-950/40 border-orange-500 scale-105"
                : "bg-white/90 dark:bg-slate-800/90 border-amber-300 dark:border-amber-700 hover:border-orange-500"
            }`}
          >
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-colors ${
              fileLocation === "folder"
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
            }`}>
              <Folder size={44} />
            </div>

            <span className="text-sm sm:text-base font-black text-gray-900 dark:text-white">
              Office Documents
            </span>

            <Badge className={`${fileLocation === "folder" ? "bg-emerald-600" : "bg-slate-700"} text-white text-[10px] font-bold px-2 py-0.5`}>
              {fileLocation === "folder" ? "1 File Inside (भित्र राखियो)" : "Drop Target"}
            </Badge>
          </div>
        </div>

        {/* Success Banner */}
        {fileLocation === "folder" && (
          <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h4 className="font-black text-lg text-emerald-950 dark:text-emerald-100">
                  Great Job! File Successfully Moved (फाइल सुरक्षित सारियो)
                </h4>
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  You have successfully performed a Drag-and-Drop file organization task.
                </p>
              </div>
            </div>

            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-bold border-2 border-emerald-300 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100"
            >
              <RotateCcw size={14} className="mr-1.5" /> Practice Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
