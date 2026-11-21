const {chromium}=require('playwright');
const assert=require('node:assert/strict');

(async()=>{
  const browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  const menu=()=>page.getByRole('button',{name:'Menu du site'});
  async function openSiteMenu(){
    if(await menu().isVisible()) await menu().click();
  }
  async function nav(label){
    const target=page.getByRole('navigation',{name:'Navigation principale'}).getByRole('button',{name:label,exact:true});
    if(!(await target.isVisible()))await openSiteMenu();
    await target.click();
  }
  async function language(name){
    const chooser=page.getByRole('button',{name:/Choisir un autre langage|Masquer les langages/});
    if((await chooser.getAttribute('aria-expanded'))!=='true')await chooser.click();
    const selection=page.getByLabel('Choisir une technologie').getByText(name,{exact:true});
    await selection.click();
  }
  async function finishSolutions(family,label,total){
    await language(label);
    if(family==='xml')await page.getByRole('button',{name:'Exercices guidés',exact:true}).click();
    const group=page.getByTestId('structured-challenges-'+family);
    await group.waitFor();
    const selector=group.getByRole('combobox',{name:new RegExp('Choisir un défi')});
    assert.equal(await selector.locator('option').count(),total,'Nombre de défis '+label);
    for(let index=0;index<total;index++){
      await selector.selectOption(String(index));
      await group.getByRole('button',{name:'Voir le corrigé'}).click();
      const correct=await group.locator('pre').last().innerText();
      await group.getByRole('textbox',{name:'Réponse '+(family==='xslt'?'XSLT 1.0':family==='xpath'?'XPath 1.0':label)}).fill(correct);
      await group.getByRole('button',{name:'Vérifier ma réponse'}).click();
      const message=await group.getByTestId('exercise-feedback').innerText();
      assert(message.includes('Objectif atteint'),family+' corrigé '+(index+1)+' : '+message);
    }
  }
  try {
    await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
    await page.getByRole('heading',{name:/Du document éditorial à l’échange de données/}).waitFor();
    assert.equal(await page.getByRole('button',{name:/Ouvrir le parcours de maîtrise/}).count(),7);
    const navigation=page.getByRole('navigation',{name:'Navigation principale'});
    const compare=await navigation.getByRole('button',{name:'Comparatifs'}).boundingBox();
    const search=await navigation.getByRole('searchbox',{name:'Rechercher dans les fiches de cours'}).boundingBox();
    assert(compare&&search&&search.x>=compare.x+compare.width-2,'La recherche doit se placer après Comparatifs');
    assert(search.width<=215,'Le champ de recherche doit rester compact');
    await page.getByRole('button',{name:'358 exemples'}).click();
    await page.getByRole('heading',{name:"Bibliothèque d'exemples"}).waitFor();
    assert.equal(await navigation.isVisible(),false,'La navigation doit être repliée en bibliothèque de code');
    await openSiteMenu();
    await navigation.waitFor();
    await page.getByRole('button',{name:'Masquer le menu'}).click();
    const libLanguage=page.getByRole('combobox',{name:'Langage'});
    await libLanguage.selectOption('html');
    await page.getByRole('button',{name:/Document minimal/}).first().click();
    const example=page.getByTestId('example-code-panel');
    assert((await example.locator('tr').count())>=4,'Exemple de code indenté');
    await example.getByRole('button',{name:'Original',exact:true}).click();
    await example.getByRole('button',{name:'Code indenté',exact:true}).click();
    await page.getByRole('button',{name:'Modifier le code'}).click();
    await page.getByRole('textbox',{name:"Modifier le code de l’exemple"}).fill('<h1>Réponse visible</h1>');
    await page.getByTestId('example-render-panel').locator('iframe').contentFrame().getByRole('heading',{name:'Réponse visible'}).waitFor();
    await openSiteMenu();
    await nav('Mini-projets');
    await page.getByRole('heading',{name:'Mini-projets transversaux'}).waitFor();
    await page.getByRole('button',{name:'Exécuter le projet'}).click();
    await page.getByText(/événement/).first().waitFor();
    await nav('Fiches de Cours');
    await page.getByRole('heading',{name:/Du document éditorial à l’échange de données/}).waitFor();
    await nav('Ateliers de pratique');
    await page.getByRole('heading',{name:/Atelier libre · Code Studio/}).waitFor();
    assert.equal(await navigation.isVisible(),false,'Navigation repliée dans le laboratoire');
    assert(await page.getByRole('button',{name:'Atelier libre',exact:true}).isVisible());
    assert(await page.getByRole('button',{name:'Exercices guidés',exact:true}).isVisible());
    const editor=await page.getByTestId('studio-code-pane').boundingBox();
    const preview=await page.getByTestId('studio-preview-pane').boundingBox();
    assert(editor&&preview&&preview.x>editor.x+editor.width-2,'Code et résultat sont côte à côte sur ordinateur');
    await page.getByRole('button',{name:'Code indenté',exact:true}).first().click();
    await page.getByTestId('studio-code-pane').locator('tr').first().waitFor();
    await page.getByRole('button',{name:'Modifier',exact:true}).first().click();
    await page.getByRole('textbox',{name:'Code HTML'}).fill('<h1>Atelier HTML testé</h1>');
    await page.locator('iframe[title="Résultat du code HTML, CSS et JavaScript (origine isolée)"]').contentFrame().getByRole('heading',{name:'Atelier HTML testé'}).waitFor();

    await language('XML');
    await page.getByText('Vérificateur de Bien-Formation & Conversion').waitFor();
    await page.getByRole('button',{name:'Exercices guidés',exact:true}).click();
    const xml=page.getByTestId('structured-challenges-xml');
    await xml.waitFor();
    await xml.getByRole('button',{name:'Vérifier ma réponse'}).click();
    assert((await xml.getByTestId('exercise-feedback').innerText()).includes('À corriger'));
    await xml.getByRole('textbox',{name:'Réponse XML'}).fill('<bibliotheque><livre><titre>XML</titre></livre></bibliotheque>');
    await xml.getByRole('button',{name:'Vérifier ma réponse'}).click();
    assert((await xml.getByTestId('exercise-feedback').innerText()).includes('Objectif atteint'));
    assert((await page.evaluate(()=>JSON.parse(localStorage.getItem('ds-challenges-xml-v1')||'[]'))).includes('xml-1'));

    await finishSolutions('dtd','DTD',6);
    await finishSolutions('xpath','XPath',7);
    await finishSolutions('xslt','XSLT',6);
    await finishSolutions('xml','XML',6);

    await page.setViewportSize({width:390,height:844});
    await nav('Ateliers de pratique').catch(()=>{});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Pas de débordement horizontal sur mobile');
    await page.getByRole('button',{name:/Choisir un autre langage|Masquer les langages/}).waitFor();
    await openSiteMenu();
    await page.getByRole('button',{name:'Ouvrir la recherche de cours'}).click();
    await page.getByRole('searchbox',{name:'Rechercher dans les fiches de cours'}).waitFor();
    await page.screenshot({path:'preview-mobile.png'});
    await page.setViewportSize({width:1280,height:900});
    await page.screenshot({path:'preview-desktop.png'});

    // Référence chromatique sombre : bleu #3D7497, fond #2D5876 et liseré #D8C497.
    if(!(await page.evaluate(()=>document.documentElement.classList.contains('dark')))){
      await page.getByRole('button',{name:'Basculer le thème'}).click();
    }
    // transition-colors anime le changement : attendre l'état calculé final.
    await page.waitForFunction(()=>{
      const el=document.querySelector('.min-h-screen');
      return !!el && getComputedStyle(el).backgroundColor==='rgb(25, 59, 85)';
    },null,{timeout:6000});
    const palette=await page.evaluate(()=>{
      const app=document.querySelector('.min-h-screen');
      const banner=document.querySelector('header.sticky > div:first-child');
      const editor=document.querySelector('textarea[class*="bg-[#"]');
      return {
        dark:document.documentElement.classList.contains('dark'),
        canvas:app?getComputedStyle(app).backgroundColor:'',
        primary:getComputedStyle(document.documentElement).getPropertyValue('--color-slate-800').trim(),
        gold:banner?getComputedStyle(banner).borderBottomColor:'',
        code:editor?getComputedStyle(editor).backgroundColor:'',
        header:banner?getComputedStyle(banner).backgroundImage:''
      };
    });
    assert(palette.dark,'Le thème sombre doit être actif');
    assert.equal(palette.canvas,'rgb(25, 59, 85)','Le fond sombre doit être un bleu profond');
    assert.equal(palette.primary,'#2d5876','Le bleu principal doit correspondre à la référence');
    assert.equal(palette.gold,'rgb(216, 196, 151)','Le filet sous le bandeau doit être doré');
    assert.equal(palette.code,'rgb(23, 57, 80)','La zone de code doit utiliser un bleu sombre');
    assert(palette.header.includes('61, 116, 151'),'Le bandeau sombre doit inclure le bleu #3D7497');
    await page.screenshot({path:'preview-dark-desktop.png',fullPage:true});
    await page.setViewportSize({width:390,height:844});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Pas de débordement mobile en mode sombre');
    await page.screenshot({path:'preview-dark-mobile.png'});
    assert.deepEqual(errors,[],'Aucune erreur JavaScript non interceptée');
    console.log('PASS : navigation compacte, recherche en ligne, code indenté, atelier libre, laboratoire guidé, 25 corrigés, mobile');
  } catch(error){
    console.error(error);
    await page.screenshot({path:'preview-failure.png'}).catch(()=>{});
    process.exitCode=1;
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
