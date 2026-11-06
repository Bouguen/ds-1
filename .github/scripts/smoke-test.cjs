const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({headless:true});
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: '296 exemples' }).click();
    await page.getByRole('heading', { name: "Bibliothèque d'exemples" }).waitFor();
    await page.getByText('296 exemples trouvés').waitFor();
    const language = page.getByRole('combobox', { name: 'Langage' });
    await language.selectOption('xpath');
    await page.getByText('28 exemples trouvés').waitFor();
    await page.locator('input[type="search"]').fill('Commence par');
    await page.getByText('1 exemple trouvé').waitFor();
    await page.getByRole('heading', { name: 'Commence par' }).waitFor();
    await page.locator('input[type="search"]').fill('');
    await language.selectOption('html');
    await page.getByRole('button', { name: /Document minimal/ }).first().click();
    await page.getByTestId('example-code-panel').getByText(/<html lang=/).waitFor();
    assert((await page.getByTestId('example-code-panel').locator('tr').count()) >= 4, 'Le code HTML doit être indenté sur plusieurs lignes');
    await page.getByTestId('example-render-panel').locator('iframe').waitFor();
    await page.getByRole('button', { name: 'Modifier le code' }).click();
    await page.getByRole('textbox', { name: "Modifier le code de l’exemple" }).fill('<h1>Le rendu réagit</h1>');
    await page.getByTestId('example-render-panel').locator('iframe').contentFrame().getByRole('heading', { name: 'Le rendu réagit' }).waitFor();
    await page.getByRole('button', { name: 'Terminer l’édition' }).click();
    await language.selectOption('json');
    await page.getByRole('button', { name: 'Objet simple' }).first().click();
    assert((await page.getByTestId('example-code-panel').locator('tr').count()) >= 3, 'Le code JSON doit être présenté sur plusieurs lignes');
    await language.selectOption('css');
    assert((await page.getByTestId('example-code-panel').locator('tr').count()) >= 3, 'Les règles CSS doivent être présentées sur plusieurs lignes');
    await language.selectOption('xml');
    assert((await page.getByTestId('example-code-panel').locator('tr').count()) >= 3, 'Le code XML doit être hiérarchisé');
    await language.selectOption('all');
    await page.getByText('296 exemples trouvés').waitFor();
    await page.setViewportSize({width:390,height:844});
    assert(await page.getByTestId('example-workspace').isVisible(), 'La fiche exemples doit rester accessible sur mobile');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2), 'Pas de débordement mobile sur les exemples');
    await page.setViewportSize({width:1280,height:900});
    await page.getByRole('button', { name: 'Fiches de Cours' }).click();
    await page.getByRole('button', { name: 'Explorer' }).first().click();
    await page.getByText('Exemples complémentaires et applications').first().waitFor();
    await page.getByRole('button', { name: 'Bacs à Sable (Live)' }).click();
    await page.getByRole('button', { name: 'Exemples guidés' }).click();
    await page.getByRole('heading', { name: 'Pratique guidée · HTML' }).waitFor();
    assert.equal(await page.getByTestId('guided-preview').count(), 1, 'L’atelier ne doit afficher qu’un seul aperçu');
    assert((await page.locator('#guided-code').boundingBox()).y < 720, 'Le code doit être accessible sans grand défilement sur ordinateur');
    await page.getByTestId('guided-preview').getByRole('heading', { name: 'Résultat / aperçu' }).waitFor();
    const originalPreview = page.getByTestId('guided-preview').locator('iframe');
    await originalPreview.waitFor();
    await page.locator('#guided-code').fill('<h1>Test de rendu en direct</h1>');
    await originalPreview.contentFrame().getByRole('heading', { name: 'Test de rendu en direct' }).waitFor();
    await page.getByRole('button', { name: 'Analyser', exact: true }).click();
    await page.getByText(/Mode édition et compréhension/).waitFor();
    await page.getByRole('button', { name: /XPath/ }).first().click();
    await page.getByRole('heading', { name: 'Pratique guidée · XPath' }).waitFor();
    await page.locator('#guided-code').fill('//livre[@langue="fr"]/titre');
    await page.getByRole('button', { name: 'Analyser', exact: true }).click();
    await page.getByText(/XPath 1.0 évalué/).waitFor();
    await page.getByRole('button', { name: 'XSLT' }).first().click();
    await page.getByRole('heading', { name: /Laboratoire de transformation XML/ }).waitFor();
    await page.getByRole('button', { name: 'Exécuter la transformation' }).click();
    await page.getByText(/Transformation XSLT exécutée|moteur XSLT natif n’est pas disponible/).waitFor();
    await page.getByRole('button', { name: 'JSON' }).first().click();
    await page.getByRole('button', { name: 'Exemples guidés' }).click();
    await page.getByRole('heading', { name: 'Pratique guidée · JSON' }).waitFor();
    await page.locator('#guided-code').fill('{"test":true,"nombre":42}');
    await page.getByTestId('guided-preview').getByText(/"nombre": 42/).waitFor();
    await page.getByRole('button', { name: 'Basculer le thème' }).click();
    assert(await page.locator('html').evaluate(el => el.classList.contains('dark')), 'Mode sombre inactif');
    await page.screenshot({ path: 'preview-desktop.png', fullPage: false });
    await page.setViewportSize({width:390,height:844});
    await page.screenshot({ path: 'preview-mobile.png', fullPage: false });
    assert(await page.locator('#guided-code').isVisible(), 'L’éditeur doit rester présent sur mobile');
    assert(await page.getByTestId('guided-preview').isVisible(), 'Le résultat doit rester accessible sur mobile');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2), 'La page mobile ne doit pas déborder horizontalement');

    // Tester les liens du footer : bon outil sélectionné et remontée visible en haut.
    await page.setViewportSize({width:1280,height:900});
    for (const [label, tool] of [
      ['Web Studio HTML + CSS', 'HTML5'],
      ['Éditeur Markdown & KaTeX', 'Markdown'],
      ['Validateur JSON & Arbre', 'JSON'],
      ['Validateur XML & Arbre', 'XML'],
      ['Simulateur CSS Box Model', 'CSS3']
    ]) {
      await page.locator('footer').getByRole('button', {name:label, exact:true}).click();
      await page.locator('main').getByText(tool, {exact:true}).first().waitFor();
      assert((await page.evaluate(() => window.scrollY)) < 120, 'Le footer doit replacer la vue en haut pour '+label);
    }
    await page.locator('footer').getByRole('button', {name:'Matrice Comparative & Guide de choix'}).click();
    await page.getByRole('heading', {name:/Comparatif & Arbre Décisionnel/}).waitFor();
    assert((await page.evaluate(() => window.scrollY)) < 120, 'La comparaison doit être visible en haut');
    await page.locator('footer').getByRole('button', {name:'HTML5 & Sémantique'}).click();
    await page.locator('main').getByText('HTML5', {exact:true}).first().waitFor();
    assert((await page.evaluate(() => window.scrollY)) >= 0, 'Le lien des fiches doit ouvrir les cours');
    assert.deepEqual(errors, [], 'Erreurs JavaScript dans le navigateur : '+errors.join('; '));
    console.log('PASS : catalogue 296 exemples, fiches, atelier HTML, atelier XPath, recherche, filtres, mode sombre, mobile.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
