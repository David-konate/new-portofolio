import type { Metadata } from "next";
import ConceptorProjects from "./conceptor-projects-list";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mes Projets Concepteur | David Konate - Développeur Web",
    description:
      "Découvrez mes projets en tant que concepteur UX/UI. MindBalance, MapFlow Pro, TeamCalenda et bien d'autres réalisations.",
    keywords: [
      "projets UX/UI",
      "concepteur",
      "design",
      "portfolio",
      "développeur web",
      "freelance",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Mes Projets Concepteur | David Konate",
      description: "Explorez mes réalisations en conception UX/UI et design",
      url: "https://david-konate.fr/projets-concepteur",
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mes Projets Concepteur | David Konate",
      description: "Découvrez mes projets en conception et design",
    },
  };
}

export default function ConceptorProjectsPageWrapper() {
  return <ConceptorProjects />;
}
