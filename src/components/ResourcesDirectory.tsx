import React, { useMemo, useState } from 'react';
import { ArrowUpRight, BookOpenText, ExternalLink, Filter, Search, Wrench } from 'lucide-react';
import { LANGUAGES_DATA } from '../data/languagesData';
import {orderIndex} from '../data/languageOrder';
import type { ResourceItem, LanguageId } from '../types';
import {GlossaryExplorer} from './GlossaryExplorer';

type Collection = { id: string; label: string; intro: string; resources: ResourceItem[] };
const resource = (title: string, url: string, description: string, category: ResourceItem['category'], isOfficial = false): ResourceItem =>
  ({ title, url, description, category, isOfficial });

// Références additionnelles ; les sept fiches conservent leurs liens pédagogiques existants.
const ADDITIONS: Record<string, ResourceItem[]> = {
  html: [
    resource('Nu HTML Checker (v.Nu)', 'https://validator.w3.org/nu/', 'Vérifier des documents HTML modernes et identifier les erreurs de balisage.', 'Outil', true),
    resource('WebAIM — Introduction à l’accessibilité', 'https://webaim.org/intro/', 'Bonnes pratiques pour des pages lisibles et utilisables par tous.', 'Tutoriel')
  ],
  css: [
    resource('Validateur CSS du W3C', 'https://jigsaw.w3.org/css-validator/', 'Contrôler la syntaxe d’une feuille de style CSS.', 'Outil', true),
    resource('MDN — CSS Layout', 'https://developer.mozilla.org/fr/docs/Learn_web_development/Core/CSS_layout', 'Étudier les bases de la mise en page CSS.', 'Tutoriel')
  ],
  xml: [
    resource('W3C — XML 1.0', 'https://www.w3.org/TR/xml/', 'Recommandation XML : syntaxe, entités, DTD et bonne formation.', 'Spécification', true),
    resource('W3C — XML Schema 1.1', 'https://www.w3.org/TR/xmlschema11-1/', 'Définition et validation de documents XML au moyen de schémas XSD.', 'Spécification', true)
  ],
  json: [
    resource('IETF — RFC 8259 (JSON)', 'https://www.rfc-editor.org/rfc/rfc8259', 'Format d’échange JSON et règles syntaxiques.', 'Spécification', true),
    resource('JSON Schema — Documentation', 'https://json-schema.org/docs', 'Documenter et valider la structure et les contraintes des données JSON.', 'Tutoriel', true)
  ],
  markdown: [
    resource('CommonMark — Spécification', 'https://spec.commonmark.org/', 'Grammaire commune de Markdown et exemples de référence.', 'Spécification', true),
    resource('Pandoc — Documentation', 'https://pandoc.org/MANUAL.html', 'Convertir des documents entre formats et automatiser les publications.', 'Outil', true)
  ],
  latex: [
    resource('CTAN — Bibliothèque de packages', 'https://ctan.org/', 'Rechercher des packages et leur documentation.', 'Outil'),
    resource('Overleaf — Documentation', 'https://www.overleaf.com/learn', 'Apprendre LaTeX et composer des documents scientifiques.', 'Tutoriel')
  ],
  yaml: [
    resource('YAML 1.2.2 — Spécification', 'https://yaml.org/spec/1.2.2/', 'Référence officielle de la syntaxe YAML.', 'Spécification', true),
    resource('YAML — Site du langage', 'https://yaml.org/', 'Présentation, spécifications et ressources de l’écosystème.', 'Communauté', true)
  ]
};

const SPECIAL: Collection[] = [
  { id: 'xpath', label: 'XPath', intro: 'Parcours de navigation et expressions de sélection sur les arbres XML.', resources: [
    resource('W3C — XPath 1.0', 'https://www.w3.org/TR/1999/REC-xpath-19991116/', 'Référence correspondant au moteur XPath 1.0 de notre laboratoire.', 'Spécification', true),
    resource('W3C — XPath 3.1', 'https://www.w3.org/TR/xpath-31/', 'Approfondissement des expressions modernes, non exécutables par le moteur natif XPath 1.0.', 'Spécification', true),
    resource('MDN — document.evaluate()', 'https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate', 'API du navigateur utilisée pour expérimenter XPath.', 'Tutoriel')
  ]},
  { id: 'xslt', label: 'XSLT', intro: 'Transformation de documents XML en HTML, XML ou texte.', resources: [
    resource('W3C — XSLT 1.0', 'https://www.w3.org/TR/xslt-10/', 'Recommandation pour les feuilles de style exécutées dans le laboratoire.', 'Spécification', true),
    resource('W3C — XSLT 3.0', 'https://www.w3.org/TR/xslt-30/', 'Fonctions avancées ; nécessite un moteur dédié, différent du navigateur.', 'Spécification', true),
    resource('MDN — XSLTProcessor', 'https://developer.mozilla.org/en-US/docs/Web/API/XSLTProcessor', 'API de transformation XSLT disponible dans certains navigateurs.', 'Tutoriel')
  ]},
  { id: 'dtd', label: 'DTD et entités XML', intro: 'Déclarations de types de documents, attributs et entités.', resources: [
    resource('W3C — XML 1.0, déclarations DTD', 'https://www.w3.org/TR/xml/#sec-prolog-dtd', 'Règles officielles des déclarations DTD et des entités.', 'Spécification', true),
    resource('W3C — XML Namespaces', 'https://www.w3.org/TR/xml-names/', 'Gestion des noms qualifiés et espaces de noms XML.', 'Spécification', true)
  ]},
  { id: 'xhtml', label: 'XHTML', intro: 'Documents HTML conformes aux règles de syntaxe XML.', resources: [
    resource('W3C — XHTML 1.0', 'https://www.w3.org/TR/xhtml1/', 'Définition historique du langage XHTML 1.0.', 'Spécification', true),
    resource('WHATWG — Syntaxe XML de HTML', 'https://html.spec.whatwg.org/multipage/xhtml.html', 'Règles de sérialisation et d’utilisation de HTML comme XML.', 'Spécification', true)
  ]}
];

const COLLECTIONS: Collection[] = [
  ...LANGUAGES_DATA.map(lang => ({
    id: lang.id, label: lang.name, intro: lang.tagline,
    resources: [...lang.resources, ...(ADDITIONS[lang.id] || [])]
      .filter((entry, i, all) => all.findIndex(other => other.url === entry.url) === i)
  })),
  ...SPECIAL
].sort((a,b) => orderIndex(a.id)-orderIndex(b.id));

interface Props { initialLanguage?: string; onOpenLab: (id: string) => void; onOpenCourse: (id: LanguageId) => void; }
export const ResourcesDirectory: React.FC<Props> = ({ initialLanguage, onOpenLab, onOpenCourse }) => {
  const [display,setDisplay]=useState<'references'|'glossary'>('references');
  const [selected, setSelected] = useState<string>(initialLanguage || 'all');
  const [type, setType] = useState<'all' | ResourceItem['category']>('all');
  const [query, setQuery] = useState('');
  React.useEffect(() => { setSelected(initialLanguage || 'all'); }, [initialLanguage]);
  const visible = useMemo(() => COLLECTIONS
    .filter(group => selected === 'all' || group.id === selected)
    .map(group => ({ ...group, resources: group.resources.filter(item =>
      (type === 'all' || item.category === type) &&
      (query.trim() === '' || [item.title,item.description,group.label].join(' ').toLocaleLowerCase('fr').includes(query.trim().toLocaleLowerCase('fr')))
    ) }))
    .filter(group => group.resources.length), [selected, type, query]);
  const count = visible.reduce((total, group) => total + group.resources.length, 0);
  return <div className="max-w-7xl mx-auto px-4 py-7 sm:py-10 space-y-6">
    <header className="rounded-3xl bg-gradient-to-br from-sky-800 via-blue-800 to-indigo-900 px-6 py-8 sm:p-10 text-white">
      <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest"><BookOpenText className="w-4 h-4" aria-hidden="true"/> Centre de documentation</div>
      <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight">Références & outils</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-blue-100">Spécifications, documentations, tutoriels, outils et glossaire pédagogique pour approfondir chaque langage. Les références officielles sont identifiées par leur organisme de publication.</p>
    </header>

    <div role="group" aria-label="Explorer le centre documentaire" className="flex flex-wrap gap-2">
      <button type="button" aria-pressed={display==='references'} onClick={()=>setDisplay('references')}
        className={'rounded-xl px-4 py-2.5 text-sm font-bold border '+(display==='references'?'bg-sky-800 text-white border-sky-800':'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800')}>
        Spécifications, tutoriels et outils
      </button>
      <button type="button" aria-pressed={display==='glossary'} onClick={()=>setDisplay('glossary')}
        className={'rounded-xl px-4 py-2.5 text-sm font-bold border '+(display==='glossary'?'bg-sky-800 text-white border-sky-800':'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800')}>
        Glossaire interactif
      </button>
    </div>
    {display==='glossary'?<GlossaryExplorer initialLanguage={initialLanguage} onOpenLab={onOpenLab} onOpenCourse={onOpenCourse}/>:<>
    <section aria-label="Filtrer les ressources" className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 space-y-4">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white"><Filter className="w-4 h-4" aria-hidden="true"/> Trouver une ressource</div>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Langage / technologie
          <select aria-label="Filtrer par langage" value={selected} onChange={e => setSelected(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm">
            <option value="all">Tous les langages</option>{COLLECTIONS.map(group => <option key={group.id} value={group.id}>{group.label}</option>)}
          </select>
        </label>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Type de ressource
          <select aria-label="Filtrer par type" value={type} onChange={e => setType(e.target.value as typeof type)} className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-sm">
            <option value="all">Toutes les catégories</option>{(['Spécification','Tutoriel','Outil','Communauté'] as const).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Recherche
          <div className="relative mt-1.5"><Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" aria-hidden="true"/>
            <input type="search" aria-label="Rechercher dans les références" value={query} onChange={e => setQuery(e.target.value)} placeholder="Norme, outil, documentation…" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 pl-9 text-sm"/>
          </div>
        </label>
      </div>
      <p role="status" className="text-xs text-slate-600 dark:text-slate-300">{count} ressource{count > 1 ? 's' : ''} affichée{count > 1 ? 's' : ''}.</p>
    </section>

    {visible.length ? visible.map(group => <section key={group.id} className="space-y-3" aria-labelledby={'resource-'+group.id}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div><h3 id={'resource-'+group.id} className="text-xl font-black text-slate-900 dark:text-white">{group.label}</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{group.intro}</p></div>
        {['html','xml','css','json','markdown','latex','yaml','xpath','xslt'].includes(group.id) && <button type="button" onClick={() => onOpenLab(group.id)} className="inline-flex items-center gap-1.5 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-200 px-3 py-2 text-xs font-bold hover:bg-sky-200 dark:hover:bg-sky-900"><Wrench className="w-4 h-4" aria-hidden="true"/> Expérimenter</button>}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {group.resources.map(item => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:border-sky-400 dark:hover:border-sky-700 hover:shadow-md transition-all">
          <div className="flex items-start justify-between gap-2"><strong className="text-sm text-slate-900 dark:text-white group-hover:text-sky-700 dark:group-hover:text-sky-300">{item.title}</strong><ArrowUpRight className="shrink-0 w-4 h-4 text-slate-400" aria-hidden="true"/></div>
          <p className="flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
          <div className="flex flex-wrap gap-2 text-[11px]"><span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1 text-slate-600 dark:text-slate-300">{item.category}</span>{item.isOfficial && <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-2 py-1 text-emerald-800 dark:text-emerald-200">Source officielle</span>}<ExternalLink className="ml-auto w-3.5 h-3.5 text-slate-400" aria-hidden="true"/></div>
        </a>)}
      </div>
    </section>) : <div className="rounded-xl bg-white dark:bg-slate-900 p-10 text-center text-sm text-slate-600 dark:text-slate-300">Aucune ressource ne correspond à ces critères. Essayez un autre filtre.</div>}
    <p className="text-xs text-slate-500 dark:text-slate-400">Liens vers des sites tiers : leur disponibilité et leur contenu peuvent évoluer. Les outils externes ne font pas partie des fonctionnalités intégrées au portail.</p>
    </>}
  </div>;
};
