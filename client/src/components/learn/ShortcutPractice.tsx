import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CheckCircle2, Sparkles, RotateCcw, Copy, Clipboard, Undo, Search, Save, Printer } from "lucide-react";

interface ShortcutChallenge {
  id: string;
  name: string;
  nameNe: string;
  keys: string[];
  goalEn: string;
  goalNe: string;
  demoText: string;
}

const challenges: ShortcutChallenge[] = [
  {
    id: "copy-paste",
    name: "Ctrl + C & Ctrl + V (प्रतिलिपि र टाँस्ने)",
    nameNe: "कपी र पेस्ट सर्टकट",
    keys: ["Ctrl", "C", "Ctrl", "V"],
    goalEn: "Duplicate the text without typing it again.",
    goalNe: "टाइप नगरी अक्षरहरू तुरुन्तै प्रतिलिपि गरेर अर्को ठाउँमा राख्नुहोस्।",
    demoText: "Namaste Nepal 🇳🇵 - Welcome to AI Guru!"
  },
  {
    id: "undo",
    name: "Ctrl + Z (गल्ती सच्याउने / अनडू)",
    nameNe: "अनडू सर्टकट",
    keys: ["Ctrl", "Z"],
    goalEn: "Instantly reverse the last accidental deletion.",
    goalNe: "भुलवश मेटिएको वा गरिएको गल्ती तत्काल फिर्ता ल्याउनुहोस्।",
    demoText: "Important Office Report Draft 2026"
  },
  {
    id: "select-all",
    name: "Ctrl + A (सबै छान्ने)",
    nameNe: "Select All सर्टकट",
    keys: ["Ctrl", "A"],
    goalEn: "Select every single word on the screen at once.",
    goalNe: "स्क्रिनमा भएका सम्पूर्ण अक्षरहरू एकै क्लिकमा छान्नुहोस्।",
    demoText: "Kathmandu, Pokhara, Chitwan, Biratnagar, Lalitpur, Butwal"
  },
  {
    id: "save",
    name: "Ctrl + S (फाइल सुरक्षित गर्ने)",
    nameNe: "सेभ सर्टकट",
    keys: ["Ctrl", "S"],
    goalEn: "Save your document to prevent losing work during power cuts.",
    goalNe: "काम हराउन नदिन तत्काल फाइल सुरक्षित (Save) गर्नुहोस्।",
    demoText: "Final_Exam_Project_Submission.docx"
  }
];

interface ShortcutPracticeProps {
  onComplete?: () => void;
}

export const ShortcutPractice: React.FC<ShortcutPracticeProps> = ({ onComplete }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copiedText, setCopiedText] = useState("");
  const [editorText, setEditorText] = useState(challenges[0].demoText);
  const [statusMessage, setStatusMessage] = useState("");
  const [completedList, setCompletedList] = useState<{ [id: string]: boolean }>({});

  const currentCh = challenges[activeIdx];

  const handleSimulateKey = (action: string) => {
    if (action === "copy") {
      setCopiedText(editorText);
      setStatusMessage("✓ Text copied to Clipboard using Ctrl + C! Now click Paste (Ctrl + V).");
      setCompletedList(prev => ({ ...prev, [currentCh.id]: true }));
      onComplete?.();
    } else if (action === "paste") {
      if (copiedText) {
        setEditorText(prev => prev + " " + copiedText);
        setStatusMessage("✓ Text successfully pasted using Ctrl + V!");
        setCompletedList(prev => ({ ...prev, [currentCh.id]: true }));
        onComplete?.();
      } else {
        setStatusMessage("⚠️ Please click Copy (Ctrl + C) first before Pasting!");
      }
    } else if (action === "undo") {
      setEditorText(currentCh.demoText);
      setStatusMessage("✓ Action reversed using Ctrl + Z!");
      setCompletedList(prev => ({ ...prev, [currentCh.id]: true }));
      onComplete?.();
    } else if (action === "select-all") {
      setStatusMessage("✓ All text selected using Ctrl + A!");
      setCompletedList(prev => ({ ...prev, [currentCh.id]: true }));
      onComplete?.();
    } else if (action === "save") {
      setStatusMessage("✓ Document saved to local storage with Ctrl + S!");
      setCompletedList(prev => ({ ...prev, [currentCh.id]: true }));
      onComplete?.();
    }
  };

  const handleSelectChallenge = (idx: number) => {
    setActiveIdx(idx);
    setEditorText(challenges[idx].demoText);
    setStatusMessage("");
    setCopiedText("");
  };

  return (
    <Card className="border-2 border-orange-500/30 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm my-8">
      <CardContent className="p-0 space-y-7">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-gray-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Command className="text-orange-500" size={24} />
              <Badge className="bg-orange-500 text-white font-black text-xs px-3.5 py-1 uppercase tracking-wider">
                SHORTCUT SIMULATOR
              </Badge>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 font-nepali">सर्टकट अभ्यास</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              Interactive Keyboard Shortcut Lab
            </h3>
            <p className="text-base font-bold text-orange-600 dark:text-orange-400 font-nepali">
              दैनिक आवश्यक किबोर्ड सर्टकटहरू प्रयोग गरी अभ्यास गर्नुहोस्
            </p>
          </div>
        </div>

        {/* Challenge Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {challenges.map((c, i) => (
            <button
              key={c.id}
              onClick={() => handleSelectChallenge(i)}
              className={`p-3.5 rounded-2xl text-left border-2 transition-all space-y-1 ${
                activeIdx === i
                  ? "bg-orange-50 dark:bg-orange-950/40 border-orange-500 shadow-md"
                  : "bg-slate-50 dark:bg-slate-800/60 border-gray-200 dark:border-slate-800 hover:border-orange-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-gray-400">Task #{i + 1}</span>
                {completedList[c.id] && <CheckCircle2 size={16} className="text-emerald-500" />}
              </div>
              <p className="text-xs sm:text-sm font-black text-gray-900 dark:text-white leading-tight">
                {c.name.split(" ")[0]} {c.name.split(" ")[1]}
              </p>
            </button>
          ))}
        </div>

        {/* Active Challenge Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border-2 border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h4 className="text-xl font-black text-orange-400">
                {currentCh.name}
              </h4>
              <p className="text-sm font-bold text-slate-300 font-nepali">
                {currentCh.goalNe}
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-sm font-black">
              {currentCh.keys.map((k, idx) => (
                <React.Fragment key={idx}>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-orange-400">
                    {k}
                  </span>
                  {idx < currentCh.keys.length - 1 && idx % 2 === 0 && <span className="text-slate-500">+</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Interactive Document Area */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              DOCUMENT EDITOR PREVIEW:
            </span>
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-sm sm:text-base font-mono text-emerald-400 min-h-[90px] flex items-center">
              "{editorText}"
            </div>
          </div>

          {/* Shortcut Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {activeIdx === 0 && (
              <>
                <Button
                  onClick={() => handleSimulateKey("copy")}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-xl px-6 py-5 text-xs shadow-md"
                >
                  <Copy size={16} className="mr-2" /> Press [Ctrl + C] (Copy)
                </Button>
                <Button
                  onClick={() => handleSimulateKey("paste")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl px-6 py-5 text-xs shadow-md"
                >
                  <Clipboard size={16} className="mr-2" /> Press [Ctrl + V] (Paste)
                </Button>
              </>
            )}

            {activeIdx === 1 && (
              <Button
                onClick={() => handleSimulateKey("undo")}
                className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl px-6 py-5 text-xs shadow-md"
              >
                <Undo size={16} className="mr-2" /> Press [Ctrl + Z] (Undo / सच्याउनुहोस्)
              </Button>
            )}

            {activeIdx === 2 && (
              <Button
                onClick={() => handleSimulateKey("select-all")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl px-6 py-5 text-xs shadow-md"
              >
                <Command size={16} className="mr-2" /> Press [Ctrl + A] (Select All)
              </Button>
            )}

            {activeIdx === 3 && (
              <Button
                onClick={() => handleSimulateKey("save")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl px-6 py-5 text-xs shadow-md"
              >
                <Save size={16} className="mr-2" /> Press [Ctrl + S] (Save File)
              </Button>
            )}
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-orange-500/50 text-sm font-bold text-orange-200 animate-in fade-in">
              {statusMessage}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
