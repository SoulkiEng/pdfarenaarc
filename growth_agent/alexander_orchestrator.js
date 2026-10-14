/**
 * 🏛️ ALEXANDER - MASTER EXECUTIVE ORCHESTRATOR
 * Autonomous Business Director for PDFArenaArc
 * Target: $3,000/Month Recurring Revenue within 60 Days
 */
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const database = require('./database');
const scanner = require('./scanner');
const brain = require('./brain');
const poster = require('./poster');
const bot2 = require('./bots/bot2_directory_outreach');

const DASHBOARD_FILE = path.join(__dirname, 'operations/business_dashboard.json');

function getDashboard() {
  try {
    return JSON.parse(fs.readFileSync(DASHBOARD_FILE, 'utf8'));
  } catch (e) {
    return {};
  }
}

function displayBanner() {
  console.clear();
  console.log('====================================================================');
  console.log('       👑 ALEXANDER: EXECUTIVE BUSINESS MANAGEMENT SYSTEM');
  console.log('====================================================================');
  console.log(' Target Goal: $3,000 / Month Tier-1 Revenue (Deadline: 60 Days)');
  console.log(' Active Site: https://pdfarenaarc.com (27 URLs Live & Indexed)');
  console.log(' Team: Bot 1 (Titan - Social Scout) | Bot 2 (Apex - Directory Outreach)');
  console.log('====================================================================\n');
}

async function runAutonomousDaemon() {
  displayBanner();
  console.log('🚀 [ALEXANDER] Launching Autonomous Dual-Bot Engine in Background...');
  console.log('• Mode: 100% Stealth Human Simulation');
  console.log('• You can keep using your PC normally. The system will work quietly.\n');

  const daemon = require('./run_agent');
}

async function runDirectoryAssistant() {
  displayBanner();
  console.log('📂 [BOT 2: APEX] Available Directory Targets:');
  console.log('1. SaaSHub.com (Free iLovePDF Alternative listing)');
  console.log('2. Toolify.ai (Web Productivity Category)');
  console.log('3. BetaList.com (US Tech Adopters)');
  console.log('4. ProductHunt.com (Official Launch Staging)');
  console.log('5. Back to Main Menu\n');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Select a directory to launch submission portal [1-5]: ', async (choice) => {
    rl.close();
    const map = { '1': 'SaaSHub', '2': 'Toolify.ai', '3': 'BetaList', '4': 'ProductHunt' };
    const target = map[choice.trim()];
    if (target) {
      console.log(`\n[ALEXANDER] Deploying Bot 2 (Apex) to ${target}...`);
      await bot2.openDirectoryPortal(target);
    } else {
      showMainMenu();
    }
  });
}

function showDashboardView() {
  displayBanner();
  const dash = getDashboard();
  console.log('📊 [BUSINESS PROGRESS SNAPSHOT]');
  console.log('----------------------------------------------------');
  console.log(`• Target Revenue:       $${dash?.financialGoal?.targetMonthlyRevenueUSD}/month`);
  console.log(`• Target Pageviews:     ${dash?.financialGoal?.targetMonthlyPageviews} monthly (Tier-1 US/UK)`);
  console.log(`• Timeline:             60 Days Sprint`);
  console.log('\n📁 [DIRECTORY PLATFORMS STATUS]');
  if (dash?.directorySubmissions) {
    for (const [name, info] of Object.entries(dash.directorySubmissions)) {
      console.log(`  - ${name.padEnd(20)}: [${info.status}]`);
    }
  }

  const mem = database.getMemory();
  const today = new Date().toISOString().split('T')[0];
  const actionsToday = mem?.dailyHistory?.[today] || 0;
  console.log('\n🤖 [COMMUNITY ENGAGEMENT METRICS (TITAN)]');
  console.log(`• Actions Taken Today:  ${actionsToday} / ${config.SAFETY.MAX_ACTIONS_PER_DAY} (Safe Daily Cap)`);
  console.log(`• Total Unique Threads: ${Object.keys(mem?.interactedPosts || {}).length} threads handled`);
  console.log('----------------------------------------------------\n');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Press [ENTER] to return to Main Menu: ', () => {
    rl.close();
    showMainMenu();
  });
}

function showMainMenu() {
  displayBanner();
  console.log('Select Action:');
  console.log('  [1] Start Full Autonomous Background Growth System (Titan & Apex)');
  console.log('  [2] Launch Bot 2 (Apex) Directory Submissions (SaaSHub, Toolify, etc.)');
  console.log('  [3] View 60-Day Revenue Dashboard & Live Operations');
  console.log('  [4] One-Time Reddit Login Setup (Save Browser Session)');
  console.log('  [0] Exit\n');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Enter choice [1-4, 0]: ', (ans) => {
    rl.close();
    switch (ans.trim()) {
      case '1':
        runAutonomousDaemon();
        break;
      case '2':
        runDirectoryAssistant();
        break;
      case '3':
        showDashboardView();
        break;
      case '4':
        require('./login');
        break;
      case '0':
        console.log('\n[ALEXANDER] Executive system paused. Standing by for instructions.');
        process.exit(0);
        break;
      default:
        showMainMenu();
        break;
    }
  });
}

showMainMenu();
