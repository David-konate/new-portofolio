"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TCCProject() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const description = `MindBalance est une application de bien-être mental basée sur les Thérapies Cognitives et Comportementales (TCC). Elle aide les utilisateurs à mieux comprendre, réguler et transformer leurs émotions grâce à des outils scientifiquement validés. L'application combine suivi émotionnel, aide à la décision et stratégies de régulation, dans une approche pédagogique, progressive et personnalisée. MindBalance vise à rendre les outils de la TCC accessibles au quotidien, en autonomie ou en complément d'un suivi thérapeutique.`;

  const conceptionTasks = [
    "Analyse des principes fondamentaux des TCC",
    "Définition des parcours utilisateurs (autonomie, prévention, crise)",
    "Conception pédagogique des outils (guides, étapes, exemples)",
    "Structuration UX orientée clarté et bienveillance",
    "Rédaction de contenus psychoéducatifs validés scientifiquement",
  ];

  const developmentTasks = [
    "Journal émotionnel avec suivi et analyses",
    "Matrice décisionnelle interactive (avantages / inconvénients)",
    "Boîte à outils de régulation émotionnelle personnalisée",
    "Mode urgence (accès rapide aux stratégies efficaces)",
    "Système de scoring d'efficacité des stratégies",
    "Navigation fluide et responsive",
    "Gestion des données personnelles et confidentialité",
  ];

  const tools = [
    "Journal émotionnel",
    "Matrice décisionnelle",
    "Boîte à outils TCC",
    "Techniques de respiration",
    "Restructuration cognitive",
    "Mode urgence",
  ];

  const technologies = [
    { name: "Next.js / React", src: "/projects/react.png" },
    { name: "TypeScript", src: "/projects/typescript.png" },
    { name: "Tailwind CSS", src: "/projects/tailwind.jpg" },
    { name: "Node.js", src: "/projects/node.webp" },
    { name: "PostgreSQL / Firebase", src: "/projects/sql.avif" },
  ];

  const images = [
    { src: "/projects/tcc1.png", alt: "Accueil MindBalance" },
    { src: "/projects/tcc2.png", alt: "Journal émotionnel" },
    { src: "/projects/tcc3.png", alt: "Matrice décisionnelle" },
    { src: "/projects/tcc4.png", alt: "Boîte à outils TCC" },
    { src: "/projects/tcc5.png", alt: "Fenêtre de création rapide" },
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
    <div className="project-container tcc-theme">
      <div className="project-content">
        <h1 className="project-title slide-in">
          MindBalance – Application TCC & Régulation Émotionnelle
        </h1>

        <div className="project-description-card tcc-card">
          <p className="project-description-text">
            {displayedText}
            {isTyping && <span className="typing-cursor">|</span>}
          </p>
        </div>

        {/* Phase de Conception */}
        <div className="project-section">
          <h2 className="section-title">Phase de Conception</h2>
          <div className="project-features">
            <ul className="project-list tcc-list">
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
            <ul className="project-list tcc-list">
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

        {/* Outils TCC */}
        <div className="project-section">
          <h2 className="section-title">Outils TCC intégrés</h2>
          <div className="project-tags">
            {tools.map((tool, index) => (
              <span key={index} className="project-tag">
                {tool}
              </span>
            ))}
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
            className="dialog-modal tcc-dialog"
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
              className="fullscreen-image tcc-fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );
}
