import React, { useEffect, useMemo, useState } from 'react';
import katex from 'katex';
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ClipboardCopy, Code2, Download, Eye, Maximize2, Minimize2, Pencil, RotateCcw, Search, Sparkles } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { formatExampleCode } from '../utils/formatExampleCode';
import { GUIDED_EXAMPLES } from '../data/examplesCatalog';
import { ExampleLearningGuide } from '../data/exampleInsights';
import { CodeResultPreview } from './CodeResultPreview';
export type LabTechnology = 'html'|'xhtml'|'xml'|'dtd'|'entities'|'xpath'|'xslt'|'css'|'json'|'markdown'|'latex'|'yaml';
export const LAB_LABELS: Record<LabTechnology,string> = {
  html:'HTML',xhtml:'XHTML',xml:'XML',dtd:'DTD',entities:'Entités XML',xpath:'XPath',xslt:'XSLT',css:'CSS',
  json:'JSON',markdown:'Markdown',latex:'LaTeX',yaml:'YAML'
};
const CONCEPTS: Record<LabTechnology, {nodes:[string,string,string],explanation:string,challenge:string}> = {
 html:{nodes:['Balises','DOM','Page'],explanation:'Les balises définissent une arborescence de régions sémantiques.',challenge:'Remplacez une balise par un élément plus sémantique.'},
 xhtml:{nodes:['Balises fermées','XML','Conformité'],explanation:'La syntaxe XHTML impose une imbrication et une fermeture rigoureuses.',challenge:'Contrôlez les guillemets, les fermetures et la racine.'},
 xml:{nodes:['Racine','Enfants','Attributs'],explanation:'Un arbre de nœuds structure les données XML.',challenge:'Ajoutez un élément puis vérifiez la bonne formation.'},
 dtd:{nodes:['Document','DTD','Validité'],explanation:'Une DTD décrit les séquences, les occurrences et les attributs autorisés.',challenge:'Repérez les opérateurs de cardinalité (?, *, +).'},
 entities:{nodes:['Référence','Déclaration','Valeur'],explanation:'Une entité XML est résolue selon sa déclaration et le contexte de traitement.',challenge:'Distinguez les références prédéfinies et numériques.'},
 xpath:{nodes:['XML','Requête','Sélection'],explanation:'XPath 1.0 permet d’extraire des nœuds à l’aide d’un chemin et de prédicats.',challenge:'Testez un chemin dans le document XML fourni.'},
 xslt:{nodes:['XML','XSLT + XPath','Résultat'],explanation:'Les gabarits XSLT produisent un nouveau document à partir d’une source XML.',challenge:'Repérez match, select et value-of.'},
 css:{nodes:['Sélecteur','Cascade','Rendu'],explanation:'Les règles CSS gouvernent la présentation selon la cascade et la spécificité.',challenge:'Essayez de modifier une couleur ou une dimension.'},
 json:{nodes:['Objet','Clés','Valeurs'],explanation:'JSON encode des valeurs structurées, objets et tableaux.',challenge:'Ajoutez une nouvelle propriété correctement séparée.'},
 markdown:{nodes:['Texte','Syntaxe MD','Rendu'],explanation:'Markdown enrichit un texte brut avec des titres, listes et liens.',challenge:'Écrivez un titre et une liste dans votre document.'},
 latex:{nodes:['Commandes','Composition','Document'],explanation:'LaTeX transforme des commandes et des environnements en documents composés.',challenge:'Repérez les commandes et les arguments entre accolades.'},
 yaml:{nodes:['Retraits','Mapping','Données'],explanation:'L’indentation matérialise les niveaux de mappings et de listes.',challenge:'Ajoutez un élément de liste en respectant l’indentation.'}
};
const XML_SAMPLE = '<bibliotheque><livre id="l1" langue="fr"><titre>XML pour tous</titre><annee>2025</annee></livre><livre id="l2" langue="en"><titre>Web Basics</titre><annee>2022</annee></livre><livre id="l3" langue="fr"><titre>XPath avancé</titre><annee>2026</annee></livre></bibliotheque>';
type Feedback = {ok:boolean;message:string;result?:string};
function inspect(language:LabTechnology,code:string):Feedback {
  if(language==='json'){
    try {
      const parsed:unknown=JSON.parse(code);
      return {ok:true,message:'JSON syntaxiquement valide.',result:'Type racine : '+(Array.isArray(parsed)?'tableau':parsed===null?'null':typeof parsed)};
    }catch(error){return {ok:false,message:'JSON invalide : '+String(error)};}
  }
  if(language==='xml'||language==='xhtml'){
    const doc=new DOMParser().parseFromString(code,'application/xml');
    const error=doc.querySelector('parsererror');
    return error?{ok:false,message:'XML mal formé : '+(error.textContent||'').slice(0,220)}:{ok:true,message:'XML bien formé (pas de validation DTD ou XSD).',result:'Racine : '+doc.documentElement.nodeName};
  }
  if(language==='xpath'){
    const doc=new DOMParser().parseFromString(XML_SAMPLE,'application/xml');
    try{
      const value=doc.evaluate(code,doc,null,XPathResult.ANY_TYPE,null);
      if(value.resultType===XPathResult.NUMBER_TYPE)return {ok:true,message:'Expression évaluée.',result:String(value.numberValue)};
      if(value.resultType===XPathResult.STRING_TYPE)return {ok:true,message:'Expression évaluée.',result:value.stringValue};
      if(value.resultType===XPathResult.BOOLEAN_TYPE)return {ok:true,message:'Expression évaluée.',result:String(value.booleanValue)};
      const list:string[]=[];let node:Node|null;
      while((node=value.iterateNext())&&list.length<20)list.push(node.nodeName+': '+(node.textContent||node.nodeValue||'').trim().slice(0,60));
      return {ok:true,message:'XPath 1.0 évalué sur le catalogue fourni.',result:list.join('\n')||'Aucun nœud trouvé.'};
    }catch(error){return {ok:false,message:'Expression XPath invalide : '+String(error)};}
  }
  return {ok:true,message:'Mode édition et compréhension : aucune validation complète automatique de ce langage dans ce panneau.'};
}

export const GuidedPractice:React.FC<{language:LabTechnology}>=({language})=>{
  const examples=useMemo(()=>GUIDED_EXAMPLES[language] || [],[language]);
  const [level,setLevel]=useState('Tous');
  const [search,setSearch]=useState('');
  const visible=useMemo(()=>examples.filter(item=>
    (level==='Tous'||item.level===level)&&
    (!search.trim()||[item.title,item.explanation,item.category,item.code,item.audience||'']
      .join(' ').toLocaleLowerCase('fr').includes(search.trim().toLocaleLowerCase('fr')))
  ),[examples,level,search]);
  const [choice,setChoice]=useState('');
  const example=visible.find(item=>item.id===choice)||visible[0];
  const [code,setCode]=useState(example?.code||'');
  const [editorView,setEditorView]=useState<'edit'|'formatted'|'original'>('edit');
  const [layout,setLayout]=useState<'split'|'stack'|'code'|'result'>('split');
  const [expanded,setExpanded]=useState(false);
  const [explanation,setExplanation]=useState(false);
  const [feedback,setFeedback]=useState<Feedback|null>(null);
  const [copyStatus,setCopyStatus]=useState('');
  const [downloadStatus,setDownloadStatus]=useState('');
  const [completed,setCompleted]=useState<string[]>([]);
  const concept=CONCEPTS[language];
  const formattedCode=useMemo(()=>formatExampleCode(code,language),[code,language]);
  const selectedPosition=Math.max(0,visible.findIndex(item=>item.id===example?.id));

  useEffect(()=>{
    setChoice('');setLevel('Tous');setSearch('');
    setCode(examples[0]?.code||'');setEditorView('edit');setLayout('split');
    setExplanation(false);setFeedback(null);setCopyStatus('');setDownloadStatus('');
    setCompleted([]);
  },[language]);

  const selectExample=(id:string)=>{
    const selected=examples.find(item=>item.id===id);
    setChoice(id);setCode(selected?.code||'');setFeedback(null);
    setCopyStatus('');setDownloadStatus('');
  };
  const changeFilters=(nextLevel:string,nextSearch:string)=>{
    setLevel(nextLevel);setSearch(nextSearch);
    const next=examples.find(item=>(nextLevel==='Tous'||item.level===nextLevel)
      &&(!nextSearch.trim()||[item.title,item.explanation,item.category,item.code,item.audience||'']
        .join(' ').toLocaleLowerCase('fr').includes(nextSearch.trim().toLocaleLowerCase('fr'))));
    setChoice(next?.id||'');setCode(next?.code||'');setFeedback(null);
    setCopyStatus('');setDownloadStatus('');
  };
  const copy=async(pretty=false)=>{
    try{
      await navigator.clipboard.writeText(pretty?formattedCode:code);
      setCopyStatus(pretty?'Copie indentée effectuée':'Code copié');
    }catch{setCopyStatus('Copie non autorisée par le navigateur');}
  };
  const download=()=>{
    const extensions:Record<string,string>={html:'html',xhtml:'xhtml',css:'css',xml:'xml',json:'json',
      markdown:'md',latex:'tex',yaml:'yaml',xpath:'xpath',xslt:'xsl',dtd:'dtd',entities:'xml'};
    const url=URL.createObjectURL(new Blob([code],{type:'text/plain;charset=utf-8'}));
    const link=document.createElement('a');
    link.href=url;link.download='exercice-'+(example?.id||language)+'.'+(extensions[language]||'txt');
    link.click();setDownloadStatus('Fichier source exporté');
    window.setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  const next=()=>{
    if(!visible.length)return;
    selectExample(visible[(selectedPosition+1)%visible.length].id);
  };
  const previous=()=>{
    if(!visible.length)return;
    selectExample(visible[(selectedPosition+visible.length-1)%visible.length].id);
  };

  return <section aria-label={'Atelier guidé '+LAB_LABELS[language]} className="space-y-4">
    <header className="rounded-2xl border border-sky-200 dark:border-sky-900 bg-gradient-to-r from-sky-50 via-white to-indigo-50 dark:from-sky-950/40 dark:via-slate-900 dark:to-indigo-950/30 px-4 py-5 sm:px-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <span className="text-xs font-extrabold tracking-wide uppercase text-sky-700 dark:text-sky-300 flex items-center gap-2"><Sparkles className="w-4 h-4"/> Apprentissage progressif</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Pratique guidée · <span translate="no" className="notranslate">{LAB_LABELS[language]}</span></h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{examples.length} exemples commentés, du niveau débutant au niveau avancé. Étudiez le code indenté, modifiez la source, comparez le résultat et vérifiez votre compréhension.</p>
          <p className="text-xs font-semibold text-sky-800 dark:text-sky-200">{completed.length}/{examples.length} exercices marqués terminés dans cette session</p>
        </div>
        <div className="shrink-0 flex flex-col gap-2 sm:min-w-64">
          <label htmlFor="guided-search" className="text-xs font-bold text-slate-800 dark:text-slate-200">Trouver un exemple</label>
          <div className="relative">
            <Search aria-hidden="true" className="w-4 h-4 text-slate-400 absolute top-3 left-3"/>
            <input id="guided-search" type="search" value={search} onChange={e=>changeFilters(level,e.target.value)}
              placeholder="Balise, attribut, fonction, usage…" className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline focus:outline-2 focus:outline-sky-400"/>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrer les exemples guidés par niveau">
        {['Tous','Débutant','Intermédiaire','Avancé'].map(l=><button key={l} type="button" aria-pressed={level===l}
          onClick={()=>changeFilters(l,search)} className={'rounded-xl px-3 py-2 text-xs font-bold border transition-colors '+(level===l
          ?'border-sky-700 bg-sky-700 text-white shadow-sm'
          :'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800')}>
          {l} ({l==='Tous'?examples.length:examples.filter(item=>item.level===l).length})
        </button>)}
        <span role="status" className="text-xs text-slate-600 dark:text-slate-300 ml-auto">{visible.length} exercice{visible.length>1?'s':''} disponible{visible.length>1?'s':''}</span>
      </div>
    </header>

    {example ? <>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-end gap-3">
          <label htmlFor="guided-choice" className="flex-1 min-w-0 space-y-1.5">
            <span className="block text-xs font-bold text-slate-600 dark:text-slate-300">Choisir un scénario</span>
            <select id="guided-choice" value={example.id} onChange={e=>selectExample(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
              {visible.map(item=><option key={item.id} value={item.id}>{completed.includes(item.id)?'✓ ':''}{item.level} · {item.title}</option>)}
            </select>
          </label>
          <div className="flex gap-2 shrink-0">
            <button type="button" onClick={previous} aria-label="Exemple précédent" className="rounded-xl px-3 py-3 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800" title="Exemple précédent"><ArrowLeft className="w-4 h-4"/></button>
            <span className="self-center text-sm tabular-nums font-bold text-slate-600 dark:text-slate-300 min-w-12 text-center">{selectedPosition+1}/{visible.length}</span>
            <button type="button" onClick={next} aria-label="Exemple suivant" className="rounded-xl px-3 py-3 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800" title="Exemple suivant"><ArrowRight className="w-4 h-4"/></button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-200 px-3 py-1 text-xs font-bold">{example.level}</span>
          <span className="rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 text-xs">{example.category}</span>
          {example.audience&&<span className="text-xs text-slate-500 dark:text-slate-400">Public : {example.audience}</span>}
          {completed.includes(example.id)&&<span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 text-xs font-bold"><CheckCircle2 className="w-4 h-4"/> Terminé</span>}
        </div>
        <h3 className="text-lg font-black text-slate-900 dark:text-white">{example.title}</h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300"><strong>Objectif :</strong> {example.explanation}</p>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/20 p-3">
            <p className="text-xs uppercase tracking-wide font-black text-sky-800 dark:text-sky-200 mb-1">Votre défi</p>
            <p className="text-slate-700 dark:text-slate-300">{example.challenge||concept.challenge}</p>
          </div>
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20 p-3">
            <details>
              <summary className="text-xs uppercase tracking-wide font-black text-emerald-800 dark:text-emerald-200 cursor-pointer">Critères de réussite · afficher</summary>
              <p className="mt-2 text-slate-700 dark:text-slate-300">{example.expectedOutcome||'Le code illustre la notion annoncée, sa structure reste lisible et le résultat observé correspond à l’objectif de l’exercice. Une vérification humaine reste nécessaire.'}</p>
            </details>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-between rounded-xl bg-slate-100 dark:bg-slate-800 p-2">
        <div className="flex flex-wrap gap-1" role="group" aria-label="Disposition du code et du rendu">
          {([
            {id:'split',label:'Côte à côte'},
            {id:'stack',label:'Empilés'},
            {id:'code',label:'Code seul'},
            {id:'result',label:'Rendu seul'}
          ] as const).map(mode=><button key={mode.id} type="button" aria-pressed={layout===mode.id} onClick={()=>setLayout(mode.id)}
            className={'rounded-lg px-3 py-2 text-xs font-bold '+(layout===mode.id?'bg-white dark:bg-slate-700 shadow-sm text-sky-800 dark:text-sky-200':'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700')}>{mode.label}</button>)}
        </div>
        <button type="button" onClick={()=>setExpanded(!expanded)} className="rounded-lg px-3 py-2 text-xs font-bold text-sky-800 dark:text-sky-200 inline-flex items-center gap-1.5">
          {expanded?<Minimize2 className="w-4 h-4"/>:<Maximize2 className="w-4 h-4"/>}{expanded?'Réduire':'Agrandir'}
        </button>
      </div>

      <div className={layout==='split'?'grid grid-cols-1 lg:grid-cols-2 gap-4 items-start':'grid grid-cols-1 gap-4 items-start'}>
        {layout!=='result'&&<section data-testid="guided-code-panel" className="min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4 shadow-sm space-y-3">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2"><Code2 className="w-4 h-4 text-sky-700 dark:text-sky-300"/><h4 className="font-black text-sm text-slate-900 dark:text-slate-100">Code source</h4></div>
            <span className="text-xs text-slate-500 dark:text-slate-400">{code.split('\n').length} ligne{code.split('\n').length>1?'s':''}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800 p-1" role="group" aria-label="Mode d'affichage du code">
            {([
              {id:'edit',label:'Modifier',icon:Pencil},
              {id:'formatted',label:'Code indenté',icon:Sparkles},
              {id:'original',label:'Code original',icon:Eye}
            ] as const).map(mode=><button key={mode.id} type="button" aria-pressed={editorView===mode.id} onClick={()=>setEditorView(mode.id)}
              className={'inline-flex gap-1.5 items-center rounded-lg px-3 py-2 text-xs font-bold '+(editorView===mode.id
                ?'bg-sky-700 text-white shadow-sm':'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700')}><mode.icon className="w-3.5 h-3.5"/>{mode.label}</button>)}
          </div>
          {editorView==='edit'? <>
            <label htmlFor="guided-code" className="sr-only">Modifier le code de l’exemple</label>
            <textarea id="guided-code" spellCheck={false} value={code} onChange={e=>{setCode(e.target.value);setFeedback(null);setCopyStatus('');}}
              className={'w-full resize-y min-h-64 rounded-xl bg-[#171c26] text-slate-100 font-mono text-[13px] leading-relaxed p-4 border border-slate-700 focus:outline focus:outline-2 focus:outline-sky-500 '+(expanded?'h-[65vh]':'h-[clamp(260px,42vh,440px)]')}/>
          </> : <div data-testid="guided-formatted-code" className={(expanded?'max-h-[65vh]':'max-h-[440px]')+' overflow-auto [&>div]:my-0 [&>div>div:last-child]:max-h-none'}>
            <CodeBlock code={editorView==='formatted'?formattedCode:code} language={language==='xhtml'||language==='xslt'?'xml':language} title={editorView==='formatted'?'Version indentée':'Source originale'}/>
          </div>}
          <p className="text-xs text-slate-500 dark:text-slate-400">{editorView==='formatted'
            ? 'Mise en forme visuelle uniquement : la source réellement analysée et exécutée reste inchangée. Les espaces significatifs (YAML, Markdown, LaTeX…) sont conservés.'
            : editorView==='original'?'Voici la source actuelle sans formatage automatique. Cliquez sur « Modifier » pour l’éditer.'
            :'Vous pouvez modifier directement ce code. Le résultat se met à jour dans le panneau voisin lorsque le langage permet un aperçu.'}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={()=>setFeedback(inspect(language,code))} className="inline-flex items-center gap-1.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white px-3 py-2 text-xs font-bold"><CheckCircle2 className="w-4 h-4"/> Analyser</button>
            <button type="button" onClick={()=>{setCode(example.code);setFeedback(null);setCopyStatus('');setEditorView('edit');}}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs font-bold"><RotateCcw className="w-4 h-4"/> Restaurer</button>
            <button type="button" onClick={()=>{void copy(editorView==='formatted');}}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs font-bold"><ClipboardCopy className="w-4 h-4"/> Copier</button>
            <button type="button" onClick={download} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs font-bold"><Download className="w-4 h-4"/> Télécharger</button>
          </div>
          {(copyStatus||downloadStatus)&&<p role="status" className="text-xs text-emerald-800 dark:text-emerald-300">{copyStatus||downloadStatus}</p>}
          {feedback&&<div role="status" className={'rounded-xl p-3 text-xs '+(feedback.ok
            ?'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-900'
            :'bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-900')}>
            <strong>{feedback.ok?'Analyse terminée':'Problème détecté'}</strong>
            <p className="mt-1">{feedback.message}</p>{feedback.result&&<pre className="max-h-32 overflow-auto whitespace-pre-wrap break-words font-mono mt-2">{feedback.result}</pre>}
          </div>}
        </section>}
        {layout!=='code'&&<div data-testid="guided-result-panel" className="min-w-0"><CodeResultPreview language={language} code={code} expanded={expanded}/></div>}
      </div>
      <section aria-label="Comprendre l’exemple" className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-black text-slate-900 dark:text-slate-100"><BookOpen className="w-4 h-4 text-sky-700 dark:text-sky-300"/> Comprendre le code et son origine</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Lecture guidée, vocabulaire, essais, limites et références de l’exercice.</p>
          </div>
          <button type="button" onClick={()=>setExplanation(!explanation)} aria-expanded={explanation} aria-controls="guided-explanation"
            className="shrink-0 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-200 px-3 py-2.5 text-xs font-bold">{explanation?'Réduire les explications':'Afficher les explications complètes'}</button>
        </div>
        {!explanation&&<p className="text-sm text-slate-700 dark:text-slate-300"><strong>Repères :</strong> {concept.explanation} <strong>À essayer :</strong> {example.challenge||concept.challenge}</p>}
        {explanation&&<div id="guided-explanation" className="space-y-4 pt-2">
          <div className="rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/20 p-3">
            <h4 className="font-bold text-sm mb-2">Comprendre le fonctionnement de {LAB_LABELS[language]}</h4>
            <svg viewBox="0 0 600 105" role="img" aria-label={concept.nodes.join(' puis ')} className="w-full max-w-lg">
              {concept.nodes.map((label,i)=><g key={i}>
                {i<2&&<><line x1={175+200*i} y1="52" x2={211+200*i} y2="52" stroke="#0284c7" strokeWidth="2"/><path d={'M '+(211+200*i)+' 52 l -7 -5 v 10 z'} fill="#0284c7"/></>}
                <rect x={i*200+5} y="17" width="170" height="70" rx="12" fill={i===1?'#075985':'#e0f2fe'} stroke="#0284c7"/>
                <text x={i*200+90} y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill={i===1?'white':'#0c4a6e'}>{label}</text>
              </g>)}
            </svg>
            <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">{concept.explanation}</p>
          </div>
          {language==='xpath'&&<details className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-xs"><summary className="cursor-pointer font-bold">Voir le XML utilisé pour les requêtes XPath</summary><pre className="mt-2 font-mono whitespace-pre-wrap break-all max-h-40 overflow-auto">{XML_SAMPLE}</pre></details>}
          <ExampleLearningGuide item={example}/>
        </div>}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 pt-3">
          <p className="text-xs text-slate-600 dark:text-slate-300">La progression est déclarative : le site ne certifie pas automatiquement la réussite.</p>
          <button type="button" onClick={()=>setCompleted(prev=>prev.includes(example.id)?prev.filter(id=>id!==example.id):[...prev,example.id])}
            className={'inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold '+(completed.includes(example.id)
              ?'border border-emerald-400 text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/30'
              :'bg-emerald-700 hover:bg-emerald-800 text-white')}>
            {completed.includes(example.id)?<Check className="w-4 h-4"/>:<CheckCircle2 className="w-4 h-4"/>}
            {completed.includes(example.id)?'Marqué terminé · annuler':'Marquer cet exercice terminé'}
          </button>
        </div>
      </section>
    </> : <div role="status" className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 text-center">
      <p className="font-bold text-slate-900 dark:text-white">Aucun exemple ne correspond à ces filtres.</p>
      <button type="button" onClick={()=>changeFilters('Tous','')} className="mt-3 rounded-lg bg-sky-700 text-white px-4 py-2 text-sm font-bold">Effacer les filtres</button>
    </div>}
  </section>;
};
