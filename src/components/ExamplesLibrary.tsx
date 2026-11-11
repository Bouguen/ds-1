import React, {useMemo, useState} from 'react';
import {BookOpen, Search, Pencil, RotateCcw, ChevronRight, Columns2, Rows3, Code2, Eye, Copy, Check, Download, Maximize2, Minimize2} from 'lucide-react';
import {CodeBlock} from './CodeBlock';
import {CodeResultPreview} from './CodeResultPreview';
import {formatExampleCode} from '../utils/formatExampleCode';
import {ALL_EXAMPLES} from '../data/examplesCatalog';
import {ExampleLearningGuide} from '../data/exampleInsights';
import type {ExtendedExample} from '../data/extendedExamples';
import type {LabTechnology} from './GuidedPractice';
import {TECHNOLOGY_ORDER} from '../data/languageOrder';

const EXAMPLES:ExtendedExample[]=ALL_EXAMPLES;
const LABELS:Record<string,string>={
  html:'HTML',xhtml:'XHTML',xml:'XML',dtd:'DTD',entities:'Entités XML',
  xpath:'XPath 1.0',xslt:'XSLT 1.0',css:'CSS',json:'JSON',
  markdown:'Markdown',latex:'LaTeX',yaml:'YAML'
};
const LANGUAGES=TECHNOLOGY_ORDER;

const ExampleWorkspace:React.FC<{item:ExtendedExample}>=({item})=>{
  const [code,setCode]=useState(()=>formatExampleCode(item.code,item.language));
  const [editing,setEditing]=useState(false);
  const [formatted,setFormatted]=useState(true);
  const [showSource,setShowSource]=useState(false);
  const [layout,setLayout]=useState<'split'|'stack'|'code'|'result'>('split');
  const [expanded,setExpanded]=useState(false);
  const [copied,setCopied]=useState(false);
  const isError=/erreur|incorrect|invalide/i.test(item.title);
  const reset=()=>{setCode(formatExampleCode(item.code,item.language));setEditing(false);setFormatted(true);};
  const shownCode=formatted?code: item.code;
  const copy=async()=>{try{await navigator.clipboard.writeText(code);setCopied(true);}catch{setCopied(false);}};
  const download=()=>{
    const extension:Record<string,string>={html:'html',css:'css',xml:'xml',json:'json',yaml:'yaml',markdown:'md',latex:'tex',xpath:'xpath',xslt:'xsl',xhtml:'xhtml',dtd:'dtd',entities:'xml'};
    const blob=new Blob([code],{type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='exemple-'+item.id+'.'+(extension[item.language]||'txt');
    a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
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
        {item.audience && <p className="mt-2 text-xs font-semibold text-sky-800 dark:text-sky-200">Public / métier : {item.audience}</p>}
      </div>
      <button type="button" onClick={()=>setEditing(!editing)} aria-pressed={editing} className="inline-flex items-center gap-1.5 rounded-lg bg-sky-700 text-white px-3 py-2 text-xs font-bold">
        <Pencil className="w-3.5 h-3.5"/>{editing?'Terminer l’édition':'Modifier le code'}
      </button>
    </div>
    {item.challenge && <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 p-3">
        <h3 className="text-xs font-black uppercase tracking-wide text-sky-800 dark:text-sky-200">À vous de jouer</h3>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{item.challenge}</p>
      </div>
      <details className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 p-3">
        <summary className="cursor-pointer text-xs font-black uppercase tracking-wide text-emerald-800 dark:text-emerald-200">Résultat attendu · afficher les critères</summary>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{item.expectedOutcome}</p>
      </details>
    </div>}
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 p-2" aria-label="Affichage du code et du résultat">
      <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Disposition des panneaux">
        {([
          {id:'split',name:'Côte à côte',icon:Columns2},
          {id:'stack',name:'Empilés',icon:Rows3},
          {id:'code',name:'Code seul',icon:Code2},
          {id:'result',name:'Résultat seul',icon:Eye}
        ] as const).map(mode=><button key={mode.id} type="button" aria-pressed={layout===mode.id} onClick={()=>setLayout(mode.id)} className={'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold '+(layout===mode.id?'bg-white dark:bg-slate-700 text-sky-800 dark:text-sky-100 shadow-sm':'text-slate-600 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-700')}><mode.icon className="w-3.5 h-3.5"/>{mode.name}</button>)}
      </div>
      <button type="button" onClick={()=>setExpanded(!expanded)} className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-300 px-2 py-2">{expanded?<Minimize2 className="w-4 h-4"/>:<Maximize2 className="w-4 h-4"/>}{expanded?'Réduire les panneaux':'Agrandir les panneaux'}</button>
    </div>
    <div className={layout==='split'?'grid grid-cols-1 xl:grid-cols-2 gap-3 items-start':'grid grid-cols-1 gap-3 items-start'}>
      {layout!=='result'&&<div className="min-w-0 rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900" data-testid="example-code-panel">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold">Code source</h3>
          <div className="flex gap-1.5 flex-wrap">
            {!editing&&<button type="button" aria-pressed={!formatted} onClick={()=>{setFormatted(!formatted);setCode(formatted?item.code:formatExampleCode(item.code,item.language));}} className="px-2 py-1 border border-slate-300 dark:border-slate-700 rounded-md text-xs">{formatted?'Voir l’original':'Réindenter'}</button>}
            <button type="button" onClick={reset} className="px-2 py-1 border border-slate-300 dark:border-slate-700 rounded-md text-xs inline-flex gap-1 items-center"><RotateCcw className="w-3 h-3"/>Réinitialiser</button>
            <button type="button" onClick={copy} className="px-2 py-1 border border-slate-300 dark:border-slate-700 rounded-md text-xs inline-flex gap-1 items-center">{copied?<Check className="w-3 h-3"/>:<Copy className="w-3 h-3"/>}{copied?'Copié':'Copier'}</button>
            <button type="button" onClick={download} className="px-2 py-1 border border-slate-300 dark:border-slate-700 rounded-md text-xs inline-flex gap-1 items-center"><Download className="w-3 h-3"/>Exporter</button>
          </div>
        </div>
        {editing ? <textarea aria-label="Modifier le code de l’exemple" spellCheck={false} value={code} onChange={e=>setCode(e.target.value)} className={"w-full resize-y "+(expanded?"h-[min(70vh,760px)] min-h-[420px]":"h-[min(50vh,430px)] min-h-64")} bg-[#171c26] text-slate-100 font-mono text-xs leading-relaxed p-3 rounded-lg border border-slate-700 focus:outline focus:outline-2 focus:outline-sky-500"/> :
          <div className={(expanded?"max-h-[75vh]":"max-h-[430px]")+" overflow-auto [&>div]:my-0"}>
            <CodeBlock code={shownCode} language={item.language==='xhtml'||item.language==='xslt'?'xml':item.language} />
          </div>
        }
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Indentation automatique pour faciliter la lecture. Le code d’origine reste accessible.</p>
      </div>}
      {layout!=='code'&&<div className="min-w-0" data-testid="example-render-panel">
        <CodeResultPreview language={item.language as LabTechnology} code={code} expanded={expanded}/>
      </div>}
    </div>
    <details className="group rounded-2xl border border-sky-200 dark:border-sky-900 bg-white dark:bg-slate-900 p-4 shadow-sm text-sm">
      <summary className="cursor-pointer font-bold text-sky-800 dark:text-sky-200 flex flex-wrap items-center justify-between gap-2">Explications complémentaires et origine <span className="text-xs font-medium group-open:hidden">Afficher le guide détaillé</span><span className="text-xs font-medium hidden group-open:inline">Réduire</span></summary>
      <div className="mt-5 space-y-4">
        <ExampleLearningGuide item={item}/>
        <button className="text-xs underline text-sky-700 dark:text-sky-300 font-bold" onClick={()=>setShowSource(!showSource)} type="button">{showSource?'Masquer le code initial':'Voir le code initial non formaté'}</button>
        {showSource&&<pre className="mt-2 overflow-auto max-h-48 rounded bg-slate-100 dark:bg-slate-800 p-3 font-mono text-xs whitespace-pre-wrap break-all">{item.code}</pre>}
      </div>
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
  const [contentType,setContentType]=useState('all');

  const categories=useMemo(()=>Array.from(new Set(EXAMPLES.filter(x=>language==='all'||x.language===language).map(x=>x.category))).sort((a,b)=>a.localeCompare(b,'fr')),[language]);
  const filtered=useMemo(()=>EXAMPLES.filter(x=>{
    const q=query.trim().toLocaleLowerCase('fr');
    return (language==='all'||x.language===language)&&(category==='all'||x.category===category)
      &&(level==='all'||x.level===level)&&(contentType==='all'||(contentType==='case'?x.category==='Cas pratiques':x.category!=='Cas pratiques'))
      &&(!q||(x.title+' '+x.explanation+' '+x.category+' '+LABELS[x.language]+' '+x.code).toLocaleLowerCase('fr').includes(q));
  }),[language,category,level,query,contentType]);
  const selected=filtered.find(x=>x.id===selectedId)||filtered[0];
  const filterLang=(id:string)=>{setLanguage(id);setCategory('all');setSelectedId('');setLimit(40);};
  return <section className="w-full max-w-[1550px] mx-auto px-3 sm:px-5 py-4 space-y-4" aria-label="Bibliothèque d'exemples">
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
      <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 items-center">
          <BookOpen className="text-sky-600 w-5 h-5" aria-hidden="true"/>
          <div><h1 className="text-xl sm:text-2xl font-black">Bibliothèque d'exemples</h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{EXAMPLES.length} exemples et cas commentés · 12 technologies · 3 niveaux · code et résultat côte à côte.</p>
          </div>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">Choisir → Lire → Modifier → Comparer → Comprendre</div>
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
      <div className="mt-3 flex flex-wrap gap-2 items-center" role="group" aria-label="Type de contenu">
        {[
          {id:'all',label:'Tout explorer'},
          {id:'case',label:'Cas pratiques contextualisés'},
          {id:'example',label:'Exemples de syntaxe et applications'}
        ].map(option => <button key={option.id} type="button" aria-pressed={contentType===option.id} onClick={() => {setContentType(option.id);setSelectedId('');setCategory('all');setLimit(40);}} className={'rounded-lg px-3 py-2 text-xs font-bold border transition-colors '+(contentType===option.id?'bg-sky-800 text-white border-sky-800':'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800')}>{option.label}</button>)}
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
            <span className="min-w-0 flex-1"><span className="block text-[11px] text-slate-500 dark:text-slate-400" translate="no">{LABELS[x.language]} · {x.level}</span><span className="block leading-snug">{x.title}</span></span><ChevronRight className="w-3 h-3 mt-2 opacity-60 shrink-0"/>
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
