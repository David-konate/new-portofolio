"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ABTaxiProject from "@/components/dev/ABTaxiProject";
import BallnConnectProject from "@/components/dev/BallnConnectProject";
import BonnePlaceProject from "@/components/dev/BonnePlaceProject";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const pageTitle = "// Mes Projets";

  const projects: Project[] = [
    {
      id: "abtaxi",
      title: "AB Taxi",
      category: "Web Development",
      description:
        "Service de réservation de taxi en ligne avec intégration Google Business",
      image: "/projects/abtaxi.png",
      tags: ["Next.js", "Google API", "Email Integration"],
    },
    {
      id: "ballnconnect",
      title: "BallnConnect",
      category: "Mobile Development",
      description: "Application mobile pour passionnés de basketball",
      image: "/projects/ballnconnect1.jpg",
      tags: ["Kotlin", "Google Street View", "CRUD"],
    },
    {
      id: "bonneplace",
      title: "LaBonnePlace",
      category: "Web Development",
      description: "Plateforme de petites annonces en ligne",
      image: "/projects/labonneplace1.png",
      tags: ["React", "Symfony", "Authentication"],
    },
  ];

  useEffect(() => {
    setDisplayedTitle("");
    setIsTyping(true);
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < pageTitle.length) {
        setDisplayedTitle(pageTitle.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const renderProjectComponent = () => {
    switch (selectedProject) {
      case "abtaxi":
        return <ABTaxiProject />;
      case "ballnconnect":
        return <BallnConnectProject />;
      case "bonneplace":
        return <BonnePlaceProject />;
      default:
        return null;
    }
  };

  return (
    <div className="projects-page">
      {!selectedProject ? (
        <div className="projects-container">
          <h1 className="projects-main-title">
            {displayedTitle}
            {isTyping && <span className="typing-cursor">|</span>}
          </h1>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card"
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="project-card-image-wrapper">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="project-card-image"
                  />
                  <div className="project-card-overlay">
                    <div className="project-card-overlay-content">
                      <span className="view-project-text">Voir le projet</span>
                      <span className="arrow-icon">→</span>
                    </div>
                  </div>
                </div>

                <div className="project-card-content">
                  <span className="project-category">{project.category}</span>
                  <h2 className="project-card-title">{project.title}</h2>
                  <p className="project-card-description">
                    {project.description}
                  </p>

                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="projects-footer">
            <p className="footer-text">
              Explorez mes projets et découvrez mes compétences en action.
            </p>
          </div>
        </div>
      ) : (
        <div className="project-detail-wrapper">
          <button onClick={handleCloseProject} className="back-button">
            <span className="back-arrow">←</span>
            <span>Retour aux projets</span>
          </button>
          {renderProjectComponent()}
        </div>
      )}
    </div>
  );
}
