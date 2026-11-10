import React, { useState } from 'react';

const EXAMPLES = [
  { title: 'Tous les titres', query: '//livre/titre', explanation: 'Sélectionne chaque élément titre enfant de livre.' },
  { title: 'Livres à moins de 30 DH', query: '//livre[prix < 30]/titre', explanation: 'Filtre les éléments livre avec un prédicat numérique.' },
  { title: 'Nombre de livres', query: 'count(//livre)', explanation: 'Retourne une valeur numérique plutôt que des nœuds.' },
  { title: 'Auteurs (texte)', query: '//livre/auteur/text()', explanation: 'Sélectionne les nœuds texte des auteurs.' },
  { title: 'Dernier livre', query: '(//livre)[last()]/titre', explanation: 'Utilise la fonction positionnelle last().' },
  { title: 'Prix moyen', query: 'sum(//livre/prix) div count(//livre)', explanation: 'Calcule une moyenne avec les fonctions XPath 1.0.' }
];

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<bibliotheque>
  <livre id="l1"><titre>Introduction à XML</titre><auteur>Amine</auteur><prix>28</prix></livre>
  <livre id="l2"><titre>XPath en pratique</titre><auteur>Salma</auteur><prix>42</prix></livre>
  <livre id="l3"><titre>Web sémantique</titre><auteur>Leïla</auteur><prix>19</prix></livre>
</bibliotheque>`;

const SAMPLE_NAMESPACED_XML = `<?xml version="1.0"?>
<cat:catalogue xmlns:cat="urn:exemple:catalogue">
  <cat:livre id="a"><cat:titre>XML avancé</cat:titre></cat:livre>
  <cat:livre id="b"><cat:titre>XPath et namespaces</cat:titre></cat:livre>
</cat:catalogue>`;

type Evaluation = { kind: 'nodes' | 'value'; results: string[]; count: number };
function describeNode(node: Node): string {
  if (node.nodeType === Node.ATTRIBUTE_NODE) {
    const attr = node as Attr;
    return '@' + attr.name + ' = "' + attr.value + '"';
  }
  if (node.nodeType === Node.TEXT_NODE) return 'text() = "' + (node.nodeValue || '').trim() + '"';
  if (node.nodeType === Node.COMMENT_NODE) return '<!-- ' + (node.nodeValue || '').trim() + ' -->';
  if (node.nodeType === Node.ELEMENT_NODE) return new XMLSerializer().serializeToString(node);
  return node.nodeName + ': ' + (node.textContent || '').trim();
}
function runXPath(xml: string, expression: string, namespaces: string): Evaluation {
  const documentXml = new DOMParser().parseFromString(xml, 'application/xml');
  const parserError = documentXml.getElementsByTagName('parsererror')[0];
  if (parserError) throw new Error('XML mal formé : ' + (parserError.textContent || 'Erreur inconnue').trim().slice(0, 350));
  const mappings: Record<string, string> = {};
  for (const line of namespaces.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const separator = line.indexOf('=');
    if (separator < 1 || !line.slice(separator + 1).trim()) throw new Error('Namespace invalide. Utilisez : prefixe=URI, une ligne par préfixe.');
    mappings[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  const resolver = (prefix: string | null): string | null => prefix ? mappings[prefix] || documentXml.documentElement.lookupNamespaceURI(prefix) : null;
  const evaluation = documentXml.evaluate(expression, documentXml, resolver, XPathResult.ANY_TYPE, null);
  if (evaluation.resultType === XPathResult.STRING_TYPE) return { kind: 'value', results: [evaluation.stringValue], count: 1 };
  if (evaluation.resultType === XPathResult.NUMBER_TYPE) return { kind: 'value', results: [String(evaluation.numberValue)], count: 1 };
  if (evaluation.resultType === XPathResult.BOOLEAN_TYPE) return { kind: 'value', results: [String(evaluation.booleanValue)], count: 1 };
  const nodes: string[] = [];
  let node: Node | null;
  while ((node = evaluation.iterateNext())) nodes.push(describeNode(node));
  return { kind: 'nodes', results: nodes, count: nodes.length };
}

export const XPathExplorerLab: React.FC = () => {
  const [xml, setXml] = useState(SAMPLE_XML);
  const [query, setQuery] = useState(EXAMPLES[0].query);
  const [namespaces, setNamespaces] = useState('');
  const [selected, setSelected] = useState(0);
  const [result, setResult] = useState<Evaluation | null>(null);
  const [error, setError] = useState('');
  const evaluate = () => {
    setError('');
    setResult(null);
    try { setResult(runXPath(xml, query, namespaces)); }
    catch (err) { setError(err instanceof Error ? err.message : String(err)); }
  };
  const changeExample = (index: number) => {
    setSelected(index);
    setQuery(EXAMPLES[index].query);
    setResult(null);
    setError('');
  };
  const reset = () => { setXml(SAMPLE_XML); setNamespaces(''); changeExample(0); };
  const namespacedExample = () => {
    setXml(SAMPLE_NAMESPACED_XML);
    setNamespaces('cat=urn:exemple:catalogue');
    setQuery('//cat:livre/cat:titre');
    setResult(null);
    setError('');
  };
  return (
    <section className="rounded-2xl border border-cyan-200 dark:border-cyan-900 bg-white dark:bg-slate-900 p-4 sm:p-6 space-y-5" aria-labelledby="xpath-explorer-title">
      <div className="space-y-2">
        <div className="inline-flex rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-200 px-3 py-1 text-xs font-bold">XPath 1.0 · moteur natif du navigateur</div>
        <h2 id="xpath-explorer-title" className="text-xl font-black text-slate-900 dark:text-white">Explorateur XPath interactif</h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">Écrivez un XML et une expression XPath, exécutez la requête, puis inspectez les nœuds ou la valeur renvoyée. Aucun envoi de vos données à un serveur.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={namespacedExample} className="rounded-lg border border-cyan-300 dark:border-cyan-800 px-3 py-2 text-xs font-bold hover:bg-cyan-50 dark:hover:bg-cyan-950">Exemple avec namespaces</button>
        <button type="button" onClick={reset} className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800">Réinitialiser l’atelier</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">Document XML
          <textarea value={xml} onChange={e => { setXml(e.target.value); setResult(null); }} spellCheck={false} className="mt-2 w-full min-h-64 p-3 font-mono text-xs leading-relaxed rounded-xl border border-slate-700 bg-[#171c26] text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400" aria-label="Document XML source" />
        </label>
        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">Expression XPath
            <input value={query} onChange={e => { setQuery(e.target.value); setResult(null); }} spellCheck={false} className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 font-mono text-sm text-slate-900 dark:text-white" aria-label="Expression XPath à exécuter" />
          </label>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">Exemples de requêtes
            <select value={selected} onChange={e => changeExample(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-sm" aria-label="Choisir un exemple XPath">
              {EXAMPLES.map((example, index) => <option key={example.title} value={index}>{example.title}</option>)}
            </select>
          </label>
          <p className="text-sm text-slate-600 dark:text-slate-300">{EXAMPLES[selected].explanation}</p>
          <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">Espaces de noms (facultatif)
            <textarea value={namespaces} onChange={e => { setNamespaces(e.target.value); setResult(null); }} placeholder="cat=urn:exemple:catalogue" spellCheck={false} rows={2} className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 font-mono text-xs" aria-label="Correspondances préfixe et URI d'espace de noms" />
          </label>
          <button type="button" onClick={evaluate} className="w-full rounded-xl bg-cyan-700 px-4 py-3 text-sm font-black text-white hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Exécuter XPath</button>
        </div>
      </div>
      {error && <div role="alert" className="rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 p-4 text-sm text-rose-800 dark:text-rose-200"><strong>Erreur :</strong> {error}</div>}
      {result && <div role="status" aria-live="polite" className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/20 p-4 space-y-3">
        <h3 className="font-black text-slate-900 dark:text-white">Résultat · {result.kind === 'nodes' ? result.count + ' nœud(s)' : 'valeur scalaire'}</h3>
        {result.results.length === 0 ? <p className="text-sm text-slate-600 dark:text-slate-300">Aucun nœud ne correspond à cette expression.</p> : <ol className="space-y-2">{result.results.map((item, index) => <li key={index} className="flex gap-2 items-start"><span className="text-xs font-semibold text-slate-500 mt-1">{index + 1}.</span><pre className="flex-1 whitespace-pre-wrap break-all rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-100 max-h-44 overflow-auto">{item || '(chaîne vide)'}</pre></li>)}</ol>}
      </div>}
      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">À savoir : cet outil utilise document.evaluate() et prend en charge XPath 1.0, pas XPath 2.0/3.1, XQuery ni la validation DTD/XSD. Une expression XPath valide peut retourner zéro résultat. Pour cibler un document XML avec namespace par défaut, utilisez un préfixe défini ci-dessus.</p>
    </section>
  );
};
