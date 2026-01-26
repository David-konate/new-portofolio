"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function TeamCalendaProject() {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const description = `TeamCalenda est une application innovante conçue pour faciliter le partage intuitif des sessions d'agenda entre différents utilisateurs. Elle permet à chaque utilisateur d'inviter n'importe qui possédant une adresse web grâce à un système de vérification intelligent. Lorsque l'invité reçoit une invitation, un message est envoyé, soit sur la plateforme si l'invité possède déjà un compte, soit par e-mail avec les étapes à suivre pour créer un compte. Dès la connexion, l'application met en avant les différentes sessions d'agenda ainsi que les messages et les événements à venir ou en cours. Chaque session partage également un système de messagerie intégré, permettant aux utilisateurs d'échanger des informations. TeamCalenda allie simplicité et efficacité, offrant une solution complète pour la gestion des agendas collaboratifs, où chaque utilisateur peut facilement s'organiser et communiquer avec ses pairs.`;

  const conceptionImages = [
    { src: "/projects/agenda.png", alt: "Conception Image 1" },
    { src: "/projects/agenda2.png", alt: "Conception Image 2" },
    { src: "/projects/agenda3.png", alt: "Conception Image 3" },
    { src: "/projects/agenda4.png", alt: "Conception Image 4" },
    { src: "/projects/agenda5.png", alt: "Conception Image 5" },
    { src: "/projects/agenda6.png", alt: "Conception Image 6" },
    { src: "/projects/agenda1.png", alt: "Conception Image 7" },
    { src: "/projects/agenda8.png", alt: "Conception Image 8" },
  ];

  const conceptionTasks = [
    "Création d'un cahier des charges avec pour thème comment proposer une application permettant de partager de manière intuitive des agendas",
    "Réalisation du dossier technique",
    "Réalisation du dossier fonctionnel",
  ];

  const developmentTasks = [
    "Conception et développement de l'interface utilisateur",
    "Développement des fonctionnalités de backend",
    "Gestion de bases de données et stockage des données",
    "Intégration de services tiers tels que les systèmes d'authentification",
    "Tests unitaires et tests d'intégration pour garantir la qualité du code",
    "Optimisation des performances de l'application",
    "Mise en place de mécanismes de sécurité pour protéger les données et les utilisateurs",
    "Gestion des erreurs et des exceptions",
    "Documentation du code et des fonctionnalités",
    "Déploiement de l'application sur des serveurs O2Switch",
    "Configuration de la gestion des versions et des mises à jour de l'application",
    "Surveillance et analyse des performances de l'application une fois qu'elle est en ligne",
    "Implémentation de la logique d'authentification et d'autorisation",
    "Développement des fonctionnalités CRUD",
    "Migration et peuplement de la base de données",
    "Mise en place d'une logique de gestion des agendas et des événements",
    "Gestion des invitations en fonction de si l'invité a déjà un compte ou non dans la BDD de l'application",
    "Paramétrage d'une messagerie interne à chaque session d'agenda",
    "Création des vues et des contrôleurs",
  ];

  const technologies = [
    { src: "/projects/vue.jpg", name: "Vue3" },
    { src: "/projects/laravel.png", name: "Laravel" },
    { src: "/projects/tailwind.jpg", name: "Tailwind CSS" },
    { src: "/projects/sql.avif", name: "MySQL" },
    { src: "/projects/eloquent.jpg", name: "Eloquent" },
  ];

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < description.length) {
        setDisplayedText(description.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 15);

    return () => clearInterval(typingInterval);
  }, []);

  const handleImageClick = (src: string) => {
    setFullScreenImage(src);
  };

  const handleCloseFullScreenImage = () => {
    setFullScreenImage(null);
  };

  return (
    <div className="project-container teamcalenda-theme">
      <div className="project-content">
        <h1 className="project-title slide-in">
          TeamCalenda : Gestion Collaborative des Agendas
        </h1>

        <div className="project-description-card teamcalenda-card">
          <p className="project-description-text">
            {displayedText}
            {isTyping && <span className="typing-cursor">|</span>}
          </p>
        </div>

        {/* Phase de Conception */}
        <div className="project-section">
          <h2 className="section-title">Phase de Conception</h2>
          <div className="project-features">
            <ul className="project-list teamcalenda-list">
              {conceptionTasks.map((task, index) => (
                <li
                  key={index}
                  className="project-list-item slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-images-container">
          <div className="project-images-grid">
            {conceptionImages.map((image, index) => (
              <div
                key={index}
                className="project-image-wrapper"
                onClick={() => handleImageClick(image.src)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="project-image"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="project-divider"></div>

        {/* Phase de Développement */}
        <div className="project-section">
          <h2 className="section-title">Phase de Développement</h2>
          <div className="project-features">
            <ul className="project-list teamcalenda-list">
              {developmentTasks.map((task, index) => (
                <li
                  key={index}
                  className="project-list-item slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-link-container">
          <a
            href="https://www.agenda.david-konate.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            Visitez le site Web de TeamAgenda
          </a>
        </div>

        <div className="project-technologies">
          <h2 className="technologies-title">Technologies utilisées</h2>
          <div className="technologies-grid">
            {technologies.map((tech, index) => (
              <div key={index} className="technology-item">
                <Image
                  src={tech.src}
                  alt={tech.name}
                  width={119}
                  height={81}
                  className="tech-logo"
                />
                <p className="tech-name">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {fullScreenImage && (
        <div className="dialog-backdrop" onClick={handleCloseFullScreenImage}>
          <div
            className="dialog-modal teamcalenda-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseFullScreenImage}
              className="dialog-close"
              aria-label="Fermer"
            >
              ✕
            </button>
            <Image
              src={fullScreenImage}
              alt="Full Screen"
              width={1600}
              height={1200}
              className="fullscreen-image teamcalenda-fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );
}
