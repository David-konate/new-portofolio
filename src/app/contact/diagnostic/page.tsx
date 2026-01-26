"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Check, AlertCircle } from "lucide-react";

interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: (string | { value: string; category?: string })[];
  conditional?: string;
}

interface FormSection {
  title: string;
  icon: string;
  fields: FormField[];
}

export default function DiagnosticPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [formData, setFormData] = useState<{
    [key: string]: string | string[];
  }>({
    // Section 1: Informations générales
    nom_projet: "",
    nom_entreprise: "",
    secteur: "",
    site_web: "",
    email: "",
    telephone: "",

    // Section 2: Contexte
    description_activite: "",
    presence_digitale: "",
    motivation: "",
    objectif_principal: "",
    objectif_autre: "",
    problemes_resolus: "",
    resultats_attendus: "",

    // Section 3: Utilisateurs
    age_utilisateurs: "",
    profession_utilisateurs: "",
    zone_geo: "",
    competence_tech: "",
    users_6mois: "",
    users_1an: "",
    acces_actuel: "",
    frustrations: "",

    // Section 4: Fonctionnalités
    fonctionnalites: [],
    autres_fonctionnalites: "",
    parcours_utilisateur: "",

    // Section 5: Design
    charte_graphique: "",
    couleurs: "",
    logo: "",
    styles: [],
    apps_reference: "",

    // Section 6: Budget
    budget: "",
    modele_revenus: [],

    date_lancement: "",
    flexibilite_date: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Récupérer le token CSRF au chargement du composant
  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const response = await fetch("/api/csrf-token");
        const data = await response.json();
        setCsrfToken(data.token);
      } catch (error) {
        console.error("Erreur lors de la récupération du token CSRF:", error);
      }
    }
    fetchCsrfToken();
  }, []);

  const sections: FormSection[] = [
    {
      title: "Informations générales",
      icon: "📋",
      fields: [
        {
          name: "nom_projet",
          label: "Nom du projet",
          type: "text",
          required: true,
        },
        {
          name: "nom_entreprise",
          label: "Votre nom / Entreprise",
          type: "text",
          required: true,
        },
        {
          name: "secteur",
          label: "Secteur d'activité",
          type: "text",
          required: true,
        },
        {
          name: "site_web",
          label: "Site web existant",
          type: "url",
          placeholder: "https://",
        },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "telephone", label: "Téléphone", type: "tel", required: true },
      ],
    },
    {
      title: "Contexte et objectifs",
      icon: "🎯",
      fields: [
        {
          name: "description_activite",
          label: "Décrivez votre activité actuelle",
          type: "textarea",
          required: true,
        },
        {
          name: "presence_digitale",
          label: "Présence digitale actuelle",
          type: "textarea",
        },
        {
          name: "motivation",
          label: "Pourquoi créer cette application maintenant ?",
          type: "textarea",
          required: true,
        },
        {
          name: "objectif_principal",
          label: "Objectif principal",
          type: "radio",
          required: true,
          options: [
            "Augmenter les ventes",
            "Améliorer le service client",
            "Automatiser des processus",
            "Fidéliser les clients",
            "Autre",
          ],
        },
        {
          name: "objectif_autre",
          label: "Si autre, précisez",
          type: "text",
          conditional: "objectif_principal === 'Autre'",
        },
        {
          name: "problemes_resolus",
          label: "Problèmes concrets à résoudre",
          type: "textarea",
          required: true,
        },
        {
          name: "resultats_attendus",
          label: "Résultats mesurables attendus",
          type: "textarea",
        },
      ],
    },
    {
      title: "Utilisateurs cibles",
      icon: "👥",
      fields: [
        {
          name: "age_utilisateurs",
          label: "Tranche d'âge principale",
          type: "text",
          required: true,
          placeholder: "Ex: 25-45 ans",
        },
        {
          name: "profession_utilisateurs",
          label: "Profession / Catégorie",
          type: "text",
          required: true,
        },
        {
          name: "zone_geo",
          label: "Zone géographique",
          type: "text",
          required: true,
        },
        {
          name: "competence_tech",
          label: "Niveau de compétence technologique",
          type: "select",
          options: ["", "Débutant", "Intermédiaire", "Avancé"],
        },
        {
          name: "users_6mois",
          label: "Utilisateurs estimés à 6 mois",
          type: "text",
        },
        {
          name: "users_1an",
          label: "Utilisateurs estimés à 1 an",
          type: "text",
        },
        {
          name: "acces_actuel",
          label: "Comment accèdent-ils à vos services actuellement ?",
          type: "textarea",
        },
        {
          name: "frustrations",
          label: "Principales frustrations des utilisateurs",
          type: "textarea",
        },
      ],
    },
    {
      title: "Fonctionnalités",
      icon: "⚙️",
      fields: [
        {
          name: "fonctionnalites",
          label: "Fonctionnalités souhaitées",
          type: "checkbox",
          options: [
            { value: "Inscription/Connexion email", category: "Utilisateurs" },
            { value: "Connexion réseaux sociaux", category: "Utilisateurs" },
            { value: "Profil utilisateur", category: "Utilisateurs" },
            { value: "Catalogue produits", category: "E-commerce" },
            { value: "Panier et commande", category: "E-commerce" },
            { value: "Paiement en ligne", category: "E-commerce" },
            { value: "Système de réservation", category: "Réservation" },
            { value: "Notifications rappels", category: "Réservation" },
            { value: "Chat/Messagerie", category: "Communication" },
            { value: "Notifications push", category: "Communication" },
            { value: "Système avis", category: "Communication" },
            { value: "Géolocalisation", category: "Géolocalisation" },
            { value: "Carte interactive", category: "Géolocalisation" },
            { value: "Scanner QR code", category: "Autres" },
            { value: "Partage réseaux sociaux", category: "Autres" },
            { value: "Programme fidélité", category: "Autres" },
            { value: "Multilingue", category: "Autres" },
          ],
        },
        {
          name: "autres_fonctionnalites",
          label: "Autres fonctionnalités spécifiques",
          type: "textarea",
        },
        {
          name: "parcours_utilisateur",
          label: "Parcours type d'un utilisateur",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      title: "Design",
      icon: "🎨",
      fields: [
        {
          name: "charte_graphique",
          label: "Charte graphique",
          type: "select",
          options: ["", "Oui (je la fournirai)", "Non (à créer)"],
        },
        {
          name: "couleurs",
          label: "Couleurs principales",
          type: "text",
          placeholder: "Ex: Bleu (#0066CC)",
        },
        {
          name: "logo",
          label: "Logo",
          type: "select",
          options: ["", "Oui (à fournir)", "Non (à créer)"],
        },
        {
          name: "styles",
          label: "Style préféré",
          type: "checkbox",
          options: [
            { value: "Moderne et épuré" },
            { value: "Coloré et dynamique" },
            { value: "Professionnel et sobre" },
            { value: "Ludique et créatif" },
            { value: "Luxe et premium" },
          ],
        },
        {
          name: "apps_reference",
          label: "Applications de référence",
          type: "textarea",
        },
      ],
    },
    {
      title: "Budget et Planning",
      icon: "💰",
      fields: [
        {
          name: "budget",
          label: "Budget global envisagé",
          type: "select",
          required: true,
          options: [
            "",
            "Moins de 5 000 €",
            "5 000 - 15 000 €",
            "15 000 - 30 000 €",
            "30 000 - 50 000 €",
            "Plus de 50 000 €",
            "Budget flexible",
          ],
        },
        {
          name: "modele_revenus",
          label: "Modèle de revenus",
          type: "checkbox",
          options: [
            { value: "Vente produits/services" },
            { value: "Abonnements" },
            { value: "Publicité" },
            { value: "Freemium" },
            { value: "Commissions" },
            { value: "Pas de monétisation" },
          ],
        },
        {
          name: "date_lancement",
          label: "Date de lancement souhaitée",
          type: "date",
        },
        {
          name: "flexibilite_date",
          label: "Flexibilité de la date",
          type: "select",
          options: ["", "Impérative", "Souhaitée", "Flexible"],
        },
      ],
    },
  ];

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData((prev) => {
      const current = (prev[name] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [name]: updated };
    });
  };

  const validateStep = () => {
    const currentFields = sections[currentStep].fields;
    const newErrors: { [key: string]: string } = {};

    currentFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = "Ce champ est obligatoire";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, sections.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/diagnostic", {
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
        setSubmitStatus({
          type: "success",
          message: data.message,
        });

        // Reset form après 3 secondes
        setTimeout(() => {
          setCurrentStep(0);
          setFormData({
            nom_projet: "",
            nom_entreprise: "",
            secteur: "",
            site_web: "",
            email: "",
            telephone: "",
            description_activite: "",
            presence_digitale: "",
            motivation: "",
            objectif_principal: "",
            objectif_autre: "",
            problemes_resolus: "",
            resultats_attendus: "",
            age_utilisateurs: "",
            profession_utilisateurs: "",
            zone_geo: "",
            competence_tech: "",
            users_6mois: "",
            users_1an: "",
            acces_actuel: "",
            frustrations: "",
            fonctionnalites: [],
            autres_fonctionnalites: "",
            parcours_utilisateur: "",
            charte_graphique: "",
            couleurs: "",
            logo: "",
            styles: [],
            apps_reference: "",
            budget: "",
            modele_revenus: [],
            date_lancement: "",
            flexibilite_date: "",
          });
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Une erreur est survenue",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Erreur de connexion. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name];
    const error = errors[field.name];

    switch (field.type) {
      case "textarea":
        return (
          <div key={field.name} className="diagnostic-field">
            <label className="diagnostic-label">
              {field.label}{" "}
              {field.required && <span className="required-star">*</span>}
            </label>
            <textarea
              value={value || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={`diagnostic-textarea ${error ? "error" : ""}`}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
        );

      case "select":
        return (
          <div key={field.name} className="diagnostic-field">
            <label className="diagnostic-label">
              {field.label}{" "}
              {field.required && <span className="required-star">*</span>}
            </label>
            <select
              value={value || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`diagnostic-select ${error ? "error" : ""}`}
            >
              {field.options?.map((option) => {
                if (typeof option === "string") {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                } else {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  );
                }
              })}
            </select>
            {error && <p className="error-message">{error}</p>}
          </div>
        );

      case "radio":
        return (
          <div key={field.name} className="diagnostic-field">
            <label className="diagnostic-label">
              {field.label}{" "}
              {field.required && <span className="required-star">*</span>}
            </label>
            <div className="radio-group">
              {field.options?.map((option) => {
                const optionValue =
                  typeof option === "string" ? option : option.value;
                return (
                  <label key={optionValue} className="radio-label">
                    <input
                      type="radio"
                      name={field.name}
                      value={optionValue}
                      checked={value === optionValue}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="radio-input"
                    />
                    <span className="radio-text">{optionValue}</span>
                  </label>
                );
              })}
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        );

      case "checkbox":
        const categories = [
          ...new Set(
            (field.options ?? [])
              .filter(
                (opt): opt is { value: string; category?: string } =>
                  typeof opt === "object" && "category" in opt,
              )
              .map((opt) => opt.category)
              .filter(Boolean),
          ),
        ];

        return (
          <div key={field.name} className="diagnostic-field">
            <label className="diagnostic-label">
              {field.label}{" "}
              {field.required && <span className="required-star">*</span>}
            </label>
            {categories.length > 0 ? (
              <div className="checkbox-categories">
                {categories.map((category) => (
                  <div key={category} className="checkbox-category">
                    <h4 className="category-title">{category}</h4>
                    <div className="checkbox-grid">
                      {field.options &&
                        field.options
                          .filter(
                            (
                              opt,
                            ): opt is { value: string; category?: string } =>
                              typeof opt === "object" &&
                              "category" in opt &&
                              opt.category === category,
                          )
                          .map((option) => (
                            <label
                              key={option.value}
                              className="checkbox-label"
                            >
                              <input
                                type="checkbox"
                                checked={(value || []).includes(option.value)}
                                onChange={() =>
                                  handleCheckboxChange(field.name, option.value)
                                }
                                className="checkbox-input"
                              />
                              <span className="checkbox-text">
                                {option.value}
                              </span>
                            </label>
                          ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="checkbox-list">
                {field.options &&
                  field.options
                    .filter(
                      (
                        option,
                      ): option is { value: string; category?: string } =>
                        typeof option === "object",
                    )
                    .map((option) => (
                      <label key={option.value} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={(value || []).includes(option.value)}
                          onChange={() =>
                            handleCheckboxChange(field.name, option.value)
                          }
                          className="checkbox-input"
                        />
                        <span className="checkbox-text">{option.value}</span>
                      </label>
                    ))}
              </div>
            )}
            {error && <p className="error-message">{error}</p>}
          </div>
        );

      default:
        return (
          <div key={field.name} className="diagnostic-field">
            <label className="diagnostic-label">
              {field.label}{" "}
              {field.required && <span className="required-star">*</span>}
            </label>
            <input
              type={field.type}
              value={value || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={`diagnostic-input ${error ? "error" : ""}`}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
        );
    }
  };

  const progress = ((currentStep + 1) / sections.length) * 100;

  return (
    <div className="diagnostic-container">
      <div className="diagnostic-wrapper">
        {/* Header */}
        <div className="diagnostic-header">
          <h1 className="diagnostic-title">
            <span className="bracket">&lt;</span>
            Diagnostic de Projet
            <span className="bracket">/&gt;</span>
          </h1>
          <p className="diagnostic-subtitle">
            Définissons ensemble vos besoins pour un devis personnalisé
          </p>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-info">
            <span className="progress-text">
              Étape {currentStep + 1} sur {sections.length}
            </span>
            <span className="progress-percent">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Steps Navigation */}
        <div className="steps-navigation">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`step-button ${
                index === currentStep
                  ? "active"
                  : index < currentStep
                    ? "completed"
                    : "inactive"
              }`}
            >
              {index < currentStep ? (
                <Check className="step-icon-check" />
              ) : (
                <span className="step-emoji">{section.icon}</span>
              )}
              <span className="step-title">{section.title}</span>
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="form-card">
          <h2 className="form-section-title">
            <span className="section-emoji">{sections[currentStep].icon}</span>
            {sections[currentStep].title}
          </h2>

          <div className="form-fields">
            {sections[currentStep].fields.map((field) => renderField(field))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          {currentStep > 0 && (
            <button onClick={prevStep} className="btn-prev">
              <ChevronLeft className="btn-icon" />
              Précédent
            </button>
          )}

          {currentStep < sections.length - 1 ? (
            <button onClick={nextStep} className="btn-next">
              Suivant
              <ChevronRight className="btn-icon" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-submit"
            >
              {loading ? "Envoi..." : "Envoyer le diagnostic"}
              <Check className="btn-icon" />
            </button>
          )}
        </div>

        {/* Info Footer */}
        <div className="info-footer">
          <AlertCircle className="info-icon" />
          <div className="info-content">
            <p className="info-title">Vos réponses seront envoyées par email</p>
            <p className="info-text">
              Nous reviendrons vers vous sous 3-5 jours ouvrés avec un devis
              détaillé et personnalisé.
            </p>
          </div>
        </div>

        {/* Status Message */}
        {submitStatus.type && (
          <div className={`submit-status ${submitStatus.type}`}>
            {submitStatus.type === "success" ? (
              <Check className="status-icon" />
            ) : (
              <AlertCircle className="status-icon" />
            )}
            <p className="status-message">{submitStatus.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
