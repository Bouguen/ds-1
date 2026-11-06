import React from 'react';
import { ExternalLink, Heart, BookOpen, GraduationCap, Github } from 'lucide-react';
import { ActiveTab, LanguageId } from '../types';

interface FooterProps {
  onSelectLanguage: (id: LanguageId) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSandbox: (id: LanguageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectLanguage, setActiveTab, onOpenSandbox }) => {
  const navigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const openSandbox = (id: LanguageId) => {
    onOpenSandbox(id);
  };
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <GraduationCap className="w-5 h-5 text-sky-400" />
              <span>Structura &bull; DS Fiche</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Portail pédagogique de révision et d'expérimentation des formats de structuration de contenus pour étudiants en informatique et sciences du numérique.
            </p>
          </div>

          {/* Col 2: Langages */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Fiches de Cours
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => { navigate('fiches'); onSelectLanguage('html'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  HTML5 & Sémantique
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('fiches'); onSelectLanguage('xml'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  XML & Schémas XSD
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('fiches'); onSelectLanguage('json'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  JSON (RFC 8259) & APIs
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('fiches'); onSelectLanguage('markdown'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Markdown & Pandoc
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('fiches'); onSelectLanguage('latex'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  LaTeX & TeX Scientifique
                </button>
              </li>
              <li>
                <button
                  onClick={() => { navigate('fiches'); onSelectLanguage('css'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  CSS3, Flexbox & Grid
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Outils Interactifs */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Bacs à Sable & Outils
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => openSandbox('html')} className="hover:text-white transition-colors cursor-pointer">
                  Web Studio HTML + CSS
                </button>
              </li>
              <li>
                <button onClick={() => openSandbox('markdown')} className="hover:text-white transition-colors cursor-pointer">
                  Éditeur Markdown & KaTeX
                </button>
              </li>
              <li>
                <button onClick={() => openSandbox('json')} className="hover:text-white transition-colors cursor-pointer">
                  Validateur JSON & Arbre
                </button>
              </li>
              <li>
                <button onClick={() => openSandbox('css')} className="hover:text-white transition-colors cursor-pointer">
                  Simulateur CSS Box Model
                </button>
              </li>
              <li>
                <button onClick={() => openSandbox('xml')} className="hover:text-white transition-colors cursor-pointer">
                  Validateur XML & Arbre
                </button>
              </li>
              <li>
                <button onClick={() => navigate('compare')} className="hover:text-white transition-colors cursor-pointer">
                  Matrice Comparative & Guide de choix
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Révision & Attribution */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Révision DS & Examen
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => navigate('quiz')} className="hover:text-white transition-colors cursor-pointer">
                  Quiz d'auto-évaluation DS
                </button>
              </li>
              <li>
                <button onClick={() => navigate('flashcards')} className="hover:text-white transition-colors cursor-pointer">
                  Flashcards de mémorisation
                </button>
              </li>
              <li>
                <a
                  href="https://nouredelm.github.io/ds-fiche/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Site source original</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line preserving author's authentic signature */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            &copy; 2025–2026 &bull; Fiches enrichies pour l'éducation par <strong className="text-slate-200">N. ELM</strong> &bull; Langages de structuration de contenus
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Conçu avec passion pour la réussite étudiante</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
