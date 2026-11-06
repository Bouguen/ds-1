import React, { useEffect, useMemo, useState } from 'react';
import { EXTENDED_EXAMPLES } from '../data/extendedExamples';
import { MASTERY_EXAMPLES } from '../data/masteryExamples';
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
  const examples=useMemo(()=>[...MASTERY_EXAMPLES,...EXTENDED_EXAMPLES].filter(x=>x.language===language),[language]);
  const [choice,setChoice]=useState('');
  const example=examples.find(x=>x.id===choice)||examples[0];
  const [code,setCode]=useState(example?.code||'');
  const [explanation,setExplanation]=useState(false);
  const [feedback,setFeedback]=useState<Feedback|null>(null);
  useEffect(()=>{setChoice('');setCode(examples[0]?.code||'');setExplanation(false);setFeedback(null);},[language]);
  const selectExample=(id:string)=>{setChoice(id);setCode(examples.find(x=>x.id===id)?.code||'');setExplanation(false);setFeedback(null);};
  const concept=CONCEPTS[language];
  return <section aria-label={'Atelier guidé '+LAB_LABELS[language]} className="space-y-3">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3">
      <div>
        <h2 className="font-bold text-base text-slate-900 dark:text-white">Pratique guidée · <span translate="no" className="notranslate">{LAB_LABELS[language]}</span></h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">{examples.length} exemples à modifier avec leur résultat, sans quitter la page.</p>
      </div>
      <label className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs font-semibold sm:min-w-[45%]" htmlFor="guided-choice">
        <span className="shrink-0">Exemple</span>
        <select id="guided-choice" value={example?.id||''} onChange={e=>selectExample(e.target.value)} className="w-full min-w-0 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm">
          {examples.map(x=><option key={x.id} value={x.id}>{x.title}</option>)}
        </select>
      </label>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
      <div className="min-w-0 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="guided-code" className="text-sm font-bold">Code source</label>
          <span className="text-xs text-slate-500 dark:text-slate-400">{example?.level}</span>
        </div>
        <textarea id="guided-code" spellCheck={false} value={code} onChange={e=>{setCode(e.target.value);setFeedback(null);}}
          className="w-full h-[clamp(220px,42vh,430px)] min-h-[220px] resize-y p-3 rounded-lg bg-[#171c26] text-slate-100 font-mono text-xs leading-relaxed border border-slate-700 focus:outline focus:outline-2 focus:outline-sky-500" />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={()=>setFeedback(inspect(language,code))} className="rounded-lg bg-sky-700 hover:bg-sky-800 text-white px-3 py-2 text-xs font-semibold">Analyser</button>
          <button type="button" onClick={()=>{setCode(example?.code||'');setFeedback(null);}} className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs">Restaurer</button>
          <button type="button" onClick={()=>{if(navigator.clipboard)void navigator.clipboard.writeText(code).catch(()=>{});}} className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs">Copier</button>
        </div>
        {feedback&&<div role="status" className={'rounded-lg p-2 text-xs '+(feedback.ok?'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200':'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200')}>
          <p>{feedback.message}</p>{feedback.result&&<pre className="max-h-24 overflow-auto whitespace-pre-wrap break-words font-mono mt-1">{feedback.result}</pre>}
        </div>}
      </div>
      <CodeResultPreview language={language} code={code}/>
    </div>
    <details className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
      <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center justify-between gap-3">
        <span>Comprendre le code · schéma, défi et correction</span>
        <span className="text-xs text-sky-700 dark:text-sky-300 group-open:hidden">Afficher</span>
        <span className="text-xs text-sky-700 dark:text-sky-300 hidden group-open:inline">Réduire</span>
      </summary>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className="rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/20 p-3">
          <h3 className="font-bold text-sm mb-2">Structure : {LAB_LABELS[language]}</h3>
          <svg viewBox="0 0 600 105" role="img" aria-label={concept.nodes.join(' puis ')} className="w-full">
            {concept.nodes.map((label,i)=><g key={i}>
              {i<2&&<><line x1={175+200*i} y1="52" x2={211+200*i} y2="52" stroke="#0284c7" strokeWidth="2"/><path d={'M '+(211+200*i)+' 52 l -7 -5 v 10 z'} fill="#0284c7"/></>}
              <rect x={i*200+5} y="17" width="170" height="70" rx="12" fill={i===1?'#075985':'#e0f2fe'} stroke="#0284c7"/>
              <text x={i*200+90} y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill={i===1?'white':'#0c4a6e'}>{label}</text>
            </g>)}
          </svg>
          <p className="text-xs mt-2 text-slate-700 dark:text-slate-200">{concept.explanation}</p>
        </div>
        <div className="space-y-3">
          <p className="text-sm p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30"><strong>Défi :</strong> {concept.challenge}</p>
          {language==='xpath'&&<details className="text-xs"><summary className="cursor-pointer font-semibold">Afficher le XML de test XPath</summary><pre className="mt-2 font-mono whitespace-pre-wrap break-all max-h-32 overflow-auto">{XML_SAMPLE}</pre></details>}
          <button type="button" onClick={()=>setExplanation(!explanation)} className="text-sm text-sky-700 dark:text-sky-300 font-semibold underline">{explanation?'Masquer l’explication':'Afficher l’explication'}</button>
          {explanation&&<p className="text-sm rounded-lg bg-slate-100 dark:bg-slate-800 p-3">{example?.explanation}</p>}
        </div>
      </div>
    </details>
  </section>;
};
