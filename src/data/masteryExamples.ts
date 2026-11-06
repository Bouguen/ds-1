import type { ExtendedExample } from './extendedExamples';

/** Exemples complémentaires dédiés à la pratique guidée et aux fiches. */
export const MASTERY_EXAMPLES: ExtendedExample[] = [
  {
    "id": "mastery-html-1",
    "language": "html",
    "category": "Fondamentaux",
    "title": "Navigation accessible",
    "code": "<nav aria-label=\"Navigation principale\"><a href=\"#cours\">Cours</a> <a href=\"#exercices\">Exercices</a></nav>",
    "explanation": "Un nom accessible distingue les zones de navigation.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-html-2",
    "language": "html",
    "category": "Fondamentaux",
    "title": "Details interactifs",
    "code": "<details><summary>Qu'est-ce que le DOM ?</summary><p>Un arbre de nœuds représentant le document.</p></details>",
    "explanation": "details permet un panneau dépliant sans JavaScript.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-html-3",
    "language": "html",
    "category": "Applications",
    "title": "Figure et légende",
    "code": "<figure><img src=\"arbre.svg\" alt=\"Racine et deux enfants\"><figcaption>Structure d'un document</figcaption></figure>",
    "explanation": "figure relie un visuel à sa légende.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-html-4",
    "language": "html",
    "category": "Applications",
    "title": "Barre de progression",
    "code": "<label for=\"progression\">Avancement</label><progress id=\"progression\" value=\"65\" max=\"100\">65 %</progress>",
    "explanation": "progress exprime une progression mesurable.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-html-5",
    "language": "html",
    "category": "Approfondissement",
    "title": "Formulaire avec aide",
    "code": "<label for=\"nom\">Nom</label><input id=\"nom\" aria-describedby=\"aide\" required><small id=\"aide\">Champ obligatoire</small>",
    "explanation": "aria-describedby associe une aide au contrôle.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-html-6",
    "language": "html",
    "category": "Approfondissement",
    "title": "Tableau avec sections",
    "code": "<table><caption>Notes</caption><thead><tr><th scope=\"col\">Langage</th><th scope=\"col\">Note</th></tr></thead><tbody><tr><td>HTML</td><td>16</td></tr></tbody></table>",
    "explanation": "thead et tbody organisent les lignes.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xhtml-1",
    "language": "xhtml",
    "category": "Fondamentaux",
    "title": "Déclaration d'espace de noms",
    "code": "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title>Exemple</title></head><body><p>Valide</p></body></html>",
    "explanation": "XHTML utilise l'espace de noms de XHTML.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xhtml-2",
    "language": "xhtml",
    "category": "Fondamentaux",
    "title": "Balises fermées",
    "code": "<div><p>Texte <em>important</em>.</p></div>",
    "explanation": "Les éléments doivent être strictement imbriqués.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xhtml-3",
    "language": "xhtml",
    "category": "Applications",
    "title": "Attribut XML obligatoire",
    "code": "<input type=\"checkbox\" checked=\"checked\" />",
    "explanation": "Les attributs booléens HTML doivent avoir une valeur en XHTML.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xhtml-4",
    "language": "xhtml",
    "category": "Applications",
    "title": "Entités et échappement",
    "code": "<p>A &amp; B, 2 &lt; 3</p>",
    "explanation": "Échapper les caractères spéciaux.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xhtml-5",
    "language": "xhtml",
    "category": "Approfondissement",
    "title": "Saut de ligne",
    "code": "<p>Première ligne<br />Deuxième ligne</p>",
    "explanation": "Les éléments vides se terminent par />.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xhtml-6",
    "language": "xhtml",
    "category": "Approfondissement",
    "title": "Table structurée",
    "code": "<table><tr><th>Nom</th></tr><tr><td>XML</td></tr></table>",
    "explanation": "L'imbrication de chaque élément doit être respectée.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xml-1",
    "language": "xml",
    "category": "Fondamentaux",
    "title": "Attribut ID et référence",
    "code": "<catalogue><livre id=\"l1\"><titre>XML</titre></livre><pret livre=\"l1\"/></catalogue>",
    "explanation": "Lier des ressources par identifiant.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xml-2",
    "language": "xml",
    "category": "Fondamentaux",
    "title": "Imbrication profonde",
    "code": "<ecole><classe niveau=\"3\"><eleve><nom>Amine</nom></eleve></classe></ecole>",
    "explanation": "La profondeur correspond à la hiérarchie des données.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xml-3",
    "language": "xml",
    "category": "Applications",
    "title": "Deux espaces de noms",
    "code": "<page xmlns:h=\"urn:html\" xmlns:d=\"urn:donnees\"><h:titre>Catalogue</h:titre><d:livre>XML</d:livre></page>",
    "explanation": "Les préfixes différencient des vocabulaires.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xml-4",
    "language": "xml",
    "category": "Applications",
    "title": "Contenu mixte",
    "code": "<p>Lire <em>avec attention</em> ce paragraphe.</p>",
    "explanation": "Texte et sous-éléments peuvent coexister.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xml-5",
    "language": "xml",
    "category": "Approfondissement",
    "title": "Caractères numériques",
    "code": "<symbole>&#x03B1; et &#169;</symbole>",
    "explanation": "Les références numériques sont interprétées comme caractères.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xml-6",
    "language": "xml",
    "category": "Approfondissement",
    "title": "Structure bibliographique",
    "code": "<bibliotheque><livre isbn=\"123\"><titre>XML</titre><auteur>Équipe</auteur><annee>2026</annee></livre></bibliotheque>",
    "explanation": "Cas concret repris dans les ateliers DTD et XPath.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-dtd-1",
    "language": "dtd",
    "category": "Fondamentaux",
    "title": "DTD interne complète",
    "code": "<!DOCTYPE livre [<!ELEMENT livre (titre,auteur)><!ELEMENT titre (#PCDATA)><!ELEMENT auteur (#PCDATA)>]><livre><titre>XML</titre><auteur>Équipe</auteur></livre>",
    "explanation": "La DTD interne valide une structure simple.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-dtd-2",
    "language": "dtd",
    "category": "Fondamentaux",
    "title": "Attribut fixé",
    "code": "<!ATTLIST livre type CDATA #FIXED \"papier\">",
    "explanation": "#FIXED impose une valeur déterminée.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-dtd-3",
    "language": "dtd",
    "category": "Applications",
    "title": "Contenu vide",
    "code": "<!ELEMENT illustration EMPTY>",
    "explanation": "EMPTY n'autorise aucun enfant ni contenu textuel.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-dtd-4",
    "language": "dtd",
    "category": "Applications",
    "title": "Tout contenu autorisé",
    "code": "<!ELEMENT note ANY>",
    "explanation": "ANY est très permissif et rarement conseillé pour un schéma strict.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-dtd-5",
    "language": "dtd",
    "category": "Approfondissement",
    "title": "Enumération",
    "code": "<!ATTLIST eleve niveau (debutant|intermediaire|avance) \"debutant\">",
    "explanation": "Restreindre une valeur d'attribut à une liste.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-dtd-6",
    "language": "dtd",
    "category": "Approfondissement",
    "title": "Entité paramètre",
    "code": "<!ENTITY % contenu \"(titre,auteur)\"><!ELEMENT livre %contenu;>",
    "explanation": "Réutiliser un groupe de déclarations dans la DTD.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-entities-1",
    "language": "entities",
    "category": "Fondamentaux",
    "title": "Apostrophe",
    "code": "<citation phrase=\"C&apos;est important\"/>",
    "explanation": "apos évite de fermer prématurément un attribut.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-entities-2",
    "language": "entities",
    "category": "Fondamentaux",
    "title": "Entité interne de signature",
    "code": "<!DOCTYPE doc [<!ENTITY signature \"Centre documentaire\">]><doc>&signature;</doc>",
    "explanation": "Une déclaration interne évite la répétition.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-entities-3",
    "language": "entities",
    "category": "Applications",
    "title": "Entité numérique hexadécimale",
    "code": "<texte>&#x20AC;</texte>",
    "explanation": "Le point de code hexadécimal insère le symbole euro.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-entities-4",
    "language": "entities",
    "category": "Applications",
    "title": "Entité numérique décimale",
    "code": "<texte>&#8364;</texte>",
    "explanation": "La même valeur exprimée en décimal.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-entities-5",
    "language": "entities",
    "category": "Approfondissement",
    "title": "Paramètre réutilisé",
    "code": "<!ENTITY % titre \"(nom,prenom)\"><!ELEMENT personne %titre;>",
    "explanation": "Les entités paramètres sont propres au contexte DTD.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-entities-6",
    "language": "entities",
    "category": "Approfondissement",
    "title": "Caractères réservés",
    "code": "<comparaison>5 &gt; 4 et 2 &lt; 3</comparaison>",
    "explanation": "Les signes de comparaison sont échappés.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xpath-1",
    "language": "xpath",
    "category": "Fondamentaux",
    "title": "Livres en français",
    "code": "/bibliotheque/livre[@langue='fr']",
    "explanation": "Filtrer par attribut.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xpath-2",
    "language": "xpath",
    "category": "Fondamentaux",
    "title": "Livres après une date",
    "code": "//livre[annee > 2020]",
    "explanation": "Comparer le texte numérique des éléments.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xpath-3",
    "language": "xpath",
    "category": "Applications",
    "title": "Titres des livres",
    "code": "//livre/titre/text()",
    "explanation": "Sélectionner les nœuds textuels.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xpath-4",
    "language": "xpath",
    "category": "Applications",
    "title": "Deuxième livre",
    "code": "(/bibliotheque/livre)[2]",
    "explanation": "Les positions XPath débutent à 1.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xpath-5",
    "language": "xpath",
    "category": "Approfondissement",
    "title": "Auteur absent",
    "code": "//livre[not(auteur)]",
    "explanation": "Filtrer les éléments qui n'ont pas d'auteur enfant.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xpath-6",
    "language": "xpath",
    "category": "Approfondissement",
    "title": "Nom normalisé",
    "code": "normalize-space(//livre[1]/titre)",
    "explanation": "Supprimer les espaces superflus en XPath 1.0.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xslt-1",
    "language": "xslt",
    "category": "Fondamentaux",
    "title": "Modèle racine",
    "code": "<xsl:template match=\"/\"><h1><xsl:value-of select=\"/bibliotheque/livre[1]/titre\"/></h1></xsl:template>",
    "explanation": "Un gabarit transforme le document racine.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xslt-2",
    "language": "xslt",
    "category": "Fondamentaux",
    "title": "Lister les titres",
    "code": "<xsl:for-each select=\"/bibliotheque/livre\"><li><xsl:value-of select=\"titre\"/></li></xsl:for-each>",
    "explanation": "La boucle produit une ligne par livre.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xslt-3",
    "language": "xslt",
    "category": "Applications",
    "title": "Tri sur année",
    "code": "<xsl:for-each select=\"//livre\"><xsl:sort select=\"annee\" data-type=\"number\" order=\"descending\"/><p><xsl:value-of select=\"titre\"/></p></xsl:for-each>",
    "explanation": "Le tri numérique décroissant est explicite.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xslt-4",
    "language": "xslt",
    "category": "Applications",
    "title": "Test de disponibilité",
    "code": "<xsl:choose><xsl:when test=\"@disponible='oui'\">Disponible</xsl:when><xsl:otherwise>Indisponible</xsl:otherwise></xsl:choose>",
    "explanation": "Le choix conditionnel utilise les attributs.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xslt-5",
    "language": "xslt",
    "category": "Approfondissement",
    "title": "Paramètre de gabarit",
    "code": "<xsl:template name=\"etiquette\"><xsl:param name=\"texte\"/><strong><xsl:value-of select=\"$texte\"/></strong></xsl:template>",
    "explanation": "Un gabarit nommé accepte un paramètre.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-xslt-6",
    "language": "xslt",
    "category": "Approfondissement",
    "title": "Compte de livres",
    "code": "<xsl:value-of select=\"count(/bibliotheque/livre)\"/>",
    "explanation": "Une fonction XPath peut être insérée dans la sortie.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-css-1",
    "language": "css",
    "category": "Fondamentaux",
    "title": "Cascade",
    "code": "p { color: navy; } .important { color: darkred; }",
    "explanation": "Une règle de classe peut l'emporter sur un sélecteur de type.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-css-2",
    "language": "css",
    "category": "Fondamentaux",
    "title": "Disposition responsive",
    "code": ".cartes { display:grid; grid-template-columns: repeat(auto-fit,minmax(min(100%,230px),1fr)); gap:1rem; }",
    "explanation": "auto-fit s'adapte au nombre de colonnes disponibles.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-css-3",
    "language": "css",
    "category": "Applications",
    "title": "États focus",
    "code": "button:focus-visible { outline: 3px solid #0b75ba; outline-offset: 3px; }",
    "explanation": "Le focus doit rester visible au clavier.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-css-4",
    "language": "css",
    "category": "Applications",
    "title": "Typographie fluide",
    "code": "h1 { font-size: clamp(1.5rem, 4vw, 3rem); }",
    "explanation": "clamp borne la taille entre un minimum et un maximum.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-css-5",
    "language": "css",
    "category": "Approfondissement",
    "title": "Variable de thème",
    "code": ":root { --fond: #fff; } .carte { background: var(--fond); }",
    "explanation": "Une variable rend les styles réutilisables.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-css-6",
    "language": "css",
    "category": "Approfondissement",
    "title": "Animation respectueuse",
    "code": "@media (prefers-reduced-motion: reduce) { .carte { transition: none; } }",
    "explanation": "Respecter la préférence utilisateur pour réduire les mouvements.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-json-1",
    "language": "json",
    "category": "Fondamentaux",
    "title": "API avec métadonnées",
    "code": "{\"status\":\"ok\",\"meta\":{\"page\":2,\"total\":50},\"data\":[{\"id\":1,\"nom\":\"A\"}]}",
    "explanation": "Séparer données et pagination.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-json-2",
    "language": "json",
    "category": "Fondamentaux",
    "title": "Valeurs distinctes",
    "code": "{\"nom\":\"XML\",\"pages\":42,\"publie\":true,\"image\":null}",
    "explanation": "JSON distingue chaînes, nombres, booléens et null.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-json-3",
    "language": "json",
    "category": "Applications",
    "title": "Liste de cours",
    "code": "{\"cours\":[{\"id\":\"html\",\"duree\":4},{\"id\":\"xml\",\"duree\":6}]}",
    "explanation": "Imbriquer des objets dans un tableau.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-json-4",
    "language": "json",
    "category": "Applications",
    "title": "Réponse d'erreur",
    "code": "{\"error\":{\"code\":\"NOT_FOUND\",\"message\":\"Ressource absente\"}}",
    "explanation": "Documenter les erreurs d'API.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-json-5",
    "language": "json",
    "category": "Approfondissement",
    "title": "Unicode dans JSON",
    "code": "{\"salutation\":\"مرحبا\",\"nom\":\"Élève\"}",
    "explanation": "UTF-8 permet les textes multilingues.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-json-6",
    "language": "json",
    "category": "Approfondissement",
    "title": "Booléens sans guillemets",
    "code": "{\"actif\":false,\"archivé\":true}",
    "explanation": "Les littéraux booléens ne sont pas des chaînes.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-markdown-1",
    "language": "markdown",
    "category": "Fondamentaux",
    "title": "Notes de cours",
    "code": "# XML\n\n**Objectif :** comprendre les arbres.\n\n- Racine\n- Élément\n- Attribut",
    "explanation": "Structurer une fiche de cours.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-markdown-2",
    "language": "markdown",
    "category": "Fondamentaux",
    "title": "Images légendées",
    "code": "![Arbre XML : racine, parent et enfant](arbre-xml.svg)",
    "explanation": "L'alternative transmet l'information utile.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-markdown-3",
    "language": "markdown",
    "category": "Applications",
    "title": "Code avec langage",
    "code": "```json\n{\"nom\":\"Cours\"}\n```",
    "explanation": "Les blocs délimités acceptent une étiquette de langage.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-markdown-4",
    "language": "markdown",
    "category": "Applications",
    "title": "Liens internes",
    "code": "[Voir la syntaxe](#syntaxe)\n\n## Syntaxe",
    "explanation": "Une ancre peut pointer vers un titre.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-markdown-5",
    "language": "markdown",
    "category": "Approfondissement",
    "title": "Tableau comparatif",
    "code": "| Langage | Rôle |\n| --- | --- |\n| HTML | Affichage |\n| XML | Données |",
    "explanation": "Les tableaux constituent une extension courante.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-markdown-6",
    "language": "markdown",
    "category": "Approfondissement",
    "title": "Citation et séparation",
    "code": "> La structure facilite la réutilisation.\n\n---",
    "explanation": "La citation et le séparateur sont deux blocs distincts.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-latex-1",
    "language": "latex",
    "category": "Fondamentaux",
    "title": "Environnement align",
    "code": "\\begin{align}a+b &= c\\\\ x+y &= z\\end{align}",
    "explanation": "align nécessite le package amsmath.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-latex-2",
    "language": "latex",
    "category": "Fondamentaux",
    "title": "Matrice",
    "code": "\\begin{bmatrix}1 & 0\\\\0 & 1\\end{bmatrix}",
    "explanation": "Une matrice s'écrit avec des colonnes délimitées.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-latex-3",
    "language": "latex",
    "category": "Applications",
    "title": "Somme",
    "code": "\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}",
    "explanation": "Les indices inférieurs et supérieurs définissent les bornes.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-latex-4",
    "language": "latex",
    "category": "Applications",
    "title": "Racine carrée",
    "code": "\\sqrt{x^2+y^2}",
    "explanation": "sqrt insère un radical.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-latex-5",
    "language": "latex",
    "category": "Approfondissement",
    "title": "Ensemble",
    "code": "\\{x\\in\\mathbb{R}\\mid x>0\\}",
    "explanation": "mathbb nécessite un package de symboles tel que amssymb.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-latex-6",
    "language": "latex",
    "category": "Approfondissement",
    "title": "Théorème",
    "code": "\\frac{d}{dx}\\left(x^n\\right)=nx^{n-1}",
    "explanation": "Illustration de la dérivation d'une puissance.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-yaml-1",
    "language": "yaml",
    "category": "Fondamentaux",
    "title": "Liste de modules",
    "code": "modules:\n  - nom: XML\n    credits: 3\n  - nom: HTML\n    credits: 2",
    "explanation": "L'indentation représente une structure de données.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-yaml-2",
    "language": "yaml",
    "category": "Fondamentaux",
    "title": "Ancres et alias",
    "code": "defaults: &base\n  langue: fr\n  statut: actif\ncours:\n  <<: *base\n  titre: XML",
    "explanation": "Les ancres et alias limitent les répétitions; la clé << est une convention de fusion prise en charge par certains parseurs.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-yaml-3",
    "language": "yaml",
    "category": "Applications",
    "title": "Chaine sensible",
    "code": "code_pays: \"NO\"\nversion: \"01\"",
    "explanation": "Guillemeter les scalaires ambigus.",
    "level": "Débutant",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-yaml-4",
    "language": "yaml",
    "category": "Applications",
    "title": "Texte multiligne",
    "code": "description: |\n  Première ligne\n  Deuxième ligne",
    "explanation": "Le bloc | préserve les retours à la ligne.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-yaml-5",
    "language": "yaml",
    "category": "Approfondissement",
    "title": "Config CI minimale",
    "code": "name: Verification\non:\n  push:\n    branches:\n      - main",
    "explanation": "YAML sert notamment à déclarer des workflows.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  },
  {
    "id": "mastery-yaml-6",
    "language": "yaml",
    "category": "Approfondissement",
    "title": "Plusieurs documents",
    "code": "---\nnom: premier\n---\nnom: second",
    "explanation": "Plusieurs documents peuvent être séparés dans un flux.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique complémentaire"
  }
];
