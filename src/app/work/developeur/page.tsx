import type { Metadata } from "next";
import DeveloperProjects from "./developer-projects";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mes Projets | David Konate - Développeur Web",
    description:
      "Découvrez mes projets web et mobile. AB Taxi, BallnConnect, LaBonnePlace et bien d'autres réalisations.",
    keywords: [
      "projets web",
      "portfolio",
      "développeur web",
      "Next.js",
      "React",
      "freelance",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Mes Projets | David Konate",
      description: "Explorez mes réalisations en développement web et mobile",
      url: "https://david-konate.fr/projets",
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mes Projets | David Konate",
      description: "Découvrez mes projets web et mobile",
    },
  };
}

export default function ProjectsPageWrapper() {
  return <DeveloperProjects />;
}
