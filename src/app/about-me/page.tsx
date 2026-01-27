"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    {
      id: "bio",
      title: "Biographie",
      icon: "👤",
      description: "Découvrez mon parcours et mon histoire",
      route: "/about/bio",
    },
    {
      id: "interest",
      title: "Centres d'intérêt",
      icon: "🎯",
      description: "Mes passions et ce qui m'inspire",
      route: "/about/interest",
    },
    {
      id: "qualification",
      title: "Qualifications",
      icon: "🎓",
      description: "Formation et compétences professionnelles",
      route: "/about/qualification",
    },
  ];

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="about-title">
          <span className="bracket">{"<"}</span>À propos de moi
          <span className="bracket">{"/>"}</span>
        </h1>
        <p className="about-subtitle">
          Explorez mon parcours, mes passions et mes compétences
        </p>
      </div>

      <div className="about-grid">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`about-card ${activeSection === section.id ? "active" : ""}`}
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

      <div className="about-footer">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">5+</div>
            <div className="stat-label">Années d&apos;expérience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">20+</div>
            <div className="stat-label">Projets réalisés</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Technologies maîtrisées</div>
          </div>
        </div>
      </div>
    </div>
  );
}
