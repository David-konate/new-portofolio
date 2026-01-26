"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function YoungBossProject() {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const description = `Le programme Young Boss vise à promouvoir l'insertion professionnelle des jeunes par le biais du sport. Il rassemble des jeunes et des entreprises lors d'activités et de formations.`;

  const images = [
    { src: "/projects/YB1.png", alt: "Young Boss Image 1" },
    { src: "/projects/YB2.png", alt: "Young Boss Image 2" },
    { src: "/projects/YB3.png", alt: "Young Boss Image 3" },
    { src: "/projects/YB4.png", alt: "Young Boss Image 4" },
  ];

  const conceptionTasks = [
    "Création d'un cahier des charges avec pour thème comment proposer une application amusante et éducative",
    "Réalisation du dossier technique",
    "Réalisation du dossier fonctionnel",
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
    <div className="project-container youngboss-theme">
      <div className="project-content">
        <h1 className="project-title slide-in">
          Programme Young Boss - UNDRTD Sport
        </h1>

        <div className="project-description-card youngboss-card">
          <p className="project-description-text">
            {displayedText}
            {isTyping && <span className="typing-cursor">|</span>}
          </p>
        </div>

        {/* Phase de Conception */}
        <div className="project-section">
          <h2 className="section-title">Phase de Conception</h2>
          <div className="project-features">
            <ul className="project-list youngboss-list">
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

        <div className="project-divider"></div>

        {/* Phase de Développement */}
        <div className="project-section">
          <h2 className="section-title">Phase de Développement</h2>
          <div className="project-description-card youngboss-card">
            <p className="project-description-text">
              En cours de développement...
            </p>
          </div>
        </div>
      </div>

      {fullScreenImage && (
        <div className="dialog-backdrop" onClick={handleCloseFullScreenImage}>
          <div
            className="dialog-modal youngboss-dialog"
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
              className="fullscreen-image youngboss-fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );
}
