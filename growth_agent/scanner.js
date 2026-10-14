/**
 * Scanner module using persistent stealth browser
 */
const { chromium } = require('playwright');
const config = require('./config');
const database = require('./database');

async function scanSubreddit(target) {
  const { name: subreddit, queries, tool } = target;
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  const searchUrl = `https://www.reddit.com/r/${subreddit}/search/?q=${encodeURIComponent(randomQuery)}&sort=new`;

  console.log(`[SCANNER] Searching r/${subreddit} for: "${randomQuery}"...`);

  const context = await chromium.launchPersistentContext(config.USER_DATA_DIR, {
    headless: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    args: ['--disable-blink-features=AutomationControlled']
  });

  const page = await context.newPage();
  const candidates = [];

  try {
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(4000);

    // Extract search results
    const found = await page.evaluate(() => {
      const posts = [];
      const links = document.querySelectorAll('a[href*="/comments/"]');
      for (const a of links) {
        const title = (a.innerText || a.getAttribute('aria-label') || '').trim();
        const href = a.href;
        if (title.length > 12 && !posts.some(p => p.url === href)) {
          // Extract post ID from URL
          const match = href.match(/\/comments\/([a-z0-9]+)\//i);
          const id = match ? match[1] : null;
          if (id) {
            posts.push({ id, title, url: href });
          }
        }
      }
      return posts;
    });

    for (const post of found) {
      if (!database.hasInteracted(post.id)) {
        candidates.push({
          ...post,
          subreddit,
          toolSlug: tool
        });
      }
    }
  } catch (err) {
    console.warn(`[SCANNER] Could not scan r/${subreddit}:`, err.message);
  } finally {
    await context.close();
  }

  return candidates;
}

module.exports = { scanSubreddit };
