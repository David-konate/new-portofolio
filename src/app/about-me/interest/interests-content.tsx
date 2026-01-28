"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface InterestItem {
  src: string;
  title: string;
  text: string;
}

export default function InterestsContent() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const interests: InterestItem[] = [
    {
      src: "/projects/dev.jpg",
      title: "Développement",
      text: `Fort de mes compétences en langages de programmation tels que Java, PHP, JavaScript, HTML et CSS, je suis un développeur full-stack accompli, capable de créer des applications web et mobiles complètes. Mon expertise en back-end avec PHP et en front-end avec React ou JavaScript me permet de maîtriser l'ensemble du processus de développement. Passionné par les innovations dans le rendu 3D et le développement d'applications immersives, j'explore constamment de nouvelles technologies pour créer des expériences utilisateur interactives et engageantes. Mon enthousiasme pour les jeux vidéo alimente mon intérêt pour les possibilités offertes par les technologies 3D dans le domaine du divertissement.`,
    },
    {
      src: "/projects/science-fic.jpg",
      title: "Science Fiction",
      text: `Passionné par la science-fiction depuis mon plus jeune âge, je suis fasciné par les univers imaginaires et les concepts futuristes qu'elle explore. Des récits épiques de Star Wars aux réflexions philosophiques de Matrix, en passant par les intrigues captivantes de Game of Thrones, les œuvres de science-fiction nourrissent mon imagination et me poussent à repousser les limites du possible. Cette passion se traduit dans mon métier de développeur, où je m'inspire des thèmes de la science-fiction pour créer des solutions innovantes et des expériences utilisateurs immersives. Les voyages dans le temps, l'intelligence artificielle et l'exploration spatiale sont autant de sujets qui me stimulent et me motivent à explorer de nouvelles technologies et à concevoir des produits qui pourraient un jour transformer notre monde.`,
    },
    {
      src: "/projects/ff.webp",
      title: "Jeux vidéo",
      text: `Avide de jeux vidéo depuis toujours, je suis fasciné par les univers immersifs et les défis qu'ils proposent. Que ce soit l'adrénaline des sports virtuels, l'exploration des mondes ouverts des jeux d'action-aventure ou l'élaboration de stratégies complexes dans les jeux de stratégie, les jeux vidéo nourrissent mon esprit et aiguisent mes réflexes. Cette passion se traduit dans mon métier de développeur, où je m'inspire des principes du jeu vidéo pour créer des applications engageantes et intuitives. La conception d'interfaces conviviales, la gestion de données complexes et la création d'expériences immersives sont autant de domaines où mon intérêt pour les jeux vidéo me permet d'apporter une vision unique et innovante.`,
    },
    {
      src: "/projects/histoire.jpg",
      title: "Culture/Histoire",
      text: `Fasciné par les civilisations anciennes, je plonge dans l'histoire depuis mon plus jeune âge. De l'Antiquité à la fin de la Renaissance, j'explore les vestiges du passé à travers les visites de musées comme le Louvre, la découverte de châteaux historiques et l'étude des mythologies égyptiennes, romaines, grecques et nordiques. Cette passion pour l'histoire nourrit mon approche du métier de développeur. Les leçons tirées du passé sur la créativité humaine, la résolution de problèmes et l'adaptation aux changements m'inspirent à construire des applications qui respectent l'héritage culturel et les valeurs humaines. L'histoire me rappelle que l'innovation ne se fait jamais dans le vide, mais toujours en dialogue avec le passé.`,
    },
    {
      src: "/projects/musique.jpg",
      title: "Musique",
      text: `Amoureux de la musique depuis mon enfance, j'explore les rythmes et les mélodies du monde entier. Du rap US et français des années 2000 au reggae et au dancehall, en passant par le jazz, le blues et les instruments tels que le violon, le saxophone et le piano, la musique nourrit mon âme et enrichit ma vie. Cette passion pour la musique se retrouve dans mon métier de développeur, où je m'inspire des émotions et des rythmes pour créer des expériences utilisateur immersives. L'intégration de musiques adaptées aux ambiances et la conception d'interfaces qui répondent aux émotions des utilisateurs sont autant de domaines où mon amour pour la musique me permet d'apporter une touche unique et vibrante aux applications que je développe.`,
    },
    {
      src: "/projects/sport.jpg",
      title: "Sport",
      text: `Sportif accompli, je m'adonne au basket et au snowboard avec passion. Sur les terrains de basket ou sur les pistes enneigées, je retrouve les valeurs qui me tiennent à cœur : le dépassement de soi, l'esprit d'équipe et le respect des règles. Je soutiens également des équipes comme le PSG et les Toronto Raptors, admirant leur talent et leur détermination. Cette passion pour le sport se traduit dans mon métier de développeur, où je m'inspire des valeurs sportives pour créer des applications qui encouragent l'activité physique et le bien-être. La rigueur, la collaboration et la persévérance sont des principes que je transmets à mes projets, tout en m'inspirant des performances des athlètes que j'admire, comme Kevin Durant.`,
    },
  ];

  // Effet de typing pour le texte
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
      }, 15); // Vitesse de frappe (ms par caractère)

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
    <div className="interet-container">
      <div className="interet-header">
        <h1>Mes centres d&apos;intérêt</h1>
        <p className="interet-subtitle">
          Ce qui me passionne et m&apos;anime au quotidien
        </p>
      </div>
      <div className="interet-grid">
        {interests.map((interest, index) => (
          <div key={index} className="interet-card">
            <div
              className="interet-image-wrapper"
              onClick={() => handleOpenDialog(interest.title, interest.text)}
            >
              <Image
                src={interest.src}
                alt={interest.title}
                width={400}
                height={300}
                className="interet-image"
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <div className="interet-overlay">
                <h3 className="interet-label">{interest.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog Modal */}
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
