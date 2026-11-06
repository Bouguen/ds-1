import React, {useMemo, useState} from 'react';
import {BookOpen, Search, Pencil, RotateCcw, ChevronRight} from 'lucide-react';
import {CodeBlock} from './CodeBlock';
import {CodeResultPreview} from './CodeResultPreview';
import {formatExampleCode} from '../utils/formatExampleCode';
import {EXTENDED_EXAMPLES} from '../data/extendedExamples';
import {MASTERY_EXAMPLES} from '../data/masteryExamples';
import {ADVANCED_EXAMPLES} from '../data/advancedExamples';
import type {ExtendedExample} from '../data/extendedExamples';
import type {LabTechnology} from './GuidedPractice';

const EXAMPLES:ExtendedExample[]=[...EXTENDED_EXAMPLES,...MASTERY_EXAMPLES,...ADVANCED_EXAMPLES];
const LABELS:Record<string,string>={
  html:'HTML',xhtml:'XHTML',xml:'XML',dtd:'DTD',entities:'Entités XML',
  xpath:'XPath 1.0',xslt:'XSLT 1.0',css:'CSS',json:'JSON',
  markdown:'Markdown',latex:'LaTeX',yaml:'YAML'
};
const LANGUAGES=Object.keys(LABELS);

const ExampleWorkspace:React.FC<{item:ExtendedExample}>=({item})=>{
  const [code,setCode]=useState(()=>formatExampleCode(item.code,item.language));
  const [editing,setEditing]=useState(false);
  const [formatted,setFormatted]=useState(true);
  const [showSource,setShowSource]=useState(false);
  const isError=/erreur|incorrect|invalide/i.test(item.title);
  const reset=()=>{setCode(formatExampleCode(item.code,item.language));setEditing(false);setFormatted(true);};
  const shownCode=formatted?code: item.code;
  return <section className="min-w-0 space-y-3" aria-label="Exemple sélectionné" data-testid="example-workspace">
    <div className="flex flex-wrap justify-between gap-2 items-start">
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2 items-center text-xs mb-1">
          <span translate="no" className="notranslate font-bold text-sky-700 dark:text-sky-300">{LABELS[item.language]}</span>
          <span className="text-slate-500 dark:text-slate-400">{item.category} · {item.level}</span>
          {isError&&<span className="text-rose-700 dark:text-rose-300 font-semibold">Diagnostic volontaire</span>}
        </div>
        <h2 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white">{item.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.explanation}</p>
      </div>
      <button type="button" onClick={()=>setEditing(!editing)} aria-pressed={editing} className="inline-flex items-center gap-1.5 rounded-lg bg-sky-700 text-white px-3 py-2 text-xs font-bold">
        <Pencil className="w-3.5 h-3.5"/>{editing?'Terminer l’édition':'Modifier le code'}
      </button>
    </div>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 items-start">
      <div className="min-w-0 rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900" data-testid="example-code-panel">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold">Code source</h3>
          <div className="flex gap-1.5 flex-wrap">
            {!editing&&<button type="button" aria-pressed={!formatted} onClick={()=>{setFormatted(!formatted);setCode(formatted?item.code:formatExampleCode(item.code,item.language));}} className="px-2 py-1 border border-slate-300 dark:border-slate-700 rounded-md text-xs">{formatted?'Voir l’original':'Réindenter'}</button>}
            <button type="button" onClick={reset} className="px-2 py-1 border border-slate-300 dark:border-slate-700 rounded-md text-xs inline-flex gap-1 items-center"><RotateCcw className="w-3 h-3"/>Réinitialiser</button>
          </div>
        </div>
        {editing ? <textarea aria-label="Modifier le code de l’exemple" spellCheck={false} value={code} onChange={e=>setCode(e.target.value)} className="w-full h-[min(50vh,430px)] min-h-64 resize-y bg-[#171c26] text-slate-100 font-mono text-xs leading-relaxed p-3 rounded-lg border border-slate-700 focus:outline focus:outline-2 focus:outline-sky-500"/> :
          <div className="max-h-[430px] overflow-auto [&>div]:my-0 [&>div>div:last-child]:max-h-[390px]">
            <CodeBlock code={shownCode} language={item.language==='xhtml'||item.language==='xslt'?'xml':item.language} />
          </div>
        }
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Indentation automatique pour faciliter la lecture. Le code d’origine reste accessible.</p>
      </div>
      <div className="min-w-0" data-testid="example-render-panel">
        <CodeResultPreview language={item.language as LabTechnology} code={code}/>
      </div>
    </div>
    <details className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm">
      <summary className="cursor-pointer font-semibold">Explications complémentaires et origine</summary>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{item.explanation}</p>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{item.source}</p>
      <button className="mt-2 text-xs underline text-sky-700 dark:text-sky-300" onClick={()=>setShowSource(!showSource)} type="button">{showSource?'Masquer le code initial':'Voir le code initial non formaté'}</button>
      {showSource&&<pre className="mt-2 overflow-auto max-h-48 rounded bg-slate-100 dark:bg-slate-800 p-3 font-mono text-xs whitespace-pre-wrap break-all">{item.code}</pre>}
    </details>
  </section>;
};

export const ExamplesLibrary:React.FC=()=>{
  const [language,setLanguage]=useState('all');
  const [category,setCategory]=useState('all');
  const [level,setLevel]=useState('all');
  const [query,setQuery]=useState('');
  const [selectedId,setSelectedId]=useState('');
  const [limit,setLimit]=useState(40);

  const categories=useMemo(()=>Array.from(new Set(EXAMPLES.filter(x=>language==='all'||x.language===language).map(x=>x.category))).sort((a,b)=>a.localeCompare(b,'fr')),[language]);
  const filtered=useMemo(()=>EXAMPLES.filter(x=>{
    const q=query.trim().toLocaleLowerCase('fr');
    return (language==='all'||x.language===language)&&(category==='all'||x.category===category)
      &&(level==='all'||x.level===level)
      &&(!q||(x.title+' '+x.explanation+' '+x.category+' '+LABELS[x.language]+' '+x.code).toLocaleLowerCase('fr').includes(q));
  }),[language,category,level,query]);
  const selected=filtered.find(x=>x.id===selectedId)||filtered[0];
  const filterLang=(id:string)=>{setLanguage(id);setCategory('all');setSelectedId('');setLimit(40);};
  return <section className="w-full max-w-[1550px] mx-auto px-3 sm:px-5 py-4 space-y-4" aria-label="Bibliothèque d'exemples">
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
      <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 items-center">
          <BookOpen className="text-sky-600 w-5 h-5" aria-hidden="true"/>
          <div><h1 className="text-xl sm:text-2xl font-black">Bibliothèque d'exemples</h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">296 exemples commentés · 12 technologies · code indenté et résultat côte à côte.</p>
          </div>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">Choisir → Lire → Modifier → Comprendre</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 mt-4">
        <label className="relative block"><span className="block text-xs font-semibold mb-1">Rechercher</span><Search aria-hidden="true" className="w-4 h-4 absolute left-3 top-8 text-slate-400"/>
          <input type="search" value={query} onChange={e=>{setQuery(e.target.value);setLimit(40);setSelectedId('');}} placeholder="Concept, mot-clé ou code…" className="w-full border border-slate-300 dark:border-slate-700 bg-transparent rounded-lg pl-9 pr-3 py-2 text-sm"/>
        </label>
        <label className="block"><span className="block text-xs font-semibold mb-1">Langage</span>
          <select aria-label="Langage" value={language} onChange={e=>filterLang(e.target.value)} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm">
            <option value="all">Tous les langages</option>{LANGUAGES.map(id=><option key={id} value={id}>{LABELS[id]}</option>)}
          </select>
        </label>
        <label className="block"><span className="block text-xs font-semibold mb-1">Thème</span>
          <select value={category} onChange={e=>{setCategory(e.target.value);setSelectedId('');}} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm">
            <option value="all">Tous les thèmes</option>{categories.map(x=><option key={x} value={x}>{x}</option>)}
          </select>
        </label>
        <label className="block"><span className="block text-xs font-semibold mb-1">Niveau</span>
          <select value={level} onChange={e=>{setLevel(e.target.value);setSelectedId('');}} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm">
            <option value="all">Tous les niveaux</option>{['Débutant','Intermédiaire','Avancé'].map(x=><option key={x} value={x}>{x}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1" aria-label="Accès direct par langage">
        {LANGUAGES.map(x=><button key={x} type="button" aria-pressed={language===x} onClick={()=>filterLang(x)} className={'shrink-0 text-xs rounded-full px-3 py-1.5 border '+(language===x?'bg-sky-700 text-white border-sky-700':'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800')}>
          <span translate="no" className="notranslate">{LABELS[x]}</span> · {EXAMPLES.filter(a=>a.language===x).length}
        </button>)}
        {language!=='all'&&<button type="button" onClick={()=>filterLang('all')} className="text-xs underline px-2 shrink-0">Tous</button>}
      </div>
    </div>
    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400" role="status" aria-live="polite">
      <span>{filtered.length} exemple{filtered.length!==1?'s':''} trouvé{filtered.length!==1?'s':''}</span>
      <span>· Sélectionnez une fiche à gauche pour afficher son code et son résultat</span>
    </div>
    {selected ? <div className="grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] gap-3 items-start">
      <aside className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden lg:sticky lg:top-3" aria-label="Liste des exemples">
        <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 text-sm font-bold">Exemples disponibles</div>
        <div className="max-h-[230px] lg:max-h-[65vh] overflow-y-auto p-1.5 space-y-1">
          {filtered.slice(0,limit).map(x=><button type="button" key={x.id} onClick={()=>setSelectedId(x.id)} aria-current={selected.id===x.id?'true':undefined}
            className={'w-full text-left rounded-lg px-3 py-2.5 flex items-start gap-2 text-sm '+(selected.id===x.id?'bg-sky-100 text-sky-900 dark:bg-sky-950/60 dark:text-sky-100 font-semibold':'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800')}>
            <span className="min-w-0 flex-1"><span className="block text-[11px] text-slate-500 dark:text-slate-400" translate="no">{LABELS[x.language]}</span><span className="block leading-snug">{x.title}</span></span><ChevronRight className="w-3 h-3 mt-2 opacity-60 shrink-0"/>
          </button>)}
          {filtered.length>limit&&<button type="button" onClick={()=>setLimit(limit+40)} className="w-full text-xs font-bold underline text-sky-700 dark:text-sky-300 px-2 py-3">Afficher 40 autres exemples</button>}
        </div>
      </aside>
      <div className="min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4">
        <ExampleWorkspace key={selected.id} item={selected}/>
      </div>
    </div> : <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-sm">Aucun exemple ne correspond à ces filtres. Modifiez la recherche ou sélectionnez un autre langage.</div>}
  </section>;
};
