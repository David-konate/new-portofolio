import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.david-konate.fr'

    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/favicon.ico',           // Autorise explicitement le favicon
                    '/icon.png',              // Autorise l'icône PNG (si tu en as une)
                    '/opengraph-image.png',    // Autorise l'image de partage réseaux sociaux
                    '/_next/static/media/',   // INDISPENSABLE : Autorise les images optimisées par Next.js
                ],
                disallow: [
                    '/_next/',                // Bloque le reste des fichiers internes
                    '/api/',                  // Bloque les routes API
                    '/admin/',                // Bloque l'accès admin
                    '/private/',              // Bloque les dossiers privés
                ],
            },
            {
                userAgent: ['Googlebot', 'Bingbot'],
                allow: '/',
            },
            {
                // Bloque les bots d'IA et les crawlers étrangers pour économiser tes ressources
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'Google-Extended',
                    'anthropic-ai',
                    'PerplexityBot',
                    'baiduspider',
                    'YandexBot',
                    'CCBot'
                ],
                disallow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}