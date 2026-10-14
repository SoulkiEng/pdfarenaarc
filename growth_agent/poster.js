/**
 * Poster module: Simulates natural human interaction, typing, and submission
 */
const { chromium } = require('playwright');
const config = require('./config');
const database = require('./database');

async function humanType(page, selector, text) {
  await page.focus(selector);
  for (const char of text) {
    await page.keyboard.type(char, { delay: Math.floor(Math.random() * 60) + 30 });
    // Random micro-pause simulating human thought
    if (char === '.' || char === '\n') {
      await page.waitForTimeout(Math.floor(Math.random() * 400) + 200);
    }
  }
}

async function postComment(candidate, replyText) {
  console.log(`\n[POSTER] Navigating to thread: ${candidate.url}`);

  const context = await chromium.launchPersistentContext(config.USER_DATA_DIR, {
    headless: false, // Run visible or minimized so user can see it in action if desired
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    args: ['--disable-blink-features=AutomationControlled']
  });

  const page = await context.newPage();

  try {
    await page.goto(candidate.url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    await page.waitForTimeout(3000);

    // Natural human scrolling
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(1500);

    // Check if user is logged into Reddit
    const loginPrompt = await page.$('a[href*="/login"]');
    if (loginPrompt) {
      console.log('\n⚠️ [NOTICE] You are not logged into Reddit in the agent session.');
      console.log('👉 Run "node growth_agent/login.js" once to log in, then restart.');
      await context.close();
      return false;
    }

    // Find comment box
    const commentBoxSelector = 'div[role="textbox"], textarea, div[contenteditable="true"]';
    await page.waitForSelector(commentBoxSelector, { timeout: 10000 });
    await page.click(commentBoxSelector);
    await page.waitForTimeout(1000);

    console.log('[POSTER] Typing helpful response with human keystroke simulation...');
    await humanType(page, commentBoxSelector, replyText);
    await page.waitForTimeout(2000);

    // Click submit/Comment button
    const commentButton = await page.$('button:has-text("Comment"), button:has-text("Reply")');
    if (commentButton) {
      await commentButton.click();
      await page.waitForTimeout(4000);
      console.log(`[SUCCESS] Comment successfully posted to r/${candidate.subreddit}!`);
      database.recordInteraction(candidate.id, candidate.url, candidate.subreddit, replyText);
      await context.close();
      return true;
    } else {
      console.log('[POSTER] Comment button not found, saving draft in memory.');
    }
  } catch (err) {
    console.error('[POSTER] Error during posting:', err.message);
  } finally {
    try { await context.close(); } catch (e) {}
  }

  return false;
}

module.exports = { postComment };
