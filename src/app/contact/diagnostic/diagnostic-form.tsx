"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronRight, ChevronLeft, Check, AlertCircle } from "lucide-react";
import Link from "next/link";

interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: (string | { value: string; category?: string })[];
  conditional?: string;
  helpText?: string;
}

interface FormSection {
  title: string;
  icon: string;
  fields: FormField[];
}

export default function DiagnosticForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [formData, setFormData] = useState<{
    [key: string]: string | string[] | boolean;
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

    // Section 6: Contenu
    types_contenu: [],
    creation_contenu: "",
    gestion_contenu: "",
    frequence_maj: "",

    // Section 7: Technique
    plateformes: [],
    priorite_plateformes: "",
    integrations: "",
    donnees_sensibles: "",

    // Section 8: Budget
    budget: "",
    modele_revenus: [],

    // Section 9: Planning
    date_lancement: "",
    flexibilite_date: "",
    dates_cles: "",
    disponibilite: "",

    // Section 10: Maintenance
    maintenance: "",
    formation: "",

    // Section 11: Concurrence
    concurrents: "",
    avantages: "",

    // Section 12: Complémentaires
    contraintes: "",
    questions_supplementaires: "",

    // Consentement RGPD
    consent: false,
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

  // Ajouter cet useEffect après les autres useEffect
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

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
          label: "Décrivez votre activité actuelle en quelques lignes",
          type: "textarea",
          required: true,
        },
        {
          name: "presence_digitale",
          label: "Disposez-vous déjà d'une présence digitale ?",
          type: "textarea",
          placeholder: "Site web, réseaux sociaux, autre application...",
        },
        {
          name: "motivation",
          label:
            "Qu'est-ce qui vous pousse à créer cette application maintenant ?",
          type: "textarea",
          required: true,
        },
        {
          name: "objectif_principal",
          label: "Quel est l'objectif n°1 de cette application ?",
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
          label:
            "Quels problèmes concrets cette application va-t-elle résoudre ?",
          type: "textarea",
          required: true,
          placeholder:
            "Ex: réduire le temps d'attente téléphonique, permettre la commande 24h/24...",
        },
        {
          name: "resultats_attendus",
          label: "Quels résultats mesurables attendez-vous ?",
          type: "textarea",
          placeholder:
            "Ex: X téléchargements, Y ventes/mois, réduction de Z% des appels...",
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
          placeholder: "Ex: Professionnels, Étudiants, Grand public...",
        },
        {
          name: "zone_geo",
          label: "Zone géographique",
          type: "text",
          required: true,
          placeholder: "Ex: France, International, Région spécifique...",
        },
        {
          name: "competence_tech",
          label: "Niveau de compétence technologique",
          type: "select",
          options: ["", "Débutant", "Intermédiaire", "Avancé"],
        },
        {
          name: "users_6mois",
          label: "Volume d'utilisateurs estimé à 6 mois",
          type: "text",
          placeholder: "Nombre d'utilisateurs estimés",
        },
        {
          name: "users_1an",
          label: "Volume d'utilisateurs estimé à 1 an",
          type: "text",
          placeholder: "Nombre d'utilisateurs estimés",
        },
        {
          name: "acces_actuel",
          label:
            "Comment vos utilisateurs accèdent-ils actuellement à vos services ?",
          type: "textarea",
          placeholder: "Ex: Téléphone, Email, Site web, En personne...",
        },
        {
          name: "frustrations",
          label: "Quelles sont leurs principales frustrations ?",
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
          helpText: "Cochez toutes les fonctionnalités souhaitées",
          options: [
            {
              value: "Inscription/Connexion email",
              category: "Gestion utilisateurs",
            },
            {
              value: "Connexion réseaux sociaux",
              category: "Gestion utilisateurs",
            },
            { value: "Profil utilisateur", category: "Gestion utilisateurs" },
            {
              value: "Récupération mot de passe",
              category: "Gestion utilisateurs",
            },
            { value: "Catalogue produits", category: "E-commerce / Vente" },
            { value: "Panier et commande", category: "E-commerce / Vente" },
            { value: "Paiement en ligne", category: "E-commerce / Vente" },
            { value: "Gestion stock", category: "E-commerce / Vente" },
            {
              value: "Système de réservation",
              category: "Réservation / Rendez-vous",
            },
            {
              value: "Notifications rappels",
              category: "Réservation / Rendez-vous",
            },
            { value: "Chat/Messagerie", category: "Communication" },
            { value: "Notifications push", category: "Communication" },
            { value: "Système avis", category: "Communication" },
            { value: "Géolocalisation", category: "Géolocalisation" },
            { value: "Carte interactive", category: "Géolocalisation" },
            { value: "Recherche proximité", category: "Géolocalisation" },
            { value: "Scanner QR code", category: "Autres fonctionnalités" },
            {
              value: "Partage réseaux sociaux",
              category: "Autres fonctionnalités",
            },
            {
              value: "Recherche avancée",
              category: "Autres fonctionnalités",
            },
            {
              value: "Programme fidélité",
              category: "Autres fonctionnalités",
            },
            { value: "Multilingue", category: "Autres fonctionnalités" },
          ],
        },
        {
          name: "autres_fonctionnalites",
          label: "Autres fonctionnalités spécifiques",
          type: "textarea",
          placeholder:
            "Décrivez d'autres fonctionnalités spécifiques à votre projet...",
        },
        {
          name: "parcours_utilisateur",
          label: "Décrivez le parcours type d'un utilisateur",
          type: "textarea",
          required: true,
          placeholder:
            "Ex: 1. L'utilisateur ouvre l'application et... 2. Il accède à... 3. Il effectue...",
        },
      ],
    },
    {
      title: "Design et expérience",
      icon: "🎨",
      fields: [
        {
          name: "charte_graphique",
          label: "Possédez-vous une charte graphique ?",
          type: "select",
          options: ["", "Oui (je la fournirai)", "Non (à créer)"],
        },
        {
          name: "couleurs",
          label: "Couleurs principales de votre marque",
          type: "text",
          placeholder: "Ex: Bleu (#0066CC), Rouge (#FF0000)",
        },
        {
          name: "logo",
          label: "Possédez-vous un logo ?",
          type: "select",
          options: ["", "Oui (à fournir)", "Non (à créer)"],
        },
        {
          name: "styles",
          label: "Quel style préférez-vous ?",
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
          placeholder:
            "Listez 2-3 applications dont le design vous plaît et expliquez pourquoi...",
          helpText:
            'Ex: "J\'aime Uber pour sa simplicité et Airbnb pour ses belles photos"',
        },
      ],
    },
    {
      title: "Contenu",
      icon: "📝",
      fields: [
        {
          name: "types_contenu",
          label: "Quels types de contenu seront présents ?",
          type: "checkbox",
          options: [
            { value: "Textes" },
            { value: "Images" },
            { value: "Vidéos" },
            { value: "Documents PDF" },
            { value: "Audio" },
          ],
        },
        {
          name: "creation_contenu",
          label: "Qui fournira le contenu initial ?",
          type: "select",
          options: [
            "",
            "Nous le fournirons",
            "À créer par vos soins (rédaction, photos, etc.)",
            "Mixte",
          ],
        },
        {
          name: "gestion_contenu",
          label:
            "Souhaitez-vous gérer le contenu vous-même après le lancement ?",
          type: "select",
          options: [
            "",
            "Oui, via un back-office simple",
            "Non, nous vous contactons pour les modifications",
            "Selon le type de contenu",
          ],
        },
        {
          name: "frequence_maj",
          label: "Fréquence de mise à jour prévue",
          type: "select",
          options: [
            "",
            "Quotidienne",
            "Hebdomadaire",
            "Mensuelle",
            "Occasionnelle",
          ],
        },
      ],
    },
    {
      title: "Aspects techniques",
      icon: "💻",
      fields: [
        {
          name: "plateformes",
          label:
            "Sur quelles plateformes souhaitez-vous lancer l'application ?",
          type: "checkbox",
          required: true,
          options: [
            { value: "iOS (iPhone/iPad)" },
            { value: "Android" },
            { value: "Web (navigateur)" },
          ],
        },
        {
          name: "priorite_plateformes",
          label: "Ordre de priorité si budget limité",
          type: "text",
          placeholder: "Ex: 1. Android, 2. iOS, 3. Web",
        },
        {
          name: "integrations",
          label:
            "L'application doit-elle s'intégrer avec des services existants ?",
          type: "textarea",
          placeholder:
            "Ex: Stripe pour le paiement, Mailchimp, CRM existant, ERP...",
        },
        {
          name: "donnees_sensibles",
          label: "Données sensibles à gérer ?",
          type: "textarea",
          placeholder:
            "Ex: Paiements, données personnelles, données médicales...",
        },
      ],
    },
    {
      title: "Budget et monétisation",
      icon: "💰",
      fields: [
        {
          name: "budget",
          label: "Budget global envisagé pour le développement",
          type: "select",
          required: true,
          options: [
            "",
            "Moins de 5 000 €",
            "5 000 - 15 000 €",
            "15 000 - 30 000 €",
            "30 000 - 50 000 €",
            "Plus de 50 000 €",
            "Budget flexible selon fonctionnalités",
          ],
        },
        {
          name: "modele_revenus",
          label: "Comment l'application va-t-elle générer des revenus ?",
          type: "checkbox",
          options: [
            { value: "Vente produits/services" },
            { value: "Abonnements" },
            { value: "Publicité" },
            { value: "Freemium (version gratuite + payante)" },
            { value: "Commissions" },
            { value: "Pas de monétisation directe" },
          ],
        },
      ],
    },
    {
      title: "Planning",
      icon: "📅",
      fields: [
        {
          name: "date_lancement",
          label: "Date de lancement souhaitée",
          type: "date",
        },
        {
          name: "flexibilite_date",
          label: "Cette date est-elle :",
          type: "select",
          options: [
            "",
            "Impérative (non négociable)",
            "Souhaitée (mais flexible)",
            "Flexible",
          ],
        },
        {
          name: "dates_cles",
          label: "Y a-t-il des dates clés à respecter ?",
          type: "textarea",
          placeholder:
            "Ex: Salon professionnel le 15/06, lancement commercial...",
        },
        {
          name: "disponibilite",
          label: "Quelle est votre disponibilité pour suivre le projet ?",
          type: "select",
          options: [
            "",
            "Très disponible (réponses sous 24h)",
            "Disponible (réponses sous 48-72h)",
            "Disponibilité limitée",
          ],
        },
      ],
    },
    {
      title: "Maintenance et formation",
      icon: "🔧",
      fields: [
        {
          name: "maintenance",
          label:
            "Souhaitez-vous un contrat de maintenance après le lancement ?",
          type: "select",
          options: [
            "",
            "Oui, maintenance corrective (bugs uniquement)",
            "Oui, maintenance évolutive (nouvelles fonctionnalités)",
            "Les deux",
            "Non, au cas par cas",
          ],
        },
        {
          name: "formation",
          label: "Aurez-vous besoin d'une formation ?",
          type: "select",
          options: [
            "",
            "Oui, pour utiliser le back-office",
            "Oui, documentation complète",
            "Les deux",
            "Non",
          ],
        },
      ],
    },
    {
      title: "Concurrence et positionnement",
      icon: "🎯",
      fields: [
        {
          name: "concurrents",
          label: "Connaissez-vous des applications similaires ?",
          type: "textarea",
          placeholder:
            "Listez les applications concurrentes et précisez ce qui différenciera la vôtre...",
        },
        {
          name: "avantages",
          label: "Quels sont vos avantages concurrentiels ?",
          type: "textarea",
        },
      ],
    },
    {
      title: "Informations complémentaires",
      icon: "➕",
      fields: [
        {
          name: "contraintes",
          label: "Y a-t-il des contraintes particulières ?",
          type: "textarea",
          placeholder:
            "Ex: Accessibilité handicap, mode offline, contraintes légales spécifiques...",
        },
        {
          name: "questions_supplementaires",
          label:
            "Avez-vous des questions ou des éléments supplémentaires à partager ?",
          type: "textarea",
        },
      ],
    },
  ];

  const handleChange = (name: string, value: string | boolean) => {
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

  // Fonction pour vérifier si une étape est valide SANS modifier le state
  const checkStepValidity = (stepIndex: number): boolean => {
    const currentFields = sections[stepIndex].fields;

    for (const field of currentFields) {
      if (field.required) {
        const value = formData[field.name];

        if (field.type === "checkbox") {
          if (!value || (Array.isArray(value) && value.length === 0)) {
            return false;
          }
        } else if (
          !value ||
          (typeof value === "string" && value.trim() === "")
        ) {
          return false;
        }
      }
    }

    // Validation spéciale pour la dernière étape (consentement RGPD)
    if (stepIndex === sections.length - 1) {
      if (!formData.consent) {
        return false;
      }
    }

    return true;
  };

  // Utiliser useMemo pour calculer si l'étape actuelle est valide
  const isCurrentStepValid = useMemo(() => {
    return checkStepValidity(currentStep);
  }, [currentStep, formData, sections]);

  const validateStep = (stepIndex: number = currentStep) => {
    const currentFields = sections[stepIndex].fields;
    const newErrors: { [key: string]: string } = {};

    currentFields.forEach((field) => {
      if (field.required) {
        const value = formData[field.name];

        if (field.type === "checkbox") {
          if (!value || (Array.isArray(value) && value.length === 0)) {
            newErrors[field.name] = "Veuillez sélectionner au moins une option";
          }
        } else if (
          !value ||
          (typeof value === "string" && value.trim() === "")
        ) {
          newErrors[field.name] = "Ce champ est obligatoire";
        }
      }
    });

    // Validation spéciale pour la dernière étape (consentement RGPD)
    if (stepIndex === sections.length - 1) {
      if (!formData.consent) {
        newErrors.consent = "Vous devez accepter le traitement de vos données";
      }
    }

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

  // Fonction pour gérer le clic sur les boutons de raccourci
  const handleStepClick = (index: number) => {
    // Autoriser seulement si :
    // 1. C'est l'étape actuelle
    // 2. C'est une étape précédente
    // 3. C'est l'étape suivante ET l'étape actuelle est valide
    if (index === currentStep) {
      return; // Déjà sur cette étape
    } else if (index < currentStep) {
      // Retour en arrière toujours autorisé
      setCurrentStep(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (index === currentStep + 1 && checkStepValidity(currentStep)) {
      // Avancer d'une étape si l'étape actuelle est valide
      setCurrentStep(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Sinon, ne rien faire (empêche le saut vers des étapes futures non validées)
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

        // Reset form après 5 secondes
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
            types_contenu: [],
            creation_contenu: "",
            gestion_contenu: "",
            frequence_maj: "",
            plateformes: [],
            priorite_plateformes: "",
            integrations: "",
            donnees_sensibles: "",
            budget: "",
            modele_revenus: [],
            date_lancement: "",
            flexibilite_date: "",
            dates_cles: "",
            disponibilite: "",
            maintenance: "",
            formation: "",
            concurrents: "",
            avantages: "",
            contraintes: "",
            questions_supplementaires: "",
            consent: false,
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

    // Vérifier la condition
    if (field.conditional) {
      const [conditionField, conditionValue] = field.conditional.split(" === ");
      const fieldValue = formData[conditionField.trim()];
      if (fieldValue !== conditionValue.replace(/'/g, "").trim()) {
        return null;
      }
    }

    switch (field.type) {
      case "textarea":
        return (
          <div key={field.name} className="diagnostic-field">
            <label className="diagnostic-label">
              {field.label}{" "}
              {field.required && <span className="required-star">*</span>}
            </label>
            <textarea
              value={(value as string) || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={`diagnostic-textarea ${error ? "error" : ""}`}
            />
            {field.helpText && <p className="help-text">{field.helpText}</p>}
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
              value={(value as string) || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`diagnostic-select ${error ? "error" : ""}`}
            >
              {field.options?.map((option) => {
                if (typeof option === "string") {
                  return (
                    <option key={option} value={option}>
                      {option === "" ? "-- Sélectionnez --" : option}
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
            {field.helpText && <p className="help-text">{field.helpText}</p>}
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
            {field.helpText && <p className="help-text">{field.helpText}</p>}
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
            {field.helpText && (
              <p className="help-text help-text-top">{field.helpText}</p>
            )}
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
                                checked={((value as string[]) || []).includes(
                                  option.value,
                                )}
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
                          checked={((value as string[]) || []).includes(
                            option.value,
                          )}
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
              value={(value as string) || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={`diagnostic-input ${error ? "error" : ""}`}
            />
            {field.helpText && <p className="help-text">{field.helpText}</p>}
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
          {sections.map((section, index) => {
            // Déterminer si le bouton est cliquable
            const isClickable =
              index <= currentStep || // Étapes actuelles ou précédentes
              (index === currentStep + 1 && isCurrentStepValid); // Étape suivante si l'actuelle est valide

            return (
              <button
                key={index}
                onClick={() => isClickable && handleStepClick(index)}
                className={`step-button ${
                  index === currentStep
                    ? "active"
                    : index < currentStep
                      ? "completed"
                      : "inactive"
                } ${!isClickable ? "disabled" : ""}`}
                disabled={!isClickable}
              >
                {index < currentStep ? (
                  <Check className="step-icon-check" />
                ) : (
                  <span className="step-emoji">{section.icon}</span>
                )}
                <span className="step-title">{section.title}</span>
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="form-card">
          <h2 className="form-section-title">
            <span className="section-emoji">{sections[currentStep].icon}</span>
            {sections[currentStep].title}
          </h2>

          <div className="form-fields">
            {sections[currentStep].fields.map((field) => renderField(field))}

            {/* Consentement RGPD - Affiché uniquement à la dernière étape */}
            {currentStep === sections.length - 1 && (
              <div className="diagnostic-field consent-field">
                <label
                  className={`checkbox-label consent-label ${errors.consent ? "error" : ""}`}
                >
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent as boolean}
                    onChange={(e) => handleChange("consent", e.target.checked)}
                    className="checkbox-input"
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
                {errors.consent && (
                  <p className="error-message consent-error">
                    {errors.consent}
                  </p>
                )}
              </div>
            )}
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
            <button
              onClick={nextStep}
              className="btn-next"
              disabled={!isCurrentStepValid}
            >
              Suivant
              <ChevronRight className="btn-icon" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || !isCurrentStepValid}
              className="btn-submit"
            >
              {loading ? "Envoi en cours..." : "Envoyer le diagnostic"}
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
