import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Square, Copy, X, AppWindow, RotateCcw, Layout, SplitSquareVertical } from "lucide-react";

export const WindowManagerDemo: React.FC = () => {
  const [windowState, setWindowState] = useState<"normal" | "maximized" | "minimized" | "snap-left" | "snap-right">("normal");
  const [activeWindow, setActiveWindow] = useState<"notepad" | "browser">("notepad");

  return (
    <Card className="border-2 border-orange-500/30 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm my-8">
      <CardContent className="p-0 space-y-7">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-gray-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AppWindow className="text-orange-500" size={24} />
              <Badge className="bg-orange-500 text-white font-black text-xs px-3.5 py-1 uppercase tracking-wider">
                WINDOW CONTROLS SIMULATOR
              </Badge>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 font-nepali">विन्डोज नियन्त्रण</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              Working with Windows: Minimize, Maximize & Snap
            </h3>
            <p className="text-base font-bold text-orange-600 dark:text-orange-400 font-nepali">
              विन्डोको माथिल्लो दायाँ भागमा रहेका बटनहरू थिचेर अभ्यास गर्नुहोस्
            </p>
          </div>

          <Button
            onClick={() => setWindowState("normal")}
            variant="outline"
            size="sm"
            className="rounded-full text-xs font-bold border-gray-300 dark:border-slate-700 self-start sm:self-center"
          >
            <RotateCcw size={14} className="mr-1.5" /> Reset Window
          </Button>
        </div>

        {/* Action Explanation Alert */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setWindowState("minimized")}
            className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 text-left border border-slate-200 dark:border-slate-700"
          >
            <span className="text-orange-500 font-black">1. Minimize (−):</span>
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">Hides window to Taskbar (टास्कबारमा लुकाउने)</p>
          </button>
          <button
            onClick={() => setWindowState("maximized")}
            className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 text-left border border-slate-200 dark:border-slate-700"
          >
            <span className="text-emerald-500 font-black">2. Maximize (□):</span>
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">Expands to full screen (पुरै स्क्रिन भर्ने)</p>
          </button>
          <button
            onClick={() => setWindowState("normal")}
            className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 text-left border border-slate-200 dark:border-slate-700"
          >
            <span className="text-blue-500 font-black">3. Restore Down:</span>
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">Returns to medium size (सामान्य साइज)</p>
          </button>
          <button
            onClick={() => setWindowState("snap-left")}
            className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 text-left border border-slate-200 dark:border-slate-700"
          >
            <span className="text-purple-500 font-black">4. Snap Split:</span>
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">Splits 50/50 side by side (दुई भाग बनाउने)</p>
          </button>
        </div>

        {/* Simulated Desktop Environment */}
        <div className="h-[340px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 border-2 border-slate-800 relative flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Wallpaper Badge */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>DESKTOP DISPLAY (1920 × 1080)</span>
            <span className="text-orange-400">Active State: {windowState.toUpperCase()}</span>
          </div>

          {/* Render Active Window Simulator */}
          {windowState !== "minimized" ? (
            <div
              className={`rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-700 shadow-2xl transition-all duration-300 flex flex-col overflow-hidden ${
                windowState === "maximized"
                  ? "w-full h-full"
                  : windowState === "snap-left"
                  ? "w-1/2 h-full"
                  : windowState === "snap-right"
                  ? "w-1/2 h-full ml-auto"
                  : "w-3/4 h-3/4 mx-auto my-auto"
              }`}
            >
              {/* Window Title Bar */}
              <div className="bg-slate-800 text-white px-4 py-2.5 flex items-center justify-between select-none border-b border-slate-700">
                <div className="flex items-center gap-2 text-xs font-black">
                  <AppWindow size={16} className="text-orange-400" />
                  <span>Notepad - MyFirstNotes.txt</span>
                </div>

                {/* Window Top Controls */}
                <div className="flex items-center gap-1">
                  {/* Minimize */}
                  <button
                    onClick={() => setWindowState("minimized")}
                    title="Minimize"
                    className="w-7 h-7 rounded hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    <Minus size={14} />
                  </button>

                  {/* Maximize / Restore */}
                  <button
                    onClick={() => setWindowState(windowState === "maximized" ? "normal" : "maximized")}
                    title={windowState === "maximized" ? "Restore" : "Maximize"}
                    className="w-7 h-7 rounded hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    <Square size={12} />
                  </button>

                  {/* Close */}
                  <button
                    onClick={() => setWindowState("minimized")}
                    title="Close"
                    className="w-7 h-7 rounded hover:bg-red-600 flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Window Body Content */}
              <div className="p-4 sm:p-6 flex-1 bg-white dark:bg-slate-900 text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200 overflow-auto space-y-2">
                <p className="text-orange-600 dark:text-orange-400 font-bold">
                  // Welcome to Computer Practice in Nepal 🇳🇵
                </p>
                <p>1. Operating systems manage all hardware and apps.</p>
                <p>2. Use Title Bar buttons to control window size.</p>
                <p>3. Snap windows to work side-by-side easily.</p>
              </div>
            </div>
          ) : (
            <div className="my-auto text-center space-y-2 text-slate-400">
              <p className="text-sm font-bold">Window is currently Minimized to the Taskbar below!</p>
              <Button
                onClick={() => setWindowState("normal")}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full text-xs"
              >
                Click Taskbar Icon to Restore Window ⬆️
              </Button>
            </div>
          )}

          {/* Bottom Taskbar */}
          <div className="bg-slate-950/95 border-t border-slate-800 px-4 py-2 rounded-xl flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-3">
              <span className="font-black text-orange-400 text-sm">⊞ Start</span>
              <button
                onClick={() => setWindowState(windowState === "minimized" ? "normal" : "minimized")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                  windowState !== "minimized" ? "bg-slate-800 border border-orange-500 text-orange-300" : "bg-slate-900 text-slate-400"
                }`}
              >
                <AppWindow size={14} /> Notepad.txt
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-400">4:30 PM • Kathmandu</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
