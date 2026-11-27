import React, { useEffect, useRef, useState } from 'react';
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
  LibraryBig,
  Workflow,
  Menu,
  ChevronUp
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
  const [menuExpanded, setMenuExpanded] = useState(false);

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
      <div className="bg-gradient-to-r from-[#063a63] via-[#075e9a] to-[#07849e] dark:from-[#1b3c5e] dark:via-[#20517a] dark:to-[#17638a] text-white py-2 px-3 sm:px-4 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-[minmax(0,1fr)_auto] md:flex items-center justify-between gap-x-3 gap-y-1.5">
          <div className="text-left space-y-0.5 min-w-0 md:flex-1">
            <h1>
              <button type="button" onClick={() => { setMenuExpanded(false); onGoHome(); }} aria-label="Retour à l’accueil — Structura"
                title="Revenir à l’accueil et aux fiches de cours"
                className="flex flex-wrap text-left items-baseline justify-start gap-x-2 gap-y-0.5 rounded-xl p-1 -m-1 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 transition-colors cursor-pointer">
                <span className="p-0.5 rounded-lg bg-white/10 shrink-0 self-center">
                  <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" aria-hidden="true" focusable="false">
                    {/* Données, document balisé et arborescence : symbole compact de Structura. */}
                    <path d="M3 12c0-2 3-3.5 7-3.5s7 1.5 7 3.5-3 3.5-7 3.5S3 14 3 12Z" fill="#7dd3fc" stroke="#bae6fd" strokeWidth="1.4"/>
                    <path d="M3 12v13c0 2 3 3.5 7 3.5s7-1.5 7-3.5V12M3 18c0 2 3 3.5 7 3.5M3 24c0 2 3 3.5 7 3.5" stroke="#bae6fd" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M13 3.5h15l8 8V35H13a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" fill="#164e78" stroke="#e0f2fe" strokeWidth="1.7" strokeLinejoin="round"/>
                    <path d="M28 3.5v8h8" fill="#7dd3fc" stroke="#e0f2fe" strokeWidth="1.4" strokeLinejoin="round"/>
                    <path d="m20 8-4 4 4 4m8-8 4 4-4 4m-2-9-4 10" stroke="#fde047" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M24 23v4m-8 3v-3h16v3" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="20.5" y="19" width="7" height="5" rx="1" fill="#7dd3fc"/>
                    <rect x="13.5" y="29" width="5" height="4" rx="1" fill="#7dd3fc"/>
                    <rect x="21.5" y="29" width="5" height="4" rx="1" fill="#fde047"/>
                    <rect x="29.5" y="29" width="5" height="4" rx="1" fill="#7dd3fc"/>
                  </svg>
                </span>
                <span className="text-lg sm:text-2xl font-black tracking-tight text-yellow-300 leading-tight">
                  Structura
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-normal text-sky-100 leading-tight">
                  Langages et formats de structuration de contenu
                </span>
              </button>
            </h1>
            <p className="text-[10px] leading-snug text-sky-100 font-normal">
              Fiches détaillées, exemples pratiques, bacs à sable temps réel et ressources de référence pour les étudiants
            </p>
          </div>

        {/* Search input */}
        <div className="relative min-w-0 col-span-2 row-start-2 w-full max-w-[220px] md:row-auto md:col-span-1 md:w-40 lg:w-48 md:shrink-0">
          <Search className="w-3.5 h-3.5 text-sky-100 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            aria-label="Rechercher dans les fiches de cours"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher…"
            className="w-full pl-7 pr-6 py-1.5 text-xs rounded-xl bg-white/15 text-white placeholder:text-sky-100 border border-white/25 focus:border-white/70 focus:bg-white/20 outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Effacer la recherche"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-yellow-300 text-sm"
            >
              ×
            </button>
          )}
        </div>

          {/* Quick utility actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setMenuExpanded(open => !open)}
              aria-expanded={menuExpanded}
              aria-controls="structura-navigation"
              aria-label={menuExpanded ? "Replier le menu" : "Déployer le menu"}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold border border-white/20 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300"
            >
              {menuExpanded ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
              <span className="hidden sm:inline">Menu</span>
            </button>
            <button
              onClick={onOpenPrintModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer border border-white/20"
              title="Générer la fiche mémo imprimable ou PDF pour le DS"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Fiche Mémo DS</span>
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

      <div id="structura-navigation" hidden={!menuExpanded}>
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2">
        {/* Navigation Tabs */}
        <nav aria-label="Navigation principale" className="flex flex-wrap items-center gap-1 w-full lg:w-auto lg:flex-1">
          <button
            onClick={() => setActiveTab('fiches')}
            aria-current={activeTab === 'fiches' ? 'page' : undefined} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'fiches'
                ? 'bg-[#0071CF] text-white shadow-sm dark:bg-[#FFD477] dark:text-[#122e4b]'
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
                ? 'bg-[#0071CF] text-white shadow-sm dark:bg-[#FFD477] dark:text-[#122e4b]'
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
                ? 'bg-[#0071CF] text-white shadow-sm dark:bg-[#FFD477] dark:text-[#122e4b]'
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
                ? 'bg-[#0071CF] text-white shadow-sm dark:bg-[#FFD477] dark:text-[#122e4b]'
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
                ? 'bg-[#0071CF] text-white shadow-sm dark:bg-[#FFD477] dark:text-[#122e4b]'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Comparatifs</span>
          </button>

        </nav>


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
                  ? 'bg-[#0071CF] text-white shadow-sm dark:bg-[#FFD477] dark:text-[#122e4b]'
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
                  ? 'bg-[#0071CF] text-white shadow-sm dark:bg-[#FFD477] dark:text-[#122e4b]'
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
                  ? 'bg-[#0071CF] text-white shadow-sm dark:bg-[#FFD477] dark:text-[#122e4b]'
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
                        ? 'bg-slate-900 text-white dark:bg-[#FFD477] dark:text-[#122e4b] shadow-sm'
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
      </div>
    </header>
  );
};
