/**
 * ⚡ TITAN CO-PILOT (Human-in-the-Loop Fast Discovery Engine)
 * Scans Tier-1 Reddit communities, filters fresh PDF problems,
 * and formats ready-to-paste expert replies with zero API keys and 0% ban risk.
 */
const scanner = require('./scanner');
const brain = require('./brain');
const database = require('./database');
const config = require('./config');

async function runTitanCopilot() {
  console.clear();
  console.log('====================================================================');
  console.log('       ⚡ TITAN CO-PILOT: TIER-1 COMMUNITY GROWTH RADAR');
  console.log('====================================================================');
  console.log('• Mode: 100% Safe Co-Pilot (Zero Reddit API required)');
  console.log('• Target Subreddits: r/USCIS, r/tax, r/privacy, r/college');
  console.log('====================================================================\n');

  console.log('🔍 Scanning target communities for fresh high-opportunity threads...\n');

  let totalFound = 0;
  const targets = [...config.TARGET_SUBREDDITS];

  for (const target of targets) {
    const candidates = await scanner.scanSubreddit(target);
    const unhandled = candidates.filter(c => !database.hasInteracted(c.id)).slice(0, 2);

    for (const item of unhandled) {
      totalFound++;
      const reply = brain.generateReply(item.subreddit, item.title, '', item.toolSlug);

      console.log(`\n--------------------------------------------------------------------`);
      console.log(`🎯 [OPPORTUNITY #${totalFound}] Community: r/${item.subreddit}`);
      console.log(`📌 Post: "${item.title}"`);
      console.log(`🔗 Link: ${item.url}`);
      console.log(`--------------------------------------------------------------------`);
      console.log(`💬 PRE-WRITTEN HUMAN REPLY (Click link & paste):`);
      console.log(reply);
      console.log(`--------------------------------------------------------------------\n`);
    }
  }

  if (totalFound === 0) {
    console.log('✅ No new unhandled threads right now. All current leads processed!');
  } else {
    console.log(`\n🎉 Found ${totalFound} high-impact Tier-1 leads ready for engagement!`);
  }
}

runTitanCopilot();
