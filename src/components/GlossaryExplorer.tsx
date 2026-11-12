import React, {useEffect, useMemo, useState} from 'react';
import {BookOpen, Bookmark, BookmarkCheck, Code2, Search, X} from 'lucide-react';
import {GLOSSARY_ENTRIES} from '../data/glossaryData';
import {TECHNOLOGY_ORDER, LANGUAGE_NAMES} from '../data/languageOrder';
import type {LanguageId} from '../types';

type Props={
  initialLanguage?:string;
  onOpenCourse:(language:LanguageId)=>void;
  onOpenLab:(language:string)=>void;
};
const storageKey='ds-glossary-favorites-v1';
const readFavorites=():string[]=>{
  try{
    const value:unknown=JSON.parse(localStorage.getItem(storageKey)||'[]');
    return Array.isArray(value)?value.filter((id):id is string=>typeof id==='string'&&GLOSSARY_ENTRIES.some(item=>item.id===id)):[];
  }catch{return [];}
};

export const GlossaryExplorer:React.FC<Props>=({initialLanguage='all',onOpenCourse,onOpenLab})=>{
  const [selected,setSelected]=useState(initialLanguage);
  const [query,setQuery]=useState('');
  const [onlyFavorites,setOnlyFavorites]=useState(false);
  const [favorites,setFavorites]=useState<string[]>(readFavorites);
  useEffect(()=>setSelected(initialLanguage),[initialLanguage]);
  const filtered=useMemo(()=>GLOSSARY_ENTRIES.filter(entry=>
    (selected==='all'||entry.language===selected)&&
    (!onlyFavorites||favorites.includes(entry.id))&&
    (!query.trim()||[entry.term,entry.definition,entry.languageName].join(' ').toLocaleLowerCase('fr').includes(query.trim().toLocaleLowerCase('fr')))
  ),[selected,query,onlyFavorites,favorites]);
  const toggleFavorite=(id:string)=>{
    const next=favorites.includes(id)?favorites.filter(item=>item!==id):[...favorites,id];
    setFavorites(next);
    try{localStorage.setItem(storageKey,JSON.stringify(next));}catch{/* Le glossaire fonctionne sans stockage. */}
  };
  const coreIds=new Set(['html','css','xml','markdown','latex','json','yaml']);
  return <section aria-labelledby="glossary-title" className="space-y-5">
    <header className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 id="glossary-title" className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Glossaire des documents structurés</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Retrouvez les concepts définis dans les fiches de cours et les guides pédagogiques. Les définitions conservent leur formulation d’origine.</p>
        </div>
        <span className="rounded-full bg-sky-100 dark:bg-sky-950 px-3 py-1.5 text-xs font-bold text-sky-800 dark:text-sky-200">{GLOSSARY_ENTRIES.length} notions</span>
      </div>
    </header>
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3">
      <div className="grid sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-3">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          Rechercher une notion
          <div className="relative mt-1.5">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" aria-hidden="true"/>
            <input type="search" value={query} onChange={e=>setQuery(e.target.value)}
              aria-label="Rechercher dans le glossaire" placeholder="Attribut, sémantique, tableau, namespace…"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 pl-9 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"/>
          </div>
        </label>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          Langage ou technologie
          <select value={selected} onChange={e=>setSelected(e.target.value)}
            aria-label="Langage du glossaire"
            className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm">
            <option value="all">Tous les langages</option>
            {TECHNOLOGY_ORDER.map(lang=><option key={lang} value={lang}>{LANGUAGE_NAMES[lang]}</option>)}
          </select>
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" aria-pressed={onlyFavorites} onClick={()=>setOnlyFavorites(!onlyFavorites)}
          className={'inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold '+(onlyFavorites
            ?'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-200'
            :'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700')}>
          <Bookmark className="w-4 h-4"/> Mes favoris ({favorites.length})
        </button>
        {(query||selected!=='all'||onlyFavorites)&&<button type="button" onClick={()=>{setQuery('');setSelected('all');setOnlyFavorites(false);}}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-sky-800 dark:text-sky-200">
          <X className="w-3.5 h-3.5"/> Effacer les filtres
        </button>}
        <p role="status" className="ml-auto text-xs text-slate-600 dark:text-slate-300">{filtered.length} notion{filtered.length>1?'s':''} affichée{filtered.length>1?'s':''}</p>
      </div>
    </div>
    {filtered.length?<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {filtered.map(item=><article key={item.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:border-sky-400 dark:hover:border-sky-700">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 min-w-0">
            <p className="text-[11px] font-extrabold text-sky-700 dark:text-sky-300">{item.languageName} · {item.origin}</p>
            <h4 className="text-sm font-black leading-snug text-slate-900 dark:text-white">{item.term}</h4>
          </div>
          <button type="button" onClick={()=>toggleFavorite(item.id)} aria-pressed={favorites.includes(item.id)}
            aria-label={(favorites.includes(item.id)?'Retirer des favoris : ':'Ajouter aux favoris : ')+item.term}
            className="shrink-0 rounded-lg p-2 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500">
            {favorites.includes(item.id)?<BookmarkCheck className="w-4 h-4"/>:<Bookmark className="w-4 h-4"/>}
          </button>
        </div>
        <p className="flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{item.definition}</p>
        {item.snippet&&<pre className="max-h-24 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-slate-100 dark:bg-slate-800 p-2.5 font-mono text-[11px]">{item.snippet}</pre>}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-2">
          {coreIds.has(item.language)?
            <button type="button" onClick={()=>onOpenCourse(item.language as LanguageId)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold text-sky-800 dark:text-sky-200 hover:bg-sky-50 dark:hover:bg-sky-950/40">
              <BookOpen className="w-3.5 h-3.5"/> Voir sa fiche
            </button>:
            <button type="button" onClick={()=>onOpenLab(item.language)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold text-sky-800 dark:text-sky-200 hover:bg-sky-50 dark:hover:bg-sky-950/40">
              <Code2 className="w-3.5 h-3.5"/> Expérimenter
            </button>}
        </div>
      </article>)}
    </div>:<div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center space-y-3">
      <p className="font-bold text-slate-900 dark:text-white">Aucune notion ne correspond à votre sélection.</p>
      <button type="button" onClick={()=>{setQuery('');setSelected('all');setOnlyFavorites(false);}} className="rounded-lg bg-sky-700 px-4 py-2 text-white text-xs font-bold">Afficher tout le glossaire</button>
    </div>}
    <p className="text-[11px] text-slate-500 dark:text-slate-400">Les favoris sont enregistrés seulement dans ce navigateur. Le glossaire reprend le contenu pédagogique du portail et ne remplace pas les spécifications officielles.</p>
  </section>;
};
