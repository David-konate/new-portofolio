"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    {
      id: "technologies",
      title: "Technologies",
      icon: "⚙️",
      description: "Les outils et frameworks que je maîtrise",
      route: "/work/technologies",
    },
    {
      id: "developer",
      title: "Développeur",
      icon: "💻",
      description: "Mes projets en tant que développeur",
      route: "/work/developeur",
    },
    {
      id: "designer-developer",
      title: "Concepteur Développeur",
      icon: "🎨",
      description: "Projets alliant design et développement",
      route: "/work/projects",
    },
  ];

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className="work-container">
      <div className="work-hero">
        <h1 className="work-title">
          <span className="bracket">{"<"}</span>
          Mes Travaux
          <span className="bracket">{"/>"}</span>
        </h1>
        <p className="work-subtitle">
          Explorez mes réalisations, mes compétences et mon expertise
        </p>
      </div>

      <div className="work-grid">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`work-card ${activeSection === section.id ? "active" : ""}`}
            onMouseEnter={() => setActiveSection(section.id)}
            onMouseLeave={() => setActiveSection("")}
            onClick={() => handleNavigate(section.route)}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="card-icon">{section.icon}</div>
            <h2 className="card-title">{section.title}</h2>
            <p className="card-description">{section.description}</p>
            <div className="card-arrow">→</div>
          </div>
        ))}
      </div>

      <div className="work-footer">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Technologies maîtrisées</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">30+</div>
            <div className="stat-label">Projets complétés</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
