const { chromium } = require('playwright');
const path = require('path');

async function generateBanner() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 800, height: 480 } });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: linear-gradient(135deg, #090d16 0%, #111827 100%);
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 480px;
        text-align: center;
        box-sizing: border-box;
        padding: 30px;
      }
      .badge {
        background: rgba(37, 99, 235, 0.2);
        border: 1px solid #3b82f6;
        color: #60a5fa;
        padding: 6px 18px;
        border-radius: 9999px;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-bottom: 16px;
      }
      h1 {
        font-size: 38px;
        font-weight: 800;
        margin: 0 0 10px 0;
        color: #ffffff;
      }
      .subtitle {
        font-size: 18px;
        color: #94a3b8;
        margin-bottom: 25px;
      }
      .flow {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 25px;
      }
      .card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.12);
        padding: 14px 20px;
        border-radius: 12px;
        font-size: 18px;
        font-weight: 700;
      }
      .card.orig { color: #f87171; }
      .card.engine { color: #38bdf8; border-color: rgba(56, 189, 248, 0.3); }
      .card.comp { color: #4ade80; border-color: rgba(74, 222, 128, 0.4); background: rgba(74, 222, 128, 0.1); }
      .arrow { font-size: 22px; color: #64748b; }
      .tagline {
        font-size: 15px;
        color: #cbd5e1;
        margin-bottom: 12px;
      }
      .url {
        font-size: 18px;
        font-weight: 800;
        color: #38bdf8;
        background: rgba(56, 189, 248, 0.1);
        padding: 8px 24px;
        border-radius: 8px;
        border: 1px dashed rgba(56, 189, 248, 0.4);
      }
    </style>
  </head>
  <body>
    <div class="badge">100% In-Browser Privacy</div>
    <h1>Compress PDF Under 200 KB</h1>
    <div class="subtitle">Without Losing Crisp Text, Barcodes or Signatures</div>
    <div class="flow">
      <div class="card orig">5 MB PDF</div>
      <div class="arrow">➔</div>
      <div class="card engine">WebAssembly (Local)</div>
      <div class="arrow">➔</div>
      <div class="card comp">195 KB (Portal Ready)</div>
    </div>
    <div class="tagline">🔒 Zero Cloud Uploads • 100% Private for Tax & Immigration Docs</div>
    <div class="url">https://pdfarenaarc.com/compress-pdf-to-200kb</div>
  </body>
  </html>
  `;

  await page.setContent(html);
  const outPath = path.join(process.cwd(), 'public', 'quora_banner.png');
  await page.screenshot({ path: outPath });
  console.log('Saved banner to:', outPath);
  await browser.close();
}

generateBanner().catch(console.error);
