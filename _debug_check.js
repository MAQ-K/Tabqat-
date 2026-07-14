const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.goto('http://localhost:8080/blogs.html', { waitUntil: 'networkidle' });

  // Non-scrolled state
  const info1 = await page.evaluate(() => {
    const el = document.querySelector('.rs-header-hamburger');
    const bar = document.querySelector('.bar-icon');
    const svg = document.querySelector('.bar-icon svg');
    const path = document.querySelector('.bar-icon svg path');
    if (!el) return { error: 'no .rs-header-hamburger found' };
    const rect = el.getBoundingClientRect();
    const cs = window.getComputedStyle(el);
    const barRect = bar ? bar.getBoundingClientRect() : null;
    const pathFill = path ? window.getComputedStyle(path).fill : null;
    return {
      hamburgerRect: rect,
      hamburgerDisplay: cs.display,
      hamburgerVisibility: cs.visibility,
      hamburgerOpacity: cs.opacity,
      barRect,
      svgExists: !!svg,
      pathFillComputed: pathFill,
      pathFillAttr: path ? path.getAttribute('fill') : null,
    };
  });
  console.log('NON-SCROLLED STATE:', JSON.stringify(info1, null, 2));

  await page.screenshot({ path: '_debug_top.png', clip: { x: 0, y: 0, width: 1600, height: 120 } });

  // Scroll down past 250px to trigger sticky
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(500);

  const info2 = await page.evaluate(() => {
    const headerSticky = document.getElementById('header-sticky');
    const el = document.querySelector('.rs-header-hamburger');
    const path = document.querySelector('.bar-icon svg path');
    const cs = window.getComputedStyle(el);
    return {
      headerHasStickyClass: headerSticky ? headerSticky.className : null,
      hamburgerDisplay: cs.display,
      pathFillComputed: path ? window.getComputedStyle(path).fill : null,
      headerBg: headerSticky ? window.getComputedStyle(headerSticky).backgroundColor : null,
    };
  });
  console.log('SCROLLED STATE:', JSON.stringify(info2, null, 2));

  await page.screenshot({ path: '_debug_scrolled.png', clip: { x: 0, y: 0, width: 1600, height: 120 } });

  await browser.close();
})();
