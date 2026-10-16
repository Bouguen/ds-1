import React, { useState } from 'react';
import { DATA_FORMATS_COMPARISON, DOCUMENT_FORMATS_COMPARISON, DECISION_GUIDE } from '../data/comparisonData';
import { HelpCircle, CheckCircle2, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';

export const ComparisonView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'formats' | 'wizard'>('formats');
  const [selectedFormatCategory, setSelectedFormatCategory] = useState<'data' | 'docs'>('data');
  const [selectedDecisionOption, setSelectedDecisionOption] = useState<number | null>(0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>⚖️ Comparatif & Arbre Décisionnel</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Comprenez les compromis architecturaux (lisibilité, typage, validation, performance) entre chaque langage.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('formats')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'formats'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Tableaux Comparatifs
          </button>
          <button
            onClick={() => setActiveSubTab('wizard')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'wizard'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guide de Choix Interactif</span>
          </button>
        </div>
      </div>

      {/* View 1: Tables */}
      {activeSubTab === 'formats' && (
        <div className="space-y-6">
          {/* Format Selector Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFormatCategory('data')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFormatCategory === 'data'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              Données & APIs : JSON vs XML vs YAML
            </button>
            <button
              onClick={() => setSelectedFormatCategory('docs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFormatCategory === 'docs'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              Documents & Rédaction : HTML vs Markdown vs LaTeX
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {selectedFormatCategory === 'data' ? (
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4 w-1/4">Critère Technique</th>
                      <th className="p-4 text-emerald-600 dark:text-emerald-400">JSON (RFC 8259)</th>
                      <th className="p-4 text-amber-600 dark:text-amber-400">XML (W3C)</th>
                      <th className="p-4 text-violet-600 dark:text-violet-400">YAML 1.2</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                    {DATA_FORMATS_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 font-semibold text-slate-900 dark:text-white bg-slate-50/30 dark:bg-slate-800/10">
                          {row.feature}
                        </td>
                        <td className="p-4 text-slate-700 dark:text-slate-300 leading-relaxed">{row.json}</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300 leading-relaxed">{row.xml}</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300 leading-relaxed">{row.yaml}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4 w-1/4">Critère Technique</th>
                      <th className="p-4 text-orange-600 dark:text-orange-400">HTML5</th>
                      <th className="p-4 text-purple-600 dark:text-purple-400">Markdown</th>
                      <th className="p-4 text-pink-600 dark:text-pink-400">LaTeX</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                    {DOCUMENT_FORMATS_COMPARISON.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 font-semibold text-slate-900 dark:text-white bg-slate-50/30 dark:bg-slate-800/10">
                          {row.feature}
                        </td>
                        <td className="p-4 text-slate-700 dark:text-slate-300 leading-relaxed">{row.html}</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300 leading-relaxed">{row.markdown}</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300 leading-relaxed">{row.latex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View 2: Interactive Decision Wizard */}
      {activeSubTab === 'wizard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Question & Options */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {DECISION_GUIDE[0].question}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sélectionnez la description qui correspond à votre projet ou exercice pour obtenir la recommandation immédiate :
            </p>

            <div className="space-y-2.5">
              {DECISION_GUIDE[0].options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedDecisionOption(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    selectedDecisionOption === idx
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 shadow-sm ring-1 ring-indigo-500/50'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    selectedDecisionOption === idx
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedDecisionOption === idx && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {opt.label}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {opt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation Result Card */}
          <div className="lg:col-span-5">
            {selectedDecisionOption !== null && (
              <div className="sticky top-24 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-indigo-700/50 space-y-5">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-mono uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Recommandation de l'Architecte</span>
                </div>

                <div>
                  <span className="text-xs text-indigo-200">Langage / Format conseillé :</span>
                  <div className="text-2xl font-black tracking-tight text-white mt-1">
                    {DECISION_GUIDE[0].options[selectedDecisionOption].recommended}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs text-indigo-100 leading-relaxed">
                  <span className="font-bold text-white block mb-1">Pourquoi ce choix ?</span>
                  {DECISION_GUIDE[0].options[selectedDecisionOption].reason}
                </div>

                <div className="pt-2 border-t border-indigo-700/40 text-[11px] text-indigo-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Conforme aux exigences d'architecture logicielle standard</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
