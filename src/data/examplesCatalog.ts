import type {ExtendedExample} from './extendedExamples';
import {EXTENDED_EXAMPLES} from './extendedExamples';
import {MASTERY_EXAMPLES} from './masteryExamples';
import {ADVANCED_EXAMPLES} from './advancedExamples';
import {CASE_STUDIES} from './caseStudies';
import {PRACTICAL_EXPANSIONS} from './practicalExpansions';
import {TECHNOLOGY_ORDER} from './languageOrder';

export const ALL_EXAMPLES:ExtendedExample[] = [
  ...EXTENDED_EXAMPLES, ...MASTERY_EXAMPLES, ...ADVANCED_EXAMPLES,
  ...CASE_STUDIES, ...PRACTICAL_EXPANSIONS
];

/** 18 scénarios variés par technologie : fondamentaux, pratique, diagnostics et cas métier. */
export const GUIDED_EXAMPLES:Record<string,ExtendedExample[]> = Object.fromEntries(
  TECHNOLOGY_ORDER.map(language => {
    const all = ALL_EXAMPLES.filter(item => item.language === language);
    const byLevel = (level:string) => all.filter(item => item.level === level);
    const contextual = (level:string) => [
      ...byLevel(level).filter(item => item.category === 'Cas pratiques' || item.id.startsWith('expansion-')),
      ...byLevel(level).filter(item => item.category !== 'Cas pratiques' && !item.id.startsWith('expansion-'))
    ];
    const chosen:ExtendedExample[] = [];
    for(const [level,limit] of [['Débutant',7],['Intermédiaire',8],['Avancé',3]] as const) {
      for(const item of contextual(level).slice(0,limit)) chosen.push(item);
    }
    for(const item of all) {
      if(chosen.length>=18)break;
      if(!chosen.some(current=>current.id===item.id))chosen.push(item);
    }
    return [language, chosen];
  })
);

export const GUIDE_TOTAL = Object.values(GUIDED_EXAMPLES).reduce((total, group) => total + group.length,0);
