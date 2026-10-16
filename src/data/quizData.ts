import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    languageId: 'html',
    question: 'Quelle balise HTML5 est la plus appropriée pour encadrer un article de blog autonome distribuable séparément ?',
    options: ['<div>', '<article>', '<section>', '<aside>'],
    correctIndex: 1,
    explanation: '<article> est une balise sémantique HTML5 destinée à contenir une composition autonome pouvant être réutilisée ou syndiquée (ex: article de journal, billet de blog, commentaire).',
    difficulty: 'Facile'
  },
  {
    id: 'q2',
    languageId: 'html',
    question: 'Quel est l\'effet de l\'attribut "alt" sur une balise <img> ?',
    options: [
      'Il définit la légende affichée sous l\'image',
      'Il fournit un texte alternatif pour l\'accessibilité (lecteurs d\'écran) et en cas d\'échec de chargement',
      'Il ajuste la hauteur automatique de l\'image',
      'Il ajoute un encadrement esthétique à l\'image'
    ],
    correctIndex: 1,
    explanation: 'L\'attribut alt (alternative text) est un pilier de l\'accessibilité numérique (WCAG) pour les personnes malvoyantes et est indexé par les moteurs de recherche.',
    difficulty: 'Facile'
  },
  {
    id: 'q3',
    languageId: 'xml',
    question: 'Quelle est la différence fondamentale entre un document XML "bien formé" (well-formed) et un document XML "valide" (valid) ?',
    options: [
      'Un document bien formé a été compressé en binaire, alors qu\'un document valide est en texte brut',
      'Un document bien formé respecte la syntaxe générale XML, tandis qu\'un document valide est en plus conforme à une DTD ou un Schéma XSD',
      'Un document valide ne peut contenir aucun attribut',
      'Il n\'y a aucune différence, ce sont deux termes strictement synonymes'
    ],
    correctIndex: 1,
    explanation: 'La bonne formation (well-formedness) garantit les règles de base (racine unique, balises fermées). La validité (validity) impose en plus le respect du contrat défini par un Schéma XSD ou une DTD.',
    difficulty: 'Moyen'
  },
  {
    id: 'q4',
    languageId: 'xml',
    question: 'En XML, laquelle de ces propositions est STRICTEMENT interdite par la norme ?',
    options: [
      'Créer des balises personnalisées comme <etudiant>',
      'Avoir plusieurs éléments racines au premier niveau du document',
      'Utiliser des attributs dans les balises',
      'Ajouter des commentaires avec <!-- -->'
    ],
    correctIndex: 1,
    explanation: 'Un document XML doit comporter UN et UN SEUL élément racine englobant tout le reste du document.',
    difficulty: 'Facile'
  },
  {
    id: 'q5',
    languageId: 'json',
    question: 'Lequel de ces extraits est du JSON parfaitement valide selon la spécification RFC 8259 ?',
    codeSnippet: 'A: { "nom": "Dupont", "age": 20, }\nB: { \'nom\': \'Dupont\', \'age\': 20 }\nC: { "nom": "Dupont", "age": 20 }\nD: { nom: "Dupont", age: 20 }',
    options: ['Extrait A', 'Extrait B', 'Extrait C', 'Extrait D'],
    correctIndex: 2,
    explanation: 'En JSON strict : les clés doivent être entre guillemets doubles (pas simples ni nues), et les virgules finales traînantes (trailing commas) sont strictement interdites.',
    difficulty: 'Moyen'
  },
  {
    id: 'q6',
    languageId: 'json',
    question: 'Parmi les types de données suivants, lequel N\'EST PAS un type primitif supporté nativement par JSON ?',
    options: ['Boolean (true/false)', 'Date', 'Number', 'String'],
    correctIndex: 1,
    explanation: 'JSON ne possède pas de type Date natif ! Les dates sont généralement transmises sous forme de chaînes de caractères au format ISO 8601 ("2025-10-15T12:00:00Z") ou de timestamps numériques.',
    difficulty: 'Moyen'
  },
  {
    id: 'q7',
    languageId: 'markdown',
    question: 'Quelle est la syntaxe standard en Markdown pour insérer un lien hypertexte avec un texte cliquable ?',
    options: [
      '<lien url="https://exemple.fr">Mon Site</lien>',
      '[Mon Site](https://exemple.fr)',
      '(Mon Site)[https://exemple.fr]',
      'https://exemple.fr{Mon Site}'
    ],
    correctIndex: 1,
    explanation: 'La syntaxe Markdown est [Texte visible](URL de destination). Si on place un point d\'exclamation devant ![Texte alt](URL), cela devient une image !',
    difficulty: 'Facile'
  },
  {
    id: 'q8',
    languageId: 'markdown',
    question: 'Quel outil universel développé par John MacFarlane est la référence absolue pour convertir un document Markdown en HTML, LaTeX, PDF ou DOCX ?',
    options: ['Pandoc', 'Webpack', 'Babel', 'Docker'],
    correctIndex: 0,
    explanation: 'Pandoc est surnommé le « couteau suisse » de la conversion documentaire, capable de transformer plus de 40 formats de documents les uns vers les autres.',
    difficulty: 'Facile'
  },
  {
    id: 'q9',
    languageId: 'latex',
    question: 'Pour afficher une équation mathématique centrée sur sa propre ligne avec numérotation en LaTeX, quel environnement utilise-t-on ?',
    options: ['\\begin{center}', '\\begin{equation}', '\\begin{math}', '\\begin{align*}'],
    correctIndex: 1,
    explanation: 'L\'environnement \\begin{equation} ... \\end{equation} affiche la formule en bloc centré et lui attribue automatiquement un numéro de référence.',
    difficulty: 'Facile'
  },
  {
    id: 'q10',
    languageId: 'latex',
    question: 'Qui est l\'auteur principal de LaTeX, qui a bâti ce système au-dessus du moteur TeX créé par Donald Knuth ?',
    options: ['Tim Berners-Lee', 'Leslie Lamport', 'Douglas Crockford', 'Håkon Wium Lie'],
    correctIndex: 1,
    explanation: 'LaTeX a été conçu au début des années 1980 par Leslie Lamport (le "La" de LaTeX provient de son nom de famille) au-dessus de TeX.',
    difficulty: 'Moyen'
  },
  {
    id: 'q11',
    languageId: 'css',
    question: 'Dans le modèle de boîte (Box Model) CSS, quel est l\'ordre correct des couches depuis le contenu vers l\'extérieur ?',
    options: [
      'Content → Border → Padding → Margin',
      'Content → Padding → Border → Margin',
      'Content → Margin → Border → Padding',
      'Margin → Border → Padding → Content'
    ],
    correctIndex: 1,
    explanation: 'Le modèle de boîte concentrique se compose de : Contenu (Content) → Marge interne (Padding) → Bordure (Border) → Marge externe (Margin).',
    difficulty: 'Facile'
  },
  {
    id: 'q12',
    languageId: 'css',
    question: 'Lequel de ces sélecteurs CSS a la plus forte spécificité (poids le plus élevé) en cas de conflit ?',
    codeSnippet: '1: p.texte\n2: #titre-principal\n3: body div p\n4: .carte .description',
    options: ['p.texte', '#titre-principal', 'body div p', '.carte .description'],
    correctIndex: 1,
    explanation: 'Les sélecteurs par ID (#id) l\'emportent largement sur les classes (.classe), qui elles-mêmes l\'emportent sur les sélecteurs de balises (div, p).',
    difficulty: 'Moyen'
  },
  {
    id: 'q13',
    languageId: 'css',
    question: 'Pourquoi est-il fortement recommandé de déclarer "box-sizing: border-box" sur tous les éléments d\'un projet web ?',
    options: [
      'Pour forcer toutes les bordures à devenir invisibles',
      'Pour que le padding et la bordure soient inclus dans la largeur (width) totale spécifiée, évitant les débordements',
      'Pour rendre le site compatible avec Internet Explorer 6',
      'Pour désactiver les marges externes'
    ],
    correctIndex: 1,
    explanation: 'Avec content-box (défaut historique), un élément avec width: 100% et padding: 20px déborde de l\'écran ! Avec border-box, le padding est absorbé à l\'intérieur de la largeur fixée.',
    difficulty: 'Moyen'
  },
  {
    id: 'q14',
    languageId: 'yaml',
    question: 'Quelle règle d\'indentation stricte régit impérativement les fichiers YAML ?',
    options: [
      'On doit toujours utiliser la touche Tabulation',
      'Les tabulations sont strictement interdites ; on doit obligatoirement utiliser des espaces',
      'L\'indentation doit être exactement de 7 espaces par niveau',
      'L\'indentation n\'a aucune importance en YAML'
    ],
    correctIndex: 1,
    explanation: 'La spécification YAML proscrit formellement les tabulations (\\t) pour la structure hiérarchique, car chaque éditeur de texte peut leur attribuer une largeur différente.',
    difficulty: 'Moyen'
  },
  {
    id: 'q15',
    languageId: 'html',
    question: 'Quelle balise HTML5 permet d\'intégrer nativement une vidéo sans avoir recours à un plugin tiers (comme autrefois Flash) ?',
    options: ['<media>', '<movie>', '<video>', '<embed-video>'],
    correctIndex: 2,
    explanation: 'HTML5 a introduit la balise native <video controls src="..."></video> avec support des formats MP4, WebM et OGG.',
    difficulty: 'Facile'
  }
];
