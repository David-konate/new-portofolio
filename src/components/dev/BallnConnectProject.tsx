"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function BallnConnectProject() {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const description = `BallnConnect est une application mobile qui connecte les passionnés de basketball aux terrains, événements et joueurs à proximité. J'ai contribué en tant que développeur front-end à ce projet, en mettant en place les fonctionnalités suivantes :`;

  const images = [
    { src: "/projects/ballnconnect1.jpg", alt: "Visualisation des événements" },
    {
      src: "/projects/ballnconnect2.jpg",
      alt: "Terrain de basket avec informations",
    },
    { src: "/projects/ballnconnect3.jpg", alt: "Détails du terrain" },
  ];

  const features = [
    "Authentification et autorisation des utilisateurs",
    "Intégration avec l'API Google Street View pour la visualisation des terrains",
    "Opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) pour les terrains de jeux et les événements",
    "Mise en place des pages de visualisation des événements et de création d'événements, spécifiques à chaque lieu, permettant aux utilisateurs de s'inscrire à des événements ou des terrains.",
    "Mise en place de la navigation entre les différentes pages de l'application.",
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
    <div className="project-container">
      <div className="project-content">
        <h1 className="project-title slide-in">
          BallnConnect : Application mobile pour les passionnés de basketball
        </h1>

        <div className="project-description-card">
          <p className="project-description-text">
            {displayedText}
            {isTyping && <span className="typing-cursor">|</span>}
          </p>
        </div>

        <div className="project-features">
          <ul className="project-list">
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
          <div className="project-images-grid ballnconnect-grid">
            {images.map((image, index) => (
              <div
                key={index}
                className="project-image-wrapper mobile-image"
                onClick={() => handleImageClick(image.src)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={600}
                  className="project-image"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="project-link-container">
          <a
            href="https://www.ballnconnect.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            Visitez le site Web de BallnConnect
          </a>
        </div>

        <div className="project-technologies">
          <h2 className="technologies-title">Technologies utilisées</h2>
          <div className="technologies-grid">
            <div className="technology-item">
              <Image
                src="/projects/kotlin.webp"
                alt="Kotlin"
                width={119}
                height={81}
                className="tech-logo"
              />
              <p className="tech-name">Kotlin</p>
            </div>
          </div>
        </div>
      </div>

      {fullScreenImage && (
        <div className="dialog-backdrop" onClick={handleCloseFullScreenImage}>
          <div className="dialog-modal" onClick={(e) => e.stopPropagation()}>
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
              width={600}
              height={1200}
              className="fullscreen-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
