import React, { useState } from "react";
import { QuizQuestion } from "@/pages/learn/computerSkillsData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Award, Check, Sparkles, ChevronLeft } from "lucide-react";

interface QuizEngineProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
  title?: string;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  questions,
  onComplete,
  title = "Knowledge Check Quiz"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [qIdx: number]: number }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ.answer;

  const handleSelect = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerChecked(true);
    const newAnswers = { ...userAnswers, [currentIndex]: selectedOption };
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(userAnswers[currentIndex + 1] !== undefined ? userAnswers[currentIndex + 1] : null);
      setIsAnswerChecked(userAnswers[currentIndex + 1] !== undefined);
    } else {
      setIsFinished(true);
      const totalScore = Object.keys(userAnswers).reduce((acc, idx) => {
        const qIndex = parseInt(idx, 10);
        return acc + (userAnswers[qIndex] === questions[qIndex]?.answer ? 1 : 0);
      }, 0);
      if (onComplete) {
        onComplete(totalScore, questions.length);
      }
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setUserAnswers({});
    setIsFinished(false);
    setIsReviewMode(false);
  };

  const totalScore = Object.keys(userAnswers).reduce((acc, idx) => {
    const qIndex = parseInt(idx, 10);
    return acc + (userAnswers[qIndex] === questions[qIndex]?.answer ? 1 : 0);
  }, 0);

  const percentage = Math.round((totalScore / questions.length) * 100);

  // Result Score Band Calculation
  const getScoreBand = (pct: number) => {
    if (pct >= 90) return { label: "Excellent! Outstanding mastery 🎉", labelNe: "उत्कृष्ट! तपाईंले धेरै राम्रोसँग बुझ्नुभएको छ।", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" };
    if (pct >= 75) return { label: "Very Good! Strong understanding 🌟", labelNe: "धेरै राम्रो! तपाईंको ज्ञान बलियो छ।", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" };
    if (pct >= 60) return { label: "Good! Review a few key concepts 👍", labelNe: "राम्रो! केही अवधारणाहरू फेरि दोहोर्‍याउनुहोस्।", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" };
    return { label: "Review the module and try again 🔄", labelNe: "पाठहरू पुनः अध्ययन गरी फेरि अभ्यास गर्नुहोस्।", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500/10 border-orange-500/30" };
  };

  const scoreBand = getScoreBand(percentage);

  if (isFinished && !isReviewMode) {
    return (
      <Card className="border-2 border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-lg">
        <CardContent className="p-0 text-center space-y-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-orange-500/15 text-orange-500 flex items-center justify-center shadow-inner">
            <Award size={52} className="animate-bounce" />
          </div>

          <div className="space-y-3">
            <Badge className="bg-orange-500 text-white font-extrabold px-4 py-1.5 text-sm uppercase tracking-wider">
              Assessment Completed
            </Badge>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400 font-nepali">
              ज्ञान मूल्यांकन सफलतापुर्वक सम्पन्न भयो
            </p>
          </div>

          <div className={`p-8 rounded-3xl border-2 ${scoreBand.bg} max-w-lg mx-auto space-y-4`}>
            <div className="text-6xl font-black text-gray-900 dark:text-white tracking-tight">
              {totalScore} <span className="text-3xl text-gray-400 font-bold">/ {questions.length}</span>
            </div>
            <div className={`text-2xl font-black ${scoreBand.color}`}>
              {percentage}% — {scoreBand.label}
            </div>
            <p className="text-base font-bold text-gray-800 dark:text-gray-200 font-nepali">
              {scoreBand.labelNe}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => {
                setIsReviewMode(true);
                setCurrentIndex(0);
              }}
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-bold border-2 border-gray-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Review All Questions
            </Button>

            <Button
              onClick={handleReset}
              className="rounded-full px-8 py-6 text-base font-extrabold bg-orange-500 hover:bg-orange-600 text-white shadow-md"
            >
              <RotateCcw size={18} className="mr-2" /> Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-gray-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm">
      <CardContent className="p-0 space-y-8">
        {/* Header with progress & question counter */}
        <div className="flex items-center justify-between border-b-2 border-gray-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <HelpCircle className="text-orange-500" size={22} />
              <span className="text-sm font-black text-orange-500 uppercase tracking-wider">
                Question {currentIndex + 1} of {questions.length}
              </span>
              {currentQ.difficulty && (
                <Badge variant="outline" className="capitalize text-xs font-black py-0.5 border-orange-400/40">
                  {currentQ.difficulty}
                </Badge>
              )}
            </div>
            <h4 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white">
              {title}
            </h4>
          </div>

          <div className="text-right">
            <Badge className="bg-slate-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-xs font-black px-3 py-1">
              {Math.round(((currentIndex + 1) / questions.length) * 100)}% Complete
            </Badge>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Prompt */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white leading-snug">
            {currentQ.question}
          </h3>
          {currentQ.questionNe && (
            <p className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400 font-nepali leading-relaxed">
              {currentQ.questionNe}
            </p>
          )}
        </div>

        {/* Option Choices */}
        <div className="space-y-4 pt-2">
          {currentQ.options.map((optionText, idx) => {
            const isSelected = selectedOption === idx;
            const isAnswerKey = currentQ.answer === idx;

            let optionClass = "w-full text-left p-5 sm:p-6 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 text-base sm:text-lg font-bold leading-relaxed min-h-[58px]";

            if (isAnswerChecked || isReviewMode) {
              if (isAnswerKey) {
                optionClass += " bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-sm";
              } else if (isSelected && !isAnswerKey) {
                optionClass += " bg-red-50 dark:bg-red-950/40 border-red-500 text-red-950 dark:text-red-100 shadow-sm";
              } else {
                optionClass += " bg-slate-50/60 dark:bg-slate-900/40 border-gray-200 dark:border-slate-800 text-gray-400 opacity-60";
              }
            } else {
              if (isSelected) {
                optionClass += " bg-orange-50 dark:bg-orange-950/30 border-orange-500 text-orange-950 dark:text-orange-100 shadow-md scale-[1.01]";
              } else {
                optionClass += " bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-900 dark:text-gray-100 hover:border-orange-400 dark:hover:border-slate-700 hover:bg-orange-50/30";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswerChecked || isReviewMode}
                className={optionClass}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-black border-2 ${
                    isSelected
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-700"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-gray-900 dark:text-white">{optionText}</span>
                </div>

                {(isAnswerChecked || isReviewMode) && isAnswerKey && (
                  <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
                )}
                {(isAnswerChecked || isReviewMode) && isSelected && !isAnswerKey && (
                  <XCircle size={24} className="text-red-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Answer Explanation Alert */}
        {(isAnswerChecked || isReviewMode) && (
          <div className={`p-6 sm:p-7 rounded-3xl border-2 text-sm sm:text-base space-y-3 animate-in fade-in duration-300 ${
            isCorrect
              ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100"
              : "bg-orange-50/90 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 text-orange-950 dark:text-orange-100"
          }`}>
            <div className="flex items-center gap-2 font-black text-base sm:text-lg">
              {isCorrect ? (
                <>
                  <Check size={22} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Correct Answer! (सही उत्तर)</span>
                </>
              ) : (
                <>
                  <Sparkles size={22} className="text-orange-600 dark:text-orange-400" />
                  <span>Correct Answer: Option {String.fromCharCode(65 + currentQ.answer)}</span>
                </>
              )}
            </div>
            <p className="leading-relaxed text-gray-800 dark:text-gray-200 font-medium">
              {currentQ.explanation}
            </p>
            {currentQ.explanationNe && (
              <p className="leading-relaxed font-nepali text-gray-900 dark:text-gray-100 font-semibold pt-2 border-t border-gray-200/80 dark:border-slate-800">
                {currentQ.explanationNe}
              </p>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-6 border-t-2 border-gray-100 dark:border-slate-800">
          {currentIndex > 0 ? (
            <Button
              onClick={() => {
                setCurrentIndex(prev => prev - 1);
                setSelectedOption(userAnswers[currentIndex - 1] ?? null);
                setIsAnswerChecked(userAnswers[currentIndex - 1] !== undefined);
              }}
              variant="outline"
              className="rounded-full font-extrabold text-sm px-6 py-6 border-gray-300 dark:border-slate-700"
            >
              <ChevronLeft size={16} className="mr-1" /> Previous Question
            </Button>
          ) : <div />}

          {!isAnswerChecked && !isReviewMode ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-10 py-6 text-base shadow-md disabled:opacity-50"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-10 py-6 text-base shadow-md"
            >
              {currentIndex < questions.length - 1 ? (
                <>Next Question <ArrowRight size={18} className="ml-2" /></>
              ) : (
                <>View Final Results <Award size={18} className="ml-2" /></>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
