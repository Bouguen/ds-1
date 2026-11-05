import React, { useMemo, useState } from 'react';
import { Search, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { EXTENDED_EXAMPLES } from '../data/extendedExamples';

const LABELS: Record<string, string> = {
  html: 'HTML', xhtml: 'XHTML', xml: 'XML', dtd: 'DTD', entities: 'Entités XML',
  xpath: 'XPath 1.0', xslt: 'XSLT 1.0', css: 'CSS', json: 'JSON',
  markdown: 'Markdown', latex: 'LaTeX', yaml: 'YAML'
};

export const ExamplesLibrary: React.FC = () => {
  const [language, setLanguage] = useState('all');
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [level, setLevel] = useState('all');

  const languages = Object.keys(LABELS);
  const categories = useMemo(() => {
    const matching = EXTENDED_EXAMPLES.filter(x => language === 'all' || x.language === language);
    return Array.from(new Set(matching.map(x => x.category))).sort((a,b) => a.localeCompare(b, 'fr'));
  }, [language]);
  const filtered = useMemo(() => EXTENDED_EXAMPLES.filter(x => {
    const text = `${x.title} ${x.explanation} ${x.category} ${LABELS[x.language]} ${x.code}`.toLocaleLowerCase('fr');
    return (language === 'all' || x.language === language)
      && (category === 'all' || x.category === category)
      && (level === 'all' || x.level === level)
      && text.includes(query.toLocaleLowerCase('fr').trim());
  }), [language, category, level, query]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-6" aria-label="Bibliothèque d'exemples">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
        <div className="flex gap-3 items-center mb-2">
          <BookOpen className="text-sky-600" aria-hidden="true"/>
          <h1 className="text-2xl font-bold">Bibliothèque d'exemples</h1>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {EXTENDED_EXAMPLES.length} exemples progressifs et commentés pour {languages.length} langages et technologies.
          Les exemples signalés comme erreurs volontaires sont destinés au diagnostic.
          Certains extraits DTD, XPath, XSLT et LaTeX nécessitent un document ou un environnement complémentaire.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <label className="relative block">
            <span className="block text-xs font-semibold mb-1">Rechercher</span>
            <Search className="absolute left-3 top-8 w-4 h-4 text-slate-400" aria-hidden="true" />
            <input type="search" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Titre, concept, code…" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent pl-9 pr-3 py-2 text-sm" />
          </label>
          <label className="block"><span className="block text-xs font-semibold mb-1">Langage</span>
            <select value={language} onChange={e => { setLanguage(e.target.value); setCategory('all'); setOpenId(null); }}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm">
              <option value="all">Tous les langages</option>
              {languages.map(x => <option key={x} value={x}>{LABELS[x]}</option>)}
            </select>
          </label>
          <label className="block"><span className="block text-xs font-semibold mb-1">Thème</span>
            <select value={category} onChange={e => { setCategory(e.target.value); setOpenId(null); }}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm">
              <option value="all">Tous les thèmes</option>
              {categories.map(x => <option key={x} value={x}>{x}</option>)}
            </select>
          </label>
          <label className="block"><span className="block text-xs font-semibold mb-1">Niveau</span>
            <select value={level} onChange={e => setLevel(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm">
              <option value="all">Tous les niveaux</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
            </select>
          </label>
        </div>
        <div className="flex flex-wrap gap-2 mt-4" aria-label="Accès direct par langage">
          {languages.map(x => <button key={x} type="button"
            onClick={() => { setLanguage(x); setCategory('all'); setOpenId(null); }}
            aria-pressed={language === x}
            className={`text-xs rounded-full px-3 py-1.5 border cursor-pointer ${language === x ? 'bg-sky-600 text-white border-sky-600' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            {LABELS[x]} · {EXTENDED_EXAMPLES.filter(a => a.language === x).length}
          </button>)}
          {language !== 'all' && <button type="button" onClick={() => { setLanguage('all'); setCategory('all'); }}
            className="text-xs underline px-2">Effacer le filtre</button>}
        </div>
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-300" role="status" aria-live="polite">
        {filtered.length} exemple{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
      </div>
      {filtered.length ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {filtered.map(x => {
          const opened = openId === x.id;
          return <article key={x.id} className="min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <div className="flex gap-2 flex-wrap text-xs mb-2">
              <span className="font-bold text-sky-700 dark:text-sky-300">{LABELS[x.language]}</span>
              <span className="text-slate-500 dark:text-slate-400">{x.category} · {x.level}</span>
            </div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">{x.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{x.explanation}</p>
            <button type="button" aria-expanded={opened} aria-controls={`example-${x.id}`}
              onClick={() => setOpenId(opened ? null : x.id)}
              className="mt-4 inline-flex gap-1 items-center text-sm font-semibold text-sky-700 dark:text-sky-300 hover:underline cursor-pointer">
              {opened ? <>Masquer le code <ChevronUp className="w-4 h-4"/></> : <>Voir le code <ChevronDown className="w-4 h-4"/></>}
            </button>
            {opened && <div id={`example-${x.id}`} className="mt-2">
              <CodeBlock code={x.code} language={x.language === 'xhtml' || x.language === 'xslt' ? 'xml' : x.language} />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{x.source}</p>
            </div>}
          </article>;
        })}
      </div> : <p className="p-6 rounded-xl border border-slate-200 dark:border-slate-800">Aucun résultat. Modifiez votre recherche ou les filtres.</p>}
    </section>
  );
};
