"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "accueil", path: "/" },
  { label: "à propos", path: "/about-me" },
  { label: "mon métier", path: "/work" },
  { label: "contact", path: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fonction pour vérifier si un lien est actif
  const isLinkActive = (linkPath: string) => {
    if (linkPath === "/") {
      return pathname === "/";
    }
    // Pour les autres liens, vérifier si le pathname commence par la section
    const section = linkPath.split("/")[1]; // Ex: "about" ou "work"
    return pathname.startsWith(`/${section}`);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="glass-navbar static top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/"
              className="navbar-logo text-accent font-bold text-2xl transition-all duration-300 hover:scale-110"
            >
              David Konaté
            </Link>

            {/* Desktop Menu - Visible uniquement sur grands écrans */}
            <div className="desktop-menu">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`desktop-menu-link ${
                    isLinkActive(link.path)
                      ? "glass-button border-secondary text-secondary glow-secondary"
                      : "text-foreground hover:text-secondary"
                  }`}
                >
                  {link.label.charAt(0).toUpperCase() + link.label.slice(1)}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button - Visible uniquement sur petits écrans */}
            <button
              onClick={toggleMenu}
              className="mobile-menu-button text-accent font-bold text-lg glass px-6 py-2 rounded-lg hover:text-secondary transition-all duration-300"
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={closeMenu}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-72 glass-card z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full p-8">
              {/* Close button */}
              <button
                onClick={closeMenu}
                className="self-end text-accent text-3xl mb-12 hover:text-secondary transition-colors"
              >
                ✕
              </button>

              {/* Menu items */}
              <nav className="flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={closeMenu}
                    className={`px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      isLinkActive(link.path)
                        ? "glass-button border-secondary text-secondary glow-secondary"
                        : "text-foreground hover:text-secondary"
                    }`}
                  >
                    {link.label.charAt(0).toUpperCase() + link.label.slice(1)}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
