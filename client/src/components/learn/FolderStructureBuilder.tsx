import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Folder,
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  CheckCircle2,
  RotateCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers
} from "lucide-react";

interface MessyFile {
  id: string;
  name: string;
  category: "career" | "official" | "personal";
  icon: "pdf" | "word" | "excel" | "image";
  assignedFolder?: string;
}

const MESSY_FILES: MessyFile[] = [
  { id: "f1", name: "Dinanath_CV_2026_Final.pdf", category: "career", icon: "pdf" },
  { id: "f2", name: "Nagrikta_Citizenship_Front.jpg", category: "official", icon: "image" },
  { id: "f3", name: "NEA_Electricity_Bill_Magh.pdf", category: "official", icon: "pdf" },
  { id: "f4", name: "Family_Monthly_Budget_2026.xlsx", category: "personal", icon: "excel" },
  { id: "f5", name: "Job_Cover_Letter_Bank.docx", category: "career", icon: "word" },
  { id: "f6", name: "Pokhara_Vacation_Photo.jpg", category: "personal", icon: "image" },
];

const TARGET_FOLDERS = [
  {
    id: "career",
    nameEn: "01_Career_and_Jobs",
    nameNe: "रोजगारी र बायोडाटा",
    descEn: "CVs, Job applications, Portfolio",
    color: "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300",
  },
  {
    id: "official",
    nameEn: "02_Official_Documents",
    nameNe: "सरकारी कागजात र बिलहरू",
    descEn: "Citizenship, Passport, Electricity bills",
    color: "border-purple-400 bg-purple-50/50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300",
  },
  {
    id: "personal",
    nameEn: "03_Personal_and_Finance",
    nameNe: "व्यक्तिगत, फोटो र हिसाब",
    descEn: "Family photos, Monthly budget spreadsheets",
    color: "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300",
  },
];

export const FolderStructureBuilder: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [files, setFiles] = useState<MessyFile[]>(MESSY_FILES);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const unassignedFiles = files.filter((f) => !f.assignedFolder);
  const isComplete = unassignedFiles.length === 0;

  const handleAssignToFolder = (folderId: string) => {
    if (!selectedFileId) return;
    const file = files.find((f) => f.id === selectedFileId);
    if (!file) return;

    if (file.category === folderId) {
      setFiles((prev) =>
        prev.map((f) => (f.id === selectedFileId ? { ...f, assignedFolder: folderId } : f))
      );
      setSelectedFileId(null);
      if (files.filter((f) => !f.assignedFolder).length === 1) {
        onComplete?.();
      }
    } else {
      alert(`Tip: "${file.name}" belongs in a different category folder for clean organization!`);
    }
  };

  const handleReset = () => {
    setFiles(MESSY_FILES);
    setSelectedFileId(null);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="text-red-500 shrink-0" size={18} />;
      case "word":
        return <FileText className="text-blue-500 shrink-0" size={18} />;
      case "excel":
        return <FileSpreadsheet className="text-emerald-500 shrink-0" size={18} />;
      case "image":
        return <ImageIcon className="text-purple-500 shrink-0" size={18} />;
      default:
        return <FileText className="text-gray-400 shrink-0" size={18} />;
    }
  };

  return (
    <Card className="border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
              <Layers size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge className="bg-orange-500 text-white font-extrabold text-[10px] px-2 py-0.5">
                  HANDS-ON CHALLENGE
                </Badge>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">
                  Professional Folder Organizer (व्यवस्थित फोल्डर बनाउने अभ्यास)
                </h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-nepali">
                डेस्कटपमा छरिएका फाइलहरूलाई सही फोल्डर छानेर मिलाउनुहोस् र सफा कम्प्युटर बनाउनुहोस्।
              </p>
            </div>
          </div>

          <Button onClick={handleReset} variant="outline" size="sm" className="rounded-full text-xs font-bold">
            <RotateCw size={12} className="mr-1" /> Reset Challenge
          </Button>
        </div>

        {/* Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Loose Cluttered Files (5 cols) */}
          <div className="lg:col-span-5 space-y-3 p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                Unsorted Desktop Files ({unassignedFiles.length})
              </span>
              <span className="text-[11px] text-gray-400">Click a file to select</span>
            </div>

            {unassignedFiles.length > 0 ? (
              <div className="space-y-2">
                {unassignedFiles.map((file) => {
                  const isSelected = selectedFileId === file.id;

                  return (
                    <div
                      key={file.id}
                      onClick={() => setSelectedFileId(file.id)}
                      className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30 ring-2 ring-orange-500/20 shadow-sm"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-orange-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {getFileIcon(file.icon)}
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">
                          {file.name}
                        </span>
                      </div>
                      {isSelected && (
                        <Badge className="bg-orange-500 text-white text-[9px] px-1.5 py-0 shrink-0">
                          Selected
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center space-y-2 border-2 border-dashed border-emerald-400/40 rounded-3xl bg-emerald-50/30 dark:bg-emerald-950/20">
                <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
                <h4 className="font-black text-sm text-emerald-800 dark:text-emerald-300">
                  Clean Desktop Achieved! 🏆
                </h4>
                <p className="text-[11px] text-gray-500 font-nepali">
                  सबै फाइलहरू सफलतापूर्वक आफ्ना फोल्डरमा व्यवस्थापन गरियो।
                </p>
              </div>
            )}
          </div>

          {/* Right: Target Organized Folders (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-black text-gray-600 dark:text-gray-300 uppercase tracking-wide block">
              Click a Folder to Move the Selected File:
            </span>

            <div className="grid grid-cols-1 gap-3">
              {TARGET_FOLDERS.map((folder) => {
                const assignedItems = files.filter((f) => f.assignedFolder === folder.id);

                return (
                  <div
                    key={folder.id}
                    onClick={() => handleAssignToFolder(folder.id)}
                    className={`p-4 rounded-3xl border-2 transition-all cursor-pointer hover:shadow-md ${folder.color} ${
                      selectedFileId ? "ring-2 ring-orange-400/40 animate-pulse" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <Folder size={28} className="shrink-0 mt-0.5 fill-current" />
                        <div>
                          <h4 className="font-black text-sm sm:text-base font-mono">
                            {folder.nameEn}
                          </h4>
                          <h5 className="text-xs font-bold font-nepali opacity-90">
                            {folder.nameNe}
                          </h5>
                          <p className="text-[11px] opacity-75 mt-0.5">{folder.descEn}</p>
                        </div>
                      </div>

                      <Badge variant="secondary" className="font-bold text-xs shrink-0">
                        {assignedItems.length} Files
                      </Badge>
                    </div>

                    {/* Files inside this folder */}
                    {assignedItems.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 space-y-1.5">
                        {assignedItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded-xl bg-white/70 dark:bg-slate-900/70"
                          >
                            {getFileIcon(item.icon)}
                            <span className="truncate">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Completion Banner */}
        {isComplete && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award className="text-emerald-500" size={28} />
              <div>
                <h4 className="text-sm font-black text-emerald-950 dark:text-emerald-200">
                  Folder Structure Mastery Completed! 🎓
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  You know how to maintain an organized file hierarchy in office and personal laptops.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FolderStructureBuilder;
