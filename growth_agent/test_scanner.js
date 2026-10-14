const { chromium } = require('playwright');

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  console.log('Navigating to Reddit search...');
  await page.goto('https://www.reddit.com/r/USCIS/search/?q=pdf+size&sort=new', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  const posts = await page.evaluate(() => {
    const results = [];
    const elements = document.querySelectorAll('a[href*="/comments/"]');
    for (const el of elements) {
      const title = el.innerText.trim();
      const href = el.href;
      if (title && title.length > 10 && !results.some(r => r.href === href)) {
        results.push({ title, href });
      }
    }
    return results.slice(0, 5);
  });

  console.log('Successfully found Reddit discussions:', JSON.stringify(posts, null, 2));
  await browser.close();
}

test();
