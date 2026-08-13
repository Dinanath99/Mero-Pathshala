import React, { useState } from "react";
import { FlashcardItem } from "@/pages/learn/computerSkillsData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  RotateCw, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  BookOpen,
  Volume2
} from "lucide-react";

interface FlashcardDeckProps {
  cards: FlashcardItem[];
  title?: string;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  title = "Interactive Concept Flashcards"
}) => {
  const [deck, setDeck] = useState<FlashcardItem[]>(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [ratings, setRatings] = useState<{ [cardId: string]: string }>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = deck[currentIndex];

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleRate = (rating: "again" | "hard" | "good" | "easy") => {
    setRatings(prev => ({ ...prev, [currentCard.id]: rating }));
    setIsFlipped(false);

    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsComplete(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setRatings({});
    setIsComplete(false);
  };

  if (isComplete) {
    const easyCount = Object.values(ratings).filter(r => r === "easy").length;
    const goodCount = Object.values(ratings).filter(r => r === "good").length;
    const hardCount = Object.values(ratings).filter(r => r === "hard" || r === "again").length;

    return (
      <Card className="border-2 border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-md">
        <CardContent className="p-0 text-center space-y-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={44} />
          </div>

          <div className="space-y-2">
            <Badge className="bg-emerald-500 text-white font-extrabold px-4 py-1.5 text-sm uppercase tracking-wider">
              Flashcard Review Complete
            </Badge>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white">
              All Flashcards Practiced!
            </h3>
            <p className="text-base font-bold text-orange-600 dark:text-orange-400 font-nepali">
              तपाईंले सबै फ्ल्यासकार्डहरू सफलतापूर्वक अभ्यास गर्नुभयो
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{easyCount}</span>
              <p className="text-xs font-black text-gray-700 dark:text-gray-300 mt-1">Easy (सजिलो)</p>
            </div>
            <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-200 dark:border-blue-800 text-center">
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{goodCount}</span>
              <p className="text-xs font-black text-gray-700 dark:text-gray-300 mt-1">Good (राम्रो)</p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-800 text-center">
              <span className="text-3xl font-black text-amber-600 dark:text-amber-400">{hardCount}</span>
              <p className="text-xs font-black text-gray-700 dark:text-gray-300 mt-1">Review (पुनः)</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button
              onClick={handleRestart}
              className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm px-8 py-6 shadow-md"
            >
              <RotateCw size={16} className="mr-2" /> Practice Again
            </Button>
            <Button
              onClick={handleShuffle}
              variant="outline"
              className="rounded-full font-bold text-sm px-8 py-6 border-2 border-gray-300 dark:border-slate-700"
            >
              <Shuffle size={16} className="mr-2" /> Shuffle Deck
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Deck Info Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={22} className="text-orange-500" />
          <h4 className="font-black text-gray-900 dark:text-white text-base sm:text-lg">
            {title}
          </h4>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs font-black text-orange-600 dark:text-orange-400 border-2 border-orange-500/30 px-3 py-1">
            Card {currentIndex + 1} of {deck.length}
          </Badge>
          <Button
            onClick={handleShuffle}
            variant="ghost"
            size="sm"
            className="rounded-full text-xs font-bold text-gray-500 hover:text-orange-500"
            title="Shuffle Cards"
          >
            <Shuffle size={16} />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-orange-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
        />
      </div>

      {/* The 3D Flip Card */}
      <div
        onClick={handleFlip}
        className="cursor-pointer select-none perspective-1000 min-h-[300px] sm:min-h-[340px] flex items-center justify-center"
      >
        <div
          className={`w-full h-full min-h-[300px] sm:min-h-[340px] rounded-3xl p-8 sm:p-12 border-2 transition-all duration-500 flex flex-col justify-between shadow-md relative overflow-hidden ${
            isFlipped
              ? "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-orange-950/40 border-orange-500/70 shadow-orange-500/10"
              : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 hover:border-orange-400 dark:hover:border-slate-700"
          }`}
        >
          {/* Top Card Label */}
          <div className="flex items-center justify-between text-xs font-black">
            <Badge className={`${isFlipped ? "bg-orange-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200"} border-none text-xs px-3 py-1 uppercase tracking-wide`}>
              {isFlipped ? "Answer / व्याख्या" : "Question / अवधारणा"}
            </Badge>
            <span className="text-gray-500 dark:text-gray-400 font-bold flex items-center gap-1 text-xs">
              <RotateCw size={14} /> Click card to flip
            </span>
          </div>

          {/* Card Main Content */}
          <div className="my-auto py-6 text-center space-y-4">
            {!isFlipped ? (
              <>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-relaxed">
                  {currentCard.frontEn}
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400 font-nepali leading-relaxed">
                  {currentCard.frontNe}
                </p>
              </>
            ) : (
              <>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 leading-relaxed max-w-2xl mx-auto">
                  {currentCard.backEn}
                </p>
                <p className="text-base sm:text-lg font-semibold text-orange-800 dark:text-orange-200 font-nepali leading-loose pt-3 border-t-2 border-orange-200/60 dark:border-slate-800 max-w-2xl mx-auto">
                  {currentCard.backNe}
                </p>
              </>
            )}
          </div>

          {/* Bottom Flip Indicator */}
          <div className="text-center">
            <span className="text-xs font-black text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1.5">
              <Sparkles size={14} /> {isFlipped ? "Tap card to see question" : "Tap card to reveal answer"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Spaced Repetition Rating Buttons */}
      <div className="space-y-4 pt-2">
        <p className="text-center text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Rate your recall (सम्झनाको स्तर अनुसार छान्नुहोस्)
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button
            onClick={() => handleRate("again")}
            variant="outline"
            className="rounded-2xl border-2 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 font-black text-sm py-6"
          >
            Again (फेरि)
          </Button>

          <Button
            onClick={() => handleRate("hard")}
            variant="outline"
            className="rounded-2xl border-2 border-amber-200 dark:border-amber-900/50 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-black text-sm py-6"
          >
            Hard (गाह्रो)
          </Button>

          <Button
            onClick={() => handleRate("good")}
            variant="outline"
            className="rounded-2xl border-2 border-blue-200 dark:border-blue-900/50 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-black text-sm py-6"
          >
            Good (राम्रो)
          </Button>

          <Button
            onClick={() => handleRate("easy")}
            variant="outline"
            className="rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-black text-sm py-6"
          >
            Easy (सजिलो)
          </Button>
        </div>

        {/* Previous / Next Arrow Controls */}
        <div className="flex items-center justify-between pt-2 text-sm">
          <Button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            variant="ghost"
            size="sm"
            className="rounded-full text-xs font-extrabold text-gray-700 dark:text-gray-300"
          >
            <ChevronLeft size={16} className="mr-1" /> Previous Card
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentIndex === deck.length - 1}
            variant="ghost"
            size="sm"
            className="rounded-full text-xs font-extrabold text-gray-700 dark:text-gray-300"
          >
            Next Card <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
