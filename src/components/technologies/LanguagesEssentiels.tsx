"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface LanguageEssentielItem {
  src: string;
  title: string;
  text: string;
}

export default function LanguagesEssentielsPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const languagesEssentiels: LanguageEssentielItem[] = [
    {
      src: "/projects/html.jpg",
      title: "HTML5 / CSS3",
      text: `HTML5 et CSS3 constituent les fondations de tout développement web moderne. HTML5 introduit de nouvelles balises sémantiques comme <article>, <section>, <header>, <footer> qui améliorent la structure et l'accessibilité des pages web, ainsi qu'un support natif pour les médias et les API web modernes.

CSS3 apporte des fonctionnalités avancées comme les animations, les transitions, les transformations, les flexbox et grid layout. Ensemble, ils permettent de créer des interfaces web modernes, responsives et accessibles sans dépendre de technologies tierces.`,
    },
    {
      src: "/projects/js-ts.webp",
      title: "JavaScript / TypeScript",
      text: `JavaScript est le langage de programmation incontournable du web, permettant de créer des interactions dynamiques côté client et serveur. Il permet la validation de formulaires, les effets spéciaux, les interactions utilisateur et le contenu qui se met à jour sans rechargement.

TypeScript est un sur-ensemble typé de JavaScript qui ajoute un système de types statiques. Il améliore la qualité du code, facilite la maintenance et offre une meilleure expérience développeur avec l'autocomplétion et la détection d'erreurs à la compilation. TypeScript est devenu essentiel pour les projets complexes.`,
    },
    {
      src: "/projects/php.png",
      title: "PHP",
      text: `PHP est un langage de script côté serveur largement utilisé pour le développement web. Il s'exécute sur le serveur avant que le contenu ne soit envoyé au navigateur, permettant de générer du contenu HTML dynamique en fonction des besoins de l'utilisateur.

PHP excelle dans l'accès et la modification des bases de données, la gestion des sessions utilisateur et la création d'applications web interactives. Sa simplicité d'apprentissage et son écosystème riche en frameworks (Laravel, Symfony) en font un choix populaire pour le développement backend.`,
    },
    {
      src: "/projects/python.png",
      title: "Python",
      text: `Python est un langage de programmation polyvalent reconnu pour sa syntaxe claire et sa facilité d'apprentissage. Dans le développement web, il est utilisé avec des frameworks comme Django et Flask pour créer des applications robustes et scalables.

Python excelle également dans le traitement de données, l'intelligence artificielle, l'automatisation et les scripts backend. Sa grande bibliothèque standard et son écosystème riche en font un excellent choix pour les projets nécessitant du traitement de données ou de l'apprentissage automatique.`,
    },
    {
      src: "/projects/java.png",
      title: "Java",
      text: `Java est un langage de programmation polyvalent orienté objet, conçu pour être indépendant de la plateforme d'exécution. Il est utilisé pour développer des applications web d'entreprise avec des frameworks comme Spring Boot, des applications mobiles Android, des applications de bureau et des systèmes embarqués.

Le code Java est compilé en bytecode exécuté par la JVM, garantissant portabilité et performance. Java est particulièrement apprécié pour les applications d'entreprise complexes nécessitant robustesse, sécurité et scalabilité.`,
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
    <div className="lang-essentiels-container">
      <div className="lang-essentiels-grid">
        {languagesEssentiels.map((item, index) => (
          <div key={index} className="lang-essentiels-card">
            <div
              className="lang-essentiels-image-wrapper"
              onClick={() => handleOpenDialog(item.title, item.text)}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={400}
                height={300}
                className="lang-essentiels-image"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "contain",
                }}
              />
              <div className="lang-essentiels-overlay">
                <h3 className="lang-essentiels-label">{item.title}</h3>
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
