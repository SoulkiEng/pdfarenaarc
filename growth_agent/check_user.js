const { chromium } = require('playwright');
const config = require('./config');

async function checkUser() {
  try {
    const context = await chromium.launchPersistentContext(config.USER_DATA_DIR, {
      headless: true,
      executablePath: config.CHROME_EXECUTABLE,
      args: ['--disable-blink-features=AutomationControlled']
    });

    const page = await context.newPage();
    await page.goto('https://www.reddit.com/', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(3000);

    const user = await page.evaluate(() => {
      // Look for user profile links or elements
      const userLink = document.querySelector('a[href^="/user/"], a[href^="https://www.reddit.com/user/"]');
      if (userLink) {
        const match = userLink.href.match(/\/user\/([^\/\?]+)/);
        if (match) return match[1];
      }
      return null;
    });

    console.log('LOGGED_IN_USERNAME:', user);
    await context.close();
  } catch (e) {
    console.log('CHECK_ERROR:', e.message);
  }
}

checkUser();
