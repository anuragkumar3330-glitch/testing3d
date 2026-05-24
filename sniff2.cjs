const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const assets = new Set();
  
  page.on('response', response => {
    const url = response.url();
    if (url.includes('.mp4') || url.includes('.webm') || url.includes('.jpg') || url.includes('.png') || url.includes('.webp')) {
      assets.add(url);
    }
  });

  await page.goto('https://www.emons.de/en', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  
  const mediaElements = await page.evaluate(() => {
    const videos = Array.from(document.querySelectorAll('video')).map(v => ({ src: v.src, class: v.className }));
    const canvases = Array.from(document.querySelectorAll('canvas')).map(c => ({ class: c.className }));
    return { videos, canvases };
  });
  
  console.log('Videos and Canvases found:', mediaElements);
  console.log('Media Assets count:', assets.size);
  // print first 5 videos/images
  console.log('Sample Assets:', Array.from(assets).slice(0, 10));

  await browser.close();
})();
