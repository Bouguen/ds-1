/** Indentation de présentation uniquement : aucune modification du catalogue original. */
function formatMarkup(input:string):string {
  const source=input.trim();
  if(!source.includes('<')||/<!\[CDATA\[|<!DOCTYPE|<!ENTITY|<\?xml-stylesheet/i.test(source))return source;
  const tokens=source.match(/<!--[\s\S]*?-->|<[^>]*>|[^<]+/g);
  if(!tokens)return source;
  const voidHtml=/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;
  let depth=0;
  const lines:string[]=[];
  for(let i=0;i<tokens.length;i++){
    const token=tokens[i].trim();
    if(!token)continue;
    if(!token.startsWith('<')){
      if(lines.length>0 && /<[^>]+>$/.test(lines[lines.length-1]) && !lines[lines.length-1].includes('</')){
        lines[lines.length-1]+=token;
      }else lines.push('  '.repeat(depth)+token);
      continue;
    }
    if(/^<\//.test(token))depth=Math.max(0,depth-1);
    // Un enfant sans nouveau niveau conserve une lisibilité compacte.
    if(/^<\//.test(token)&&lines.length&&lines[lines.length-1].trim()&&!lines[lines.length-1].trim().startsWith('</')&&lines[lines.length-1].includes('>')&&!lines[lines.length-1].includes('</')){
      lines[lines.length-1]+=token;
    }else lines.push('  '.repeat(depth)+token);
    const name=token.match(/^<([A-Za-z][\w:-]*)/)?.[1]||'';
    if(name&&!token.endsWith('/>')&&!voidHtml.test(name)&&!token.startsWith('<!')&&!token.startsWith('<?')&&!token.includes('</'+name+'>'))depth++;
  }
  return lines.join('\n');
}
function formatCss(input:string):string {
  if(!input.includes('{'))return input.trim();
  let depth=0,part='',quoted='',comment=false;
  const lines:string[]=[];
  function flush(){const t=part.trim();if(t)lines.push('  '.repeat(Math.max(0,depth))+t);part='';}
  for(let i=0;i<input.length;i++){
    const ch=input[i],next=input[i+1];
    if(comment){part+=ch;if(ch==='*'&&next==='/'){part+='/';i++;comment=false;}continue;}
    if(quoted){part+=ch;if(ch==='\\'){part+=next||'';i++;}else if(ch===quoted)quoted='';continue;}
    if(ch==='/'&&next==='*'){part+='/*';i++;comment=true;continue;}
    if(ch==='"'||ch==="'"){part+=ch;quoted=ch;continue;}
    if(ch==='{'){part+=' {';flush();depth++;continue;}
    if(ch==='}'){flush();depth=Math.max(0,depth-1);lines.push('  '.repeat(depth)+'}');continue;}
    if(ch===';'){part+=';';flush();continue;}
    if(ch==='\n'&&part.trim()===''){continue;}
    part+=ch;
  }
  flush();return lines.join('\n');
}
export function formatExampleCode(code:string,language:string):string {
  if(language==='json'){
    try{return JSON.stringify(JSON.parse(code) as unknown,null,2);}catch{return code.trim();}
  }
  if(language==='html'||language==='xhtml'||language==='xml'||language==='xslt'){
    return formatMarkup(code);
  }
  if(language==='css')return formatCss(code);
  return code.trim();
}
