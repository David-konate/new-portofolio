"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Définir les sections et leurs pages
const sidebarSections = {
  about: {
    title: "Qui suis-je?",
    pages: [
      { label: "Overview", path: "/about", icon: "📋" },
      { label: "Bio", path: "/about/bio", icon: "👤" },
      { label: "Intérêts", path: "/about/interest", icon: "🎯" },
      { label: "Qualification", path: "/about/qualification", icon: "🎓" },
    ],
  },
  work: {
    title: "Mon Travail",
    pages: [
      { label: "Overview", path: "/work", icon: "📋" },
      { label: "Technologie", path: "/work/technologies", icon: "⚙️" },
      { label: "Développeur", path: "/work/developeur", icon: "💻" },
      { label: "Concepteur-dev", path: "/work/projects", icon: "📁" },
    ],
  },
};

const Sidebar = () => {
  const pathname = usePathname();
  console.log("pathname", pathname);

  // Détecter la section actuelle
  const currentSection = Object.keys(sidebarSections).find((section) =>
    pathname.includes(`/${section}`),
  );

  // Si pas de section détectée, ne pas afficher la sidebar
  if (!currentSection) {
    return null;
  }

  const section =
    sidebarSections[currentSection as keyof typeof sidebarSections];

  if (!section) {
    return null;
  }

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <h3 className="sidebar-title">{section.title}</h3>
        <div className="sidebar-divider"></div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {section.pages.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className={`sidebar-link ${pathname === page.path ? "active" : ""}`}
          >
            <span className="link-icon">{page.icon}</span>
            <span className="link-label">{page.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer Decoration */}
      <div className="sidebar-footer">
        <div className="decoration-line"></div>
      </div>
    </aside>
  );
};

export default Sidebar;
