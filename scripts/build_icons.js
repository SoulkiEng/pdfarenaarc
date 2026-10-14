const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const iconDir = path.join(__dirname, '..', 'chrome_extension', 'icons');
  if (!fs.existsSync(iconDir)) {
    fs.mkdirSync(iconDir, { recursive: true });
  }

  const svgPath = path.join(__dirname, '..', 'public', 'icon.svg');
  const svg = fs.readFileSync(svgPath, 'utf8');

  console.log('Rendering extension icons from vector source...');
  const browser = await chromium.launch({ headless: true });

  for (const size of [16, 48, 128]) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;overflow:hidden;background:transparent;">
      ${svg.replace('width="512" height="512"', `width="${size}" height="${size}"`)}
    </body></html>`;
    
    await page.setContent(html);
    const dest = path.join(iconDir, `icon${size}.png`);
    await page.screenshot({ path: dest, omitBackground: true });
    console.log(`Generated ${dest} (${size}x${size})`);
    await page.close();
  }

  await browser.close();
  console.log('[SUCCESS] All Chrome Extension icons generated successfully!');
}

generateIcons().catch(console.error);
