import React, { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Code2, RotateCcw, Play, Layers3, ChevronDown } from 'lucide-react';
import { TRANSVERSAL_PROJECTS, type TransversalProject, type ProjectFile } from '../data/transversalProjects';
import {orderIndex} from '../data/languageOrder';
import { CodeBlock } from './CodeBlock';
import { formatExampleCode } from '../utils/formatExampleCode';

type RunResult = { output: string; queryResult?: string; notice: string };
const escapeHtml = (text: string): string => text.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char] || char));
function parseXML(text: string): Document {
  const doc = new DOMParser().parseFromString(text, 'application/xml');
  const error = doc.getElementsByTagName('parsererror')[0];
  if (error) throw new Error('XML mal formé : ' + (error.textContent || 'Erreur XML').trim().slice(0,260));
  return doc;
}
function transform(project: TransversalProject, edited: Record<string,string>): RunResult {
  const get = (name: string) => edited[name] || '';
  if (project.kind === 'json-web') {
    const parsed: unknown = JSON.parse(get('evenements.json'));
    if (!parsed || typeof parsed !== 'object' || !('evenements' in parsed) || !Array.isArray(parsed.evenements)) {
      throw new Error('Le JSON doit contenir un tableau « evenements ».');
    }
    const data = parsed as { nom?: unknown; evenements: Array<{titre?:unknown;date?:unknown;places?:unknown}> };
    const cards = data.evenements.map(event => '<article class="carte"><h2>' + escapeHtml(String(event.titre ?? 'Sans titre')) + '</h2><p><time>' + escapeHtml(String(event.date ?? 'Date non définie')) + '</time></p><p>Places : ' + escapeHtml(String(event.places ?? '?')) + '</p></article>').join('');
    const markup = '<!doctype html><html lang="fr"><meta charset="utf-8"><style>' + get('agenda.css').replace(/<\/style/gi, '<\\/style') + '</style><body><h1>' + escapeHtml(String(data.nom ?? 'Agenda')) + '</h1><main class="grille">' + cards + '</main></body></html>';
    return {output:markup, notice:data.evenements.length + ' événement(s) transformé(s) en cartes HTML.'};
  }
  if (project.kind === 'html-web') {
    JSON.parse(get('filieres.json'));
    const html = get('inscription.html');
    const css = get('interface.css').replace(/<\/style/gi,'<\\/style');
    const output = html.includes('</head>') ? html.replace('</head>', '<style>' + css + '</style></head>') : '<style>' + css + '</style>' + html;
    return {output, notice:'Structure HTML et styles CSS assemblés. Le JSON est vérifié, mais n’est pas automatiquement injecté dans le formulaire.'};
  }
  const source = parseXML(get('catalogue.xml'));
  const expression = get('requete.xpath').trim();
  if (!expression) throw new Error('Écrivez une expression XPath 1.0.');
  const evaluation = source.evaluate(expression, source, null, XPathResult.ANY_TYPE, null);
  let queryResult = '';
  if (evaluation.resultType === XPathResult.NUMBER_TYPE) queryResult = String(evaluation.numberValue);
  else if (evaluation.resultType === XPathResult.STRING_TYPE) queryResult = evaluation.stringValue;
  else if (evaluation.resultType === XPathResult.BOOLEAN_TYPE) queryResult = String(evaluation.booleanValue);
  else {
    const values: string[] = [];
    let node: Node | null;
    while ((node = evaluation.iterateNext()) && values.length < 100) values.push(node.nodeType === Node.ATTRIBUTE_NODE ? (node.nodeValue || '') : (node.textContent || '').trim());
    queryResult = values.length ? values.join(' | ') : 'Aucun nœud trouvé.';
  }
  if (typeof XSLTProcessor === 'undefined') return {
    output:'',
    queryResult,
    notice:'XML analysé, XPath 1.0 exécuté. XSLT 1.0 n’est pas pris en charge dans ce navigateur : la transformation HTML ne peut pas être affichée ici.'
  };
  const stylesheet = parseXML(get('catalogue.xsl'));
  if (stylesheet.documentElement.namespaceURI !== 'http://www.w3.org/1999/XSL/Transform') throw new Error('La feuille doit utiliser le namespace XSLT officiel.');
  const processor = new XSLTProcessor();
  processor.importStylesheet(stylesheet);
  const result = processor.transformToDocument(source);
  if (!result) throw new Error('La transformation XSLT n’a produit aucun document.');
  const serialized = new XMLSerializer().serializeToString(result);
  const css = get('catalogue.css').replace(/<\/style/gi,'<\\/style');
  const output = serialized.includes('</head>') ? serialized.replace('</head>','<style>' + css + '</style></head>') : '<style>' + css + '</style>' + serialized;
  return {output,queryResult,notice:'XML analysé, XPath 1.0 exécuté, HTML généré par XSLT 1.0.'};
}
function initialFiles(project: TransversalProject): Record<string,string> {
  return Object.fromEntries(project.files.map(file => [file.name,file.content]));
}
const LEVELS = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];
export const TransversalProjectsView: React.FC = () => {
  const [filter,setFilter] = useState('Tous');
  const [chosen,setChosen] = useState(TRANSVERSAL_PROJECTS[0].id);
  const project = TRANSVERSAL_PROJECTS.find(p => p.id === chosen) || TRANSVERSAL_PROJECTS[0];
  const [edited,setEdited] = useState<Record<string,string>>(() => initialFiles(TRANSVERSAL_PROJECTS[0]));
  const [fileName,setFileName] = useState(TRANSVERSAL_PROJECTS[0].files[0].name);
  const [step,setStep] = useState(0);
  const [complete,setComplete] = useState<string[]>([]);
  const [result,setResult] = useState<RunResult | null>(null);
  const [error,setError] = useState('');
  const file: ProjectFile = project.files.find(f => f.name === fileName) || project.files[0];
  const count = useMemo(() => project.steps.length, [project]);
  const choose = (next: TransversalProject) => {
    setChosen(next.id); setEdited(initialFiles(next)); setFileName(next.files[0].name);
    setStep(0);setComplete([]);setResult(null);setError('');
  };
  const run = () => {
    setResult(null);setError('');
    try { setResult(transform(project, edited)); }
    catch (err) { setError(err instanceof Error ? err.message : String(err)); }
  };
  const reset = () => {setEdited(initialFiles(project));setResult(null);setError('');setComplete([]);setStep(0);};
  const markComplete = () => setComplete(previous => previous.includes(String(step)) ? previous : [...previous,String(step)]);
  const listed = TRANSVERSAL_PROJECTS.filter(p => filter === 'Tous' || p.level === filter);
  return <section className="max-w-7xl mx-auto px-4 py-8 space-y-6">
    <header className="rounded-3xl p-6 sm:p-9 bg-gradient-to-br from-indigo-900 via-sky-800 to-cyan-800 text-white space-y-3">
      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-200"><Layers3 className="w-4 h-4"/> Apprendre par projet</span>
      <h2 className="text-2xl sm:text-3xl font-black">Mini-projets transversaux</h2>
      <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-sky-100">Passez d’un format à un autre : écrivez les sources, expérimentez les transformations et observez les résultats. Trois projets progressifs, des consignes et un contrôle de progression manuel.</p>
    </header>
    <div className="flex flex-wrap gap-2 items-center" aria-label="Filtrer les projets par niveau">
      {LEVELS.map(level => <button type="button" key={level} aria-pressed={filter===level} onClick={() => setFilter(level)} className={'px-3 py-2 rounded-xl text-sm font-bold border '+(filter===level?'bg-sky-800 text-white border-sky-800':'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800')}>{level}</button>)}
    </div>
    <div className="grid sm:grid-cols-3 gap-3">
      {listed.map(item => <button type="button" key={item.id} onClick={() => choose(item)} aria-pressed={chosen===item.id} className={'text-left rounded-2xl border p-4 sm:p-5 space-y-2 transition-all '+(chosen===item.id?'border-sky-600 bg-sky-50 dark:bg-sky-950/40 ring-1 ring-sky-600':'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-400')}>
        <span className="text-xs font-extrabold uppercase tracking-wide text-sky-700 dark:text-sky-300">{item.level}</span>
        <h3 className="text-base font-black text-slate-900 dark:text-white">{item.title}</h3>
        <p className="text-xs text-slate-600 dark:text-slate-300">{item.context}</p>
        <div className="flex flex-wrap gap-1.5">{[...item.tags].sort((a,b)=>orderIndex(a.toLowerCase())-orderIndex(b.toLowerCase())).map(tag => <span key={tag} className="rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 text-[11px]">{tag}</span>)}</div>
      </button>)}
    </div>
    <article className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 space-y-5" aria-label="Atelier du projet">
      <div className="space-y-2">
        <p className="text-xs font-extrabold text-sky-700 dark:text-sky-300">{project.level} · {project.audience}</p>
        <h3 className="text-xl font-black text-slate-900 dark:text-white">{project.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{project.objective}</p>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-4 items-start">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Fichiers du projet">
            {project.files.map(f => <button key={f.name} type="button" onClick={() => setFileName(f.name)} aria-pressed={file.name===f.name} className={'rounded-lg border px-3 py-2 text-xs font-mono font-bold '+(file.name===f.name?'bg-indigo-800 text-white border-indigo-800':'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800')}>{f.name}</button>)}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">{file.description}</p>
          <label htmlFor="project-code" className="block text-xs font-extrabold text-slate-800 dark:text-slate-100">Code du fichier {file.name}</label>
          <textarea id="project-code" spellCheck={false} value={edited[file.name] ?? file.content} onChange={e => {setEdited(prev=>({...prev,[file.name]:e.target.value}));setResult(null);setError('');}} className="w-full min-h-80 sm:min-h-[430px] resize-y rounded-xl border border-slate-700 bg-[#171c26] text-slate-100 p-4 text-xs leading-relaxed font-mono focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500"/>
          <details className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <summary className="cursor-pointer text-sm font-bold text-sky-800 dark:text-sky-200">Voir le fichier indenté</summary>
            <div className="max-h-80 overflow-auto mt-3">
              <CodeBlock code={formatExampleCode(edited[file.name] ?? file.content,file.language)} language={file.language}/>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">L’éditeur conserve la source originale, y compris les espaces significatifs.</p>
          </details>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={run} className="inline-flex items-center gap-2 rounded-xl bg-sky-700 hover:bg-sky-800 px-4 py-3 text-sm font-extrabold text-white"><Play className="w-4 h-4"/> Exécuter le projet</button>
            <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-bold"><RotateCcw className="w-4 h-4"/> Restaurer les fichiers</button>
          </div>
        </div>
        <div className="min-w-0 space-y-3">
          <h4 className="text-sm font-black text-slate-900 dark:text-white">Résultat & aperçu</h4>
          {error && <div role="alert" className="rounded-xl border border-rose-300 bg-rose-50 dark:bg-rose-950/40 p-3 text-sm text-rose-800 dark:text-rose-200">{error}</div>}
          {result ? <>
            <p role="status" className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">{result.notice}</p>
            {result.queryResult !== undefined && <div className="p-3 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/40"><h5 className="text-xs font-black mb-2">Résultat de la requête XPath</h5><pre className="text-xs font-mono whitespace-pre-wrap break-words">{result.queryResult}</pre></div>}
            {result.output ? <iframe title={'Aperçu isolé : '+project.title} sandbox="" srcDoc={result.output} className="w-full min-h-[340px] bg-white rounded-xl border border-slate-200 dark:border-slate-700"/> : <div className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 p-4 text-sm">Aperçu HTML non disponible : le moteur XSLT 1.0 manque dans ce navigateur. Le résultat de la requête XPath reste affiché ci-dessus.</div>}
            {result.output && <details className="rounded-xl border border-slate-200 dark:border-slate-700 p-3"><summary className="cursor-pointer text-xs font-bold">Voir le HTML produit</summary><div className="overflow-auto max-h-80 mt-2"><CodeBlock code={formatExampleCode(result.output,'html')} language="html"/></div></details>}
          </> : <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-5 min-h-[200px] flex items-center justify-center text-center text-sm text-slate-500 dark:text-slate-400">Modifiez les fichiers, puis sélectionnez « Exécuter le projet » pour voir le résultat.</div>}
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">Le rendu est isolé sans scripts autorisés. Les données et transformations sont traitées localement ; le laboratoire ne fournit ni stockage serveur ni validation XSD/DTD.</p>
        </div>
      </div>
      <section className="space-y-3" aria-label="Parcours pédagogique">
        <div className="flex items-center gap-2 justify-between flex-wrap"><h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2"><BookOpen className="w-4 h-4"/> Étapes du parcours</h4><span className="text-xs font-bold text-sky-700 dark:text-sky-300">{complete.length}/{count} étapes déclarées terminées</span></div>
        <div className="flex flex-wrap gap-2">{project.steps.map((task,i)=><button key={task.title} type="button" aria-pressed={step===i} onClick={()=>setStep(i)} className={'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold '+(step===i?'bg-sky-800 text-white border-sky-800':'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800')}>{complete.includes(String(i)) && <CheckCircle2 className="w-4 h-4"/>}{task.title}</button>)}</div>
        <div className="rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 p-4 space-y-3">
          <p className="text-sm text-slate-700 dark:text-slate-200">{project.steps[step].instruction}</p>
          <details className="text-sm"><summary className="cursor-pointer font-bold inline-flex items-center gap-1"><ChevronDown className="w-4 h-4"/> Vérifier le résultat attendu</summary><p className="mt-2 text-slate-700 dark:text-slate-200">{project.steps[step].verification}</p></details>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={markComplete} disabled={complete.includes(String(step))} className="rounded-lg bg-emerald-700 disabled:opacity-50 px-3 py-2 text-xs font-bold text-white">{complete.includes(String(step))?'Étape marquée terminée':'Marquer l’étape terminée'}</button>
            {step<project.steps.length-1&&<button type="button" onClick={()=>setStep(step+1)} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs font-bold">Étape suivante <ArrowRight className="w-3 h-3"/></button>}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">La progression est déclarative : marquez une étape terminée après l’avoir vérifiée. Le système ne corrige pas automatiquement votre code.</p>
        </div>
      </section>
    </article>
  </section>;
};
