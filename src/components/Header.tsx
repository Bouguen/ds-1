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
  Workflow,
  Menu,
  ChevronUp
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  studioMode?: boolean;
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
  studioMode = false,
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
  const [studioMenuOpen, setStudioMenuOpen] = React.useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);
  const showNavigation = !studioMode || studioMenuOpen;
  useEffect(() => { if (!studioMode) setStudioMenuOpen(false); }, [studioMode]);
  useEffect(() => { setStudioMenuOpen(false); setMobileSearchOpen(false); }, [activeTab]);

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
  }, [studioMode, studioMenuOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Top Banner (Signature original blue header, refined) */}
      <div className={`bg-gradient-to-r from-[#063a63] via-[#075e9a] to-[#07849e] text-white px-4 shadow-sm ${studioMode ? 'py-1.5' : 'py-3 sm:py-4'}`}>
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-3">
          <div className="text-left space-y-0.5 min-w-0">
            <h1>
              <button type="button" onClick={onGoHome} aria-label="Retour à l’accueil — Langages de structuration de contenus"
                title="Revenir à l’accueil et aux fiches de cours"
                className="flex text-left items-center justify-start gap-2 rounded-xl p-1 -m-1 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 transition-colors cursor-pointer">
                <span className={`rounded-xl bg-white/15 backdrop-blur-sm shrink-0 ${studioMode ? 'p-1' : 'p-1.5'}`}>
                  <GraduationCap className={`${studioMode ? 'w-5 h-5' : 'w-6 h-6'} text-yellow-300`} aria-hidden="true" />
                </span>
                <span className={`font-black tracking-tight text-white leading-tight ${studioMode ? 'text-sm sm:text-base' : 'text-base sm:text-xl lg:text-2xl'}`}>
                  {studioMode ? 'Documents structurés' : 'Langages de structuration de contenus'}
                </span>
              </button>
            </h1>
            <p className={`${studioMode ? 'hidden' : 'hidden sm:block'} text-xs text-sky-100 font-medium max-w-2xl`}>
              Fiches de cours, bibliothèque d’exemples, ateliers libres et exercices guidés pour les étudiants
            </p>
          </div>

          {/* Quick utility actions */}
          <div className={`${showNavigation ? 'flex' : 'hidden'} items-center gap-2 shrink-0`}>
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
          {studioMode && <button type="button" onClick={() => setStudioMenuOpen(open => !open)}
            aria-controls="ds-site-navigation" aria-expanded={studioMenuOpen}
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">
            {studioMenuOpen ? <ChevronUp className="w-4 h-4" aria-hidden="true"/> : <Menu className="w-4 h-4" aria-hidden="true"/>}
            {studioMenuOpen ? 'Masquer le menu' : 'Menu du site'}
          </button>}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div id="ds-site-navigation" className={`${showNavigation ? 'flex' : 'hidden'} max-w-7xl mx-auto px-4 py-2 flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2`}>
        {/* Navigation Tabs */}
        <nav aria-label="Navigation principale" className="flex flex-nowrap items-center gap-1 w-full min-w-0 overflow-x-auto lg:flex-1 whitespace-nowrap">
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
            <span>Ateliers de pratique</span>
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

          {/* Recherche compacte : dans la même ligne que les cinq rubriques, après Comparatifs. */}
          <div className="shrink-0 ml-auto">
            <div className="hidden md:block w-[175px] xl:w-[210px] relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input type="search" aria-label="Rechercher dans les fiches de cours" value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)} placeholder="Rechercher…"
                className="w-full pl-8 pr-7 py-2 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-transparent focus:border-[#0071CF] outline-none"/>
              {searchQuery && <button type="button" onClick={() => setSearchQuery('')} aria-label="Effacer la recherche" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-sky-700">×</button>}
            </div>
            <button type="button" onClick={() => setMobileSearchOpen(open => !open)}
              aria-label="Ouvrir la recherche de cours" aria-expanded={mobileSearchOpen}
              aria-controls="ds-mobile-search" className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Search className="w-4 h-4" aria-hidden="true"/>
            </button>
          </div>
        </nav>
        {mobileSearchOpen && <div id="ds-mobile-search" className="md:hidden relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden="true" />
          <input type="search" aria-label="Rechercher dans les fiches de cours" autoFocus value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)} placeholder="Cours ou concept…"
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-9 pr-3 py-2 text-sm text-slate-800 dark:text-white"/>
        </div>}
      </div>

      {/* Second menu row: secondary sections and direct access to the seven languages. */}
      <nav aria-label="Navigation secondaire" className={`${showNavigation ? 'block' : 'hidden'} bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 px-4 py-2`}>
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
            <div className="flex flex-wrap items-center gap-1" aria-label={activeTab === 'fiches' ? 'Accès direct aux titres des fiches' : 'Choisir le langage de l’atelier'}>
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
                    aria-label={activeTab === 'sandboxes' ? 'Ouvrir l’atelier '+lang.name : 'Accéder au titre de la fiche '+lang.name}
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
