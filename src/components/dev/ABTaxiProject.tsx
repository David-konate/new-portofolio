"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ABTaxiProject() {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const description = `En tant que développeur front-end, j'ai joué un rôle crucial dans ce projet en mettant en œuvre diverses fonctionnalités pour un site web permettant la réservation en ligne via un formulaire ou une redirection d'appel. J'ai développé ce site web de manière autonome, en utilisant les API Google pour récupérer les informations Google Business et faciliter la communication par e-mail entre les utilisateurs du site et le propriétaire de l'entreprise.`;

  const images = [
    { src: "/projects/abtaxi4.png", alt: "Interface AB Taxi 1" },
    { src: "/projects/abtaxi.png", alt: "Interface AB Taxi 2" },
    { src: "/projects/abtaxi1.png", alt: "Interface AB Taxi 3" },
    { src: "/projects/abtaxi2.png", alt: "Interface AB Taxi 4" },
    { src: "/projects/abtaxi3.png", alt: "Interface AB Taxi 5" },
  ];

  const features = [
    "Intégration des informations Google Business",
    "Envoi de mails pour les réservations",
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
          AB Taxi : Service de taxi en ligne
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

        <div className="project-link-container">
          <a
            href="https://www.abtaxiservice77.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            Visitez le site Web de AB Taxi
          </a>
        </div>

        <div className="project-technologies">
          <h2 className="technologies-title">Technologies utilisées</h2>
          <div className="technologies-grid">
            <div className="technology-item">
              <Image
                src="/projects/next.jpg"
                alt="Next.js"
                width={119}
                height={81}
                className="tech-logo"
              />
              <p className="tech-name">Next.JS</p>
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
              width={1200}
              height={800}
              className="fullscreen-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
