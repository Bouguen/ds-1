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
    await page.getByRole('button', { name: '128 exemples' }).click();
    await page.getByRole('heading', { name: "Bibliothèque d'exemples" }).waitFor();
    await page.getByText('200 exemples trouvés').waitFor();
    const language = page.locator('select').first();
    await language.selectOption('xpath');
    await page.getByText('20 exemples trouvés').waitFor();
    await page.locator('input[type="search"]').fill('contains');
    await page.getByText('1 exemple trouvé').waitFor();
    await page.getByRole('button', { name: 'Voir le code' }).click();
    await page.getByText("//livre[contains(titre,'Web')]").waitFor();
    await page.locator('input[type="search"]').fill('');
    await language.selectOption('all');
    await page.getByText('200 exemples trouvés').waitFor();
    await page.getByRole('button', { name: 'Fiches de Cours' }).click();
    await page.getByRole('button', { name: 'Explorer' }).first().click();
    await page.getByText('Exemples complémentaires et applications').first().waitFor();
    await page.getByRole('button', { name: 'Bacs à Sable (Live)' }).click();
    await page.getByRole('heading', { name: 'Atelier guidé · HTML' }).waitFor();
    await page.getByRole('button', { name: 'Analyser', exact: true }).click();
    await page.getByText(/Mode édition et compréhension/).waitFor();
    await page.getByRole('button', { name: /XPath/ }).first().click();
    await page.getByRole('heading', { name: 'Atelier guidé · XPath' }).waitFor();
    await page.locator('#guided-code').fill('//livre[@langue="fr"]/titre');
    await page.getByRole('button', { name: 'Analyser', exact: true }).click();
    await page.getByText(/XPath 1.0 évalué/).waitFor();
    await page.getByRole('button', { name: 'Basculer le thème' }).click();
    assert(await page.locator('html').evaluate(el => el.classList.contains('dark')), 'Mode sombre inactif');
    await page.screenshot({ path: 'preview-desktop.png', fullPage: false });
    await page.setViewportSize({width:390,height:844});
    await page.screenshot({ path: 'preview-mobile.png', fullPage: false });
    assert.deepEqual(errors, [], 'Erreurs JavaScript dans le navigateur : '+errors.join('; '));
    console.log('PASS : catalogue 200 exemples, fiches, atelier HTML, atelier XPath, recherche, filtres, mode sombre, mobile.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
