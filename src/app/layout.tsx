// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.david-konate.fr"),

  title: {
    default: "Portfolio - David Konaté | Développeur Full-Stack",
    template: "%s | David Konaté", // Pour les sous-pages
  },

  description:
    "Découvrez le portfolio de David Konaté, développeur Full-Stack spécialisé en React, Next.js et Node.js. Explorez mes projets, compétences et réalisations.",

  keywords: [
    "David Konaté",
    "Développeur Full-Stack",
    "React",
    "Next.js",
    "PHP",
    "Laravel",
    "Symfony",
    "Node.js",
    "Portfolio",
    "Web Developer",
  ],

  authors: [{ name: "David Konaté" }],
  creator: "David Konaté",

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.david-konate.fr",
    title: "Portfolio - David Konaté | Développeur Full-Stack",
    description:
      "Développeur Full-Stack passionné par les technologies modernes : React, Next.js, PHP, Laravel, Symfony et Node.js",
    siteName: "David Konaté Portfolio",
    images: [
      {
        url: "/opengraph-image", // Next.js trouve automatiquement opengraph-image.png
        width: 1200,
        height: 630,
        alt: "David Konaté - Développeur Full-Stack",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Portfolio - David Konaté",
    description: "Développeur Full-Stack | React, Next.js, PHP, Node.js",
    images: ["/opengraph-image"], // Même image que Open Graph
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png", // Votre logo.png comme icône Apple
  },

  verification: {
    // google: "votre-code-google", // À ajouter plus tard
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="w-full pt-20 min-h-screen flex justify-center relative z-10">
            <div className="max-w-7xl w-full px-4">{children}</div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
