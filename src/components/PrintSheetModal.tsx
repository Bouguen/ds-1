import React from 'react';
import { LANGUAGES_DATA } from '../data/languagesData';
import { Printer, X, Download, BookOpen, Check } from 'lucide-react';

interface PrintSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintSheetModal: React.FC<PrintSheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex justify-center p-4 sm:p-6">
      <div className="bg-white text-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto max-h-[92vh]">
        {/* Modal Toolbar (hidden in print) */}
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-sm">
              Fiche Mémo Imprimable &bull; Devoir Surveillé (DS)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer ou Enregistrer en PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Area */}
        <div className="p-8 overflow-y-auto font-sans text-xs space-y-6 bg-white">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
              Langages de Structuration de Contenus
            </h1>
            <p className="text-sm font-serif text-slate-700 italic mt-1">
              Fiche de Synthèse & Mémento Pédagogique &bull; Révision Devoir Surveillé (DS)
            </p>
            <p className="text-[10px] text-slate-500 mt-1">
              Ressource éducative par N. ELM &bull; Édition 2025/2026
            </p>
          </div>

          {/* Grid of Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LANGUAGES_DATA.map((lang) => (
              <div
                key={lang.id}
                className="border border-slate-300 rounded-lg p-3 bg-slate-50/50 break-inside-avoid space-y-2"
                style={{ borderTop: `4px solid ${lang.color.primary}` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{lang.icon}</span>
                    <span className="font-bold text-sm text-slate-900">{lang.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">({lang.year})</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase bg-slate-200 px-1.5 py-0.5 rounded">
                    {lang.creator}
                  </span>
                </div>

                <p className="text-[11px] text-slate-700 leading-snug">
                  {lang.tagline}
                </p>

                {/* Key Concepts */}
                <div>
                  <div className="font-bold text-[10px] uppercase tracking-wider text-slate-900 mb-1">
                    Concepts Clés à retenir :
                  </div>
                  <ul className="space-y-0.5 text-[10px] text-slate-800 pl-3 list-disc">
                    {lang.keyConcepts.slice(0, 3).map((c, i) => (
                      <li key={i}>
                        <strong>{c.term}</strong>: {c.definition.slice(0, 80)}...
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Pitfall */}
                {lang.commonPitfalls[0] && (
                  <div className="p-1.5 rounded bg-amber-50 border border-amber-200 text-[10px] text-amber-900">
                    <strong>⚠️ Piège DS : </strong>
                    {lang.commonPitfalls[0].problem}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer of sheet */}
          <div className="border-t border-slate-300 pt-3 text-[10px] text-slate-500 flex justify-between items-center">
            <span>Structura &bull; https://nouredelm.github.io/ds-fiche/</span>
            <span>Document imprimable pour révision académique</span>
          </div>
        </div>
      </div>
    </div>
  );
};
