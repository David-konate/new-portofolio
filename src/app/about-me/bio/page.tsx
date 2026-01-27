import type { Metadata } from "next";
import BioContent from "./bio-content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "À Propos | David Konate - Développeur Web et Concepteur",
    description:
      "Découvrez mon parcours de concepteur développeur d'applications passionné par la technologie. Bac +3 en conception et développement d'applications.",
    keywords: [
      "à propos",
      "bio",
      "concepteur développeur",
      "développeur web",
      "freelance",
      "applications",
    ],
    robots: "index, follow",
    openGraph: {
      title: "À Propos | David Konate",
      description: "Découvrez mon parcours et mes passions",
      url: "https://david-konate.fr/bio",
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: "À Propos | David Konate",
      description:
        "Concepteur développeur d'applications passionné par la technologie",
    },
  };
}

export default function BioPageWrapper() {
  return <BioContent />;
}
