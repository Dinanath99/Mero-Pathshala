import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Circle, 
  Award, 
  Sparkles, 
  RotateCcw, 
  Play, 
  Check, 
  Laptop, 
  FileText, 
  Copy, 
  Clipboard, 
  Save, 
  Camera, 
  Globe, 
  Layers, 
  FolderDown, 
  XSquare 
} from "lucide-react";

interface PracticalTask {
  id: number;
  titleEn: string;
  titleNe: string;
  descEn: string;
  descNe: string;
  icon: any;
}

const practicalTasks: PracticalTask[] = [
  {
    id: 1,
    titleEn: "1. Open an Application",
    titleNe: "१. एप्लिकेसन (Notepad) खोल्ने",
    descEn: "Locate and launch an application from Desktop or Start Menu.",
    descNe: "डेस्कटप वा स्टार्ट मेनुबाट एप्लिकेसन सुरु गर्नुहोस्।",
    icon: FileText
  },
  {
    id: 2,
    titleEn: "2. Type Text on Keyboard",
    titleNe: "२. किबोर्डबाट अक्षरहरू टाइप गर्ने",
    descEn: "Type a complete sentence using proper spacing and Enter keys.",
    descNe: "किबोर्डको सहायताले वाक्य टाइप गर्नुहोस्।",
    icon: Laptop
  },
  {
    id: 3,
    titleEn: "3. Copy Text with Shortcut",
    titleNe: "३. Ctrl + C सर्टकटले टेक्स्ट कपी गर्ने",
    descEn: "Highlight the text and copy it to the clipboard buffer.",
    descNe: "अक्षर छानेर कपी (Ctrl + C) गर्नुहोस्।",
    icon: Copy
  },
  {
    id: 4,
    titleEn: "4. Paste Text",
    titleNe: "४. Ctrl + V सर्टकटले टेक्स्ट पेस्ट गर्ने",
    descEn: "Paste the copied text into a new line or document.",
    descNe: "कपी गरेको अक्षर नयाँ ठाउँमा टाँस्नुहोस्।",
    icon: Clipboard
  },
  {
    id: 5,
    titleEn: "5. Save Document to Storage",
    titleNe: "५. फाइल कम्प्युटरमा सुरक्षित (Save) गर्ने",
    descEn: "Use Ctrl + S to save the file with a clear filename.",
    descNe: "फाइललाई नाम दिएर कम्प्युटरमा सुरक्षित गर्नुहोस्।",
    icon: Save
  },
  {
    id: 6,
    titleEn: "6. Take a Screen Screenshot",
    titleNe: "६. स्क्रिनको फोटो (Screenshot) लिने",
    descEn: "Press Win + Shift + S or PrtScn to capture display.",
    descNe: "स्क्रिनको कुनै पनि भागको फोटो खिच्नुहोस्।",
    icon: Camera
  },
  {
    id: 7,
    titleEn: "7. Open Web Browser",
    titleNe: "७. इन्टरनेट ब्राउजर खोल्ने र सर्च गर्ने",
    descEn: "Launch Chrome or Firefox to access the internet.",
    descNe: "इन्टरनेट चलाउन वेब ब्राउजर खोल्नुहोस्।",
    icon: Globe
  },
  {
    id: 8,
    titleEn: "8. Switch Applications",
    titleNe: "८. Alt + Tab सर्टकटले एप्स बदल्ने",
    descEn: "Seamlessly jump between open apps without closing them.",
    descNe: "खुला रहेका एपहरू बीच तुरुन्तै अदलबदल गर्नुहोस्।",
    icon: Layers
  },
  {
    id: 9,
    titleEn: "9. Find Downloaded File",
    titleNe: "९. Downloads फोल्डरमा फाइल खोज्ने",
    descEn: "Open File Explorer and browse into the Downloads folder.",
    descNe: "डाउनलोड भएका फाइलहरू फोल्डरमा गएर फेला पार्नुहोस्।",
    icon: FolderDown
  },
  {
    id: 10,
    titleEn: "10. Safely Close Applications",
    titleNe: "१०. काम सकिएपछि एप सुरक्षित बन्द गर्ने",
    descEn: "Save all pending changes and click the Close [X] button.",
    descNe: "फाइल सेभ गरेर सफ्टवेयर सही तरिकाले बन्द गर्नुहोस्।",
    icon: XSquare
  }
];

interface TenTasksChallengeProps {
  onComplete?: () => void;
}

export const TenTasksChallenge: React.FC<TenTasksChallengeProps> = ({ onComplete }) => {
  const [completedTasks, setCompletedTasks] = useState<{ [id: number]: boolean }>(() => {
    try {
      const saved = localStorage.getItem("aiguru_mod2_ten_tasks");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleTask = (id: number) => {
    setCompletedTasks(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("aiguru_mod2_ten_tasks", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    onComplete?.();
  };

  const handleResetAll = () => {
    setCompletedTasks({});
    try {
      localStorage.removeItem("aiguru_mod2_ten_tasks");
    } catch (e) {
      console.error(e);
    }
  };

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const isAllComplete = completedCount === 10;

  return (
    <Card className="border-2 border-orange-500/30 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-lg my-8">
      <CardContent className="p-0 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-gray-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="text-orange-500" size={26} />
              <Badge className="bg-orange-500 text-white font-black text-xs px-3.5 py-1 uppercase tracking-wider">
                PRACTICAL MISSION CHALLENGE
              </Badge>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 font-nepali">१० मुख्य कार्यहरू</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              Complete Your First 10 Computer Tasks
            </h3>
            <p className="text-base font-bold text-orange-600 dark:text-orange-400 font-nepali">
              दैनिक कम्प्युटर प्रयोगका यी १० आधारभूत सीपहरू अभ्यास गरी चिन्ह (Check) लगाउनुहोस्
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            <Badge className="text-sm font-black bg-orange-500/15 text-orange-700 dark:text-orange-300 border-2 border-orange-500/30 px-4 py-2">
              {completedCount} / 10 Tasks Completed
            </Badge>

            <Button
              onClick={handleResetAll}
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-bold border-gray-300 dark:border-slate-700"
            >
              <RotateCcw size={14} className="mr-1" /> Reset
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / 10) * 100}%` }}
          />
        </div>

        {/* 10 Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {practicalTasks.map(task => {
            const isDone = Boolean(completedTasks[task.id]);
            const Icon = task.icon;

            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex items-start gap-4 select-none ${
                  isDone
                    ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500/80 shadow-sm"
                    : "bg-slate-50/70 dark:bg-slate-800/40 border-gray-200 dark:border-slate-800 hover:border-orange-400"
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                  isDone
                    ? "bg-emerald-500 text-white"
                    : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-slate-700"
                }`}>
                  {isDone ? <CheckCircle2 size={24} /> : <Icon size={24} />}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-base sm:text-lg font-black ${
                      isDone ? "text-emerald-950 dark:text-emerald-100" : "text-gray-900 dark:text-white"
                    }`}>
                      {task.titleEn}
                    </h4>
                    <span className="text-xs font-bold text-gray-400">
                      {isDone ? "✓ Done" : "Click to mark"}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-orange-600 dark:text-orange-400 font-nepali">
                    {task.titleNe}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {task.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Celebration Banner when 10/10 complete */}
        {isAllComplete && (
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-orange-500/20 to-amber-500/20 border-3 border-emerald-500 text-center space-y-4 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-bounce">
              <Award size={44} />
            </div>

            <div className="space-y-2">
              <Badge className="bg-emerald-600 text-white font-black text-sm px-4 py-1.5 uppercase tracking-wider">
                🏆 CHALLENGE COMPLETE: 10/10 TASKS MASTERED!
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                You can now Operate a Computer with Confidence!
              </h3>
              <p className="text-base sm:text-lg font-bold text-orange-600 dark:text-orange-400 font-nepali">
                बधाई छ! तपाईंले कम्प्युटर सञ्चालनका सम्पूर्ण १० आधारभूत कार्यहरू सफलतापूर्वक पूरा गर्नुभयो!
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
