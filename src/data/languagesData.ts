import { LanguageData } from '../types';

export const LANGUAGES_DATA: LanguageData[] = [
  {
    id: 'html',
    name: 'HTML',
    fullName: 'HyperText Markup Language',
    creator: 'Tim Berners-Lee',
    year: '1991',
    tagline: 'Le squelette sémantique et la structure de tout le Web mondial',
    icon: '🌐',
    color: {
      primary: '#E44D26',
      bgLight: 'bg-orange-50',
      bgDark: 'dark:bg-orange-950/20',
      border: 'border-orange-500',
      badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
      accent: '#f97316',
    },
    category: 'Web & Balisage',
    fileExtensions: ['.html', '.htm'],
    mimeType: 'text/html',
    funFact: 'La première version de HTML ne comptait que 18 balises élémentaires inspirées du standard SGML !',
    description: "HyperText Markup Language est le pilier du Web. Créé en 1991 par Tim Berners-Lee au CERN, il permet d’organiser le contenu en éléments hiérarchiques : titres, paragraphes, liens, tableaux, formulaires, etc. Les dernières versions (HTML5) ajoutent des éléments multimédias et sémantiques comme <video>, <header>, <article>, <main> ou <nav>, améliorant considérablement l'accessibilité (a11y) et le référencement naturel (SEO).",
    practicalExample: {
      title: 'Exemple Pratique (HTML5 Sémantique)',
      language: 'html',
      explanation: 'Structure type d\'un document HTML5 moderne avec balises sémantiques universelles.',
      code: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemple HTML Sémantique</title>
  </head>
  <body>
    <header>
      <h1>Bienvenue sur ma page</h1>
      <nav>
        <a href="#about">À propos</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
    <main>
      <article>
        <h2>Structuration moderne</h2>
        <p>Ceci est un paragraphe illustrant la structure HTML sémantique.</p>
      </article>
    </main>
    <footer>
      <p>&copy; 2025 - Structura</p>
    </footer>
  </body>
</html>`
    },
    alternativeExamples: [
      {
        title: 'Formulaire Accessible & Validation Native',
        language: 'html',
        explanation: 'Labels explicites, types de champs HTML5 (email, date) et attributs obligatoires.',
        code: `<form action="/submit" method="POST">
  <label for="user-email">Adresse e-mail :</label>
  <input type="email" id="user-email" name="email" required placeholder="nom@exemple.fr">

  <label for="subject">Sujet :</label>
  <select id="subject" name="subject">
    <option value="info">Demande d'information</option>
    <option value="support">Support technique</option>
  </select>

  <button type="submit">Envoyer</button>
</form>`
      }
    ],
    keyConcepts: [
      {
        term: 'Balises (Tags)',
        definition: 'Des marqueurs délimitant les éléments au sein d\'angles (ex: <p>, <a>, <section>). Elles informent le navigateur sur la nature du bloc.'
      },
      {
        term: 'Éléments',
        definition: 'Un ensemble complet formé par une balise ouvrante, son contenu et une balise fermante (ex: <h1>Titre</h1>), ou une balise auto-fermante dite vide (ex: <img src="..." alt="...">, <hr>, <br>).'
      },
      {
        term: 'Attributs',
        definition: 'Paires clé="valeur" situées dans la balise ouvrante pour fournir des métadonnées ou configurer l\'élément (ex: href, src, class, id, role, aria-label).'
      },
      {
        term: 'DOM (Document Object Model)',
        definition: 'Représentation arborescente en mémoire créée par le navigateur à partir du balisage HTML. Indispensable pour la manipulation interactive avec JavaScript et le ciblage CSS.'
      },
      {
        term: 'Sémantique HTML5',
        definition: 'Utilisation intentionnelle de balises porteuses de sens (<article>, <section>, <nav>, <aside>, <figure>) au lieu de conteneurs génériques <div>, facilitant la lecture par les moteurs de recherche et les synthèses vocales.'
      }
    ],
    typicalUseCases: [
      {
        title: 'Développement Web Front-End',
        description: 'Création du squelette et de la hiérarchie de contenu de toute page ou application web dans le monde.'
      },
      {
        title: 'Accessibilité Numérique (A11y)',
        description: 'Permettre aux technologies d\'assistance (lecteurs d\'écran pour malvoyants) de naviguer fidèlement le document.'
      },
      {
        title: 'Référencement Naturel (SEO)',
        description: 'Fournir aux robots d\'indexation de Google une hiérarchie limpide via les balises h1..h6 et métadonnées OpenGraph.'
      }
    ],
    commonPitfalls: [
      {
        title: 'La "Divite" (Div soup)',
        problem: 'Empiler des <div> sans fin sans aucune sémantique.',
        solution: 'Remplacer les div par <header>, <main>, <nav>, <article>, <aside>, <footer>.',
        badCode: '<div class="header"><div class="nav">...</div></div>',
        goodCode: '<header><nav>...</nav></header>'
      },
      {
        title: 'Oubli de l\'attribut alt sur les images',
        problem: 'Les malvoyants et les robots ne peuvent pas comprendre l\'image.',
        solution: 'Toujours fournir un alt descriptif, ou alt="" si l\'image est purement décorative.'
      },
      {
        title: 'Plusieurs <h1> sur une même page',
        problem: 'Brouille le sujet principal de la page pour le référencement.',
        solution: 'Garder un unique <h1> représentant le titre principal de la page.'
      }
    ],
    resources: [
      {
        title: 'MDN Web Docs (Mozilla)',
        url: 'https://developer.mozilla.org/fr/docs/Web/HTML',
        description: 'La référence mondiale absolue et incontournable pour les développeurs web.',
        category: 'Spécification',
        isOfficial: true
      },
      {
        title: 'WHATWG HTML Living Standard',
        url: 'https://html.spec.whatwg.org/multipage/',
        description: 'La spécification officielle vivante maintenue par les éditeurs de navigateurs.',
        category: 'Spécification',
        isOfficial: true
      },
      {
        title: 'W3C Markup Validator',
        url: 'https://validator.w3.org/',
        description: 'Outil officiel du W3C pour vérifier la conformité syntaxique de votre code HTML.',
        category: 'Outil',
        isOfficial: true
      },
      {
        title: 'W3Schools – Tutoriels HTML',
        url: 'https://www.w3schools.com/html/default.asp',
        description: 'Exercices et cours guidés par étapes pour étudiants et débutants.',
        category: 'Tutoriel'
      }
    ]
  },
  {
    id: 'xml',
    name: 'XML',
    fullName: 'Extensible Markup Language',
    creator: 'W3C (Standardisé)',
    year: '1998',
    tagline: 'Le standard rigoureux de structuration, stockage et échange de données personnalisées',
    icon: '📦',
    color: {
      primary: '#D97706',
      bgLight: 'bg-amber-50',
      bgDark: 'dark:bg-amber-950/20',
      border: 'border-amber-500',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
      accent: '#f59e0b',
    },
    category: 'Données & APIs',
    fileExtensions: ['.xml', '.xsd', '.dtd', '.xsl'],
    mimeType: 'application/xml',
    funFact: 'Les fichiers Word (.docx) ou LibreOffice (.odt) sont en réalité des archives ZIP contenant des dizaines de fichiers XML interconnectés !',
    description: "Extensible Markup Language (1998, W3C) est conçu pour structurer, stocker et échanger des données. Contrairement à HTML, il ne définit pas de balises fixes, mais permet aux utilisateurs d’en créer sur mesure selon leurs besoins métier (d'où le terme 'Extensible'). XML impose une syntaxe stricte (balises obligatoirement fermées, sensibilité à la casse, racine unique) et permet une validation formelle puissante via DTD ou Schéma XSD.",
    practicalExample: {
      title: 'Exemple Pratique (Données Structurées)',
      language: 'xml',
      explanation: 'Catalogue bibliographique structuré avec attributs d\'identification et balises imbriquées.',
      code: `<?xml version="1.0" encoding="UTF-8"?>
<bibliographie>
  <livre id="miserables" statut="disponible">
    <auteur nom="Hugo" prenom="Victor">Victor Hugo</auteur>
    <titre>Les Misérables</titre>
    <année>1862</année>
    <genres>
      <genre>Roman historique</genre>
      <genre>Drame social</genre>
    </genres>
  </livre>
  <!-- L'attribut 'id' améliore l'identification unique des données -->
</bibliographie>`
    },
    alternativeExamples: [
      {
        title: 'Extrait de Schéma XSD (Validation de type)',
        language: 'xml',
        explanation: 'Définit les règles strictes de typage et de cardinalité (minOccurs, maxOccurs).',
        code: `<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="livre">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="titre" type="xs:string"/>
        <xs:element name="année" type="xs:integer"/>
      </xs:sequence>
      <xs:attribute name="id" type="xs:ID" use="required"/>
    </xs:complexType>
  </xs:element>
</xs:schema>`
      }
    ],
    keyConcepts: [
      {
        term: 'Extensibilité',
        definition: 'Liberté totale de définir son propre vocabulaire de balises en adéquation directe avec le domaine métier (médical, financier, juridique).'
      },
      {
        term: 'Document Bien Formé (Well-formed)',
        definition: 'Respect absolu des règles syntaxiques : un unique élément racine, balises fermées et correctement imbriquées, sensibilité stricte à la casse.'
      },
      {
        term: 'Document Valide (Valid)',
        definition: 'Un document bien formé qui respecte en plus les contraintes d\'un contrat formel : une DTD (Document Type Definition) ou un Schéma XML (XSD).'
      },
      {
        term: 'XPath / XSLT',
        definition: 'XPath permet de cibler et naviguer dans l\'arbre XML via des expressions (ex: /bibliographie/livre[@id="miserables"]), tandis que XSLT permet de transformer le document XML en HTML, texte ou autre XML.'
      },
      {
        term: 'Namespaces (Espaces de noms)',
        definition: 'Préfixe xmlns permettant de fusionner différents vocabulaires XML sans collision de noms (ex: <svg:rect>, <mathml:math>).'
      }
    ],
    typicalUseCases: [
      {
        title: 'Échange de Données Inter-systèmes',
        description: 'Partage de données complexes et hautement hiérarchiques entre banques, assurances et administrations (protocoles SOAP).'
      },
      {
        title: 'Formats Bureautiques & Graphiques',
        description: 'Structure interne des fichiers OpenDocument (.odt), Microsoft Office OpenXML (.docx) et des images vectorielles (.svg).'
      },
      {
        title: 'Humanités Numériques & Édition TEI',
        description: 'Encodage et critique de textes historiques et manuscrits anciens avec le standard TEI (Text Encoding Initiative).'
      }
    ],
    commonPitfalls: [
      {
        title: 'Absence d\'un élément racine unique',
        problem: 'XML interdit d\'avoir deux balises sœurs au premier niveau.',
        solution: 'Toujours envelopper tout le document dans une unique balise mère.'
      },
      {
        title: 'Oubli de fermeture de balise auto-fermante',
        problem: 'Contrairement à HTML où <br> est toléré, XML exige <br/> ou <br></br>.',
        solution: 'Fermer scrupuleusement toute balise sans contenu avec />.'
      },
      {
        title: 'Caractères réservés non échappés',
        problem: 'Utiliser < ou & directement dans le texte provoque une erreur de parse.',
        solution: 'Utiliser les entités prédéfinies : &lt; pour <, &amp; pour &, ou envelopper dans <![CDATA[ ... ]]>'
      }
    ],
    resources: [
      {
        title: 'W3C XML Specification',
        url: 'https://www.w3.org/XML/',
        description: 'Les spécifications officielles et l\'historique des recommandations du W3C.',
        category: 'Spécification',
        isOfficial: true
      },
      {
        title: 'XML Schema (XSD) Documentation',
        url: 'https://www.w3.org/standards/xml/schema',
        description: 'Guide complet pour la définition et validation de schémas XML formels.',
        category: 'Spécification',
        isOfficial: true
      },
      {
        title: 'TEI Consortium (Text Encoding Initiative)',
        url: 'https://tei-c.org/',
        description: 'La norme mondiale de numérisation et d\'encodage de textes littéraires et linguistiques.',
        category: 'Communauté',
        isOfficial: true
      },
      {
        title: 'Oxygen XML Editor',
        url: 'https://www.oxygenxml.com/',
        description: 'L\'environnement de développement de référence utilisé dans l\'académique et l\'industrie.',
        category: 'Outil'
      }
    ]
  },
  {
    id: 'json',
    name: 'JSON',
    fullName: 'JavaScript Object Notation',
    creator: 'Douglas Crockford',
    year: '2001',
    tagline: 'Le format textuel universel, léger et omniprésent des APIs REST et du Web moderne',
    icon: '🧩',
    color: {
      primary: '#059669',
      bgLight: 'bg-emerald-50',
      bgDark: 'dark:bg-emerald-950/20',
      border: 'border-emerald-500',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      accent: '#10b981',
    },
    category: 'Données & APIs',
    fileExtensions: ['.json', '.jsonld'],
    mimeType: 'application/json',
    funFact: 'Douglas Crockford a spécifié JSON sur une simple page en 2001. Le format est si minimaliste que sa grammaire BNF tient sur une carte de visite !',
    description: "JavaScript Object Notation est un format de données textuel ultra-léger et universel utilisé pour l’échange de données informatiques. Dérivé de la syntaxe des littéraux d'objets JavaScript (ECMA-262), il est totalement indépendant du langage de programmation. Il s'est imposé comme le standard de facto des APIs REST et des bases NoSQL grâce à sa concision et sa vitesse de désérialisation sans commune mesure avec XML.",
    practicalExample: {
      title: 'Exemple Pratique (Échange de Données REST)',
      language: 'json',
      explanation: 'Structure hiérarchique combinant objets, tableaux et types primitifs (string, number, boolean).',
      code: `{
  "bibliographie": {
    "collection": "Classiques Français",
    "total": 1,
    "livre": {
      "id": "miserables",
      "titre": "Les Misérables",
      "auteur": {
        "nom": "Hugo",
        "prenom": "Victor"
      },
      "annee": 1862,
      "disponible": true,
      "editions": [
        { "annee": 1862, "lieu": "Bruxelles", "editeur": "A. Lacroix" },
        { "annee": 2000, "lieu": "Paris", "editeur": "Le Livre de Poche" }
      ],
      "tags": ["drame", "histoire", "chef-d'oeuvre"]
    }
  }
}`
    },
    alternativeExamples: [
      {
        title: 'Exemple de JSON Schema (Validation de contrat d\'API)',
        language: 'json',
        explanation: 'Schéma garantissant le respect des types et des contraintes obligatoires.',
        code: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Utilisateur",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "email": { "type": "string", "format": "email" },
    "age": { "type": "integer", "minimum": 18 }
  },
  "required": ["id", "email"]
}`
      }
    ],
    keyConcepts: [
      {
        term: 'Paires Clé / Valeur',
        definition: 'La structure fondamentale : chaque clé doit obligatoirement être une chaîne de caractères entourée de guillemets doubles ("clé": valeur).'
      },
      {
        term: 'Types Primitifs Autorisés',
        definition: 'Uniquement 6 types stricts : String ("texte"), Number (42, 3.14), Boolean (true/false), Array ([...]), Object ({...}), et null.'
      },
      {
        term: 'Parsing & Sérialisation',
        definition: 'En JavaScript : JSON.parse(str) convertit la chaîne en objet mémoire, JSON.stringify(obj) effectue l\'opération inverse.'
      },
      {
        term: 'Absence de Fonctions & Commentaires',
        definition: 'JSON est strictement un format de données passif : aucune fonction, aucun symbole non défini, et aucun commentaire n\'est permis par la norme RFC 8259.'
      },
      {
        term: 'Interopérabilité Totale',
        definition: 'Reconnu nativement par Python (json.loads), Java (Jackson), PHP (json_decode), C#, Rust, Go sans bibliothèque lourde.'
      }
    ],
    typicalUseCases: [
      {
        title: 'APIs Web & Microservices REST',
        description: 'Transport de données universel entre les applications mobiles/front-end et les serveurs back-end.'
      },
      {
        title: 'Bases de Données NoSQL Orientées Documents',
        description: 'Format de stockage natif de MongoDB (BSON), CouchDB, Elasticsearch et PostgreSQL (type jsonb).'
      },
      {
        title: 'Fichiers de Configuration',
        description: 'Standard des outils modernes comme package.json (Node), tsconfig.json (TypeScript) ou settings.json (VS Code).'
      }
    ],
    commonPitfalls: [
      {
        title: 'Virgule traînante (Trailing comma)',
        problem: 'Laisser une virgule après le dernier élément : {"a": 1,}.',
        solution: 'Supprimer la dernière virgule, interdite par la spécification JSON stricte.'
      },
      {
        title: 'Guillemets simples (\') au lieu de doubles (")',
        problem: 'Écrire {\'nom\': \'Jean\'} déclenche un Crash SyntaxError immédiat.',
        solution: 'Utiliser impérativement les guillemets doubles droits " pour toutes les clés et chaînes.'
      },
      {
        title: 'Tentative d\'ajouter des commentaires',
        problem: 'Mettre // ou /* */ invalide immédiatement tout le document JSON.',
        solution: 'Pour des fichiers avec commentaires, préférer JSON5, JSONC ou YAML.'
      }
    ],
    resources: [
      {
        title: 'JSON.org (Spécification Officielle)',
        url: 'https://www.json.org/json-fr.html',
        description: 'Grammaire complète et diagrammes de syntaxe par Douglas Crockford.',
        category: 'Spécification',
        isOfficial: true
      },
      {
        title: 'MDN Web Docs – Travailler avec JSON',
        url: 'https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON',
        description: 'Guide didactique sur l\'utilisation de JSON en développement web.',
        category: 'Tutoriel'
      },
      {
        title: 'JSONLint (Validateur en ligne)',
        url: 'https://jsonlint.com/',
        description: 'Vérificateur et formateur de JSON avec localisation précise des erreurs syntaxiques.',
        category: 'Outil'
      },
      {
        title: 'JSON Schema Standard',
        url: 'https://json-schema.org/',
        description: 'Spécification moderne pour annoter et valider la structure des documents JSON.',
        category: 'Spécification'
      }
    ]
  },
  {
    id: 'markdown',
    name: 'Markdown',
    fullName: 'Markdown Format',
    creator: 'John Gruber & Aaron Swartz',
    year: '2004',
    tagline: 'Le balisage lisible, rapide et naturel pour la documentation et la prise de notes',
    icon: '📝',
    color: {
      primary: '#6F42C1',
      bgLight: 'bg-purple-50',
      bgDark: 'dark:bg-purple-950/20',
      border: 'border-purple-500',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
      accent: '#8b5cf6',
    },
    category: 'Documentation',
    fileExtensions: ['.md', '.markdown'],
    mimeType: 'text/markdown',
    funFact: 'Le format a été conçu pour qu\'un texte brut sans aucune mise en page soit déjà parfaitement plaisant et compréhensible à l\'œil nu dans un terminal !',
    description: "Markdown, créé en 2004 par John Gruber avec la contribution déterminante d'Aaron Swartz, est un langage de balisage léger dont l'objectif principal est d'être facile à lire et à écrire dans sa forme brute, tout en étant facilement convertible en HTML. Il est idéal pour la prise de notes rapide, la documentation technique, et les blogs, car il permet de se concentrer sur le contenu sans se soucier de la syntaxe complexe des balises.",
    practicalExample: {
      title: 'Exemple Pratique (Documentation & Notes)',
      language: 'markdown',
      explanation: 'Titres, listes, mise en valeur, citations, blocs de code et liens hypertextes.',
      code: `# Guide de Démarrage Rapide

## Principes Clés
- **Texte en gras** avec deux étoiles.
- *Texte en italique* avec une seule étoile.
- ~~Texte barré~~ avec deux tildes (GFM).

> « La simplicité est la sophistication suprême. » — Léonard de Vinci

### Tableau de Comparaison
| Format | Facilité | Richesse |
| :--- | :---: | :---: |
| HTML | Moyenne | Élevée |
| Markdown | Maximale | Bonne |

\`\`\`javascript
// Bloc de code coloré
function saluer(nom) {
  return \`Bonjour \${nom} !\`;
}
\`\`\`

Pour en savoir plus, visitez [Pandoc](https://pandoc.org/) ou [CommonMark](https://commonmark.org/).`
    },
    alternativeExamples: [
      {
        title: 'Cases à Cocher & Formules Mathématiques',
        language: 'markdown',
        explanation: 'Listes de tâches interactives (GitHub Flavored) et syntaxe TeX $...$.',
        code: `### Checklist de révision DS
- [x] Comprendre le DOM HTML
- [x] Valider un fichier XML avec XSD
- [ ] Maîtriser le Box Model CSS
- [ ] Écrire la formule d'Euler en LaTeX : $e^{i\\pi} + 1 = 0$`
      }
    ],
    keyConcepts: [
      {
        term: 'Balisage Lisible (Plain Text Focus)',
        definition: 'Utilisation de symboles typographiques naturels du clavier (#, *, >, -, \`) permettant de lire le fichier sans interpréteur.'
      },
      {
        term: 'Conversion & Pandoc',
        definition: 'Conçu pour être compilé vers HTML, PDF, DOCX, EPUB ou Diaporama Reveal.js, notamment grâce à la puissance du couteau-suisse Pandoc.'
      },
      {
        term: 'Dialectes & GFM (GitHub Flavored Markdown)',
        definition: 'Extensions du standard initial apportant les tableaux, les checklists de tâches, les listes de définitions et les blocs de code annotés avec nom de langage.'
      },
      {
        term: 'CommonMark',
        definition: 'Effort rigoureux de standardisation internationale visant à éliminer les ambiguïtés d\'interprétation entre les multiples parseurs Markdown.'
      },
      {
        term: 'Support HTML Natif',
        definition: 'On peut injecter du code HTML brut directement au milieu d\'un texte Markdown dès qu\'un besoin de mise en page spécifique se présente.'
      }
    ],
    typicalUseCases: [
      {
        title: 'Documentation de Code & Dépôts Git',
        description: 'Rédaction incontournable des fichiers README.md, CONTRIBUTING.md et wikis sur GitHub/GitLab.'
      },
      {
        title: 'Prise de Notes & Second Cerveau',
        description: 'Logiciels de gestion des connaissances comme Obsidian, Notion, Logseq et Zettlr.'
      },
      {
        title: 'Générateurs de Sites Statiques (SSG)',
        description: 'Alimente les moteurs de blogs et documentation tels que Astro, Docusaurus, Nextra, Hugo et Jekyll.'
      }
    ],
    commonPitfalls: [
      {
        title: 'Oubli de l\'espace après le croisillon #',
        problem: 'Écrire #Titre au lieu de # Titre n\'est pas reconnu comme un en-tête par la majorité des parseurs.',
        solution: 'Toujours insérer une espace franche après les #'
      },
      {
        title: 'Retour à la ligne non effectif',
        problem: 'Un simple saut de ligne dans le fichier source est fusionné dans le même paragraphe HTML.',
        solution: 'Laisser une ligne vide entre deux paragraphes, ou terminer la ligne par deux espaces.'
      },
      {
        title: 'Mélange des niveaux de listes sans indentation uniforme',
        problem: 'Une indentation irrégulière brise la hiérarchie des sous-listes.',
        solution: 'Utiliser systématiquement 2 ou 4 espaces pour indenter les sous-puces.'
      }
    ],
    resources: [
      {
        title: 'Markdown Original Specification',
        url: 'https://daringfireball.net/projects/markdown/',
        description: 'Le texte fondateur rédigé par John Gruber en décembre 2004.',
        category: 'Spécification',
        isOfficial: true
      },
      {
        title: 'CommonMark Standard',
        url: 'https://commonmark.org/',
        description: 'Spécification standardisée sans ambiguïté accompagnée d\'une suite de tests.',
        category: 'Spécification',
        isOfficial: true
      },
      {
        title: 'Pandoc – Le Convertisseur Universel',
        url: 'https://pandoc.org/',
        description: 'L\'outil en ligne de commande le plus puissant pour convertir Markdown en tout format.',
        category: 'Outil',
        isOfficial: true
      },
      {
        title: 'The Markdown Guide',
        url: 'https://www.markdownguide.org',
        description: 'Guide complet, cheat sheet et didacticiel des syntaxes de base et avancées.',
        category: 'Tutoriel'
      }
    ]
  },
  {
    id: 'latex',
    name: 'LaTeX',
    fullName: 'LaTeX Document Preparation System',
    creator: 'Leslie Lamport (sur TeX de Donald Knuth)',
    year: '1984',
    tagline: 'Le standard mondial de la composition typographique et des publications scientifiques',
    icon: '🔢',
    color: {
      primary: '#D63384',
      bgLight: 'bg-pink-50',
      bgDark: 'dark:bg-pink-950/20',
      border: 'border-pink-500',
      badge: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300',
      accent: '#ec4899',
    },
    category: 'Sciences & Typographie',
    fileExtensions: ['.tex', '.sty', '.cls', '.bib'],
    mimeType: 'application/x-latex',
    funFact: 'Donald Knuth a créé TeX en 1978 après avoir été horrifié par la piètre qualité d\'impression de son livre "The Art of Computer Programming" !',
    description: "LaTeX, développé par Leslie Lamport sur les fondations mathématiques de TeX (Donald Knuth), est le standard indiscuté de la composition scientifique et technique. Il ne s'agit pas d'un simple langage de balisage, mais d'un système complet de préparation de documents qui excelle dans la gestion des équations complexes, des références croisées dynamiques (figures, équations, tables) et de la bibliographie avec une perfection typographique inégalée.",
    practicalExample: {
      title: 'Exemple Pratique (Document Scientifique & Mathématiques)',
      language: 'latex',
      explanation: 'Préambule, inclusion de packages, titre automatique et formules mathématiques en ligne et en bloc.',
      code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[french]{babel}
\\usepackage{amsmath,amssymb}

\\title{Introduction à l'Analyse Mathématique}
\\author{N. ELM}
\\date{\\today}

\\begin{document}
\\maketitle

\\section{Formules Fondamentales}
L'identité la plus remarquable d'Euler relie cinq constantes fondamentales :
\\begin{equation}
  e^{i\\pi} + 1 = 0
\\end{equation}

Une équation du second degré s'écrit $ax^2 + bx + c = 0$, et son intégrale définie :
\\begin{equation}
  \\int_{a}^{b} f(x) \\, dx = F(b) - F(a)
\\end{equation}

\\end{document}`
    },
    alternativeExamples: [
      {
        title: 'Système d\'équations et Matrices',
        language: 'latex',
        explanation: 'Utilisation des environnements matrix et align de amsmath.',
        code: `\\begin{pmatrix}
  a_{11} & a_{12} \\\\
  a_{21} & a_{22}
\\end{pmatrix}
\\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix}
=
\\begin{pmatrix} b_1 \\\\ b_2 \\end{pmatrix}`
      }
    ],
    keyConcepts: [
      {
        term: 'Compilation (WYSIWYM)',
        definition: 'Ce n\'est pas un éditeur WYSIWYG (Word) mais WYSIWYM (Ce que vous voyez est ce que vous voulez dire). Le source .tex est compilé vers un PDF vectoriel parfait.'
      },
      {
        term: 'Commandes & Environnements',
        definition: 'Les commandes commencent par un antislash \\commande{argument}. Les blocs délimités utilisent \\begin{environnement} ... \\end{environnement}.'
      },
      {
        term: 'Classes de Document (DocumentClass)',
        definition: 'Définit le gabarit global et les conventions éditoriales du document : article (papiers de recherche), report (mémoires, thèses), book (ouvrages), beamer (diaporamas).'
      },
      {
        term: 'Packages & Écosystème CTAN',
        definition: 'Extension modulaire via \\usepackage{} : amsmath (maths), graphicx (images), biblatex (bibliographies), hyperref (liens PDF cliquables), tikz (dessins vectoriels).'
      },
      {
        term: 'Séparation Fond / Forme',
        definition: 'L\'auteur se concentre à 100% sur la logique et la rigueur du texte ; le moteur TeX calcule automatiquement les césures, les veuves/orphelines et le placement optimal des figures flottantes.'
      }
    ],
    typicalUseCases: [
      {
        title: 'Publications Académiques & Thèses',
        description: 'Format obligatoire de soumission pour les revues de mathématiques, physique, informatique (IEEE, ACM, arXiv).'
      },
      {
        title: 'Formules Mathématiques Complexes',
        description: 'La référence typographique dont la syntaxe $...$ a été adoptée par Wikipédia, KaTeX, MathJax et ChatGPT.'
      },
      {
        title: 'Rapports Techniques & Bibliographies Massives',
        description: 'Documents volumineux exigeant un index, une table des matières automatique et des centaines de références BibTeX.'
      }
    ],
    commonPitfalls: [
      {
        title: 'Caractères spéciaux TeX non échappés',
        problem: 'Taper %, _, &, $, { ou } brise la compilation ou commente la ligne.',
        solution: 'Les précéder d\'un antislash : \\%, \\_, \\&, \\$, \\{, \\}.'
      },
      {
        title: 'Oubli du mode mathématique pour les formules',
        problem: 'Taper x^2 ou \\alpha en texte ordinaire provoque une erreur "Missing $ inserted".',
        solution: 'Envelopper dans $...$ pour les maths en ligne ou \\[ ... \\] pour les maths centrées.'
      },
      {
        title: 'Oubli de refermer un environnement \\begin{...}',
        problem: 'Tout environnement ouvert doit impérativement posséder son \\end{...} correspondant.',
        solution: 'Vérifier la symétrie de chaque balise de bloc.'
      }
    ],
    resources: [
      {
        title: 'The LaTeX Project (Site Officiel)',
        url: 'https://www.latex-project.org/',
        description: 'Documentation officielle, historique des versions et actualités du projet.',
        category: 'Spécification',
        isOfficial: true
      },
      {
        title: 'Overleaf Documentation & Tutoriels',
        url: 'https://www.overleaf.com/learn',
        description: 'Plateforme collaborative en ligne et base de tutoriels la plus claire et moderne.',
        category: 'Tutoriel'
      },
      {
        title: 'Detexify (Reconnaissance de symboles)',
        url: 'https://detexify.kirelabs.org/classify.html',
        description: 'Outil génial permettant de dessiner un symbole à la souris pour trouver son code LaTeX.',
        category: 'Outil'
      },
      {
        title: 'TeX StackExchange',
        url: 'https://tex.stackexchange.com/',
        description: 'La plus vaste communauté d\'entraide et de résolution de problèmes TeX et LaTeX.',
        category: 'Communauté'
      },
      {
        title: 'Pandoc (LaTeX to Multi-format)',
        url: 'https://pandoc.org/',
        description: 'Convertir facilement vos documents LaTeX vers HTML, EPUB, Word ou Markdown.',
        category: 'Outil'
      }
    ]
  },
  {
    id: 'css',
    name: 'CSS',
    fullName: 'Cascading Style Sheets',
    creator: 'Håkon Wium Lie & Bert Bos',
    year: '1996',
    tagline: 'L\'art de la présentation visuelle, du responsive design et des animations web',
    icon: '🎨',
    color: {
      primary: '#0284C7',
      bgLight: 'bg-sky-50',
      bgDark: 'dark:bg-sky-950/20',
      border: 'border-sky-500',
      badge: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
      accent: '#0ea5e9',
    },
    category: 'Style',
    fileExtensions: ['.css', '.scss', '.sass'],
    mimeType: 'text/css',
    funFact: 'Håkon Wium Lie a proposé CSS alors qu\'il travaillait aux côtés de Tim Berners-Lee au CERN en 1994, pour éviter que le Web ne ressemble à un simple traitement de texte austère !',
    description: "Cascading Style Sheets (1996, Håkon Lie & Bert Bos, W3C) est un langage de feuilles de style qui régit la présentation visuelle du contenu balisé en HTML ou XML. Il assure la séparation fondamentale entre le fond (structure HTML) et la forme (couleurs, polices, espacements, grilles). Les évolutions récentes (CSS3, CSS Grid, Flexbox, Variables CSS, Container Queries) offrent une maîtrise graphique et interactive complète sur tous les terminaux.",
    practicalExample: {
      title: 'Exemple Pratique (Feuille de Style Moderne)',
      language: 'css',
      explanation: 'Sélecteurs, variables, Box Model, mise en page Flexbox et Media Queries responsive.',
      code: `/* Variables personnalisées (Custom Properties) */
:root {
  --primary: #0071cf;
  --text-dark: #212529;
  --radius: 12px;
}

/* Règle globale avec Box-Sizing universel */
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: var(--text-dark);
  margin: 0;
  line-height: 1.6;
}

/* Carte avec Flexbox et Box-Shadow */
.card {
  background: #ffffff;
  border-radius: var(--radius);
  border-top: 6px solid var(--primary);
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 113, 207, 0.15);
}

/* Responsive Design via Media Queries */
@media (max-width: 768px) {
  .card {
    padding: 1rem;
  }
}`
    },
    alternativeExamples: [
      {
        title: 'Mise en page Grid & Centrage absolu',
        language: 'css',
        explanation: 'Création d\'une grille automatique responsive sans Media Queries.',
        code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
}`
      }
    ],
    keyConcepts: [
      {
        term: 'Sélecteurs & Spécificité',
        definition: 'Règles permettant de cibler les éléments HTML (balise: p, classe: .card, ID: #main, attribut: [type="text"]). Le poids de spécificité (ID > Classe > Balise) détermine quelle règle l\'emporte.'
      },
      {
        term: 'La Cascade & Héritage',
        definition: 'Les styles "dégoulinent" des parents vers les enfants (héritage de font-family, color). En cas de conflit, l\'ordre de déclaration et la spécificité tranchent.'
      },
      {
        term: 'Le Box Model (Modèle de Boîte)',
        definition: 'Chaque élément est une boîte rectangulaire composée de 4 couches concentriques : Content (contenu), Padding (marge interne), Border (bordure), Margin (marge externe).'
      },
      {
        term: 'Flexbox & CSS Grid',
        definition: 'Systèmes de disposition contemporains : Flexbox (1 dimension : ligne ou colonne) pour les composants, CSS Grid (2 dimensions : lignes et colonnes coordonnées) pour la mise en page globale.'
      },
      {
        term: 'Responsive Design & Media Queries',
        definition: 'Adaptation fluide de l\'affichage selon la taille du viewport (@media (min-width: ...)), l\'orientation, le thème sombre (@media (prefers-color-scheme: dark)) ou le support d\'impression.'
      }
    ],
    typicalUseCases: [
      {
        title: 'Mise en Page & Architecture Visuelle',
        description: 'Organisation spatiale des blocs via Flexbox et Grid Layout.'
      },
      {
        title: 'Identité de Marque & Design System',
        description: 'Harmonisation des palettes de couleurs, échelles typographiques, ombres et rayons de bordure.'
      },
      {
        title: 'Micro-interactions & Animations',
        description: 'Transitions fluides au survol, animations keyframes légères sans surcharger le processeur avec du JavaScript.'
      }
    ],
    commonPitfalls: [
      {
        title: 'Box-sizing par défaut (content-box)',
        problem: 'Ajouter du padding ou une bordure augmente la taille totale de l\'élément et brise l\'alignement.',
        solution: 'Toujours déclarer *, *::before, *::after { box-sizing: border-box; } en tête de fichier CSS.'
      },
      {
        title: 'Usage abusif de !important',
        problem: 'Court-circuite le mécanisme naturel de la cascade et rend la maintenance cauchemardesque.',
        solution: 'Utiliser des sélecteurs mieux ciblés ou des classes modulaires (BEM ou utilitaires).'
      },
      {
        title: 'Oubli du viewport meta dans le HTML',
        problem: 'Le responsive design CSS ne fonctionne pas sur smartphone si le viewport n\'est pas initialisé.',
        solution: 'Vérifier la balise <meta name="viewport" content="width=device-width, initial-scale=1.0"> dans le head.'
      }
    ],
    resources: [
      {
        title: 'MDN Web Docs – Référence CSS',
        url: 'https://developer.mozilla.org/fr/docs/Web/CSS',
        description: 'L\'encyclopédie exhaustive des propriétés, pseudo-classes et fonctions CSS.',
        category: 'Spécification',
        isOfficial: true
      },
      {
        title: 'CSS-Tricks',
        url: 'https://css-tricks.com/',
        description: 'Guides visuels légendaires sur Flexbox, Grid et les astuces de layout avancées.',
        category: 'Tutoriel'
      },
      {
        title: 'Flexbox Froggy & CSS Grid Garden',
        url: 'https://flexboxfroggy.com/',
        description: 'Jeux interactifs ludiques pour maîtriser Flexbox et Grid Layout en codant.',
        category: 'Outil'
      },
      {
        title: 'Bootstrap Framework',
        url: 'https://getbootstrap.com/',
        description: 'Le framework CSS le plus populaire et historique pour le prototypage rapide.',
        category: 'Outil'
      }
    ]
  },
  {
    id: 'yaml',
    name: 'YAML',
    fullName: 'YAML Ain\'t Markup Language',
    creator: 'Clark Evans, Ingy döt Net, Oren Ben-Kiki',
    year: '2001',
    tagline: 'La sérialisation ultra-lisible par les humains pour DevOps, Docker et Kubernetes',
    icon: '⚙️',
    color: {
      primary: '#7C3AED',
      bgLight: 'bg-violet-50',
      bgDark: 'dark:bg-violet-950/20',
      border: 'border-violet-500',
      badge: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
      accent: '#8b5cf6',
    },
    category: 'Données & APIs',
    fileExtensions: ['.yaml', '.yml'],
    mimeType: 'text/yaml',
    funFact: 'YAML est un sur-ensemble strict de JSON : tout fichier JSON valide est également un fichier YAML valide !',
    description: "YAML (initialement 'Yet Another Markup Language', puis renommé récursivement 'YAML Ain't Markup Language') est un format de sérialisation conçu pour être immédiatement compréhensible par un lecteur humain. Il utilise l'indentation par espaces pour définir la hiérarchie plutôt que des balises ou des accolades, ce qui en fait le favori incontesté des configurations DevOps (Docker Compose, Kubernetes, GitHub Actions, Ansible).",
    practicalExample: {
      title: 'Exemple Pratique (Configuration CI/CD & Services)',
      language: 'yaml',
      explanation: 'Hiérarchie par indentation, listes à tirets, types automatiques et commentaires.',
      code: `# Configuration de déploiement d'application
version: "3.8"

services:
  web-app:
    image: node:20-alpine
    container_name: structura-prod
    restart: always
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
    volumes:
      - ./data:/app/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s`
    },
    keyConcepts: [
      {
        term: 'Indentation Significative',
        definition: 'La structure repose entièrement sur les espaces. Les tabulations sont rigoureusement interdites car elles varient selon les éditeurs.'
      },
      {
        term: 'Support Natif des Commentaires',
        definition: 'Le caractère # permet d\'insérer des commentaires de documentation dans les fichiers de configuration (impossible en JSON standard).'
      },
      {
        term: 'Listes et Scalaires',
        definition: 'Les éléments de liste sont précédés d\'un tiret (-), les chaînes de texte n\'ont pas besoin de guillemets sauf cas particuliers.'
      },
      {
        term: 'Ancres et Alias (& et *)',
        definition: 'Fonctionnalité puissante permettant de dupliquer un bloc de configuration sans le recopier (DRY).'
      }
    ],
    typicalUseCases: [
      {
        title: 'Pipelines CI/CD (GitHub Actions, GitLab CI)',
        description: 'Description déclarative des étapes de compilation, test et déploiement continu.'
      },
      {
        title: 'Orchestration de Conteneurs (Docker, K8s)',
        description: 'Définition des Pods, Déploiements, Ingress et réseaux de conteneurs.'
      },
      {
        title: 'Configuration d\'outils & Frameworks',
        description: 'Fichiers mkdocs.yml, swagger/OpenAPI, Home Assistant, etc.'
      }
    ],
    commonPitfalls: [
      {
        title: 'Utilisation de tabulations au lieu d\'espaces',
        problem: 'YAML rejette immédiatement le fichier si une tabulation \\t est détectée.',
        solution: 'Configurer son éditeur de code pour insérer 2 espaces à la place de la touche Tab.'
      },
      {
        title: 'Problème de typage involontaire (Le "Norway problem")',
        problem: 'En YAML 1.1, le code pays NO était automatiquement casté en booléen false.',
        solution: 'Entourer de guillemets les chaînes ambiguës : "NO", "yes", "on", "true".'
      }
    ],
    resources: [
      {
        title: 'YAML Official Specification',
        url: 'https://yaml.org/',
        description: 'Spécification complète du format YAML (version 1.2).',
        category: 'Spécification',
        isOfficial: true
      },
      {
        title: 'YAML Lint (Validateur en ligne)',
        url: 'https://www.yamllint.com/',
        description: 'Outil de vérification syntaxique et de correction de l\'indentation.',
        category: 'Outil'
      }
    ]
  }
];
