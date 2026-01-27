"use client";

import React from "react";
import Image from "next/image";

export default function BioContent() {
  return (
    <div className="bio-container">
      <div className="bio-content">
        {/* Image INSIDE the text wrapper */}
        <Image
          src="/projects/laptop.png"
          alt="Bitmoji représentant David Konaté sortant d'un pc portable"
          width={400}
          height={400}
          priority
          className="bio-image"
        />

        <p className="bio-paragraph">
          Concepteur développeur d&apos;applications passionné par la
          technologie et la création. Je suis un père de famille de 38 ans,
          originaire de Paris et désormais établi dans la région nantaise. Mon
          parcours académique riche, comprenant un bac STG, un BTS MUC, une
          formation en développement web et mobile de niveau bac +2, et un bac
          +3 en conception et développement d&apos;applications, me confère une
          maîtrise complète des différentes étapes de la création
          d&apos;applications, de la conception à la mise en production.
        </p>

        <p className="bio-paragraph">
          Au-delà de mes compétences techniques, je suis doté d&apos;un esprit
          curieux et créatif, nourri par une passion pour la science-fiction, la
          musique et l&apos;histoire, notamment celle allant de l&apos;Antiquité
          à la fin de la Renaissance. J&apos;apprécie également les jeux vidéo
          et pratique le sport, avec une appétence particulière pour le basket
          et le snowboard.
        </p>

        <p className="bio-paragraph">
          La résolution de problèmes m&apos;attire tout particulièrement,
          rappelant l&apos;aspect ludique des jeux vidéo que j&apos;affectionne.
        </p>

        <p className="bio-paragraph">
          Mon métier de concepteur développeur d&apos;applications me permet
          d&apos;allier mes passions pour la technologie, la création et la
          résolution de problèmes. Toujours en quête de nouveaux défis, je suis
          à l&apos;écoute du marché pour des missions freelance ou des contrats,
          cherchant à mettre à profit mes compétences et mon expertise.
          N&apos;hésitez pas à me contacter si vous souhaitez en savoir
          davantage sur mon parcours ou sur mes projets. Je suis ouvert à toute
          opportunité qui pourrait se présenter sur mon chemin professionnel.
        </p>
      </div>
    </div>
  );
}
