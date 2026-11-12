import katex from 'katex';

export type Stages = { middle:string; label:string; web?:string; math?:string; note:string; error?:string };
const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
const htmlPage=(body:string)=>'<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{font:16px system-ui;color:#0f172a;padding:1rem;line-height:1.55}section{padding:10px;border:1px solid #bae6fd;border-radius:8px;margin:6px 0;background:#f0f9ff}h3{color:#075985;font-size:1rem}p{white-space:pre-wrap} .attr{color:#64748b;font:12px monospace}</style><body>'+body+'</body></html>';
const parseXml=(s:string):Document=>{
  const d=new DOMParser().parseFromString(s,'application/xml');
  const e=d.getElementsByTagName('parsererror')[0];
  if(e)throw Error((e.textContent||'XML mal formé').slice(0,240));
  return d;
};
function describeXml(node:Element,depth=0):string[] {
  const p='  '.repeat(Math.min(depth,12));
  const attrs=Array.from(node.attributes).map(a=>a.name+'="'+a.value+'"').join(' ');
  const line=p+'<'+node.tagName+(attrs?' '+attrs:'')+'>';
  const children=Array.from(node.children).slice(0,35);
  if(depth>10)return [line,p+'…'];
  if(!children.length)return [line,p+'  '+(node.textContent||'').trim()];
  return [line,...children.flatMap(c=>describeXml(c,depth+1))];
}
function visualizeXml(node:Element,depth=0):string {
  if(depth>10)return '<p>…</p>';
  const attrs=Array.from(node.attributes).map(a=>a.name+'="'+a.value+'"').join(' ');
  const text=Array.from(node.childNodes).filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>n.textContent||'').join('').trim();
  return '<section><h3>&lt;'+esc(node.nodeName)+'&gt;</h3>'+(attrs?'<p class="attr">'+esc(attrs)+'</p>':'')+
    (text?'<p>'+esc(text)+'</p>':'')+Array.from(node.children).slice(0,35).map(c=>visualizeXml(c,depth+1)).join('')+'</section>';
}
function jsonVisual(v:unknown,depth=0):string {
  if(depth>8)return '…';
  if(Array.isArray(v))return v.slice(0,35).map((x,i)=>'<section><strong>['+i+']</strong> '+jsonVisual(x,depth+1)+'</section>').join('');
  if(v&&typeof v==='object')return Object.entries(v).slice(0,35).map(([k,x])=>'<section><strong>'+esc(k)+'</strong> : '+jsonVisual(x,depth+1)+'</section>').join('');
  return esc(JSON.stringify(v)??'null');
}
function entities(code:string):Stages {
  const t=code.trim();
  if(!t.startsWith('<')){
    const d=new DOMParser().parseFromString('<!doctype html><body>'+t,'text/html');
    const decoded=d.body.textContent||'';
    return {middle:decoded,label:'Caractères décodés en HTML',web:htmlPage('<p>'+esc(decoded)+'</p>'),
      note:'&eacute; et &egrave; sont des références nommées HTML, non des entités prédéfinies XML.'};
  }
  if(/^<!(?:ENTITY|ELEMENT|ATTLIST)\b/i.test(t))return {middle:t,label:'Déclaration de DTD',note:'Une déclaration isolée n’est pas une page : elle doit être placée dans une DTD et utilisée par un document XML.'};
  const d=parseXml(t);
  const attrs=Array.from(d.documentElement.attributes).map(a=>a.name+' = '+a.value).join('\n');
  return {middle:(d.documentElement.textContent||'')+(attrs?'\nAttributs :\n'+attrs:''),
    label:'Texte et attributs après résolution XML',web:htmlPage(visualizeXml(d.documentElement)),
    note:'Les entités XML déclarées, les cinq entités prédéfinies et les références numériques sont analysées. La page est une représentation pédagogique HTML du XML.'};
}
function simpleMarkdown(source:string):string {
  return source.split('\n').slice(0,120).map(raw=>{
    const line=esc(raw.trim());if(!line)return '<p></p>';
    const h=line.match(/^(#{1,6})\s+(.*)$/);
    if(h)return '<h'+h[1].length+'>'+h[2]+'</h'+h[1].length+'>';
    if(/^[-*] /.test(line))return '<div>• '+line.slice(2)+'</div>';
    return '<p>'+line+'</p>';
  }).join('');
}
export function produceStages(lang:string,code:string):Stages {
  try{
    if(lang==='entities')return entities(code);
    if(lang==='html'){
      const d=new DOMParser().parseFromString(code,'text/html');
      return {middle:new XMLSerializer().serializeToString(d.body),label:'DOM HTML interprété',web:code,
        note:'Le navigateur analyse le HTML puis affiche la page dans un cadre isolé, sans scripts.'};
    }
    if(lang==='css'){
      const page='<!doctype html><html lang="fr"><meta charset="utf-8"><style>'+code.replace(/<\/style/gi,'<\\/style')+'</style><body><h2>Atelier CSS</h2><p class="important">Paragraphe de démonstration</p><article class="carte card"><h3>Carte</h3><p>Une carte avec du texte</p><button>Bouton</button></article><div class="gallery grille"><span>Bloc A</span><span>Bloc B</span></div></body></html>';
      return {middle:page,label:'Page HTML utilisant la feuille CSS',web:page,note:'Le CSS agit sur une page de démonstration. Les styles ne s’appliquent que si les sélecteurs correspondent.'};
    }
    if(lang==='xml'||lang==='xhtml'){
      const d=parseXml(code);
      return {middle:describeXml(d.documentElement).join('\n'),label:'Arborescence des nœuds et attributs',
        web:lang==='xhtml'?code:htmlPage(visualizeXml(d.documentElement)),
        note:lang==='xhtml'?'XHTML rendu dans une page isolée, après analyse XML.':'Le XML n’a pas de rendu HTML natif : la page montre une visualisation pédagogique du contenu analysé.'};
    }
    if(lang==='json'){
      const parsed:unknown=JSON.parse(code);
      return {middle:JSON.stringify(parsed,null,2),label:'Données JSON analysées',
        web:htmlPage('<h2>Données JSON</h2>'+jsonVisual(parsed)),note:'JSON n’est pas un langage de mise en page ; le navigateur affiche une présentation pédagogique des données.'};
    }
    if(lang==='yaml')return {middle:code,label:'Indentation YAML',note:'La structure dépend des blancs. Aucun rendu final natif n’existe et aucune validation complète YAML n’est effectuée ici.'};
    if(lang==='markdown'){
      const h=simpleMarkdown(code);
      return {middle:h,label:'HTML pédagogique généré',web:htmlPage(h),note:'Transformation Markdown simplifiée. Les extensions comme les tableaux et les cases à cocher exigent un moteur plus complet.'};
    }
    if(lang==='latex'){
      const rendered=katex.renderToString(code,{displayMode:true,throwOnError:true,trust:false});
      return {middle:'Expression analysée par KaTeX.',label:'Composition mathématique',math:rendered,note:'KaTeX réalise le rendu mathématique ; il ne compile pas un document LaTeX entier.'};
    }
    if(lang==='xpath'){
      const d=parseXml('<bibliotheque><livre id="l1" langue="fr"><titre>XML pour tous</titre><annee>2025</annee></livre><livre id="l2" langue="en"><titre>Web Basics</titre><annee>2022</annee></livre><livre id="l3" langue="fr"><titre>XPath avancé</titre><annee>2026</annee></livre></bibliotheque>');
      const x=d.evaluate(code,d,null,XPathResult.ANY_TYPE,null);const values:string[]=[];
      if(x.resultType===XPathResult.NUMBER_TYPE)values.push(String(x.numberValue));
      else if(x.resultType===XPathResult.BOOLEAN_TYPE)values.push(String(x.booleanValue));
      else if(x.resultType===XPathResult.STRING_TYPE)values.push(x.stringValue);
      else{let n:Node|null;while((n=x.iterateNext())&&values.length<35)values.push(n.nodeName+' : '+(n.textContent||n.nodeValue||'').trim());}
      return {middle:values.join('\n')||'Aucun nœud sélectionné',label:'Résultat XPath 1.0',
        web:htmlPage('<h2>Sélection du document XML</h2><ul>'+values.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'),
        note:'XPath sélectionne des valeurs ; la liste HTML est une visualisation pédagogique, et non un rendu natif de XPath.'};
    }
    if(lang==='xslt'){
      const d=parseXml(code);
      if(d.documentElement.namespaceURI!=='http://www.w3.org/1999/XSL/Transform')return {middle:code,label:'Fragment XSLT',note:'Une feuille XSLT complète est nécessaire pour une transformation.'};
      if(typeof XSLTProcessor==='undefined')return {middle:code,label:'Feuille XSLT',note:'Le moteur XSLT 1.0 n’est pas disponible dans ce navigateur.'};
      const p=new XSLTProcessor();p.importStylesheet(d);
      const source=parseXml('<bibliotheque><livre><titre>XML pour tous</titre><auteur>Amine</auteur></livre><livre><titre>Web Basics</titre><auteur>Salma</auteur></livre></bibliotheque>');
      const output=p.transformToDocument(source);
      if(!output)throw Error('La transformation n’a produit aucun document.');
      const markup=new XMLSerializer().serializeToString(output);
      return {middle:markup,label:'HTML/XML produit par XSLT',web:markup,note:'La feuille XSLT 1.0 est appliquée à un catalogue XML de démonstration.'};
    }
    if(lang==='dtd')return {middle:code,label:'Déclarations de grammaire XML',note:'Une DTD définit une grammaire ; elle ne produit pas seule une page Web. La validation réclame un moteur dédié.'};
    return {middle:code,label:'Résultat intermédiaire',note:'Aucun rendu navigateur natif disponible pour ce format.'};
  }catch(error){return {middle:'',label:'Diagnostic',error:String(error),note:'Le code ne peut pas être interprété de manière fiable en l’état.'};}
}
