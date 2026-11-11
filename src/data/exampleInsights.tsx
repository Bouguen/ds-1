import type { ExtendedExample } from './extendedExamples';

type Insight = {
  purpose: string;
  reading: string[];
  practice: string[];
  cautions: string[];
  glossary: [string,string][];
};

export const LEARNING_INSIGHTS:Record<string,Insight> = {
  html:{
    purpose:'Structurer une page autour de son contenu, avec des éléments porteurs de sens pour le navigateur, les moteurs de recherche et les technologies d’assistance.',
    reading:['Repérer la racine, les éléments parents et enfants, puis l’ordre logique du document.','Distinguer les éléments sémantiques (main, article, nav, section) des conteneurs génériques.','Observer les attributs : id, class, href, aria-label, lang ou alt, selon les éléments présents.'],
    practice:['Modifier un titre, une liste ou un lien et examiner immédiatement le rendu.','Vérifier les étiquettes des formulaires, les titres de tableaux et l’utilisation du clavier.'],
    cautions:['Un rendu visuellement correct ne garantit pas l’accessibilité.','Les formulaires affichés dans un aperçu isolé ne sont pas reliés à un serveur.'],
    glossary:[['Élément','Unité du DOM définie par une balise et son contenu.'],['Attribut','Information associée à un élément, comme href ou id.'],['Sémantique','Sens exprimé par la structure du document.']]
  },
  css:{
    purpose:'Définir la présentation indépendamment du document : couleurs, espace, typographie, dispositions responsives et états interactifs.',
    reading:['Identifier le sélecteur avant les accolades : type, classe, identifiant ou combinaison.','Repérer les déclarations propriété: valeur et leur séparateur point-virgule.','Relier la règle aux éléments de la page de test, puis apprécier la cascade et la spécificité.'],
    practice:['Changer une couleur ou une marge puis comparer le résultat.','Essayer une disposition Grid ou Flexbox et réduire la largeur de l’aperçu.'],
    cautions:['Une règle qui ne correspond à aucun élément ne produit aucun effet visible.','Respecter les contrastes et les préférences de réduction du mouvement.'],
    glossary:[['Sélecteur','Expression qui identifie les éléments ciblés.'],['Cascade','Mécanisme déterminant la règle finalement appliquée.'],['Responsive','Adaptation de la présentation à la largeur disponible.']]
  },
  xml:{
    purpose:'Décrire un arbre de données à l’aide de balises personnalisées, d’attributs, de textes et, éventuellement, d’espaces de noms.',
    reading:['Trouver l’élément racine puis ses descendants.','Repérer les identifiants, attributs et valeurs textuelles.','Vérifier les balises fermées, l’imbrication et l’échappement des caractères spéciaux.'],
    practice:['Ajouter un élément frère et contrôler que la racine reste unique.','Afficher l’arborescence et imaginer les contraintes d’un schéma DTD/XSD.'],
    cautions:['XML bien formé ne signifie pas XML valide contre une DTD ou un XSD.','Un espace de noms change l’identité des éléments, pas uniquement leur préfixe visible.'],
    glossary:[['Racine','Élément englobant tous les autres.'],['Bien formé','Conforme aux contraintes syntaxiques XML.'],['Valide','Conforme à une grammaire ou un schéma choisi.']]
  },
  markdown:{
    purpose:'Produire rapidement des documents lisibles en texte brut, avec une structure de titres, listes, citations, liens et extraits de code.',
    reading:['Observer les marqueurs # pour les titres et les tirets pour les listes.','Identifier les accents graves pour le code en ligne ou les blocs de code.','Distinguer la syntaxe Markdown de ses extensions, comme les tableaux et cases à cocher.'],
    practice:['Ajouter un niveau de titre et conserver la hiérarchie.','Écrire une procédure numérotée et un bloc de code clairement délimité.'],
    cautions:['Le rendu varie selon le moteur Markdown utilisé.','L’aperçu de base ne reproduit pas nécessairement toutes les extensions CommonMark/GFM.'],
    glossary:[['Markup léger','Marqueurs texte simples donnant une structure.'],['Bloc de code','Zone dans laquelle les caractères sont présentés comme du code.'],['CommonMark','Spécification visant un comportement Markdown cohérent.']]
  },
  latex:{
    purpose:'Composer des formules et documents scientifiques avec une syntaxe expressive pour les fractions, indices, matrices, sommes et intégrales.',
    reading:['Repérer les commandes précédées d’une barre oblique inverse, comme frac ou sqrt.','Étudier la portée des accolades : elles délimitent les arguments.','Distinguer les environnements entre begin et end des commandes simples.'],
    practice:['Modifier un exposant, un indice ou une fraction.','Composer une matrice ou une équation en testant la syntaxe KaTeX.'],
    cautions:['KaTeX affiche des mathématiques ; il ne compile pas un document LaTeX complet.','Une formule bien rendue n’est pas automatiquement correcte sur le plan mathématique.'],
    glossary:[['Commande','Instruction LaTeX précédée de \\.'],['Argument','Contenu transmis à une commande, souvent entre accolades.'],['Environnement','Bloc spécialisé, par exemple une matrice.']]
  },
  json:{
    purpose:'Échanger des données structurées entre systèmes, avec objets, tableaux, chaînes, nombres, booléens et valeurs nulles.',
    reading:['Identifier les accolades des objets et les crochets des tableaux.','Vérifier les clés entre guillemets doubles et les séparateurs virgule/deux-points.','Comparer les types : chaîne, nombre, vrai/faux, null, objet ou tableau.'],
    practice:['Ajouter un élément à un tableau sans créer de virgule finale.','Modifier un objet imbriqué et vérifier la représentation mise en forme.'],
    cautions:['Un JSON syntaxiquement correct peut violer le contrat d’une API.','Les commentaires et virgules finales ne font pas partie de la syntaxe JSON standard.'],
    glossary:[['Objet','Ensemble de paires nom/valeur.'],['Tableau','Suite ordonnée de valeurs.'],['JSON Schema','Langage distinct permettant de décrire et valider une structure JSON.']]
  },
  yaml:{
    purpose:'Rédiger des configurations et données lisibles en utilisant des mappings, séquences et indentations.',
    reading:['Comparer les niveaux d’indentation et les deux-points des mappings.','Observer les tirets de listes et les scalaires.','Distinguer les chaînes entre guillemets des valeurs pouvant être interprétées comme types particuliers.'],
    practice:['Ajouter un élément de liste sans changer son niveau.','Créer un mapping imbriqué et vérifier la cohérence des espaces.'],
    cautions:['L’atelier de base affiche l’indentation, il n’effectue pas une validation YAML complète.','Certaines valeurs ambiguës peuvent être interprétées différemment selon la version du parseur.'],
    glossary:[['Mapping','Association de clés à des valeurs.'],['Séquence','Liste de valeurs précédées de tirets.'],['Scalaire','Valeur élémentaire, comme un texte ou un nombre.']]
  },
  xhtml:{
    purpose:'Associer la sémantique HTML à la rigueur lexicale XML, avec balises fermées et espace de noms XHTML.',
    reading:['Repérer l’espace de noms http://www.w3.org/1999/xhtml.','Vérifier l’imbrication stricte, y compris les éléments vides.','Comprendre la distinction entre la sérialisation XML et un document servi comme text/html.'],
    practice:['Corriger une balise non fermée ou un attribut sans guillemets.','Ajouter un élément en conservant une racine unique.'],
    cautions:['La bonne formation XML n’est pas une validation exhaustive de XHTML.','Les caractères & et < doivent être échappés dans les contenus concernés.'],
    glossary:[['Sérialisation','Écriture d’un arbre dans une syntaxe donnée.'],['Namespace','Identité XML du vocabulaire d’éléments.']]
  },
  dtd:{
    purpose:'Définir la grammaire d’un document XML : éléments autorisés, ordre, cardinalités et attributs.',
    reading:['Identifier ELEMENT, ATTLIST et les modèles de contenu.','Distinguer +, * et ? pour les répétitions ou absences possibles.','Repérer #REQUIRED, #IMPLIED et les types d’attributs.'],
    practice:['Rendre un élément facultatif puis comparer les contenus autorisés.','Ajouter un identifiant obligatoire à une entrée.'],
    cautions:['Le navigateur ne fournit pas ici un validateur DTD complet.','Les contraintes numériques fines demandent généralement d’autres systèmes, notamment XSD.'],
    glossary:[['DTD','Document Type Definition.'],['Cardinalité','Nombre autorisé d’occurrences.'],['Modèle de contenu','Règle définissant les enfants possibles.']]
  },
  entities:{
    purpose:'Comprendre les références de caractères et les entités XML déclarées et réutilisées dans des documents.',
    reading:['Repérer les références prédéfinies comme &amp; et &lt;.','Identifier une déclaration interne et ses références par nom.','Distinguer références numériques et entités textuelles nommées.'],
    practice:['Échapper un caractère réservé et voir l’effet sur le texte.','Modifier une déclaration interne en gardant les références cohérentes.'],
    cautions:['Le traitement des entités dépend du parseur et du contexte XML.','Éviter les entités externes non fiables à cause des risques d’accès à des ressources.'],
    glossary:[['Entité interne','Substitution définie à l’intérieur du document.'],['Référence numérique','Notation désignant un caractère Unicode.']]
  },
  xpath:{
    purpose:'Rechercher des nœuds et calculer des valeurs à partir d’un document XML, sans modifier sa structure.',
    reading:['Repérer le chemin / ou // et les noms d’éléments.','Étudier les prédicats entre crochets et les tests d’attribut avec @.','Identifier les fonctions comme count, string et number.'],
    practice:['Modifier le prédicat pour sélectionner un autre sous-ensemble.','Compter les éléments qui répondent à un critère.'],
    cautions:['Le moteur intégré à la plateforme utilise XPath 1.0.','Les requêtes guidées s’appliquent à un XML de démonstration fixe, sauf dans le laboratoire XPath dédié.'],
    glossary:[['Prédicat','Filtre entre crochets.'],['Axe','Relation utilisée pour parcourir l’arbre.'],['Nœud','Élément, attribut ou autre unité du modèle de données.']]
  },
  xslt:{
    purpose:'Transformer un document XML selon des modèles et produire une sortie XML, HTML ou texte.',
    reading:['Identifier xsl:stylesheet et sa version.','Distinguer template match, value-of select et apply-templates.','Vérifier le contexte de sélection XPath de chaque instruction.'],
    practice:['Changer l’élément HTML émis par un modèle.','Filtrer ou trier des éléments avec des instructions XSLT 1.0.'],
    cautions:['La transformation native dépend du navigateur ; XSLT 2.0 et 3.0 requièrent un autre moteur.','Une feuille XSLT complète est nécessaire pour produire une véritable transformation.'],
    glossary:[['Template','Règle applicable à des nœuds sélectionnés.'],['Processeur','Moteur qui applique les règles XSLT.'],['Sortie','Document ou texte résultant de la transformation.']]
  }
};

export function ExampleLearningGuide({item}:{item:ExtendedExample}) {
  const insight=LEARNING_INSIGHTS[item.language];
  if(!insight)return null;
  return <div className="space-y-5 text-sm leading-relaxed">
    <section className="space-y-2">
      <h4 className="font-black text-slate-900 dark:text-slate-100">Pourquoi cet exemple est utile</h4>
      <p className="text-slate-700 dark:text-slate-300">{insight.purpose}</p>
      <p className="text-slate-700 dark:text-slate-300"><strong>Dans cet exemple :</strong> {item.explanation}</p>
      {item.audience&&<p className="text-slate-600 dark:text-slate-300"><strong>Situation / public :</strong> {item.audience}</p>}
    </section>
    <section className="space-y-2">
      <h4 className="font-black text-slate-900 dark:text-slate-100">Comment lire le code, étape par étape</h4>
      <ol className="list-decimal pl-5 space-y-1 text-slate-700 dark:text-slate-300">{insight.reading.map(line=><li key={line}>{line}</li>)}</ol>
    </section>
    <section className="grid sm:grid-cols-2 gap-3">
      <div className="rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 p-3">
        <h4 className="font-black text-sky-900 dark:text-sky-200 mb-2">Essais recommandés</h4>
        <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">{[item.challenge,...insight.practice].filter(Boolean).map((line,i)=><li key={i}>{line}</li>)}</ul>
        {item.expectedOutcome&&<p className="mt-3"><strong>Résultat attendu :</strong> {item.expectedOutcome}</p>}
      </div>
      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-3">
        <h4 className="font-black text-amber-900 dark:text-amber-200 mb-2">Précautions et limites</h4>
        <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">{insight.cautions.map(line=><li key={line}>{line}</li>)}</ul>
      </div>
    </section>
    <section>
      <h4 className="font-black text-slate-900 dark:text-slate-100 mb-2">Vocabulaire à retenir</h4>
      <dl className="grid sm:grid-cols-2 gap-2">{insight.glossary.map(([term,definition])=><div key={term} className="rounded-lg border border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-900"><dt className="font-bold">{term}</dt><dd className="mt-1 text-slate-600 dark:text-slate-300 text-xs">{definition}</dd></div>)}</dl>
    </section>
    <section className="border-t border-slate-200 dark:border-slate-700 pt-3 text-xs text-slate-500 dark:text-slate-400">
      <strong>Origine de cet exemple :</strong> {item.source}. Les explications didactiques sont fournies par le portail ; elles ne constituent pas une validation officielle d’une norme.
    </section>
  </div>;
}
