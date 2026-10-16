const path = require('path');

module.exports = {
  // Target website details
  SITE_NAME: 'PDFArenaArc',
  SITE_URL: 'https://pdfarenaarc.com',
  CHROME_EXECUTABLE: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  USER_DATA_DIR: path.join(__dirname, 'user_data'),
  MEMORY_FILE: path.join(__dirname, 'agent_memory.json'),

  // Target Tier-1 Communities
  TARGET_SUBREDDITS: [
    { name: 'USCIS', queries: ['pdf size', 'ds 160 pdf', 'ceac document size', 'compress pdf visa'], tool: '/compress-pdf-for-us-visa' },
    { name: 'ImmigrationCanada', queries: ['pdf 4mb limit', 'ircc file size', 'compress pdf express entry', 'merge pdf ircc'], tool: '/compress-pdf-for-canada-pr' },
    { name: 'ukvisa', queries: ['vfs pdf size', 'tlscontact file size', 'compress pdf visa'], tool: '/compress-pdf-for-uk-visa' },
    { name: 'FirstTimeHomeBuyer', queries: ['merge bank statements', 'combine pdf underwriting', 'mortgage pdf'], tool: '/merge-bank-statements-for-mortgage' },
    { name: 'tax', queries: ['combine w2 pdf', 'merge tax documents', 'merge pdf safe'], tool: '/merge-pdf-for-tax-filing' },
    { name: 'privacy', queries: ['pdf editor without upload', 'offline pdf tool', 'private pdf merger', 'ilovepdf alternative'], tool: '/' }
  ],

  // Strict Human Pacing Rules (Ban-proof)
  SAFETY: {
    MIN_INTERVAL_MINUTES: 35,
    MAX_INTERVAL_MINUTES: 75,
    MAX_ACTIONS_PER_DAY: 4,
    HUMAN_TYPING_SPEED_MS: { min: 40, max: 120 }
  }
};
