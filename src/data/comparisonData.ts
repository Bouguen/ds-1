export interface ComparisonMatrixRow {
  feature: string;
  category: 'Général' | 'Syntaxe' | 'Capacités' | 'Performance & Écosystème';
  json: string;
  xml: string;
  yaml: string;
  markdown?: string;
  html?: string;
  latex?: string;
}

export const DATA_FORMATS_COMPARISON: ComparisonMatrixRow[] = [
  {
    feature: 'Objectif Principal',
    category: 'Général',
    json: 'Échange de données léger pour APIs et applications web',
    xml: 'Stockage & échange de données hiérarchiques formelles complexes',
    yaml: 'Fichiers de configuration lisibles par l\'humain (DevOps)',
  },
  {
    feature: 'Lisibilité Humaine',
    category: 'Général',
    json: 'Bonne (accolades et guillemets obligatoires)',
    xml: 'Moyenne à lourde (très verbeux, balises ouvrantes/fermantes)',
    yaml: 'Excellente (proche du texte naturel, sans délimiteurs superflus)',
  },
  {
    feature: 'Support des Commentaires',
    category: 'Syntaxe',
    json: '❌ Non supporté (norme stricte RFC 8259)',
    xml: '✅ Oui (<!-- commentaire -->)',
    yaml: '✅ Oui (avec le dièse #)',
  },
  {
    feature: 'Typage des Données',
    category: 'Capacités',
    json: 'Types stricts natifs (string, number, boolean, array, object, null)',
    xml: 'Tout est textuel par défaut (typage possible via schéma XSD)',
    yaml: 'Typage automatique riche (dates, entiers, booléens, listes)',
  },
  {
    feature: 'Validation de Schéma',
    category: 'Capacités',
    json: 'JSON Schema (draft 2020-12)',
    xml: 'Très avancé : DTD, XSD (XML Schema), RelaxNG, Schematron',
    yaml: 'JSON Schema (via équivalence) ou Kubeval / SchemaStore',
  },
  {
    feature: 'Poids du Payload',
    category: 'Performance & Écosystème',
    json: 'Compact et optimal pour la bande passante',
    xml: 'Lourd en raison de la répétition des balises',
    yaml: 'Compact, mais parseur plus lent et complexe',
  },
  {
    feature: 'Vitesse de Parsing',
    category: 'Performance & Écosystème',
    json: '⚡ Ultra-rapide (optimisations C++/V8 natives dans les moteurs JS)',
    xml: 'Moyenne (nécessite un parseur DOM ou SAX complet)',
    yaml: 'Plus lente en raison de la grammaire complexe et de l\'indentation',
  },
  {
    feature: 'Outils de Transformation',
    category: 'Capacités',
    json: 'jq, jmespath, JSONPath',
    xml: 'XPath, XQuery, XSLT (très puissants)',
    yaml: 'yq, convertisseurs yaml-to-json',
  }
];

export const DOCUMENT_FORMATS_COMPARISON: ComparisonMatrixRow[] = [
  {
    feature: 'Objectif Principal',
    category: 'Général',
    json: '',
    xml: '',
    yaml: '',
    html: 'Structure de documents hypertexte interactifs pour navigateurs web',
    markdown: 'Rédaction rapide, lisible en texte brut, documentation',
    latex: 'Composition typographique d\'excellence pour articles scientifiques et livres',
  },
  {
    feature: 'Courbe d\'apprentissage',
    category: 'Général',
    json: '',
    xml: '',
    yaml: '',
    html: 'Facile à Moyenne (nombreuses balises et règles sémantiques)',
    markdown: 'Très Facile (maîtrisé en 10 minutes chrono)',
    latex: 'Exigeante (commandes, préambules, compilation d\'erreurs)',
  },
  {
    feature: 'Rendu des Mathématiques',
    category: 'Capacités',
    json: '',
    xml: '',
    yaml: '',
    html: 'MathML (complexe et peu intuitif à saisir à la main)',
    markdown: 'Nécessite une extension ($...$) interprétée par KaTeX/MathJax',
    latex: '👑 La référence mondiale absolue (qualité typographique parfaite)',
  },
  {
    feature: 'Gestion Bibliographique',
    category: 'Capacités',
    json: '',
    xml: '',
    yaml: '',
    html: 'Manuelle ou via JavaScript tiers',
    markdown: 'Possible via Pandoc citeproc (.bib)',
    latex: 'Intégrée et surpuissante (BibTeX, Biber, BibLaTeX)',
  },
  {
    feature: 'Média & Interactivité',
    category: 'Capacités',
    json: '',
    xml: '',
    yaml: '',
    html: 'Total (Audio, Vidéo, Canvas, SVG, Formulaires, WebGL)',
    markdown: 'Limité au texte, images et tableaux (sauf injection HTML)',
    latex: 'Fixe (conçu pour l\'impression papier et le format PDF)',
  },
  {
    feature: 'Format de Sortie Cible',
    category: 'Performance & Écosystème',
    json: '',
    xml: '',
    yaml: '',
    html: 'Écran de navigateur (DOM dynamique)',
    markdown: 'HTML, PDF, EPUB, DOCX (via compilation Pandoc)',
    latex: 'Fichier PDF vectoriel haute définition ou PostScript',
  }
];

export interface DecisionQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    description: string;
    recommended: string;
    reason: string;
  }[];
}

export const DECISION_GUIDE: DecisionQuestion[] = [
  {
    id: 'goal',
    question: 'Quel est votre objectif principal pour ce contenu ?',
    options: [
      {
        label: 'Créer une page web interactive accessible au grand public',
        description: 'Site vitrine, application SaaS, portail web',
        recommended: 'HTML5 + CSS',
        reason: 'HTML est la seule langue nativement comprise par tous les navigateurs web, et CSS apporte le contrôle visuel et responsive.'
      },
      {
        label: 'Échanger des données entre un serveur et une application cliente',
        description: 'Endpoints REST, API mobile, requêtes AJAX',
        recommended: 'JSON',
        reason: 'JSON est universellement reconnu, ultra-rapide à sérialiser/désérialiser et supporte nativement les structures en listes et objets.'
      },
      {
        label: 'Rédiger une thèse, un mémoire ou un article avec formules mathématiques',
        description: 'Recherche académique, cours de physique/maths',
        recommended: 'LaTeX',
        reason: 'LaTeX offre une qualité d\'impression irréprochable, une numérotation automatique des théorèmes et une gestion automatisée de BibTeX.'
      },
      {
        label: 'Écrire de la documentation technique ou un README sur GitHub',
        description: 'Notes de cours, guide d\'installation, wiki d\'équipe',
        recommended: 'Markdown',
        reason: 'Markdown est le plus rapide à écrire, reste parfaitement lisible sans éditeur spécialisé et se convertit instantanément en HTML ou PDF.'
      },
      {
        label: 'Configurer un pipeline de déploiement (Docker, GitHub Actions, Kubernetes)',
        description: 'DevOps, infrastructure-as-code',
        recommended: 'YAML',
        reason: 'YAML autorise les commentaires indispensables à la maintenance d\'équipes et offre une syntaxe épurée sans parenthèses ou accolades.'
      },
      {
        label: 'Gérer des documents juridiques ou archivistiques avec validation stricte',
        description: 'Humanités numériques, échanges bancaires (SEPA/SOAP), TEI',
        recommended: 'XML',
        reason: 'XML garantit une validation formelle par Schéma XSD ou DTD et dispose de la puissance de transformation XSLT.'
      }
    ]
  }
];
