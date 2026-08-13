import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  FileArchive,
  Film,
  Music,
  FileCode,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  RotateCw,
  Sparkles,
  ShieldCheck,
  AppWindow
} from "lucide-react";

interface ExtensionInfo {
  ext: string;
  nameEn: string;
  nameNe: string;
  category: "doc" | "sheet" | "image" | "media" | "archive" | "exec";
  defaultAppEn: string;
  defaultAppNe: string;
  purposeEn: string;
  purposeNe: string;
  icon: any;
  color: string;
}

const EXTENSION_DATA: ExtensionInfo[] = [
  {
    ext: ".pdf",
    nameEn: "Portable Document Format",
    nameNe: "पोर्टेबल डकुमेन्ट फर्म्याट (PDF)",
    category: "doc",
    defaultAppEn: "Adobe Acrobat Reader, Google Chrome, Edge",
    defaultAppNe: "एडोबी एक्रोब्याट, गुगल क्रोम",
    purposeEn: "Read-only documents, official government forms, resumes, and certificates that look the same on any device.",
    purposeNe: "कुनै पनि डिभाइसमा डिजाइन नबिग्रिने सरकारी फारम, बायोडाटा र प्रमाणपत्रहरू।",
    icon: FileText,
    color: "text-red-500 bg-red-500/10 border-red-500/30"
  },
  {
    ext: ".docx",
    nameEn: "Microsoft Word Document",
    nameNe: "माइक्रोसफ्ट वर्ड डकुमेन्ट",
    category: "doc",
    defaultAppEn: "Microsoft Word, LibreOffice Writer, Google Docs",
    defaultAppNe: "माइक्रोसफ्ट वर्ड, गुगल डक्स",
    purposeEn: "Editable text documents, letters, reports, and class assignments.",
    purposeNe: "सम्पादन गर्न सकिने चिठी, रिपोर्ट र असाइनमेन्टहरू।",
    icon: FileText,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/30"
  },
  {
    ext: ".xlsx",
    nameEn: "Microsoft Excel Spreadsheet",
    nameNe: "माइक्रोसफ्ट एक्सेल स्प्रेडसिट",
    category: "sheet",
    defaultAppEn: "Microsoft Excel, Google Sheets",
    defaultAppNe: "माइक्रोसफ्ट एक्सेल, गुगल सिट्स",
    purposeEn: "Tables with rows and columns, financial budgets, accounting, and grade sheets.",
    purposeNe: "हिसाब-किताब, घरायसी वा अफिसको बजेट र नतिजा तालिका।",
    icon: FileSpreadsheet,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30"
  },
  {
    ext: ".pptx",
    nameEn: "PowerPoint Presentation",
    nameNe: "पावरपोइन्ट प्रेजेन्टेसन",
    category: "doc",
    defaultAppEn: "Microsoft PowerPoint, Google Slides",
    defaultAppNe: "पावरपोइन्ट, गुगल स्न्याइड्स",
    purposeEn: "Slide decks with graphics, animations, and charts for meetings and classroom lectures.",
    purposeNe: "मिटिङ र कक्षाकोठामा स्लाइड देखाएर प्रस्तुति दिन।",
    icon: AppWindow,
    color: "text-orange-500 bg-orange-500/10 border-orange-500/30"
  },
  {
    ext: ".jpg / .jpeg",
    nameEn: "Joint Photographic Experts Group (Photo)",
    nameNe: "डिजिटल फोटो (JPG)",
    category: "image",
    defaultAppEn: "Windows Photos, IrfanView, Photoshop",
    defaultAppNe: "विन्डोज फोटोज, फोटोशप",
    purposeEn: "Standard compressed camera photographs and citizenship scan pictures.",
    purposeNe: "क्यामेराबाट खिचिएका तस्बिर र नागरिकताको फोटो।",
    icon: ImageIcon,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/30"
  },
  {
    ext: ".png",
    nameEn: "Portable Network Graphics (Transparent)",
    nameNe: "पारदर्शी तस्बिर (PNG)",
    category: "image",
    defaultAppEn: "Windows Photos, Web Browsers",
    defaultAppNe: "विन्डोज फोटोज, ब्राउजर",
    purposeEn: "High-quality graphic logos, icons, and screenshots with transparent backgrounds.",
    purposeNe: "कम्प्युटर स्क्रिनसट, लोगो र पारदर्शी पृष्ठभूमि भएका तस्बिर।",
    icon: ImageIcon,
    color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30"
  },
  {
    ext: ".mp4",
    nameEn: "MPEG-4 Digital Video",
    nameNe: "डिजिटल भिडियो (MP4)",
    category: "media",
    defaultAppEn: "VLC Media Player, Windows Media Player",
    defaultAppNe: "VLC प्लेयर, विन्डोज मिडिया प्लेयर",
    purposeEn: "Recorded video clips, online video lectures, and movie files with audio.",
    purposeNe: "अनलाइन कक्षाका भिडियो, रेकर्डिङ र चलचित्रहरू।",
    icon: Film,
    color: "text-pink-500 bg-pink-500/10 border-pink-500/30"
  },
  {
    ext: ".mp3",
    nameEn: "MPEG Audio Layer III (Sound)",
    nameNe: "अडियो गीत वा आवाज (MP3)",
    category: "media",
    defaultAppEn: "VLC Media Player, Spotify, Groove Music",
    defaultAppNe: "म्युजिक प्लेयर, VLC",
    purposeEn: "Digital music tracks, podcasts, and recorded audio speeches.",
    purposeNe: "रेकर्ड गरिएको आवाज, गीत र पोडकास्ट।",
    icon: Music,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/30"
  },
  {
    ext: ".zip",
    nameEn: "Compressed Archive",
    nameNe: "कम्प्रेस गरिएको ZIP फाइल",
    category: "archive",
    defaultAppEn: "Windows File Explorer, WinRAR, 7-Zip",
    defaultAppNe: "विन्डोज एक्सप्लोरर, WinRAR",
    purposeEn: "Bundles multiple files and folders into a single smaller file for fast email and web transfer.",
    purposeNe: "धेरै फाइललाई एकै ठाउँमा बाँधेर साइज घटाउने आर्काइभ।",
    icon: FileArchive,
    color: "text-yellow-600 bg-yellow-500/10 border-yellow-500/30"
  },
  {
    ext: ".exe",
    nameEn: "Windows Executable Program",
    nameNe: "सफ्टवेयर इन्स्टल गर्ने फाइल (EXE)",
    category: "exec",
    defaultAppEn: "Windows Operating System",
    defaultAppNe: "विन्डोज अपरेटिङ सिस्टम",
    purposeEn: "Executable program installation files. CAUTION: Never open unknown .exe files from unverified emails!",
    purposeNe: "एप इन्स्टल गर्ने प्रोग्राम फाइल। अज्ञात .exe फाइल नखोल्नुहोस्!",
    icon: AlertTriangle,
    color: "text-red-600 bg-red-600/10 border-red-600/30"
  }
];

export const FileExtensionMatcher: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [selectedExt, setSelectedExt] = useState<ExtensionInfo>(EXTENSION_DATA[0]);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [activeQuizQuestion, setActiveQuizQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const QUIZ_ITEMS = [
    {
      question: "Which file extension is best for submitting a non-editable official CV to a Nepali bank?",
      questionNe: "नेपालको बैंकमा आवेदन दिँदा नबिग्रिने बायोडाटाका लागि कुन एक्सटेन्सन उपयुक्त हुन्छ?",
      options: [".docx", ".pdf", ".mp3", ".exe"],
      correct: 1,
      explanation: ".pdf preserves exact fonts and formatting across any computer or mobile."
    },
    {
      question: "A suspicious email contains an attachment named 'Electricity_Bill.pdf.exe'. What is this file actually?",
      questionNe: "'Electricity_Bill.pdf.exe' नामको फाइल वास्तवमा के हो?",
      options: ["A normal PDF document", "An image file", "A potentially dangerous executable program disguised as PDF", "An Excel table"],
      correct: 2,
      explanation: "Windows looks at the FINAL extension (.exe). This is an executable program, often malware trying to deceive users."
    },
    {
      question: "Which application is standard for opening a '.xlsx' spreadsheet?",
      questionNe: "'.xlsx' फाइल खोल्न कुन सफ्टवेयर प्रयोग गरिन्छ?",
      options: ["Adobe Photoshop", "Microsoft Excel or Google Sheets", "VLC Media Player", "Windows Notepad"],
      correct: 1,
      explanation: ".xlsx files are spreadsheets handled by Excel and Google Sheets."
    },
    {
      question: "You want to email 30 event photos to a colleague. Which format bundles them into one small download?",
      questionNe: "३० वटा तस्बिर एकैसाथ पठाउन साइज घटाएर कुन फर्म्याट बनाउनुपर्छ?",
      options: [".zip", ".mp3", ".exe", ".pptx"],
      correct: 0,
      explanation: "A .zip archive compresses multiple files and folders into a single download."
    }
  ];

  const handleSelectAnswer = (index: number) => {
    const nextAnswers = [...userAnswers, index];
    setUserAnswers(nextAnswers);

    if (activeQuizQuestion < QUIZ_ITEMS.length - 1) {
      setActiveQuizQuestion(activeQuizQuestion + 1);
    } else {
      // Calculate score
      let score = 0;
      nextAnswers.forEach((ans, i) => {
        if (ans === QUIZ_ITEMS[i].correct) score++;
      });
      setQuizScore(score);
      onComplete?.();
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers([]);
    setActiveQuizQuestion(0);
    setQuizScore(null);
  };

  return (
    <div className="space-y-6">
      {/* Interactive File Extension Directory */}
      <Card className="border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-500 text-white font-extrabold text-xs px-3 py-1">
                INTERACTIVE REFERENCE
              </Badge>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                File Extensions & Formats Inspector (फाइल एक्सटेन्सन पहिचान)
              </h3>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              Click any extension below to see its purpose and software
            </span>
          </div>

          {/* Extension selector chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {EXTENSION_DATA.map((item) => {
              const isSelected = selectedExt.ext === item.ext;
              const Icon = item.icon;

              return (
                <button
                  key={item.ext}
                  onClick={() => setSelectedExt(item)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-mono text-xs font-black transition-all ${
                    isSelected
                      ? "bg-orange-500 text-white shadow-md scale-105"
                      : "bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <Icon size={14} className={isSelected ? "text-white" : "text-orange-500"} />
                  <span>{item.ext}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Extension Inspector Card */}
          <div className={`p-6 rounded-3xl border-2 transition-all space-y-4 ${selectedExt.color}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200/50 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
                  <selectedExt.icon size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 dark:text-white font-mono">
                    {selectedExt.ext} — {selectedExt.nameEn}
                  </h4>
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-400 font-nepali">
                    {selectedExt.nameNe}
                  </p>
                </div>
              </div>

              <Badge className="bg-white/80 dark:bg-slate-900/80 text-gray-800 dark:text-gray-200 font-bold text-xs px-3 py-1 self-start sm:self-auto">
                Category: {selectedExt.category.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 space-y-1">
                <span className="font-black text-gray-500 uppercase text-[10px] block">
                  Default Software Application (खोल्ने सफ्टवेयर)
                </span>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {selectedExt.defaultAppEn}
                </p>
                <p className="text-gray-500 font-nepali text-xs">
                  {selectedExt.defaultAppNe}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 space-y-1">
                <span className="font-black text-gray-500 uppercase text-[10px] block">
                  Best Used For (प्रयोग हुने क्षेत्र)
                </span>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {selectedExt.purposeEn}
                </p>
                <p className="text-gray-500 font-nepali text-xs">
                  {selectedExt.purposeNe}
                </p>
              </div>
            </div>

            {selectedExt.ext === ".exe" && (
              <div className="p-3 rounded-2xl bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-800 flex items-center gap-2 text-red-800 dark:text-red-300 text-xs font-bold">
                <AlertTriangle size={18} className="shrink-0 text-red-500" />
                <span>
                  Security Alert: Executable files (.exe) can run code on your PC. Never double-click unknown .exe files received via email or WhatsApp!
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Mini Format Security Quiz */}
      <Card className="border-2 border-orange-500/30 bg-orange-50/40 dark:bg-orange-950/20 rounded-3xl p-6 sm:p-8 shadow-sm">
        <CardContent className="p-0 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-orange-500" size={22} />
              <h4 className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
                File Extension Security Challenge (सुरक्षा परीक्षा)
              </h4>
            </div>
            <Badge variant="outline" className="text-orange-600 dark:text-orange-400 border-orange-400/40 text-xs font-bold">
              {quizScore !== null ? "Completed" : `Question ${activeQuizQuestion + 1} of ${QUIZ_ITEMS.length}`}
            </Badge>
          </div>

          {quizScore === null ? (
            <div className="space-y-4 pt-1">
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-black text-gray-900 dark:text-white">
                  {QUIZ_ITEMS[activeQuizQuestion].question}
                </p>
                <p className="text-xs font-bold text-orange-600 dark:text-orange-400 font-nepali">
                  {QUIZ_ITEMS[activeQuizQuestion].questionNe}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {QUIZ_ITEMS[activeQuizQuestion].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectAnswer(oIdx)}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-orange-200 dark:border-slate-800 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800 text-left font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-200 transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-orange-200 dark:border-slate-800 text-center space-y-3">
              <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
              <h5 className="text-lg font-black text-gray-900 dark:text-white">
                Challenge Complete! Score: {quizScore} / {QUIZ_ITEMS.length}
              </h5>
              <p className="text-xs text-gray-500 font-medium">
                You understand file extensions and safety protocols.
              </p>
              <Button
                onClick={handleResetQuiz}
                variant="outline"
                size="sm"
                className="rounded-full text-xs font-bold"
              >
                <RotateCw size={12} className="mr-1" /> Retake Challenge
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FileExtensionMatcher;
