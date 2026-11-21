import React, { useState } from 'react';
import { transformXsltLocally } from '../utils/pedagogicalXslt';

type Family = 'xml' | 'dtd' | 'xpath' | 'xslt';
type Level = 'Débutant' | 'Intermédiaire' | 'Avancé';
type Exercise = {
  id: string;
  level: Level;
  title: string;
  task: string;
  starter: string;
  solution: string;
  hint: string;
  explanation: string;
  source?: string;
  alternative?: string;
  namespaces?: Record<string, string>;
};
type Feedback = { ok: boolean; message: string };
const success = (message: string): Feedback => ({ ok: true, message });
const fail = (message: string): Feedback => ({ ok: false, message });
const xmlSafe = (text: string): Document => {
  const doc = new DOMParser().parseFromString(text, 'application/xml');
  const error = doc.getElementsByTagName('parsererror')[0];
  if (error || !doc.documentElement) {
    throw new Error('XML mal formé : ' + (error?.textContent || 'Racine manquante').trim().slice(0, 240));
  }
  return doc;
};
const norm = (text: string) => text.trim().replace(/\s+/g, ' ');
const booksA = '<bibliotheque><livre id="l1" langue="fr"><titre>XML</titre><auteur>Amine</auteur><prix>28</prix></livre><livre id="l2" langue="en"><titre>XPath</titre><auteur>Salma</auteur><prix>42</prix></livre><livre id="l3" langue="fr"><titre>HTML</titre><auteur>Leila</auteur><prix>19</prix></livre></bibliotheque>';
const booksB = '<bibliotheque><livre id="x1" langue="en"><titre>CSS</titre><auteur>Ali</auteur><prix>50</prix></livre><livre id="x2" langue="fr"><titre>DTD</titre><auteur>Sara</auteur><prix>12</prix></livre><livre id="x3" langue="fr"><titre>XSLT</titre><auteur>Nora</auteur><prix>25</prix></livre><livre id="x4" langue="en"><titre>JSON</titre><auteur>Omar</auteur><prix>38</prix></livre></bibliotheque>';
const nsA = '<cat:catalogue xmlns:cat="urn:classe:catalogue"><cat:livre><cat:titre>XML</cat:titre></cat:livre><cat:livre><cat:titre>XPath</cat:titre></cat:livre></cat:catalogue>';
const nsB = '<cat:catalogue xmlns:cat="urn:classe:catalogue"><cat:livre><cat:titre>XSLT</cat:titre></cat:livre></cat:catalogue>';
const xslPage = (body: string, extra = '') =>
  '<?xml version="1.0"?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:output method="html" encoding="UTF-8"/><xsl:template match="/"><html><body>' + body + '</body></html></xsl:template>' + extra + '</xsl:stylesheet>';
const xmlExercises: Exercise[] = [
  { id:'xml-1',level:'Débutant',title:'Réparer des balises mal imbriquées',
    task:'Corrigez la fermeture des balises pour obtenir une bibliotheque contenant un livre dont le titre vaut XML.',
    starter:'<bibliotheque><livre><titre>XML</livre></titre></bibliotheque>',
    solution:'<bibliotheque><livre><titre>XML</titre></livre></bibliotheque>',
    hint:'Le dernier élément ouvert doit être le premier fermé.',
    explanation:'XML exige une seule racine et une imbrication stricte des éléments.' },
  { id:'xml-2',level:'Débutant',title:'Décrire un livre avec des attributs',
    task:'Ajoutez au livre les attributs id="l1" et langue="fr", sans retirer son titre.',
    starter:'<bibliotheque><livre><titre>XML</titre></livre></bibliotheque>',
    solution:'<bibliotheque><livre id="l1" langue="fr"><titre>XML</titre></livre></bibliotheque>',
    hint:'Les attributs sont placés dans la balise ouvrante et leurs valeurs sont entre guillemets.',
    explanation:'Un attribut porte une information associée à un élément ; son nom est unique dans une balise.' },
  { id:'xml-3',level:'Intermédiaire',title:'Construire une liste structurée',
    task:'La bibliothèque doit contenir trois livres ayant pour titres XML, CSS et XPath, chacun dans un élément titre.',
    starter:'<bibliotheque><livre><titre>XML</titre></livre><livre><titre>CSS</titre></livre></bibliotheque>',
    solution:'<bibliotheque><livre><titre>XML</titre></livre><livre><titre>CSS</titre></livre><livre><titre>XPath</titre></livre></bibliotheque>',
    hint:'Ajoutez un troisième élément livre frère des deux premiers.',
    explanation:'Des éléments répétés permettent de représenter une collection et d’interroger sa structure.' },
  { id:'xml-4',level:'Intermédiaire',title:'Appliquer un espace de noms',
    task:'Placez catalogue, livre et titre dans l’espace de noms urn:documents:catalogue, sans modifier le texte XML.',
    starter:'<catalogue><livre><titre>XML</titre></livre></catalogue>',
    solution:'<catalogue xmlns="urn:documents:catalogue"><livre><titre>XML</titre></livre></catalogue>',
    hint:'Déclarez xmlns="urn:documents:catalogue" sur la racine pour appliquer le namespace par défaut aux éléments descendants.',
    explanation:'Le nom étendu d’un élément XML associe son nom local et son URI d’espace de noms.' },
  { id:'xml-5',level:'Intermédiaire',title:'Échapper les caractères réservés',
    task:'Produisez un élément message dont le texte effectif soit exactement : Jean & Sara <2026>.',
    starter:'<message>Jean & Sara <2026></message>',
    solution:'<message>Jean &amp; Sara &lt;2026&gt;</message>',
    hint:'Remplacez & par &amp; et les signes < et > du texte par &lt; et &gt;.',
    explanation:'Les références d’entités permettent d’écrire les caractères réservés sans créer de balises.' },
  { id:'xml-6',level:'Avancé',title:'Structurer trois élèves et leurs notes',
    task:'Ajoutez Salma (id e3, note 18). Chaque élève doit avoir un id unique, un nom et une note numérique entre 0 et 20.',
    starter:'<classe><eleve id="e1"><nom>Amine</nom><note>15</note></eleve><eleve id="e2"><nom>Leila</nom><note>12</note></eleve></classe>',
    solution:'<classe><eleve id="e1"><nom>Amine</nom><note>15</note></eleve><eleve id="e2"><nom>Leila</nom><note>12</note></eleve><eleve id="e3"><nom>Salma</nom><note>18</note></eleve></classe>',
    hint:'Ajoutez un élément eleve directement dans classe, avec un id e3 distinct.',
    explanation:'L’autocorrection contrôle ici la structure, l’unicité des identifiants et la plage des notes : une simple bonne formation ne suffit pas.' }
];
const dtdExercises: Exercise[] = [
  {id:'dtd-1',level:'Débutant',title:'Un catalogue avec un ou plusieurs livres',
    task:'Déclarez un élément catalogue contenant au moins un élément livre, à l’aide de +.',
    starter:'<!ELEMENT catalogue (livre)>',
    solution:'<!ELEMENT catalogue (livre+)>',
    hint:'Le quantificateur + signifie « une ou plusieurs occurrences ».',
    explanation:'Le modèle (livre+) refuse un catalogue vide, contrairement à (livre*).',
    source:'<catalogue><livre/></catalogue>'},
  {id:'dtd-2',level:'Débutant',title:'Imposer l’ordre titre puis auteur',
    task:'Déclarez livre avec une séquence obligatoire : titre, suivi de auteur.',
    starter:'<!ELEMENT livre (titre|auteur)>',
    solution:'<!ELEMENT livre (titre,auteur)>',
    hint:'La virgule encode une séquence ; la barre | encode un choix.',
    explanation:'(titre,auteur) impose deux enfants et leur ordre, tandis que (titre|auteur) est une alternative.',
    source:'<livre><titre>XML</titre><auteur>Amine</auteur></livre>'},
  {id:'dtd-3',level:'Intermédiaire',title:'Déclarer un attribut identifiant obligatoire',
    task:'Déclarez pour livre un attribut id de type ID et de présence #REQUIRED.',
    starter:'<!ATTLIST livre id CDATA #IMPLIED>',
    solution:'<!ATTLIST livre id ID #REQUIRED>',
    hint:'Le type est ID (identifiant XML) et le mot-clé est #REQUIRED.',
    explanation:'ID impose un identifiant XML ; #REQUIRED rend cet attribut obligatoire selon la DTD.',
    source:'<livre id="l1"/>'},
  {id:'dtd-4',level:'Intermédiaire',title:'Déclarer un contenu textuel',
    task:'Déclarez titre comme élément contenant du texte analysé (#PCDATA).',
    starter:'<!ELEMENT titre EMPTY>',
    solution:'<!ELEMENT titre (#PCDATA)>',
    hint:'Utilisez le modèle (#PCDATA), entre parenthèses.',
    explanation:'EMPTY impose aucun contenu ; (#PCDATA) permet des données textuelles analysées.',
    source:'<titre>Introduction à XML</titre>'},
  {id:'dtd-5',level:'Intermédiaire',title:'Autoriser zéro à plusieurs livres',
    task:'Déclarez catalogue avec zéro, un ou plusieurs livre, grâce à *.',
    starter:'<!ELEMENT catalogue (livre+)>',
    solution:'<!ELEMENT catalogue (livre*)>',
    hint:'Le symbole * autorise également zéro occurrence.',
    explanation:'(livre*) autorise le catalogue vide, contrairement à (livre+).',
    source:'<catalogue/>'},
  {id:'dtd-6',level:'Avancé',title:'Composer un modèle et déclarer les éléments',
    task:'Déclarez livre avec titre obligatoire, auteur facultatif, prix obligatoire. Déclarez aussi titre et prix en #PCDATA.',
    starter:'<!ELEMENT livre (titre,auteur,prix)>\n<!ELEMENT titre EMPTY>\n<!ELEMENT prix EMPTY>',
    solution:'<!ELEMENT livre (titre,auteur?,prix)>\n<!ELEMENT titre (#PCDATA)>\n<!ELEMENT prix (#PCDATA)>',
    hint:'Le ? rend auteur facultatif. Ajoutez (#PCDATA) aux déclarations titre et prix.',
    explanation:'Une DTD combine les modèles de contenu, la séquence, la cardinalité et les déclarations des éléments.',
    source:'<livre><titre>XML</titre><prix>28</prix></livre>'}
];
const xpathExercises: Exercise[] = [
  {id:'xpath-1',level:'Débutant',title:'Sélectionner tous les titres',task:'Rédigez une expression XPath 1.0 qui sélectionne les éléments titre de chaque livre.',
    starter:'//livre',solution:'//livre/titre',hint:'Complétez le chemin avec /titre.',explanation:'Le séparateur / suit la relation parent-enfant.',
    source:booksA,alternative:booksB},
  {id:'xpath-2',level:'Intermédiaire',title:'Filtrer les livres à moins de 30 DH',task:'Retournez uniquement les éléments titre des livres dont le prix est strictement inférieur à 30.',
    starter:'//livre/titre',solution:'//livre[prix < 30]/titre',hint:'Placez un prédicat [prix < 30] après livre.',explanation:'Un prédicat XPath filtre les nœuds selon une condition.',
    source:booksA,alternative:booksB},
  {id:'xpath-3',level:'Intermédiaire',title:'Compter les livres en français',task:'Retournez le nombre de livres dont l’attribut langue vaut fr.',
    starter:'count(//livre)',solution:'count(//livre[@langue="fr"])',hint:'Utilisez un prédicat sur l’attribut @langue.',explanation:'count() renvoie un nombre ; les attributs sont adressés avec @.',
    source:booksA,alternative:booksB},
  {id:'xpath-4',level:'Intermédiaire',title:'Sélectionner le dernier livre',task:'Sélectionnez le titre du dernier livre de la bibliothèque, quel que soit le nombre de livres.',
    starter:'//livre/titre',solution:'(//livre)[last()]/titre',hint:'Appliquez [last()] à la liste des livres entre parenthèses.',explanation:'last() représente la dernière position du contexte de sélection.',
    source:booksA,alternative:booksB},
  {id:'xpath-5',level:'Débutant',title:'Extraire les attributs ID',task:'Sélectionnez les nœuds attribut id de chaque livre, et non les éléments livre.',
    starter:'//livre',solution:'//livre/@id',hint:'Le nom d’un attribut est précédé de @.',explanation:'XPath distingue les nœuds attributs des nœuds éléments.',
    source:booksA,alternative:booksB},
  {id:'xpath-6',level:'Avancé',title:'Interroger un XML avec namespace',task:'Sélectionnez les titres des éléments cat:livre dans l’espace de noms déclaré.',
    starter:'//livre/titre',solution:'//cat:livre/cat:titre',hint:'Utilisez le préfixe cat: pour les deux éléments.',explanation:'En XPath 1.0, les éléments avec espace de noms nécessitent un préfixe résolu vers leur URI.',
    source:nsA,alternative:nsB,namespaces:{cat:'urn:classe:catalogue'}},
  {id:'xpath-7',level:'Avancé',title:'Calculer le prix moyen',task:'Calculez numériquement le prix moyen des livres, sans inscrire le résultat en dur.',
    starter:'sum(//livre/prix)',solution:'sum(//livre/prix) div count(//livre)',hint:'Divisez la somme par le nombre des livres avec div et count().',explanation:'XPath 1.0 permet des calculs numériques sur des sélections de nœuds.',
    source:booksA,alternative:booksB}
];
const xsltExercises: Exercise[] = [
  {id:'xslt-1',level:'Débutant',title:'Afficher un titre dynamique',task:'Produisez un élément HTML h1 contenant le titre du premier livre de la source XML.',
    starter:xslPage('<h1>À remplacer</h1>'),
    solution:xslPage('<h1><xsl:value-of select="bibliotheque/livre[1]/titre"/></h1>'),
    hint:'Insérez xsl:value-of avec select="bibliotheque/livre[1]/titre" dans h1.',
    explanation:'xsl:value-of récupère une valeur via XPath et l’insère dans le document résultat.',source:booksA,alternative:booksB},
  {id:'xslt-2',level:'Débutant',title:'Produire une liste HTML de livres',task:'Produisez un li par livre, contenant uniquement son titre, dans le même ordre que la source.',
    starter:xslPage('<ul><li>À remplacer</li></ul>'),
    solution:xslPage('<ul><xsl:for-each select="bibliotheque/livre"><li><xsl:value-of select="titre"/></li></xsl:for-each></ul>'),
    hint:'Utilisez xsl:for-each select="bibliotheque/livre", puis xsl:value-of select="titre".',
    explanation:'xsl:for-each répète une structure de sortie pour chaque nœud sélectionné.',source:booksA,alternative:booksB},
  {id:'xslt-3',level:'Intermédiaire',title:'Filtrer les livres économiques',task:'Produisez des li seulement pour les livres dont le prix est inférieur à 30 DH.',
    starter:xslPage('<ul><xsl:for-each select="bibliotheque/livre"><li><xsl:value-of select="titre"/></li></xsl:for-each></ul>'),
    solution:xslPage('<ul><xsl:for-each select="bibliotheque/livre[prix &lt; 30]"><li><xsl:value-of select="titre"/></li></xsl:for-each></ul>'),
    hint:'Le caractère < du prédicat doit être écrit &lt; dans un attribut XML.',
    explanation:'Une feuille XSLT est un document XML ; les opérateurs de comparaison dans ses attributs doivent être échappés.',source:booksA,alternative:booksB},
  {id:'xslt-4',level:'Intermédiaire',title:'Trier les titres par ordre alphabétique',task:'Produisez les li de tous les titres par ordre alphabétique croissant.',
    starter:xslPage('<ul><xsl:for-each select="bibliotheque/livre"><li><xsl:value-of select="titre"/></li></xsl:for-each></ul>'),
    solution:xslPage('<ul><xsl:for-each select="bibliotheque/livre"><xsl:sort select="titre"/><li><xsl:value-of select="titre"/></li></xsl:for-each></ul>'),
    hint:'Placez xsl:sort select="titre" comme premier enfant de xsl:for-each.',
    explanation:'xsl:sort réordonne les résultats d’une itération sans modifier la source XML.',source:booksA,alternative:booksB},
  {id:'xslt-5',level:'Avancé',title:'Attribuer une catégorie selon le prix',task:'Chaque li doit afficher « TITRE : accessible » si prix < 30, sinon « TITRE : premium ».',
    starter:xslPage('<ul><xsl:for-each select="bibliotheque/livre"><li><xsl:value-of select="titre"/> : premium</li></xsl:for-each></ul>'),
    solution:xslPage('<ul><xsl:for-each select="bibliotheque/livre"><li><xsl:value-of select="titre"/> : <xsl:choose><xsl:when test="prix &lt; 30">accessible</xsl:when><xsl:otherwise>premium</xsl:otherwise></xsl:choose></li></xsl:for-each></ul>'),
    hint:'Utilisez xsl:choose, xsl:when test="prix &lt; 30" et xsl:otherwise.',
    explanation:'xsl:choose permet de sélectionner plusieurs branches conditionnelles.',source:booksA,alternative:booksB},
  {id:'xslt-6',level:'Avancé',title:'Répartir le travail avec apply-templates',task:'Produisez un article par livre, avec un h2 pour son titre et un p pour son auteur.',
    starter:xslPage('<xsl:apply-templates select="bibliotheque/livre"/>','<xsl:template match="livre"><article><h2>À compléter</h2></article></xsl:template>'),
    solution:xslPage('<xsl:apply-templates select="bibliotheque/livre"/>','<xsl:template match="livre"><article><h2><xsl:value-of select="titre"/></h2><p><xsl:value-of select="auteur"/></p></article></xsl:template>'),
    hint:'Complétez le template match="livre" avec deux xsl:value-of pour titre et auteur.',
    explanation:'xsl:apply-templates délègue le traitement aux règles de modèle correspondant aux nœuds.',source:booksA,alternative:booksB}
];
const catalog: Record<Family, Exercise[]> = {xml:xmlExercises,dtd:dtdExercises,xpath:xpathExercises,xslt:xsltExercises};

const xmlGrade = (exercise: Exercise, code: string): Feedback => {
  const doc = xmlSafe(code);
  const root = doc.documentElement;
  const one = (selector: string) => root.querySelector(selector);
  switch(exercise.id) {
    case 'xml-1': return root.localName === 'bibliotheque' && norm(one('livre > titre')?.textContent || '') === 'XML'
      ? success('Imbrication correcte, racine et titre trouvés.') : fail('Vérifiez la racine bibliotheque et le chemin livre > titre avec le texte XML.');
    case 'xml-2': {
      const book=one('livre');
      return root.localName === 'bibliotheque' && book?.getAttribute('id') === 'l1' && book?.getAttribute('langue') === 'fr' && norm(book.querySelector('titre')?.textContent || '') === 'XML'
        ? success('Les deux attributs et le titre sont présents.') : fail('Il manque id="l1", langue="fr" ou le titre XML dans livre.');
    }
    case 'xml-3': {
      const titles=Array.from(root.querySelectorAll('livre > titre')).map(e=>norm(e.textContent||''));
      return root.localName === 'bibliotheque' && root.querySelectorAll('livre').length === 3 && ['XML','CSS','XPath'].every(v=>titles.includes(v)) && titles.length === 3
        ? success('La bibliothèque contient bien les trois livres demandés.') : fail('Il faut exactement trois livres possédant les titres XML, CSS et XPath.');
    }
    case 'xml-4': {
      const uri='urn:documents:catalogue';
      const book=root.children[0];
      const title=book?.children[0];
      return root.localName === 'catalogue' && root.namespaceURI === uri && book?.localName === 'livre' && book.namespaceURI === uri && title?.localName === 'titre' && title.namespaceURI === uri && norm(title.textContent||'') === 'XML'
        ? success('L’URI d’espace de noms est correctement portée par chaque élément.') : fail('La racine, livre et titre doivent appartenir à urn:documents:catalogue.');
    }
    case 'xml-5': return root.localName === 'message' && root.textContent === 'Jean & Sara <2026>' && root.children.length === 0
      ? success('Les entités sont interprétées en texte, sans balise parasite.') : fail('Le texte obtenu doit être exactement « Jean & Sara <2026> ». Protégez les caractères réservés.');
    case 'xml-6': {
      if(root.localName !== 'classe') return fail('L’élément racine doit être classe.');
      const students=Array.from(root.children);
      if(students.length !== 3 || students.some(e=>e.localName !== 'eleve')) return fail('La classe doit contenir exactement trois éléments eleve.');
      const ids=students.map(e=>e.getAttribute('id')||'');
      if(ids.some(v=>!v) || new Set(ids).size !== 3) return fail('Chaque élève doit avoir un identifiant id non vide et unique.');
      for(const student of students) {
        const name=norm(student.querySelector(':scope > nom')?.textContent||'');
        const grade=norm(student.querySelector(':scope > note')?.textContent||'');
        if(!name || !grade || !Number.isFinite(Number(grade)) || Number(grade)<0 || Number(grade)>20) return fail('Chaque élève doit comporter un nom et une note numérique entre 0 et 20.');
      }
      const salma=students.find(e=>e.getAttribute('id')==='e3');
      return norm(salma?.querySelector('nom')?.textContent||'') === 'Salma' && norm(salma?.querySelector('note')?.textContent||'') === '18'
        ? success('Trois élèves valides, identifiants distincts et nouvelle note vérifiée.') : fail('Ajoutez Salma avec id="e3" et note 18.');
    }
  }
  return fail('Exercice inconnu.');
};

const dtdModel = (text: string, element: string) => {
  const match = new RegExp('<!ELEMENT\\s+' + element + '\\s+([^>]+)>', 'i').exec(text);
  return match ? match[1].replace(/\s+/g, '').toUpperCase() : '';
};
const dtdGrade = (exercise: Exercise, code: string): Feedback => {
  if(/<!ELEMENT\s+[^>]*$|<!ATTLIST\s+[^>]*$/i.test(code)) return fail('Une déclaration DTD n’est pas fermée par >.');
  const expectedModel = (name: string, model: string) => dtdModel(code,name) === model.replace(/\s+/g,'').toUpperCase();
  switch(exercise.id) {
    case 'dtd-1': return expectedModel('catalogue','(livre+)') ? success('Le modèle exige au moins un livre.') : fail('Attendu : modèle de contenu (livre+) pour catalogue.');
    case 'dtd-2': return expectedModel('livre','(titre,auteur)') ? success('Séquence titre puis auteur correctement imposée.') : fail('Utilisez une virgule pour imposer titre puis auteur.');
    case 'dtd-3': {
      const match = /<!ATTLIST\s+livre\s+([^>]+)>/i.exec(code);
      const parts = (match?.[1]||'').trim().replace(/\s+/g,' ').toUpperCase();
      return /^ID ID #REQUIRED$/.test(parts) ? success('Attribut id déclaré de type ID et obligatoire.') : fail('Vérifiez le nom id, le type ID et le mot-clé #REQUIRED dans ATTLIST livre.');
    }
    case 'dtd-4': return expectedModel('titre','(#PCDATA)') ? success('Contenu textuel analysé déclaré.') : fail('Utilisez (#PCDATA) dans la déclaration de titre.');
    case 'dtd-5': return expectedModel('catalogue','(livre*)') ? success('Le modèle autorise aussi un catalogue vide.') : fail('Utilisez * après livre et non +.');
    case 'dtd-6': {
      const missing = [
        !expectedModel('livre','(titre,auteur?,prix)') && 'le modèle (titre,auteur?,prix)',
        !expectedModel('titre','(#PCDATA)') && 'la déclaration de titre en #PCDATA',
        !expectedModel('prix','(#PCDATA)') && 'la déclaration de prix en #PCDATA'
      ].filter(Boolean);
      return missing.length===0 ? success('Les trois déclarations et la cardinalité optionnelle sont correctes.') : fail('À corriger : '+missing.join(' ; ')+'.');
    }
  }
  return fail('Exercice inconnu.');
};
const xpathValue = (documentXml: Document, query: string, namespaces?: Record<string,string>): string => {
  const resolve = (prefix: string | null) => prefix ? namespaces?.[prefix] || documentXml.documentElement.lookupNamespaceURI(prefix) : null;
  const result = documentXml.evaluate(query, documentXml, resolve, XPathResult.ANY_TYPE, null);
  if(result.resultType===XPathResult.NUMBER_TYPE) return 'number:' + (Number.isNaN(result.numberValue)?'NaN':String(result.numberValue));
  if(result.resultType===XPathResult.STRING_TYPE) return 'string:'+result.stringValue;
  if(result.resultType===XPathResult.BOOLEAN_TYPE) return 'boolean:'+String(result.booleanValue);
  const nodes: string[]=[];
  let node: Node | null;
  while((node=result.iterateNext())) {
    if(nodes.length>500) throw new Error('Trop de nœuds (limite pédagogique : 500).');
    const segments:string[]=[];
    let part:Node|null=node;
    while(part && part.nodeType!==Node.DOCUMENT_NODE) {
      if(part.nodeType===Node.ELEMENT_NODE) {
        const element=part as Element;
        const parent=element.parentNode;
        const siblings:Element[]=parent?Array.from(parent.childNodes).filter((n):n is Element=>n.nodeType===Node.ELEMENT_NODE && (n as Element).localName===element.localName && (n as Element).namespaceURI===element.namespaceURI):[];
        segments.unshift('E:'+element.namespaceURI+':'+element.localName+':'+(siblings.indexOf(element)+1));
      } else if(part.nodeType===Node.ATTRIBUTE_NODE) {
        const attribute=part as Attr;
        segments.unshift('A:'+attribute.namespaceURI+':'+attribute.localName+':'+attribute.nodeValue);
        part=attribute.ownerElement;
        continue;
      } else {
        segments.unshift('N:'+part.nodeType+':'+part.nodeValue);
      }
      part=part.parentNode;
    }
    nodes.push(segments.join('/'));
  }
  return 'nodes:'+JSON.stringify(nodes);
};
const xpathGrade = (exercise: Exercise, code: string): Feedback => {
  for(const [index,fixture] of [exercise.source||'',exercise.alternative||''].entries()) {
    const doc=xmlSafe(fixture);
    const expected=xpathValue(doc,exercise.solution,exercise.namespaces);
    const actual=xpathValue(doc,code,exercise.namespaces);
    if(actual!==expected) return fail('La sélection ne correspond pas à l’objectif sur le jeu d’essai '+(index+1)+'. Vérifiez le type de résultat, les nœuds sélectionnés et leur ordre.');
  }
  return success('Expression correcte : les deux jeux d’essai, y compris les changements de données, produisent la sélection attendue.');
};
const booksIn = (xml: string) => Array.from(xmlSafe(xml).getElementsByTagName('livre')).map(book=>({
  title:norm(book.getElementsByTagName('titre')[0]?.textContent||''),
  author:norm(book.getElementsByTagName('auteur')[0]?.textContent||''),
  price:Number(book.getElementsByTagName('prix')[0]?.textContent||'0')
}));
const xsltGrade = (exercise: Exercise, code: string): Feedback => {
  const sheet=xmlSafe(code);
  if(sheet.documentElement.namespaceURI!=='http://www.w3.org/1999/XSL/Transform' || !['stylesheet','transform'].includes(sheet.documentElement.localName))
    return fail('La racine doit être xsl:stylesheet (ou xsl:transform) dans le namespace XSLT officiel.');
  for(const [index,fixture] of [exercise.source||'',exercise.alternative||''].entries()) {
    const {output:result}=transformXsltLocally(xmlSafe(fixture),sheet);
    if(result.getElementsByTagName('parsererror').length) return fail('La feuille n’a pas produit un document exploitable sur le jeu '+(index+1)+'.');
    const books=booksIn(fixture);
    const texts=(name:string)=>Array.from(result.getElementsByTagName(name)).map(node=>norm(node.textContent||''));
    let actual: string[]=[];
    let expected: string[]=[];
    if(exercise.id==='xslt-1') { actual=texts('h1'); expected=[books[0]?.title||'']; }
    if(exercise.id==='xslt-2') { actual=texts('li'); expected=books.map(b=>b.title); }
    if(exercise.id==='xslt-3') { actual=texts('li'); expected=books.filter(b=>b.price<30).map(b=>b.title); }
    if(exercise.id==='xslt-4') { actual=texts('li'); expected=books.map(b=>b.title).sort(); }
    if(exercise.id==='xslt-5') { actual=texts('li'); expected=books.map(b=>b.title+' : '+(b.price<30?'accessible':'premium')); }
    if(exercise.id==='xslt-6') {
      const articles=Array.from(result.getElementsByTagName('article'));
      actual=articles.map(node=>norm(node.getElementsByTagName('h2')[0]?.textContent||'')+'|'+norm(node.getElementsByTagName('p')[0]?.textContent||''));
      expected=books.map(b=>b.title+'|'+b.author);
    }
    if(actual.length!==expected.length || actual.some((item,i)=>item!==expected[i]))
      return fail('Le HTML produit ne correspond pas à l’objectif sur le jeu d’essai '+(index+1)+'. Attendu : '+JSON.stringify(expected)+'. Obtenu : '+JSON.stringify(actual)+'.');
  }
  return success('Transformation correcte : sortie HTML conforme sur les deux jeux d’essai, y compris des données différentes.');
};
function check(exercise:Exercise, family:Family, answer:string): Feedback {
  try {
    if(!answer.trim()) return fail('La réponse est vide. Commencez par écrire votre code.');
    if(family==='xml')return xmlGrade(exercise,answer);
    if(family==='dtd')return dtdGrade(exercise,answer);
    if(family==='xpath')return xpathGrade(exercise,answer);
    return xsltGrade(exercise,answer);
  } catch(error) {
    return fail('Impossible de valider la réponse : '+(error instanceof Error?error.message:String(error)));
  }
}
const familyNames:Record<Family,string> = {xml:'XML',dtd:'DTD',xpath:'XPath 1.0',xslt:'XSLT 1.0'};
const familyHints:Record<Family,string> = {
  xml:'La correction vérifie la bonne formation et les critères structurels de chaque exercice ; elle ne certifie pas une validation DTD/XSD.',
  dtd:'Contrôle pédagogique ciblé des déclarations ELEMENT et ATTLIST, pas validation DTD normative ni analyse de tous les modèles possibles.',
  xpath:'La réponse est exécutée avec le moteur XPath 1.0 du navigateur sur deux jeux de données. Les variantes équivalentes sont acceptées si elles produisent les mêmes nœuds ou valeurs.',
  xslt:'La feuille est exécutée sur deux jeux de données. Si le moteur natif XSLT 1.0 manque, un interpréteur pédagogique local prend en charge les principales instructions du cours (ce n’est pas un moteur XSLT 1.0 complet).'
};

export const StructuredChallenges: React.FC<{family:Family}> = ({family}) => {
  const exercises=catalog[family];
  const [index,setIndex]=useState(0);
  const [answer,setAnswer]=useState(exercises[0].starter);
  const [feedback,setFeedback]=useState<Feedback|null>(null);
  const [hints,setHints]=useState(false);
  const [solutionOpen,setSolutionOpen]=useState(false);
  const [solutionViewed,setSolutionViewed]=useState(false);
  const [attempts,setAttempts]=useState(0);
  const [completed,setCompleted]=useState<string[]>(()=>{
    try {
      const stored=JSON.parse(localStorage.getItem('ds-challenges-'+family+'-v1')||'[]');
      return Array.isArray(stored)?stored.filter((id:unknown)=>typeof id==='string' && exercises.some(e=>e.id===id)):[];
    } catch { return []; }
  });
  const active=exercises[index];
  const choose=(next:number)=>{
    if(next<0 || next>=exercises.length)return;
    setIndex(next);setAnswer(exercises[next].starter);setFeedback(null);setHints(false);setSolutionOpen(false);setSolutionViewed(false);setAttempts(0);
  };
  const evaluate=()=>{
    const result=check(active,family,answer);
    setFeedback(result);setAttempts(n=>n+1);
    if(result.ok && !solutionViewed && !completed.includes(active.id)) {
      const next=[...completed,active.id];
      setCompleted(next);
      try{localStorage.setItem('ds-challenges-'+family+'-v1',JSON.stringify(next));}catch{/* Stockage privé facultatif. */}
    }
  };
  return <section data-testid={'structured-challenges-'+family} aria-label={'Exercices autocorrigés '+familyNames[family]} className="rounded-2xl border border-sky-200 dark:border-sky-900 bg-white dark:bg-slate-900 p-3 sm:p-5 space-y-4 shadow-sm">
    <div className="flex flex-wrap justify-between items-start gap-2">
      <div>
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-300">Parcours pratique · autocorrection</span>
        <h3 className="text-lg font-black text-slate-900 dark:text-white">Défis interactifs {familyNames[family]}</h3>
        <p className="text-xs text-slate-600 dark:text-slate-300">{exercises.length} défis progressifs : écrire, tester, corriger, recommencer.</p>
      </div>
      <div role="status" className="rounded-lg bg-sky-50 dark:bg-sky-950/40 px-3 py-2 text-xs font-bold text-sky-800 dark:text-sky-200">Réussis sans solution : {completed.length}/{exercises.length}</div>
    </div>
    <div aria-label="Progression des défis" className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
      <div className="h-full bg-emerald-500 transition-all" style={{width:(completed.length/exercises.length*100)+'%'}}/>
    </div>
    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">Choisir un défi
      <select aria-label={'Choisir un défi '+familyNames[family]} value={index} onChange={e=>choose(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm">
        {exercises.map((exercise,i)=><option key={exercise.id} value={i}>{completed.includes(exercise.id)?'✓ ':''}{i+1}. {exercise.level} — {exercise.title}</option>)}
      </select>
    </label>
    <div className="flex flex-wrap gap-2 items-center text-xs">
      <span className="rounded-full border border-indigo-200 dark:border-indigo-800 px-2 py-1 font-bold text-indigo-700 dark:text-indigo-300">{active.level}</span>
      <span className="text-slate-500 dark:text-slate-400">Exercice {index+1} sur {exercises.length} · Essais : {attempts}</span>
      {completed.includes(active.id)&&<span className="text-emerald-700 dark:text-emerald-300 font-bold">✓ Réussi</span>}
    </div>
    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 px-3 py-3">
      <h4 className="font-black text-sm text-slate-900 dark:text-white">{active.title}</h4>
      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{active.task}</p>
    </div>
    <div className={active.source?'grid grid-cols-1 lg:grid-cols-2 gap-3':'space-y-3'}>
      {active.source&&<div>
        <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">Document XML de référence (lecture seule)</p>
        <pre className="rounded-xl border border-slate-700 bg-[#171e2b] p-3 min-h-44 max-h-80 overflow-auto text-xs leading-relaxed font-mono text-emerald-200 whitespace-pre-wrap break-all">{active.source}</pre>
        {active.alternative&&<p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">La correction utilise également un second document avec des données différentes.</p>}
      </div>}
      <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
        {family==='xpath'?'Votre expression XPath':family==='dtd'?'Vos déclarations DTD':family==='xslt'?'Votre feuille XSLT':'Votre document XML'}
        <textarea aria-label={'Réponse '+familyNames[family]} spellCheck={false} value={answer} onChange={e=>{setAnswer(e.target.value);setFeedback(null);}}
          className="mt-1.5 w-full min-h-44 h-56 lg:h-72 resize-y rounded-xl border border-slate-700 bg-[#171e2b] text-slate-100 p-3 font-mono text-xs leading-5 focus-visible:outline-2 focus-visible:outline-sky-500"/>
      </label>
    </div>
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={evaluate} className="rounded-lg bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 text-xs font-black">Vérifier ma réponse</button>
      <button type="button" onClick={()=>{setAnswer(active.starter);setFeedback(null);setSolutionOpen(false);setHints(false);}} className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800">Recommencer</button>
      <button type="button" onClick={()=>setHints(!hints)} aria-expanded={hints} className="rounded-lg border border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-200 px-3 py-2 text-xs font-bold">{hints?'Masquer l’indice':'Voir un indice'}</button>
      <button type="button" onClick={()=>{if(!solutionOpen)setSolutionViewed(true);setSolutionOpen(!solutionOpen);}} aria-expanded={solutionOpen} className="rounded-lg border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 px-3 py-2 text-xs font-bold">{solutionOpen?'Masquer le corrigé':'Voir le corrigé'}</button>
    </div>
    {hints&&<p className="rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-2 text-xs text-indigo-900 dark:text-indigo-200"><strong>Indice :</strong> {active.hint}</p>}
    {feedback&&<div data-testid="exercise-feedback" role={feedback.ok?'status':'alert'} className={'rounded-lg border px-3 py-3 text-sm '+(feedback.ok?'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200':'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200')}>
      <strong>{feedback.ok?'✓ Objectif atteint. ':'À corriger. '}</strong>{feedback.message}
      {feedback.ok&&solutionViewed&&<p className="text-xs mt-1">La solution ayant été consultée, cet essai ne compte pas dans la progression autonome.</p>}
    </div>}
    {solutionOpen&&<div className="rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20 p-3 space-y-2">
      <strong className="text-xs text-amber-900 dark:text-amber-200">Corrigé commenté (consulté : réussite non comptabilisée)</strong>
      <pre className="rounded-lg bg-[#171e2b] p-3 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-slate-100 max-h-72">{active.solution}</pre>
      <p className="text-xs text-amber-900 dark:text-amber-200">{active.explanation}</p>
    </div>}
    {feedback?.ok&&!solutionOpen&&<p className="text-xs text-slate-700 dark:text-slate-300"><strong>À retenir :</strong> {active.explanation}</p>}
    <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-3">
      <button type="button" onClick={()=>choose(index-1)} disabled={index===0} className="text-xs font-bold px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40">← Précédent</button>
      <button type="button" onClick={()=>choose(index+1)} disabled={index===exercises.length-1} className="text-xs font-bold px-3 py-2 rounded-lg bg-sky-700 text-white disabled:opacity-40">Défi suivant →</button>
    </div>
    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{familyHints[family]} La progression est enregistrée uniquement dans ce navigateur.</p>
  </section>;
};
