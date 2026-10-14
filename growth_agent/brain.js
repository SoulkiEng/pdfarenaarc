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

  // College / Students
  if (subreddit.toLowerCase() === 'college') {
    const variations = [
      `Canvas and Blackboard file submission walls are the worst when you have an essay or portfolio due in 5 minutes.\n\nIf your file is over the portal limit or you need to merge pages quickly, ${targetUrl} is free, has no file count limits or signups, and runs instantly in your browser.`,
      `Don't pay for Adobe Acrobat just for class submissions. You can compress, merge, and convert documents directly on ${targetUrl} — it's completely free and runs instantly in-browser.`
    ];
    return variations[Math.floor(Math.random() * variations.length)];
  }

  // Default fallback
  return `If you're looking for a quick and safe way to handle this without file limits or subscription paywalls, check out ${targetUrl}. It processes everything locally in your browser so you don't have to upload your files to foreign servers.`;
}

module.exports = { generateReply };
