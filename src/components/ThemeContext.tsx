// contexts/ThemeContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeType = "dark" | "light";

interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
}

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const themes: Record<ThemeType, ThemeColors> = {
  dark: {
    background: "#011627",
    foreground: "#ffffff",
    primary: "#4d5bce",
    secondary: "#43d9ad",
    accent: "#e99287",
    muted: "#8f8c8c",
  },
  light: {
    background: "#f5f5f5",
    foreground: "#1a1a1a",
    primary: "#3a4ab8",
    secondary: "#2ec99d",
    accent: "#d97870",
    muted: "#6b6b6b",
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Fonction helper pour obtenir le thème initial
const getInitialTheme = (): ThemeType => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("portfolio-theme") as ThemeType;
    if (savedTheme && (savedTheme === "dark" || savedTheme === "light")) {
      return savedTheme;
    }
  }
  return "dark";
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialiser directement avec le thème sauvegardé
  const [theme, setTheme] = useState<ThemeType>(getInitialTheme);

  // Appliquer le thème au document
  useEffect(() => {
    const root = document.documentElement;
    const colors = themes[theme];

    // Appliquer les variables CSS
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--foreground", colors.foreground);
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--secondary", colors.secondary);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--muted", colors.muted);

    // Ajouter/retirer la classe dark/light
    root.classList.remove("dark", "light");
    root.classList.add(theme);

    // Sauvegarder dans localStorage
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, colors: themes[theme] }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personnalisé pour utiliser le thème
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
