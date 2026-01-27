"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import SmatStepsProject from "@/components/concepteur/SmatStep";
import TeamCalendaProject from "@/components/concepteur/TeamCalenda";
import YoungBossProject from "@/components/concepteur/YougBoss";
import TTC from "@/components/concepteur/TTC";
import MapFlowProject from "@/components/concepteur/MapFlowProject";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export default function ConceptorProjects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const pageTitle = "// Mes Projets";

  const projects: Project[] = [
    {
      id: "mindbalance",
      title: "MindBalance",
      category: "Application Santé Mentale",
      description: "Application TCC & Régulation Émotionnelle",
      image: "/projects/tcc1.png",
      tags: ["React", "Next.js", "TypeScript", "PostgreSQL"],
    },
    {
      id: "mapflow",
      title: "MapFlow Pro",
      category: "Plateforme Métier",
      description: "Plateforme de gestion d'interventions terrain",
      image: "/projects/mapflow1.png",
      tags: ["React Native", "Spring Boot", "PostGIS", "Docker"],
    },
    {
      id: "teamcalenda",
      title: "TeamCalenda",
      category: "Web Application",
      description: "Gestion collaborative et partage d'agendas",
      image: "/projects/agenda.png",
      tags: ["Vue.js", "Laravel", "Tailwind"],
    },
    {
      id: "smatsteps",
      title: "Smat Steps",
      category: "Web Application",
      description: "Application de quiz compétitive et collaborative",
      image: "/projects/smat1.png",
      tags: ["React", "Laravel", "MySQL"],
    },
    {
      id: "youngboss",
      title: "Young Boss",
      category: "Projet Social & Sportif",
      description: "Insertion professionnelle des jeunes par le sport",
      image: "/projects/YB1.png",
      tags: ["UX/UI", "Gestion de projet"],
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
      case "smatsteps":
        return <SmatStepsProject />;
      case "teamcalenda":
        return <TeamCalendaProject />;
      case "youngboss":
        return <YoungBossProject />;
      case "mindbalance":
        return <TTC />;
      case "mapflow":
        return <MapFlowProject />;
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
