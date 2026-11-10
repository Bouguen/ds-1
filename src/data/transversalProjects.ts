export type ProjectFile = { name: string; language: 'xml'|'xpath'|'xslt'|'json'|'html'|'css'; content: string; description: string };
export type ProjectKind = 'xml-pipeline' | 'json-web' | 'html-web';
export type TransversalProject = {
  id: string;
  title: string;
  level: 'Débutant'|'Intermédiaire'|'Avancé';
  audience: string;
  context: string;
  objective: string;
  kind: ProjectKind;
  tags: string[];
  files: ProjectFile[];
  steps: { title: string; instruction: string; verification: string }[];
};

export const TRANSVERSAL_PROJECTS: TransversalProject[] = [
  {
    id: 'evenements', title: 'Agenda culturel interactif', level: 'Débutant',
    audience: 'Association, médiathèque et étudiants', kind: 'json-web',
    tags: ['JSON', 'HTML', 'CSS'],
    context: 'Une médiathèque souhaite afficher ses prochains ateliers à partir d’un jeu de données réutilisable.',
    objective: 'Comprendre le passage des données JSON à une page HTML présentée avec CSS.',
    files: [
      { name: 'evenements.json', language: 'json', description: 'Données structurées ; modifiez les événements.', content: `{
  "nom": "Médiathèque des savoirs",
  "evenements": [
    {"titre": "Atelier XML", "date": "2026-12-03", "places": 20},
    {"titre": "Découvrir le Web", "date": "2026-12-10", "places": 15}
  ]
}` },
      { name: 'agenda.css', language: 'css', description: 'Présentation des cartes générées depuis les données.', content: `body { font: 16px system-ui; background: #f0f9ff; padding: 1.5rem; color: #0f172a; }
h1 { color: #075985; }
.grille { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 1rem; }
.carte { padding: 1rem; border-radius: 12px; border: 1px solid #bae6fd; background: white; }
time { color: #0369a1; font-weight: 600; }` }
    ],
    steps: [
      {title:'1 · Structurer', instruction:'Repérez le tableau « evenements » et les propriétés de chaque objet JSON.', verification:'Le JSON est analysable et contient une liste d’événements.'},
      {title:'2 · Modifier', instruction:'Ajoutez un troisième atelier avec titre, date au format AAAA-MM-JJ et nombre de places.',verification:'La nouvelle carte apparaît après l’exécution.'},
      {title:'3 · Présenter', instruction:'Modifiez la grille CSS pour tester la mise en page responsive.',verification:'Les données et la présentation restent indépendantes.'}
    ]
  },
  {
    id: 'universite', title: 'Portail des inscriptions universitaires', level: 'Intermédiaire',
    audience: 'Développeurs Web et administration universitaire', kind: 'html-web',
    tags: ['HTML', 'CSS', 'JSON'],
    context: 'Un service scolarité prépare une interface d’inscription lisible et adaptée aux mobiles.',
    objective: 'Combiner structure sémantique HTML, styles CSS et données JSON embarquées sans exécuter de code non fiable.',
    files: [
      { name: 'inscription.html', language: 'html', description: 'Structure du formulaire et tableau des filières.', content: `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>Inscriptions</title></head>
<body>
<main>
  <h1>Préinscription universitaire</h1>
  <form>
    <label for="nom">Nom complet</label>
    <input id="nom" name="nom" required>
    <label for="email">Adresse électronique</label>
    <input id="email" name="email" type="email" required>
    <label for="filiere">Filière</label>
    <select id="filiere" name="filiere"><option>Informatique</option><option>Mathématiques</option></select>
    <button type="submit">Vérifier la saisie</button>
  </form>
  <section><h2>Nos filières</h2><p>Des parcours pour apprendre et progresser.</p></section>
</main>
</body></html>` },
      { name: 'interface.css', language: 'css', description: 'Styles responsive, contrastes et focus clavier.', content: `body { font: 16px system-ui; color:#0f172a; background:#eff6ff; margin:0; padding:2rem 1rem; }
main {max-width:680px; margin:auto; padding:1.5rem; background:white; border-radius:16px;}
form {display:grid; gap:.7rem;}
input, select, button {font:inherit; padding:.65rem; border:1px solid #64748b; border-radius:8px;}
button {background:#075985; color:white; cursor:pointer;}
:focus-visible {outline:3px solid #f59e0b; outline-offset:2px;}
@media(max-width:480px) {main {padding:1rem;} }` },
      { name: 'filieres.json', language: 'json', description: 'Exemple de données séparées, sans récupération réseau.', content: `{"filieres":[{"id":"info","nom":"Informatique"},{"id":"math","nom":"Mathématiques"}],"annee":"2026-2027"}` }
    ],
    steps: [
      {title:'1 · Structurer', instruction:'Repérez main, form, label et les champs requis.',verification:'Chaque champ possède une étiquette explicite.'},
      {title:'2 · Vérifier', instruction:'Ajoutez une nouvelle filière au JSON puis modifiez les options HTML pour la proposer.',verification:'La donnée et l’interface sont mises à jour de manière cohérente.'},
      {title:'3 · Rendre accessible', instruction:'Testez les états de focus et l’adaptation sur une petite largeur.',verification:'La navigation clavier et les contrastes restent lisibles.'}
    ]
  },
  {
    id: 'catalogue', title: 'Catalogue documentaire de bout en bout', level: 'Avancé',
    audience: 'Développeurs, bibliothécaires et documentalistes', kind: 'xml-pipeline',
    tags: ['XML', 'XPath', 'XSLT', 'HTML', 'CSS'],
    context: 'Une bibliothèque échange un catalogue XML, en extrait des informations et le publie sous forme de page.',
    objective: 'Chaîner l’analyse XML, une interrogation XPath 1.0 et une transformation XSLT 1.0 vers HTML, puis ajuster le rendu CSS.',
    files: [
      {name:'catalogue.xml', language:'xml', description:'Source structurée et réutilisable pour les requêtes et la transformation.',content:`<?xml version="1.0" encoding="UTF-8"?>
<bibliotheque>
  <livre id="l1" langue="fr"><titre>Introduction à XML</titre><auteur>Amine</auteur><prix>28</prix></livre>
  <livre id="l2" langue="en"><titre>Web Basics</titre><auteur>Salma</auteur><prix>42</prix></livre>
  <livre id="l3" langue="fr"><titre>XPath en pratique</titre><auteur>Leïla</auteur><prix>19</prix></livre>
</bibliotheque>`},
      {name:'requete.xpath', language:'xpath', description:'Chemin de sélection XPath 1.0 exécuté sur catalogue.xml.',content:`//livre[@langue="fr"]/titre`},
      {name:'catalogue.xsl', language:'xslt', description:'Feuille XSLT 1.0 et modèle de rendu HTML.',content:`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8"/>
  <xsl:template match="/">
    <html><body><h1>Catalogue de la bibliothèque</h1><section class="grille">
      <xsl:apply-templates select="bibliotheque/livre"/>
    </section></body></html>
  </xsl:template>
  <xsl:template match="livre">
    <article class="livre">
      <h2><xsl:value-of select="titre"/></h2>
      <p>Auteur : <xsl:value-of select="auteur"/></p>
      <p>Prix : <xsl:value-of select="prix"/> DH</p>
    </article>
  </xsl:template>
</xsl:stylesheet>`},
      {name:'catalogue.css', language:'css', description:'Styles de la page HTML produite par XSLT.',content:`body {font:16px system-ui; color:#0f172a; background:#f0f9ff; padding:1.25rem;}
h1 {color:#075985;}
.grille {display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1rem;}
.livre {background:white; border:1px solid #bae6fd; border-radius:12px; padding:1rem;}
.livre h2 {font-size:1.1rem; margin-top:0;}`}
    ],
    steps:[
      {title:'1 · Analyser',instruction:'Ajoutez un quatrième livre en conservant un XML bien formé.',verification:'Le parseur retrouve une racine bibliotheque et des éléments livre.'},
      {title:'2 · Interroger',instruction:'Modifiez le prédicat XPath pour isoler les livres de moins de 30 DH.',verification:'La liste XPath affichée change sans modifier la source.'},
      {title:'3 · Transformer',instruction:'Triez les livres par prix dans XSLT, puis personnalisez les styles CSS.',verification:'Le HTML généré et l’aperçu reflètent les modifications.'}
    ]
  }
];
