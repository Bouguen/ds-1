import React, { useState } from 'react';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import {
  RotateCw,
  CheckCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Eye,
  Sparkles,
  BookMarked
} from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const [cards, setCards] = useState(FLASHCARDS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [filterLang, setFilterLang] = useState<string>('all');

  const filteredCards = filterLang === 'all'
    ? cards
    : cards.filter(c => c.languageId === filterLang);

  const activeCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const toggleMastered = (id: string) => {
    setMasteredIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCards([...cards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
  };

  if (!activeCard) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center text-sm text-slate-500">
        Aucune carte disponible pour ce filtre.
      </div>
    );
  }

  const isMastered = masteredIds.has(activeCard.id);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-600 dark:text-slate-400">Filtrer par :</span>
          <select
            value={filterLang}
            onChange={(e) => {
              setFilterLang(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
          >
            <option value="all">Tous les langages ({FLASHCARDS_DATA.length})</option>
            <option value="html">HTML</option>
            <option value="xml">XML</option>
            <option value="json">JSON</option>
            <option value="markdown">Markdown</option>
            <option value="latex">LaTeX</option>
            <option value="css">CSS</option>
            <option value="yaml">YAML</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="Mélanger l'ordre des cartes"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Mélanger</span>
          </button>
          <span className="font-mono text-slate-500 dark:text-slate-400">
            {currentIndex + 1} / {filteredCards.length}
          </span>
        </div>
      </div>

      {/* Progress pill */}
      <div className="flex items-center justify-between text-xs px-1 text-slate-500">
        <span className="flex items-center gap-1.5">
          <BookMarked className="w-3.5 h-3.5 text-indigo-500" />
          <span>Maîtrisées : {masteredIds.size} / {cards.length}</span>
        </span>
        <span className="text-[11px] text-slate-400">Cliquez sur la carte pour voir la réponse</span>
      </div>

      {/* Interactive Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[300px] sm:min-h-[320px] rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-8 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between relative group select-none"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono">
              {activeCard.languageId.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              &bull; {activeCard.category}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMastered(activeCard.id);
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isMastered
                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50'
                : 'text-slate-300 dark:text-slate-600 hover:text-slate-500'
            }`}
            title={isMastered ? 'Marquée comme maîtrisée' : 'Marquer comme maîtrisée'}
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="my-auto py-4 text-center">
          {!isFlipped ? (
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
                Question
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                {activeCard.question}
              </h3>
            </div>
          ) : (
            <div className="text-left animate-fadeIn">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">
                Réponse & Explication
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                {activeCard.answer}
              </p>
              {activeCard.codeSnippet && (
                <div className="mt-3 p-3 rounded-xl bg-[#1e222b] text-pink-300 font-mono text-xs border border-slate-700">
                  {activeCard.codeSnippet}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlipped ? 'Afficher la question' : 'Afficher la réponse'}</span>
          </div>

          {activeCard.hint && !isFlipped && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowHint(!showHint);
              }}
              className="text-[11px] text-indigo-500 hover:underline flex items-center gap-1"
            >
              <HelpCircle className="w-3 h-3" />
              <span>{showHint ? activeCard.hint : 'Voir un indice'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Précédente</span>
        </button>

        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition-colors cursor-pointer shadow-sm"
        >
          <span>Suivante</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
