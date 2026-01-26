"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface BackEndBDDItem {
  src: string;
  title: string;
  text: string;
}

export default function BackEndBDDPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const backEndBDDItems: BackEndBDDItem[] = [
    {
      src: "/projects/node.webp",
      title: "Node.js",
      text: `Node.js est un environnement d'exécution JavaScript permettant d'exécuter du code JavaScript côté serveur. Il ouvre la voie à des applications web en temps réel, des serveurs web performants et des APIs RESTful ou GraphQL.

Node.js utilise un modèle événementiel non-bloquant qui le rend léger et efficace, idéal pour les applications intensives en I/O. Il est souvent utilisé avec des frameworks comme Express.js, Fastify ou NestJS pour construire des applications web scalables et performantes.`,
    },
    {
      src: "/projects/laravel.png",
      title: "Laravel",
      text: `Laravel est un framework PHP pour le développement web rapide et élégant. Il fournit une architecture MVC claire et des outils intégrés pour simplifier les tâches courantes comme l'authentification, la gestion de base de données avec Eloquent ORM, le routage et la gestion des tâches en arrière-plan.

Laravel est reconnu pour sa syntaxe expressive, sa rapidité de développement et sa communauté active. Il offre des fonctionnalités modernes comme les migrations de base de données, le système de templating Blade et l'écosystème complet avec des outils comme Laravel Forge et Vapor.`,
    },
    {
      src: "/projects/symfony.jpg",
      title: "Symfony",
      text: `Symfony est un ensemble de composants PHP réutilisables et un framework MVC complet pour la création d'applications web et de microservices professionnels. Plus modulaire que Laravel, il offre une flexibilité accrue et est idéal pour les projets d'entreprise complexes.

Symfony fournit des outils puissants pour la gestion des dépendances avec Composer, les tests automatisés, la sécurité avancée et les performances optimales. De nombreux projets majeurs utilisent Symfony, y compris Drupal et Laravel qui s'appuie sur plusieurs de ses composants.`,
    },
    {
      src: "/projects/spring-boot.png",
      title: "Spring Boot",
      text: `Spring Boot est un framework Java conçu pour simplifier la création d'applications Spring autonomes et prêtes pour la production. Il offre une configuration minimale par convention et des dépendances intelligentes pour accélérer considérablement le développement.

Spring Boot est particulièrement adapté aux microservices, aux API REST et aux applications web d'entreprise. Il fournit des outils intégrés pour la gestion des dépendances, le monitoring, les tests, la sécurité et le déploiement, ce qui en fait un choix de référence pour les développeurs Java professionnels.`,
    },
    {
      src: "/projects/sql.avif",
      title: "SQL / MySQL",
      text: `SQL (Structured Query Language) est le langage standard pour gérer et manipuler des bases de données relationnelles. Il permet de créer, modifier, interroger et gérer des bases de données structurées avec des tables, colonnes et relations complexes.

MySQL est un système de gestion de bases de données relationnelles open-source qui utilise SQL. Performant, fiable et facile à utiliser, MySQL est particulièrement populaire pour les applications web et fait partie de la stack LAMP (Linux, Apache, MySQL, PHP). Il est utilisé par des entreprises majeures comme Facebook, YouTube et Twitter.`,
    },
    {
      src: "/projects/postgres-logo.png",
      title: "PostgreSQL",
      text: `PostgreSQL est un système de gestion de bases de données relationnelles open-source avancé, reconnu pour son excellente conformité aux normes SQL et ses fonctionnalités entreprise. Il offre une grande fiabilité, une intégrité des données robuste et des performances exceptionnelles.

PostgreSQL supporte les types de données avancés (JSON, XML, tableaux), les transactions ACID complètes, les fonctions personnalisées, les triggers complexes et de nombreuses extensions. C'est un excellent choix pour les applications critiques nécessitant une intégrité des données irréprochable et une scalabilité professionnelle.`,
    },
    {
      src: "/projects/mongoDB.jpg",
      title: "MongoDB",
      text: `MongoDB est une base de données NoSQL orientée document, multi-plateforme et open-source. Contrairement aux bases relationnelles, MongoDB stocke les données sous forme de documents JSON flexibles et imbriqués, permettant des schémas dynamiques.

Cette approche offre une grande flexibilité pour les données non structurées et semi-structurées. MongoDB excelle dans la scalabilité horizontale, les requêtes complexes et est particulièrement adapté pour les applications web modernes, les systèmes de gestion de contenu et les applications temps réel nécessitant une haute disponibilité.`,
    },
    {
      src: "/projects/redis.png",
      title: "Redis",
      text: `Redis est un système de stockage de données en mémoire open-source ultra-performant. Il fonctionne avec des structures de données clé-valeur comme les strings, listes, ensembles, dictionnaires ordonnés et structures plus complexes comme les bitmaps et HyperLogLogs.

Redis est principalement utilisé comme cache haute performance, session store, message broker et pour les files d'attente. Il offre une vitesse d'accès exceptionnelle (sub-milliseconde), une réplication master-slave, et une excellente scalabilité pour les applications nécessitant une réactivité extrême et une haute disponibilité.`,
    },
    {
      src: "/projects/firebase.png",
      title: "Firebase / Cloudinary",
      text: `Firebase est une plateforme de développement d'applications mobiles et web fournie par Google. Elle offre une suite complète de services cloud incluant Firestore (base de données en temps réel), l'authentification, l'hébergement, le stockage de fichiers et les fonctions cloud serverless.

Cloudinary est un service cloud spécialisé dans la gestion et la diffusion d'images et de vidéos. Il fournit des API puissantes pour la transformation d'images à la volée, l'optimisation automatique, la reconnaissance d'objets par IA et la diffusion via CDN global. Ces deux plateformes simplifient considérablement le développement backend.`,
    },
  ];

  useEffect(() => {
    if (openDialog && dialogContent) {
      setDisplayedText("");
      setIsTyping(true);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < dialogContent.length) {
          setDisplayedText(dialogContent.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 15);

      return () => clearInterval(typingInterval);
    }
  }, [openDialog, dialogContent]);

  const handleOpenDialog = (title: string, text: string) => {
    setDialogTitle(title);
    setDialogContent(text);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDisplayedText("");
  };

  return (
    <div className="backend-bdd-container">
      <div className="backend-bdd-grid">
        {backEndBDDItems.map((item, index) => (
          <div key={index} className="backend-bdd-card">
            <div
              className="backend-bdd-image-wrapper"
              onClick={() => handleOpenDialog(item.title, item.text)}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={400}
                height={300}
                className="backend-bdd-image"
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "contain",
                }}
              />
              <div className="backend-bdd-overlay">
                <h3 className="backend-bdd-label">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openDialog && (
        <div className="dialog-backdrop" onClick={handleCloseDialog}>
          <div className="dialog-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h2 className="dialog-title">{dialogTitle}</h2>
              <button
                onClick={handleCloseDialog}
                className="dialog-close"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="dialog-content">
              {displayedText.split("\n\n").map((paragraph, index) => (
                <p key={index} className="dialog-text">
                  {paragraph}
                  {index === displayedText.split("\n\n").length - 1 &&
                    isTyping && <span className="typing-cursor">|</span>}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
