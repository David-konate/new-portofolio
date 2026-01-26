"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function SmatStepsProject() {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const description = `Smat Steps est une application de quiz conçue pour susciter l'esprit de compétition et la collaboration. Elle propose deux modes distincts : Mode Communauté pour affronter d'autres utilisateurs et comparer vos scores sur un classement général, et Mode Duel pour défier un adversaire spécifique dans un duel palpitant. Entièrement sécurisée et nécessitant une confirmation par email, Smart Steps est développée à l'aide des technologies React et Laravel.`;

  const conceptionImages = [
    { src: "/projects/cda1.png", alt: "Conception Image 1" },
    { src: "/projects/cda2.png", alt: "Conception Image 2" },
    { src: "/projects/cda3.png", alt: "Conception Image 3" },
    { src: "/projects/cda4.png", alt: "Conception Image 4" },
    { src: "/projects/cda5.png", alt: "Conception Image 5" },
    { src: "/projects/cda6.png", alt: "Conception Image 6" },
  ];

  const developmentImages = [
    { src: "/projects/smat1.png", alt: "Développement Image 1" },
    { src: "/projects/smat2.png", alt: "Développement Image 2" },
    { src: "/projects/smat3.png", alt: "Développement Image 3" },
  ];

  const conceptionTasks = [
    "Création d'un cahier des charges avec pour thème comment proposer une application amusante et éducative",
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
    "Mise en place d'une logique de gestion des questions",
    "Calcul des points et gestion des scores",
    "Création des vues et des contrôleurs",
    "Configuration des différents fournisseurs",
  ];

  const technologies = [
    { src: "/projects/react.jpg", name: "React" },
    { src: "/projects/laravel.png", name: "Laravel" },
    { src: "/projects/material.png", name: "Material UI" },
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
    <div className="project-container smatsteps-theme">
      <div className="project-content">
        <h1 className="project-title slide-in">
          Smat Steps : Application de Quiz
        </h1>

        <div className="project-description-card smatsteps-card">
          <p className="project-description-text">
            {displayedText}
            {isTyping && <span className="typing-cursor">|</span>}
          </p>
        </div>

        {/* Phase de Conception */}
        <div className="project-section">
          <h2 className="section-title">Phase de Conception</h2>
          <div className="project-features">
            <ul className="project-list smatsteps-list">
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
            <ul className="project-list smatsteps-list">
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

        <div className="project-images-container">
          <div className="project-images-grid project-images-grid-small">
            {developmentImages.map((image, index) => (
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

        <div className="project-link-container">
          <a
            href="https://www.smat-steps.david-konate.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            Visitez le site Web de Smat-Steps
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
            className="dialog-modal smatsteps-dialog"
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
              className="fullscreen-image smatsteps-fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );
}
