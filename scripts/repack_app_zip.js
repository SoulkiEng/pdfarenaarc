const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const tempDir = path.join(process.cwd(), 'temp_zip_pack');
if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(tempDir, { recursive: true });

console.log('1. Copying fresh production files to packaging folder...');

// Folders to include
const foldersToCopy = ['out', 'app', 'components', 'lib', 'public', 'scripts', 'nodejs'];
for (const folder of foldersToCopy) {
  const src = path.join(process.cwd(), folder);
  const dest = path.join(tempDir, folder);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`  ✓ Copied folder: ${folder}`);
  }
}

// Files to include
const filesToCopy = [
  'server.js',
  'package.json',
  'package-lock.json',
  'next.config.js',
  'postcss.config.js',
  'tailwind.config.js',
  'tsconfig.json'
];

for (const file of filesToCopy) {
  const src = path.join(process.cwd(), file);
  const dest = path.join(tempDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`  ✓ Copied file: ${file}`);
  }
}

// Double check nodejs/server.js
const nodejsDir = path.join(tempDir, 'nodejs');
if (!fs.existsSync(nodejsDir)) fs.mkdirSync(nodejsDir, { recursive: true });
fs.copyFileSync('server.js', path.join(nodejsDir, 'server.js'));
console.log('  ✓ Verified nodejs/server.js is in place.');

console.log('2. Compressing into pdfarenaarc-app.zip...');
const destZip = path.join(process.cwd(), 'pdfarenaarc-app.zip');
if (fs.existsSync(destZip)) {
  fs.unlinkSync(destZip);
}

// Compress using PowerShell Compress-Archive
const sourcePattern = path.join(tempDir, '*');
cp.execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${sourcePattern}' -DestinationPath '${destZip}' -Force"`);

console.log('3. Cleaning up temp directory...');
fs.rmSync(tempDir, { recursive: true, force: true });

const size = (fs.statSync(destZip).size / (1024 * 1024)).toFixed(2);
console.log(`\n🎉 SUCCESS! Fresh production pdfarenaarc-app.zip is ready (${size} MB)!`);
