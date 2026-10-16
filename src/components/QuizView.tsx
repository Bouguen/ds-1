import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  RefreshCw,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const QuizView: React.FC<{ onSwitchToFiches: () => void }> = ({ onSwitchToFiches }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<{ isCorrect: boolean; selected: number }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setHistory(prev => [...prev, { isCorrect, selected: idx }]);
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      // Trigger festive celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // safe fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setHistory([]);
    setIsFinished(false);
  };

  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
          <div className="inline-flex p-4 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Award className="w-12 h-12" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Quiz DS Terminé !
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Félicitations pour votre entraînement sur les langages de structuration de contenus.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {score} / {QUIZ_QUESTIONS.length}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
              Note : {percentage}%
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 font-medium">
              {percentage >= 80
                ? '🌟 Excellent ! Vous êtes parfaitement paré pour le Devoir Surveillé.'
                : percentage >= 50
                ? '👍 Bon niveau général ! Relisez quelques fiches pour sécuriser les détails.'
                : '📚 Courage ! Revoyez les fiches détaillées et les pièges classiques.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Recommencer le Quiz</span>
            </button>
            <button
              onClick={onSwitchToFiches}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Consulter les Fiches</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Progress & Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-mono">
            Question {currentIdx + 1} sur {QUIZ_QUESTIONS.length}
          </span>
          <span className="text-slate-400">&bull;</span>
          <span className="font-mono uppercase text-slate-600 dark:text-slate-300 font-bold">
            {currentQ.languageId.toUpperCase()}
          </span>
        </div>
        <div className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
          Score actuel : {score}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Difficulté : {currentQ.difficulty}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.question}
          </h3>
        </div>

        {/* Optional Code Snippet */}
        {currentQ.codeSnippet && (
          <div className="p-3.5 rounded-xl bg-[#1e222b] text-slate-200 font-mono text-xs overflow-x-auto border border-slate-700">
            <pre>{currentQ.codeSnippet}</pre>
          </div>
        )}

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isChosen = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let cardStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400';
            if (isAnswered) {
              if (isCorrect) {
                cardStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500';
              } else if (isChosen && !isCorrect) {
                cardStyle = 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-1 ring-rose-500';
              } else {
                cardStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-sm font-medium ${cardStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-xs flex items-center justify-center font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && (
                  <div>
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {isChosen && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Explanation Banner */}
        {isAnswered && (
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs text-indigo-950 dark:text-indigo-200 space-y-1 animate-fadeIn">
            <span className="font-bold flex items-center gap-1.5 text-indigo-900 dark:text-indigo-100">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Explication Pédagogique :
            </span>
            <p className="leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* Next Question Button */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <span>{currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Question Suivante' : 'Voir mon bilan final'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
