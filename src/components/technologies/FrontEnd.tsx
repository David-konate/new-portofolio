"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface FrontEndItem {
  src: string;
  title: string;
  text: string;
}

export default function FrontEndPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const frontEndItems: FrontEndItem[] = [
    {
      src: "/projects/react.jpg",
      title: "React",
      text: `React est une bibliothèque JavaScript pour créer des interfaces utilisateur web composables et réactives. Il utilise un système de composants réutilisables et la notion de virtual DOM pour optimiser les rendus et améliorer les performances.

React facilite la gestion d'état avec les hooks (useState, useEffect, useContext, etc.) et permet de créer des applications web modernes et performantes. Il est devenu incontournable pour les développeurs front-end souhaitant construire des interfaces complexes, maintenables et scalables.`,
    },
    {
      src: "/projects/vue.jpg",
      title: "Vue.js / Angular",
      text: `Vue.js est un framework JavaScript progressif pour créer des interfaces utilisateur interactives. Léger et flexible, il est facile à apprendre et à intégrer progressivement dans des projets existants. Vue excelle dans la réactivité des données et la composition de composants.

Angular est un framework complet développé par Google, offrant une structure robuste pour les applications d'entreprise. Il intègre TypeScript nativement et fournit des outils avancés pour le routage, les formulaires, les tests et la gestion d'état. Les deux frameworks sont excellents pour des projets de différentes envergures.`,
    },
    {
      src: "/projects/next.jpg",
      title: "Next.js",
      text: `Next.js est un framework React qui simplifie le développement d'applications web modernes en combinant React avec des fonctionnalités avancées. Il offre le rendu côté serveur (SSR), le pré-rendu statique (SSG), et la génération incrémentale de pages statiques (ISR).

Next.js gère automatiquement l'optimisation des performances, le code splitting, l'optimisation des images et le routing basé sur le système de fichiers. Il est particulièrement adapté aux applications nécessitant un SEO efficace, une meilleure performance initiale et une expérience développeur optimale.`,
    },
    {
      src: "/projects/tailwind.jpeg",
      title: "Tailwind CSS",
      text: `Tailwind CSS est un framework CSS utility-first qui révolutionne l'approche du stylisme web. Au lieu de classes prédéfinies pour des composants, Tailwind fournit des classes utilitaires atomiques pour composer directement dans le HTML.

Cette approche permet un développement plus rapide, une meilleure maintenabilité et une réduction significative de la taille du CSS final grâce au tree-shaking. Tailwind s'intègre parfaitement avec les frameworks JavaScript modernes et permet de créer des interfaces web élégantes et responsives sans écrire de CSS personnalisé.`,
    },
    {
      src: "/projects/bootstrap.webp",
      title: "Bootstrap",
      text: `Bootstrap est le framework CSS le plus populaire pour la création rapide d'interfaces web responsives. Il fournit une grille flexible basée sur flexbox, des composants préconstruits (boutons, formulaires, navbars, modales) et un système d'icônes complet.

Bootstrap offre une approche mobile-first et est hautement personnalisable via Sass. Il accélère considérablement le développement front-end en fournissant des fondations solides et cohérentes pour construire des interfaces web professionnelles sans partir de zéro.`,
    },
    {
      src: "/projects/webpack-to-vite.webp",
      title: "Webpack / Vite",
      text: `Webpack est un bundler de modules pour JavaScript moderne qui empaquette et optimise les ressources web (JS, CSS, images). Il permet de scinder le code en modules, de les charger à la demande et d'optimiser les performances avec le tree-shaking et le code-splitting.

Vite est un outil de build nouvelle génération qui offre un démarrage instantané et un rechargement ultra-rapide grâce aux modules ES natifs. Il utilise esbuild pour un pré-bundling extrêmement rapide et Rollup pour la production. Vite est devenu le choix privilégié pour les nouveaux projets grâce à sa vitesse exceptionnelle.`,
    },
  ];

  useEffect(() => {
    if (openDialog && dialogContent) {
      setDisplayedText("");
      setIsTyping(true);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < dialogContent.length) {
          setDisplayedText(dialogContent.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 15);

      return () => clearInterval(typingInterval);
    }
  }, [openDialog, dialogContent]);

  const handleOpenDialog = (title: string, text: string) => {
    setDialogTitle(title);
    setDialogContent(text);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDisplayedText("");
  };

  return (
    <div className="frontend-container">
      <div className="frontend-grid">
        {frontEndItems.map((item, index) => (
          <div key={index} className="frontend-card">
            <div
              className="frontend-image-wrapper"
              onClick={() => handleOpenDialog(item.title, item.text)}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={400}
                height={300}
                className="frontend-image"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "contain",
                }}
              />
              <div className="frontend-overlay">
                <h3 className="frontend-label">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openDialog && (
        <div className="dialog-backdrop" onClick={handleCloseDialog}>
          <div className="dialog-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h2 className="dialog-title">{dialogTitle}</h2>
              <button
                onClick={handleCloseDialog}
                className="dialog-close"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="dialog-content">
              {displayedText.split("\n\n").map((paragraph, index) => (
                <p key={index} className="dialog-text">
                  {paragraph}
                  {index === displayedText.split("\n\n").length - 1 &&
                    isTyping && <span className="typing-cursor">|</span>}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
