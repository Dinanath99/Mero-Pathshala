import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  ArrowRight, 
  PlayCircle, 
  BookOpen, 
  CheckCircle, 
  Lightbulb, 
  Check, 
  Sparkles,
  HelpCircle,
  Award,
  ArrowLeft,
  Clock
} from 'lucide-react';
import { aiBasicsRoadmap } from './aiBasicsData';
import { KeyConceptCard, ImportantNoteCard, TipCard, WarningCard, ExampleCard, SummaryCard } from '@/components/lesson/LessonCallouts';
import SEO from '@/components/SEO';

const AIBasicsLesson = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [quizScores, setQuizScores] = useState({});
  const [completed, setCompleted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentIndex = aiBasicsRoadmap.findIndex(m => m.slug === slug);
  const lesson = aiBasicsRoadmap[currentIndex];
  
  const prevLesson = currentIndex > 0 ? aiBasicsRoadmap[currentIndex - 1] : null;
  const nextLesson = currentIndex < aiBasicsRoadmap.length - 1 ? aiBasicsRoadmap[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setQuizScores({});
    setCompleted(false);
    setQuizSubmitted(false);
  }, [slug]);

  if (!lesson) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center flex-col bg-slate-50 dark:bg-[#020817]">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Lesson Not Found</h2>
          <Button onClick={() => navigate('/learn/ai-basics')} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold">
            Return to Learning Hub
          </Button>
        </div>
      </div>
    );
  }

  const handleQuizOption = (qIndex, oIndex) => {
    if (quizSubmitted) return;
    setQuizScores(prev => ({ ...prev, [qIndex]: oIndex }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    setCompleted(true);
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  const scoreCount = lesson.quiz 
    ? Object.keys(quizScores).reduce((acc, qIdx) => acc + (quizScores[qIdx] === lesson.quiz[qIdx].answer ? 1 : 0), 0)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-[#020817] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <SEO title={`${lesson.title} — AI Basics`} />

      {/* Top Header Navigation Bar */}
      <div className="max-w-[1100px] mx-auto mb-8 flex items-center justify-between">
        <Button
          onClick={() => navigate('/learn/ai-basics')}
          variant="ghost"
          className="rounded-full text-xs font-extrabold text-gray-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to AI Basics Hub
        </Button>

        <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-xs px-3.5 py-1.5 font-bold rounded-full">
          Module {lesson.id} of {aiBasicsRoadmap.length}
        </Badge>
      </div>

      {/* Main Centered Reading Workspace (850px-950px reading column) */}
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Lesson Reading Content Container */}
        <main className="flex-1 w-full max-w-[880px] mx-auto space-y-10">
          
          {/* Lesson Hero Banner */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <Badge className="bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-none px-3.5 py-1 text-xs font-bold rounded-full">
                {lesson.level}
              </Badge>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-semibold flex items-center gap-1.5">
                {lesson.type === 'video' ? <PlayCircle size={15} className="text-orange-500" /> : lesson.type === 'quiz' ? <CheckCircle size={15} className="text-orange-500" /> : <BookOpen size={15} className="text-orange-500" />} 
                {lesson.duration}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              {lesson.title}
            </h1>
            
            {lesson.subtitle && (
              <h2 className="text-lg sm:text-xl font-bold text-orange-500 font-serif leading-relaxed">
                {lesson.subtitle}
              </h2>
            )}
          </div>

          {/* Completion Banner */}
          {completed && (
            <div className="bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-3xl p-6 sm:p-7 flex items-start gap-4 shadow-sm animate-in fade-in duration-300">
              <div className="bg-emerald-500 text-white p-2.5 rounded-2xl shrink-0 shadow-sm">
                <Check size={22} />
              </div>
              <div className="space-y-1">
                <h3 className="text-emerald-900 dark:text-emerald-200 font-extrabold text-lg">🎉 Module Completed!</h3>
                <p className="text-emerald-700 dark:text-emerald-300/90 font-medium text-sm">
                  {lesson.type === 'quiz' 
                    ? `You scored ${scoreCount} out of ${lesson.quiz.length} on the Final Quiz!` 
                    : `Great progress! You have completed Module ${lesson.id}.`}
                </p>
              </div>
            </div>
          )}

          {/* Learning Objectives */}
          {lesson.objectives && (
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-7 sm:p-9 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2.5">
                <Target className="text-orange-500" size={22} /> Learning Objectives
              </h3>
              <div className="grid gap-4">
                {lesson.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-800">
                    <div className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle size={16} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm sm:text-base leading-relaxed">{obj.en}</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium font-serif">{obj.ne}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Content Blocks (Typography & Reading Experience) */}
          <article className="space-y-8">
            {lesson.content && lesson.content.map((block, i) => (
              <React.Fragment key={i}>
                {block.type === 'heading' && (
                  <div className="pt-6 pb-2 space-y-1 border-b border-gray-200/60 dark:border-slate-800">
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{block.text}</h3>
                    {block.textNe && <h4 className="text-sm font-bold text-orange-500 font-serif">{block.textNe}</h4>}
                  </div>
                )}

                {block.type === 'paragraph' && (
                  <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-7 sm:p-9 shadow-sm transition-all duration-300 ease-out hover:scale-[0.98] hover:shadow-md space-y-3">
                    <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed font-normal">{block.text}</p>
                    {block.textNe && (
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-serif leading-relaxed italic pt-1 border-t border-gray-100 dark:border-slate-800/60">
                        {block.textNe}
                      </p>
                    )}
                  </div>
                )}

                {block.type === 'highlight' && (
                  <KeyConceptCard 
                    title="Key Concept" 
                    englishText={block.text} 
                    nepaliText={block.textNe} 
                  />
                )}
              </React.Fragment>
            ))}
          </article>

          {/* Real-World Examples Grid */}
          {lesson.examples && lesson.examples.length > 0 && (
            <section className="space-y-6">
              <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2.5">
                <Lightbulb className="text-amber-500" size={22} /> Real-World Practical Examples
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {lesson.examples.map((ex, i) => (
                  <ExampleCard key={i} title={ex.title} titleNe={ex.titleNe} englishText={ex.desc} nepaliText={ex.descNe} />
                ))}
              </div>
            </section>
          )}

          {/* Quick Key Takeaways Summary */}
          {lesson.summary && lesson.summary.length > 0 && (
            <SummaryCard items={lesson.summary} />
          )}

          {/* Interactive Practice Section */}
          {lesson.practice && (
            <section className="bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-9 border-2 border-orange-500/20 shadow-md transition-all duration-300 ease-out hover:scale-[0.98] hover:shadow-lg space-y-5">
              <div className="flex items-center justify-between">
                <Badge className="bg-orange-500 text-white font-extrabold text-xs px-3 py-1">
                  Practice Exercise
                </Badge>
                <span className="text-xs font-bold text-gray-400">अभ्यास कार्य</span>
              </div>

              <div className="space-y-3">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700">
                  <p className="font-bold text-gray-900 dark:text-white text-base">{lesson.practice.task}</p>
                  <p className="text-xs text-gray-500 font-serif font-medium mt-1">{lesson.practice.taskNe}</p>
                </div>

                <div className="flex justify-center text-orange-500 py-1">
                  <ArrowRight size={20} className="animate-pulse" />
                </div>

                <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40">
                  <p className="font-bold text-orange-900 dark:text-orange-200 text-base">{lesson.practice.action}</p>
                  <p className="text-xs text-orange-700 dark:text-orange-400 font-serif font-medium mt-1">{lesson.practice.actionNe}</p>
                </div>
              </div>
            </section>
          )}

          {/* Interactive Quiz Engine */}
          {lesson.quiz && lesson.quiz.length > 0 && (
            <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-7 sm:p-10 shadow-sm space-y-8">
              <div className="flex items-center justify-between border-b dark:border-slate-800 pb-5">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2.5">
                    <HelpCircle className="text-orange-500" /> Module Knowledge Quiz
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">Test your understanding to earn path progress.</p>
                </div>
              </div>

              <div className="space-y-8">
                {lesson.quiz.map((q, qIndex) => (
                  <div key={qIndex} className="bg-slate-50/70 dark:bg-slate-800/40 rounded-3xl p-6 border border-gray-200/80 dark:border-slate-800 space-y-4">
                    <h4 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg">
                      Q{qIndex + 1}: {q.question}
                    </h4>

                    <div className="space-y-3">
                      {q.options.map((opt, oIndex) => {
                        const isSelected = quizScores[qIndex] === oIndex;
                        const isCorrect = oIndex === q.answer;

                        let btnClass = "w-full justify-start font-medium text-sm py-4 px-5 rounded-2xl text-left whitespace-normal transition-all duration-200 border flex items-center justify-between";

                        if (quizSubmitted) {
                          if (isCorrect) {
                            btnClass += " bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold";
                          } else if (isSelected && !isCorrect) {
                            btnClass += " bg-red-500/10 border-red-500 text-red-700 dark:text-red-300 font-bold";
                          } else {
                            btnClass += " bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-400 opacity-60";
                          }
                        } else {
                          btnClass += isSelected 
                            ? " border-orange-500 bg-orange-500/10 text-orange-700 dark:text-orange-300 font-extrabold shadow-sm" 
                            : " bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-800 dark:text-gray-200 hover:border-orange-300 dark:hover:border-slate-600";
                        }

                        return (
                          <button
                            key={oIndex}
                            onClick={() => handleQuizOption(qIndex, oIndex)}
                            disabled={quizSubmitted}
                            className={btnClass}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrect && <CheckCircle size={18} className="text-emerald-500 shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-bold text-orange-600 dark:text-orange-400">Explanation: </span> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-2 flex items-center justify-between">
                  {!quizSubmitted ? (
                    <Button 
                      size="lg" 
                      className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-full px-8 text-sm shadow-md"
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizScores).length < lesson.quiz.length}
                    >
                      Submit Answers & Complete
                    </Button>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Badge className="bg-emerald-500 text-white text-sm font-extrabold px-4 py-2 rounded-full shadow-sm">
                        Score: {scoreCount} / {lesson.quiz.length}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          <Separator className="my-10 dark:bg-slate-800" />

          {/* Lesson Footer Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            {prevLesson ? (
              <Button asChild variant="outline" className="w-full sm:w-auto px-6 rounded-full border-gray-300 dark:border-slate-800 font-bold text-xs">
                <Link to={`/learn/ai-basics/${prevLesson.slug}`}>
                  <ChevronLeft size={16} className="mr-2" /> Previous: {prevLesson.id === 6 ? 'Quiz' : `Module ${prevLesson.id}`}
                </Link>
              </Button>
            ) : <div />}

            {!completed && lesson.type !== 'quiz' && (
              <Button onClick={handleComplete} className="w-full sm:w-auto px-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md">
                Mark as Complete <Check size={16} className="ml-2" />
              </Button>
            )}

            {nextLesson ? (
              <Button asChild className="w-full sm:w-auto px-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-md" disabled={!completed && lesson.type === 'quiz'}>
                <Link to={`/learn/ai-basics/${nextLesson.slug}`}>
                  Next: {nextLesson.id === 6 ? 'Final Quiz' : `Module ${nextLesson.id}`} <ChevronRight size={16} className="ml-2" />
                </Link>
              </Button>
            ) : (
              completed && lesson.type === 'quiz' ? (
                <Button asChild className="w-full sm:w-auto px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md">
                  <Link to="/course/search">Explore Full Courses <ChevronRight size={16} className="ml-2" /></Link>
                </Button>
              ) : null
            )}
          </div>

        </main>

        {/* Sticky Sidebar Progress & Navigation */}
        <aside className="w-full lg:w-80 shrink-0 sticky top-28 space-y-6">
          
          {/* Progress Card */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
            <h4 className="font-extrabold text-gray-900 dark:text-white text-base">Learning Progress</h4>
            <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-orange-500 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${Math.round(((currentIndex + (completed ? 1 : 0)) / aiBasicsRoadmap.length) * 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-gray-500">
              <span>{Math.round(((currentIndex + (completed ? 1 : 0)) / aiBasicsRoadmap.length) * 100)}% Completed</span>
              <span>{currentIndex + 1} / {aiBasicsRoadmap.length} Modules</span>
            </div>
          </div>

          {/* Module Syllabus List */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
            <h4 className="font-black text-gray-900 dark:text-white text-sm flex items-center gap-2 border-b dark:border-slate-800 pb-3">
              <Target size={18} className="text-orange-500" /> Syllabus Modules
            </h4>

            <div className="space-y-2">
              {aiBasicsRoadmap.map((mod, idx) => {
                const isActive = mod.slug === slug;
                return (
                  <Link 
                    key={mod.id} 
                    to={`/learn/ai-basics/${mod.slug}`} 
                    className={`p-3.5 rounded-2xl flex items-center gap-3 transition-all ${
                      isActive 
                        ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30 font-bold' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className={`shrink-0 ${idx < currentIndex || (completed && isActive) ? 'text-emerald-500' : 'text-gray-300 dark:text-slate-600'}`}>
                      <CheckCircle size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-extrabold truncate">
                        {mod.id === 6 ? mod.title : `Module ${mod.id}: ${mod.title}`}
                      </p>
                      <span className="text-[10px] text-gray-400 font-medium">{mod.duration}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default AIBasicsLesson;
