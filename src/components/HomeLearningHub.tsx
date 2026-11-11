import React from 'react';
import { ArrowRight, BookOpen, Braces, Code2, Compass, FileCode2, GraduationCap, Layers3, SearchCheck, Sparkles } from 'lucide-react';
import type { ActiveTab } from '../types';

interface HomeLearningHubProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenLab: (lab: string) => void;
  onPrint: () => void;
}

const PATHWAYS = [
  {
    title: 'Découvrir les langages',
    label: 'Comprendre',
    description: 'Construisez vos repères : balisage, structure, présentation, données et formats de documents.',
    icon: BookOpen,
    action: 'Consulter les cours',
    tab: 'fiches' as ActiveTab,
    color: 'sky'
  },
  {
    title: 'Pratiquer sur du code réel',
    label: 'Expérimenter',
    description: 'Écrivez, exécutez et inspectez HTML, CSS, XML, Markdown, LaTeX, JSON et YAML, puis découvrez XPath et XSLT.',
    icon: Code2,
    action: 'Ouvrir les laboratoires',
    tab: 'sandboxes' as ActiveTab,
    color: 'indigo'
  },
  {
    title: 'Consolider ses acquis',
    label: 'Évaluer',
    description: 'Entraînez-vous avec les quiz, les cartes de révision et des exemples expliqués.',
    icon: GraduationCap,
    action: 'Tester mes connaissances',
    tab: 'quiz' as ActiveTab,
    color: 'emerald'
  }
];

const LABS = [
  { id: 'html', title: 'HTML', subtitle: 'Structure & rendu', icon: FileCode2, style: 'text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/60' },
  { id: 'css', title: 'CSS', subtitle: 'Styles & mise en page', icon: Layers3, style: 'text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/60' },
  { id: 'xml', title: 'XML', subtitle: 'Analyse & arborescence', icon: Braces, style: 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60' },
  { id: 'xpath', title: 'XPath', subtitle: 'Interroger un document', icon: SearchCheck, style: 'text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/60' },
  { id: 'xslt', title: 'XSLT', subtitle: 'Transformer le XML', icon: ArrowRight, style: 'text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-100 dark:bg-fuchsia-950/60' },
  { id: 'json', title: 'JSON', subtitle: 'Valider & explorer', icon: Braces, style: 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60' }
];

export const HomeLearningHub: React.FC<HomeLearningHubProps> = ({ onNavigate, onOpenLab, onPrint }) => (
  <div className="space-y-7">
    <section className="relative overflow-hidden rounded-3xl border border-sky-300/30 dark:border-sky-800 bg-gradient-to-br from-[#073e6b] via-[#075a96] to-[#087f98] text-white shadow-xl shadow-sky-950/10">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl pointer-events-none" aria-hidden="true"/>
      <div className="absolute left-1/3 -bottom-28 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl pointer-events-none" aria-hidden="true"/>
      <div className="relative grid lg:grid-cols-[1.45fr_1fr] gap-8 p-6 sm:p-9 lg:p-11 items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wide text-cyan-50">
            <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true"/>
            Apprendre · Expérimenter · Maîtriser
          </div>
          <div className="space-y-3">
            <h2 className="max-w-2xl text-3xl sm:text-4xl lg:text-[2.8rem] leading-[1.13] font-black tracking-tight">
              Du document éditorial <span className="whitespace-nowrap">à l’échange de données</span>
            </h2>
            <div className="max-w-xl space-y-0 text-sm sm:text-base leading-relaxed text-sky-100">
              <p>Découvrez le fonctionnement, la syntaxe et les usages des langages essentiels : HTML, CSS, XML, Markdown, LaTeX, JSON et YAML.</p>
              <p>Apprenez à concevoir, mettre en forme et exploiter efficacement des documents et données structurés.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => onOpenLab('xml')} className="inline-flex items-center gap-2 rounded-xl bg-amber-300 hover:bg-amber-200 px-4 py-3 text-sm font-extrabold text-slate-950 shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <Code2 className="w-4 h-4" aria-hidden="true"/> Expérimenter le XML
            </button>
            <button type="button" onClick={() => onNavigate('exemples')} className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 hover:bg-white/20 px-4 py-3 text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Explorer les exemples commentés <ArrowRight className="w-4 h-4" aria-hidden="true"/>
            </button>
          </div>
          <p className="text-xs text-sky-100/85">Cours, code exécutable et exercices accessibles directement dans le navigateur.</p>
        </div>
        <div className="hidden lg:block" aria-hidden="true">
          <div className="rounded-2xl border border-white/20 bg-slate-950/60 shadow-2xl overflow-hidden backdrop-blur-sm rotate-[-2deg]">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400"/><span className="h-2.5 w-2.5 rounded-full bg-amber-300"/><span className="h-2.5 w-2.5 rounded-full bg-emerald-400"/>
              <span className="ml-auto font-mono text-[11px] text-sky-200">bibliotheque.xml</span>
            </div>
            <pre className="p-5 text-xs leading-7 text-sky-100 overflow-hidden"><code>{`<bibliotheque>
  <livre id="1">
    <titre>Apprendre XML</titre>
    <prix>28</prix>
  </livre>
</bibliotheque>`}</code></pre>
            <div className="border-t border-white/15 p-3 bg-cyan-950/80">
              <p className="text-[11px] font-mono text-cyan-200">XPath : //livre[prix &lt; 30]/titre</p>
              <p className="mt-1 font-mono text-xs text-amber-200">→ Apprendre XML</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="parcours-heading" className="space-y-3">
      <div className="flex items-center gap-2">
        <Compass className="w-5 h-5 text-sky-700 dark:text-sky-300" aria-hidden="true"/>
        <h3 id="parcours-heading" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">Choisissez votre parcours</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {PATHWAYS.map((path, index) => (
          <article key={path.title} className="group flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-5 shadow-sm hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-lg transition-all">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-sky-700 dark:text-sky-300">0{index + 1} · {path.label}</span>
              <path.icon className="w-5 h-5 text-sky-700 dark:text-sky-300" aria-hidden="true"/>
            </div>
            <div className="space-y-2 flex-1">
              <h4 className="font-black text-base text-slate-900 dark:text-white">{path.title}</h4>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{path.description}</p>
            </div>
            <button type="button" onClick={() => { onNavigate(path.tab); if (path.tab === 'fiches') document.getElementById('catalogue-cours')?.scrollIntoView({behavior:'smooth'}); }} className="inline-flex items-center gap-2 self-start text-sm font-bold text-sky-700 dark:text-sky-300 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600">
              {path.action} <ArrowRight className="w-4 h-4" aria-hidden="true"/>
            </button>
          </article>
        ))}
      </div>
    </section>

    <section aria-labelledby="labs-heading" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-sky-700 dark:text-sky-300" aria-hidden="true"/>
          <h3 id="labs-heading" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">Laboratoires à découvrir</h3>
        </div>
        <button type="button" onClick={() => onNavigate('sandboxes')} className="text-sm font-bold text-sky-700 dark:text-sky-300 hover:underline">Tous les laboratoires <span aria-hidden="true">→</span></button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {LABS.map(lab => (
          <button key={lab.id} type="button" onClick={() => onOpenLab(lab.id)} className="group text-left flex flex-col items-start gap-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 hover:border-sky-400 dark:hover:border-sky-600 hover:shadow-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600">
            <span className={'rounded-xl p-2.5 '+lab.style}><lab.icon className="w-5 h-5" aria-hidden="true"/></span>
            <span><strong className="block text-sm text-slate-900 dark:text-white">{lab.title}</strong><span className="block mt-1 text-xs leading-snug text-slate-500 dark:text-slate-400">{lab.subtitle}</span></span>
          </button>
        ))}
      </div>
    </section>
    <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/30 px-5 py-5">
      <div className="space-y-1">
        <p className="font-black text-slate-900 dark:text-white">De la théorie à un projet complet</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">Créez un agenda à partir de JSON, un formulaire HTML/CSS ou un catalogue XML → XPath → XSLT → HTML.</p>
      </div>
      <button type="button" onClick={() => onNavigate('projects')} className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-3 text-sm font-bold">Explorer les mini-projets <ArrowRight className="w-4 h-4"/></button>
    </section>
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-100 dark:bg-slate-900 px-5 py-4 border border-slate-200 dark:border-slate-800">
      <div><p className="font-bold text-sm text-slate-900 dark:text-white">Une fiche mémo pour réviser ?</p><p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Retrouvez l’essentiel de vos cours dans une version imprimable.</p></div>
      <button type="button" onClick={onPrint} className="rounded-xl bg-slate-900 dark:bg-white px-4 py-2 text-sm font-bold text-white dark:text-slate-900 hover:opacity-90">Ouvrir le mémento</button>
    </div>
  </div>
);
