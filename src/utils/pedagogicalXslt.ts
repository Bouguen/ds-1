/**
 * Moteur pédagogique XSLT 1.0 local, utilisé uniquement lorsque XSLTProcessor
 * est absent. Il couvre les constructions abordées dans les laboratoires :
 * template, value-of, for-each, sort, if, choose, apply-templates et text.
 * Il n'est pas un processeur XSLT 1.0 normatif.
 */
const XSL_NS='http://www.w3.org/1999/XSL/Transform';
export type TransformationResult = { output: Document; engine: 'native' | 'pedagogique' };
const parseError=(doc:Document)=>{
  const error=doc.getElementsByTagName('parsererror')[0];
  if(error)throw new Error((error.textContent||'XML mal formé').slice(0,320));
};
const isXslt=(element:Element,local?:string)=>
  element.namespaceURI===XSL_NS && (!local || element.localName===local);

export function transformXsltLocally(source:Document,sheet:Document):TransformationResult {
  parseError(source);parseError(sheet);
  if(sheet.documentElement.namespaceURI!==XSL_NS ||
    !['stylesheet','transform'].includes(sheet.documentElement.localName)) {
    throw new Error('La racine doit être xsl:stylesheet ou xsl:transform dans l’espace de noms XSLT.');
  }
  if(typeof XSLTProcessor!=='undefined') {
    const processor=new XSLTProcessor();
    processor.importStylesheet(sheet);
    const output=processor.transformToDocument(source);
    if(!output)throw new Error('Transformation XSLT impossible.');
    parseError(output);
    return {output,engine:'native'};
  }
  // Aucune inclusion externe ni appel réseau dans le moteur pédagogique.
  const unsupported=['include','import','import-schema','result-document','evaluate'];
  for(const name of unsupported) {
    if(sheet.getElementsByTagNameNS(XSL_NS,name).length)
      throw new Error('Instruction xsl:'+name+' non prise en charge par le moteur pédagogique local.');
  }
  const templates=Array.from(sheet.getElementsByTagNameNS(XSL_NS,'template'));
  const rootTemplate=templates.find(t=>t.getAttribute('match')==='/');
  if(!rootTemplate)throw new Error('Ajoutez un xsl:template match="/" pour définir le résultat.');
  const htmlDocument=document.implementation.createHTMLDocument('');
  const fragment=htmlDocument.createDocumentFragment();
  let remaining=5000;
  const safeguard=(depth:number)=>{
    remaining--;
    if(remaining<0 || depth>40)throw new Error('La transformation est trop complexe (limite pédagogique).');
  };
  const resolver=(prefix:string|null)=>prefix?sheet.documentElement.lookupNamespaceURI(prefix) || source.documentElement.lookupNamespaceURI(prefix):null;
  const evaluateString=(expression:string,context:Node)=>{
    if(!expression.trim())throw new Error('Une expression XPath est manquante.');
    return source.evaluate(expression,context,resolver,XPathResult.STRING_TYPE,null).stringValue;
  };
  const evaluateBoolean=(expression:string,context:Node)=>
    source.evaluate(expression,context,resolver,XPathResult.BOOLEAN_TYPE,null).booleanValue;
  const evaluateNodes=(expression:string,context:Node):Node[]=>{
    if(!expression.trim())throw new Error('Un attribut select est manquant.');
    const result=source.evaluate(expression,context,resolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    const nodes:Node[]=[];
    for(let i=0;i<result.snapshotLength;i++){
      if(i>1500)throw new Error('Plus de 1 500 nœuds sélectionnés.');
      const node=result.snapshotItem(i);
      if(node)nodes.push(node);
    }
    return nodes;
  };
  const sortNodes=(nodes:Node[],instruction:Element):Node[]=>{
    const sorter=Array.from(instruction.children).find(c=>isXslt(c,'sort'));
    if(!sorter)return nodes;
    const key=sorter.getAttribute('select')||'.';
    const descending=sorter.getAttribute('order')==='descending';
    const numeric=sorter.getAttribute('data-type')==='number';
    return nodes.map((node,index)=>({node,index,value:evaluateString(key,node)}))
      .sort((a,b)=>{
        const compare=numeric?(Number(a.value)-Number(b.value)):a.value.localeCompare(b.value,'en');
        return (descending?-compare:compare) || a.index-b.index;
      }).map(v=>v.node);
  };
  const renderChildren=(element:Element,context:Node,parent:Node,depth:number)=>{
    for(const child of Array.from(element.childNodes))render(child,context,parent,depth+1);
  };
  const findTemplate=(node:Node):Element|undefined=>{
    if(node.nodeType===Node.ELEMENT_NODE) {
      const element=node as Element;
      return templates.find(t=>{
        const match=(t.getAttribute('match')||'').trim();
        return match===element.localName || match===element.nodeName ||
          match==='*' || match==='//'+element.localName;
      });
    }
    return undefined;
  };
  const render=(instruction:Node,context:Node,parent:Node,depth:number):void=>{
    safeguard(depth);
    if(instruction.nodeType===Node.TEXT_NODE) {
      parent.appendChild(htmlDocument.createTextNode(instruction.nodeValue||''));
      return;
    }
    if(instruction.nodeType!==Node.ELEMENT_NODE)return;
    const element=instruction as Element;
    if(!isXslt(element)){
      const rendered=htmlDocument.createElement(element.localName);
      for(const attr of Array.from(element.attributes)) {
        if(attr.name!=='xmlns' && !attr.name.startsWith('xmlns:'))rendered.setAttribute(attr.name,attr.value);
      }
      parent.appendChild(rendered);
      renderChildren(element,context,rendered,depth);
      return;
    }
    const name=element.localName;
    if(name==='value-of') {
      const value=evaluateString(element.getAttribute('select')||'',context);
      parent.appendChild(htmlDocument.createTextNode(value));
      return;
    }
    if(name==='text') {
      parent.appendChild(htmlDocument.createTextNode(element.textContent||''));
      return;
    }
    if(name==='for-each' || name==='apply-templates') {
      const nodes=sortNodes(evaluateNodes(element.getAttribute('select')||'',context),element);
      for(const node of nodes) {
        if(name==='for-each')renderChildren(element,node,parent,depth);
        else {
          const template=findTemplate(node);
          if(template)renderChildren(template,node,parent,depth);
          else if(node.nodeType===Node.ELEMENT_NODE)parent.appendChild(htmlDocument.createTextNode(node.textContent||''));
          else parent.appendChild(htmlDocument.createTextNode(node.nodeValue||''));
        }
      }
      return;
    }
    if(name==='if') {
      if(evaluateBoolean(element.getAttribute('test')||'false()',context))renderChildren(element,context,parent,depth);
      return;
    }
    if(name==='choose') {
      const choice=Array.from(element.children).find(c=>isXslt(c,'when') && evaluateBoolean(c.getAttribute('test')||'false()',context))
        || Array.from(element.children).find(c=>isXslt(c,'otherwise'));
      if(choice)renderChildren(choice,context,parent,depth);
      return;
    }
    if(name==='sort' || name==='template' || name==='output')return;
    throw new Error('Instruction xsl:'+name+' non prise en charge dans ce moteur pédagogique. Essayez value-of, for-each, sort, if, choose ou apply-templates.');
  };
  renderChildren(rootTemplate,source,fragment,0);
  const firstElement=Array.from(fragment.childNodes).find(n=>n.nodeType===Node.ELEMENT_NODE) as Element|undefined;
  let markup:string;
  if(firstElement?.localName==='html') markup=firstElement.outerHTML;
  else {
    const holder=htmlDocument.createElement('div');
    holder.appendChild(fragment);
    markup='<html><body>'+holder.innerHTML+'</body></html>';
  }
  const output=new DOMParser().parseFromString(markup,'text/html');
  return {output,engine:'pedagogique'};
}
