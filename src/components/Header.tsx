import React, { useEffect, useRef } from 'react';
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
  onGoHome: () => void;
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
  onGoHome,
  activeSandboxLang,
  onSelectSandboxLanguage
}) => {
  const headerRef = useRef<HTMLElement>(null);

  // Les ancres doivent tenir compte de la hauteur effective du bandeau collant,
  // y compris lorsque les boutons se répartissent sur plusieurs lignes en mobile.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => document.documentElement.style.setProperty('--ds-sticky-header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
    measure();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    observer?.observe(header);
    window.addEventListener('resize', measure);
    return () => { observer?.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Top Banner (Signature original blue header, refined) */}
      <div className="bg-gradient-to-r from-[#063a63] via-[#075e9a] to-[#07849e] text-white py-3 sm:py-4 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-3">
          <div className="text-left space-y-0.5 min-w-0">
            <h1>
              <button type="button" onClick={onGoHome} aria-label="Retour à l’accueil — Langages de structuration de contenus"
                title="Revenir à l’accueil et aux fiches de cours"
                className="flex text-left items-center justify-start gap-2.5 rounded-xl p-1 -m-1 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 transition-colors cursor-pointer">
                <span className="p-1.5 rounded-xl bg-white/15 backdrop-blur-sm shrink-0">
                  <GraduationCap className="w-6 h-6 text-yellow-300" aria-hidden="true" />
                </span>
                <span className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white leading-tight">
                  Langages de structuration de contenus
                </span>
              </button>
            </h1>
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
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2">
        {/* Navigation Tabs */}
        <nav aria-label="Navigation principale" className="flex flex-wrap items-center gap-1 w-full lg:w-auto lg:flex-1">
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

        </nav>

        {/* Search input */}
        <div className="w-full lg:w-60 xl:w-64 relative shrink-0">
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

      {/* Second menu row: secondary sections and direct access to the seven languages. */}
      <nav aria-label="Navigation secondaire" className="bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1">
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
          </div>
          {(activeTab === 'fiches' || activeTab === 'sandboxes') && (
            <div className="flex flex-wrap items-center gap-1" aria-label={activeTab === 'fiches' ? 'Accès direct aux titres des fiches' : 'Choisir le langage du bac à sable'}>
              {LANGUAGES_DATA.map((lang) => {
                const isCurrent = activeTab === 'sandboxes' && activeSandboxLang === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => {
                      if (activeTab === 'sandboxes') {
                        onSelectSandboxLanguage?.(lang.id);
                      } else {
                        onSelectLanguage(lang.id);
                      }
                    }}
                    aria-label={activeTab === 'sandboxes' ? 'Ouvrir le bac à sable '+lang.name : 'Accéder au titre de la fiche '+lang.name}
                    aria-current={isCurrent ? 'true' : undefined}
                    className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                      isCurrent
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm'
                    }`}
                  >
                    <span aria-hidden="true">{lang.icon}</span>
                    <span>{lang.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
