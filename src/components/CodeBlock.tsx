import React, { useState } from 'react';
import { Check, Copy, Play } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  onRunInSandbox?: () => void;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'text',
  title,
  onRunInSandbox,
  showLineNumbers = true
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-[#1e222b] shadow-md my-4">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#171a21] border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-mono">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          {title ? (
            <span className="text-slate-300 font-semibold">{title}</span>
          ) : (
            <span className="uppercase text-[11px] font-bold tracking-wider text-slate-400">{language}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onRunInSandbox && (
            <button
              onClick={onRunInSandbox}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-sky-600/30 text-sky-300 hover:bg-sky-600/50 hover:text-white transition-colors cursor-pointer border border-sky-500/30"
              title="Tester cet extrait dans le bac à sable interactif"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Tester en direct</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            title="Copier le code dans le presse-papiers"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono text-slate-200">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40">
                {showLineNumbers && (
                  <td className="pr-4 select-none text-right text-slate-600 font-mono text-[11px] w-8 align-top">
                    {idx + 1}
                  </td>
                )}
                <td className="whitespace-pre align-top font-mono">
                  {highlightSyntax(line, language)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Lightweight, crisp syntax token styling without heavy external libraries
function highlightSyntax(line: string, language: string): React.ReactNode {
  // Simple token styling for readability
  if (language === 'html' || language === 'xml') {
    return <span dangerouslySetInnerHTML={{ __html: sanitizeAndHighlightMarkup(line) }} />;
  }
  if (language === 'json') {
    return <span dangerouslySetInnerHTML={{ __html: highlightJson(line) }} />;
  }
  if (language === 'latex') {
    return <span dangerouslySetInnerHTML={{ __html: highlightLatex(line) }} />;
  }
  if (language === 'css') {
    return <span dangerouslySetInnerHTML={{ __html: highlightCss(line) }} />;
  }
  return <span>{line}</span>;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sanitizeAndHighlightMarkup(line: string): string {
  let escaped = escapeHtml(line);
  // Comments
  escaped = escaped.replace(/(&lt;!--.*?--&gt;)/g, '<span class="text-slate-500 italic">$1</span>');
  // Tags
  escaped = escaped.replace(/(&lt;\/?[a-zA-Z0-9:-]+)/g, '<span class="text-rose-400 font-semibold">$1</span>');
  escaped = escaped.replace(/(&gt;)/g, '<span class="text-rose-400 font-semibold">$1</span>');
  // Attributes
  escaped = escaped.replace(/([a-zA-Z0-9:-]+)=(&quot;.*?&quot;)/g, '<span class="text-amber-300">$1</span>=<span class="text-emerald-300">$2</span>');
  return escaped;
}

function highlightJson(line: string): string {
  let escaped = escapeHtml(line);
  // Keys
  escaped = escaped.replace(/(&quot;.*?&quot;)(?=\s*:)/g, '<span class="text-sky-300 font-medium">$1</span>');
  // String values
  escaped = escaped.replace(/:\s*(&quot;.*?&quot;)/g, ': <span class="text-emerald-300">$1</span>');
  // Numbers & Booleans
  escaped = escaped.replace(/:\s*(-?\d+\.?\d*|true|false|null)/g, ': <span class="text-amber-400 font-semibold">$1</span>');
  return escaped;
}

function highlightLatex(line: string): string {
  let escaped = escapeHtml(line);
  // Commands
  escaped = escaped.replace(/(\\[a-zA-Z]+)/g, '<span class="text-pink-400 font-semibold">$1</span>');
  // Math mode
  escaped = escaped.replace(/(\$.*?\$)/g, '<span class="text-amber-300 font-medium">$1</span>');
  // Comments
  escaped = escaped.replace(/(%.*)$/g, '<span class="text-slate-500 italic">$1</span>');
  return escaped;
}

function highlightCss(line: string): string {
  let escaped = escapeHtml(line);
  // Comments
  escaped = escaped.replace(/(\/\*.*?\*\/)/g, '<span class="text-slate-500 italic">$1</span>');
  // Selectors
  escaped = escaped.replace(/(^[^{]+)(?=\{)/g, '<span class="text-sky-300 font-semibold">$1</span>');
  // Properties and values
  escaped = escaped.replace(/([a-zA-Z-]+)\s*:\s*([^;]+);/g, '<span class="text-amber-200">$1</span>: <span class="text-emerald-300">$2</span>;');
  return escaped;
}
