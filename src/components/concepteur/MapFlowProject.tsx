"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function MapFlowProject() {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const description = `MapFlow Pro est une plateforme métier dédiée à la gestion et à la coordination des interventions terrain. Elle combine une application mobile pour les agents terrain et une interface web pour les managers, permettant la planification intelligente, la géolocalisation en temps réel, la communication contextualisée et le reporting opérationnel. Conçue en architecture moderne, MapFlow Pro intègre la cartographie, la gestion de missions, le mode offline-first, la synchronisation temps réel et un système de sécurité avancé. L'objectif est d'offrir une solution robuste, scalable et orientée performance métier, adaptée aux environnements terrain complexes et aux organisations multi-équipes.`;

  const conceptionTasks = [
    "Analyse des besoins métiers terrain",
    "Rédaction du cahier des charges",
    "Réalisation du dossier de conception fonctionnelle (DCF)",
    "Définition de l'architecture globale",
    "Modélisation des flux utilisateurs",
    "Conception UX orientée terrain et managers",
    "Définition des rôles, permissions et profils",
  ];

  const developmentTasks = [
    "Développement de l'application mobile (React Native)",
    "Développement de l'interface web manager (React)",
    "Mise en place de l'API backend (Spring Boot)",
    "Implémentation du mode offline-first",
    "Intégration de la cartographie (Mapbox / Leaflet)",
    "Mise en place de la messagerie temps réel (WebSocket)",
    "Gestion de la géolocalisation (PostGIS)",
    "Sécurisation des accès (JWT, rôles, permissions)",
    "Architecture modulaire et scalable",
    "CI/CD, dockerisation et déploiement",
    "Monitoring, logging et supervision",
  ];

  const images = [
    { src: "/projects/mapflow1.png", alt: "MapFlow Info" },
    { src: "/projects/mapflow2.png", alt: "MapFlow Carte" },
    { src: "/projects/mapflow3.png", alt: "MapFlow Dashboard" },
    { src: "/projects/mapflow4.png", alt: "MapFlow Planning" },
  ];

  const technologies = [
    { src: "/projects/react.png", name: "React" },
    { src: "/projects/react-native.png", name: "React Native" },
    { src: "/projects/spring.png", name: "Spring Boot" },
    { src: "/projects/postgres.png", name: "PostgreSQL" },
    { src: "/projects/postgis.png", name: "PostGIS" },
    { src: "/projects/docker.png", name: "Docker" },
    { src: "/projects/mapbox.png", name: "Mapbox" },
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
    }, 12);

    return () => clearInterval(typingInterval);
  }, []);

  const handleImageClick = (src: string) => {
    setFullScreenImage(src);
  };

  const handleCloseFullScreenImage = () => {
    setFullScreenImage(null);
  };

  return (
    <div className="project-container mapflow-theme">
      <div className="project-content">
        <h1 className="project-title slide-in">
          MapFlow Pro – Plateforme de gestion d&apos;interventions terrain
        </h1>

        <div className="project-description-card mapflow-card">
          <p className="project-description-text">
            {displayedText}
            {isTyping && <span className="typing-cursor">|</span>}
          </p>
        </div>

        {/* Phase de Conception */}
        <div className="project-section">
          <h2 className="section-title">Phase de Conception</h2>
          <div className="project-features">
            <ul className="project-list mapflow-list">
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
          <div className="project-features">
            <ul className="project-list mapflow-list">
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

        {/* Technologies */}
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
            className="dialog-modal mapflow-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseFullScreenImage}
              className="dialog-close"
              aria-label="Fermer"
            >
              ✕
            </button>
            <div style={{ marginBottom: "1rem" }}>
              <Image
                src={fullScreenImage}
                alt="Full Screen"
                width={1600}
                height={1200}
                className="fullscreen-image mapflow-fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
