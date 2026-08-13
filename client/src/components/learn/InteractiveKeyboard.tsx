import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Keyboard, Sparkles, HelpCircle, Info } from "lucide-react";

interface KeyInfo {
  key: string;
  labelEn: string;
  labelNe: string;
  descEn: string;
  descNe: string;
  category: "letter" | "number" | "modifier" | "action" | "navigation" | "function";
  shortcutExample?: string;
}

const keyDatabase: { [k: string]: KeyInfo } = {
  "Enter": {
    key: "Enter (रिटर्न)",
    labelEn: "Enter / Return Key",
    labelNe: "इन्टर की",
    descEn: "Executes a command, confirms a choice, or creates a new line in text documents.",
    descNe: "कुनै आदेश कार्यान्वयन गर्न, फारम बुझाउन वा नयाँ अनुच्छेद (लाइन) सुरु गर्न प्रयोग गरिन्छ।",
    category: "action",
    shortcutExample: "Press Enter to submit form or start new line"
  },
  "Space": {
    key: "Spacebar (खाली ठाउँ)",
    labelEn: "Spacebar Key",
    labelNe: "स्पेसबार की",
    descEn: "Inserts a single blank space between words, letters, or numbers.",
    descNe: "शब्द, अक्षर वा संख्याहरू बीचमा खाली ठाउँ (स्पेस) राख्न प्रयोग गरिन्छ।",
    category: "action",
    shortcutExample: "Type word -> Spacebar -> Type next word"
  },
  "Backspace": {
    key: "Backspace (पछाडि मेटाउने)",
    labelEn: "Backspace Key",
    labelNe: "ब्याकस्पेस की",
    descEn: "Deletes the character directly to the LEFT of your text cursor.",
    descNe: "कर्सरको देब्रेपट्टि (पछाडि) रहेको अक्षर वा शब्द मेटाउन प्रयोग गरिन्छ।",
    category: "action",
    shortcutExample: "Remove misspelled characters before cursor"
  },
  "Delete": {
    key: "Delete (अगाडि मेटाउने)",
    labelEn: "Delete Key (Del)",
    labelNe: "डिलिट की",
    descEn: "Deletes the character to the RIGHT of your cursor, or removes selected files/items.",
    descNe: "कर्सरको दायाँपट्टि रहेको अक्षर मेटाउन वा छानिएका फाइल/फोल्डर हटाउन प्रयोग गरिन्छ।",
    category: "action",
    shortcutExample: "Select file + Del = Move to Recycle Bin"
  },
  "Shift": {
    key: "Shift (क्यापिटल / चिन्ह)",
    labelEn: "Shift Modifier Key",
    labelNe: "सिफ्ट की",
    descEn: "Hold Shift to type capital uppercase letters or secondary symbols printed on number keys (like @, #, $, %).",
    descNe: "ठूलो (Capital) अक्षर टाइप गर्न वा नम्बर की माथिका चिन्हहरू (@, $, %) निकाल्न थिचिन्छ।",
    category: "modifier",
    shortcutExample: "Shift + a = A | Shift + 2 = @"
  },
  "Ctrl": {
    key: "Ctrl (कन्ट्रोल की)",
    labelEn: "Control Key (Ctrl)",
    labelNe: "कन्ट्रोल की",
    descEn: "Powerful modifier key held together with other keys to perform computer shortcuts.",
    descNe: "अन्य कीहरूसँग मिलाएर किबोर्ड सर्टकट चलाउन प्रयोग गरिने मुख्य की हो।",
    category: "modifier",
    shortcutExample: "Ctrl + C (Copy) | Ctrl + V (Paste)"
  },
  "Alt": {
    key: "Alt (अल्टरनेट की)",
    labelEn: "Alternate Key (Alt)",
    labelNe: "अल्ट की",
    descEn: "Used in combination shortcuts like switching open windows or accessing menu ribbons.",
    descNe: "सर्टकटहरूमा प्रयोग हुन्छ, जस्तै खुला विन्डोजहरू बीच अदलबदल गर्न।",
    category: "modifier",
    shortcutExample: "Alt + Tab = Switch between open apps"
  },
  "Tab": {
    key: "Tab (अगाडि उफ्रिने)",
    labelEn: "Tab Key",
    labelNe: "ट्याब की",
    descEn: "Moves the text cursor forward by several spaces or jumps to the next form field/button.",
    descNe: "कर्सरलाई धेरै स्पेस अगाडि सार्न वा अनलाइन फारमको अर्को बक्समा पुग्न प्रयोग गरिन्छ।",
    category: "navigation",
    shortcutExample: "Jump from Username input to Password input"
  },
  "Esc": {
    key: "Esc (रद्द गर्ने / बाहिरिने)",
    labelEn: "Escape Key (Esc)",
    labelNe: "इस्केप की",
    descEn: "Cancels the current action, closes pop-up dialog boxes, or exits full-screen videos.",
    descNe: "चलिरहेको काम रद्द गर्न, पप-अप बन्द गर्न वा फुल स्क्रिनबाट बाहिर निस्कन प्रयोग गरिन्छ।",
    category: "action",
    shortcutExample: "Exit YouTube full screen or close open menu"
  },
  "Windows": {
    key: "Win (विन्डोज की)",
    labelEn: "Windows Logo Key",
    labelNe: "विन्डोज की",
    descEn: "Opens the Start Menu and enables system shortcuts like showing the Desktop or taking screenshots.",
    descNe: "स्टार्ट मेनु खोल्न र कम्प्युटरका मुख्य सर्टकटहरू सञ्चालन गर्न प्रयोग हुन्छ।",
    category: "modifier",
    shortcutExample: "Win = Open Start Menu | Win + D = Show Desktop"
  },
  "Arrows": {
    key: "Arrow Keys (दिशा कीहरू)",
    labelEn: "Arrow Directional Keys (↑ ↓ ← →)",
    labelNe: "एरो (दिशा) कीहरू",
    descEn: "Moves the cursor or scroll view Up, Down, Left, and Right through documents and web pages.",
    descNe: "कागजात वा वेबसाइटमा कर्सरलाई माथि, तल, दायाँ, बायाँ सार्न प्रयोग गरिन्छ।",
    category: "navigation",
    shortcutExample: "Navigate text without using a mouse"
  },
  "F1": {
    key: "F1 (हेल्प की)",
    labelEn: "Function Key F1",
    labelNe: "फङ्सन की F1 (सहायता)",
    descEn: "Universally opens the Help & Support documentation in almost all computer applications.",
    descNe: "प्रायः सबै सफ्टवेयरहरूमा मद्दत (Help & Support) मेनु खोल्न प्रयोग गरिन्छ।",
    category: "function",
    shortcutExample: "Press F1 in Windows/Chrome for Help"
  },
  "F5": {
    key: "F5 (रिफ्रेस की)",
    labelEn: "Function Key F5",
    labelNe: "फङ्सन की F5 (रिफ्रेस)",
    descEn: "Refreshes and reloads the current web page or active folder.",
    descNe: "खुला रहेको वेबपेज वा फोल्डरलाई पुनः लोड (Refresh) गर्न प्रयोग गरिन्छ।",
    category: "function",
    shortcutExample: "Press F5 to refresh a slow webpage"
  }
};

export const InteractiveKeyboard: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>("Enter");

  const currentInfo = keyDatabase[selectedKey] || keyDatabase["Enter"];

  const rowFunction = ["Esc", "F1", "F5"];
  const rowModifiers = ["Tab", "Shift", "Ctrl", "Alt", "Windows", "Space"];
  const rowActions = ["Backspace", "Delete", "Enter", "Arrows"];

  return (
    <Card className="border-2 border-orange-500/30 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm my-8">
      <CardContent className="p-0 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-gray-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Keyboard className="text-orange-500" size={24} />
              <Badge className="bg-orange-500 text-white font-black text-xs px-3.5 py-1">
                INTERACTIVE KEYBOARD EXPLORER
              </Badge>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              Explore Important Keyboard Keys (किबोर्डका मुख्य कीहरू)
            </h3>
            <p className="text-base font-bold text-orange-600 dark:text-orange-400 font-nepali">
              कुनै पनि की (Key) मा थिचेर त्यसको कार्य, अर्थ र प्रयोग हेर्नुहोस्
            </p>
          </div>
        </div>

        {/* Visual Keyboard Rows */}
        <div className="space-y-4 bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between text-xs font-black text-slate-400 pb-2 border-b border-slate-800">
            <span>KEYBOARD SIMULATOR</span>
            <span>CLICK A KEY TO INSPECT</span>
          </div>

          {/* Function & Action Keys */}
          <div className="flex flex-wrap gap-2.5">
            {rowFunction.map(k => (
              <button
                key={k}
                onClick={() => setSelectedKey(k)}
                className={`px-4 py-3 rounded-xl font-mono text-sm sm:text-base font-black transition-all border-2 ${
                  selectedKey === k
                    ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/30 scale-105"
                    : "bg-slate-800 text-slate-200 border-slate-700 hover:border-orange-500/60 hover:bg-slate-750"
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Modifiers & Actions */}
          <div className="flex flex-wrap gap-2.5">
            {rowModifiers.map(k => (
              <button
                key={k}
                onClick={() => setSelectedKey(k)}
                className={`px-5 py-3.5 rounded-xl font-mono text-sm sm:text-base font-black transition-all border-2 ${
                  selectedKey === k
                    ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/30 scale-105"
                    : "bg-slate-800 text-slate-200 border-slate-700 hover:border-orange-500/60 hover:bg-slate-750"
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Action & Nav Keys */}
          <div className="flex flex-wrap gap-2.5">
            {rowActions.map(k => (
              <button
                key={k}
                onClick={() => setSelectedKey(k)}
                className={`px-5 py-3.5 rounded-xl font-mono text-sm sm:text-base font-black transition-all border-2 ${
                  selectedKey === k
                    ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/30 scale-105"
                    : "bg-slate-800 text-slate-200 border-slate-700 hover:border-orange-500/60 hover:bg-slate-750"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Key Detail Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-orange-50/90 dark:bg-orange-950/30 border-2 border-orange-500/40 space-y-4 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-orange-200 dark:border-orange-900/60 pb-3">
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-orange-500 text-white font-mono font-black text-xl shadow-md">
                {currentInfo.key.split(" ")[0]}
              </span>
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {currentInfo.labelEn}
                </h4>
                <p className="text-base font-bold text-orange-600 dark:text-orange-400 font-nepali">
                  {currentInfo.labelNe}
                </p>
              </div>
            </div>

            <Badge className="bg-orange-500/20 text-orange-800 dark:text-orange-200 border-orange-500/30 text-xs font-black uppercase self-start sm:self-center">
              Category: {currentInfo.category}
            </Badge>
          </div>

          <div className="space-y-2">
            <p className="text-base sm:text-lg text-gray-900 dark:text-gray-100 font-medium leading-relaxed">
              {currentInfo.descEn}
            </p>
            <p className="text-base sm:text-lg font-nepali text-gray-950 dark:text-gray-50 font-semibold leading-relaxed pt-2 border-t border-orange-200/60 dark:border-orange-900/40">
              {currentInfo.descNe}
            </p>
          </div>

          {currentInfo.shortcutExample && (
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-orange-300 dark:border-slate-800 flex items-center gap-3 text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200">
              <Sparkles className="text-orange-500 shrink-0" size={20} />
              <span>
                <strong className="text-orange-600 dark:text-orange-400">Practical Use: </strong>
                {currentInfo.shortcutExample}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
