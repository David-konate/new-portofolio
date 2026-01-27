import type { Metadata } from "next";
import ContactForm from "./contact-form";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Me Contacter | David Konate - Développeur Web",
    description:
      "Vous avez un projet web ? Contactez-moi directement. Réponse garantie dans les 48h.",
    keywords: ["contact", "développeur web", "freelance", "projet web"],
    robots: "index, follow",
    openGraph: {
      title: "Me Contacter | David Konate",
      description: "Discutons de votre projet ensemble",
      url: "https://david-konate.fr/contact",
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Me Contacter | David Konate",
      description: "Vous avez un projet ? Parlons-en ensemble !",
    },
  };
}

export default function ContactPage() {
  return <ContactForm />;
}
