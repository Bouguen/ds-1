import React, {useMemo} from 'react';
import type {LabTechnology} from './GuidedPractice';
import {produceStages} from '../utils/previewStages';

/** Shared result presentation for the complete example library and guided sandboxes. */
export const CodeResultPreview:React.FC<{language:LabTechnology,code:string,expanded?:boolean}>=({language,code,expanded=false})=>{
  const stages=useMemo(()=>produceStages(language,code),[language,code]);
  return <section data-testid="guided-preview" className="rounded-2xl border border-slate-200 dark:border-slate-700 p-3 sm:p-4 min-w-0 space-y-4 bg-slate-50 dark:bg-slate-950">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="font-black text-sm text-slate-900 dark:text-white">Résultat / aperçu</h3>
      <span className="text-[11px] font-bold rounded-full bg-sky-100 dark:bg-sky-950 px-2.5 py-1 text-sky-800 dark:text-sky-200">Mise à jour selon la source</span>
    </div>
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 space-y-2" data-testid="intermediate-stage">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-bold text-sm text-slate-900 dark:text-white">2 · Résultat intermédiaire</h4>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">Analyse / transformation</span>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-300">{stages.label}</p>
      {stages.error?<p role="status" className="rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 p-3 text-xs break-words">{stages.error}</p>:
        <pre className={(expanded?'max-h-[65vh]':'max-h-64')+' whitespace-pre-wrap break-words overflow-auto rounded-lg bg-slate-100 dark:bg-slate-800 p-3 font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-200'}>{stages.middle}</pre>}
    </div>
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 space-y-2" data-testid="browser-stage">
      <h4 className="font-bold text-sm text-slate-900 dark:text-white">3 · Rendu dans le navigateur</h4>
      {stages.web?<iframe title="Rendu final dans une page isolée" sandbox="" referrerPolicy="no-referrer" srcDoc={stages.web}
        className={(expanded?'h-[65vh]':'h-64')+' w-full bg-white border border-slate-300 rounded-lg'}/>:
        stages.math?<div className="rounded-lg bg-white text-slate-900 p-4 overflow-auto" dangerouslySetInnerHTML={{__html:stages.math}}/>:
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 p-3">Pas de rendu Web natif pertinent pour cet exemple. Consultez le résultat intermédiaire et les explications.</p>}
    </div>
    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{stages.note}</p>
    <p className="text-[11px] text-slate-500 dark:text-slate-400">Le rendu Web est isolé et n’autorise pas l’exécution de scripts. Pour XML, JSON et XPath, une présentation pédagogique HTML est signalée comme telle.</p>
  </section>;
};
