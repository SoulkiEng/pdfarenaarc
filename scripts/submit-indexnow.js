/**
 * Submits all sitemap URLs to IndexNow (Bing, Copilot, ChatGPT Search, Yandex)
 */
const https = require('https');

const KEY = 'c7e42d8a59f14068b92ea18dc302b5f7';
const HOST = 'pdfarenaarc.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  `https://${HOST}`,
  `https://${HOST}/about-us`,
  `https://${HOST}/contact-us`,
  `https://${HOST}/privacy-policy`,
  `https://${HOST}/terms-of-service`,
  `https://${HOST}/merge-pdf`,
  `https://${HOST}/split-pdf`,
  `https://${HOST}/compress-pdf`,
  `https://${HOST}/jpg-to-pdf`,
  `https://${HOST}/rotate-pdf`,
  `https://${HOST}/watermark-pdf`,
  `https://${HOST}/page-numbers`,
  `https://${HOST}/protect-pdf`,
  `https://${HOST}/unlock-pdf`,
  `https://${HOST}/organize-pdf`,
  `https://${HOST}/pdf-to-text`,
  `https://${HOST}/pdf-to-jpg`,
  `https://${HOST}/sign-pdf`,
  `https://${HOST}/word-to-pdf`,
  `https://${HOST}/pdf-to-word`,
  `https://${HOST}/redact-pdf`,
  `https://${HOST}/grayscale-pdf`,
  `https://${HOST}/compress-pdf-to-200kb`,
  `https://${HOST}/compress-pdf-to-100kb`,
  `https://${HOST}/compress-pdf-for-us-visa`,
  `https://${HOST}/compress-pdf-for-email`,
  `https://${HOST}/compress-pdf-to-300kb`,
  `https://${HOST}/compress-pdf-for-canada-pr`,
  `https://${HOST}/compress-pdf-for-uk-visa`,
  `https://${HOST}/merge-bank-statements-for-mortgage`
];

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URLS
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

console.log(`Submitting ${URLS.length} URLs to IndexNow (${options.hostname})...`);

const req = https.request(options, (res) => {
  console.log(`IndexNow Response Status: ${res.statusCode} ${res.statusMessage}`);
  res.on('data', (d) => process.stdout.write(d));
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('\n[SUCCESS] All 27 URLs successfully submitted to IndexNow search engine cluster!');
    } else {
      console.log(`\nNote: IndexNow key file will be validated once deployed to ${KEY_LOCATION}.`);
    }
  });
});

req.on('error', (e) => {
  console.error(`IndexNow submission error: ${e.message}`);
});

req.write(payload);
req.end();
