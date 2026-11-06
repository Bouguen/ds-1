import type { ExtendedExample } from './extendedExamples';

/** Extension de la bibliothèque : exemples nouveaux, y compris erreurs explicitement signalées. */
export const ADVANCED_EXAMPLES: ExtendedExample[] = [
  {
    "id": "advanced-html-1",
    "language": "html",
    "category": "Notions",
    "title": "Article et métadonnées",
    "code": "<article><header><h2>La structure du Web</h2><p><time datetime=\"2026-11-06\">6 novembre 2026</time></p></header><p>HTML apporte du sens.</p></article>",
    "explanation": "Associer un article autonome à sa date.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-html-2",
    "language": "html",
    "category": "Notions",
    "title": "Navigation avec ancrages",
    "code": "<nav aria-label=\"Sommaire\"><a href=\"#intro\">Introduction</a><a href=\"#ex\">Exercices</a></nav><main><section id=\"intro\"><h2>Introduction</h2></section><section id=\"ex\"><h2>Exercices</h2></section></main>",
    "explanation": "Relier une navigation aux sections.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-html-3",
    "language": "html",
    "category": "Notions",
    "title": "Liste descriptive",
    "code": "<dl><dt>HTML</dt><dd>Structure du document.</dd><dt>CSS</dt><dd>Présentation du document.</dd></dl>",
    "explanation": "Utiliser dl pour décrire des notions.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-html-4",
    "language": "html",
    "category": "Applications",
    "title": "Citation attribuée",
    "code": "<figure><blockquote><p>La structure précède la présentation.</p></blockquote><figcaption>Principe de conception</figcaption></figure>",
    "explanation": "Donner une source ou attribution aux citations.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-html-5",
    "language": "html",
    "category": "Applications",
    "title": "Saisie avec validation",
    "code": "<form><label for=\"age\">Âge</label><input type=\"number\" id=\"age\" min=\"12\" max=\"99\" required><button>Vérifier</button></form>",
    "explanation": "Les contraintes natives rendent la saisie plus fiable.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-html-6",
    "language": "html",
    "category": "Applications",
    "title": "Adresse et contact",
    "code": "<address><a href=\"mailto:contact@example.org\">Écrire au centre documentaire</a></address>",
    "explanation": "address identifie les coordonnées de contact.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-html-7",
    "language": "html",
    "category": "Diagnostic et approfondissement",
    "title": "Tableau à plusieurs groupes",
    "code": "<table><caption>Modules</caption><thead><tr><th scope=\"col\">Module</th><th scope=\"col\">Heures</th></tr></thead><tbody><tr><td>HTML</td><td>4</td></tr><tr><td>XML</td><td>6</td></tr></tbody><tfoot><tr><th scope=\"row\">Total</th><td>10</td></tr></tfoot></table>",
    "explanation": "Distinguer en-tête, données et total.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-html-8",
    "language": "html",
    "category": "Diagnostic et approfondissement",
    "title": "Information temporelle",
    "code": "<p>Le prochain atelier commence le <time datetime=\"2026-12-01T09:00\">1er décembre à 9 h</time>.</p>",
    "explanation": "L'attribut datetime rend la date interprétable.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xhtml-1",
    "language": "xhtml",
    "category": "Notions",
    "title": "Document XHTML élémentaire",
    "code": "<?xml version=\"1.0\"?><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title>Atelier</title></head><body><h1>XHTML</h1><p>Bien formé.</p></body></html>",
    "explanation": "Une racine html et des fermetures strictes.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xhtml-2",
    "language": "xhtml",
    "category": "Notions",
    "title": "Élément vide",
    "code": "<p xmlns=\"http://www.w3.org/1999/xhtml\">Ligne 1<br />Ligne 2</p>",
    "explanation": "La syntaxe XML exige un élément vide fermé.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xhtml-3",
    "language": "xhtml",
    "category": "Notions",
    "title": "Attribut entre guillemets",
    "code": "<input xmlns=\"http://www.w3.org/1999/xhtml\" type=\"text\" name=\"nom\" value=\"Exemple\" />",
    "explanation": "Chaque attribut possède une valeur délimitée.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xhtml-4",
    "language": "xhtml",
    "category": "Applications",
    "title": "Imbrication contrôlée",
    "code": "<section xmlns=\"http://www.w3.org/1999/xhtml\"><h2>Chapitre</h2><p>Texte <strong>important</strong>.</p></section>",
    "explanation": "La hiérarchie des balises reste correctement imbriquée.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xhtml-5",
    "language": "xhtml",
    "category": "Applications",
    "title": "Erreur volontaire : attribut sans valeur",
    "code": "<input type=text />",
    "explanation": "Un attribut sans guillemets rend l'extrait non conforme à XML.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xhtml-6",
    "language": "xhtml",
    "category": "Applications",
    "title": "Erreur volontaire : fermeture",
    "code": "<p><em>Attention</p></em>",
    "explanation": "Une mauvaise imbrication est une erreur de bonne formation.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xhtml-7",
    "language": "xhtml",
    "category": "Diagnostic et approfondissement",
    "title": "Entités protégées",
    "code": "<p xmlns=\"http://www.w3.org/1999/xhtml\">3 &lt; 5 et A &amp; B.</p>",
    "explanation": "Échapper les caractères ayant un rôle syntaxique.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xhtml-8",
    "language": "xhtml",
    "category": "Diagnostic et approfondissement",
    "title": "Table et portée",
    "code": "<table xmlns=\"http://www.w3.org/1999/xhtml\"><tr><th scope=\"col\">Titre</th></tr><tr><td>Document</td></tr></table>",
    "explanation": "Un tableau XHTML garde les attributs HTML usuels.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xml-1",
    "language": "xml",
    "category": "Notions",
    "title": "Catalogue musical",
    "code": "<catalogue><album id=\"a1\"><titre>Harmonie</titre><annee>2025</annee></album><album id=\"a2\"><titre>Rythmes</titre><annee>2026</annee></album></catalogue>",
    "explanation": "Des éléments répétés constituent une collection.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xml-2",
    "language": "xml",
    "category": "Notions",
    "title": "Personne et adresse",
    "code": "<personne><nom>Samira</nom><adresse><ville>Rabat</ville><pays>Maroc</pays></adresse></personne>",
    "explanation": "Modéliser des données imbriquées.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xml-3",
    "language": "xml",
    "category": "Notions",
    "title": "Données multilingues",
    "code": "<messages><message xml:lang=\"fr\">Bonjour</message><message xml:lang=\"ar\">مرحبا</message></messages>",
    "explanation": "L'attribut xml:lang précise la langue.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xml-4",
    "language": "xml",
    "category": "Applications",
    "title": "Espace de noms imbriqué",
    "code": "<bibliotheque xmlns=\"urn:livres\"><livre><titre>XML</titre></livre></bibliotheque>",
    "explanation": "Les éléments héritent de l'espace de noms par défaut.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xml-5",
    "language": "xml",
    "category": "Applications",
    "title": "Attribut de statut",
    "code": "<commande id=\"c001\" statut=\"payee\"><total devise=\"MAD\">120</total></commande>",
    "explanation": "Distinguer propriétés et contenu textuel.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xml-6",
    "language": "xml",
    "category": "Applications",
    "title": "Élément vide",
    "code": "<catalogue><livre id=\"1\"/><livre id=\"2\"/></catalogue>",
    "explanation": "Une balise autofermante est valide en XML.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xml-7",
    "language": "xml",
    "category": "Diagnostic et approfondissement",
    "title": "Référence Unicode",
    "code": "<symbole>&#x2665;</symbole>",
    "explanation": "La référence hexadécimale insère un caractère.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xml-8",
    "language": "xml",
    "category": "Diagnostic et approfondissement",
    "title": "Erreur volontaire : deux racines",
    "code": "<livre/><auteur/>",
    "explanation": "Un document XML doit posséder un seul élément racine.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-dtd-1",
    "language": "dtd",
    "category": "Notions",
    "title": "Séquence de cours",
    "code": "<!ELEMENT cours (titre, chapitre+)><!ELEMENT titre (#PCDATA)><!ELEMENT chapitre (#PCDATA)>",
    "explanation": "Une séquence suivie d'une répétition.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-dtd-2",
    "language": "dtd",
    "category": "Notions",
    "title": "Choix de coordonnées",
    "code": "<!ELEMENT contact (email | telephone)>",
    "explanation": "Un seul choix parmi deux types d'éléments.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-dtd-3",
    "language": "dtd",
    "category": "Notions",
    "title": "Liste éventuellement vide",
    "code": "<!ELEMENT bibliotheque (livre*)>",
    "explanation": "L'astérisque admet zéro ou plusieurs livres.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-dtd-4",
    "language": "dtd",
    "category": "Applications",
    "title": "Élément textuel",
    "code": "<!ELEMENT auteur (#PCDATA)>",
    "explanation": "Déclarer un élément de texte.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-dtd-5",
    "language": "dtd",
    "category": "Applications",
    "title": "Attribut d'identification",
    "code": "<!ATTLIST chapitre id ID #REQUIRED>",
    "explanation": "Garantir un identifiant obligatoire.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-dtd-6",
    "language": "dtd",
    "category": "Applications",
    "title": "Référence à un identifiant",
    "code": "<!ATTLIST emprunt refLivre IDREF #REQUIRED>",
    "explanation": "Associer un attribut à l'identifiant d'un autre élément.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-dtd-7",
    "language": "dtd",
    "category": "Diagnostic et approfondissement",
    "title": "Valeur par défaut",
    "code": "<!ATTLIST cours langue CDATA \"fr\">",
    "explanation": "La DTD fournit une valeur si l'attribut manque.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-dtd-8",
    "language": "dtd",
    "category": "Diagnostic et approfondissement",
    "title": "Valeur imposée",
    "code": "<!ATTLIST cours format CDATA #FIXED \"numerique\">",
    "explanation": "La valeur fixe doit être respectée.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-entities-1",
    "language": "entities",
    "category": "Notions",
    "title": "Caractère inférieur",
    "code": "<expression>3 &lt; 5</expression>",
    "explanation": "lt protège le symbole inférieur.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-entities-2",
    "language": "entities",
    "category": "Notions",
    "title": "Caractère supérieur",
    "code": "<expression>7 &gt; 4</expression>",
    "explanation": "gt représente le signe supérieur.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-entities-3",
    "language": "entities",
    "category": "Notions",
    "title": "Esperluette",
    "code": "<entreprise>A &amp; B</entreprise>",
    "explanation": "amp permet l'esperluette littérale.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-entities-4",
    "language": "entities",
    "category": "Applications",
    "title": "Guillemet d'attribut",
    "code": "<citation texte=\"Elle dit &quot;bonjour&quot;\"/>",
    "explanation": "quot évite de fermer la valeur de l'attribut.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-entities-5",
    "language": "entities",
    "category": "Applications",
    "title": "Entité interne répétée",
    "code": "<!DOCTYPE doc [<!ENTITY ecole \"École des sciences\">]><doc><titre>&ecole;</titre><auteur>&ecole;</auteur></doc>",
    "explanation": "Une déclaration interne évite les répétitions.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-entities-6",
    "language": "entities",
    "category": "Applications",
    "title": "Code de caractère",
    "code": "<texte>&#65; = A</texte>",
    "explanation": "Le code décimal 65 correspond à A.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-entities-7",
    "language": "entities",
    "category": "Diagnostic et approfondissement",
    "title": "Caractère accentué en hexadécimal",
    "code": "<texte>&#x00E9; = é</texte>",
    "explanation": "Une référence peut représenter un caractère accentué.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-entities-8",
    "language": "entities",
    "category": "Diagnostic et approfondissement",
    "title": "Paramètre d'une DTD",
    "code": "<!ENTITY % liste \"(titre, auteur, date)\"><!ELEMENT document %liste;>",
    "explanation": "Une entité paramètre réutilise une expression de contenu.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xpath-1",
    "language": "xpath",
    "category": "Notions",
    "title": "Tous les titres",
    "code": "//livre/titre",
    "explanation": "Les descendants titre des livres.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xpath-2",
    "language": "xpath",
    "category": "Notions",
    "title": "Filtre de langue",
    "code": "//livre[@langue='fr']",
    "explanation": "Choisir des nœuds par attribut.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xpath-3",
    "language": "xpath",
    "category": "Notions",
    "title": "Seconde position",
    "code": "(/bibliotheque/livre)[2]",
    "explanation": "Une sélection positionnelle commence à 1.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xpath-4",
    "language": "xpath",
    "category": "Applications",
    "title": "Somme des années",
    "code": "sum(//livre/annee)",
    "explanation": "sum convertit et additionne les valeurs numériques.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xpath-5",
    "language": "xpath",
    "category": "Applications",
    "title": "Nombre de livres",
    "code": "count(/bibliotheque/livre)",
    "explanation": "Compter les nœuds sélectionnés.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xpath-6",
    "language": "xpath",
    "category": "Applications",
    "title": "Titre d'un livre précis",
    "code": "//livre[@id='l1']/titre/text()",
    "explanation": "Extraire la valeur du texte.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xpath-7",
    "language": "xpath",
    "category": "Diagnostic et approfondissement",
    "title": "Recherche partielle",
    "code": "//livre[contains(titre,'XML')]",
    "explanation": "Détecter une sous-chaîne dans les titres.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xpath-8",
    "language": "xpath",
    "category": "Diagnostic et approfondissement",
    "title": "Livres récents",
    "code": "//livre[annee >= 2025]",
    "explanation": "Comparer une valeur numérique.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xslt-1",
    "language": "xslt",
    "category": "Notions",
    "title": "Gabarit de titre",
    "code": "<xsl:template match=\"titre\"><h2><xsl:value-of select=\".\"/></h2></xsl:template>",
    "explanation": "Le point XPath désigne le nœud courant.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xslt-2",
    "language": "xslt",
    "category": "Notions",
    "title": "Afficher le nombre de livres",
    "code": "<p>Total : <xsl:value-of select=\"count(//livre)\"/></p>",
    "explanation": "Intégrer un calcul XPath dans la sortie.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xslt-3",
    "language": "xslt",
    "category": "Notions",
    "title": "Créer une liste",
    "code": "<ul><xsl:for-each select=\"//livre\"><li><xsl:value-of select=\"titre\"/></li></xsl:for-each></ul>",
    "explanation": "Une boucle transforme chaque livre en ligne.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xslt-4",
    "language": "xslt",
    "category": "Applications",
    "title": "Trier par titre",
    "code": "<xsl:for-each select=\"//livre\"><xsl:sort select=\"titre\"/><p><xsl:value-of select=\"titre\"/></p></xsl:for-each>",
    "explanation": "Le tri se fait avant la génération des paragraphes.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xslt-5",
    "language": "xslt",
    "category": "Applications",
    "title": "Condition de date",
    "code": "<xsl:if test=\"annee &gt; 2024\"><strong>Récent</strong></xsl:if>",
    "explanation": "Le signe supérieur doit être correctement échappé en XML.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xslt-6",
    "language": "xslt",
    "category": "Applications",
    "title": "Valeur par défaut",
    "code": "<xsl:choose><xsl:when test=\"auteur\"><xsl:value-of select=\"auteur\"/></xsl:when><xsl:otherwise>Inconnu</xsl:otherwise></xsl:choose>",
    "explanation": "Utiliser choose lorsqu'une branche alternative est nécessaire.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xslt-7",
    "language": "xslt",
    "category": "Diagnostic et approfondissement",
    "title": "Paramètre global",
    "code": "<xsl:param name=\"couleur\" select=\"'navy'\"/>",
    "explanation": "Un paramètre peut rendre une transformation configurable.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-xslt-8",
    "language": "xslt",
    "category": "Diagnostic et approfondissement",
    "title": "Tri numérique",
    "code": "<xsl:sort select=\"annee\" data-type=\"number\" order=\"descending\"/>",
    "explanation": "Éviter le tri lexicographique des nombres.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-css-1",
    "language": "css",
    "category": "Notions",
    "title": "Carte avec ombre",
    "code": ".carte { padding: 1rem; border-radius: 12px; box-shadow: 0 8px 20px #0002; }",
    "explanation": "Une carte détache un contenu de son arrière-plan.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-css-2",
    "language": "css",
    "category": "Notions",
    "title": "Variables de couleur",
    "code": ":root { --accent: #0369a1; } h2 { color: var(--accent); }",
    "explanation": "Les propriétés personnalisées centralisent le thème.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-css-3",
    "language": "css",
    "category": "Notions",
    "title": "Disposition en grille",
    "code": ".grille { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }",
    "explanation": "Une grille partage l'espace en colonnes.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-css-4",
    "language": "css",
    "category": "Applications",
    "title": "Effet de survol",
    "code": "button:hover { background: #075985; color: white; }",
    "explanation": "Une pseudo-classe décrit l'état d'interaction.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-css-5",
    "language": "css",
    "category": "Applications",
    "title": "Focus clavier",
    "code": "button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }",
    "explanation": "Le focus doit être facilement perceptible.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-css-6",
    "language": "css",
    "category": "Applications",
    "title": "Texte fluide",
    "code": "h2 { font-size: clamp(1.4rem, 3vw, 2.5rem); }",
    "explanation": "clamp garde une taille de texte maîtrisée.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-css-7",
    "language": "css",
    "category": "Diagnostic et approfondissement",
    "title": "Règle mobile",
    "code": "@media (max-width: 480px) { .grille { grid-template-columns: 1fr; } }",
    "explanation": "La grille passe à une seule colonne sur petit écran.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-css-8",
    "language": "css",
    "category": "Diagnostic et approfondissement",
    "title": "Bordure et espacement",
    "code": ".important { border-left: 4px solid #0284c7; padding: 0.75rem; margin-block: 1rem; }",
    "explanation": "Distinguer marge extérieure et padding intérieur.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-json-1",
    "language": "json",
    "category": "Notions",
    "title": "Inventaire simple",
    "code": "{\"produits\":[{\"id\":1,\"nom\":\"Livre\",\"stock\":12},{\"id\":2,\"nom\":\"Cahier\",\"stock\":30}]}",
    "explanation": "Un tableau contient des objets.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-json-2",
    "language": "json",
    "category": "Notions",
    "title": "API de pagination",
    "code": "{\"page\":2,\"parPage\":10,\"total\":42,\"data\":[{\"id\":11,\"titre\":\"XML\"}]}",
    "explanation": "Métadonnées et résultats sont séparés.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-json-3",
    "language": "json",
    "category": "Notions",
    "title": "Configuration de site",
    "code": "{\"site\":{\"titre\":\"Documents structurés\",\"langue\":\"fr\",\"public\":true}}",
    "explanation": "Un objet peut être imbriqué.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-json-4",
    "language": "json",
    "category": "Applications",
    "title": "Tableau multidimensionnel",
    "code": "{\"grille\":[[1,2],[3,4]]}",
    "explanation": "Une matrice peut être encodée comme tableau de tableaux.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-json-5",
    "language": "json",
    "category": "Applications",
    "title": "Coordonnées géographiques",
    "code": "{\"lieu\":\"Agadir\",\"coordonnees\":{\"latitude\":30.42,\"longitude\":-9.6}}",
    "explanation": "Les nombres ne sont pas des chaînes.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-json-6",
    "language": "json",
    "category": "Applications",
    "title": "Profil d'utilisateur",
    "code": "{\"prenom\":\"Salma\",\"roles\":[\"etudiante\",\"editrice\"],\"actif\":true}",
    "explanation": "Combiner chaîne, tableau et booléen.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-json-7",
    "language": "json",
    "category": "Diagnostic et approfondissement",
    "title": "Erreur volontaire : commentaire",
    "code": "{\"nom\":\"Cours\" /* commentaire interdit */}",
    "explanation": "JSON standard ne permet pas les commentaires.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-json-8",
    "language": "json",
    "category": "Diagnostic et approfondissement",
    "title": "Erreur volontaire : guillemets",
    "code": "{'nom':'XML'}",
    "explanation": "Les chaînes et les clés JSON nécessitent des guillemets doubles.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-markdown-1",
    "language": "markdown",
    "category": "Notions",
    "title": "Fiche de vocabulaire",
    "code": "# Vocabulaire\n\n**Balise** : élément HTML.\n\n**Attribut** : information associée.",
    "explanation": "Un document de révision très court.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-markdown-2",
    "language": "markdown",
    "category": "Notions",
    "title": "Liste de tâches",
    "code": "## Préparation\n- [x] Lire le cours\n- [ ] Tester le code\n- [ ] Valider le résultat",
    "explanation": "La checklist est une extension courante.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-markdown-3",
    "language": "markdown",
    "category": "Notions",
    "title": "Exemple de citation",
    "code": "> Structurer avant de présenter.\n\nUne citation apporte une idée forte.",
    "explanation": "Une citation est un bloc distinct.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-markdown-4",
    "language": "markdown",
    "category": "Applications",
    "title": "Tableau d'apprentissage",
    "code": "| Notion | Rôle |\n| --- | --- |\n| XML | Structure |\n| XPath | Recherche |\n| XSLT | Transformation |",
    "explanation": "Un tableau compare les technologies.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-markdown-5",
    "language": "markdown",
    "category": "Applications",
    "title": "Lien utile",
    "code": "[Documentation du Web](https://developer.mozilla.org/fr/)",
    "explanation": "Un lien possède un texte lisible.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-markdown-6",
    "language": "markdown",
    "category": "Applications",
    "title": "Bloc JavaScript",
    "code": "```javascript\nconst total = 3 + 4;\nconsole.log(total);\n```",
    "explanation": "L'étiquette identifie le langage dans le bloc de code.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-markdown-7",
    "language": "markdown",
    "category": "Diagnostic et approfondissement",
    "title": "Images accessibles",
    "code": "![Arbre contenant une racine et deux feuilles](arbre.svg)",
    "explanation": "Le texte alternatif rend la figure compréhensible.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-markdown-8",
    "language": "markdown",
    "category": "Diagnostic et approfondissement",
    "title": "Niveaux de titres",
    "code": "# Documents\n## Partie XML\n### Sous-section XPath",
    "explanation": "Les titres créent une hiérarchie.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-latex-1",
    "language": "latex",
    "category": "Notions",
    "title": "Document avec titre",
    "code": "\\documentclass{article}\n\\title{Les documents structurés}\n\\author{Équipe pédagogique}\n\\begin{document}\n\\maketitle\n\\end{document}",
    "explanation": "La classe et les métadonnées structurent le document.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-latex-2",
    "language": "latex",
    "category": "Notions",
    "title": "Section et sous-section",
    "code": "\\section{XML}\n\\subsection{Éléments}",
    "explanation": "La structure logique peut être automatisée.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-latex-3",
    "language": "latex",
    "category": "Notions",
    "title": "Fraction mathématique",
    "code": "\\frac{3}{4}+\\frac{1}{4}=1",
    "explanation": "Les arguments de frac définissent numérateur et dénominateur.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-latex-4",
    "language": "latex",
    "category": "Applications",
    "title": "Indice et exposant",
    "code": "x_i^2 + y_i^2 = r^2",
    "explanation": "Les indices et exposants sont explicites.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-latex-5",
    "language": "latex",
    "category": "Applications",
    "title": "Matrice diagonale",
    "code": "\\begin{pmatrix}1&0\\\\0&2\\end{pmatrix}",
    "explanation": "pmatrix crée une matrice entre parenthèses.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-latex-6",
    "language": "latex",
    "category": "Applications",
    "title": "Équation encadrée",
    "code": "\\boxed{a^2+b^2=c^2}",
    "explanation": "Mise en évidence d'un résultat mathématique.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-latex-7",
    "language": "latex",
    "category": "Diagnostic et approfondissement",
    "title": "Somme finie",
    "code": "\\sum_{k=1}^{n}k=\\frac{n(n+1)}{2}",
    "explanation": "Notation d'une somme à bornes finies.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-latex-8",
    "language": "latex",
    "category": "Diagnostic et approfondissement",
    "title": "Limite",
    "code": "\\lim_{x\\to 0}\\frac{\\sin x}{x}=1",
    "explanation": "Composer une limite avec une fraction.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-yaml-1",
    "language": "yaml",
    "category": "Notions",
    "title": "Identité d'un cours",
    "code": "cours:\n  titre: XML\n  niveau: debutant\n  heures: 8",
    "explanation": "L'indentation distingue le mapping cours.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-yaml-2",
    "language": "yaml",
    "category": "Notions",
    "title": "Catalogue d'articles",
    "code": "articles:\n  - id: 1\n    titre: HTML\n  - id: 2\n    titre: CSS",
    "explanation": "Une liste de mappings décrit une collection.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-yaml-3",
    "language": "yaml",
    "category": "Notions",
    "title": "Configuration d'application",
    "code": "app:\n  nom: atelier\n  port: 3000\n  actif: true",
    "explanation": "Entiers et booléens sont des scalaires.",
    "level": "Débutant",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-yaml-4",
    "language": "yaml",
    "category": "Applications",
    "title": "Variable d'environnement illustrative",
    "code": "environnement:\n  mode: developpement\n  logs: true",
    "explanation": "Une configuration hiérarchique.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-yaml-5",
    "language": "yaml",
    "category": "Applications",
    "title": "Bloc de texte",
    "code": "description: |\n  Première ligne de texte.\n  Deuxième ligne conservée.",
    "explanation": "Le caractère | conserve les retours à la ligne.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-yaml-6",
    "language": "yaml",
    "category": "Applications",
    "title": "Bloc replié",
    "code": "resume: >\n  Ceci est un texte\n  sur plusieurs lignes.",
    "explanation": "Le symbole > replie généralement les lignes.",
    "level": "Intermédiaire",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-yaml-7",
    "language": "yaml",
    "category": "Diagnostic et approfondissement",
    "title": "Citation explicite",
    "code": "code: \"007\"\nnegatif: \"-12\"",
    "explanation": "Les guillemets permettent de conserver les valeurs en chaînes.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  },
  {
    "id": "advanced-yaml-8",
    "language": "yaml",
    "category": "Diagnostic et approfondissement",
    "title": "Deux documents",
    "code": "---\nnom: atelier-1\n---\nnom: atelier-2",
    "explanation": "Un flux YAML peut contenir plusieurs documents.",
    "level": "Avancé",
    "source": "Exemple supplémentaire de mise en pratique"
  }
];
