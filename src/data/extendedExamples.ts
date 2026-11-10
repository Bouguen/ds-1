export interface ExtendedExample { id: string; language: string; category: string; title: string; code: string; explanation: string; level: string; source: string; audience?: string; challenge?: string; expectedOutcome?: string; }
export const EXTENDED_EXAMPLES: ExtendedExample[] = [
  {
    "id": "html-01",
    "language": "html",
    "category": "Fondamentaux",
    "title": "Document minimal",
    "code": "<!doctype html>\n<html lang=\"fr\"><head><meta charset=\"utf-8\"><title>Accueil</title></head><body><h1>Bienvenue</h1></body></html>",
    "explanation": "La déclaration de type, la langue et l'encodage constituent la base d'une page.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "html-02",
    "language": "html",
    "category": "Fondamentaux",
    "title": "Structure sémantique",
    "code": "<header>En-tête</header><nav aria-label=\"Menu\">Navigation</nav><main><article>Article</article></main><footer>Pied de page</footer>",
    "explanation": "Chaque région de la page porte un sens explicite.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "html-03",
    "language": "html",
    "category": "Fondamentaux",
    "title": "Titres hiérarchisés",
    "code": "<h1>Les documents structurés</h1><section><h2>XML</h2><h3>Syntaxe</h3></section>",
    "explanation": "Les titres reflètent la hiérarchie logique du document.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "html-04",
    "language": "html",
    "category": "Fondamentaux",
    "title": "Liste ordonnée",
    "code": "<ol><li>Analyser</li><li>Modéliser</li><li>Valider</li></ol>",
    "explanation": "ol indique une séquence ordonnée.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "html-05",
    "language": "html",
    "category": "Pratique",
    "title": "Liste de définitions",
    "code": "<dl><dt>DTD</dt><dd>Document Type Definition</dd></dl>",
    "explanation": "dl associe les termes à leurs descriptions.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "html-06",
    "language": "html",
    "category": "Pratique",
    "title": "Tableau accessible",
    "code": "<table><caption>Résultats</caption><tr><th scope=\"col\">Nom</th><th scope=\"col\">Note</th></tr><tr><td>XML</td><td>18</td></tr></table>",
    "explanation": "caption et scope explicitent la structure tabulaire.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "html-07",
    "language": "html",
    "category": "Pratique",
    "title": "Formulaire accessible",
    "code": "<form action=\"/contact\" method=\"post\"><label for=\"email\">Email</label><input id=\"email\" name=\"email\" type=\"email\" required><button>Envoyer</button></form>",
    "explanation": "Les champs ont une étiquette et une validation native.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "html-08",
    "language": "html",
    "category": "Pratique",
    "title": "Groupes de champs",
    "code": "<fieldset><legend>Format</legend><label><input type=\"radio\" name=\"f\" value=\"xml\">XML</label><label><input type=\"radio\" name=\"f\" value=\"json\">JSON</label></fieldset>",
    "explanation": "fieldset et legend réunissent les choix liés.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "html-09",
    "language": "html",
    "category": "Approfondissement",
    "title": "Image alternative",
    "code": "<img src=\"schema.png\" alt=\"Arborescence montrant les éléments parent et enfant\">",
    "explanation": "L'attribut alt donne une alternative au contenu informatif de l'image.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "html-10",
    "language": "html",
    "category": "Approfondissement",
    "title": "Liens internes",
    "code": "<a href=\"#details\">Aller aux détails</a><section id=\"details\"><h2>Détails</h2></section>",
    "explanation": "Un fragment d'URL cible un identifiant unique.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "html-11",
    "language": "html",
    "category": "Approfondissement",
    "title": "Vidéo sous-titrée",
    "code": "<video controls><source src=\"cours.mp4\" type=\"video/mp4\"><track kind=\"captions\" src=\"cours.vtt\" srclang=\"fr\" label=\"Français\"></video>",
    "explanation": "La piste de sous-titres améliore l'accessibilité.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "html-12",
    "language": "html",
    "category": "Approfondissement",
    "title": "Métadonnées utiles",
    "code": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta name=\"description\" content=\"Initiation aux documents structurés\">",
    "explanation": "Les métadonnées décrivent le document et adaptent l'affichage.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xhtml-01",
    "language": "xhtml",
    "category": "Fondamentaux",
    "title": "Squelette XHTML",
    "code": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title>Page</title></head><body><p>Bonjour</p></body></html>",
    "explanation": "Un document XHTML respecte la syntaxe XML.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xhtml-02",
    "language": "xhtml",
    "category": "Fondamentaux",
    "title": "Fermeture des éléments",
    "code": "<p>Un paragraphe <strong>important</strong>.</p>",
    "explanation": "Toutes les balises doivent être correctement fermées.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xhtml-03",
    "language": "xhtml",
    "category": "Fondamentaux",
    "title": "Éléments vides",
    "code": "<br /><img src=\"illustration.png\" alt=\"Illustration\" />",
    "explanation": "Les éléments vides adoptent la notation XML.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xhtml-04",
    "language": "xhtml",
    "category": "Fondamentaux",
    "title": "Attributs entre guillemets",
    "code": "<input type=\"text\" name=\"prenom\" />",
    "explanation": "Les valeurs d'attributs sont toujours délimitées par des guillemets.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xhtml-05",
    "language": "xhtml",
    "category": "Pratique",
    "title": "Imbrication valide",
    "code": "<em><strong>Information importante</strong></em>",
    "explanation": "Une fermeture inverse de l'ordre d'ouverture assure une arborescence correcte.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xhtml-06",
    "language": "xhtml",
    "category": "Pratique",
    "title": "Échappement des symboles",
    "code": "<p>2 &lt; 3 et A &amp; B</p>",
    "explanation": "Les caractères réservés sont échappés dans le texte.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xml-01",
    "language": "xml",
    "category": "Fondamentaux",
    "title": "Prologue et racine",
    "code": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><bibliotheque><livre>XML</livre></bibliotheque>",
    "explanation": "Un document XML bien formé possède une seule racine.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xml-02",
    "language": "xml",
    "category": "Fondamentaux",
    "title": "Attributs",
    "code": "<livre isbn=\"9780000000000\" langue=\"fr\"><titre>Initiation</titre></livre>",
    "explanation": "Les attributs donnent des propriétés aux éléments.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xml-03",
    "language": "xml",
    "category": "Fondamentaux",
    "title": "Éléments répétés",
    "code": "<catalogue><livre id=\"l1\"/><livre id=\"l2\"/><livre id=\"l3\"/></catalogue>",
    "explanation": "La répétition d'éléments modélise une collection.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xml-04",
    "language": "xml",
    "category": "Fondamentaux",
    "title": "Espaces de noms",
    "code": "<a:livre xmlns:a=\"urn:ecole:livres\"><a:titre>XML</a:titre></a:livre>",
    "explanation": "Un espace de noms distingue des vocabulaires XML.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xml-05",
    "language": "xml",
    "category": "Pratique",
    "title": "Espace de noms par défaut",
    "code": "<livre xmlns=\"urn:catalogue\"><titre>Guide</titre></livre>",
    "explanation": "Un espace de noms peut s'appliquer sans préfixe.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xml-06",
    "language": "xml",
    "category": "Pratique",
    "title": "CDATA",
    "code": "<message><![CDATA[<p>Texte non analysé comme balises</p>]]></message>",
    "explanation": "CDATA préserve le contenu littéral hors délimiteur final.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xml-07",
    "language": "xml",
    "category": "Pratique",
    "title": "Commentaires XML",
    "code": "<catalogue><!-- Un commentaire --><livre/></catalogue>",
    "explanation": "Les commentaires sont exclus des données structurées.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xml-08",
    "language": "xml",
    "category": "Pratique",
    "title": "Entités prédéfinies",
    "code": "<texte>Un &lt;exemple&gt; et A &amp; B</texte>",
    "explanation": "Les entités prédéfinies représentent les caractères réservés.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xml-09",
    "language": "xml",
    "category": "Approfondissement",
    "title": "Instruction de traitement",
    "code": "<?xml-stylesheet type=\"text/xsl\" href=\"style.xsl\"?><catalogue/>",
    "explanation": "Une instruction de traitement communique une information à une application.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xml-10",
    "language": "xml",
    "category": "Approfondissement",
    "title": "Référence de caractère",
    "code": "<texte>&#169; 2026</texte>",
    "explanation": "Une référence numérique insère un caractère Unicode.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xml-11",
    "language": "xml",
    "category": "Approfondissement",
    "title": "Association à une DTD",
    "code": "<!DOCTYPE catalogue SYSTEM \"catalogue.dtd\"><catalogue><livre>XML</livre></catalogue>",
    "explanation": "Le DOCTYPE peut référencer une DTD externe.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xml-12",
    "language": "xml",
    "category": "Approfondissement",
    "title": "Erreur d'imbrication volontaire",
    "code": "<racine><titre>Erreur</racine></titre>",
    "explanation": "Cet exemple incorrect illustre une rupture de bonne formation.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "dtd-01",
    "language": "dtd",
    "category": "Fondamentaux",
    "title": "Élément simple",
    "code": "<!ELEMENT titre (#PCDATA)>",
    "explanation": "PCDATA déclare un contenu textuel analysé.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "dtd-02",
    "language": "dtd",
    "category": "Fondamentaux",
    "title": "Séquence obligatoire",
    "code": "<!ELEMENT livre (titre, auteur, annee)>",
    "explanation": "Les éléments apparaissent dans l'ordre de la séquence.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "dtd-03",
    "language": "dtd",
    "category": "Fondamentaux",
    "title": "Choix exclusif",
    "code": "<!ELEMENT contact (email | telephone)>",
    "explanation": "L'opérateur de choix autorise une alternative.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "dtd-04",
    "language": "dtd",
    "category": "Fondamentaux",
    "title": "Élément optionnel",
    "code": "<!ELEMENT livre (titre, sousTitre?)>",
    "explanation": "Le point d'interrogation indique zéro ou une occurrence.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "dtd-05",
    "language": "dtd",
    "category": "Pratique",
    "title": "Zéro ou plusieurs",
    "code": "<!ELEMENT catalogue (livre*)>",
    "explanation": "L'astérisque autorise une collection vide.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "dtd-06",
    "language": "dtd",
    "category": "Pratique",
    "title": "Une ou plusieurs",
    "code": "<!ELEMENT catalogue (livre+)>",
    "explanation": "Le plus exige au moins un élément.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "dtd-07",
    "language": "dtd",
    "category": "Pratique",
    "title": "Contenu mixte",
    "code": "<!ELEMENT paragraphe (#PCDATA | emphase)*>",
    "explanation": "Le contenu mixte accepte texte et éléments.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "dtd-08",
    "language": "dtd",
    "category": "Pratique",
    "title": "Attribut obligatoire",
    "code": "<!ATTLIST livre id ID #REQUIRED>",
    "explanation": "Un identifiant unique peut être exigé.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "dtd-09",
    "language": "dtd",
    "category": "Approfondissement",
    "title": "Attribut facultatif",
    "code": "<!ATTLIST livre langue CDATA #IMPLIED>",
    "explanation": "IMPLIED rend l'attribut facultatif.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "dtd-10",
    "language": "dtd",
    "category": "Approfondissement",
    "title": "Attribut par défaut",
    "code": "<!ATTLIST livre format CDATA \"papier\">",
    "explanation": "Une valeur par défaut peut être déclarée.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "dtd-11",
    "language": "dtd",
    "category": "Approfondissement",
    "title": "Valeurs énumérées",
    "code": "<!ATTLIST livre statut (disponible | emprunte) \"disponible\">",
    "explanation": "Une énumération limite les valeurs possibles.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "dtd-12",
    "language": "dtd",
    "category": "Approfondissement",
    "title": "Identifiants et références",
    "code": "<!ATTLIST livre id ID #REQUIRED>\n<!ATTLIST pret livreRef IDREF #REQUIRED>",
    "explanation": "IDREF permet de référencer un élément identifié.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "entities-01",
    "language": "entities",
    "category": "Fondamentaux",
    "title": "Entité interne",
    "code": "<!DOCTYPE message [<!ENTITY auteur \"Équipe pédagogique\">]><message>&auteur;</message>",
    "explanation": "Une entité générale interne factorise une chaîne de texte.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "entities-02",
    "language": "entities",
    "category": "Fondamentaux",
    "title": "Entité en déclaration DTD",
    "code": "<!ENTITY etablissement \"Lycée\">",
    "explanation": "La déclaration associe un nom à une valeur.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "entities-03",
    "language": "entities",
    "category": "Fondamentaux",
    "title": "Entité XML prédéfinie",
    "code": "<texte>A &amp; B et 3 &lt; 4</texte>",
    "explanation": "amp et lt désignent des caractères réservés.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "entities-04",
    "language": "entities",
    "category": "Fondamentaux",
    "title": "Guillemets échappés",
    "code": "<citation mot=\"Il dit &quot;bonjour&quot;\"/>",
    "explanation": "quot insère un guillemet dans un attribut.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "entities-05",
    "language": "entities",
    "category": "Pratique",
    "title": "Apostrophe échappée",
    "code": "<citation mot='L&apos;arbre'/>",
    "explanation": "apos permet une apostrophe sans fermer l'attribut.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "entities-06",
    "language": "entities",
    "category": "Pratique",
    "title": "Référence décimale",
    "code": "<symbole>&#169;</symbole>",
    "explanation": "Une référence décimale représente un point de code.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "entities-07",
    "language": "entities",
    "category": "Pratique",
    "title": "Référence hexadécimale",
    "code": "<symbole>&#x00A9;</symbole>",
    "explanation": "La notation hexadécimale commence par x.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "entities-08",
    "language": "entities",
    "category": "Pratique",
    "title": "Entité paramètre DTD",
    "code": "<!ENTITY % groupe \"(titre, auteur)\">\n<!ELEMENT livre %groupe;>",
    "explanation": "Une entité paramètre réutilise une portion de déclaration DTD.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-01",
    "language": "xpath",
    "category": "Fondamentaux",
    "title": "Élément depuis la racine",
    "code": "/bibliotheque/livre",
    "explanation": "Le chemin absolu part de la racine du document.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-02",
    "language": "xpath",
    "category": "Fondamentaux",
    "title": "Descendants quelconques",
    "code": "//titre",
    "explanation": "Le double slash cherche des descendants à toute profondeur.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-03",
    "language": "xpath",
    "category": "Fondamentaux",
    "title": "Attribut d'identifiant",
    "code": "//livre/@id",
    "explanation": "L'arobase sélectionne des attributs.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-04",
    "language": "xpath",
    "category": "Fondamentaux",
    "title": "Filtre sur attribut",
    "code": "//livre[@langue='fr']",
    "explanation": "Un prédicat garde les livres selon leur langue.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-05",
    "language": "xpath",
    "category": "Pratique",
    "title": "Premier élément",
    "code": "(/bibliotheque/livre)[1]",
    "explanation": "La position est évaluée sur l'ensemble des livres.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-06",
    "language": "xpath",
    "category": "Pratique",
    "title": "Dernier élément",
    "code": "/bibliotheque/livre[last()]",
    "explanation": "last() renvoie la dernière position.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-07",
    "language": "xpath",
    "category": "Pratique",
    "title": "Condition numérique",
    "code": "//livre[prix > 20]",
    "explanation": "Un prédicat compare une valeur à un nombre.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-08",
    "language": "xpath",
    "category": "Pratique",
    "title": "Texte contenu",
    "code": "//livre[titre='XML']",
    "explanation": "Le prédicat filtre selon le texte de l'élément.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-09",
    "language": "xpath",
    "category": "Approfondissement",
    "title": "Contient une chaîne",
    "code": "//livre[contains(titre,'Web')]",
    "explanation": "contains() teste la présence d'une sous-chaîne.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-10",
    "language": "xpath",
    "category": "Approfondissement",
    "title": "Commence par",
    "code": "//livre[starts-with(@id,'ref')]",
    "explanation": "starts-with() teste le préfixe d'une chaîne.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-11",
    "language": "xpath",
    "category": "Approfondissement",
    "title": "Parent",
    "code": "//titre/..",
    "explanation": "Deux points remontent à l'élément parent.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-12",
    "language": "xpath",
    "category": "Approfondissement",
    "title": "Frères suivants",
    "code": "//titre/following-sibling::*",
    "explanation": "L'axe following-sibling explore les frères suivants.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-13",
    "language": "xpath",
    "category": "Approfondissement",
    "title": "Compter des éléments",
    "code": "count(//livre)",
    "explanation": "count() retourne le nombre de nœuds d'un ensemble.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xpath-14",
    "language": "xpath",
    "category": "Approfondissement",
    "title": "Union de chemins",
    "code": "//titre | //auteur",
    "explanation": "La barre verticale unit deux ensembles de nœuds.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xslt-01",
    "language": "xslt",
    "category": "Fondamentaux",
    "title": "Feuille XSLT minimale",
    "code": "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:template match=\"/\"><html><body>Bonjour</body></html></xsl:template></xsl:stylesheet>",
    "explanation": "La feuille définit la transformation depuis la racine.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xslt-02",
    "language": "xslt",
    "category": "Fondamentaux",
    "title": "Extraire une valeur",
    "code": "<xsl:value-of select=\"/bibliotheque/livre/titre\"/>",
    "explanation": "value-of affiche la valeur textuelle sélectionnée.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xslt-03",
    "language": "xslt",
    "category": "Fondamentaux",
    "title": "Boucle sur des livres",
    "code": "<xsl:for-each select=\"//livre\"><p><xsl:value-of select=\"titre\"/></p></xsl:for-each>",
    "explanation": "for-each répète une sortie par nœud.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xslt-04",
    "language": "xslt",
    "category": "Fondamentaux",
    "title": "Condition si",
    "code": "<xsl:if test=\"prix &gt; 20\"><strong>Prix élevé</strong></xsl:if>",
    "explanation": "if produit du contenu lorsque le test est vrai.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xslt-05",
    "language": "xslt",
    "category": "Pratique",
    "title": "Choix multiple",
    "code": "<xsl:choose><xsl:when test=\"stock &gt; 0\">Disponible</xsl:when><xsl:otherwise>Épuisé</xsl:otherwise></xsl:choose>",
    "explanation": "choose propose plusieurs branches conditionnelles.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xslt-06",
    "language": "xslt",
    "category": "Pratique",
    "title": "Tri ascendant",
    "code": "<xsl:for-each select=\"//livre\"><xsl:sort select=\"titre\"/><p><xsl:value-of select=\"titre\"/></p></xsl:for-each>",
    "explanation": "sort ordonne les éléments avant leur rendu.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xslt-07",
    "language": "xslt",
    "category": "Pratique",
    "title": "Gabarit pour livre",
    "code": "<xsl:template match=\"livre\"><li><xsl:value-of select=\"titre\"/></li></xsl:template>",
    "explanation": "Un gabarit définit le traitement d'un type de nœud.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xslt-08",
    "language": "xslt",
    "category": "Pratique",
    "title": "Application de gabarits",
    "code": "<xsl:apply-templates select=\"//livre\"/>",
    "explanation": "apply-templates délègue la transformation aux gabarits.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xslt-09",
    "language": "xslt",
    "category": "Approfondissement",
    "title": "Créer un attribut",
    "code": "<a><xsl:attribute name=\"href\"><xsl:value-of select=\"url\"/></xsl:attribute>Lien</a>",
    "explanation": "attribute construit dynamiquement un attribut.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xslt-10",
    "language": "xslt",
    "category": "Approfondissement",
    "title": "Copier un nœud",
    "code": "<xsl:copy-of select=\"//livre[1]\"/>",
    "explanation": "copy-of duplique le sous-arbre sélectionné.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xslt-11",
    "language": "xslt",
    "category": "Approfondissement",
    "title": "Variable constante",
    "code": "<xsl:variable name=\"titre\" select=\"'Catalogue'\"/><h1><xsl:value-of select=\"$titre\"/></h1>",
    "explanation": "Une variable XSLT fournit une valeur réutilisable.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "xslt-12",
    "language": "xslt",
    "category": "Approfondissement",
    "title": "Définir la sortie HTML",
    "code": "<xsl:output method=\"html\" encoding=\"UTF-8\" indent=\"yes\"/>",
    "explanation": "output indique le mode de sérialisation.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "css-01",
    "language": "css",
    "category": "Fondamentaux",
    "title": "Sélecteur d'élément",
    "code": "p { color: #123456; }",
    "explanation": "La règle s'applique à tous les paragraphes.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "css-02",
    "language": "css",
    "category": "Fondamentaux",
    "title": "Sélecteur de classe",
    "code": ".important { font-weight: 700; }",
    "explanation": "Une classe réutilise une présentation sur plusieurs éléments.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "css-03",
    "language": "css",
    "category": "Fondamentaux",
    "title": "Sélecteur d'identifiant",
    "code": "#sommaire { padding: 1rem; }",
    "explanation": "Un identifiant cible un élément particulier.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "css-04",
    "language": "css",
    "category": "Fondamentaux",
    "title": "Descendant",
    "code": "article p { line-height: 1.6; }",
    "explanation": "Le sélecteur descendant cible des éléments imbriqués.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "css-05",
    "language": "css",
    "category": "Pratique",
    "title": "Enfant direct",
    "code": "ul > li { margin-block: .4rem; }",
    "explanation": "Le symbole supérieur distingue les enfants directs.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "css-06",
    "language": "css",
    "category": "Pratique",
    "title": "Pseudo-classe focus",
    "code": ":focus-visible { outline: 3px solid royalblue; }",
    "explanation": "Le focus visible facilite la navigation au clavier.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "css-07",
    "language": "css",
    "category": "Pratique",
    "title": "Pseudo-élément",
    "code": "h2::before { content: '§ '; }",
    "explanation": "Un pseudo-élément ajoute du contenu de présentation.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "css-08",
    "language": "css",
    "category": "Pratique",
    "title": "Flexbox",
    "code": ".menu { display: flex; gap: 1rem; flex-wrap: wrap; }",
    "explanation": "Flexbox répartit les éléments sur un axe.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "css-09",
    "language": "css",
    "category": "Approfondissement",
    "title": "Grid",
    "code": ".grille { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }",
    "explanation": "Grid crée une grille de colonnes.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "css-10",
    "language": "css",
    "category": "Approfondissement",
    "title": "Requête média",
    "code": "@media (max-width: 700px) { .grille { grid-template-columns: 1fr; } }",
    "explanation": "Une media query adapte la mise en page à l'écran.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "css-11",
    "language": "css",
    "category": "Approfondissement",
    "title": "Variables personnalisées",
    "code": ":root { --accent: #0b75ba; } a { color: var(--accent); }",
    "explanation": "Les propriétés personnalisées centralisent des valeurs.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "css-12",
    "language": "css",
    "category": "Approfondissement",
    "title": "Respect du mouvement",
    "code": "@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }",
    "explanation": "La préférence réduit certaines animations.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "json-01",
    "language": "json",
    "category": "Fondamentaux",
    "title": "Objet simple",
    "code": "{\"nom\":\"XML\",\"annee\":1998}",
    "explanation": "Un objet associe des clés à leurs valeurs.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "json-02",
    "language": "json",
    "category": "Fondamentaux",
    "title": "Tableau",
    "code": "[\"HTML\",\"XML\",\"JSON\"]",
    "explanation": "Un tableau conserve une séquence ordonnée.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "json-03",
    "language": "json",
    "category": "Fondamentaux",
    "title": "Objets imbriqués",
    "code": "{\"livre\":{\"titre\":\"Guide\",\"auteur\":\"Équipe\"}}",
    "explanation": "Un objet peut contenir d'autres objets.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "json-04",
    "language": "json",
    "category": "Fondamentaux",
    "title": "Booléens",
    "code": "{\"publie\":true,\"archive\":false}",
    "explanation": "Les booléens ne doivent pas être mis entre guillemets.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "json-05",
    "language": "json",
    "category": "Pratique",
    "title": "Valeur nulle",
    "code": "{\"dateSuppression\":null}",
    "explanation": "null indique l'absence explicite de valeur.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "json-06",
    "language": "json",
    "category": "Pratique",
    "title": "Tableau d'objets",
    "code": "{\"livres\":[{\"id\":1},{\"id\":2}]}",
    "explanation": "Une collection d'enregistrements combine objets et tableau.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "json-07",
    "language": "json",
    "category": "Pratique",
    "title": "Nombres",
    "code": "{\"prix\":14.5,\"quantite\":3}",
    "explanation": "Les valeurs numériques s'écrivent sans guillemets.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "json-08",
    "language": "json",
    "category": "Pratique",
    "title": "Chaîne échappée",
    "code": "{\"citation\":\"Il dit \\\"bonjour\\\"\"}",
    "explanation": "Le caractère antislash protège les guillemets internes.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "json-09",
    "language": "json",
    "category": "Approfondissement",
    "title": "API paginée",
    "code": "{\"page\":1,\"total\":25,\"items\":[{\"id\":1}]}",
    "explanation": "Un objet peut inclure les métadonnées de pagination.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "json-10",
    "language": "json",
    "category": "Approfondissement",
    "title": "Erreur virgule finale",
    "code": "{\"a\":1,}",
    "explanation": "Cet exemple volontairement incorrect montre la virgule finale interdite.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "markdown-01",
    "language": "markdown",
    "category": "Fondamentaux",
    "title": "Titres",
    "code": "# Titre principal\n## Section\n### Sous-section",
    "explanation": "Les dièses indiquent les niveaux de titre.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "markdown-02",
    "language": "markdown",
    "category": "Fondamentaux",
    "title": "Emphase",
    "code": "**Important** et *nuancé*",
    "explanation": "Les astérisques expriment la mise en évidence.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "markdown-03",
    "language": "markdown",
    "category": "Fondamentaux",
    "title": "Liste simple",
    "code": "- HTML\n- XML\n- JSON",
    "explanation": "Le tiret introduit un élément de liste.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "markdown-04",
    "language": "markdown",
    "category": "Fondamentaux",
    "title": "Liste numérotée",
    "code": "1. Lire\n2. Tester\n3. Vérifier",
    "explanation": "Les chiffres construisent une liste ordonnée.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "markdown-05",
    "language": "markdown",
    "category": "Pratique",
    "title": "Lien",
    "code": "[Consulter la documentation](https://www.w3.org/)",
    "explanation": "La syntaxe associe libellé et URL.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "markdown-06",
    "language": "markdown",
    "category": "Pratique",
    "title": "Image",
    "code": "![Schéma de l'arbre XML](schema.png)",
    "explanation": "L'alternative décrit l'image.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "markdown-07",
    "language": "markdown",
    "category": "Pratique",
    "title": "Bloc de code",
    "code": "```xml\n<livre><titre>XML</titre></livre>\n```",
    "explanation": "La clôture de trois accents graves délimite du code.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "markdown-08",
    "language": "markdown",
    "category": "Pratique",
    "title": "Citation",
    "code": "> Un document structuré organise ses données.",
    "explanation": "Le chevron représente un bloc de citation.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "markdown-09",
    "language": "markdown",
    "category": "Approfondissement",
    "title": "Tableau",
    "code": "| Langage | Usage |\n|---|---|\n| XML | Documents |",
    "explanation": "Les tableaux utilisent des séparateurs de colonnes.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "markdown-10",
    "language": "markdown",
    "category": "Approfondissement",
    "title": "Checklist",
    "code": "- [x] Concevoir\n- [ ] Valider",
    "explanation": "Les cases décrivent des tâches cochées ou non.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "latex-01",
    "language": "latex",
    "category": "Fondamentaux",
    "title": "Structure de document",
    "code": "\\documentclass{article}\n\\begin{document}\nBonjour.\n\\end{document}",
    "explanation": "Un préambule définit la classe avant le contenu.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "latex-02",
    "language": "latex",
    "category": "Fondamentaux",
    "title": "Section",
    "code": "\\section{Introduction}\n\\subsection{Contexte}",
    "explanation": "Les commandes créent la hiérarchie du document.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "latex-03",
    "language": "latex",
    "category": "Fondamentaux",
    "title": "Emphase",
    "code": "\\textbf{Important} et \\emph{à retenir}",
    "explanation": "Les commandes sémantiques contrôlent l'emphase.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "latex-04",
    "language": "latex",
    "category": "Fondamentaux",
    "title": "Liste à puces",
    "code": "\\begin{itemize}\\item HTML\\item XML\\end{itemize}",
    "explanation": "itemize construit une liste non ordonnée.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "latex-05",
    "language": "latex",
    "category": "Pratique",
    "title": "Liste numérotée",
    "code": "\\begin{enumerate}\\item Analyser\\item Valider\\end{enumerate}",
    "explanation": "enumerate numérote automatiquement les éléments.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "latex-06",
    "language": "latex",
    "category": "Pratique",
    "title": "Mathématiques en ligne",
    "code": "La formule $a^2+b^2=c^2$ est connue.",
    "explanation": "Les dollars insèrent une formule mathématique dans le texte.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "latex-07",
    "language": "latex",
    "category": "Pratique",
    "title": "Équation isolée",
    "code": "\\[ \\int_0^1 x^2\\,dx = \\frac{1}{3} \\]",
    "explanation": "Les crochets mathématiques isolent une formule.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "latex-08",
    "language": "latex",
    "category": "Pratique",
    "title": "Fraction",
    "code": "$\\frac{a+b}{c}$",
    "explanation": "frac compose un numérateur et un dénominateur.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "latex-09",
    "language": "latex",
    "category": "Approfondissement",
    "title": "Tableau",
    "code": "\\begin{tabular}{ll}Langage & Type \\\\ XML & Balisage\\end{tabular}",
    "explanation": "tabular aligne des cellules dans des colonnes.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "latex-10",
    "language": "latex",
    "category": "Approfondissement",
    "title": "Références croisées",
    "code": "\\section{Méthode}\\label{sec:methode}\nVoir section~\\ref{sec:methode}.",
    "explanation": "label et ref établissent des renvois cohérents.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "yaml-01",
    "language": "yaml",
    "category": "Fondamentaux",
    "title": "Clés et valeurs",
    "code": "nom: Atelier XML\nniveau: débutant",
    "explanation": "Les paires clé-valeur forment un mapping.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "yaml-02",
    "language": "yaml",
    "category": "Fondamentaux",
    "title": "Liste",
    "code": "langages:\n  - HTML\n  - XML\n  - JSON",
    "explanation": "Le tiret représente un élément de séquence.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "yaml-03",
    "language": "yaml",
    "category": "Fondamentaux",
    "title": "Objet imbriqué",
    "code": "cours:\n  titre: Documents structurés\n  heures: 12",
    "explanation": "L'indentation marque l'imbrication.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "yaml-04",
    "language": "yaml",
    "category": "Fondamentaux",
    "title": "Booléen et entier",
    "code": "actif: true\nparticipants: 24",
    "explanation": "Les scalaires peuvent être typés sans guillemets.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "yaml-05",
    "language": "yaml",
    "category": "Pratique",
    "title": "Chaîne entre guillemets",
    "code": "titre: \"XML : notions de base\"",
    "explanation": "Les guillemets protègent notamment les deux-points.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "yaml-06",
    "language": "yaml",
    "category": "Pratique",
    "title": "Bloc littéral",
    "code": "description: |\n  Première ligne.\n  Deuxième ligne.",
    "explanation": "Le symbole vertical conserve les retours à la ligne.",
    "level": "Débutant",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "yaml-07",
    "language": "yaml",
    "category": "Pratique",
    "title": "Bloc replié",
    "code": "resume: >\n  Cette phrase est\n  sur deux lignes.",
    "explanation": "Le chevron replie généralement les sauts de ligne.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "yaml-08",
    "language": "yaml",
    "category": "Pratique",
    "title": "Commentaire",
    "code": "port: 3000 # port de développement",
    "explanation": "Le dièse introduit un commentaire.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "yaml-09",
    "language": "yaml",
    "category": "Approfondissement",
    "title": "Plusieurs documents",
    "code": "---\nnom: premier\n---\nnom: second",
    "explanation": "Le séparateur ouvre un nouveau document dans un flux.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  },
  {
    "id": "yaml-10",
    "language": "yaml",
    "category": "Approfondissement",
    "title": "Liste d'objets",
    "code": "livres:\n  - titre: XML\n    prix: 20\n  - titre: HTML\n    prix: 18",
    "explanation": "Les listes peuvent contenir des mappings.",
    "level": "Intermédiaire",
    "source": "Exemple pédagogique original : cours Documents structurés"
  }
];
