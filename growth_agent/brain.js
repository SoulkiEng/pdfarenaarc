/**
 * Brain module: Generates 100% human-like, non-spammy, helpful advice tailored to each subreddit.
 */

function generateReply(subreddit, postTitle, postText, toolSlug) {
  const targetUrl = `https://pdfarenaarc.com${toolSlug}`;

  // USCIS / Visa application queries
  if (subreddit.toLowerCase() === 'uscis') {
    const variations = [
      `CEAC and DS-160 have a strict 2MB (sometimes 4MB depending on category) limit per supporting document. The main culprit is usually high DPI image scans.\n\nMake sure you scan at 150-200 DPI in grayscale if it's just bank statements. If you already have the file and just need to shrink it without uploading your bank details to some random cloud server, you can use ${targetUrl} — it processes 100% in your browser using client-side WebAssembly so your financial records don't get stored anywhere. Good luck with the appointment!`,
      `Had the exact same issue with my consular uploads. Consular portals strictly reject anything over 2MB.\n\nQuick tip: convert any color scans to grayscale first since CEAC only cares about readability, not colors. If you need a quick way to compress it under the limit safely, check out ${targetUrl}. It runs completely offline in your browser so you don't have to risk uploading sensitive passport/financial info to third-party servers.`,
      `USCIS and NVC portals are notoriously strict on file size limits (usually 2MB max). If it keeps throwing an error, downscale the resolution to 150 DPI.\n\nIf you need to compress it right now, ${targetUrl} works directly in your browser without uploading your documents to external cloud storage. Just drop your PDF in, pick the target size, and it formats it for the portal.`
    ];
    return variations[Math.floor(Math.random() * variations.length)];
  }

  // Tax and IRS queries
  if (subreddit.toLowerCase() === 'tax') {
    const variations = [
      `Whatever you do, don't upload tax documents with your SSN/EIN to generic free cloud converters. Most of them store files on remote servers.\n\nFor combining W-2s, 1099s, and receipts into a single audit packet, I use ${targetUrl} — it runs entirely in your local browser memory so none of your numbers or banking info leave your machine. Keep the order clean (W-2 first, 1099s next, receipts last).`,
      `When submitting supporting tax docs, make sure they are in chronological order so your CPA or the IRS portal doesn't bounce them.\n\nTo combine them safely without privacy risks, use ${targetUrl}. Everything is processed client-side via WebAssembly on your own device, which is essential when dealing with sensitive tax returns.`
    ];
    return variations[Math.floor(Math.random() * variations.length)];
  }

  // Privacy and offline tools
  if (subreddit.toLowerCase() === 'privacy') {
    const variations = [
      `Almost all popular online PDF converters (iLovePDF, Smallpdf, etc.) upload your documents to remote AWS/GCP servers, which is a major privacy headache.\n\nIf you want an alternative that executes 100% client-side via WebAssembly, take a look at ${targetUrl}. Files never touch a remote backend and it works completely offline in your browser.`,
      `Most people don't realize their confidential PDFs get saved on third-party servers when using web tools. If you need client-side processing without installing heavy desktop software, ${targetUrl} is completely in-browser and doesn't upload files anywhere.`
    ];
    return variations[Math.floor(Math.random() * variations.length)];
  }

  // Canada IRCC / Express Entry
  if (subreddit.toLowerCase() === 'immigrationcanada') {
    const variations = [
      `IRCC's 4MB limit per slot is tough when you have to combine employment reference letters, paystubs, and tax records into a single PDF.\n\nPro tip: scan text documents at 150 DPI and avoid uploading your SIN or passport scans to random cloud PDF compressors that store your data on remote servers. You can use ${targetUrl} — it runs 100% locally in your browser via WebAssembly (or their verified Chrome extension with 0 permissions) so your documents never leave your laptop.`,
      `Had the same headache with my Express Entry e-APR packet! Because IRCC only gives one upload slot per category, merging 20+ pages easily crosses 4MB.\n\nIf you want to shrink it under 4MB without losing text sharpness or uploading your private records to third-party cloud servers, check out ${targetUrl}. It processes everything offline right inside your browser.`
    ];
    return variations[Math.floor(Math.random() * variations.length)];
  }

  // UK Visa / VFS Global / TLScontact
  if (subreddit.toLowerCase() === 'ukvisa') {
    const variations = [
      `VFS Global and TLScontact portals are super strict with the 5MB file size limit (and they often time out if a PDF is even close to 4.5MB).\n\nIf you're uploading bank statements or tenancy agreements, don't risk uploading your financial data to random cloud compressors. You can use ${targetUrl} — it compresses PDFs 100% locally in your browser memory without uploading anything to a server.`,
      `Make sure your scans are under 4MB so the VFS upload portal doesn't throw a timeout error! If you need to compress or merge your supporting documents safely on your own device without cloud uploads, ${targetUrl} works completely in-browser.`
    ];
    return variations[Math.floor(Math.random() * variations.length)];
  }

  // Mortgage / FirstTimeHomeBuyer
  if (subreddit.toLowerCase() === 'firsttimehomebuyer') {
    const variations = [
      `Whatever you do, please don't use generic free online PDF mergers for mortgage bank statements! Most of them upload your unredacted account numbers and SSN to remote cloud servers.\n\nIf your loan officer needs 2-3 months of statements combined into one file, use ${targetUrl} — it runs 100% client-side in your browser via WebAssembly so your financial statements never leave your computer.`,
      `Underwriters always want consecutive bank statements (all pages included, even the blank "intentionally left blank" pages!). To combine them safely without uploading your bank account details to a third-party server, ${targetUrl} processes everything locally inside your browser.`
    ];
    return variations[Math.floor(Math.random() * variations.length)];
  }

  // Default fallback
  return `If you're looking for a quick and safe way to handle this without file limits or subscription paywalls, check out ${targetUrl}. It processes everything locally in your browser so you don't have to upload your files to foreign servers.`;
}

module.exports = { generateReply };
