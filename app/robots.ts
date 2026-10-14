import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'Amazonbot',
          'Applebot-Extended',
          'cohere-ai',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://pdfarenaarc.com/sitemap.xml',
  };
}
