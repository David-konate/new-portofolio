import type { Metadata } from "next";
import QualificationsContent from "./qualifications-content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mes Qualifications | David Konate - Développeur Web",
    description:
      "Découvrez mon parcours académique et professionnel. BAC STG, BTS MUC, Développeur Web, Concepteur Développeur d'Applications.",
    keywords: [
      "qualifications",
      "formation",
      "diplômes",
      "parcours académique",
      "développeur web",
      "concepteur développeur",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Mes Qualifications | David Konate",
      description: "Explorez mon parcours académique et professionnel",
      url: "https://david-konate.fr/qualifications",
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mes Qualifications | David Konate",
      description: "Découvrez mon parcours académique et mes diplômes",
    },
  };
}

export default function QualificationsPageWrapper() {
  return <QualificationsContent />;
}
