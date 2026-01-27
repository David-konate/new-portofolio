import type { Metadata } from "next";
import DiagnosticForm from "./diagnostic-form";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Diagnostic de Projet | David Konate - Développeur Web",
    description:
      "Répondez à notre questionnaire pour définir votre projet. Obtenez un devis personnalisé en 3-5 jours.",
    keywords: [
      "diagnostic projet",
      "questionnaire",
      "devis web",
      "développeur web",
      "freelance",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Diagnostic de Projet | David Konate",
      description: "Définissons ensemble les besoins de votre projet",
      url: "https://david-konate.fr/contact/diagnostic",
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Diagnostic de Projet | David Konate",
      description: "Obtenez un devis personnalisé pour votre projet web",
    },
  };
}

export default function DiagnosticPage() {
  return <DiagnosticForm />;
}
