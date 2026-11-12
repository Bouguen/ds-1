import React, { useEffect, useState } from 'react';
import { CourseLearningPath } from './CourseLearningPath';
import { LanguageData } from '../types';
import { CodeBlock } from './CodeBlock';
import { MASTERY_EXAMPLES } from '../data/masteryExamples';
import {
  ExternalLink,
  BookOpen,
  AlertCircle,
  Network,
  Calendar,
  User,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Tag,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

interface LanguageCardProps {
  language: LanguageData;
  onOpenSandbox: (langId: string) => void;
  onOpenResources: (langId: string) => void;
  openPathRequest?: number;
}

export const LanguageCard: React.FC<LanguageCardProps> = ({ language, onOpenSandbox, onOpenResources, openPathRequest = 0 }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'path' | 'tree' | 'pitfalls' | 'resources'>('overview');
  const [expandedConcepts, setExpandedConcepts] = useState<boolean>(true);
  const [showSupplementary, setShowSupplementary] = useState(false);
  const supplementary = MASTERY_EXAMPLES.filter(example => example.language === language.id);
  useEffect(() => { if (openPathRequest > 0) setActiveSubTab('path'); }, [openPathRequest]);

  return (
    <article
      id={language.id}
      className={`rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col`}
      style={{ borderTop: `6px solid ${language.color.primary}` }}
    >
      {/* Top Banner & Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 inline-flex items-center justify-center shadow-inner">
              {language.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 id={'course-title-' + language.id} tabIndex={-1} className="text-2xl font-black tracking-tight text-slate-900 dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 rounded-sm" style={{ color: language.color.primary, scrollMarginTop: 'calc(var(--ds-sticky-header-height, 180px) + 18px)' }}>
                  {language.name}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {language.category}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                {language.fullName}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {language.creator}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
              <Calendar className="w-3 h-3" />
              {language.year}
            </span>
          </div>
        </div>

        {/* Short description */}
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          {language.description}
        </p>

        {/* Fun Fact badge */}
        {language.funFact && (
          <div className="mt-3 flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span><strong>Le saviez-vous ?</strong> {language.funFact}</span>
          </div>
        )}
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-1 px-4 sm:px-6 pt-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs">
        <button
          onClick={() => setActiveSubTab('overview')}
          aria-pressed={activeSubTab === 'overview'}
          className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'overview'
              ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Fiche & Code</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('path')}
          aria-pressed={activeSubTab === 'path'}
          className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'path'
              ? 'border-indigo-700 dark:border-indigo-300 text-indigo-800 dark:text-indigo-200'
              : 'border-transparent text-slate-500 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true"/>
          <span>Parcours de maîtrise (3)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tree')}
          aria-pressed={activeSubTab === 'tree'}
          className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'tree'
              ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>Structure & Arborescence</span>
        </button>

        <button
          onClick={() => setActiveSubTab('pitfalls')}
          aria-pressed={activeSubTab === 'pitfalls'}
          className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'pitfalls'
              ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Pièges à Éviter au DS ({language.commonPitfalls.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('resources')}
          aria-pressed={activeSubTab === 'resources'}
          className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'resources'
              ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Ressources & Outils ({language.resources.length})</span>
        </button>
      </div>

      {/* Tab 1: Overview (Original ds-fiche content enhanced) */}
      {activeSubTab === 'overview' && (
        <div className="p-6 space-y-6 flex-1">
          {/* Practical Example */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <span>⚡ {language.practicalExample.title}</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {language.fileExtensions.join(', ')}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              {language.practicalExample.explanation}
            </p>

            <CodeBlock
              code={language.practicalExample.code}
              language={language.practicalExample.language}
              onRunInSandbox={() => onOpenSandbox(language.id)}
            />
          </div>

          {/* Examples hidden by default to keep the course readable. */}
          <section className="rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50/50 dark:bg-sky-950/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Exemples complémentaires et applications</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {(language.alternativeExamples?.length || 0) + supplementary.length} exemples supplémentaires pour approfondir ce langage.
                </p>
              </div>
              <button type="button" aria-expanded={showSupplementary} onClick={() => setShowSupplementary(!showSupplementary)}
                className="inline-flex gap-1 items-center text-xs font-semibold text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-lg px-3 py-2 shrink-0">
                {showSupplementary ? 'Réduire' : 'Explorer'}
                {showSupplementary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
            {showSupplementary && <div className="mt-4 space-y-4">
              {[...(language.alternativeExamples || []), ...supplementary.map(x => ({ title: x.title, code: x.code, language: x.language, explanation: x.explanation }))].map((x, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold mb-1">{x.title}</h4>
                  {x.explanation && <p className="text-xs text-slate-600 dark:text-slate-300">{x.explanation}</p>}
                  <CodeBlock code={x.code} language={x.language === 'xhtml' ? 'xml' : x.language} />
                </div>
              ))}
              <button type="button" onClick={() => onOpenSandbox(language.id)}
                className="rounded-lg bg-sky-700 text-white px-3 py-2 text-xs font-semibold">
                Passer à l'atelier de pratique guidée
              </button>
            </div>}
          </section>

          {/* Concepts Clés */}
          <div>
            <button
              type="button"
              onClick={() => setExpandedConcepts(!expandedConcepts)}
              aria-expanded={expandedConcepts}
              className="w-full flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-800 cursor-pointer group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">💡 Concepts Clés</span>
              <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" aria-hidden="true">
                {expandedConcepts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </span>
            </button>

            {expandedConcepts && (
              <ul className="mt-3 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                {language.keyConcepts.map((concept, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <span className="text-slate-400 font-bold shrink-0 mt-0.5">👉</span>
                    <div className="space-y-0.5">
                      <strong className="text-slate-900 dark:text-white font-bold block sm:inline mr-1">
                        {concept.term} :
                      </strong>
                      <span className="leading-relaxed">{concept.definition}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cas d'Utilisation Typiques */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
              🎯 Cas d'Utilisation Typiques
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {language.typicalUseCases.map((useCase, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-xs"
                >
                  <div className="font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{useCase.title}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'path' && <CourseLearningPath
        language={language.id} languageName={language.name}
        onOpenLab={onOpenSandbox} onOpenResources={onOpenResources}
      />}

      {/* Tab 2: Arborescence / Structure */}
      {activeSubTab === 'tree' && (
        <div className="p-6 flex-1 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Visualisation Structurelle & Organisation Hiérarchique
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comprendre l'organisation en arbre (nodes, feuilles, attributs) est fondamental pour la manipulation programmatique.
          </p>

          <LanguageStructuralTree languageId={language.id} />
        </div>
      )}

      {/* Tab 3: Common Pitfalls */}
      {activeSubTab === 'pitfalls' && (
        <div className="p-6 flex-1 space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              <strong>Astuce pour l'examen (DS) :</strong> Ce sont les fautes qui coûtent le plus de points aux étudiants lors des devoirs surveillés.
            </span>
          </div>

          <div className="space-y-4">
            {language.commonPitfalls.map((pitfall, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2 text-xs"
              >
                <div className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                  <span>{pitfall.title}</span>
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Erreur classique : </span>
                  {pitfall.problem}
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                  <span className="font-bold">Bonne pratique : </span>
                  {pitfall.solution}
                </div>
                {pitfall.badCode && pitfall.goodCode && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 font-mono text-[11px]">
                    <div className="p-2 rounded bg-rose-950/20 text-rose-300 border border-rose-900/50">
                      <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">❌ À bannir</span>
                      <code>{pitfall.badCode}</code>
                    </div>
                    <div className="p-2 rounded bg-emerald-950/20 text-emerald-300 border border-emerald-900/50">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">✅ Recommandé</span>
                      <code>{pitfall.goodCode}</code>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Resources */}
      {activeSubTab === 'resources' && (
        <div className="p-6 flex-1 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {language.resources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-slate-400 dark:hover:border-slate-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
                      <span>{res.title}</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                    {res.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {res.category}
                  </span>
                  {res.isOfficial && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      Officiel
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Card Action Footer */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
          <span>MIME : {language.mimeType}</span>
        </div>
        <div className="flex flex-wrap justify-end items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenResources(language.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sky-800 dark:text-sky-200 bg-sky-100 dark:bg-sky-950 hover:bg-sky-200 dark:hover:bg-sky-900 font-bold transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Références & outils</span>
          </button>
        <button
          onClick={() => onOpenSandbox(language.id)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-medium shadow-sm transition-all cursor-pointer"
          style={{ backgroundColor: language.color.primary }}
        >
          <span>Ouvrir dans le bac à sable</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
        </div>
      </div>
    </article>
  );
};

// Interactive structural tree visualizer for HTML, XML, JSON, etc.
function LanguageStructuralTree({ languageId }: { languageId: string }) {
  if (languageId === 'html') {
    return (
      <div className="p-4 rounded-xl bg-[#171a21] text-xs font-mono text-slate-300 border border-slate-800 space-y-1">
        <div className="text-amber-400 font-bold">&lt;!DOCTYPE html&gt;</div>
        <div className="text-sky-400 font-bold">&lt;html lang=&quot;fr&quot;&gt;</div>
        <div className="pl-4 text-purple-400 font-bold">&lt;head&gt;</div>
        <div className="pl-8 text-slate-400">&lt;meta charset=&quot;UTF-8&quot;&gt;</div>
        <div className="pl-8 text-emerald-300">&lt;title&gt;Structura DOM&lt;/title&gt;</div>
        <div className="pl-4 text-purple-400 font-bold">&lt;/head&gt;</div>
        <div className="pl-4 text-purple-400 font-bold">&lt;body&gt;</div>
        <div className="pl-8 text-rose-400 font-bold">&lt;header&gt;</div>
        <div className="pl-12 text-yellow-300">&lt;h1&gt;Bienvenue&lt;/h1&gt;</div>
        <div className="pl-8 text-rose-400 font-bold">&lt;/header&gt;</div>
        <div className="pl-8 text-rose-400 font-bold">&lt;main&gt;</div>
        <div className="pl-12 text-blue-300">&lt;article&gt;</div>
        <div className="pl-16 text-slate-400">&lt;p&gt;Nœud de texte dans le DOM&lt;/p&gt;</div>
        <div className="pl-12 text-blue-300">&lt;/article&gt;</div>
        <div className="pl-8 text-rose-400 font-bold">&lt;/main&gt;</div>
        <div className="pl-4 text-purple-400 font-bold">&lt;/body&gt;</div>
        <div className="text-sky-400 font-bold">&lt;/html&gt;</div>
      </div>
    );
  }

  if (languageId === 'xml') {
    return (
      <div className="p-4 rounded-xl bg-[#171a21] text-xs font-mono text-slate-300 border border-slate-800 space-y-1">
        <div className="text-amber-400">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</div>
        <div className="text-amber-500 font-bold">&lt;catalogue schemaVersion=&quot;2.0&quot;&gt; (Racine Unique)</div>
        <div className="pl-4 text-sky-400 font-bold">&lt;ouvrage id=&quot;item_01&quot;&gt;</div>
        <div className="pl-8 text-emerald-300">&lt;titre&gt;Les Misérables&lt;/titre&gt;</div>
        <div className="pl-8 text-yellow-300">&lt;auteur prenom=&quot;Victor&quot; nom=&quot;Hugo&quot;/&gt;</div>
        <div className="pl-4 text-sky-400 font-bold">&lt;/ouvrage&gt;</div>
        <div className="text-amber-500 font-bold">&lt;/catalogue&gt;</div>
      </div>
    );
  }

  if (languageId === 'json') {
    return (
      <div className="p-4 rounded-xl bg-[#171a21] text-xs font-mono text-slate-300 border border-slate-800 space-y-1">
        <div className="text-emerald-400 font-bold">&#123; (Objet racine)</div>
        <div className="pl-4 text-sky-300">&quot;utilisateur&quot;: &#123;</div>
        <div className="pl-8 text-slate-300">&quot;id&quot;: <span className="text-amber-400 font-semibold">1042</span>,</div>
        <div className="pl-8 text-slate-300">&quot;nom&quot;: <span className="text-emerald-300">&quot;Alice&quot;</span>,</div>
        <div className="pl-8 text-slate-300">&quot;roles&quot;: [ <span className="text-emerald-300">&quot;admin&quot;</span>, <span className="text-emerald-300">&quot;editor&quot;</span> ],</div>
        <div className="pl-8 text-slate-300">&quot;actif&quot;: <span className="text-purple-400 font-semibold">true</span></div>
        <div className="pl-4 text-sky-300">&#125;</div>
        <div className="text-emerald-400 font-bold">&#125;</div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
      <p className="leading-relaxed">
        Ce langage applique une séparation stricte des blocs (délimiteurs ou indentation) pour créer une hiérarchie logique reproductible et compilable.
      </p>
    </div>
  );
}
