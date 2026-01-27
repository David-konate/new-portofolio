// app/privacy-policy/page.tsx
"use client";

import { useEffect, useRef } from "react";

export default function PrivacyPolicyPage() {
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
    <div className="privacy-container">
      <div className="privacy-content">
        {/* Header */}
        <section
          className="privacy-header"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[0] = el;
            }
          }}
        >
          <h1 className="privacy-title">
            <span className="typing-text">Politique de Confidentialité</span>
            <span className="typing-cursor">|</span>
          </h1>
          <p className="privacy-subtitle">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </section>

        {/* Préambule */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[1] = el;
            }
          }}
        >
          <h2 className="section-title">Préambule</h2>
          <div className="section-content">
            <p className="privacy-text">
              La présente politique de confidentialité explique comment nous
              collectons, utilisons et protégeons vos données personnelles lors
              de votre visite sur{" "}
              <a
                href="https://www.david-konate.fr"
                className="privacy-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.david-konate.fr
              </a>{" "}
              (ci-après le &quot;Site&quot;).
            </p>
            <p className="privacy-text">
              Nous nous engageons à protéger votre vie privée et à respecter les
              lois applicables en matière de protection des données, notamment
              le Règlement Général sur la Protection des Données (RGPD) et la
              loi Informatique et Libertés.
            </p>
          </div>
        </section>

        {/* Responsable du traitement */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[2] = el;
            }
          }}
        >
          <h2 className="section-title">1. Responsable du traitement</h2>
          <div className="section-content">
            <p className="privacy-text">
              Le responsable du traitement des données à caractère personnel
              collectées sur ce Site est :
            </p>
            <p className="privacy-text">
              <span className="label">Nom :</span> David Konaté
            </p>
            <p className="privacy-text">
              <span className="label">Statut :</span> Auto-entrepreneur
            </p>
            <p className="privacy-text">
              <span className="label">Adresse :</span> 4 avenue Richelieu, 44100
              Nantes, France
            </p>
            <p className="privacy-text">
              <span className="label">Email :</span>{" "}
              <a href="mailto:contact@david-konate.fr" className="privacy-link">
                contact@david-konate.fr
              </a>
            </p>
          </div>
        </section>

        {/* Données collectées */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[3] = el;
            }
          }}
        >
          <h2 className="section-title">2. Données collectées</h2>
          <div className="section-content">
            <h3 className="subsection-title">
              2.1 Données collectées via le formulaire de contact
            </h3>
            <p className="privacy-text">
              Lorsque vous utilisez notre formulaire de contact, nous collectons
              les données suivantes :
            </p>
            <ul className="privacy-list">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Objet du message</li>
              <li>Type de projet (optionnel)</li>
              <li>
                Contenu du message et toute information que vous choisissez de
                partager
              </li>
              <li>Date et heure de soumission du formulaire</li>
            </ul>

            <h3 className="subsection-title">
              2.2 Données techniques collectées automatiquement
            </h3>
            <p className="privacy-text">
              Lors de votre navigation sur le Site, certaines données techniques
              peuvent être collectées automatiquement :
            </p>
            <ul className="privacy-list">
              <li>
                Adresse IP (utilisée uniquement pour la protection contre les
                abus et le rate limiting)
              </li>
              <li>Type de navigateur et système d&apos;exploitation</li>
              <li>Pages visitées et durée de visite</li>
              <li>Données de navigation (cookies techniques)</li>
            </ul>
          </div>
        </section>

        {/* Finalité du traitement */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[4] = el;
            }
          }}
        >
          <h2 className="section-title">3. Finalité du traitement</h2>
          <div className="section-content">
            <p className="privacy-text">
              Vos données personnelles sont collectées et traitées pour les
              finalités suivantes :
            </p>
            <ul className="privacy-list">
              <li>
                <span className="label">Gestion des demandes de contact :</span>{" "}
                Répondre à vos demandes d&apos;information, de devis ou de
                collaboration
              </li>
              <li>
                <span className="label">Communication :</span> Vous fournir les
                informations demandées concernant nos services
              </li>
              <li>
                <span className="label">Sécurité :</span> Prévenir les abus,
                spam et tentatives de piratage via le rate limiting et la
                détection de contenu suspect
              </li>
              <li>
                <span className="label">Amélioration du service :</span>{" "}
                Analyser l&apos;utilisation du Site pour améliorer
                l&apos;expérience utilisateur
              </li>
            </ul>
          </div>
        </section>

        {/* Base légale */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[5] = el;
            }
          }}
        >
          <h2 className="section-title">4. Base légale du traitement</h2>
          <div className="section-content">
            <p className="privacy-text">
              Le traitement de vos données personnelles repose sur les bases
              légales suivantes :
            </p>
            <ul className="privacy-list">
              <li>
                <span className="label">Consentement :</span> En soumettant le
                formulaire de contact, vous consentez explicitement au
                traitement de vos données personnelles
              </li>
              <li>
                <span className="label">Intérêt légitime :</span> Pour assurer
                la sécurité du Site et prévenir les abus (détection de spam,
                rate limiting)
              </li>
              <li>
                <span className="label">Obligation légale :</span> Conservation
                des données nécessaires pour se conformer aux obligations
                légales
              </li>
            </ul>
          </div>
        </section>

        {/* Durée de conservation */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[6] = el;
            }
          }}
        >
          <h2 className="section-title">5. Durée de conservation</h2>
          <div className="section-content">
            <p className="privacy-text">
              Vos données personnelles sont conservées pendant les durées
              suivantes :
            </p>
            <ul className="privacy-list">
              <li>
                <span className="label">
                  Données du formulaire de contact :
                </span>{" "}
                Conservation active pendant la durée nécessaire au traitement de
                votre demande, puis archivage pendant 3 ans maximum
              </li>
              <li>
                <span className="label">Données techniques (logs) :</span> 12
                mois maximum
              </li>
              <li>
                <span className="label">Cookies techniques :</span> 13 mois
                maximum
              </li>
            </ul>
            <p className="privacy-text">
              Au-delà de ces durées, vos données sont supprimées de manière
              sécurisée.
            </p>
          </div>
        </section>

        {/* Destinataires */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[7] = el;
            }
          }}
        >
          <h2 className="section-title">6. Destinataires des données</h2>
          <div className="section-content">
            <p className="privacy-text">
              Vos données personnelles sont destinées aux personnes et services
              suivants :
            </p>
            <ul className="privacy-list">
              <li>
                <span className="label">David Konaté :</span> Pour traiter vos
                demandes de contact
              </li>
              <li>
                <span className="label">Prestataires techniques :</span>
                <ul className="privacy-sublist">
                  <li>
                    <strong>Vercel</strong> (hébergement du site)
                  </li>
                  <li>
                    <strong>Resend</strong> (service d&apos;envoi d&apos;emails)
                  </li>
                  <li>
                    <strong>Upstash</strong> (rate limiting et protection contre
                    les abus)
                  </li>
                </ul>
              </li>
            </ul>
            <p className="privacy-text">
              Ces prestataires sont soumis à des obligations de confidentialité
              et ne peuvent utiliser vos données qu&apos;aux fins pour
              lesquelles nous les leur communiquons.
            </p>
            <p className="privacy-text">
              Vos données ne sont jamais vendues, louées ou échangées avec des
              tiers à des fins commerciales.
            </p>
          </div>
        </section>

        {/* Transferts internationaux */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[8] = el;
            }
          }}
        >
          <h2 className="section-title">
            7. Transferts internationaux de données
          </h2>
          <div className="section-content">
            <p className="privacy-text">
              Certains de nos prestataires techniques sont situés en dehors de
              l&apos;Union Européenne. Dans ce cas, nous nous assurons que des
              garanties appropriées sont en place, notamment :
            </p>
            <ul className="privacy-list">
              <li>
                Clauses contractuelles types approuvées par la Commission
                européenne
              </li>
              <li>Certification Privacy Shield (le cas échéant)</li>
              <li>
                Mesures de sécurité techniques et organisationnelles appropriées
              </li>
            </ul>
          </div>
        </section>

        {/* Vos droits */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[9] = el;
            }
          }}
        >
          <h2 className="section-title">8. Vos droits</h2>
          <div className="section-content">
            <p className="privacy-text">
              Conformément au RGPD et à la loi Informatique et Libertés, vous
              disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="privacy-list">
              <li>
                <span className="label">Droit d&apos;accès :</span> Vous pouvez
                obtenir la confirmation que des données vous concernant sont
                traitées et en obtenir une copie
              </li>
              <li>
                <span className="label">Droit de rectification :</span> Vous
                pouvez demander la correction de vos données inexactes ou
                incomplètes
              </li>
              <li>
                <span className="label">Droit à l&apos;effacement :</span> Vous
                pouvez demander la suppression de vos données dans certaines
                conditions
              </li>
              <li>
                <span className="label">Droit à la limitation :</span> Vous
                pouvez demander la limitation du traitement de vos données
              </li>
              <li>
                <span className="label">Droit à la portabilité :</span> Vous
                pouvez recevoir vos données dans un format structuré et
                couramment utilisé
              </li>
              <li>
                <span className="label">Droit d&apos;opposition :</span> Vous
                pouvez vous opposer au traitement de vos données pour des
                raisons tenant à votre situation particulière
              </li>
              <li>
                <span className="label">
                  Droit de retirer votre consentement :
                </span>{" "}
                Vous pouvez retirer votre consentement à tout moment
              </li>
              <li>
                <span className="label">
                  Droit de définir des directives post-mortem :
                </span>{" "}
                Vous pouvez définir des directives relatives au sort de vos
                données après votre décès
              </li>
            </ul>

            <h3 className="subsection-title">Comment exercer vos droits ?</h3>
            <p className="privacy-text">
              Pour exercer l&apos;un de ces droits, vous pouvez nous contacter :
            </p>
            <ul className="privacy-list">
              <li>
                Par email :{" "}
                <a
                  href="mailto:contact@david-konate.fr"
                  className="privacy-link"
                >
                  contact@david-konate.fr
                </a>
              </li>
              <li>
                Par téléphone :{" "}
                <a href="tel:+33763418790" className="privacy-link">
                  07 63 41 87 90
                </a>
              </li>
            </ul>
            <p className="privacy-text">
              Nous nous engageons à répondre à votre demande dans un délai
              d&apos;un mois à compter de sa réception. Ce délai peut être
              prolongé de deux mois si la demande est complexe.
            </p>

            <h3 className="subsection-title">Réclamation auprès de la CNIL</h3>
            <p className="privacy-text">
              Si vous estimez que vos droits ne sont pas respectés, vous avez le
              droit d&apos;introduire une réclamation auprès de la Commission
              Nationale de l&apos;Informatique et des Libertés (CNIL) :
            </p>
            <ul className="privacy-list">
              <li>
                Site web :{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="privacy-link"
                >
                  www.cnil.fr
                </a>
              </li>
              <li>Adresse : 3 Place de Fontenoy, 75007 Paris</li>
              <li>Téléphone : 01 53 73 22 22</li>
            </ul>
          </div>
        </section>

        {/* Cookies */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[10] = el;
            }
          }}
        >
          <h2 className="section-title">
            9. Cookies et technologies similaires
          </h2>
          <div className="section-content">
            <h3 className="subsection-title">
              9.1 Qu&apos;est-ce qu&apos;un cookie ?
            </h3>
            <p className="privacy-text">
              Un cookie est un petit fichier texte déposé sur votre terminal
              (ordinateur, smartphone, tablette) lors de la visite d&apos;un
              site web. Il permet de reconnaître votre terminal lors de vos
              visites ultérieures.
            </p>

            <h3 className="subsection-title">
              9.2 Cookies utilisés sur ce site
            </h3>
            <p className="privacy-text">Notre Site utilise uniquement :</p>
            <ul className="privacy-list">
              <li>
                <span className="label">Cookies strictement nécessaires :</span>{" "}
                Ces cookies sont indispensables au fonctionnement du Site,
                notamment pour la sécurité (token CSRF) et ne nécessitent pas
                votre consentement
              </li>
              <li>
                <span className="label">Cookies de préférence :</span> Pour
                mémoriser vos choix (thème sombre/clair)
              </li>
            </ul>
            <p className="privacy-text">
              <strong>Nous n&apos;utilisons pas :</strong>
            </p>
            <ul className="privacy-list">
              <li>Cookies publicitaires</li>
              <li>Cookies de réseaux sociaux</li>
              <li>
                Cookies de tracking ou d&apos;analyse (Google Analytics, etc.)
              </li>
            </ul>

            <h3 className="subsection-title">9.3 Gestion des cookies</h3>
            <p className="privacy-text">
              Vous pouvez à tout moment désactiver les cookies via les
              paramètres de votre navigateur :
            </p>
            <ul className="privacy-list">
              <li>
                <strong>Chrome :</strong> Paramètres → Confidentialité et
                sécurité → Cookies
              </li>
              <li>
                <strong>Firefox :</strong> Paramètres → Vie privée et sécurité →
                Cookies
              </li>
              <li>
                <strong>Safari :</strong> Préférences → Confidentialité →
                Cookies
              </li>
              <li>
                <strong>Edge :</strong> Paramètres → Cookies et autorisations de
                site
              </li>
            </ul>
            <p className="privacy-text">
              ⚠️ Attention : La désactivation des cookies strictement
              nécessaires peut affecter le fonctionnement du Site.
            </p>
          </div>
        </section>

        {/* Sécurité */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[11] = el;
            }
          }}
        >
          <h2 className="section-title">10. Sécurité des données</h2>
          <div className="section-content">
            <p className="privacy-text">
              Nous mettons en œuvre des mesures techniques et organisationnelles
              appropriées pour protéger vos données personnelles contre :
            </p>
            <ul className="privacy-list">
              <li>La destruction accidentelle ou illicite</li>
              <li>La perte accidentelle</li>
              <li>L&apos;altération</li>
              <li>La divulgation ou l&apos;accès non autorisés</li>
            </ul>
            <p className="privacy-text">Ces mesures incluent notamment :</p>
            <ul className="privacy-list">
              <li>
                <span className="label">Chiffrement HTTPS :</span> Toutes les
                communications avec le Site sont sécurisées via SSL/TLS
              </li>
              <li>
                <span className="label">Protection CSRF :</span> Tokens de
                sécurité pour prévenir les attaques cross-site
              </li>
              <li>
                <span className="label">Rate Limiting :</span> Limitation du
                nombre de requêtes pour prévenir les abus
              </li>
              <li>
                <span className="label">Validation des données :</span> Contrôle
                strict des données soumises via les formulaires
              </li>
              <li>
                <span className="label">Accès restreint :</span> Seules les
                personnes autorisées ont accès aux données personnelles
              </li>
              <li>
                <span className="label">Sauvegardes régulières :</span> Pour
                prévenir la perte de données
              </li>
            </ul>
            <p className="privacy-text">
              Malgré ces mesures, aucune méthode de transmission sur Internet ou
              de stockage électronique n&apos;est totalement sécurisée. Nous ne
              pouvons garantir une sécurité absolue.
            </p>
          </div>
        </section>

        {/* Modifications */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[12] = el;
            }
          }}
        >
          <h2 className="section-title">
            11. Modifications de la politique de confidentialité
          </h2>
          <div className="section-content">
            <p className="privacy-text">
              Nous nous réservons le droit de modifier cette politique de
              confidentialité à tout moment. Toute modification sera publiée sur
              cette page avec une date de mise à jour actualisée.
            </p>
            <p className="privacy-text">
              Nous vous encourageons à consulter régulièrement cette page pour
              prendre connaissance des éventuelles modifications.
            </p>
            <p className="privacy-text">
              En cas de modification substantielle, nous vous en informerons par
              un avis visible sur le Site ou par email si vous nous avez fourni
              votre adresse.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section
          className="privacy-section"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[13] = el;
            }
          }}
        >
          <h2 className="section-title">12. Nous contacter</h2>
          <div className="section-content">
            <p className="privacy-text">
              Pour toute question concernant cette politique de confidentialité
              ou le traitement de vos données personnelles, vous pouvez nous
              contacter :
            </p>
            <ul className="privacy-list">
              <li>
                <span className="label">Par email :</span>{" "}
                <a
                  href="mailto:contact@david-konate.fr"
                  className="privacy-link"
                >
                  contact@david-konate.fr
                </a>
              </li>
              <li>
                <span className="label">Par téléphone :</span>{" "}
                <a href="tel:+33763418790" className="privacy-link">
                  07 63 41 87 90
                </a>
              </li>
              <li>
                <span className="label">Par courrier :</span> David Konaté, 4
                avenue Richelieu, 44100 Nantes, France
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <section
          className="privacy-footer"
          ref={(el: HTMLDivElement | null) => {
            if (el) {
              sectionsRef.current[14] = el;
            }
          }}
        >
          <p className="privacy-text footer-text">
            Cette politique de confidentialité a été mise à jour le{" "}
            {new Date().toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            . Elle est conforme au RGPD et à la loi Informatique et Libertés.
          </p>
        </section>
      </div>
    </div>
  );
}
