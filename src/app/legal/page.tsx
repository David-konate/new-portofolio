// app/legal/page.tsx
"use client";

import { useEffect, useRef } from "react";

export default function LegalPage() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="legal-container">
      <div className="legal-content">
        {/* Header */}
        <section
          className="legal-header"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[0] = el;
            }
          }}
        >
          <h1 className="legal-title">
            <span className="typing-text">Mentions Légales</span>
            <span className="typing-cursor">|</span>
          </h1>
          <p className="legal-subtitle">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </section>

        {/* Éditeur du site */}
        <section
          className="legal-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[1] = el;
            }
          }}
        >
          <h2 className="section-title">1. Identité du responsable du site</h2>
          <div className="section-content">
            <p className="legal-text">
              <span className="label">Nom :</span> David Konaté
            </p>
            <p className="legal-text">
              <span className="label">Statut :</span> Auto-entrepreneur
            </p>
            <p className="legal-text">
              <span className="label">Adresse :</span> 4 avenue Richelieu, 44100
              Nantes, France
            </p>
            <p className="legal-text">
              <span className="label">Téléphone :</span>{" "}
              <a href="tel:+33763418790" className="legal-link">
                07 63 41 87 90
              </a>
            </p>
            <p className="legal-text">
              <span className="label">Email :</span>{" "}
              <a href="mailto:contact@david-konate.fr" className="legal-link">
                contact@david-konate.fr
              </a>
            </p>
            <p className="legal-text">
              <span className="label">Directeur de publication :</span> David
              Konaté
            </p>
          </div>
        </section>

        {/* Hébergement */}
        <section
          className="legal-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[2] = el;
            }
          }}
        >
          <h2 className="section-title">2. Hébergement</h2>
          <div className="section-content">
            <p className="legal-text">
              <span className="label">Hébergeur :</span> o2switch
            </p>
            <p className="legal-text">
              <span className="label">Forme juridique :</span> SAS au capital de
              100 000 euros
            </p>
            <p className="legal-text">
              <span className="label">Adresse :</span> 222-224 Boulevard Gustave
              Flaubert, 63000 Clermont-Ferrand, France
            </p>
            <p className="legal-text">
              <span className="label">Téléphone :</span>{" "}
              <a href="tel:+33444446040" className="legal-link">
                04 44 44 60 40
              </a>
            </p>
            <p className="legal-text">
              <span className="label">Email :</span>{" "}
              <a href="mailto:support@o2switch.fr" className="legal-link">
                support@o2switch.fr
              </a>
            </p>
            <p className="legal-text">
              <span className="label">Site web :</span>{" "}
              <a
                href="https://www.o2switch.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="legal-link"
              >
                www.o2switch.fr
              </a>
            </p>
            <p className="legal-text">
              <span className="label">SIRET :</span> 510 909 807 00024
            </p>
          </div>
        </section>

        {/* Propriété intellectuelle */}
        <section
          className="legal-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[3] = el;
            }
          }}
        >
          <h2 className="section-title">3. Propriété intellectuelle</h2>
          <div className="section-content">
            <p className="legal-text">
              Le Site et chacun des éléments qui le composent, notamment mais
              non exclusivement, les textes, images, vidéos, photographies,
              marques, logos, sont la propriété exclusive de David Konaté, à
              l&apos;exception des marques, logos ou contenus appartenant à
              d&apos;autres sociétés partenaires ou auteurs.
            </p>
            <p className="legal-text">
              Toute reproduction, distribution, modification, adaptation,
              retransmission ou publication, même partielle, de ces différents
              éléments est strictement interdite sans l&apos;accord exprès par
              écrit de David Konaté. Cette représentation ou reproduction, par
              quelque procédé que ce soit, constitue une contrefaçon sanctionnée
              par les articles L.335-2 et suivants du Code de la propriété
              intellectuelle.
            </p>
          </div>
        </section>

        {/* Liens hypertextes */}
        <section
          className="legal-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[4] = el;
            }
          }}
        >
          <h2 className="section-title">4. Liens hypertextes</h2>
          <div className="section-content">
            <p className="legal-text">
              Le site peut contenir des liens hypertextes vers d&apos;autres
              sites. David Konaté n&apos;exerce aucun contrôle sur ces sites et
              décline toute responsabilité quant à leur contenu.
            </p>
            <p className="legal-text">
              La création de liens vers ce site est autorisée sous réserve
              qu&apos;ils ne portent pas atteinte à l&apos;image de David Konaté
              et de ses services.
            </p>
          </div>
        </section>

        {/* Limitation de responsabilité */}
        <section
          className="legal-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[5] = el;
            }
          }}
        >
          <h2 className="section-title">5. Limitation de responsabilité</h2>
          <div className="section-content">
            <p className="legal-text">
              David Konaté s&apos;efforce d&apos;assurer l&apos;exactitude et la
              mise à jour des informations diffusées sur ce site. Toutefois, il
              ne peut garantir l&apos;exactitude, la précision ou
              l&apos;exhaustivité des informations mises à disposition sur ce
              site.
            </p>
            <p className="legal-text">
              L&apos;Éditeur du Site ne pourra être tenu responsable des
              dommages directs et indirects causés au matériel de
              l&apos;Utilisateur, lors de l&apos;accès au Site. L&apos;Éditeur
              ne pourra également être tenu responsable des dommages indirects
              (tels par exemple qu&apos;une perte de marché ou perte d&apos;une
              chance) consécutifs à l&apos;utilisation du Site.
            </p>
            <p className="legal-text">
              L&apos;utilisateur reconnaît utiliser ces informations sous sa
              responsabilité exclusive.
            </p>
          </div>
        </section>

        {/* Protection des données personnelles */}
        <section
          className="legal-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[6] = el;
            }
          }}
        >
          <h2 className="section-title">
            6. Protection des données personnelles (RGPD)
          </h2>
          <div className="section-content">
            <h3 className="subsection-title">6.1 Responsable du traitement</h3>
            <p className="legal-text">
              Le responsable du traitement des données personnelles collectées
              sur ce site est David Konaté, joignable à l&apos;adresse email :
              contact@david-konate.fr
            </p>

            <h3 className="subsection-title">6.2 Données collectées</h3>
            <p className="legal-text">
              Les données personnelles collectées sur ce site proviennent
              uniquement du formulaire de contact et peuvent inclure :
            </p>
            <ul className="legal-list">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>
                Message et toute information que vous choisissez de partager
              </li>
            </ul>

            <h3 className="subsection-title">6.3 Finalité du traitement</h3>
            <p className="legal-text">
              Les données collectées sont utilisées exclusivement pour :
            </p>
            <ul className="legal-list">
              <li>Répondre à vos demandes de contact</li>
              <li>Vous fournir les informations demandées</li>
            </ul>

            <h3 className="subsection-title">6.4 Base légale</h3>
            <p className="legal-text">
              Le traitement de vos données repose sur votre consentement, que
              vous donnez en soumettant le formulaire de contact.
            </p>

            <h3 className="subsection-title">6.5 Durée de conservation</h3>
            <p className="legal-text">
              Vos données personnelles sont conservées pendant la durée
              nécessaire au traitement de votre demande, puis archivées pendant
              une durée maximum de 3 ans.
            </p>

            <h3 className="subsection-title">6.6 Vos droits</h3>
            <p className="legal-text">
              Conformément au Règlement Général sur la Protection des Données
              (RGPD) et à la loi Informatique et Libertés, vous disposez des
              droits suivants :
            </p>
            <ul className="legal-list">
              <li>Droit d&apos;accès à vos données personnelles</li>
              <li>Droit de rectification de vos données personnelles</li>
              <li>Droit à l&apos;effacement de vos données personnelles</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité de vos données</li>
              <li>Droit d&apos;opposition au traitement de vos données</li>
            </ul>
            <p className="legal-text">
              Pour exercer ces droits, vous pouvez nous contacter à
              l&apos;adresse : contact@david-konate.fr
            </p>
            <p className="legal-text">
              Vous disposez également du droit d&apos;introduire une réclamation
              auprès de la CNIL (Commission Nationale de l&apos;Informatique et
              des Libertés) : www.cnil.fr
            </p>

            <h3 className="subsection-title">6.7 Cookies</h3>
            <p className="legal-text">
              L&apos;Utilisateur est informé que lors de ses visites sur le
              Site, des cookies techniques peuvent s&apos;installer
              automatiquement sur son logiciel de navigation. Ces cookies sont
              strictement nécessaires au fonctionnement du site et ne
              contiennent pas d&apos;information personnelle. L&apos;Utilisateur
              peut désactiver ces cookies par l&apos;intermédiaire des
              paramètres figurant au sein de son logiciel de navigation.
            </p>
          </div>
        </section>

        {/* Droit applicable */}
        <section
          className="legal-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[7] = el;
            }
          }}
        >
          <h2 className="section-title">
            7. Droit applicable et juridiction compétente
          </h2>
          <div className="section-content">
            <p className="legal-text">
              Les présentes mentions légales sont régies par le droit français.
              Tout litige en relation avec l&apos;utilisation du Site est soumis
              au droit français.
            </p>
            <p className="legal-text">
              En cas de litige et à défaut d&apos;accord amiable, le litige sera
              porté devant les tribunaux compétents de Nantes conformément aux
              règles de compétence en vigueur.
            </p>
          </div>
        </section>

        {/* Footer */}
        <section
          className="legal-footer"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[8] = el;
            }
          }}
        >
          <p className="legal-text footer-text">
            Pour toute question concernant ces mentions légales, vous pouvez
            nous contacter à l&apos;adresse :{" "}
            <a href="mailto:contact@david-konate.fr" className="legal-link">
              contact@david-konate.fr
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
