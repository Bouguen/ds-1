import React, { useState, useEffect } from 'react';
import { ActiveTab, LanguageId } from './types';
import { LANGUAGES_DATA } from './data/languagesData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LanguageCard } from './components/LanguageCard';
import { SandboxesView } from './components/SandboxesView';
import { ComparisonView } from './components/ComparisonView';
import { QuizView } from './components/QuizView';
import { FlashcardsView } from './components/FlashcardsView';
import { PrintSheetModal } from './components/PrintSheetModal';
import {
  Sparkles,
  BookOpen,
  Filter,
  Layers,
  HelpCircle,
  Code2,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('fiches');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDark, setIsDark] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [sandboxInitialLang, setSandboxInitialLang] = useState<string>('html');

  // Dark mode effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Jump to language card
  const handleSelectLanguage = (id: LanguageId) => {
    setActiveTab('fiches');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Open sandbox for a specific language
  const handleOpenSandbox = (langId: string) => {
    setSandboxInitialLang(langId);
    setActiveTab('sandboxes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter languages
  const filteredLanguages = LANGUAGES_DATA.filter((lang) => {
    const matchesSearch =
      searchQuery === '' ||
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.keyConcepts.some((c) =>
        c.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.definition.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'all' || lang.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'Tous les langages' },
    { id: 'Web & Balisage', label: '🌐 Web & HTML' },
    { id: 'Données & APIs', label: '📦 Données (JSON / XML / YAML)' },
    { id: 'Documentation', label: '📝 Documentation (Markdown)' },
    { id: 'Sciences & Typographie', label: '🔢 Mathématiques (LaTeX)' },
    { id: 'Style', label: '🎨 Style & Mise en page (CSS)' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f3f5] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDark={isDark}
        setIsDark={setIsDark}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Tab 1: FICHES DE COURS */}
        {activeTab === 'fiches' && (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {/* Intro Hero Banner */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-[#0071CF] dark:text-sky-300 border border-sky-100 dark:border-sky-900/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Édition Pédagogique Étudiants 2025/2026</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Maîtrisez les 6 piliers de la structuration de contenus
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  Consultez les fiches détaillées, testez le code en direct dans nos bacs à sable, repérez les pièges fréquents au DS et téléchargez votre fiche de révision.
                </p>
              </div>

              {/* Quick statistics / shortcuts badge */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20 cursor-pointer flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>S'auto-évaluer (Quiz DS)</span>
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <span>Mémento PDF</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Language Cards Grid */}
            {filteredLanguages.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredLanguages.map((language) => (
                  <LanguageCard
                    key={language.id}
                    language={language}
                    onOpenSandbox={handleOpenSandbox}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
                <p className="text-slate-500 text-sm">
                  Aucun langage ou concept ne correspond à « {searchQuery} ».
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-3 px-4 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-semibold cursor-pointer"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: BACS À SABLE INTERACTIFS */}
        {activeTab === 'sandboxes' && (
          <SandboxesView initialLanguage={sandboxInitialLang} />
        )}

        {/* Tab 3: COMPARATIFS & MATRICE */}
        {activeTab === 'compare' && <ComparisonView />}

        {/* Tab 4: QUIZ DS */}
        {activeTab === 'quiz' && (
          <QuizView onSwitchToFiches={() => setActiveTab('fiches')} />
        )}

        {/* Tab 5: FLASHCARDS */}
        {activeTab === 'flashcards' && <FlashcardsView />}
      </main>

      {/* Footer */}
      <Footer onSelectLanguage={handleSelectLanguage} setActiveTab={setActiveTab} />

      {/* Print Sheet Modal */}
      <PrintSheetModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />
    </div>
  );
}
