/**
 * BOT 2: APEX - High-Authority Directory & Platform Submissions
 * Automated staging and filing for SaaSHub, ProductHunt, BetaList, Toolify
 */
const { chromium } = require('playwright');
const path = require('path');
const config = require('../config');

const DIRECTORY_PROFILES = [
  {
    name: 'SaaSHub',
    targetUrl: 'https://www.saashub.com/submit',
    category: 'PDF Tools / Privacy',
    competitors: ['iLovePDF', 'Smallpdf'],
    status: 'READY_TO_SUBMIT'
  },
  {
    name: 'Toolify.ai',
    targetUrl: 'https://www.toolify.ai/submit',
    category: 'Productivity & Office',
    status: 'READY_TO_SUBMIT'
  },
  {
    name: 'BetaList',
    targetUrl: 'https://betalist.com/submit',
    category: 'Web Application / Utilities',
    status: 'STAGED'
  },
  {
    name: 'ProductHunt',
    targetUrl: 'https://www.producthunt.com/posts/new',
    category: 'Productivity / Tech',
    status: 'SCHEDULED_FOR_LAUNCH'
  }
];

const DIRECTORY_PAYLOAD = {
  name: 'PDFArenaArc',
  tagline: '100% In-Browser & Private PDF Suite — Zero Server Uploads',
  website: 'https://pdfarenaarc.com',
  pricing: 'Free',
  description: `PDFArenaArc is a private, client-side online PDF toolkit designed for high-confidentiality workflows. All 17 tools (Merge, Split, Compress to 200KB, Redact, Sign, OCR) run 100% in-browser using WebAssembly. Files never touch any remote server, guaranteeing complete privacy for tax, legal, and visa documents.`,
  alternatives: 'iLovePDF, Smallpdf, Adobe Acrobat Web',
  iconPath: path.join(__dirname, '../../public/icon.svg')
};

async function openDirectoryPortal(directoryName) {
  const dir = DIRECTORY_PROFILES.find(d => d.name.toLowerCase() === directoryName.toLowerCase()) || DIRECTORY_PROFILES[0];
  console.log(`\n[APEX] Opening submission portal for ${dir.name}...`);
  console.log(`[APEX] Pre-filled metadata prepared for: ${DIRECTORY_PAYLOAD.name}`);

  const context = await chromium.launchPersistentContext(config.USER_DATA_DIR, {
    headless: false,
    viewport: { width: 1366, height: 850 },
    args: ['--disable-blink-features=AutomationControlled']
  });

  const page = await context.newPage();
  await page.goto(dir.targetUrl, { waitUntil: 'domcontentloaded' });

  console.log(`[APEX] Submission window active. Review details and confirm.`);
  return { context, page, payload: DIRECTORY_PAYLOAD };
}

module.exports = {
  DIRECTORY_PROFILES,
  DIRECTORY_PAYLOAD,
  openDirectoryPortal
};
