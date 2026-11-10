import React, { useState } from 'react';
const XML_LIBRARY = '<?xml version="1.0"?><bibliotheque><livre><titre>Introduction à XML</titre><auteur>Amine</auteur><prix>28</prix></livre><livre><titre>XPath en pratique</titre><auteur>Salma</auteur><prix>42</prix></livre><livre><titre>Web sémantique</titre><auteur>Leïla</auteur><prix>19</prix></livre></bibliotheque>';
const XML_CLASS = '<?xml version="1.0"?><classe><eleve><nom>Amine</nom><note>15</note></eleve><eleve><nom>Salma</nom><note>18</note></eleve><eleve><nom>Leïla</nom><note>12</note></eleve></classe>';
const STYLE_BOOKS = '<?xml version="1.0"?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:output method="html" encoding="UTF-8"/><xsl:template match="/"><html><body><h1>Catalogue des livres</h1><ul><xsl:for-each select="bibliotheque/livre"><xsl:sort select="titre"/><li><strong><xsl:value-of select="titre"/></strong> — <xsl:value-of select="auteur"/> (<xsl:value-of select="prix"/> DH)</li></xsl:for-each></ul></body></html></xsl:template></xsl:stylesheet>';
const STYLE_CLASS = '<?xml version="1.0"?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:output method="html"/><xsl:template match="/"><html><body><h1>Résultats de la classe</h1><table border="1"><tr><th>Élève</th><th>Note</th></tr><xsl:for-each select="classe/eleve"><xsl:sort select="note" data-type="number" order="descending"/><tr><td><xsl:value-of select="nom"/></td><td><xsl:value-of select="note"/></td></tr></xsl:for-each></table></body></html></xsl:template></xsl:stylesheet>';
const STYLE_FILTER = '<?xml version="1.0"?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:output method="html"/><xsl:template match="/"><html><body><h1>Livres à moins de 30 DH</h1><ol><xsl:for-each select="bibliotheque/livre[prix &lt; 30]"><li><xsl:value-of select="titre"/></li></xsl:for-each></ol></body></html></xsl:template></xsl:stylesheet>';
const STYLE_TEMPLATES = `<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8"/>
  <xsl:template match="/">
    <html><body><h1>Catalogue structuré</h1><section>
      <xsl:apply-templates select="bibliotheque/livre"/>
    </section></body></html>
  </xsl:template>
  <xsl:template match="livre">
    <article>
      <h2><xsl:value-of select="titre"/></h2>
      <p>Auteur : <xsl:value-of select="auteur"/></p>
    </article>
  </xsl:template>
</xsl:stylesheet>`;
const PRESETS = [
  {name:'Bibliothèque : tri alphabétique',xml:XML_LIBRARY,xsl:STYLE_BOOKS,description:'La boucle parcourt les livres; xsl:sort les classe par titre.'},
  {name:'Classe : tableau de notes',xml:XML_CLASS,xsl:STYLE_CLASS,description:'Une transformation génère un tableau HTML trié par note.'},
  {name:'Bibliothèque : filtrer par prix',xml:XML_LIBRARY,xsl:STYLE_FILTER,description:'Le prédicat XPath sélectionne les livres dont le prix est inférieur à 30.'},
  {name:'Règles de modèles : apply-templates',xml:XML_LIBRARY,xsl:STYLE_TEMPLATES,description:'Deux modèles XSLT séparent le document racine du traitement de chaque livre via xsl:apply-templates.'}
];
function parseXml(text:string):Document {
  const doc = new DOMParser().parseFromString(text,'application/xml');
  const error=doc.querySelector('parsererror');
  if(error) throw new Error((error.textContent||'XML mal formé').slice(0,320));
  return doc;
}
export const XmlTransformationLab:React.FC=()=>{
  const [selected,setSelected]=useState(0);
  const [xml,setXml]=useState(PRESETS[0].xml);
  const [xsl,setXsl]=useState(PRESETS[0].xsl);
  const [result,setResult]=useState('');
  const [message,setMessage]=useState('');
  const [isError,setIsError]=useState(false);
  const [copied,setCopied]=useState(false);
  const [executionCount,setExecutionCount]=useState(0);
  const load=(i:number)=>{setSelected(i);setXml(PRESETS[i].xml);setXsl(PRESETS[i].xsl);setResult('');setMessage('');setIsError(false);setCopied(false);};
  const run=()=>{
    setResult('');
    setIsError(false);
    setCopied(false);
    try {
      const source=parseXml(xml);
      const stylesheet=parseXml(xsl);
      if(stylesheet.documentElement.namespaceURI !== 'http://www.w3.org/1999/XSL/Transform' || !['stylesheet','transform'].includes(stylesheet.documentElement.localName)) {
        throw new Error('La racine doit être xsl:stylesheet ou xsl:transform dans l’espace de noms officiel XSLT.');
      }
      if(typeof XSLTProcessor==='undefined') {
        setMessage('Le moteur XSLT natif n’est pas disponible dans ce navigateur. Le code reste consultable et modifiable; utilisez un processeur XSLT 1.0 externe pour exécuter.');
        return;
      }
      const processor=new XSLTProcessor();
      processor.importStylesheet(stylesheet);
      const output=processor.transformToDocument(source);
      if(!output || output.getElementsByTagName('parsererror').length) throw new Error('La transformation a produit une erreur : vérifiez les règles XSLT et les expressions XPath.');
      const serialized=new XMLSerializer().serializeToString(output);
      setResult(serialized);
      setExecutionCount(n => n + 1);
      setMessage('Transformation XSLT exécutée dans le navigateur.');
    } catch(error) {
      setIsError(true);
      setMessage('Erreur : '+(error instanceof Error ? error.message : String(error)));
    }
  };
  const download = () => {
    if(!result) return;
    const blob = new Blob([result], {type: 'text/html;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'transformation-xslt.html';
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const copy = async () => {
    if(!result) return;
    try { await navigator.clipboard.writeText(result); setCopied(true); }
    catch { setMessage('La copie n’est pas autorisée par le navigateur. Sélectionnez le code produit pour le copier.'); }
  };
  return <section className="rounded-2xl border border-indigo-200 dark:border-indigo-900 bg-white dark:bg-slate-900 p-5 space-y-4">
    <div>
      <h2 className="text-lg font-black text-slate-900 dark:text-white">Laboratoire de transformation XML → XPath → XSLT → HTML</h2>
      <p className="text-sm text-slate-600 dark:text-slate-300">Un atelier complet : modifiez le XML et la feuille XSLT, puis observez le document produit. Les transformations s’exécutent localement dans votre navigateur (XSLT 1.0).</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-center font-bold" aria-label="Étapes de transformation">
      {['1. XML source','2. XPath / XSLT','3. Transformation','4. Résultat HTML'].map((label,i)=><div key={i} className={'rounded-xl p-3 '+(i%2?'bg-sky-700 text-white':'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-100')}>{label}</div>)}
    </div>
    <label className="block text-sm font-bold">Choisir un scénario
      <select aria-label="Scénario de transformation" value={selected} onChange={e=>load(Number(e.target.value))} className="block mt-2 w-full sm:w-80 border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800">
        {PRESETS.map((p,i)=><option key={i} value={i}>{p.name}</option>)}
      </select>
    </label>
    <p className="text-sm text-slate-600 dark:text-slate-300">{PRESETS[selected].description}</p>
    <p className="text-xs text-slate-500 dark:text-slate-400">Repérez les instructions <code>xsl:template</code>, <code>xsl:value-of</code>, <code>xsl:for-each</code>, <code>xsl:sort</code> et <code>xsl:apply-templates</code> dans les exemples. Modifiez les règles puis relancez la transformation pour comparer les résultats.</p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <label className="text-sm font-bold">Document XML
        <textarea spellCheck={false} aria-label="Source XML de transformation" value={xml} onChange={e=>{setXml(e.target.value);setResult('');setMessage('');}} className="mt-2 w-full h-48 p-3 font-mono text-xs bg-[#171c26] text-slate-100 rounded-xl border border-slate-700"/>
      </label>
      <label className="text-sm font-bold">Feuille XSLT 1.0
        <textarea spellCheck={false} aria-label="Feuille XSLT de transformation" value={xsl} onChange={e=>{setXsl(e.target.value);setResult('');setMessage('');}} className="mt-2 w-full h-48 p-3 font-mono text-xs bg-[#171c26] text-slate-100 rounded-xl border border-slate-700"/>
      </label>
    </div>
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={run} className="rounded-lg bg-indigo-700 text-white font-bold text-sm px-4 py-2 hover:bg-indigo-800">Exécuter la transformation</button>
      <button type="button" onClick={()=>load(selected)} className="rounded-lg border border-slate-300 dark:border-slate-700 text-sm px-4 py-2">Restaurer le scénario</button>
      {result && <>
        <button type="button" onClick={copy} className="rounded-lg border border-sky-300 dark:border-sky-800 text-sm px-4 py-2 hover:bg-sky-50 dark:hover:bg-sky-950">{copied ? 'Code copié' : 'Copier le résultat'}</button>
        <button type="button" onClick={download} className="rounded-lg border border-emerald-300 dark:border-emerald-800 text-sm px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-950">Télécharger le HTML</button>
      </>}
    </div>
    {message&&<p role={isError ? 'alert' : 'status'} className={'rounded-lg text-sm p-3 '+(isError ? 'border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200' : 'bg-slate-100 dark:bg-slate-800')}>{message}</p>}
    {result&&<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div><h3 className="text-sm font-bold mb-2">Code produit · exécution n° {executionCount}</h3><pre className="p-4 rounded-lg bg-[#171c26] text-slate-100 whitespace-pre-wrap break-all text-xs max-h-64 overflow-auto">{result}</pre></div>
      <div><h3 className="text-sm font-bold mb-2">Aperçu isolé</h3><iframe title="Résultat de transformation XSLT" sandbox="" srcDoc={result} className="w-full h-64 border border-slate-200 rounded-lg bg-white"/></div>
    </div>}
    <p className="text-xs text-slate-500 dark:text-slate-400">Le rendu HTML s’affiche dans une iframe isolée sans scripts autorisés. Le moteur XSLT intégré dépend du navigateur ; XSLT 2.0, XSLT 3.0 et XQuery nécessitent d’autres moteurs.</p>
  </section>;
};
