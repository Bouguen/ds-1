import React, {useEffect, useMemo, useState} from 'react';
import {ArrowRight, BookOpenCheck, CheckCircle2, CircleHelp, Code2, Lightbulb, RotateCcw, Target} from 'lucide-react';
import {CodeBlock} from './CodeBlock';
import {LEARNING_MISSIONS, type LearningMission, type MissionLevel} from '../data/learningMissions';
import type {LanguageId} from '../types';

interface Props {
  language:LanguageId;
  languageName:string;
  onOpenLab:(language:string)=>void;
  onOpenResources:(language:string)=>void;
}
const levels:MissionLevel[]=['Débutant','Intermédiaire','Avancé'];
const storageKey=(id:LanguageId)=>'ds-mastery-v1-'+id;
function loadProgress(id:LanguageId):string[]{
  try{
    const raw=JSON.parse(localStorage.getItem(storageKey(id))||'[]') as unknown;
    if(!Array.isArray(raw))return [];
    const allowed=new Set(LEARNING_MISSIONS.filter(m=>m.language===id).map(m=>m.id));
    return raw.filter((value):value is string=>typeof value==='string'&&allowed.has(value));
  }catch{return [];}
}

export const CourseLearningPath:React.FC<Props>=({language,languageName,onOpenLab,onOpenResources})=>{
  const missions=useMemo(()=>LEARNING_MISSIONS.filter(m=>m.language===language),[language]);
  const [selected,setSelected]=useState<MissionLevel>('Débutant');
  const [answers,setAnswers]=useState<Record<string,number>>({});
  const [verified,setVerified]=useState<Record<string,boolean>>({});
  const [completed,setCompleted]=useState<string[]>(()=>loadProgress(language));
  useEffect(()=>{setSelected('Débutant');setAnswers({});setVerified({});setCompleted(loadProgress(language));},[language]);
  const mission:LearningMission|undefined=missions.find(item=>item.level===selected);
  const progress=missions.length?Math.round(100*completed.filter(id=>missions.some(m=>m.id===id)).length/missions.length):0;

  const mark=(missionId:string)=>{
    const next=completed.includes(missionId)?completed.filter(id=>id!==missionId):[...completed,missionId];
    setCompleted(next);
    try{localStorage.setItem(storageKey(language),JSON.stringify(next));}catch{/* Progression locale facultative. */}
  };
  const answer=mission?answers[mission.id]:undefined;
  const checked=mission?!!verified[mission.id]:false;
  const correct=!!mission&&answer===mission.answer;

  return <section aria-label={'Parcours de maîtrise '+languageName} className="p-4 sm:p-6 space-y-5">
    <header className="rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/30 p-4 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-black text-lg text-slate-900 dark:text-white"><BookOpenCheck className="w-5 h-5 text-indigo-700 dark:text-indigo-300"/> Parcours de maîtrise · {languageName}</h3>
        <span className="text-xs font-bold text-indigo-800 dark:text-indigo-200">{completed.length}/{missions.length} étapes déclarées réalisées</span>
      </div>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">Trois missions progressives pour passer de la compréhension des concepts à leur utilisation dans un cas concret. Chaque étape associe un objectif, un exemple commenté, un défi et une question de vérification.</p>
      <div role="progressbar" aria-label={'Progression du parcours '+languageName} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} className="h-2.5 w-full overflow-hidden rounded-full bg-indigo-200 dark:bg-indigo-900">
        <div className="h-full bg-indigo-700 dark:bg-indigo-400 rounded-full transition-[width]" style={{width:progress+'%'}}/>
      </div>
      <p className="text-[11px] text-slate-600 dark:text-slate-300">Progression conservée sur cet appareil uniquement. La vérification des réponses n’analyse pas automatiquement la réalisation pratique.</p>
    </header>

    <div role="group" aria-label="Choisir une étape du parcours" className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {missions.map((item,index)=><button type="button" key={item.id} aria-pressed={item.level===selected} onClick={()=>setSelected(item.level)}
        className={'text-left rounded-xl border px-4 py-3 space-y-1 transition-colors '+(item.level===selected
          ?'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 ring-1 ring-indigo-600'
          :'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-400')}>
        <span className="flex items-center justify-between gap-2 text-xs font-extrabold text-indigo-700 dark:text-indigo-300">
          <span>{index+1}. {item.level}</span>
          {completed.includes(item.id)&&<CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-300" aria-label="Étape réalisée"/>}
        </span>
        <span className="block text-sm font-bold text-slate-900 dark:text-white">{item.title}</span>
      </button>)}
    </div>

    {mission&&<article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-extrabold tracking-wide text-indigo-700 dark:text-indigo-300 uppercase">Étape {levels.indexOf(mission.level)+1} · {mission.level}</p>
        <h4 className="text-xl font-black text-slate-900 dark:text-white">{mission.title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Situation :</strong> {mission.context}</p>
        <p className="text-sm text-slate-700 dark:text-slate-200"><strong>Objectif :</strong> {mission.aim}</p>
      </div>
      <section aria-label="Compétences travaillées" className="rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/30 p-4 space-y-2">
        <h5 className="flex items-center gap-2 text-sm font-black text-sky-800 dark:text-sky-200"><Target className="w-4 h-4"/> À maîtriser</h5>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-1">
          {mission.objectives.map(point=><li key={point}>{point}</li>)}
        </ul>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        <div className="min-w-0 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
          <h5 className="text-sm font-black text-slate-900 dark:text-white">À vous de pratiquer</h5>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{mission.task}</p>
          <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-3">
            <strong className="text-xs text-slate-700 dark:text-slate-200">Critère de réussite</strong>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 mt-1">{mission.expected}</p>
          </div>
          <p className="text-xs flex items-start gap-2 text-amber-800 dark:text-amber-200"><Lightbulb className="w-4 h-4 shrink-0"/>{mission.caution}</p>
          <button type="button" onClick={()=>onOpenLab(language)} className="inline-flex items-center gap-2 rounded-lg bg-sky-700 hover:bg-sky-800 px-3 py-2.5 text-xs font-bold text-white">
            <Code2 className="w-4 h-4"/> Ouvrir le bac à sable
          </button>
        </div>
        <details className="min-w-0 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <summary className="cursor-pointer text-sm font-bold text-indigo-800 dark:text-indigo-200">Afficher un exemple de référence</summary>
          <p className="text-xs text-slate-600 dark:text-slate-300 my-3">Cet exemple illustre la notion, sans constituer la correction automatique de votre travail.</p>
          <div className="max-h-[420px] overflow-auto"><CodeBlock code={mission.code} language={mission.language}/></div>
        </details>
      </div>
      <section aria-label="Question de compréhension" className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
        <h5 className="flex items-center gap-2 font-black text-sm text-slate-900 dark:text-white"><CircleHelp className="w-4 h-4 text-indigo-700 dark:text-indigo-300"/> Vérifier ma compréhension</h5>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{mission.question}</p>
        <fieldset className="space-y-2">
          <legend className="sr-only">Choisissez une réponse</legend>
          {mission.choices.map((choice,index)=><label key={index} className="flex items-start gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-sm">
            <input type="radio" name={'mastery-'+language+'-'+mission.id} checked={answer===index} onChange={()=>{setAnswers(prev=>({...prev,[mission.id]:index}));setVerified(prev=>({...prev,[mission.id]:false}));}} className="mt-1 accent-indigo-700"/>
            <span>{choice}</span>
          </label>)}
        </fieldset>
        <button type="button" disabled={answer===undefined} onClick={()=>setVerified(prev=>({...prev,[mission.id]:true}))}
          className="rounded-lg bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 px-3 py-2.5 text-xs font-bold text-white">Vérifier ma réponse</button>
        {checked&&<div role="status" className={'rounded-lg border p-3 text-sm '+(correct
          ?'border-emerald-300 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
          :'border-amber-300 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200')}>
          <strong>{correct?'Bonne réponse.':'Réponse à revoir.'}</strong>
          <p className="mt-1">{mission.reason}</p>
        </div>}
      </section>
      <div className="flex flex-wrap gap-2 justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-3">
        <button type="button" onClick={()=>mark(mission.id)} className={'inline-flex gap-2 items-center rounded-lg px-3 py-2.5 text-xs font-bold '+(completed.includes(mission.id)
          ?'border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200'
          :'bg-emerald-700 hover:bg-emerald-800 text-white')}>
          {completed.includes(mission.id)?<RotateCcw className="w-4 h-4"/>:<CheckCircle2 className="w-4 h-4"/>}
          {completed.includes(mission.id)?'Annuler la validation manuelle':'Marquer cette mission réalisée'}
        </button>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={()=>onOpenResources(language)} className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800">Références du langage</button>
          {selected!=='Avancé'&&<button type="button" onClick={()=>setSelected(levels[levels.indexOf(selected)+1])}
            className="inline-flex items-center gap-1 rounded-lg bg-indigo-700 hover:bg-indigo-800 px-3 py-2.5 text-xs text-white font-bold">Étape suivante <ArrowRight className="w-3.5 h-3.5"/></button>}
        </div>
      </div>
    </article>}
  </section>;
};
