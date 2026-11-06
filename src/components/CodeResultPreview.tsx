import React, {useMemo} from 'react';
import katex from 'katex';
import type {LabTechnology} from './GuidedPractice';
type Result={type:'html'|'tree'|'text'|'math'|'error'|'markdown',value:string,description:string};
const XML_SOURCE='<bibliotheque><livre id="l1" langue="fr"><titre>XML pour tous</titre><annee>2025</annee></livre><livre id="l2" langue="en"><titre>Web Basics</titre><annee>2022</annee></livre><livre id="l3" langue="fr"><titre>XPath avancé</titre><annee>2026</annee></livre></bibliotheque>';
const parseXml=(s:string)=>{
 const doc=new DOMParser().parseFromString(s,'application/xml');
 const err=doc.querySelector('parsererror');
 if(err)throw new Error((err.textContent||'Erreur XML').slice(0,250));
 return doc;
};
function toTree(node:Element,depth=0):string[]{
 const p='  '.repeat(Math.min(depth,12));
 const attrs=Array.from(node.attributes).map(a=>a.name+'="'+a.value+'"').join(' ');
 const line=p+'<'+node.tagName+(attrs?' '+attrs:'')+'>';
 if(depth>=10)return [line,p+'  …'];
 const kids=Array.from(node.children).slice(0,30);
 if(!kids.length)return [line,p+'  '+(node.textContent||'').trim()];
 return [line,...kids.flatMap(k=>toTree(k,depth+1))];
}
function makeResult(language:LabTechnology,code:string):Result {
 try{
  if(language==='html')return {type:'html',value:code,description:'Rendu HTML isolé, sans exécution JavaScript.'};
  if(language==='css'){
   const safe=code.replace(/<\/style/gi,'<\\/style');
   const value='<!doctype html><html lang="fr"><meta charset="utf-8"><style>'+safe+'</style><body style="font-family:system-ui;padding:15px"><h2>Atelier CSS</h2><p class="important">Paragraphe de démonstration</p><article class="carte card"><h3>Carte</h3><p>Une carte avec du texte</p><button>Bouton</button></article><div class="gallery grille"><span>Bloc A</span><span>Bloc B</span></div><nav><a href="#exemple">Lien de test</a></nav></body></html>';
   return {type:'html',value,description:'Aperçu dans une page HTML isolée. Les sélecteurs doivent correspondre aux éléments présents.'};
  }
  if(language==='json')return {type:'tree',value:JSON.stringify(JSON.parse(code) as unknown,null,2),description:'Objet JSON analysé et mis en forme avec son imbrication.'};
  if(language==='xml'||language==='xhtml'){
   const doc=parseXml(code);return {type:'tree',value:toTree(doc.documentElement).join('\n'),description:'Arbre des éléments et attributs ; bonne formation XML uniquement.'};
  }
  if(language==='xpath'){
   const doc=parseXml(XML_SOURCE);const result=doc.evaluate(code,doc,null,XPathResult.ANY_TYPE,null);
   if(result.resultType===XPathResult.NUMBER_TYPE)return {type:'text',value:String(result.numberValue),description:'Résultat numérique XPath 1.0.'};
   if(result.resultType===XPathResult.STRING_TYPE)return {type:'text',value:result.stringValue,description:'Résultat textuel XPath 1.0.'};
   if(result.resultType===XPathResult.BOOLEAN_TYPE)return {type:'text',value:String(result.booleanValue),description:'Résultat booléen XPath 1.0.'};
   const values:string[]=[];let n:Node|null;
   while((n=result.iterateNext())&&values.length<25)values.push(n.nodeName+' → '+(n.textContent||n.nodeValue||'').trim().slice(0,90));
   return {type:'text',value:values.join('\n')||'Aucun nœud sélectionné.',description:'Nœuds sélectionnés dans le catalogue XML intégré.'};
  }
  if(language==='latex')return {type:'math',value:katex.renderToString(code,{displayMode:true,throwOnError:true,trust:false}),description:'Rendu des formules compatibles avec KaTeX ; ce moteur ne compile pas un document LaTeX entier.'};
  if(language==='markdown')return {type:'markdown',value:code,description:'Aperçu simplifié des titres, listes et paragraphes. Le studio Markdown offre un rendu plus complet.'};
  if(language==='xslt'){
   if(code.includes('<xsl:stylesheet')&&typeof XSLTProcessor!=='undefined'){
    const processor=new XSLTProcessor();processor.importStylesheet(parseXml(code));
    const output=processor.transformToDocument(parseXml(XML_SOURCE));
    return {type:'html',value:new XMLSerializer().serializeToString(output),description:'Transformation sur le catalogue XML de démonstration.'};
   }
   return {type:'text',value:code,description:'Fragment XSLT non exécutable seul. Utilisez le laboratoire complet XML → XSLT pour voir sa transformation.'};
  }
  if(language==='yaml')return {type:'tree',value:code.split('\n').map(line=>line.replace(/\t/g,'    ')).join('\n'),description:'Vue de la hiérarchie par indentation ; cette représentation ne valide pas YAML.'};
  if(language==='dtd')return {type:'text',value:code,description:'Déclarations de grammaire : une DTD ne produit pas directement un rendu visuel.'};
  if(language==='entities')return {type:'text',value:code,description:'Déclarations et références : leur développement dépend du document XML et du processeur.'};
  return {type:'text',value:code,description:'Représentation textuelle de l’extrait.'};
 }catch(error){return {type:'error',value:String(error),description:'Erreur de syntaxe ou de traitement.'};}
}
function MarkdownView({code}:{code:string}){
 return <div className="space-y-2 text-slate-900">{code.split('\n').slice(0,70).map((raw,i)=>{
  const line=raw.trim();
  if(line.startsWith('### '))return <h4 key={i} className="font-bold">{line.slice(4)}</h4>;
  if(line.startsWith('## '))return <h3 key={i} className="font-bold text-lg">{line.slice(3)}</h3>;
  if(line.startsWith('# '))return <h2 key={i} className="font-bold text-xl">{line.slice(2)}</h2>;
  if(line.startsWith('- ')||line.startsWith('* '))return <div key={i} className="pl-4">• {line.slice(2)}</div>;
  if(line.startsWith('> '))return <blockquote key={i} className="pl-3 border-l-4 border-sky-500 italic">{line.slice(2)}</blockquote>;
  if(line)return <p key={i} className="whitespace-pre-wrap">{line}</p>;
  return <div key={i} className="h-1"/>;
 })}</div>;
}
export const CodeResultPreview:React.FC<{language:LabTechnology,code:string}>=({language,code})=>{
 const result=useMemo(()=>makeResult(language,code),[language,code]);
 return <section data-testid="guided-preview" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 min-w-0 space-y-3 bg-slate-50 dark:bg-slate-950">
  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Résultat / aperçu</h3>
  {result.type==='html'&&<iframe title="Rendu dans une page isolée" sandbox="" srcDoc={result.value} className="w-full h-64 bg-white border border-slate-300 rounded-lg"/>}
  {(result.type==='tree'||result.type==='text')&&<pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-white dark:bg-slate-900 p-3 font-mono text-xs text-slate-700 dark:text-slate-200">{result.value}</pre>}
  {result.type==='math'&&<div className="p-4 rounded-lg bg-white text-slate-900 overflow-x-auto" dangerouslySetInnerHTML={{__html:result.value}}/>}
  {result.type==='markdown'&&<div className="rounded-lg bg-white text-sm p-4 max-h-64 overflow-auto"><MarkdownView code={result.value}/></div>}
  {result.type==='error'&&<p role="status" className="text-xs rounded-lg bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200 p-3">{result.value}</p>}
  <p className="text-xs text-slate-500 dark:text-slate-400">{result.description}</p>
 </section>;
};
