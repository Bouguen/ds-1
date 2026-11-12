/**
 * Mise en forme pour la lecture UNIQUEMENT. Ne jamais utiliser ce résultat comme source
 * d'exécution : les blancs sont significatifs en YAML, Markdown et dans certains XML.
 */
function tokenizeMarkup(source:string):string[] {
  const tokens:string[]=[];
  let i=0;
  while(i<source.length){
    if(source[i]!=='<'){
      const next=source.indexOf('<',i);
      const end=next<0?source.length:next;
      tokens.push(source.slice(i,end));i=end;continue;
    }
    const begin=i;
    if(source.startsWith('<!--',i)){
      const end=source.indexOf('-->',i+4);
      i=end<0?source.length:end+3;
    }else if(source.startsWith('<![CDATA[',i)){
      const end=source.indexOf(']]>',i+9);
      i=end<0?source.length:end+3;
    }else{
      let quote='';
      let brackets=0;
      const doctype=/^<!DOCTYPE\b/i.test(source.slice(i,i+10));
      i++;
      while(i<source.length){
        const ch=source[i];
        if(quote){if(ch===quote)quote='';}
        else if(ch==='"'||ch==="'")quote=ch;
        else if(doctype&&ch==='[')brackets++;
        else if(doctype&&ch===']')brackets=Math.max(0,brackets-1);
        else if(ch==='>'&&brackets===0){i++;break;}
        i++;
      }
    }
    tokens.push(source.slice(begin,i));
  }
  return tokens;
}
function formatDoctype(token:string,depth:number):string[] {
  const start=token.indexOf('[');
  const close=token.lastIndexOf(']');
  if(start<0||close<start)return ['  '.repeat(depth)+token.trim()];
  const introduction=token.slice(0,start+1).trim();
  const declarations=tokenizeMarkup(token.slice(start+1,close))
    .map(part=>part.trim()).filter(Boolean);
  return [
    '  '.repeat(depth)+introduction,
    ...declarations.map(part=>'  '.repeat(depth+1)+part),
    '  '.repeat(depth)+token.slice(close).trim()
  ];
}
function formatMarkup(input:string,language:string):string {
  if(!input.includes('<'))return input;
  const tokens=tokenizeMarkup(input);
  const lines:string[]=[];
  let depth=0;
  const voidHtml=/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;
  const html=language==='html';
  for(const part of tokens){
    const token=part.trim();
    if(!token)continue;
    if(/^<!DOCTYPE\b/i.test(token)){
      lines.push(...formatDoctype(token,depth));continue;
    }
    if(token.startsWith('<!--')||token.startsWith('<![CDATA[')||token.startsWith('<?')
       ||/^<!(?:ENTITY|ELEMENT|ATTLIST|NOTATION)\b/i.test(token)){
      lines.push('  '.repeat(depth)+token);continue;
    }
    if(/^<\//.test(token)){
      depth=Math.max(0,depth-1);
      lines.push('  '.repeat(depth)+token);continue;
    }
    lines.push('  '.repeat(depth)+token);
    if(token.startsWith('<')){
      const name=token.match(/^<([A-Za-z][\w:.-]*)/)?.[1]||'';
      if(name&&!token.endsWith('/>')&&!(html&&voidHtml.test(name)))depth++;
    }
  }
  return lines.join('\n');
}
function formatCss(input:string):string {
  if(!input.includes('{'))return input;
  let depth=0,part='',quoted='',comment=false;
  const lines:string[]=[];
  function flush(){const text=part.trim();if(text)lines.push('  '.repeat(Math.max(0,depth))+text);part='';}
  for(let i=0;i<input.length;i++){
    const ch=input[i],next=input[i+1];
    if(comment){part+=ch;if(ch==='*'&&next==='/'){part+='/';i++;comment=false;}continue;}
    if(quoted){part+=ch;if(ch==='\\'){part+=next||'';i++;}else if(ch===quoted)quoted='';continue;}
    if(ch==='/'&&next==='*'){part+='/*';i++;comment=true;continue;}
    if(ch==='"'||ch==="'"){part+=ch;quoted=ch;continue;}
    if(ch==='{'){part+=' {';flush();depth++;continue;}
    if(ch==='}'){flush();depth=Math.max(0,depth-1);lines.push('  '.repeat(depth)+'}');continue;}
    if(ch===';'){part+=';';flush();continue;}
    part+=ch;
  }
  flush();return lines.join('\n');
}
export function formatExampleCode(code:string,language:string):string {
  if(language==='json'){
    try{return JSON.stringify(JSON.parse(code) as unknown,null,2);}catch{return code;}
  }
  if(['html','xhtml','xml','xslt','entities','dtd'].includes(language))return formatMarkup(code,language);
  if(language==='css')return formatCss(code);
  // Pas de modification automatique des blancs significatifs.
  return code;
}
