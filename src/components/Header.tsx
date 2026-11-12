import React from 'react';
import { ActiveTab, LanguageId } from '../types';
import { LANGUAGES_DATA } from '../data/languagesData';
import {
  BookOpen,
  Code2,
  SlidersHorizontal,
  HelpCircle,
  Layers,
  Search,
  Printer,
  Moon,
  Sun,
  GraduationCap,
  LibraryBig,
  Workflow
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onOpenPrintModal: () => void;
  onSelectLanguage: (id: LanguageId) => void;
  activeSandboxLang?: LanguageId;
  onSelectSandboxLanguage?: (id: LanguageId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  isDark,
  setIsDark,
  onOpenPrintModal,
  onSelectLanguage,
  activeSandboxLang,
  onSelectSandboxLanguage
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Top Banner (Signature original blue header, refined) */}
      <div className="bg-gradient-to-r from-[#063a63] via-[#075e9a] to-[#07849e] text-white py-3 sm:py-4 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-3">
          <div className="text-left space-y-0.5 min-w-0">
            <div className="flex items-center justify-start gap-2.5">
              <span className="p-1.5 rounded-xl bg-white/15 backdrop-blur-sm">
                <GraduationCap className="w-6 h-6 text-yellow-300" />
              </span>
              <h1 className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white leading-tight">
                Langages de structuration de contenus
              </h1>
            </div>
            <p className="hidden sm:block text-xs text-sky-100 font-medium max-w-2xl">
              Fiches détaillées, exemples pratiques, bacs à sable temps réel et ressources de référence pour les étudiants
            </p>
          </div>

          {/* Quick utility actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenPrintModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer border border-white/20"
              title="Générer la fiche mémo imprimable ou PDF pour le DS"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Fiche Mémo DS</span>
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer border border-white/20"
              title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
              aria-label="Basculer le thème"
              aria-pressed={isDark}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5">
        {/* Navigation Tabs */}
        <nav aria-label="Navigation principale" className="flex items-center gap-1 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('fiches')}
            aria-current={activeTab === 'fiches' ? 'page' : undefined} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'fiches'
                ? 'bg-[#0071CF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Fiches de Cours</span>
          </button>

          <button
            onClick={() => setActiveTab('exemples')}
            aria-current={activeTab === 'exemples' ? 'page' : undefined} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'exemples'
                ? 'bg-[#0071CF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>358 exemples</span>
          </button>

          <button
            onClick={() => setActiveTab('sandboxes')}
            aria-current={activeTab === 'sandboxes' ? 'page' : undefined} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'sandboxes'
                ? 'bg-[#0071CF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Bacs à Sable (Live)</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            aria-current={activeTab === 'projects' ? 'page' : undefined}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'projects'
                ? 'bg-[#0071CF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Mini-projets</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            aria-current={activeTab === 'compare' ? 'page' : undefined} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'compare'
                ? 'bg-[#0071CF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Comparatifs</span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            aria-current={activeTab === 'resources' ? 'page' : undefined}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'resources'
                ? 'bg-[#0071CF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <LibraryBig className="w-3.5 h-3.5" />
            <span>Références & outils</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            aria-current={activeTab === 'quiz' ? 'page' : undefined} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'quiz'
                ? 'bg-[#0071CF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Quiz DS</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            aria-current={activeTab === 'flashcards' ? 'page' : undefined} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'flashcards'
                ? 'bg-[#0071CF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards</span>
          </button>
        </nav>

        {/* Search input */}
        <div className="w-full lg:w-64 xl:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            aria-label="Rechercher dans les fiches de cours"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un cours ou un concept..."
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-transparent focus:border-[#0071CF] focus:bg-white dark:focus:bg-slate-900 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Sub-nav quick anchor bar for the original languages */}
      {(activeTab === 'fiches' || activeTab === 'sandboxes') && (
        <div className="bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 px-4 py-1.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto text-xs font-semibold">
            <span className="text-slate-400 text-[11px] uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
              {activeTab === 'sandboxes' ? 'Bac à sable actif :' : 'Accès fiches :'}
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {LANGUAGES_DATA.map((lang) => {
                const isCurrent = activeTab === 'sandboxes' && activeSandboxLang === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => {
                      if (activeTab === 'sandboxes') {
                        if (onSelectSandboxLanguage) onSelectSandboxLanguage(lang.id);
                      } else {
                        onSelectLanguage(lang.id);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isCurrent
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm font-bold ring-1 ring-slate-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xs'
                    }`}
                  >
                    <span>{lang.icon}</span>
                    <span>{lang.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
