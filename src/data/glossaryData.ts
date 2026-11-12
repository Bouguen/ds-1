import {LANGUAGES_DATA} from './languagesData';
import {LEARNING_INSIGHTS} from './exampleInsights';
import {LANGUAGE_NAMES, TECHNOLOGY_ORDER, orderIndex} from './languageOrder';

export interface GlossaryEntry {
  id:string;
  language:string;
  languageName:string;
  term:string;
  definition:string;
  origin:'Fiche de cours'|'Guide pédagogique';
  snippet?:string;
}

/** Les définitions viennent des fiches et des guides existants du portail :
 * cette vue les rend consultables sans inventer de nouvelle définition.
 */
export const GLOSSARY_ENTRIES:GlossaryEntry[]=(()=>{
  const entries:GlossaryEntry[]=[];
  const known=new Set<string>();
  const add=(entry:Omit<GlossaryEntry,'id'>)=>{
    const id=entry.language+'::'+entry.term.toLocaleLowerCase('fr').trim();
    if(known.has(id))return;
    known.add(id);entries.push({...entry,id});
  };
  LANGUAGES_DATA.forEach(language=>language.keyConcepts.forEach(concept=>
    add({language:language.id,languageName:language.name,term:concept.term,
      definition:concept.definition,origin:'Fiche de cours',snippet:concept.codeSnippet})
  ));
  TECHNOLOGY_ORDER.forEach(language=>{
    const guide=LEARNING_INSIGHTS[language];
    if(!guide)return;
    guide.glossary.forEach(([term,definition])=>
      add({language,languageName:LANGUAGE_NAMES[language]||language,term,
        definition,origin:'Guide pédagogique'})
    );
  });
  return entries.sort((a,b)=>orderIndex(a.language)-orderIndex(b.language)
    ||a.term.localeCompare(b.term,'fr',{sensitivity:'base'}));
})();
