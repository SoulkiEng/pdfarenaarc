/**
 * Master Autonomous Growth Agent Daemon
 * Run: node growth_agent/run_agent.js
 */
const config = require('./config');
const database = require('./database');
const scanner = require('./scanner');
const brain = require('./brain');
const poster = require('./poster');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomIntervalMs() {
  const min = config.SAFETY.MIN_INTERVAL_MINUTES * 60 * 1000;
  const max = config.SAFETY.MAX_INTERVAL_MINUTES * 60 * 1000;
  return Math.floor(Math.random() * (max - min)) + min;
}

async function runCycle() {
  console.log('\n================================================================');
  console.log(`🤖 [GROWTH EMPLOYEE] Starting discovery cycle at ${new Date().toLocaleTimeString()}...`);
  console.log('================================================================');

  if (!database.canActToday()) {
    console.log(`[SAFETY] Daily cap of ${config.SAFETY.MAX_ACTIONS_PER_DAY} actions reached for today.`);
    console.log('[SAFETY] Resting until tomorrow to ensure 100% human-safe behavior.');
    return;
  }

  // Shuffle subreddits for natural pattern
  const subreddits = [...config.TARGET_SUBREDDITS].sort(() => Math.random() - 0.5);

  for (const target of subreddits) {
    console.log(`\n[AGENT] Checking r/${target.name}...`);
    const candidates = await scanner.scanSubreddit(target);

    if (candidates.length === 0) {
      console.log(`[AGENT] No new unaddressed questions in r/${target.name} right now.`);
      continue;
    }

    const candidate = candidates[0];
    console.log(`\n🎯 [OPPORTUNITY FOUND]`);
    console.log(`Subreddit: r/${candidate.subreddit}`);
    console.log(`Title: ${candidate.title}`);
    console.log(`URL: ${candidate.url}`);

    const reply = brain.generateReply(
      candidate.subreddit,
      candidate.title,
      '',
      candidate.toolSlug
    );

    console.log('\n[BRAIN DRAFTED HUMAN REPLY]:');
    console.log('----------------------------------------------------');
    console.log(reply);
    console.log('----------------------------------------------------');

    const success = await poster.postComment(candidate, reply);
    if (success) {
      const waitMinutes = Math.floor(getRandomIntervalMs() / 60000);
      console.log(`\n⏳ [HUMAN PACING] Resting for ${waitMinutes} minutes before next task...`);
      return; // Exit cycle to rest
    }
  }

  console.log('\n[AGENT] Cycle completed. No action taken.');
}

async function startAgent() {
  console.clear();
  console.log('================================================================');
  console.log('       🚀 PDFArenaArc Autonomous Growth Employee (Agent Arc)');
  console.log('================================================================');
  console.log('• Mode: Stealth Human Simulation (0% Spam, Tier-1 Only)');
  console.log('• Target Subreddits: r/USCIS, r/tax, r/privacy, r/college');
  console.log('• Memory: Persistent Database (Never duplicates threads)');
  console.log('• PC Impact: Minimal (Runs quietly in background)');
  console.log('================================================================\n');

  // Run first cycle immediately
  await runCycle();

  // Recurring loop with human intervals
  while (true) {
    const delay = getRandomIntervalMs();
    const minutes = Math.round(delay / 60000);
    console.log(`\n💤 Next scheduled scan in ${minutes} minutes...`);
    await sleep(delay);
    await runCycle();
  }
}

startAgent().catch((err) => {
  console.error('[AGENT CRASH]', err);
});
