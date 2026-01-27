import type { Metadata } from "next";
import InterestsContent from "./interests-content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mes Intérêts | David Konate - Développeur Web",
    description:
      "Découvrez mes passions : développement, science-fiction, jeux vidéo, histoire, musique et sport. Ce qui m'anime au quotidien.",
    keywords: [
      "intérêts",
      "passions",
      "développeur",
      "science-fiction",
      "jeux vidéo",
      "histoire",
      "musique",
      "sport",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Mes Intérêts | David Konate",
      description: "Explorez mes passions et ce qui m'inspire",
      url: "https://david-konate.fr/interets",
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mes Intérêts | David Konate",
      description: "Découvrez mes passions et inspirations",
    },
  };
}

export default function InterestsPageWrapper() {
  return <InterestsContent />;
}
