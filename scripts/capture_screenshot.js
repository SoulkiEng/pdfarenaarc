const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureStoreScreenshot() {
  const screenshotDir = path.join(__dirname, '..', 'chrome_extension', 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  console.log('Capturing 1280x800 store screenshot...');
  await page.goto('https://pdfarenaarc.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const dest = path.join(screenshotDir, 'screenshot1.png');
  await page.screenshot({ path: dest });
  console.log('Saved screenshot to:', dest);

  await browser.close();
  console.log('[SUCCESS] 1280x800 Chrome Web Store screenshot ready!');
}

captureStoreScreenshot().catch(console.error);
