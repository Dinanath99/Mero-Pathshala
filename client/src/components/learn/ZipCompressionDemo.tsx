import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileArchive,
  FileText,
  Image as ImageIcon,
  Folder,
  FolderArchive,
  ArrowDown,
  CheckCircle2,
  RotateCw,
  Sparkles,
  Zap,
  Download,
  FolderOpen
} from "lucide-react";

interface UncompressedFile {
  id: string;
  name: string;
  sizeMB: number;
  type: "image" | "doc" | "pdf";
  selected: boolean;
}

const INITIAL_FILES: UncompressedFile[] = [
  { id: "1", name: "HighRes_Citizenship_Front.jpg", sizeMB: 4.8, type: "image", selected: true },
  { id: "2", name: "HighRes_Citizenship_Back.jpg", sizeMB: 4.6, type: "image", selected: true },
  { id: "3", name: "Full_Academic_Transcripts.pdf", sizeMB: 5.2, type: "pdf", selected: true },
  { id: "4", name: "Experience_Letter_Scanned.pdf", sizeMB: 3.9, type: "pdf", selected: true },
];

export const ZipCompressionDemo: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [files, setFiles] = useState<UncompressedFile[]>(INITIAL_FILES);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [isCompressed, setIsCompressed] = useState<boolean>(false);
  const [isExtracted, setIsExtracted] = useState<boolean>(false);
  const [zipName, setZipName] = useState<string>("LokSewa_Application_Documents.zip");

  const selectedFiles = files.filter((f) => f.selected);
  const totalOriginalSize = selectedFiles.reduce((acc, f) => acc + f.sizeMB, 0);
  const compressedSize = (totalOriginalSize * 0.35).toFixed(1); // 65% reduction

  const toggleSelect = (id: string) => {
    if (isCompressed) return;
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, selected: !f.selected } : f))
    );
  };

  const handleCompress = () => {
    if (selectedFiles.length === 0) return;
    setIsCompressing(true);
    setTimeout(() => {
      setIsCompressing(false);
      setIsCompressed(true);
      onComplete?.();
    }, 1200);
  };

  const handleExtract = () => {
    setIsExtracted(true);
  };

  const handleReset = () => {
    setFiles(INITIAL_FILES);
    setIsCompressing(false);
    setIsCompressed(false);
    setIsExtracted(false);
  };

  return (
    <Card className="border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
              <FileArchive size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge className="bg-yellow-500 text-white font-extrabold text-[10px] px-2 py-0.5">
                  INTERACTIVE LAB
                </Badge>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">
                  File Compression & ZIP Studio (फाइल कम्प्रेस गर्ने विधि)
                </h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-nepali">
                धेरै फाइलहरूको साइज घटाएर एउटै ZIP फाइल बनाउने र त्यसलाई अनजिप (Extract) गर्ने तरिका सिक्नुहोस्।
              </p>
            </div>
          </div>

          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="rounded-full text-xs font-bold"
          >
            <RotateCw size={12} className="mr-1" /> Reset Demo
          </Button>
        </div>

        {/* Compression Simulation Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left: Original Loose Files */}
          <div className="space-y-3 p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                1. Loose Uncompressed Files ({selectedFiles.length} Selected)
              </span>
              <Badge variant="secondary" className="font-mono text-xs font-bold">
                Total: {totalOriginalSize.toFixed(1)} MB
              </Badge>
            </div>

            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => toggleSelect(file.id)}
                  className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    file.selected
                      ? "border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20 shadow-sm"
                      : "border-slate-200 dark:border-slate-700 opacity-60 bg-white dark:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {file.type === "image" ? (
                      <ImageIcon size={18} className="text-purple-500" />
                    ) : (
                      <FileText size={18} className="text-red-500" />
                    )}
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      {file.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-500">
                    {file.sizeMB} MB
                  </span>
                </div>
              ))}
            </div>

            {!isCompressed && (
              <Button
                onClick={handleCompress}
                disabled={isCompressing || selectedFiles.length === 0}
                className="w-full rounded-2xl bg-yellow-500 hover:bg-yellow-600 text-white font-extrabold text-xs py-5 shadow-md"
              >
                {isCompressing ? (
                  <>
                    <Zap size={16} className="mr-2 animate-bounce text-white" /> Compressing Files...
                  </>
                ) : (
                  <>
                    <FolderArchive size={16} className="mr-2" /> Compress {selectedFiles.length} Files to ZIP (कम्प्रेस गर्नुहोस्)
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Right: Resulting Compressed ZIP Archive */}
          <div className="space-y-4 p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs font-black text-gray-600 dark:text-gray-300 uppercase tracking-wide block">
              2. Single Compressed Archive (.zip)
            </span>

            {isCompressed ? (
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-yellow-500 shadow-lg space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/10 text-yellow-600 flex items-center justify-center">
                  <FileArchive size={36} />
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-black text-gray-900 dark:text-white font-mono">
                    {zipName}
                  </h4>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span className="line-through text-gray-400 font-mono">
                      {totalOriginalSize.toFixed(1)} MB
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-black text-sm">
                      → {compressedSize} MB (65% Smaller!)
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                  ✓ Ready for Email Attachment / Lok Sewa Upload Limit
                </div>

                {!isExtracted ? (
                  <Button
                    onClick={handleExtract}
                    className="w-full rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-4"
                  >
                    <FolderOpen size={16} className="mr-1.5" /> Extract All (सबै फाइल खोल्नुहोस् / Unzip)
                  </Button>
                ) : (
                  <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-300 text-left space-y-2">
                    <div className="flex items-center gap-2 text-orange-600 font-bold text-xs">
                      <CheckCircle2 size={16} /> Extracted to folder: "{zipName.replace(".zip", "")}"
                    </div>
                    <p className="text-[11px] text-gray-600 dark:text-gray-300">
                      All 4 original files are now restored into a normal editable folder!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-56 flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl text-gray-400 space-y-2">
                <FileArchive size={40} className="opacity-40" />
                <p className="text-xs font-semibold">
                  Select files on the left and click "Compress" to generate a lightweight ZIP archive.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Educational Callout */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs">
          <Sparkles className="text-amber-500 shrink-0 mt-0.5" size={18} />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950 dark:text-amber-200">
              Golden Rule of ZIP Archives (ZIP फाइलको नियम):
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Never edit documents while they are locked inside a ZIP folder! Always click **"Extract All"** (Unzip) first so Windows creates a normal folder where your changes are safely saved.
            </p>
            <p className="text-amber-700 dark:text-amber-400 font-nepali italic">
              ZIP भित्र सिधै खोलेर काम गर्दा फाइल सेभ नहुन सक्छ; सधैं पहिले 'Extract All' गरेर मात्र फाइल खोल्नुहोस्।
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ZipCompressionDemo;
