const { chromium } = require('playwright');

async function checkSERP() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  console.log('=== 1. Checking site:pdfarenaarc.com on Google ===');
  await page.goto('https://www.google.com/search?q=site:pdfarenaarc.com', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);

  const siteResults = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll('h3').forEach(h => {
      const a = h.closest('a');
      if (a && a.href.includes('pdfarenaarc.com')) {
        list.push({ title: h.innerText, url: a.href });
      }
    });
    return list;
  });

  console.log('Indexed pages on Google: ' + siteResults.length);
  siteResults.forEach((item, idx) => {
    console.log(`[${idx + 1}] ${item.title} -> ${item.url}`);
  });

  console.log('\n=== 2. Checking brand search: pdfarenaarc ===');
  await page.goto('https://www.google.com/search?q=pdfarenaarc', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);

  const brandResults = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll('h3').forEach(h => {
      const a = h.closest('a');
      if (a) {
        list.push({ title: h.innerText, url: a.href });
      }
    });
    return list;
  });

  console.log('Top 5 Brand Results:');
  brandResults.slice(0, 5).forEach((item, idx) => {
    console.log(`[${idx + 1}] ${item.title} -> ${item.url}`);
  });

  console.log('\n=== 3. Checking specific long-tail keywords ===');
  const testKeywords = [
    'pdfarenaarc compress pdf',
    'pdfarenaarc private pdf tools',
    'compress pdf for us visa pdfarenaarc'
  ];

  for (const kw of testKeywords) {
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(kw)}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2500);
    const found = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
      return links.filter(l => l.includes('pdfarenaarc.com'));
    });
    console.log(`Keyword "${kw}": Found ${found.length} ranking links -> ${found.slice(0, 2).join(', ')}`);
  }

  await browser.close();
}

checkSERP().catch(console.error);
