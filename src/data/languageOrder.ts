/**
 * Référence unique pour l'ordre pédagogique et la navigation.
 * Les technologies complémentaires suivent les sept langages fondamentaux.
 */
export const CORE_LANGUAGE_ORDER = ['html','css','xml','markdown','latex','json','yaml'] as const;
export const TECHNOLOGY_ORDER = [
  ...CORE_LANGUAGE_ORDER,'xhtml','dtd','entities','xpath','xslt'
] as const;
export const LANGUAGE_NAMES: Record<string,string> = {
  html:'HTML',css:'CSS',xml:'XML',markdown:'Markdown',latex:'LaTeX',json:'JSON',yaml:'YAML',
  xhtml:'XHTML',dtd:'DTD',entities:'Entités XML',xpath:'XPath 1.0',xslt:'XSLT 1.0'
};
export const orderIndex = (language:string):number => {
  const index = TECHNOLOGY_ORDER.findIndex(id=>id===language);
  return index === -1 ? TECHNOLOGY_ORDER.length : index;
};
export function orderByLanguage<T extends {id:string}>(items:readonly T[]): T[] {
  return [...items].sort((a,b)=>orderIndex(a.id)-orderIndex(b.id));
}
