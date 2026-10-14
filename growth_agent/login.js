/**
 * One-time setup script to log into Reddit / Quora.
 * Run: node growth_agent/login.js
 * It opens a clean browser window where you can log in once.
 * All login cookies & sessions are saved permanently in growth_agent/user_data.
 */
const { chromium } = require('playwright');
const config = require('./config');
const readline = require('readline');

async function loginSession() {
  console.log('\n======================================================');
  console.log('🤖 AGENT ARC: One-Time Account Login Setup');
  console.log('======================================================\n');
  console.log('Opening dedicated browser session...');
  console.log('1. Log into your Reddit account in the opened window.');
  console.log('2. Once logged in, come back here and press [ENTER] to save.');
  console.log('======================================================\n');

  const context = await chromium.launchPersistentContext(config.USER_DATA_DIR, {
    headless: false,
    viewport: { width: 1280, height: 800 },
    args: ['--disable-blink-features=AutomationControlled']
  });

  const page = await context.newPage();
  await page.goto('https://www.reddit.com/login', { waitUntil: 'domcontentloaded' });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('👉 Press [ENTER] once you are successfully logged in: ', async () => {
    console.log('\n[SUCCESS] Session saved permanently in growth_agent/user_data!');
    console.log('You will never have to enter passwords or API keys again.\n');
    await context.close();
    rl.close();
    process.exit(0);
  });
}

loginSession().catch((err) => {
  console.error('Error during login setup:', err);
});
