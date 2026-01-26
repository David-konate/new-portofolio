"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function BonnePlaceProject() {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const description = `BonnePlace est une plateforme de petites annonces en ligne, similaire à Le Bon Coin. Ce projet a été réalisé dans le cadre de ma formation, en collaboration avec deux autres apprenants. J'ai principalement travaillé sur les aspects suivants :`;

  const images = [
    { src: "/projects/labonneplace3.png", alt: "Page de détail d'une annonce" },
    { src: "/projects/labonneplace1.png", alt: "Page d'accueil de BonnePlace" },
    { src: "/projects/labonneplace2.png", alt: "Page de recherche d'annonces" },
  ];

  const features = [
    "Implémentation de la logique d'authentification et d'autorisation des utilisateurs",
    "Création de fonctionnalités CRUD pour la gestion des annonces et des utilisateurs",
    "Mise en place de la navigation entre les différentes pages de l'application",
    "Travail sur la logique de connexion et le profil utilisateur",
    "Migration et seeding de la base de données",
  ];

  const technologies = [
    { src: "/projects/react.jpg", name: "React" },
    { src: "/projects/symfony.jpg", name: "Symfony" },
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
    <div className="project-container bonneplace-theme">
      <div className="project-content">
        <h1 className="project-title slide-in">
          LaBonnePlace : Plateforme de petites annonces en ligne
        </h1>

        <div className="project-description-card bonneplace-card">
          <p className="project-description-text">
            {displayedText}
            {isTyping && <span className="typing-cursor">|</span>}
          </p>
        </div>

        <div className="project-features">
          <ul className="project-list bonneplace-list">
            {features.map((feature, index) => (
              <li
                key={index}
                className="project-list-item slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="project-images-container">
          <div className="project-images-grid">
            {images.map((image, index) => (
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
            className="dialog-modal bonneplace-dialog"
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
              className="fullscreen-image bonneplace-fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );
}
