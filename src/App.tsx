import React, { useState, useEffect } from 'react';
import { ActiveTab, LanguageId } from './types';
import { LANGUAGES_DATA } from './data/languagesData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LanguageCard } from './components/LanguageCard';
import { ExamplesLibrary } from './components/ExamplesLibrary';
import { SandboxesView } from './components/SandboxesView';
import { ComparisonView } from './components/ComparisonView';
import { QuizView } from './components/QuizView';
import { FlashcardsView } from './components/FlashcardsView';
import { PrintSheetModal } from './components/PrintSheetModal';
import { HomeLearningHub } from './components/HomeLearningHub';
import { ResourcesDirectory } from './components/ResourcesDirectory';
import {
  Filter,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('fiches');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDark, setIsDark] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [sandboxInitialLang, setSandboxInitialLang] = useState<LanguageId>('html');
  const [resourceLanguage, setResourceLanguage] = useState<string>('all');

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
    setSandboxInitialLang(langId as LanguageId);
    setActiveTab('sandboxes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenResources = (languageId: string) => {
    setResourceLanguage(languageId);
    setActiveTab('resources');
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
        setActiveTab={(tab) => { if (tab === 'resources') setResourceLanguage('all'); setActiveTab(tab); }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDark={isDark}
        setIsDark={setIsDark}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
        onSelectLanguage={handleSelectLanguage}
        activeSandboxLang={sandboxInitialLang}
        onSelectSandboxLanguage={(id) => setSandboxInitialLang(id)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Tab 1: FICHES DE COURS */}
        {activeTab === 'fiches' && (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <HomeLearningHub
              onNavigate={setActiveTab}
              onOpenLab={handleOpenSandbox}
              onPrint={() => setIsPrintModalOpen(true)}
            />

            <section id="catalogue-cours" className="space-y-3 scroll-mt-48" aria-labelledby="catalogue-cours-title">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-5 w-5 text-sky-700 dark:text-sky-300" aria-hidden="true"/>
                    <h2 id="catalogue-cours-title" className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Explorer les fiches de cours</h2>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Sept langages expliqués avec des concepts, des exemples et des erreurs à éviter.</p>
                </div>
                <button type="button" onClick={() => setActiveTab('exemples')} className="inline-flex items-center gap-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 px-4 py-2.5 font-bold text-sm text-sky-800 dark:text-sky-200 hover:bg-sky-100 dark:hover:bg-sky-900">
                  Bibliothèque d’exemples <ArrowRight className="w-4 h-4" aria-hidden="true"/>
                </button>
              </div>
            </section>

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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredLanguages.map((language) => (
                  <LanguageCard
                    key={language.id}
                    language={language}
                    onOpenSandbox={handleOpenSandbox}
                    onOpenResources={handleOpenResources}
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

        {activeTab === 'exemples' && <ExamplesLibrary />}

        {activeTab === 'resources' && <ResourcesDirectory initialLanguage={resourceLanguage} onOpenLab={handleOpenSandbox} />}

        {/* Tab 2: BACS À SABLE INTERACTIFS */}
        {activeTab === 'sandboxes' && (
          <SandboxesView
            initialLanguage={sandboxInitialLang}
            onLanguageChange={(id) => setSandboxInitialLang(id)}
          />
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
