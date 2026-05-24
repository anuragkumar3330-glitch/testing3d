const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const assets = new Set();
  
  page.on('response', response => {
    const url = response.url();
    if (url.includes('.gltf') || url.includes('.glb') || url.includes('.spline') || url.includes('splinecode') || url.includes('three')) {
      assets.add(url);
    }
  });

  await page.goto('https://www.emons.de/en', { waitUntil: 'domcontentloaded' });
  
  await page.waitForTimeout(5000);
  
  // Also check if there are any iframes containing "spline"
  const iframes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('iframe')).map(i => i.src);
  });
  
  console.log('3D Assets found:', Array.from(assets));
  console.log('Iframes:', iframes.filter(src => src.includes('spline') || src.includes('3d')));

  await browser.close();
})();
