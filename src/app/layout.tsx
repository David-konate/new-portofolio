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
  title: "Portfolio - David Konaté | Développeur Full-Stack",
  description:
    "Découvrez le portfolio de David Konaté, développeur Full-Stack spécialisé en React, Next.js et Node.js. Explorez mes projets, compétences et réalisations.",
  keywords: [
    "David Konaté",
    "Développeur Full-Stack",
    "React",
    "Next.js",
    "PhP",
    "Laravel",
    "Symfonie",
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
      "Développeur Full-Stack passionné par les technologies modernes",
    siteName: "David Konaté Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - David Konaté",
    description: "Développeur Full-Stack | React, Next.js, Node.js",
  },
  robots: {
    index: true,
    follow: true,
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
