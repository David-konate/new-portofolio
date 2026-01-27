// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.david-konate.fr'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',           // Bloquer toutes les routes API
                    '/admin/',         // Bloquer l'admin (si vous en avez)
                    '/_next/',         // Bloquer les fichiers Next.js internes
                    '/private/',       // Bloquer les dossiers privés (si vous en avez)
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                crawlDelay: 0,     // Pas de délai pour Google
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                crawlDelay: 0,
            },
            {
                userAgent: 'baiduspider',  // Bloquer Baidu (si vous ne visez pas la Chine)
                disallow: '/',
            },
            {
                userAgent: 'YandexBot',    // Bloquer Yandex (si vous ne visez pas la Russie)
                disallow: '/',
            },
            {
                userAgent: 'GPTBot',       // Bloquer les crawlers IA (ChatGPT)
                disallow: '/',
            },
            {
                userAgent: 'ChatGPT-User', // Bloquer ChatGPT
                disallow: '/',
            },
            {
                userAgent: 'Google-Extended', // Bloquer Google Bard/Gemini
                disallow: '/',
            },
            {
                userAgent: 'anthropic-ai', // Bloquer Claude (Anthropic)
                disallow: '/',
            },
            {
                userAgent: 'PerplexityBot', // Bloquer Perplexity
                disallow: '/',
            },
            {
                userAgent: 'CCBot',        // Bloquer Common Crawl
                disallow: '/',
            },
            {
                userAgent: 'FacebookBot',  // Bloquer Facebook (optionnel)
                disallow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl, // Domaine principal (évite duplicate content)
    }
}