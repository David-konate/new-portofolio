"use client";

import React, { useState } from "react";
import LanguagesEssentielsPage from "@/components/technologies/LanguagesEssentiels";
import FrontEndPage from "@/components/technologies/FrontEnd";
import BackEndBDDPage from "@/components/technologies/BackEndBDD";

export default function TechnologiesPage() {
  const [activeTab, setActiveTab] = useState("lang-essentiels");

  const tabs = [
    {
      id: "lang-essentiels",
      title: "Langages & Essentiels",
      icon: "💬",
      description: "Les langages de programmation fondamentaux",
    },
    {
      id: "frontend",
      title: "Front-End",
      icon: "🎨",
      description: "Frameworks et outils pour l'interface utilisateur",
    },
    {
      id: "backend-bdd",
      title: "Back-End & BDD",
      icon: "🗄️",
      description: "Serveurs, frameworks et bases de données",
    },
  ];

  const renderComponent = () => {
    switch (activeTab) {
      case "lang-essentiels":
        return <LanguagesEssentielsPage />;
      case "frontend":
        return <FrontEndPage />;
      case "backend-bdd":
        return <BackEndBDDPage />;
      default:
        return <LanguagesEssentielsPage />;
    }
  };

  return (
    <div className="technologies-container">
      <div className="technologies-hero">
        <h1 className="technologies-title">
          <span className="bracket">{"<"}</span>Mes Technologies
          <span className="bracket">{"/>"}</span>
        </h1>
        <p className="technologies-subtitle">
          Découvrez l&apos;ensemble des technologies que je maîtrise
        </p>
      </div>

      <div className="technologies-tabs">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <div className="tab-content">
                <span className="tab-title">{tab.title}</span>
                <span className="tab-description">{tab.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="technologies-content">{renderComponent()}</div>
    </div>
  );
}
