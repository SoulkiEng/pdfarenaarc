const fs = require('fs');
const config = require('./config');

function getMemory() {
  if (!fs.existsSync(config.MEMORY_FILE)) {
    const initial = {
      interactedPosts: {},
      dailyHistory: {}
    };
    fs.writeFileSync(config.MEMORY_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
  try {
    return JSON.parse(fs.readFileSync(config.MEMORY_FILE, 'utf8'));
  } catch (e) {
    return { interactedPosts: {}, dailyHistory: {} };
  }
}

function saveMemory(data) {
  fs.writeFileSync(config.MEMORY_FILE, JSON.stringify(data, null, 2));
}

function hasInteracted(postId) {
  const mem = getMemory();
  return Boolean(mem.interactedPosts[postId]);
}

function recordInteraction(postId, postUrl, subreddit, replyText) {
  const mem = getMemory();
  const today = new Date().toISOString().split('T')[0];

  mem.interactedPosts[postId] = {
    url: postUrl,
    subreddit,
    timestamp: new Date().toISOString(),
    reply: replyText
  };

  mem.dailyHistory[today] = (mem.dailyHistory[today] || 0) + 1;
  saveMemory(mem);
}

function canActToday() {
  const mem = getMemory();
  const today = new Date().toISOString().split('T')[0];
  const count = mem.dailyHistory[today] || 0;
  return count < config.SAFETY.MAX_ACTIONS_PER_DAY;
}

module.exports = {
  hasInteracted,
  recordInteraction,
  canActToday,
  getMemory
};
