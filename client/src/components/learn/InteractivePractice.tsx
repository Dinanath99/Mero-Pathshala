import React, { useState } from "react";
import { PracticeActivityData, PracticeItem } from "@/pages/learn/computerSkillsData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, RotateCcw, Sparkles, Check, HelpCircle, Layers } from "lucide-react";

interface InteractivePracticeProps {
  activity: PracticeActivityData;
}

export const InteractivePractice: React.FC<InteractivePracticeProps> = ({ activity }) => {
  const [placedItems, setPlacedItems] = useState<{ [itemId: string]: string }>({});
  const [feedback, setFeedback] = useState<{ [itemId: string]: boolean }>({});
  const [selectedItem, setSelectedItem] = useState<PracticeItem | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const unplacedItems = activity.items.filter(item => !placedItems[item.id]);

  const handleSelectItem = (item: PracticeItem) => {
    setSelectedItem(item);
  };

  const handleAssignCategory = (categoryKey: string) => {
    if (!selectedItem) return;

    const isCorrect = selectedItem.category === categoryKey;
    const newPlaced = { ...placedItems, [selectedItem.id]: categoryKey };
    const newFeedback = { ...feedback, [selectedItem.id]: isCorrect };

    setPlacedItems(newPlaced);
    setFeedback(newFeedback);
    setSelectedItem(null);

    // Check if all placed
    if (Object.keys(newPlaced).length === activity.items.length) {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setPlacedItems({});
    setFeedback({});
    setSelectedItem(null);
    setIsCompleted(false);
  };

  const correctCount = Object.values(feedback).filter(Boolean).length;

  return (
    <Card className="border-2 border-orange-500/30 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm">
      <CardContent className="p-0 space-y-7">
        {/* Activity Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-gray-100 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-500 text-white font-black text-xs px-3.5 py-1">
                PRACTICE ACTIVITY
              </Badge>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 font-nepali">अभ्यास कार्य</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              {activity.titleEn}
            </h3>
            <p className="text-base sm:text-lg font-bold text-orange-600 dark:text-orange-400 font-nepali">
              {activity.titleNe}
            </p>
          </div>

          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="rounded-full text-xs font-bold border-gray-300 dark:border-slate-700 self-start sm:self-center"
          >
            <RotateCcw size={14} className="mr-1.5" /> Reset Activity
          </Button>
        </div>

        {/* Instructions */}
        <div className="space-y-1 text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
          <p>{activity.instructionEn}</p>
          {activity.instructionNe && (
            <p className="text-base font-nepali font-semibold text-orange-700 dark:text-orange-300">
              {activity.instructionNe}
            </p>
          )}
        </div>

        {/* Unassigned Items Pool */}
        <div className="space-y-3">
          <span className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
            Items to classify ({unplacedItems.length} remaining) — Tap an item to select:
          </span>

          <div className="min-h-[60px] p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-gray-200 dark:border-slate-800 flex flex-wrap gap-3 items-center">
            {unplacedItems.length === 0 ? (
              <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 size={20} /> All items have been placed into category bins!
              </span>
            ) : (
              unplacedItems.map(item => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className={`px-5 py-3 rounded-2xl text-sm sm:text-base font-bold transition-all border-2 ${
                      isSelected
                        ? "bg-orange-500 text-white border-orange-500 shadow-lg scale-105"
                        : "bg-white dark:bg-slate-900 text-gray-900 dark:text-white border-gray-300 dark:border-slate-700 hover:border-orange-400 hover:bg-orange-50/40"
                    }`}
                  >
                    {item.nameEn}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Item Notification Helper */}
        {selectedItem && (
          <div className="p-4 bg-orange-500/10 border-2 border-orange-500 rounded-2xl text-sm sm:text-base font-bold text-orange-950 dark:text-orange-200 flex items-center justify-between animate-pulse">
            <span>Selected: "{selectedItem.nameEn}" — Click a category bin below to place it:</span>
          </div>
        )}

        {/* Classification Category Bins */}
        <div className={`grid grid-cols-1 ${activity.categories.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"} gap-5`}>
          {activity.categories.map(cat => {
            const catItems = activity.items.filter(i => placedItems[i.id] === cat.key);

            return (
              <div
                key={cat.key}
                onClick={() => selectedItem && handleAssignCategory(cat.key)}
                className={`rounded-3xl p-6 border-2 transition-all space-y-4 min-h-[200px] flex flex-col justify-between ${
                  selectedItem
                    ? "cursor-pointer border-orange-500 bg-orange-50/40 dark:bg-orange-950/25 hover:shadow-lg"
                    : "border-gray-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40"
                }`}
              >
                {/* Category Title */}
                <div className="flex items-center justify-between border-b-2 border-gray-200/70 dark:border-slate-700/70 pb-3">
                  <span className="font-black text-base sm:text-lg text-gray-900 dark:text-white">
                    {cat.labelEn}
                  </span>
                  <Badge variant="outline" className="text-xs font-black">
                    {catItems.length} items
                  </Badge>
                </div>

                {/* Items in this Bin */}
                <div className="space-y-2.5 flex-1">
                  {catItems.map(item => {
                    const isRight = feedback[item.id];
                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-2xl border-2 text-sm sm:text-base font-bold flex items-center justify-between ${
                          isRight
                            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-950 dark:text-emerald-100"
                            : "bg-red-50 dark:bg-red-950/40 border-red-400 text-red-950 dark:text-red-100"
                        }`}
                      >
                        <span>{item.nameEn}</span>
                        {isRight ? (
                          <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                        ) : (
                          <XCircle size={20} className="text-red-500 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {selectedItem && (
                  <Button
                    size="sm"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-5 rounded-xl shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAssignCategory(cat.key);
                    }}
                  >
                    Place "{selectedItem.nameEn.split(" ")[0]}" here
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion Result Banner */}
        {isCompleted && (
          <div className="p-6 rounded-3xl bg-emerald-50/95 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black">
                <Check size={26} />
              </div>
              <div>
                <h4 className="font-black text-lg text-emerald-950 dark:text-emerald-100">
                  Practice Complete! You scored {correctCount} / {activity.items.length}
                </h4>
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  {correctCount === activity.items.length
                    ? "Perfect classification! Excellent work."
                    : "Good attempt! You can reset to practice again."}
                </p>
              </div>
            </div>

            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-bold border-2 border-emerald-300 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900"
            >
              <RotateCcw size={14} className="mr-1.5" /> Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
