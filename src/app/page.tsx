import { Metadata } from "next";
import Game from "@/components/game/Game";

export const metadata: Metadata = {
  title: "Accueil - David Konaté | Développeur Full-Stack",
  description:
    "Bienvenue sur le portfolio de David Konaté. Découvrez mes réalisations, compétences et expertise en développement web et mobile.",
};

export default function Home() {
  return (
    <div className="home-container">
      {/* Left Section */}
      <div className="left-text">
 
        <p className="intro-text">Bonjour et bienvenue, je suis</p>
        <h1 className="name-title">David Konaté</h1>
        <h2 className="job-title">&gt; Développeur Full-Stack</h2>

        <p className="comment">{`// Retrouvez ci-dessous mon GitHub`}</p>
        <p className="comment">{`// ainsi que mon LinkedIn :`}</p>

        {/* GitHub Link */}
        <div className="code-line">
          <span className="const">const</span>
          <span className="name-const">githubLink</span>
          <span className="equals">=</span>
        </div>
        <a
          href="https://github.com/David-konate"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          https://github.com/David-konate
        </a>

        {/* LinkedIn Link */}
        <div className="code-line">
          <span className="const">const</span>
          <span className="name-const">linkedinLink</span>
          <span className="equals">=</span>
        </div>
        <a
          href="https://www.linkedin.com/in/david-konaté-670172194/"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          https://www.linkedin.com/in/david-konaté-670172194/
        </a>
      </div>

      {/* Right Section - Game */}
      <div className="right-game">
        <Game />
      </div>
    </div>
  );
}