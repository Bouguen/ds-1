import React, { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import {
  Code2,
  FileCode,
  FileJson,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  RefreshCw,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

interface SandboxesViewProps {
  initialLanguage?: string;
}

export const SandboxesView: React.FC<SandboxesViewProps> = ({ initialLanguage = 'html' }) => {
  const [activeTool, setActiveTool] = useState<'web' | 'markdown' | 'json-xml' | 'latex' | 'boxmodel'>(() => {
    if (initialLanguage === 'latex') return 'latex';
    if (initialLanguage === 'json' || initialLanguage === 'xml') return 'json-xml';
    if (initialLanguage === 'markdown') return 'markdown';
    if (initialLanguage === 'css') return 'boxmodel';
    return 'web';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Tool Selector Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTool('web')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTool === 'web'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Web Studio (HTML + CSS)</span>
          </button>

          <button
            onClick={() => setActiveTool('markdown')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTool === 'markdown'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Markdown & Maths</span>
          </button>

          <button
            onClick={() => setActiveTool('json-xml')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTool === 'json-xml'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>JSON ↔ XML Workbench</span>
          </button>

          <button
            onClick={() => setActiveTool('latex')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTool === 'latex'
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/25'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>LaTeX Equation Lab</span>
          </button>

          <button
            onClick={() => setActiveTool('boxmodel')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTool === 'boxmodel'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>CSS Box Model 3D</span>
          </button>
        </div>
      </div>

      {/* Render Active Tool */}
      {activeTool === 'web' && <WebStudioSandbox />}
      {activeTool === 'markdown' && <MarkdownSandbox />}
      {activeTool === 'json-xml' && <JsonXmlSandbox />}
      {activeTool === 'latex' && <LatexLabSandbox />}
      {activeTool === 'boxmodel' && <BoxModelVisualizer />}
    </div>
  );
};

/* =========================================================================
   1. WEB STUDIO (HTML + CSS LIVE PLAYGROUND)
   ========================================================================= */

const WEB_PRESETS = [
  {
    name: 'Carte de Profil (Flexbox)',
    html: `<div class="card">
  <div class="avatar">👨‍🎓</div>
  <h2>Étudiant en Informatique</h2>
  <p class="role">Spécialité : Structuration de données</p>
  <div class="tags">
    <span class="tag">HTML5</span>
    <span class="tag">XML</span>
    <span class="tag">CSS3</span>
    <span class="tag">JSON</span>
  </div>
  <button class="btn">Consulter la fiche</button>
</div>`,
    css: `body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  font-family: system-ui, sans-serif;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 320px;
  border-top: 6px solid #0071cf;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.avatar {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

h2 {
  color: #102a43;
  margin: 0.5rem 0 0.2rem;
  font-size: 1.4rem;
}

.role {
  color: #627d98;
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.tag {
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.btn {
  background: #0071cf;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
}

.btn:hover {
  background: #00569e;
}`
  },
  {
    name: 'Article Sémantique & Citation',
    html: `<article class="article-box">
  <header>
    <span class="badge">Histoire de l'informatique</span>
    <h1>La naissance du Web en 1991</h1>
    <p class="meta">Par N. ELM &bull; Publié pour les révisions</p>
  </header>
  <main>
    <p>Tim Berners-Lee conçoit le premier prototype de <strong>HTML</strong> au CERN afin de faciliter le partage automatique d'informations entre physiciens du monde entier.</p>
    <blockquote cite="https://w3.org">
      « Le Web ne relie pas simplement des machines, il relie des êtres humains à travers la connaissance. »
    </blockquote>
    <p>Le protocole HTTP et le formalisme HTML constituent ensemble l'infrastructure sémantique de l'information mondiale.</p>
  </main>
</article>`,
    css: `body {
  margin: 0;
  padding: 2rem;
  background: #f8fafc;
  font-family: Georgia, serif;
  display: flex;
  justify-content: center;
}

.article-box {
  max-width: 550px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.badge {
  display: inline-block;
  background: #fef3c7;
  color: #92400e;
  font-size: 0.75rem;
  font-weight: bold;
  font-family: system-ui;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

h1 {
  font-family: system-ui, sans-serif;
  color: #0f172a;
  margin: 0 0 0.5rem;
  font-size: 1.6rem;
}

.meta {
  color: #64748b;
  font-size: 0.85rem;
  font-family: system-ui;
  margin-bottom: 1.5rem;
}

p {
  color: #334155;
  line-height: 1.7;
  font-size: 1.05rem;
}

blockquote {
  border-left: 4px solid #e44d26;
  margin: 1.5rem 0;
  padding: 0.8rem 1.2rem;
  background: #fff7ed;
  color: #9a3412;
  font-style: italic;
  border-radius: 0 8px 8px 0;
}`
  }
];

function WebStudioSandbox() {
  const [htmlCode, setHtmlCode] = useState(WEB_PRESETS[0].html);
  const [cssCode, setCssCode] = useState(WEB_PRESETS[0].css);
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
  const [fullscreen, setFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updatePreview = () => {
    if (!iframeRef.current) return;
    const doc = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>${cssCode}</style>
        </head>
        <body>${htmlCode}</body>
      </html>
    `;
    iframeRef.current.srcdoc = doc;
  };

  useEffect(() => {
    const timer = setTimeout(updatePreview, 250);
    return () => clearTimeout(timer);
  }, [htmlCode, cssCode]);

  return (
    <div className={`grid ${fullscreen ? 'fixed inset-4 z-50 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-4' : 'grid-cols-1 lg:grid-cols-2 gap-6'}`}>
      {/* Editor Pane */}
      <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'html'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              HTML
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'css'
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              CSS
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              aria-label="Charger un exemple de démonstration"
              onChange={(e) => {
                const idx = parseInt(e.target.value, 10);
                if (WEB_PRESETS[idx]) {
                  setHtmlCode(WEB_PRESETS[idx].html);
                  setCssCode(WEB_PRESETS[idx].css);
                }
              }}
              className="text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {WEB_PRESETS.map((p, i) => (
                <option key={i} value={i}>
                  Exemple : {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Textarea Code Area */}
        <div className="relative flex-1 min-h-[360px]">
          {activeTab === 'html' ? (
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              placeholder="Saisissez votre code HTML ici..."
              className="w-full h-full min-h-[360px] p-4 font-mono text-xs leading-relaxed bg-[#1e222b] text-slate-100 resize-none outline-none focus:ring-1 focus:ring-orange-500"
              spellCheck={false}
            />
          ) : (
            <textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              placeholder="Saisissez votre code CSS ici..."
              className="w-full h-full min-h-[360px] p-4 font-mono text-xs leading-relaxed bg-[#1e222b] text-slate-100 resize-none outline-none focus:ring-1 focus:ring-sky-500"
              spellCheck={false}
            />
          )}
        </div>
      </div>

      {/* Live Preview Pane */}
      <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Rendu En Direct (Isolated Sandbox)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => updatePreview()}
              className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-slate-700"
              title="Rafraîchir"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-slate-700"
              title={fullscreen ? "Quitter le plein écran" : "Plein écran"}
            >
              {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-[360px] bg-slate-50 dark:bg-slate-950">
          <iframe
            ref={iframeRef}
            title="Aperçu Web interactif"
            sandbox="allow-scripts"
            className="w-full h-full min-h-[360px] border-none"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. MARKDOWN & MATHS LIVE PREVIEWER
   ========================================================================= */

const INITIAL_MD = `# Fiche de Révision : Markdown & LaTeX

Markdown permet de structurer vos notes **sans lever les mains du clavier**.

## Pourquoi les étudiants l'adorent ?
- Écriture ultra-rapide et naturelle
- Lisible en texte brut dans n'importe quel éditeur
- Converti en un clic vers HTML ou PDF via **Pandoc**

> « La perfection est atteinte non pas lorsqu'il n'y a plus rien à ajouter, mais lorsqu'il n'y a plus rien à retirer. » — Antoine de Saint-Exupéry

### Tableau Récapitulatif
| Format | Objectif | Extension |
| :--- | :--- | :---: |
| HTML | Web sémantique | .html |
| Markdown | Documentation rapide | .md |
| LaTeX | Rigueur scientifique | .tex |

### Formule Mathématique en TeX :
L'identité d'Euler : $e^{i\\pi} + 1 = 0$

L'intégrale de Gauss :
$$\\int_{-\\infty}^{+\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}$$

- [x] Maîtriser les titres # et ##
- [x] Formater en **gras** et *italique*
- [ ] Réussir le Devoir Surveillé (DS) avec mention !
`;

function MarkdownSandbox() {
  const [content, setContent] = useState(INITIAL_MD);
  const previewRef = useRef<HTMLDivElement>(null);

  // Render markdown with basic parser + KaTeX replacement
  const renderMarkdown = (text: string) => {
    let html = text;

    // LaTeX blocks: $$...$$
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_, eq) => {
      try {
        return `<div class="my-4 text-center overflow-x-auto">${katex.renderToString(eq.trim(), { displayMode: true, throwOnError: false })}</div>`;
      } catch {
        return `<pre class="text-rose-500 font-mono text-xs">$$${eq}$$</pre>`;
      }
    });

    // LaTeX inline: $...$
    html = html.replace(/\$([^\$\n]+?)\$/g, (_, eq) => {
      try {
        return `<span class="inline-math">${katex.renderToString(eq.trim(), { displayMode: false, throwOnError: false })}</span>`;
      } catch {
        return `<code class="text-rose-500">$${eq}</code>`;
      }
    });

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-purple-700 dark:text-purple-400 mt-6 mb-3 pb-1 border-b border-purple-200 dark:border-purple-900/50">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">$1</h1>');

    // Bold, Italic, Strikethrough
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-purple-900 dark:text-purple-300">$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');
    html = html.replace(/~~(.*?)~~/gim, '<del class="line-through text-slate-400">$1</del>');

    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-purple-500 pl-4 py-1.5 my-3 bg-purple-50 dark:bg-purple-950/30 text-purple-950 dark:text-purple-200 italic rounded-r-lg">$1</blockquote>');

    // Checkboxes
    html = html.replace(/^- \[x\] (.*$)/gim, '<li class="flex items-center gap-2 text-slate-700 dark:text-slate-300 my-1"><span class="text-emerald-500 font-bold">✓</span> <span class="line-through text-slate-400">$1</span></li>');
    html = html.replace(/^- \[ \] (.*$)/gim, '<li class="flex items-center gap-2 text-slate-700 dark:text-slate-300 my-1"><span class="text-slate-400">☐</span> $1</li>');

    // Bullet lists
    html = html.replace(/^- (.*$)/gim, '<li class="list-disc ml-5 my-1 text-slate-700 dark:text-slate-300">$1</li>');

    // Simple Tables
    const tableRegex = /\|(.+)\|\n\|[-:| ]+\|\n((?:\|.+\|\n?)+)/g;
    html = html.replace(tableRegex, (match, headerRow, bodyRows) => {
      const headers = headerRow.split('|').map((h: string) => h.trim()).filter((h: string) => h.length > 0);
      const rows = bodyRows.trim().split('\n').map((row: string) =>
        row.split('|').map((c: string) => c.trim()).filter((c: string) => c.length > 0)
      );

      return `
        <div class="overflow-x-auto my-4">
          <table class="min-w-full text-xs text-left border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
            <thead class="bg-purple-100 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200 font-bold">
              <tr>${headers.map((h: string) => `<th class="p-2 border-b border-slate-300 dark:border-slate-700">${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${rows.map((r: string[]) => `
                <tr class="border-b border-slate-200 dark:border-slate-800 hover:bg-purple-50/50 dark:hover:bg-purple-950/20">
                  ${r.map((cell: string) => `<td class="p-2">${cell}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    });

    // Paragraphs
    html = html.split('\n\n').map(p => {
      if (p.startsWith('<h') || p.startsWith('<blockquote') || p.startsWith('<li') || p.startsWith('<div') || p.startsWith('<table')) {
        return p;
      }
      return `<p class="my-2 leading-relaxed text-slate-700 dark:text-slate-300">${p}</p>`;
    }).join('');

    return html;
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const readTime = Math.ceil(wordCount / 200);

  const insertSnippet = (snippet: string) => {
    setContent(prev => prev + '\n' + snippet);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Markdown Input */}
      <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        {/* Formatting Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-1 p-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs">
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => insertSnippet('## Nouveau Titre')}
              className="px-2 py-1 bg-white dark:bg-slate-700 rounded font-bold hover:bg-purple-100 text-purple-700 dark:text-purple-300 cursor-pointer"
            >
              H2
            </button>
            <button
              onClick={() => insertSnippet('**Texte en gras**')}
              className="px-2 py-1 bg-white dark:bg-slate-700 rounded font-bold hover:bg-purple-100 text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              Gras
            </button>
            <button
              onClick={() => insertSnippet('*Texte en italique*')}
              className="px-2 py-1 bg-white dark:bg-slate-700 rounded italic hover:bg-purple-100 text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              Italique
            </button>
            <button
              onClick={() => insertSnippet('> « Une citation inspirante »')}
              className="px-2 py-1 bg-white dark:bg-slate-700 rounded hover:bg-purple-100 text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              Citation
            </button>
            <button
              onClick={() => insertSnippet('$e^{i\\pi} + 1 = 0$')}
              className="px-2 py-1 bg-white dark:bg-slate-700 rounded hover:bg-purple-100 text-pink-600 dark:text-pink-400 font-mono font-semibold cursor-pointer"
            >
              TeX $..$
            </button>
            <button
              onClick={() => insertSnippet('| Colonne 1 | Colonne 2 |\n| :--- | :--- |\n| Valeur A | Valeur B |')}
              className="px-2 py-1 bg-white dark:bg-slate-700 rounded hover:bg-purple-100 text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              Tableau
            </button>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            {wordCount} mots &bull; {readTime} min
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full flex-1 min-h-[420px] p-4 font-mono text-xs leading-relaxed bg-[#1e222b] text-slate-100 resize-none outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Rédigez votre document Markdown..."
          spellCheck={false}
        />
      </div>

      {/* Rendered View */}
      <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-purple-600" />
            <span>Rendu Formaté & Mathématiques (KaTeX)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">{charCount} caractères</span>
        </div>

        <div
          ref={previewRef}
          className="flex-1 p-6 overflow-y-auto max-h-[500px] text-sm bg-white dark:bg-slate-900 prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
      </div>
    </div>
  );
}

/* =========================================================================
   3. JSON <-> XML WORKBENCH
   ========================================================================= */

const SAMPLE_JSON = `{
  "bibliographie": {
    "titreCollection": "Les Classiques Universels",
    "total": 2,
    "ouvrages": [
      {
        "id": "miserables",
        "titre": "Les Misérables",
        "auteur": "Victor Hugo",
        "annee": 1862,
        "disponible": true,
        "prix": 14.5
      },
      {
        "id": "etranger",
        "titre": "L'Étranger",
        "auteur": "Albert Camus",
        "annee": 1942,
        "disponible": false,
        "prix": 9.9
      }
    ]
  }
}`;

function JsonXmlSandbox() {
  const [jsonText, setJsonText] = useState(SAMPLE_JSON);
  const [xmlText, setXmlText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Convert JSON to XML
  const convertJsonToXml = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n${objectToXml(parsed, 0)}`;
      setXmlText(xmlString);
      setErrorMsg(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(`Erreur JSON : ${err.message}`);
      } else {
        setErrorMsg('Erreur de parsing JSON');
      }
    }
  };

  // Convert XML to JSON (simple DOMParser)
  const convertXmlToJson = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const parserError = xmlDoc.getElementsByTagName('parsererror');
      if (parserError.length > 0) {
        setErrorMsg(`Erreur XML : ${parserError[0].textContent || 'Document XML mal formé'}`);
        return;
      }
      const jsonResult = xmlToJson(xmlDoc.documentElement);
      setJsonText(JSON.stringify(jsonResult, null, 2));
      setErrorMsg(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(`Erreur XML : ${err.message}`);
      } else {
        setErrorMsg('Erreur de parsing XML');
      }
    }
  };

  useEffect(() => {
    convertJsonToXml();
  }, []);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setErrorMsg(null);
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMsg(err.message);
    }
  };

  const copyText = (txt: string, type: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Status banner */}
      {errorMsg ? (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span className="font-mono">{errorMsg}</span>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Données synchronisées et validées avec succès !</span>
        </div>
      )}

      {/* Split editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* JSON Pane */}
        <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900 text-xs">
            <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <FileJson className="w-4 h-4" />
              JSON (RFC 8259)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={formatJson}
                className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-100 cursor-pointer"
              >
                Formater
              </button>
              <button
                onClick={convertJsonToXml}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-700 cursor-pointer shadow-sm"
              >
                <span>Convertir vers XML</span>
                <ArrowRightLeft className="w-3 h-3" />
              </button>
              <button
                onClick={() => copyText(jsonText, 'json')}
                className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                title="Copier JSON"
              >
                {copiedType === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full flex-1 min-h-[380px] p-4 font-mono text-xs leading-relaxed bg-[#1e222b] text-emerald-200 resize-none outline-none focus:ring-1 focus:ring-emerald-500"
            spellCheck={false}
          />
        </div>

        {/* XML Pane */}
        <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-100 dark:border-amber-900 text-xs">
            <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              XML (W3C Extensible Markup)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={convertXmlToJson}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-600 text-white font-medium hover:bg-amber-700 cursor-pointer shadow-sm"
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>Convertir vers JSON</span>
              </button>
              <button
                onClick={() => copyText(xmlText, 'xml')}
                className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                title="Copier XML"
              >
                {copiedType === 'xml' ? <Check className="w-3.5 h-3.5 text-amber-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <textarea
            value={xmlText}
            onChange={(e) => setXmlText(e.target.value)}
            className="w-full flex-1 min-h-[380px] p-4 font-mono text-xs leading-relaxed bg-[#1e222b] text-amber-200 resize-none outline-none focus:ring-1 focus:ring-amber-500"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

// Helpers for bidirectional conversion
function objectToXml(obj: unknown, indent = 0): string {
  const pad = '  '.repeat(indent);
  if (typeof obj !== 'object' || obj === null) {
    return `${pad}${String(obj)}\n`;
  }

  let xml = '';
  for (const key of Object.keys(obj as Record<string, unknown>)) {
    const val = (obj as Record<string, unknown>)[key];
    const safeTag = key.replace(/[^a-zA-Z0-9_-]/g, '_');

    if (Array.isArray(val)) {
      xml += `${pad}<${safeTag}>\n`;
      for (const item of val) {
        xml += `${pad}  <item>\n${objectToXml(item, indent + 2)}${pad}  </item>\n`;
      }
      xml += `${pad}</${safeTag}>\n`;
    } else if (typeof val === 'object' && val !== null) {
      xml += `${pad}<${safeTag}>\n${objectToXml(val, indent + 1)}${pad}</${safeTag}>\n`;
    } else {
      xml += `${pad}<${safeTag}>${val}</${safeTag}>\n`;
    }
  }
  return xml;
}

function xmlToJson(node: Element): unknown {
  const obj: Record<string, unknown> = {};
  if (node.children.length === 0) {
    const text = node.textContent?.trim() || '';
    if (text === 'true') return true;
    if (text === 'false') return false;
    const num = Number(text);
    return isNaN(num) || text === '' ? text : num;
  }

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    const childName = child.nodeName;
    const childVal = xmlToJson(child);

    if (obj[childName]) {
      if (!Array.isArray(obj[childName])) {
        obj[childName] = [obj[childName]];
      }
      (obj[childName] as unknown[]).push(childVal);
    } else {
      obj[childName] = childVal;
    }
  }
  return obj;
}

/* =========================================================================
   4. LATEX EQUATION LAB (KATEX LIVE EXPERIMENTATION)
   ========================================================================= */

const LATEX_PRESETS = [
  {
    name: 'Identité d\'Euler',
    code: 'e^{i\\pi} + 1 = 0'
  },
  {
    name: 'Équation Quadratique & Discriminant',
    code: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'
  },
  {
    name: 'Intégrale de Gauss & Densité Normale',
    code: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left( -\\frac{(x - \\mu)^2}{2\\sigma^2} \\right)'
  },
  {
    name: 'Produit Matriciel 2x2',
    code: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}'
  },
  {
    name: 'Série de Taylor & Somme Infinie',
    code: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n'
  }
];

function LatexLabSandbox() {
  const [latexCode, setLatexCode] = useState(LATEX_PRESETS[0].code);
  const [renderedHtml, setRenderedHtml] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rendered = katex.renderToString(latexCode, {
        displayMode: true,
        throwOnError: true
      });
      setRenderedHtml(rendered);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }, [latexCode]);

  const insertSymbol = (sym: string) => {
    setLatexCode(prev => prev + ' ' + sym);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Palette of Mathematical Symbols */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Palette de Symboles & Commandes Fréquentes
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: '\\frac{a}{b}', code: '\\frac{a}{b}' },
            { label: '\\sqrt{x}', code: '\\sqrt{x}' },
            { label: '\\int_{a}^{b}', code: '\\int_{a}^{b}' },
            { label: '\\sum_{i=1}^{n}', code: '\\sum_{i=1}^{n}' },
            { label: '\\lim_{x \\to 0}', code: '\\lim_{x \\to 0}' },
            { label: '\\alpha', code: '\\alpha' },
            { label: '\\beta', code: '\\beta' },
            { label: '\\pi', code: '\\pi' },
            { label: '\\theta', code: '\\theta' },
            { label: '\\infty', code: '\\infty' },
            { label: '\\le / \\ge', code: '\\le \\ge' },
            { label: '\\approx', code: '\\approx' },
            { label: '\\in', code: '\\in' },
            { label: '\\times', code: '\\times' },
            { label: '\\partial', code: '\\partial' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => insertSymbol(item.code)}
              className="px-2.5 py-1 text-xs font-mono bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900 border border-pink-200 dark:border-pink-800 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Code Source LaTeX / TeX</span>
            <select
              aria-label="Charger une formule mathématique type"
              onChange={(e) => setLatexCode(e.target.value)}
              className="text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {LATEX_PRESETS.map((p, i) => (
                <option key={i} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={latexCode}
            onChange={(e) => setLatexCode(e.target.value)}
            className="w-full flex-1 min-h-[300px] p-4 font-mono text-xs leading-relaxed bg-[#1e222b] text-pink-200 resize-none outline-none focus:ring-1 focus:ring-pink-500"
            placeholder="Saisissez vos équations LaTeX..."
            spellCheck={false}
          />
        </div>

        {/* Live Equation Render */}
        <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-pink-50 dark:bg-pink-950/40 border-b border-pink-100 dark:border-pink-900 text-xs font-semibold text-pink-800 dark:text-pink-300">
            <span>Rendu Mathématique Vectoriel (KaTeX Engine)</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-950/50 min-h-[300px] overflow-x-auto">
            {error ? (
              <div className="text-center p-4 text-rose-500 font-mono text-xs bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900">
                <AlertTriangle className="w-5 h-5 mx-auto mb-2" />
                {error}
              </div>
            ) : (
              <div
                className="text-2xl text-slate-800 dark:text-slate-100 scale-125 transform transition-all"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. CSS BOX MODEL 3D VISUALIZER
   ========================================================================= */

function BoxModelVisualizer() {
  const [margin, setMargin] = useState(24);
  const [border, setBorder] = useState(8);
  const [padding, setPadding] = useState(20);
  const [contentWidth, setContentWidth] = useState(180);
  const [contentHeight, setContentHeight] = useState(100);
  const [boxSizing, setBoxSizing] = useState<'content-box' | 'border-box'>('border-box');

  // Calculate actual total rendered width
  const totalWidth = boxSizing === 'border-box'
    ? contentWidth + (margin * 2)
    : contentWidth + (padding * 2) + (border * 2) + (margin * 2);

  const totalHeight = boxSizing === 'border-box'
    ? contentHeight + (margin * 2)
    : contentHeight + (padding * 2) + (border * 2) + (margin * 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Paramètres du Box Model</h3>
          <span className="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-mono font-semibold">
            {boxSizing}
          </span>
        </div>

        {/* Box Sizing Toggle */}
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-2">
            Propriété CSS <code className="text-sky-600">box-sizing</code> :
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setBoxSizing('border-box')}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                boxSizing === 'border-box'
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200'
              }`}
            >
              border-box (Recommandé)
            </button>
            <button
              onClick={() => setBoxSizing('content-box')}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                boxSizing === 'content-box'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200'
              }`}
            >
              content-box (Historique)
            </button>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between font-mono mb-1">
              <span className="text-amber-600 dark:text-amber-400 font-bold">Margin (Marge externe)</span>
              <span>{margin}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between font-mono mb-1">
              <span className="text-yellow-600 dark:text-yellow-400 font-bold">Border (Bordure)</span>
              <span>{border}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={border}
              onChange={(e) => setBorder(Number(e.target.value))}
              className="w-full accent-yellow-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between font-mono mb-1">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Padding (Marge interne)</span>
              <span>{padding}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between font-mono mb-1">
              <span className="text-sky-600 dark:text-sky-400 font-bold">Content Width (Largeur)</span>
              <span>{contentWidth}px</span>
            </div>
            <input
              type="range"
              min="100"
              max="260"
              value={contentWidth}
              onChange={(e) => setContentWidth(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between font-mono mb-1">
              <span className="text-sky-600 dark:text-sky-400 font-bold">Content Height (Hauteur)</span>
              <span>{contentHeight}px</span>
            </div>
            <input
              type="range"
              min="60"
              max="160"
              value={contentHeight}
              onChange={(e) => setContentHeight(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated summary */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-mono space-y-1">
          <div className="font-bold text-slate-700 dark:text-slate-300">Dimensions Totales Occupées :</div>
          <div className="text-sky-600 dark:text-sky-400">
            Largeur : {totalWidth}px &bull; Hauteur : {totalHeight}px
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {boxSizing === 'border-box'
              ? '✅ Avec border-box, le padding et la border restent confinés dans la taille déclarée !'
              : '⚠️ Avec content-box, le padding et la border s\'ajoutent en plus à la largeur déclarée.'}
          </div>
        </div>
      </div>

      {/* Visual Diagram */}
      <div className="lg:col-span-8 bg-slate-100 dark:bg-slate-950 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-inner flex flex-col items-center justify-center min-h-[460px]">
        {/* Margin Box (Outer) */}
        <div
          className="rounded-2xl border-2 border-dashed border-amber-400 bg-amber-500/10 flex flex-col items-center justify-center transition-all duration-150 relative"
          style={{ padding: `${margin}px` }}
        >
          <span className="absolute top-1 left-2 text-[10px] font-mono font-bold text-amber-600 uppercase tracking-widest">
            margin ({margin}px)
          </span>

          {/* Border Box */}
          <div
            className="rounded-xl border-yellow-500 bg-yellow-500/20 flex flex-col items-center justify-center transition-all duration-150 relative"
            style={{ borderWidth: `${border}px`, borderStyle: 'solid' }}
          >
            {border > 4 && (
              <span className="absolute top-0.5 left-1 text-[9px] font-mono font-bold text-yellow-800 dark:text-yellow-200 uppercase">
                border ({border}px)
              </span>
            )}

            {/* Padding Box */}
            <div
              className="rounded-lg bg-emerald-500/20 flex flex-col items-center justify-center transition-all duration-150 relative"
              style={{ padding: `${padding}px` }}
            >
              <span className="absolute top-1 left-2 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                padding ({padding}px)
              </span>

              {/* Content Box (Core) */}
              <div
                className="rounded bg-sky-500 text-white shadow-md flex flex-col items-center justify-center font-mono font-bold text-xs transition-all duration-150"
                style={{ width: `${contentWidth}px`, height: `${contentHeight}px` }}
              >
                <span>content</span>
                <span className="text-[10px] opacity-80 mt-0.5">
                  {contentWidth} × {contentHeight}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-6 text-xs font-mono font-semibold">
          <span className="flex items-center gap-1.5 text-amber-600">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> Marge (Margin)
          </span>
          <span className="flex items-center gap-1.5 text-yellow-600">
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" /> Bordure (Border)
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600">
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" /> Marge Interne (Padding)
          </span>
          <span className="flex items-center gap-1.5 text-sky-600">
            <span className="w-3 h-3 rounded-full bg-sky-500 inline-block" /> Contenu (Content)
          </span>
        </div>
      </div>
    </div>
  );
}
