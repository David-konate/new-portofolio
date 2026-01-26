"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface QualificationItem {
  src: string;
  title: string;
  text: string;
}

export default function QualificationPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const qualifications: QualificationItem[] = [
    {
      src: "/projects/bac-stg.jpg",
      title: "BAC STG",
      text: `Le BAC STG m'a fournit une solide culture économique, juridique et sociale, essentielle pour comprendre le monde des affaires et des organisations. J'ai également acquis une maîtrise des outils informatiques essentiels et développé des compétences en communication et en travail en équipe, compétences indispensables pour évoluer dans un environnement professionnel collaboratif.

Au-delà de ces bases générales, le BAC STG m'a permis d'approfondir mes connaissances en analyse économique et financière, en gestion commerciale et marketing, ainsi qu'en droit des affaires et des contrats. Ces compétences spécifiques me permettent d'appréhender les enjeux stratégiques des entreprises et de contribuer à la prise de décisions éclairées.`,
    },
    {
      src: "/projects/bts-muc.jpg",
      title: "BTS MUC",
      text: `Le BTS Management des Unités Commerciales (MUC) a complété ma formation en me dotant de compétences opérationnelles en gestion commerciale et marketing. J'ai ainsi appris à mettre en place des stratégies commerciales efficaces, à maîtriser les techniques de vente et de négociation, et à développer des relations client de qualité.

De plus, le BTS MUC m'a permis d'acquérir la capacité à piloter des projets et à manager une équipe.`,
    },
    {
      src: "/projects/dev-web.png",
      title: "Développeur Web",
      text: `Ma formation en développement web et mobile m'a permis de maîtriser les langages de programmation essentiels, tels que HTML, CSS, JavaScript, PHP et Python. Je suis capable de concevoir et de développer des applications web et mobiles performantes et responsives.

Cette formation m'a également donné les bases pour comprendre les architectures logicielles et les principes de conception d'applications modernes.`,
    },
    {
      src: "/projects/dev-app.jpg",
      title: "Concepteur / Dév d'App",
      text: `Mon titre de Concepteur Développeur d'Applications atteste de mon expertise dans la conception et le développement d'applications web et mobiles. Je possède une solide maîtrise des architectures logicielles et des principes de conception.

Cette certification reconnait ma capacité à créer des solutions innovantes et performantes, en suivant les meilleures pratiques du développement logiciel et en répondant aux besoins réels des utilisateurs.`,
    },
  ];

  // Effet de typing pour le texte
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
      }, 15); // Vitesse de frappe (ms par caractère)

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
    <div className="qualification-container">
      <div className="qualification-header">
        <h1>Mes Qualifications</h1>
        <p className="qualification-subtitle">
          Mon parcours académique et professionnel
        </p>
      </div>

      <div className="qualification-grid">
        {qualifications.map((qualification, index) => (
          <div key={index} className="qualification-card">
            <div
              className="qualification-image-wrapper"
              onClick={() =>
                handleOpenDialog(qualification.title, qualification.text)
              }
            >
              <Image
                src={qualification.src}
                alt={qualification.title}
                width={400}
                height={300}
                className="qualification-image"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "contain",
                }}
              />
              <div className="qualification-overlay">
                <h3 className="qualification-label">{qualification.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog Modal */}
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
