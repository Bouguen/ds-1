import React, {useEffect, useMemo, useRef, useState} from 'react';
import {BookOpen, Check, Code2, Copy, Download, Play, RotateCcw, ShieldCheck, Terminal, X} from 'lucide-react';

type Panel = 'html' | 'css' | 'js';
type Draft = Record<Panel, string>;
type ConsoleRow = {level: string; message: string; id: number};

const STORAGE_KEY = 'ds-web-code-studio-v1';
const TEMPLATES: {name: string; objective: string; code: Draft}[] = [
  {
    name: 'Carte de présentation',
    objective: 'Modifier un titre, une mise en forme et le comportement d’un bouton.',
    code: {
      html: '<main class="card">\n  <span class="eyebrow">Atelier HTML • CSS • JS</span>\n  <h1>Bonjour, étudiant !</h1>\n  <p id="message">Découvrez comment trois langages coopèrent.</p>\n  <button id="action">Tester JavaScript</button>\n</main>',
      css: 'body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #eaf3fb; font-family: system-ui, sans-serif; }\n.card { width: min(440px, 82vw); padding: 2rem; background: white; border-radius: 18px; box-shadow: 0 14px 35px #0e426520; }\nh1 { color: #075e9a; margin: 1rem 0; }\n.eyebrow { font-weight: 700; font-size: 0.75rem; color: #087f98; text-transform: uppercase; }\nbutton { background: #075e9a; color: white; border: 0; padding: 0.8rem 1.1rem; border-radius: 10px; cursor: pointer; }',
      js: 'document.querySelector("#action").addEventListener("click", () => {\n  document.querySelector("#message").textContent = "Bravo ! JavaScript a modifié le document.";\n  console.log("Le bouton fonctionne.");\n});'
    }
  },
  {
    name: 'HTML sémantique',
    objective: 'Reconnaître header, nav, main, article et footer dans une page.',
    code: {
      html: '<header><h1>Journal des documents structurés</h1></header>\n<nav aria-label="Navigation"><a href="#article">Lire l’article</a></nav>\n<main><article id="article"><h2>Pourquoi le HTML sémantique ?</h2><p>Les éléments décrivent le rôle du contenu, pas uniquement son apparence.</p><ul><li>Structure</li><li>Accessibilité</li><li>Lisibilité</li></ul></article></main>\n<footer>Exercice pédagogique</footer>',
      css: 'body { font: 16px/1.6 system-ui; color: #233044; max-width: 720px; margin: 0 auto; padding: 1rem; }\nheader, footer { background: #084b7c; color: white; padding: 1rem; border-radius: 12px; }\nnav { margin: 1rem 0; }\na { color: #086ca5; }\narticle { padding: 1.5rem; border: 1px solid #cbd5e1; border-radius: 12px; }\nh2 { color: #075e9a; }',
      js: 'console.info("Document HTML sémantique chargé.");'
    }
  },
  {
    name: 'Grille CSS responsive',
    objective: 'Tester CSS Grid puis modifier les colonnes et la media query.',
    code: {
      html: '<main><h1>Catalogue des formats</h1><section class="grid"><article>HTML</article><article>CSS</article><article>XML</article><article>JSON</article><article>Markdown</article><article>LaTeX</article></section></main>',
      css: 'body { margin: 0; background: #f4f8fc; color: #123047; font-family: system-ui; padding: 2rem; }\nmain { max-width: 760px; margin: auto; }\n.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }\n.grid article { padding: 2rem 0.5rem; text-align: center; font-weight: bold; border-radius: 12px; background: #daf0fc; border: 1px solid #92d1f2; }\n@media (max-width: 540px) { .grid { grid-template-columns: repeat(2, 1fr); } }',
      js: 'console.log("Essayez de réduire la largeur de l’aperçu.");'
    }
  },
  {
    name: 'Formulaire interactif',
    objective: 'Relier un champ de saisie, une action JavaScript et un retour visuel.',
    code: {
      html: '<main><h1>Inscription au laboratoire</h1><form id="student-form"><label for="student-name">Prénom</label><input id="student-name" name="student-name" required placeholder="Votre prénom"><button type="submit">Valider</button></form><p id="feedback" role="status"></p></main>',
      css: 'body { font-family: system-ui; background: #f1f5f9; padding: 2rem; } main { max-width: 430px; margin: auto; padding: 2rem; border-radius: 16px; background: white; } form { display: grid; gap: 0.8rem; } input, button { padding: 0.8rem; border-radius: 8px; border: 1px solid #94a3b8; font: inherit; } button { background: #075e9a; color: white; border: 0; cursor: pointer; } #feedback { color: #087f5b; font-weight: 700; }',
      js: 'document.querySelector("#student-form").addEventListener("submit", (event) => {\n  event.preventDefault();\n  const name = document.querySelector("#student-name").value.trim();\n  document.querySelector("#feedback").textContent = "Bienvenue, " + name + " !";\n  console.log("Formulaire validé pour :", name);\n});'
    }
  }
];

function isDraft(value: unknown): value is Draft {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<Draft>;
  return ['html', 'css', 'js'].every(key => typeof item[key as Panel] === 'string');
}

/** Le code étudiant s'exécute uniquement dans un iframe sandboxé à origine opaque. */
function sandboxConsoleBridge(channel: string) {
  const send = (level: string, values: unknown[]) => {
    const message = values.map(value => {
      try { return typeof value === 'string' ? value : JSON.stringify(value); }
      catch { return String(value); }
    }).join(' ');
    window.parent.postMessage({dsStudioChannel: channel, level, message}, '*');
  };
  (['log', 'info', 'warn', 'error'] as const).forEach(level => {
    const original = console[level].bind(console);
    console[level] = (...values: unknown[]) => { send(level, values); original(...values); };
  });
  window.addEventListener('error', event => send('error', [event.message, 'ligne ' + event.lineno]));
  window.addEventListener('unhandledrejection', event => send('error', ['Promise rejetée :', String(event.reason)]));
}

function escapedTagContent(text: string, tag: string) {
  return text.replace(new RegExp('</' + tag, 'gi'), '<\\/' + tag);
}

function buildDocument(draft: Draft, channel?: string) {
  const csp = channel
    ? '<meta http-equiv="Content-Security-Policy" content="default-src &#39;none&#39;; script-src &#39;unsafe-inline&#39;; style-src &#39;unsafe-inline&#39;; img-src data: blob:; font-src data: blob:; connect-src &#39;none&#39;; form-action &#39;none&#39;; base-uri &#39;none&#39;">'
    : '';
  const css = '<style>' + escapedTagContent(draft.css, 'style') + '</style>';
  const bridge = channel ? '(' + sandboxConsoleBridge.toString() + ')(' + JSON.stringify(channel) + ');\n' : '';
  const js = '<script>' + bridge + escapedTagContent(draft.js, 'script') + '</script>';
  const html = draft.html.trim();
  if (/<html[\s>]|<!doctype\s+html/i.test(html)) {
    let doc = html;
    if (/<head[\s>]/i.test(doc)) {
      doc = doc.replace(/<head([^>]*)>/i, '<head$1>' + csp + css);
    } else if (/<html[\s>]/i.test(doc)) {
      doc = doc.replace(/<html([^>]*)>/i, '<html$1><head>' + csp + css + '</head>');
    } else {
      doc = csp + css + doc;
    }
    if (/<\/body\s*>/i.test(doc)) return doc.replace(/<\/body\s*>/i, js + '</body>');
    return doc + js;
  }
  return '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
    csp + css + '</head><body>' + draft.html + js + '</body></html>';
}

const PANELS: {id: Panel; label: string; filename: string; dot: string}[] = [
  {id: 'html', label: 'HTML', filename: 'index.html', dot: 'bg-orange-500'},
  {id: 'css', label: 'CSS', filename: 'style.css', dot: 'bg-sky-500'},
  {id: 'js', label: 'JavaScript', filename: 'script.js', dot: 'bg-amber-400'}
];

export function WebCodeStudio() {
  const [draft, setDraft] = useState<Draft>(() => {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (isDraft(value)) return value;
    } catch { /* Le stockage privé est facultatif. */ }
    return TEMPLATES[0].code;
  });
  const [activePanel, setActivePanel] = useState<Panel>('html');
  const [templateIndex, setTemplateIndex] = useState(0);
  const [autoRun, setAutoRun] = useState(true);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [messages, setMessages] = useState<ConsoleRow[]>([]);
  const [copied, setCopied] = useState(false);
  const channel = useMemo(() => 'ds-web-' + Math.random().toString(36).slice(2), []);
  const [preview, setPreview] = useState(() => buildDocument(draft, channel));
  const iframe = useRef<HTMLIFrameElement>(null);
  const sequence = useRef(0);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(draft)); }
    catch { /* Espace privé ou stockage saturé : l'édition reste fonctionnelle. */ }
  }, [draft]);

  useEffect(() => {
    if (!autoRun) return;
    const timer = window.setTimeout(() => {
      setMessages([]);
      setPreview(buildDocument(draft, channel));
    }, 450);
    return () => window.clearTimeout(timer);
  }, [draft, autoRun, channel]);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.source !== iframe.current?.contentWindow) return;
      const data = event.data;
      if (!data || data.dsStudioChannel !== channel || typeof data.message !== 'string') return;
      if (!['log', 'info', 'warn', 'error'].includes(data.level)) return;
      setMessages(previous => [...previous, {id: ++sequence.current, level: data.level, message: data.message.slice(0, 1200)}].slice(-60));
      if (data.level === 'error') setConsoleOpen(true);
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [channel]);

  const run = () => { setMessages([]); setPreview(buildDocument(draft, channel)); };

  const loadTemplate = (index: number) => {
    if (!TEMPLATES[index]) return;
    setTemplateIndex(index);
    setDraft({...TEMPLATES[index].code});
    setMessages([]);
  };

  const reset = () => {
    if (window.confirm('Réinitialiser le studio ? Vos modifications enregistrées localement seront remplacées.')) {
      loadTemplate(templateIndex);
    }
  };

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(draft[activePanel]);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch { window.alert('La copie automatique est indisponible : sélectionnez le code pour le copier.'); }
  };

  const downloadHtml = () => {
    const blob = new Blob([buildDocument(draft)], {type: 'text/html;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'documents-structures-exercice.html';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const edit = (panel: Panel, text: string) => setDraft(previous => ({...previous, [panel]: text}));
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>, panel: Panel) => {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    const node = event.currentTarget;
    const start = node.selectionStart;
    const end = node.selectionEnd;
    edit(panel, draft[panel].slice(0, start) + '  ' + draft[panel].slice(end));
    requestAnimationFrame(() => { node.selectionStart = node.selectionEnd = start + 2; });
  };

  return <section aria-label="Code Studio HTML CSS JavaScript" className="space-y-3">
    <div className="rounded-2xl border border-sky-200 dark:border-sky-900 bg-gradient-to-r from-[#063a63] to-[#087f98] text-white p-4 sm:p-5 shadow-sm">
      <div className="flex flex-wrap gap-3 justify-between items-start">
        <div>
          <p className="text-[11px] uppercase tracking-widest font-bold text-amber-200">Documents structurés · Atelier interactif</p>
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-black mt-1"><Code2 className="w-6 h-6" aria-hidden="true"/> Code Studio</h2>
          <p className="text-xs sm:text-sm mt-2 text-sky-100 max-w-2xl">Écrivez le HTML, personnalisez le CSS et testez JavaScript. Le résultat s'affiche dans une fenêtre isolée, sans installation.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold border border-white/20"><ShieldCheck className="w-4 h-4"/> Aperçu isolé</span>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 items-end justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
      <div className="flex flex-wrap items-center gap-2 min-w-0">
        <label htmlFor="ds-web-template" className="text-xs font-bold text-slate-700 dark:text-slate-200">Exercice</label>
        <select id="ds-web-template" value={templateIndex} onChange={event => loadTemplate(Number(event.target.value))}
          className="max-w-[220px] sm:max-w-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-2.5 py-2 text-xs">
          {TEMPLATES.map((item, index) => <option key={item.name} value={index}>{item.name}</option>)}
        </select>
        <span className="hidden lg:inline text-xs text-slate-500 dark:text-slate-400">{TEMPLATES[templateIndex].objective}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-1.5 px-2 py-1 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
          <input type="checkbox" checked={autoRun} onChange={event => setAutoRun(event.target.checked)} className="accent-sky-700"/>
          Aperçu automatique
        </label>
        <button type="button" onClick={run} className="inline-flex gap-1.5 items-center rounded-lg px-3 py-2 text-xs font-bold bg-sky-700 hover:bg-sky-800 text-white">
          <Play className="w-3.5 h-3.5" fill="currentColor"/> Exécuter
        </button>
        <button type="button" onClick={reset} title="Revenir à l'exemple initial" className="inline-flex gap-1.5 items-center rounded-lg px-3 py-2 text-xs font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
          <RotateCcw className="w-3.5 h-3.5"/> Réinitialiser
        </button>
        <button type="button" onClick={downloadHtml} className="inline-flex gap-1.5 items-center rounded-lg px-3 py-2 text-xs font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
          <Download className="w-3.5 h-3.5"/> Exporter HTML
        </button>
      </div>
    </div>

    <div className="rounded-xl border border-slate-700 bg-[#171e2b] shadow-lg overflow-hidden">
      <div className="flex items-center justify-between gap-2 bg-[#222e40] px-3 py-2 border-b border-slate-700">
        <div className="flex gap-1.5 overflow-x-auto" role="tablist" aria-label="Choisir un éditeur pour les petits écrans">
          {PANELS.map(panel => <button key={panel.id} type="button" role="tab" aria-selected={activePanel === panel.id}
            onClick={() => setActivePanel(panel.id)}
            className={'inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-bold ' +
              (activePanel === panel.id ? 'bg-white/15 text-white' : 'text-slate-300 hover:bg-white/10')}>
            <span className={'w-2 h-2 rounded-full ' + panel.dot}></span>{panel.label}
          </button>)}
        </div>
        <button type="button" onClick={copySource} title="Copier le code de l'onglet sélectionné"
          className="inline-flex shrink-0 gap-1 items-center text-xs text-sky-200 hover:text-white px-2 py-1.5 rounded-md hover:bg-white/10">
          {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
          <span className="hidden sm:inline">{copied ? 'Copié' : 'Copier'}</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-x divide-slate-700">
        {PANELS.map(panel => <div key={panel.id} className={(activePanel === panel.id ? 'block' : 'hidden') + ' lg:block min-w-0'}>
          <div className="px-3 py-2 text-[11px] text-slate-300 bg-[#1c2738] flex items-center justify-between border-b border-slate-700">
            <span className="font-mono">{panel.filename}</span>
            <span>{draft[panel.id].split('\n').length} lignes</span>
          </div>
          <textarea aria-label={'Code ' + panel.label} spellCheck={false} value={draft[panel.id]} onChange={event => edit(panel.id, event.target.value)}
            onFocus={() => setActivePanel(panel.id)} onKeyDown={event => handleKeyDown(event, panel.id)}
            className="w-full h-[290px] lg:h-[330px] bg-[#171e2b] text-slate-100 p-3 sm:p-4 font-mono text-[12px] leading-6 resize-y outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 selection:bg-sky-500/40"
          />
        </div>)}
      </div>
    </div>

    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
      <div className="flex flex-wrap gap-2 items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"/><h3 className="font-black text-sm">Aperçu interactif</h3></div>
        <button type="button" onClick={() => setConsoleOpen(!consoleOpen)} aria-expanded={consoleOpen}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 px-3 py-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700">
          <Terminal className="w-4 h-4"/> Console ({messages.length}) {consoleOpen ? '−' : '+'}
        </button>
      </div>
      <iframe ref={iframe} title="Résultat du code HTML, CSS et JavaScript (origine isolée)"
        sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={preview} className="block w-full h-[325px] sm:h-[390px] bg-white border-none"/>
      {consoleOpen && <div className="bg-[#101826] border-t border-slate-700">
        <div className="flex justify-between items-center px-3 py-2 text-[11px] text-slate-300">
          <span>Console JavaScript — messages de l'aperçu</span>
          <button type="button" onClick={() => setMessages([])} className="hover:text-white inline-flex gap-1 items-center"><X className="w-3.5 h-3.5"/> Effacer</button>
        </div>
        <div aria-live="polite" className="font-mono text-xs max-h-48 min-h-16 overflow-y-auto">
          {messages.length === 0 && <p className="px-3 py-3 text-slate-400">Aucun message. Essayez console.log() dans le panneau JavaScript.</p>}
          {messages.map(item => <p key={item.id}
            className={'px-3 py-1.5 border-t border-white/5 whitespace-pre-wrap break-words ' + (item.level === 'error' ? 'text-rose-300' : item.level === 'warn' ? 'text-amber-300' : 'text-slate-200')}>
            <span className="mr-2 opacity-60">[{item.level}]</span>{item.message}
          </p>)}
        </div>
      </div>}
    </div>

    <div className="flex flex-wrap items-start justify-between gap-2 rounded-xl border border-amber-200 dark:border-amber-900/70 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-xs leading-relaxed text-amber-950 dark:text-amber-100">
      <p className="max-w-3xl"><BookOpen className="w-4 h-4 inline mr-1" aria-hidden="true"/><strong>À expérimenter :</strong> {TEMPLATES[templateIndex].objective} Les trois fichiers sont éditables. Vous pouvez aussi saisir un document HTML complet avec son DOCTYPE.</p>
      <p className="text-amber-800 dark:text-amber-200">Brouillon sauvegardé dans ce navigateur uniquement · Ressources réseau bloquées dans l’aperçu.</p>
    </div>
  </section>;
}
