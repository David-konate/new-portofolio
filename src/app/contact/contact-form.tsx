"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm() {
  const router = useRouter();
  const [csrfToken, setCsrfToken] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    projectType: "",
    message: "",
    consent: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const projectTypes = [
    "Sélectionner un type de projet",
    "Site web vitrine",
    "Application web",
    "Application mobile",
    "E-commerce",
    "Refonte/Optimisation",
    "Consultation/Audit",
    "Autre",
  ];

  // Récupérer le token CSRF au chargement
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await fetch("/api/csrf-token");
        const data = await response.json();
        setCsrfToken(data.token);
      } catch (err) {
        console.error("Erreur CSRF:", err);
      }
    };
    getCsrfToken();
  }, []);

  // Validation côté client
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Validation du nom
    if (!formData.name.trim()) {
      errors.name = "Le nom est obligatoire";
    } else if (formData.name.length < 2) {
      errors.name = "Le nom doit contenir au moins 2 caractères";
    } else if (formData.name.length > 100) {
      errors.name = "Le nom ne doit pas dépasser 100 caractères";
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "L'email est obligatoire";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Veuillez entrer un email valide";
    }

    // Validation de l'objet
    if (!formData.subject.trim()) {
      errors.subject = "L'objet est obligatoire";
    } else if (formData.subject.length < 3) {
      errors.subject = "L'objet doit contenir au moins 3 caractères";
    } else if (formData.subject.length > 200) {
      errors.subject = "L'objet ne doit pas dépasser 200 caractères";
    }

    // Validation du message
    if (!formData.message.trim()) {
      errors.message = "Le message est obligatoire";
    } else if (formData.message.length < 10) {
      errors.message = "Le message doit contenir au moins 10 caractères";
    } else if (formData.message.length > 5000) {
      errors.message = "Le message ne doit pas dépasser 5000 caractères";
    }

    // Validation du consentement
    if (!formData.consent) {
      errors.consent = "Vous devez accepter le traitement de vos données";
    }

    // Vérification du honeypot (piège à bots)
    if (honeypot !== "") {
      errors.honeypot = "Formulaire invalide";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Effacer l'erreur pour ce champ
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation côté client
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          projectType: "",
          message: "",
          consent: false,
        });

        // Masquer le message après 5 secondes
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.message || "Erreur lors de l'envoi du message");
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError("Erreur de connexion. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1 className="contact-title">
          <span className="bracket">{"<"}</span>Me Contacter
          <span className="bracket">{"/>"}</span>
        </h1>
        <p className="contact-subtitle">
          Vous avez un projet ? Parlons-en ensemble !
        </p>
      </div>

      <div className="contact-wrapper">
        {/* Section Formulaire */}
        <div className="contact-section form-section">
          <div className="section-header">
            <h2>📧 Envoyez-moi un message</h2>
            <p className="section-desc">
              Délai de réponse : <strong>48h maximum</strong>
            </p>
          </div>

          {success && (
            <div className="success-message">
              ✅ Message envoyé avec succès ! Je vous répondrai rapidement.
            </div>
          )}

          {error && <div className="error-message">❌ {error}</div>}

          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            {/* Honeypot (piège à bots) */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Nom */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nom complet <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                className={`form-input ${formErrors.name ? "error" : ""}`}
                maxLength={100}
                required
              />
              {formErrors.name && (
                <span className="error-text">{formErrors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Adresse email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre.email@exemple.com"
                className={`form-input ${formErrors.email ? "error" : ""}`}
                required
              />
              {formErrors.email && (
                <span className="error-text">{formErrors.email}</span>
              )}
            </div>

            {/* Objet */}
            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Objet <span className="required">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Sujet de votre message"
                className={`form-input ${formErrors.subject ? "error" : ""}`}
                maxLength={200}
                required
              />
              <span className="char-count">{formData.subject.length}/200</span>
              {formErrors.subject && (
                <span className="error-text">{formErrors.subject}</span>
              )}
            </div>

            {/* Type de projet */}
            <div className="form-group">
              <label htmlFor="projectType" className="form-label">
                Type de projet
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="form-input"
              >
                {projectTypes.map((type) => (
                  <option
                    key={type}
                    value={
                      type === "Sélectionner un type de projet" ? "" : type
                    }
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message <span className="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Décrivez votre projet ou votre question..."
                className={`form-textarea ${formErrors.message ? "error" : ""}`}
                rows={6}
                maxLength={5000}
                required
              />
              <span className="char-count">{formData.message.length}/5000</span>
              {formErrors.message && (
                <span className="error-text">{formErrors.message}</span>
              )}
            </div>

            {/* Consentement RGPD */}
            <div className="form-group checkbox-group">
              <label
                className={`checkbox-label ${formErrors.consent ? "error" : ""}`}
              >
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="form-checkbox"
                  required
                />
                <span className="consent-text">
                  J&apos;accepte que mes données personnelles soient traitées
                  conformément à la{" "}
                  <Link
                    href="/privacy"
                    className="privacy-link"
                    target="_blank"
                  >
                    politique de confidentialité
                  </Link>{" "}
                  <span className="required-star">*</span>
                </span>
              </label>
              {formErrors.consent && (
                <span className="error-text">{formErrors.consent}</span>
              )}
            </div>

            {/* Boutons */}
            <div className="form-actions">
              <button
                type="submit"
                disabled={loading || Object.keys(formErrors).length > 0}
                className="btn-submit"
              >
                {loading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </div>
          </form>

          {/* Bouton Formulaire de diagnostic */}
          <div className="diagnostic-section">
            <p className="diagnostic-text">
              Besoin d&apos;aide pour définir votre projet ?
            </p>
            <button
              onClick={() => router.push("/contact/diagnostic")}
              className="btn-diagnostic"
            >
              📋 Accéder au formulaire de diagnostic
            </button>
          </div>
        </div>

        {/* Section Coordonnées */}
        <div className="contact-section info-section">
          <div className="section-header">
            <h2>☎️ Coordonnées directes</h2>
            <p className="section-desc">Contactez-moi aussi par téléphone</p>
          </div>

          {/* Carte de contact */}
          <div className="contact-card">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-info">
                <h3>Email</h3>
                <a href="mailto:da.konate@gmail.com" className="contact-link">
                  da.konate@gmail.com
                </a>
              </div>
            </div>

            <div className="divider"></div>

            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div className="contact-info">
                <h3>Téléphone</h3>
                <a href="tel:+33763418790" className="contact-link">
                  07.63.41.87.90
                </a>
              </div>
            </div>

            <div className="divider"></div>

            <div className="contact-item">
              <div className="contact-icon">⏰</div>
              <div className="contact-info">
                <h3>Délai de réponse</h3>
                <p className="contact-text">Jusqu&apos;à 48 heures</p>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="social-section">
            <h3>Retrouvez-moi aussi en ligne</h3>
            <div className="social-links">
              <a
                href="https://linkedin.com/in/david-konate/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
                title="LinkedIn"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/David-konate/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
                title="GitHub"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Avantages */}
          <div className="benefits-section">
            <h3>Pourquoi me contacter ?</h3>
            <ul className="benefits-list">
              <li>✨ Réponse rapide et professionnelle</li>
              <li>🎯 Écoute active de vos besoins</li>
              <li>💡 Solutions innovantes et adaptées</li>
              <li>🤝 Collaboration transparente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
