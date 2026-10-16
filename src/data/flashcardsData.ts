import { Flashcard } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc1',
    languageId: 'html',
    category: 'Architecture Web',
    question: 'Qu\'est-ce que le DOM (Document Object Model) ?',
    answer: 'C\'est l\'arborescence d\'objets vivante générée en mémoire vive par le navigateur à partir du code HTML brut. Chaque élément HTML devient un nœud pouvant être manipulé dynamiquement via JavaScript ou stylisé via CSS.',
    hint: 'Pensez à une structure en arbre (racine <html>, branches <body>, feuilles <p>)'
  },
  {
    id: 'fc2',
    languageId: 'html',
    category: 'Sémantique',
    question: 'Pourquoi préférer <nav> à <div class="menu"> ?',
    answer: 'La balise <nav> apporte du sens sémantique universel : les lecteurs d\'écran pour aveugles peuvent proposer de "sauter directement au menu", et les robots d\'indexation comprennent qu\'il s\'agit de la navigation principale du site.',
    hint: 'Accessibilité (A11y) et référencement (SEO)'
  },
  {
    id: 'fc3',
    languageId: 'xml',
    category: 'Validation',
    question: 'Quelle est la différence entre DTD et XSD ?',
    answer: 'Une DTD (Document Type Definition) utilise une syntaxe compacte héritée de SGML sans typage fin (tout est texte). Un schéma XSD (XML Schema Definition) s\'écrit lui-même en XML valide et propose un système de typage complet (entiers, dates, regex, plages de valeurs, cardinalités min/max).',
    hint: 'L\'un s\'écrit en XML et gère les types précis (XSD), l\'autre est plus ancien (DTD)'
  },
  {
    id: 'fc4',
    languageId: 'xml',
    category: 'Outils & Navigation',
    question: 'À quoi servent XPath et XSLT ?',
    answer: 'XPath est un langage de requêtes qui permet de localiser et cibler avec précision des nœuds dans l\'arbre XML. XSLT est un langage de transformation qui utilise XPath pour convertir un document XML vers un autre format (comme du HTML ou du texte).',
    hint: 'XPath = sélection/navigation, XSLT = transformation'
  },
  {
    id: 'fc5',
    languageId: 'json',
    category: 'Syntaxe & Règles',
    question: 'Pourquoi les commentaires sont-ils proscrits en JSON ?',
    answer: 'Douglas Crockford a délibérément exclu les commentaires pour garantir que JSON reste un format d\'échange de données pur, immuable et sans ambiguïté entre systèmes hétérogènes, évitant que des développeurs n\'y glissent des instructions de parsing cachées.',
    hint: 'Simplicité absolue et neutralité d\'échange'
  },
  {
    id: 'fc6',
    languageId: 'json',
    category: 'JavaScript',
    question: 'Quelle est la différence entre JSON.stringify() et JSON.parse() ?',
    answer: 'JSON.stringify(objet) convertit un objet JavaScript en mémoire vers une chaîne de texte JSON (sérialisation). JSON.parse(texte) analyse une chaîne JSON valide et la reconstitue en objet JavaScript (désérialisation).',
    hint: 'Stringify = Objet vers Texte ; Parse = Texte vers Objet'
  },
  {
    id: 'fc7',
    languageId: 'markdown',
    category: 'Standards',
    question: 'Qu\'apporte CommonMark au monde Markdown ?',
    answer: 'La spécification originale de Markdown présentait de nombreuses ambiguïtés d\'interprétation. CommonMark est un standard rigoureux accompagné de centaines de tests unitaires pour assurer qu\'un document Markdown produira exactement le même HTML quel que soit le parseur utilisé.',
    hint: 'Standardisation et fin des incohérences'
  },
  {
    id: 'fc8',
    languageId: 'latex',
    category: 'Philosophie',
    question: 'Que signifie le principe WYSIWYM de LaTeX ?',
    answer: 'What You See Is What You Mean (Ce que vous voyez est ce que vous voulez dire). L\'auteur spécifie la signification structurelle de son texte (titre, équation, lemme, citation), et délègue l\'intégralité des décisions de rendu typographique aux algorithmes de haute précision de TeX.',
    hint: 'Opposition directe au principe WYSIWYG de Microsoft Word'
  },
  {
    id: 'fc9',
    languageId: 'latex',
    category: 'Commandes',
    question: 'Comment insérer une fraction et une racine carrée en LaTeX ?',
    answer: 'On utilise \\frac{numérateur}{dénominateur} pour la fraction, et \\sqrt{expression} (ou \\sqrt[n]{x} pour la racine n-ième). Elles doivent toujours se trouver à l\'intérieur du mode mathématique ($...$).',
    codeSnippet: '$\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$'
  },
  {
    id: 'fc10',
    languageId: 'css',
    category: 'Spécificité',
    question: 'Comment se calcule le poids de spécificité d\'un sélecteur CSS ?',
    answer: 'On compte les composantes : (Styles en ligne style="") > (Nombre d\'IDs #id) > (Nombre de classes .class, pseudo-classes :hover et attributs [attr]) > (Nombre d\'éléments h1, p et pseudo-éléments ::before).',
    hint: 'En règle générale : ID (100) bat Classe (10) qui bat Balise (1)'
  },
  {
    id: 'fc11',
    languageId: 'css',
    category: 'Box Model',
    question: 'Quelle est la différence entre Margin et Padding ?',
    answer: 'Le Padding est la marge interne, située à l\'intérieur de la bordure : il prend la couleur d\'arrière-plan de l\'élément. Le Margin est la marge externe, située à l\'extérieur de la bordure : elle crée de l\'espace libre entre cet élément et les éléments voisins.',
    hint: 'Padding = dedans, Margin = dehors'
  },
  {
    id: 'fc12',
    languageId: 'yaml',
    category: 'DevOps',
    question: 'Pourquoi YAML est-il le format roi de Kubernetes et Docker ?',
    answer: 'Parce qu\'il permet de rédiger des configurations très lisibles sans surcharge visuelle de parenthèses ou guillemets, et surtout parce qu\'il permet d\'ajouter des commentaires explicatifs (#) cruciaux pour documenter les choix d\'infrastructure.',
    hint: 'Lisibilité naturelle + support des commentaires'
  }
];
