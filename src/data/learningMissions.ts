import type {LanguageId} from '../types';

export type MissionLevel = 'Débutant' | 'Intermédiaire' | 'Avancé';
export interface LearningMission {
  id:string;
  language:LanguageId;
  level:MissionLevel;
  title:string;
  context:string;
  aim:string;
  objectives:string[];
  task:string;
  code:string;
  expected:string;
  caution:string;
  question:string;
  choices:string[];
  answer:number;
  reason:string;
}
/** Vingt et une missions originales, écrites pour les sept langages enseignés. */
export const LEARNING_MISSIONS:LearningMission[] = [
  {
    "id": "mission-html-1",
    "language": "html",
    "level": "Débutant",
    "title": "Construire une page sémantique",
    "context": "Un club scolaire souhaite publier une actualité lisible et accessible.",
    "aim": "Distinguer le sens du balisage HTML de son apparence visuelle.",
    "objectives": [
      "Identifier la hiérarchie h1 / h2 et la zone main.",
      "Choisir article pour un contenu autonome.",
      "Vérifier qu’un seul main représente le contenu principal."
    ],
    "task": "Rédigez une nouvelle actualité avec un second paragraphe et une date, en gardant les titres hiérarchisés.",
    "code": "<main><article><h1>Journal du club</h1><h2>Atelier numérique</h2><p>Notre rencontre a lieu jeudi.</p><time datetime=\"2026-11-19\">19 novembre 2026</time></article></main>",
    "expected": "Le texte est structuré en un article et un élément time possède la date lisible par machine.",
    "caution": "Une balise sémantique n’impose pas à elle seule une couleur ou une mise en page.",
    "question": "Quel élément convient à un contenu autonome réutilisable séparément ?",
    "choices": [
      "<span>",
      "<article>",
      "<b>"
    ],
    "answer": 1,
    "reason": "article est prévu pour une composition autonome ; span et b ne décrivent pas cette unité documentaire."
  },
  {
    "id": "mission-html-2",
    "language": "html",
    "level": "Intermédiaire",
    "title": "Concevoir un formulaire accessible",
    "context": "Une bibliothèque accepte les demandes de réservation.",
    "aim": "Associer les libellés aux champs et tirer parti des validations HTML natives.",
    "objectives": [
      "Associer for du label et id de input.",
      "Reconnaître required et type=email.",
      "Prévoir un texte d’aide sans remplacer le libellé."
    ],
    "task": "Ajoutez un champ de date requis et un texte expliquant le délai de retrait.",
    "code": "<form><label for=\"nom\">Nom</label><input id=\"nom\" name=\"nom\" required><label for=\"mail\">Courriel</label><input id=\"mail\" name=\"email\" type=\"email\" required><button type=\"submit\">Demander</button></form>",
    "expected": "Le formulaire contient des étiquettes et tous les champs essentiels sont associés à leur label.",
    "caution": "La validation HTML native ne remplace pas une validation côté serveur.",
    "question": "Quel attribut relie une étiquette au champ qui possède un identifiant ?",
    "choices": [
      "for sur label",
      "class sur input",
      "style sur form"
    ],
    "answer": 0,
    "reason": "for doit contenir l’identifiant de l’élément de formulaire ciblé."
  },
  {
    "id": "mission-html-3",
    "language": "html",
    "level": "Avancé",
    "title": "Lire un tableau de données accessible",
    "context": "Un établissement publie les effectifs par formation.",
    "aim": "Structurer les en-têtes pour rendre les relations de données intelligibles.",
    "objectives": [
      "Utiliser caption pour la légende.",
      "Distinguer th en ligne et en colonne.",
      "Employer le tableau uniquement pour des données tabulaires."
    ],
    "task": "Ajoutez une ligne pour la filière Physique et vérifiez la présence des deux en-têtes.",
    "code": "<table><caption>Effectifs par filière</caption><thead><tr><th scope=\"col\">Filière</th><th scope=\"col\">Effectif</th></tr></thead><tbody><tr><th scope=\"row\">Informatique</th><td>84</td></tr></tbody></table>",
    "expected": "Les lecteurs peuvent relier chaque effectif à sa filière et à la colonne des valeurs.",
    "caution": "Le tableau n’est pas un système de grille de mise en page.",
    "question": "À quoi sert scope=\"row\" dans une cellule th ?",
    "choices": [
      "À placer le tableau à droite",
      "À identifier un en-tête de ligne",
      "À définir une largeur"
    ],
    "answer": 1,
    "reason": "scope=row précise que l’en-tête concerne les cellules de sa ligne."
  },
  {
    "id": "mission-css-1",
    "language": "css",
    "level": "Débutant",
    "title": "Comprendre sélecteurs et déclarations",
    "context": "Une association veut harmoniser les cartes de son portail.",
    "aim": "Distinguer sélecteurs, propriétés et valeurs d’une règle CSS.",
    "objectives": [
      "Repérer les accolades d’une règle.",
      "Associer une classe à un élément.",
      "Comprendre la séparation structure HTML / présentation CSS."
    ],
    "task": "Modifiez l’arrière-plan et la marge interne de la carte.",
    "code": ".carte { background: #e0f2fe; padding: 16px; border-radius: 12px; } .carte h3 { color: #075985; }",
    "expected": "Le panneau de démonstration change de couleur et d’espacement lorsque la classe cible existe.",
    "caution": "Une règle sans élément correspondant n’a aucun effet visible.",
    "question": "Que désigne .carte en CSS ?",
    "choices": [
      "Un identifiant",
      "Une classe",
      "Une balise HTML"
    ],
    "answer": 1,
    "reason": "Le point précédant le nom est le sélecteur de classe."
  },
  {
    "id": "mission-css-2",
    "language": "css",
    "level": "Intermédiaire",
    "title": "Organiser une grille adaptable",
    "context": "Un site de ressources doit présenter des cartes sur mobile et ordinateur.",
    "aim": "Utiliser Grid pour une disposition robuste, sans imposer un nombre fixe de colonnes.",
    "objectives": [
      "Identifier display:grid.",
      "Comprendre minmax et auto-fit.",
      "Prévoir les très petites largeurs d’écran."
    ],
    "task": "Faites passer la largeur minimale des cartes de 140 à 200 px et observez le changement.",
    "code": ".grille { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,140px),1fr)); gap:1rem; } .grille span { background:#0c4a6e; color:white; padding:1rem; border-radius:10px; }",
    "expected": "La grille se réorganise en fonction de l’espace disponible.",
    "caution": "Une largeur minimale trop importante peut provoquer du débordement.",
    "question": "Quel outil CSS répartit des cartes en colonnes adaptatives ?",
    "choices": [
      "CSS Grid",
      "La balise <table>",
      "L’attribut href"
    ],
    "answer": 0,
    "reason": "Grid est conçu pour les mises en page bidimensionnelles."
  },
  {
    "id": "mission-css-3",
    "language": "css",
    "level": "Avancé",
    "title": "Concevoir un thème respectueux des préférences",
    "context": "Une interface pédagogique propose clair/sombre et des micro-interactions.",
    "aim": "Prendre en compte les préférences du système et les états de focus.",
    "objectives": [
      "Définir une palette contrastée.",
      "Respecter prefers-reduced-motion.",
      "Conserver un focus clavier visible."
    ],
    "task": "Ajoutez un état focus-visible très contrasté à l’élément interactif.",
    "code": ":root{color-scheme:light;} @media(prefers-color-scheme:dark){:root{color-scheme:dark;}} button:focus-visible{outline:3px solid #f59e0b;outline-offset:3px;} @media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;transition-duration:0.01ms!important;}}",
    "expected": "Un utilisateur clavier repère clairement le focus, indépendamment des préférences de mouvement.",
    "caution": "La media query CSS ne suffit pas à elle seule pour piloter un bouton manuel de thème.",
    "question": "Que signale prefers-reduced-motion: reduce ?",
    "choices": [
      "Le besoin de réduire les animations",
      "La fermeture de la page",
      "L’interdiction de Grid"
    ],
    "answer": 0,
    "reason": "Cette préférence peut guider la réduction des animations non essentielles."
  },
  {
    "id": "mission-xml-1",
    "language": "xml",
    "level": "Débutant",
    "title": "Créer un document bien formé",
    "context": "Une médiathèque échange sa liste de documents.",
    "aim": "Respecter une racine unique, la casse des balises et leur imbrication.",
    "objectives": [
      "Identifier l’élément racine.",
      "Distinguer attribut et sous-élément.",
      "Corriger les balises non fermées."
    ],
    "task": "Ajoutez un second livre en conservant exactement une racine.",
    "code": "<?xml version=\"1.0\"?><catalogue><livre ref=\"L1\"><titre>Documents</titre><auteur>Amina</auteur></livre></catalogue>",
    "expected": "L’analyse XML réussit et le catalogue contient deux livres enfants.",
    "caution": "Bien formé ne signifie pas conforme à une DTD ou à un XSD.",
    "question": "Combien d’éléments racines possède un document XML bien formé ?",
    "choices": [
      "Un seul",
      "Au moins deux",
      "Autant que de livres"
    ],
    "answer": 0,
    "reason": "Un document XML possède exactement un élément document racine."
  },
  {
    "id": "mission-xml-2",
    "language": "xml",
    "level": "Intermédiaire",
    "title": "Associer des vocabulaires par namespaces",
    "context": "Un dossier combine données métier et métadonnées de provenance.",
    "aim": "Identifier les éléments par leur espace de noms plutôt que par leur préfixe seul.",
    "objectives": [
      "Déclarer les espaces de noms sur la racine.",
      "Identifier les noms qualifiés.",
      "Comprendre l’utilité d’URI distinctes."
    ],
    "task": "Remplacez le préfixe m par meta, dans la déclaration et les éléments, sans changer son URI.",
    "code": "<d:dossier xmlns:d=\"urn:exemple:dossier\" xmlns:m=\"urn:exemple:meta\"><m:source>Bibliothèque</m:source><d:document id=\"d1\"><d:titre>Archives</d:titre></d:document></d:dossier>",
    "expected": "Le document reste bien formé et les métadonnées restent dans le même namespace.",
    "caution": "Un préfixe n’est pas l’identité durable d’un espace de noms.",
    "question": "Qu’est-ce qui identifie réellement un élément qualifié XML ?",
    "choices": [
      "Sa couleur CSS",
      "L’URI du namespace et son nom local",
      "Le nom seul de son préfixe"
    ],
    "answer": 1,
    "reason": "Les préfixes sont des alias pour des URI d’espaces de noms."
  },
  {
    "id": "mission-xml-3",
    "language": "xml",
    "level": "Avancé",
    "title": "Préparer un modèle de validation documentaire",
    "context": "Un catalogue doit satisfaire un contrat de structure.",
    "aim": "Distinguer la bonne formation XML de la validation contre une grammaire.",
    "objectives": [
      "Identifier des attributs obligatoires.",
      "Repérer les éléments répétés.",
      "Énoncer quelles contraintes relèvent d’une DTD ou d’un XSD."
    ],
    "task": "Expliquez quelles contraintes permettraient de garantir que chaque livre a un identifiant et un prix numérique.",
    "code": "<catalogue><livre id=\"L1\"><titre>XML en pratique</titre><prix devise=\"MAD\">85.50</prix></livre></catalogue>",
    "expected": "Le XML est analysable ; un schéma dédié pourrait contrôler la présence d’id et le type décimal du prix.",
    "caution": "Le DOMParser natif vérifie la syntaxe, pas une validation XSD complète.",
    "question": "Laquelle de ces vérifications exige un véritable contrat de validation ?",
    "choices": [
      "La racine unique",
      "Un prix conforme à un type décimal",
      "Les guillemets des attributs"
    ],
    "answer": 1,
    "reason": "Le type des valeurs métier relève d’une validation de schéma, et non de la simple bonne formation."
  },
  {
    "id": "mission-markdown-1",
    "language": "markdown",
    "level": "Débutant",
    "title": "Rédiger des notes structurées",
    "context": "Un étudiant partage une fiche de révision.",
    "aim": "Différencier titres, listes et texte emphatique.",
    "objectives": [
      "Utiliser # et ## pour les titres.",
      "Écrire une liste sans HTML.",
      "Reconnaître le code en ligne avec des accents graves."
    ],
    "task": "Ajoutez une section « Pour approfondir » et deux notions à retenir.",
    "code": "# Révision\n\n## À retenir\n- La structure porte du sens\n- Les exemples expliquent la syntaxe\n\n**Exercice :** rédiger une fiche.",
    "expected": "Les rubriques et listes restent lisibles en texte brut et dans un moteur Markdown.",
    "caution": "Un titre Markdown doit être séparé de son texte pour une bonne lisibilité.",
    "question": "Comment écrit-on un titre de niveau 2 en Markdown ?",
    "choices": [
      "## Titre",
      "<h6>Titre",
      "// Titre"
    ],
    "answer": 0,
    "reason": "Deux dièses et un espace introduisent généralement un titre de niveau 2."
  },
  {
    "id": "mission-markdown-2",
    "language": "markdown",
    "level": "Intermédiaire",
    "title": "Documenter un tutoriel technique",
    "context": "Un club diffuse une procédure de démarrage.",
    "aim": "Créer un plan ordonné, un lien et un bloc de code.",
    "objectives": [
      "Distinguer texte explicatif et code exécutable.",
      "Employer des liens descriptifs.",
      "Prévoir les prérequis d’une procédure."
    ],
    "task": "Ajoutez une étape de validation ainsi qu’un lien vers une documentation.",
    "code": "# Guide de démarrage\n\n1. Installer les dépendances\n2. Lancer le projet\n\n\`\`\`sh\nnpm install\nnpm run build\n\`\`\`\n\nConsulter [la documentation](https://example.org).",
    "expected": "Les commandes restent distinctes des explications, le lien possède une étiquette.",
    "caution": "Le moteur de prévisualisation simplifié peut ne pas couvrir toutes les extensions Markdown.",
    "question": "Qu’indique une clôture avec trois accents graves ?",
    "choices": [
      "Un tableau",
      "Un bloc de code",
      "Une image"
    ],
    "answer": 1,
    "reason": "Les clôtures à trois accents graves délimitent un bloc de code."
  },
  {
    "id": "mission-markdown-3",
    "language": "markdown",
    "level": "Avancé",
    "title": "Construire une documentation de projet",
    "context": "Une équipe souhaite conserver ses décisions et son suivi.",
    "aim": "Distinguer Markdown de base et extensions comme les tableaux et tâches.",
    "objectives": [
      "Rédiger une section d’architecture.",
      "Présenter des décisions vérifiables.",
      "Identifier les extensions propres à certains moteurs."
    ],
    "task": "Ajoutez un risque et un critère d’acceptation au suivi.",
    "code": "# Décisions du projet\n\n| Sujet | Choix |\n|---|---|\n| Format | XML |\n\n- [x] Définir le périmètre\n- [ ] Tester l’accessibilité",
    "expected": "Les informations sont structurées ; leur rendu étendu dépend de l’implémentation Markdown.",
    "caution": "Les tableaux et cases à cocher sont des extensions et ne sont pas universels dans tous les moteurs.",
    "question": "Pourquoi tester le rendu sur le moteur cible ?",
    "choices": [
      "Les extensions sont variables",
      "Les espaces sont toujours interdits",
      "Les titres ne sont jamais pris en charge"
    ],
    "answer": 0,
    "reason": "Les extensions Markdown ne sont pas implémentées de façon identique partout."
  },
  {
    "id": "mission-latex-1",
    "language": "latex",
    "level": "Débutant",
    "title": "Composer une expression mathématique",
    "context": "Un enseignant prépare une fiche de fractions.",
    "aim": "Reconnaître les commandes et les arguments entre accolades.",
    "objectives": [
      "Identifier les arguments de frac.",
      "Composer un exposant avec ^.",
      "Tester le rendu sans assimiler affichage et calcul."
    ],
    "task": "Remplacez le second terme par une racine carrée et vérifiez la syntaxe.",
    "code": "\\frac{1}{2}+\\frac{1}{4}=\\frac{3}{4}",
    "expected": "Les fractions sont affichées lisiblement ; leur égalité est à vérifier mathématiquement.",
    "caution": "KaTeX n’effectue pas un calcul symbolique ni la compilation de toute la chaîne LaTeX.",
    "question": "Combien d’arguments attend généralement \\frac ?",
    "choices": [
      "Un",
      "Deux",
      "Quatre"
    ],
    "answer": 1,
    "reason": "La fraction a un numérateur et un dénominateur."
  },
  {
    "id": "mission-latex-2",
    "language": "latex",
    "level": "Intermédiaire",
    "title": "Présenter une suite et une somme",
    "context": "Un rapport scientifique doit présenter une formule de moyenne.",
    "aim": "Maîtriser indices, somme et fraction dans une même expression.",
    "objectives": [
      "Utiliser les indices _i.",
      "Reconnaître sum et ses bornes.",
      "Séparer notation mathématique et traitement de données."
    ],
    "task": "Écrivez la moyenne pondérée avec un poids w_i pour chaque valeur.",
    "code": "\\bar{x}=\\frac{1}{n}\\sum_{i=1}^{n}x_i",
    "expected": "Les bornes et les indices sont lisibles, sans calcul automatique de la somme.",
    "caution": "Une expression bien rendue peut encore être mathématiquement incorrecte.",
    "question": "Quel symbole construit une somme en LaTeX ?",
    "choices": [
      "\\sum",
      "\\sqrt",
      "\\frac"
    ],
    "answer": 0,
    "reason": "La commande sum représente l’opérateur de sommation."
  },
  {
    "id": "mission-latex-3",
    "language": "latex",
    "level": "Avancé",
    "title": "Construire une démonstration alignée",
    "context": "Un article nécessite plusieurs égalités sur des lignes alignées.",
    "aim": "Composer des expressions multi-lignes dans un environnement mathématique pris en charge.",
    "objectives": [
      "Comprendre l’alignement avec &.",
      "Séparer les lignes par \\\\.",
      "Distinguer le rendu KaTeX d’un document LaTeX complet."
    ],
    "task": "Ajoutez une troisième égalité et contrôlez la cohérence du développement.",
    "code": "\\begin{aligned}(a+b)^2 &= (a+b)(a+b)\\\\ &=a^2+2ab+b^2\\end{aligned}",
    "expected": "Les deux égalités sont alignées ; un nouveau saut de ligne améliore la démonstration.",
    "caution": "Le rendu n’établit pas qu’une démonstration est logiquement valide.",
    "question": "À quoi sert le caractère & dans aligned ?",
    "choices": [
      "À marquer un point d’alignement",
      "À produire un commentaire",
      "À terminer une équation"
    ],
    "answer": 0,
    "reason": "Le & définit la colonne servant d’axe d’alignement."
  },
  {
    "id": "mission-json-1",
    "language": "json",
    "level": "Débutant",
    "title": "Distinguer les types JSON",
    "context": "Un événement scolaire est décrit pour une application.",
    "aim": "Utiliser correctement chaînes, nombres, booléens et tableaux.",
    "objectives": [
      "Identifier les guillemets doubles.",
      "Distinguer les tableaux et objets.",
      "Repérer true/false et null."
    ],
    "task": "Ajoutez une propriété lieux contenant deux chaînes.",
    "code": "{\"titre\":\"Atelier\",\"places\":20,\"gratuit\":true,\"themes\":[\"HTML\",\"CSS\"],\"annule\":false}",
    "expected": "Le document est accepté par JSON.parse et conserve les types attendus.",
    "caution": "Les commentaires et virgules finales ne font pas partie de JSON standard.",
    "question": "Quel type possède la valeur true en JSON ?",
    "choices": [
      "Chaîne",
      "Booléen",
      "Nombre"
    ],
    "answer": 1,
    "reason": "true est un booléen, sans guillemets."
  },
  {
    "id": "mission-json-2",
    "language": "json",
    "level": "Intermédiaire",
    "title": "Modéliser une commande",
    "context": "Une librairie échange des paniers de commande.",
    "aim": "Utiliser une liste d’objets et éviter les redondances.",
    "objectives": [
      "Créer un objet commande.",
      "Répéter une structure article cohérente.",
      "Distinguer quantité numérique et prix."
    ],
    "task": "Ajoutez un article et calculez séparément le montant total.",
    "code": "{\"commande\":\"C-27\",\"articles\":[{\"sku\":\"L1\",\"quantite\":2,\"prix\":25.5},{\"sku\":\"L2\",\"quantite\":1,\"prix\":40}],\"devise\":\"MAD\"}",
    "expected": "Le panier reste un JSON valide avec des objets dans la liste articles.",
    "caution": "La syntaxe JSON ne garantit ni le stock disponible ni l’exactitude du total.",
    "question": "Comment représente-t-on une liste de produits en JSON ?",
    "choices": [
      "Avec des crochets []",
      "Avec des balises <item>",
      "Avec @produit"
    ],
    "answer": 0,
    "reason": "Les tableaux JSON sont délimités par des crochets."
  },
  {
    "id": "mission-json-3",
    "language": "json",
    "level": "Avancé",
    "title": "Concevoir un contrat d’API robuste",
    "context": "Un portail universitaire doit paginer les résultats.",
    "aim": "Séparer données, métadonnées et diagnostics.",
    "objectives": [
      "Définir un champ status stable.",
      "Regrouper les éléments dans une liste.",
      "Énoncer ce que JSON Schema validerait."
    ],
    "task": "Simulez une réponse sans résultat et un tableau d’erreurs cohérent.",
    "code": "{\"status\":\"success\",\"meta\":{\"page\":1,\"limit\":10,\"total\":1},\"data\":[{\"id\":\"U1\",\"nom\":\"UE XML\"}],\"errors\":[]}",
    "expected": "Le client peut distinguer succès, pagination et erreurs ; un schéma serait nécessaire pour valider un contrat.",
    "caution": "JSON valide ne signifie pas JSON conforme à l’API de votre application.",
    "question": "Quel outil décrit des contraintes sur types et champs JSON ?",
    "choices": [
      "CSS Grid",
      "JSON Schema",
      "XSLT"
    ],
    "answer": 1,
    "reason": "JSON Schema spécifie des règles de validation et d’annotation des données JSON."
  },
  {
    "id": "mission-yaml-1",
    "language": "yaml",
    "level": "Débutant",
    "title": "Comprendre les niveaux d’indentation",
    "context": "Une association stocke la configuration d’une animation.",
    "aim": "Former un mapping hiérarchique avec espaces.",
    "objectives": [
      "Repérer la structure clé: valeur.",
      "Identifier l’indentation des sous-clés.",
      "Ne pas utiliser de tabulations pour l’indentation."
    ],
    "task": "Ajoutez une clé lieu dans evenement, puis une clé responsable au même niveau.",
    "code": "evenement:\n  titre: Atelier des savoirs\n  ouvert: true\n  capacite: 40",
    "expected": "La configuration conserve une hiérarchie cohérente.",
    "caution": "Un aperçu textuel ne garantit pas qu’un parseur YAML complet accepterait tous les cas.",
    "question": "Comment exprime-t-on l’imbrication YAML ?",
    "choices": [
      "Avec des espaces cohérents",
      "Avec des balises fermantes",
      "Avec des points-virgules"
    ],
    "answer": 0,
    "reason": "L’indentation de blocs YAML utilise des espaces."
  },
  {
    "id": "mission-yaml-2",
    "language": "yaml",
    "level": "Intermédiaire",
    "title": "Structurer une liste d’environnements",
    "context": "Une application utilise test et production.",
    "aim": "Combiner mappings et séquences en respectant les retraits.",
    "objectives": [
      "Comprendre le tiret comme élément d’une séquence.",
      "Conserver les mêmes propriétés par environnement.",
      "Distinguer booléens et chaînes."
    ],
    "task": "Ajoutez un environnement de préproduction avec debug à false.",
    "code": "application:\n  environnements:\n    - nom: test\n      debug: true\n    - nom: production\n      debug: false",
    "expected": "Les éléments de la liste sont alignés et conservent les mêmes clés.",
    "caution": "Attention aux valeurs ambiguës suivant les versions et bibliothèques YAML.",
    "question": "Quel marqueur commence généralement un élément de séquence en YAML ?",
    "choices": [
      "Le tiret -",
      "Le point-virgule ;",
      "L’astérisque de fermeture"
    ],
    "answer": 0,
    "reason": "Le tiret suivi d’un espace introduit un élément d’une séquence bloc."
  },
  {
    "id": "mission-yaml-3",
    "language": "yaml",
    "level": "Avancé",
    "title": "Documenter une configuration de services",
    "context": "Un portail doit déployer plusieurs modules cohérents.",
    "aim": "Reconnaître les limites entre syntaxe et validation métier.",
    "objectives": [
      "Structurer les services par nom et port.",
      "Ajouter des valeurs facultatives.",
      "Distinguer secret et simple configuration."
    ],
    "task": "Ajoutez un service d’indexation avec son port, sans exposer de véritable clé secrète.",
    "code": "portail:\n  version: 2\n  services:\n    - nom: documentation\n      port: 8080\n    - nom: recherches\n      port: 8081\n  journalisation: false",
    "expected": "Les services forment une séquence de mappings cohérente ; le comportement réel dépend de l’application.",
    "caution": "Un fichier YAML ne chiffre pas les secrets. N’y placez pas des identifiants réels dans un exemple public.",
    "question": "Qu’est-ce qui garantit qu’un port choisi est autorisé par l’application ?",
    "choices": [
      "La seule indentation YAML",
      "Une règle de validation applicative",
      "La présence de tirets"
    ],
    "answer": 1,
    "reason": "La grammaire YAML décrit le format, pas toutes les contraintes métier."
  }
];
