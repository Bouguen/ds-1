import React, { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import { LanguageId } from '../types';
import { GuidedPractice, LabTechnology } from './GuidedPractice';
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
  Info,
  Calculator,
  Download
} from 'lucide-react';

interface SandboxesViewProps {
  initialLanguage?: LanguageId;
  onLanguageChange?: (langId: LanguageId) => void;
}

export const SandboxesView: React.FC<SandboxesViewProps> = ({
  initialLanguage = 'html',
  onLanguageChange
}) => {
  const [activeTool, setActiveTool] = useState<LabTechnology>(initialLanguage);

  // Sync state if initialLanguage prop changes from outside (e.g. clicking card button or header menu)
  useEffect(() => {
    if (initialLanguage) {
      setActiveTool(initialLanguage);
    }
  }, [initialLanguage]);

  const handleToolSelect = (toolId: LabTechnology) => {
    setActiveTool(toolId);
    if (onLanguageChange && ['html', 'css', 'xml', 'json', 'markdown', 'latex', 'yaml'].includes(toolId)) {
      onLanguageChange(toolId as LanguageId);
    }
  };

  const tools = [
    { id: 'html' as LanguageId, name: 'HTML5', icon: '🌐', label: 'Web Studio', color: 'bg-orange-500', text: 'text-orange-500' },
    { id: 'css' as LanguageId, name: 'CSS3', icon: '🎨', label: 'Box Model & Style', color: 'bg-sky-500', text: 'text-sky-500' },
    { id: 'xml' as LanguageId, name: 'XML', icon: '📦', label: 'Validateur & Arbre', color: 'bg-amber-500', text: 'text-amber-500' },
    { id: 'json' as LanguageId, name: 'JSON', icon: '🧩', label: 'Validateur & Arbre', color: 'bg-emerald-600', text: 'text-emerald-600' },
    { id: 'markdown' as LanguageId, name: 'Markdown', icon: '📝', label: 'Éditeur & KaTeX', color: 'bg-purple-600', text: 'text-purple-600' },
    { id: 'latex' as LabTechnology, name: 'LaTeX', icon: '🔢', label: 'Equation Lab', color: 'bg-pink-600', text: 'text-pink-600' },
    { id: 'yaml' as LabTechnology, name: 'YAML', icon: '⚙️', label: 'Config & Indentation', color: 'bg-teal-600', text: 'text-teal-600' },
    { id: 'xhtml' as LabTechnology, name: 'XHTML', icon: '🧱', label: 'Syntaxe XML', color: 'bg-rose-600', text: 'text-rose-600' },
    { id: 'dtd' as LabTechnology, name: 'DTD', icon: '📐', label: 'Grammaire XML', color: 'bg-indigo-600', text: 'text-indigo-600' },
    { id: 'entities' as LabTechnology, name: 'Entités', icon: '🔣', label: 'Références XML', color: 'bg-violet-600', text: 'text-violet-600' },
    { id: 'xpath' as LabTechnology, name: 'XPath', icon: '🔎', label: 'Requêtes XML', color: 'bg-cyan-700', text: 'text-cyan-700' },
    { id: 'xslt' as LabTechnology, name: 'XSLT', icon: '🔄', label: 'Transformations', color: 'bg-fuchsia-700', text: 'text-fuchsia-700' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Tool Selector Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-2.5 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {tools.map((tool) => {
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => handleToolSelect(tool.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? `${tool.color} text-white shadow-md`
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{tool.icon}</span>
                <span>{tool.name}</span>
                <span className={`text-[10px] hidden md:inline opacity-80 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  ({tool.label})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Tool */}
      {activeTool === 'html' && <HtmlWebSandbox />}
      {activeTool === 'css' && <CssStudioSandbox />}
      {activeTool === 'xml' && <XmlDedicatedSandbox />}
      {activeTool === 'json' && <JsonDedicatedSandbox />}
      {activeTool === 'markdown' && <MarkdownSandbox />}
      {activeTool === 'latex' && <LatexLabSandbox />}
      <GuidedPractice language={activeTool} />
    </div>
  );
};

/* =========================================================================
   1. HTML WEB STUDIO SANDBOX
   ========================================================================= */

const HTML_PRESETS = [
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
    <span class="badge">Histoire du Web</span>
    <h1>La naissance du Web en 1991</h1>
    <p class="meta">Par N. ELM &bull; Édition DS</p>
  </header>
  <main>
    <p>Tim Berners-Lee conçoit le premier prototype de <strong>HTML</strong> au CERN afin de faciliter le partage automatique d'informations entre physiciens du monde entier.</p>
    <blockquote cite="https://w3.org">
      « Le Web ne relie pas simplement des machines, il relie des êtres humains à travers la connaissance. »
    </blockquote>
    <p>Le protocole HTTP et le formalisme HTML constituent ensemble l'infrastructure de l'information mondiale.</p>
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
  },
  { name: "Formulaire accessible", html: "<main class=\"form\"><h1>Inscription</h1><form><label for=\"prenom\">Prénom</label><input id=\"prenom\" required><label for=\"niveau\">Niveau</label><select id=\"niveau\"><option>Débutant</option><option>Intermédiaire</option></select><button>Valider</button></form></main>", css: "body{font-family:system-ui;background:#eff6ff;padding:2rem}.form{max-width:360px;margin:auto;background:white;padding:2rem;border-radius:1rem}label{display:block;margin:1rem 0 .3rem;font-weight:bold}input,select{width:100%;box-sizing:border-box;padding:.7rem}button{margin-top:1rem;padding:.7rem;background:#0369a1;color:white;border:0;border-radius:.5rem}" },
  { name: "Galerie Grid responsive", html: "<main><h1>Langages</h1><section class=\"gallery\"><article><h2>HTML</h2><p>Présentation</p></article><article><h2>XML</h2><p>Structure</p></article><article><h2>JSON</h2><p>Données</p></article><article><h2>CSS</h2><p>Styles</p></article></section></main>", css: "body{font-family:system-ui;padding:2rem;background:#f8fafc}.gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem}article{padding:1rem;background:white;border:1px solid #cbd5e1;border-radius:12px}h2{color:#0369a1}" },
  { name: "Schéma SVG de l'arbre", html: "<main><h1>Arbre XML</h1><svg viewBox=\"0 0 520 230\" role=\"img\" aria-label=\"Racine document reliée à titre et paragraphe\"><line x1=\"260\" y1=\"70\" x2=\"130\" y2=\"145\" stroke=\"#0284c7\" stroke-width=\"3\"/><line x1=\"260\" y1=\"70\" x2=\"385\" y2=\"145\" stroke=\"#0284c7\" stroke-width=\"3\"/><rect x=\"180\" y=\"15\" width=\"160\" height=\"60\" rx=\"12\" fill=\"#e0f2fe\"/><text x=\"260\" y=\"50\" text-anchor=\"middle\">document</text><rect x=\"50\" y=\"145\" width=\"160\" height=\"60\" rx=\"12\" fill=\"#d1fae5\"/><text x=\"130\" y=\"180\" text-anchor=\"middle\">titre</text><rect x=\"305\" y=\"145\" width=\"160\" height=\"60\" rx=\"12\" fill=\"#fef3c7\"/><text x=\"385\" y=\"180\" text-anchor=\"middle\">paragraphe</text></svg></main>", css: "body{font-family:system-ui;background:#f8fafc;padding:2rem}main{max-width:650px;margin:auto}svg{width:100%;background:white;border-radius:1rem}text{font:bold 17px system-ui;fill:#0f172a}" },
  { name: "Tableau structuré", html: "<main><h1>Comparatif</h1><table><caption>Trois formats</caption><thead><tr><th scope=\"col\">Format</th><th scope=\"col\">Usage</th></tr></thead><tbody><tr><td>HTML</td><td>Présenter</td></tr><tr><td>XML</td><td>Structurer</td></tr><tr><td>JSON</td><td>Échanger</td></tr></tbody></table></main>", css: "body{font-family:system-ui;padding:2rem;background:#f1f5f9}table{border-collapse:collapse;width:100%;background:white}caption{font-weight:bold;margin:1rem}th,td{padding:1rem;border:1px solid #cbd5e1}th{background:#0c4a6e;color:white}tr:nth-child(even){background:#f0f9ff}" }
];

function HtmlWebSandbox() {
  const [htmlCode, setHtmlCode] = useState(HTML_PRESETS[0].html);
  const [cssCode, setCssCode] = useState(HTML_PRESETS[0].css);
  const [activeEditorTab, setActiveEditorTab] = useState<'html' | 'css'>('html');
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
    const timer = setTimeout(updatePreview, 200);
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
              onClick={() => setActiveEditorTab('html')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeEditorTab === 'html'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Éditeur HTML
            </button>
            <button
              onClick={() => setActiveEditorTab('css')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeEditorTab === 'css'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Styles CSS
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              aria-label="Charger un exemple de démonstration"
              onChange={(e) => {
                const idx = parseInt(e.target.value, 10);
                if (HTML_PRESETS[idx]) {
                  setHtmlCode(HTML_PRESETS[idx].html);
                  setCssCode(HTML_PRESETS[idx].css);
                }
              }}
              className="text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {HTML_PRESETS.map((p, i) => (
                <option key={i} value={i}>
                  Exemple : {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Textarea Code Area */}
        <div className="relative flex-1 min-h-[360px]">
          {activeEditorTab === 'html' ? (
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              placeholder="Saisissez votre code HTML ici..."
              className="w-full h-full min-h-[360px] p-4 font-mono text-xs leading-relaxed bg-[#1e222b] text-orange-200 resize-none outline-none focus:ring-1 focus:ring-orange-500"
              spellCheck={false}
            />
          ) : (
            <textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              placeholder="Saisissez votre code CSS ici..."
              className="w-full h-full min-h-[360px] p-4 font-mono text-xs leading-relaxed bg-[#1e222b] text-sky-200 resize-none outline-none focus:ring-1 focus:ring-sky-500"
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
              className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              title="Rafraîchir"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
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
            sandbox=""
            className="w-full h-full min-h-[360px] border-none"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. CSS STUDIO (BOX MODEL 3D & SPECIFICITY CALCULATOR)
   ========================================================================= */

function CssStudioSandbox() {
  const [subTab, setSubTab] = useState<'boxmodel' | 'specificity'>('boxmodel');
  const [margin, setMargin] = useState(24);
  const [border, setBorder] = useState(8);
  const [padding, setPadding] = useState(20);
  const [contentWidth, setContentWidth] = useState(180);
  const [contentHeight, setContentHeight] = useState(100);
  const [boxSizing, setBoxSizing] = useState<'content-box' | 'border-box'>('border-box');

  // Specificity calculator state
  const [selectorInput, setSelectorInput] = useState('#main-nav .menu-item a:hover');

  // Calculate actual total rendered width
  const totalWidth = boxSizing === 'border-box'
    ? contentWidth + (margin * 2)
    : contentWidth + (padding * 2) + (border * 2) + (margin * 2);

  const totalHeight = boxSizing === 'border-box'
    ? contentHeight + (margin * 2)
    : contentHeight + (padding * 2) + (border * 2) + (margin * 2);

  // Calculate specificity tuple (Inline, ID, Class, Element)
  const calculateSpecificity = (sel: string) => {
    let ids = (sel.match(/#[a-zA-Z0-9_-]+/g) || []).length;
    let classes = (sel.match(/\.[a-zA-Z0-9_-]+/g) || []).length;
    let pseudoClasses = (sel.match(/:[a-zA-Z0-9_-]+/g) || []).filter(p => !p.startsWith('::')).length;
    let attributes = (sel.match(/\[[^\]]+\]/g) || []).length;
    let pseudoElements = (sel.match(/::[a-zA-Z0-9_-]+/g) || []).length;

    // Elements
    const cleaned = sel
      .replace(/#[a-zA-Z0-9_-]+/g, '')
      .replace(/\.[a-zA-Z0-9_-]+/g, '')
      .replace(/::?[a-zA-Z0-9_-]+/g, '')
      .replace(/\[[^\]]+\]/g, '')
      .replace(/[>+~*]/g, ' ');

    const words = cleaned.trim().split(/\s+/).filter(w => w.length > 0 && /^[a-zA-Z0-9]+$/.test(w));
    const elements = words.length + pseudoElements;
    const totalClasses = classes + pseudoClasses + attributes;

    return { ids, classes: totalClasses, elements };
  };

  const specificity = calculateSpecificity(selectorInput);

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSubTab('boxmodel')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'boxmodel'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          <span className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Simulateur Box Model 3D</span>
          </span>
        </button>

        <button
          onClick={() => setSubTab('specificity')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'specificity'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          <span className="flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculateur de Spécificité CSS</span>
          </span>
        </button>
      </div>

      {subTab === 'boxmodel' ? (
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
                Propriété CSS <code className="text-sky-600 font-bold">box-sizing</code> :
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
                  border-box (Moderne)
                </button>
                <button
                  onClick={() => setBoxSizing('content-box')}
                  className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    boxSizing === 'content-box'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200'
                  }`}
                >
                  content-box (Défaut)
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
              <div className="font-bold text-slate-700 dark:text-slate-300">Dimensions Totales Calculées :</div>
              <div className="text-sky-600 dark:text-sky-400 font-bold">
                Largeur : {totalWidth}px &bull; Hauteur : {totalHeight}px
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {boxSizing === 'border-box'
                  ? '✅ Avec border-box, padding et bordure sont absorbés dans la taille déclarée !'
                  : '⚠️ Avec content-box, le padding et la bordure s\'ajoutent en surplus.'}
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

            <div className="mt-6 flex flex-wrap justify-center items-center gap-4 text-xs font-mono font-semibold">
              <span className="flex items-center gap-1.5 text-amber-600">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> Marge (Margin)
              </span>
              <span className="flex items-center gap-1.5 text-yellow-600">
                <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" /> Bordure (Border)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" /> Padding
              </span>
              <span className="flex items-center gap-1.5 text-sky-600">
                <span className="w-3 h-3 rounded-full bg-sky-500 inline-block" /> Contenu (Content)
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Calculateur de Spécificité de Sélecteur CSS
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Entrez n'importe quel sélecteur CSS pour analyser son poids de spécificité (règle de la cascade).
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Sélecteur CSS :
            </label>
            <input
              type="text"
              value={selectorInput}
              onChange={(e) => setSelectorInput(e.target.value)}
              className="w-full p-3 font-mono text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-sky-500"
              placeholder="ex: #header .menu-item a:hover"
            />
          </div>

          {/* Results score */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-2xl font-black text-purple-700 dark:text-purple-300 font-mono">
                {specificity.ids}
              </span>
              <span className="block text-xs font-bold text-purple-900 dark:text-purple-200 mt-1">
                Identifiants (#id)
              </span>
              <span className="text-[10px] text-purple-600 dark:text-purple-400">Poids : 100</span>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-center">
              <span className="text-2xl font-black text-sky-700 dark:text-sky-300 font-mono">
                {specificity.classes}
              </span>
              <span className="block text-xs font-bold text-sky-900 dark:text-sky-200 mt-1">
                Classes (.class, :hover, [attr])
              </span>
              <span className="text-[10px] text-sky-600 dark:text-sky-400">Poids : 10</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300 font-mono">
                {specificity.elements}
              </span>
              <span className="block text-xs font-bold text-emerald-900 dark:text-emerald-200 mt-1">
                Éléments (div, p, ::before)
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Poids : 1</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   3. XML DEDICATED SANDBOX (VALIDATOR, TREE & CONVERTER)
   ========================================================================= */

const SAMPLE_XML_DOC = `<?xml version="1.0" encoding="UTF-8"?>
<bibliographie>
  <ouvrage id="livre_101" genre="Classique">
    <titre>Les Misérables</titre>
    <auteur prenom="Victor" nom="Hugo">Victor Hugo</auteur>
    <annee>1862</annee>
    <chapitres total="5">
      <chapitre numero="1">Fantine</chapitre>
      <chapitre numero="2">Cosette</chapitre>
    </chapitres>
  </ouvrage>
</bibliographie>`;

const XML_DEMOS = [{name: 'Bibliographie initiale', code: SAMPLE_XML_DOC},
{name: "Bibliothèque et attributs", code: "<?xml version=\"1.0\"?><bibliotheque><livre id=\"l1\" langue=\"fr\"><titre>XML</titre><auteur>Équipe</auteur></livre><livre id=\"l2\" langue=\"en\"><titre>HTML</titre></livre></bibliotheque>"},
{name: "Notes de cours", code: "<?xml version=\"1.0\"?><cours niveau=\"debutant\"><chapitre numero=\"1\"><titre>Balisage</titre><objectif>Comprendre la racine</objectif></chapitre><chapitre numero=\"2\"><titre>XPath</titre></chapitre></cours>"},
{name: "Espaces de noms", code: "<?xml version=\"1.0\"?><c:catalogue xmlns:c=\"urn:catalogue\"><c:livre><c:titre>Initiation XML</c:titre></c:livre></c:catalogue>"},
{name: "Exemple volontairement incorrect", code: "<bibliotheque><livre><titre>Erreur</livre></titre></bibliotheque>"}
];

function XmlDedicatedSandbox() {
  const [xmlContent, setXmlContent] = useState(SAMPLE_XML_DOC);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [convertedJson, setConvertedJson] = useState<string>('');

  // Validate XML
  useEffect(() => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlContent, 'text/xml');
      const errorNode = doc.getElementsByTagName('parsererror');

      if (errorNode.length > 0) {
        setIsValid(false);
        setErrorMessage(errorNode[0].textContent || 'Erreur de syntaxe XML');
        setConvertedJson('');
      } else {
        setIsValid(true);
        setErrorMessage(null);
        // Generate JSON equivalent
        const jsonResult = xmlToJson(doc.documentElement);
        setConvertedJson(JSON.stringify(jsonResult, null, 2));
      }
    } catch (e: unknown) {
      setIsValid(false);
      setErrorMessage(e instanceof Error ? e.message : 'Erreur inconnue');
    }
  }, [xmlContent]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* XML Editor */}
      <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-100 dark:border-amber-900 text-xs font-bold text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-2">
            <span>📦 Éditeur XML (Balisage Extensible)</span>
          </div>
          <select aria-label="Charger un exemple XML" onChange={e => setXmlContent(XML_DEMOS[Number(e.target.value)].code)} className="max-w-[220px] text-xs rounded border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 px-2 py-1">
              {XML_DEMOS.map((item,i) => <option key={i} value={i}>{item.name}</option>)}
            </select>
        </div>

        <textarea
          value={xmlContent}
          onChange={(e) => setXmlContent(e.target.value)}
          className="w-full flex-1 min-h-[400px] p-4 font-mono text-xs leading-relaxed bg-[#1e222b] text-amber-200 resize-none outline-none focus:ring-1 focus:ring-amber-500"
          spellCheck={false}
        />
      </div>

      {/* Validation & Tree View */}
      <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>Vérificateur de Bien-Formation & Conversion</span>
          {isValid ? (
            <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Document Bien Formé</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-rose-600 font-bold text-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Erreur Syntaxe</span>
            </span>
          )}
        </div>

        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {errorMessage ? (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-mono">
              <strong>Erreur détectée par le parseur :</strong>
              <pre className="mt-2 text-[11px] whitespace-pre-wrap">{errorMessage}</pre>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs">
                ✅ <strong>Structure XML valide :</strong> Élément racine unique présent, toutes les balises sont fermées et correctement imbriquées.
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                  Équivalent JSON généré automatiquement :
                </span>
                <pre className="p-4 rounded-xl bg-[#1e222b] text-emerald-300 font-mono text-xs overflow-x-auto max-h-[280px]">
                  {convertedJson}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. JSON DEDICATED SANDBOX (VALIDATOR, FORMATTER & TREE)
   ========================================================================= */

const SAMPLE_JSON_DOC = `{
  "utilisateur": {
    "id": 402,
    "nom": "Hugo",
    "prenom": "Victor",
    "estAuteur": true,
    "oeuvresPrincipales": [
      "Les Misérables",
      "Notre-Dame de Paris"
    ],
    "contact": {
      "ville": "Paris",
      "pays": "France"
    }
  }
}`;

const JSON_DEMOS = [{name: 'Exemple initial', code: SAMPLE_JSON_DOC},
{name: "Catalogue d'ouvrages", code: "{\"livres\":[{\"id\":1,\"titre\":\"XML\",\"disponible\":true},{\"id\":2,\"titre\":\"HTML\",\"disponible\":false}],\"total\":2}"},
{name: "Résultat API", code: "{\"status\":\"success\",\"meta\":{\"page\":1,\"total\":2},\"data\":[{\"nom\":\"A\"},{\"nom\":\"B\"}]}"},
{name: "Valeurs typées", code: "{\"nom\":\"Atelier\",\"duree\":3,\"actif\":true,\"image\":null,\"tags\":[\"HTML\",\"XML\"]}"},
{name: "Erreur volontaire : virgule finale", code: "{\"titre\":\"JSON\",\"niveau\":1,}"}
];

function JsonDedicatedSandbox() {
  const [jsonText, setJsonText] = useState(SAMPLE_JSON_DOC);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [parsedObj, setParsedObj] = useState<unknown>(null);

  useEffect(() => {
    try {
      const obj = JSON.parse(jsonText);
      setParsedObj(obj);
      setIsValid(true);
      setErrorMessage(null);
    } catch (err: unknown) {
      setIsValid(false);
      setParsedObj(null);
      setErrorMessage(err instanceof Error ? err.message : 'SyntaxError');
    }
  }, [jsonText]);

  const handlePrettify = () => {
    try {
      const obj = JSON.parse(jsonText);
      setJsonText(JSON.stringify(obj, null, 2));
    } catch {}
  };

  const handleMinify = () => {
    try {
      const obj = JSON.parse(jsonText);
      setJsonText(JSON.stringify(obj));
    } catch {}
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Editor */}
      <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900 text-xs">
          <span className="font-bold text-emerald-800 dark:text-emerald-300">
            🧩 Éditeur JSON (RFC 8259)
          </span>
          <select aria-label="Charger un exemple JSON" onChange={e => setJsonText(JSON_DEMOS[Number(e.target.value)].code)} className="text-xs max-w-[180px] rounded border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900 px-2 py-1">
            {JSON_DEMOS.map((item,i)=><option key={i} value={i}>{item.name}</option>)}
          </select>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrettify}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-100 cursor-pointer"
            >
              Formater
            </button>
            <button
              onClick={handleMinify}
              className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-100 cursor-pointer"
            >
              Minifier
            </button>
          </div>
        </div>

        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="w-full flex-1 min-h-[400px] p-4 font-mono text-xs leading-relaxed bg-[#1e222b] text-emerald-200 resize-none outline-none focus:ring-1 focus:ring-emerald-500"
          spellCheck={false}
        />
      </div>

      {/* Live Tree / Status */}
      <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>Arborescence des Objets & Types</span>
          {isValid ? (
            <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>JSON Valide</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-rose-600 font-bold text-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Erreur JSON</span>
            </span>
          )}
        </div>

        <div className="flex-1 p-5 overflow-y-auto">
          {errorMessage ? (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-mono">
              <strong>Erreur de syntaxe JSON :</strong>
              <div className="mt-2 text-[11px]">{errorMessage}</div>
              <p className="mt-2 text-[10px] text-rose-600">
                Vérifiez les guillemets doubles obligatoires sur les clés et l'absence de virgules finales traînantes !
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 font-mono">
                Visualisation interactive des types de données :
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs">
                <JsonTreeViewer data={parsedObj} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple recursive JSON tree viewer
function JsonTreeViewer({ data, name }: { data: unknown; name?: string }) {
  if (data === null) {
    return <div>{name && <span className="text-sky-400">{name}: </span>}<span className="text-slate-400">null</span></div>;
  }
  if (typeof data === 'boolean') {
    return <div>{name && <span className="text-sky-400">{name}: </span>}<span className="text-purple-400 font-bold">{String(data)}</span></div>;
  }
  if (typeof data === 'number') {
    return <div>{name && <span className="text-sky-400">{name}: </span>}<span className="text-amber-400 font-bold">{data}</span></div>;
  }
  if (typeof data === 'string') {
    return <div>{name && <span className="text-sky-400">{name}: </span>}<span className="text-emerald-400">&quot;{data}&quot;</span></div>;
  }
  if (Array.isArray(data)) {
    return (
      <div className="pl-3 border-l border-slate-300 dark:border-slate-700 my-1">
        <div className="text-blue-400 font-semibold">{name ? `${name}: ` : ''}[Array {data.length}]</div>
        {data.map((item, idx) => (
          <JsonTreeViewer key={idx} data={item} name={`[${idx}]`} />
        ))}
      </div>
    );
  }
  if (typeof data === 'object') {
    return (
      <div className="pl-3 border-l border-slate-300 dark:border-slate-700 my-1">
        <div className="text-slate-500 font-semibold">{name ? `${name}: ` : ''}&#123;Object&#125;</div>
        {Object.entries(data as Record<string, unknown>).map(([key, val]) => (
          <JsonTreeViewer key={key} data={val} name={key} />
        ))}
      </div>
    );
  }
  return <div>{String(data)}</div>;
}

/* =========================================================================
   5. MARKDOWN & MATHS LIVE PREVIEWER
   ========================================================================= */

const INITIAL_MD = `# Fiche de Révision : Markdown & LaTeX

Markdown permet de structurer vos notes **sans lever les mains du clavier**.

## Pourquoi les étudiants l'adorent ?
- Écriture ultra-rapide et naturelle
- Lisible en texte brut dans n'importe quel éditeur
- Converti en un clic vers HTML ou PDF via **Pandoc**

> « La simplicité est la sophistication suprême. » — Léonard de Vinci

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

const MD_DEMOS = [{name: 'Fiche initiale', code: INITIAL_MD},
{name: "Cours synthétique", code: "# Introduction au XML\n\n## Notions\n- Racine\n- Élément\n- Attribut\n\n> Un arbre organise les données."},
{name: "Checklist d'étude", code: "# Révisions\n\n- [x] HTML sémantique\n- [x] XML bien formé\n- [ ] XPath\n- [ ] XSLT"},
{name: "Tableau comparatif", code: "# Comparatif\n\n| Format | Usage |\n| --- | --- |\n| XML | Documents |\n| JSON | APIs |\n| YAML | Configuration |"},
{name: "Mathématiques TeX", code: "# Formules\n\nL'identité : $a^2+b^2=c^2$.\n\n$\\frac{1}{2}+\\frac{1}{4}=\\frac{3}{4}$"}
];

function MarkdownSandbox() {
  const [content, setContent] = useState(INITIAL_MD);
  const previewRef = useRef<HTMLDivElement>(null);

  const renderMarkdown = (text: string) => {
    // Escaper le texte utilisateur avant les substitutions HTML (prévenir l'injection).
    let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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

    // Tables
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

          <div className="flex flex-wrap gap-2 items-center">
            <select aria-label="Charger un exemple Markdown" onChange={e=>setContent(MD_DEMOS[Number(e.target.value)].code)} className="text-xs border rounded bg-white dark:bg-slate-900 px-2 py-1">
              {MD_DEMOS.map((item,i)=><option key={i} value={i}>{item.name}</option>)}
            </select>
            <span className="text-[11px] text-slate-500 font-mono">{wordCount} mots &bull; {readTime} min</span>
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
   6. LATEX EQUATION LAB (KATEX LIVE EXPERIMENTATION)
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
,
{name: "Dérivée d'une puissance", code: "\\frac{d}{dx}x^n = nx^{n-1}"},
{name: "Racines quadratiques", code: "x_{1,2}=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}"},
{name: "Déterminant 2x2", code: "\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc"},
{name: "Probabilités", code: "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}"}
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
