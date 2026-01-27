// app/api/diagnostic/route.ts - VERSION COMPLÈTE
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Schéma Zod pour validation du diagnostic COMPLET
const DiagnosticFormSchema = z.object({
  // Section 1: Informations générales
  nom_projet: z.string().trim().min(2, "Le nom du projet est requis"),
  nom_entreprise: z.string().trim().min(2, "Le nom de l'entreprise est requis"),
  secteur: z.string().trim().min(2, "Le secteur d'activité est requis"),
  site_web: z.string().optional(),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Numéro de téléphone invalide"),

  // Section 2: Contexte
  description_activite: z.string().min(10, "Description trop courte"),
  presence_digitale: z.string().optional(),
  motivation: z.string().min(10, "Motivation requise"),
  objectif_principal: z.string().min(1, "Objectif principal requis"),
  objectif_autre: z.string().optional(),
  problemes_resolus: z.string().min(10, "Problèmes à résoudre requis"),
  resultats_attendus: z.string().optional(),

  // Section 3: Utilisateurs
  age_utilisateurs: z.string().min(1, "Tranche d'âge requise"),
  profession_utilisateurs: z.string().min(1, "Profession requise"),
  zone_geo: z.string().min(1, "Zone géographique requise"),
  competence_tech: z.string().optional(),
  users_6mois: z.string().optional(),
  users_1an: z.string().optional(),
  acces_actuel: z.string().optional(),
  frustrations: z.string().optional(),

  // Section 4: Fonctionnalités
  fonctionnalites: z.array(z.string()),
  autres_fonctionnalites: z.string().optional(),
  parcours_utilisateur: z.string().min(10, "Parcours utilisateur requis"),

  // Section 5: Design
  charte_graphique: z.string().optional(),
  couleurs: z.string().optional(),
  logo: z.string().optional(),
  styles: z.array(z.string()),
  apps_reference: z.string().optional(),

  // Section 6: Contenu
  types_contenu: z.array(z.string()),
  creation_contenu: z.string().optional(),
  gestion_contenu: z.string().optional(),
  frequence_maj: z.string().optional(),

  // Section 7: Technique
  plateformes: z.array(z.string()).min(1, "Au moins une plateforme requise"),
  priorite_plateformes: z.string().optional(),
  integrations: z.string().optional(),
  donnees_sensibles: z.string().optional(),

  // Section 8: Budget
  budget: z.string().min(1, "Budget requis"),
  modele_revenus: z.array(z.string()),

  // Section 9: Planning
  date_lancement: z.string().optional(),
  flexibilite_date: z.string().optional(),
  dates_cles: z.string().optional(),
  disponibilite: z.string().optional(),

  // Section 10: Maintenance
  maintenance: z.string().optional(),
  formation: z.string().optional(),

  // Section 11: Concurrence
  concurrents: z.string().optional(),
  avantages: z.string().optional(),

  // Section 12: Complémentaires
  contraintes: z.string().optional(),
  questions_supplementaires: z.string().optional(),

  timestamp: z.string().datetime(),
});

type DiagnosticFormData = z.infer<typeof DiagnosticFormSchema>;

// Configuration du Rate Limiting avec Upstash
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(
    process.env.NODE_ENV === "production" ? 2 : 100,
    "1 h",
  ),
});

// Validation du token CSRF
const validateCsrfToken = (token: string, storedToken: string): boolean => {
  return token === storedToken;
};

// Fonction pour envoyer l'email avec Resend
async function sendEmail(data: DiagnosticFormData): Promise<boolean> {
  try {
    const response = await fetch(
      process.env.EMAIL_API_URL || "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "onboarding@resend.dev",
          to: process.env.CONTACT_EMAIL || "da.konate@gmail.com",
          subject: `🎯 Nouveau diagnostic de projet: ${data.nom_projet}`,
          html: generateEmailHTML(data),
          reply_to: data.email,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Erreur Resend:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return false;
  }
}

// Générer le contenu HTML de l'email COMPLET
function generateEmailHTML(data: DiagnosticFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body { 
            font-family: 'Fira Mono', 'Courier New', monospace;
            color: #e2e8f0;
            line-height: 1.6;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            padding: 20px;
          }
          
          .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(67, 217, 173, 0.2);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          }
          
          .header { 
            background: linear-gradient(135deg, #4d5bce 0%, #43d9ad 100%);
            padding: 40px 30px;
            text-align: center;
          }
          
          .header h1 {
            margin: 0;
            font-size: 32px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            color: white;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          
          .header .emoji {
            font-size: 56px;
            display: block;
            margin-bottom: 15px;
          }
          
          .project-title {
            font-size: 24px;
            color: rgba(255, 255, 255, 0.9);
            margin-top: 10px;
            font-weight: 600;
          }
          
          .content { 
            padding: 40px 30px;
            background: rgba(26, 26, 46, 0.6);
          }
          
          .section {
            margin-bottom: 30px;
          }
          
          .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #43d9ad;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(67, 217, 173, 0.3);
          }
          
          .field { 
            margin: 16px 0;
            padding: 16px;
            background: rgba(255, 255, 255, 0.05);
            border-left: 4px solid #43d9ad;
            border-radius: 8px;
          }
          
          .label { 
            font-weight: 600;
            color: #43d9ad;
            display: block;
            margin-bottom: 6px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .value {
            color: #e2e8f0;
            word-break: break-word;
            font-size: 15px;
          }
          
          .value a {
            color: #43d9ad;
            text-decoration: none;
          }
          
          .list-value {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
          }
          
          .tag {
            background: rgba(67, 217, 173, 0.2);
            color: #43d9ad;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 13px;
            border: 1px solid rgba(67, 217, 173, 0.3);
          }
          
          .footer { 
            margin-top: 30px; 
            padding: 30px;
            border-top: 1px solid rgba(67, 217, 173, 0.2);
            background: rgba(0, 0, 0, 0.2);
          }
          
          .cta-button {
            display: inline-block;
            padding: 14px 28px;
            background: linear-gradient(135deg, #4d5bce 0%, #43d9ad 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin: 20px auto;
            display: block;
            width: fit-content;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(67, 217, 173, 0.3);
          }
          
          .divider {
            border: none;
            border-top: 1px solid rgba(67, 217, 173, 0.2);
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="emoji">🎯</span>
            <h1>Diagnostic de Projet Complet</h1>
            <div class="project-title">${escapeHtml(data.nom_projet)}</div>
          </div>
          
          <div class="content">
            <!-- SECTION 1: Informations générales -->
            <div class="section">
              <h2 class="section-title">📋 Informations générales</h2>
              <div class="field">
                <span class="label">Nom du projet</span>
                <span class="value">${escapeHtml(data.nom_projet)}</span>
              </div>
              <div class="field">
                <span class="label">Entreprise</span>
                <span class="value">${escapeHtml(data.nom_entreprise)}</span>
              </div>
              <div class="field">
                <span class="label">Secteur</span>
                <span class="value">${escapeHtml(data.secteur)}</span>
              </div>
              ${
                data.site_web
                  ? `
              <div class="field">
                <span class="label">Site web</span>
                <span class="value"><a href="${escapeHtml(data.site_web)}">${escapeHtml(data.site_web)}</a></span>
              </div>
              `
                  : ""
              }
              <div class="field">
                <span class="label">Email</span>
                <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
              </div>
              <div class="field">
                <span class="label">Téléphone</span>
                <span class="value">${escapeHtml(data.telephone)}</span>
              </div>
            </div>

            <!-- SECTION 2: Contexte et objectifs -->
            <div class="section">
              <h2 class="section-title">🎯 Contexte et objectifs</h2>
              <div class="field">
                <span class="label">Description de l'activité</span>
                <span class="value">${escapeHtml(data.description_activite)}</span>
              </div>
              ${
                data.presence_digitale
                  ? `
              <div class="field">
                <span class="label">Présence digitale actuelle</span>
                <span class="value">${escapeHtml(data.presence_digitale)}</span>
              </div>
              `
                  : ""
              }
              <div class="field">
                <span class="label">Motivation</span>
                <span class="value">${escapeHtml(data.motivation)}</span>
              </div>
              <div class="field">
                <span class="label">Objectif principal</span>
                <span class="value">${escapeHtml(data.objectif_principal)}</span>
              </div>
              ${
                data.objectif_autre
                  ? `
              <div class="field">
                <span class="label">Autre objectif</span>
                <span class="value">${escapeHtml(data.objectif_autre)}</span>
              </div>
              `
                  : ""
              }
              <div class="field">
                <span class="label">Problèmes à résoudre</span>
                <span class="value">${escapeHtml(data.problemes_resolus)}</span>
              </div>
              ${
                data.resultats_attendus
                  ? `
              <div class="field">
                <span class="label">Résultats attendus</span>
                <span class="value">${escapeHtml(data.resultats_attendus)}</span>
              </div>
              `
                  : ""
              }
            </div>

            <!-- SECTION 3: Utilisateurs cibles -->
            <div class="section">
              <h2 class="section-title">👥 Utilisateurs cibles</h2>
              <div class="field">
                <span class="label">Tranche d'âge</span>
                <span class="value">${escapeHtml(data.age_utilisateurs)}</span>
              </div>
              <div class="field">
                <span class="label">Profession</span>
                <span class="value">${escapeHtml(data.profession_utilisateurs)}</span>
              </div>
              <div class="field">
                <span class="label">Zone géographique</span>
                <span class="value">${escapeHtml(data.zone_geo)}</span>
              </div>
              ${
                data.competence_tech
                  ? `
              <div class="field">
                <span class="label">Compétence technologique</span>
                <span class="value">${escapeHtml(data.competence_tech)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.users_6mois
                  ? `
              <div class="field">
                <span class="label">Utilisateurs estimés à 6 mois</span>
                <span class="value">${escapeHtml(data.users_6mois)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.users_1an
                  ? `
              <div class="field">
                <span class="label">Utilisateurs estimés à 1 an</span>
                <span class="value">${escapeHtml(data.users_1an)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.acces_actuel
                  ? `
              <div class="field">
                <span class="label">Accès actuel aux services</span>
                <span class="value">${escapeHtml(data.acces_actuel)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.frustrations
                  ? `
              <div class="field">
                <span class="label">Frustrations des utilisateurs</span>
                <span class="value">${escapeHtml(data.frustrations)}</span>
              </div>
              `
                  : ""
              }
            </div>

            <!-- SECTION 4: Fonctionnalités -->
            <div class="section">
              <h2 class="section-title">⚙️ Fonctionnalités</h2>
              ${
                data.fonctionnalites.length > 0
                  ? `
              <div class="field">
                <span class="label">Fonctionnalités souhaitées</span>
                <div class="list-value">
                  ${data.fonctionnalites.map((f) => `<span class="tag">${escapeHtml(f)}</span>`).join("")}
                </div>
              </div>
              `
                  : ""
              }
              ${
                data.autres_fonctionnalites
                  ? `
              <div class="field">
                <span class="label">Autres fonctionnalités</span>
                <span class="value">${escapeHtml(data.autres_fonctionnalites)}</span>
              </div>
              `
                  : ""
              }
              <div class="field">
                <span class="label">Parcours utilisateur</span>
                <span class="value">${escapeHtml(data.parcours_utilisateur)}</span>
              </div>
            </div>

            <!-- SECTION 5: Design -->
            <div class="section">
              <h2 class="section-title">🎨 Design et expérience</h2>
              ${
                data.charte_graphique
                  ? `
              <div class="field">
                <span class="label">Charte graphique</span>
                <span class="value">${escapeHtml(data.charte_graphique)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.couleurs
                  ? `
              <div class="field">
                <span class="label">Couleurs principales</span>
                <span class="value">${escapeHtml(data.couleurs)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.logo
                  ? `
              <div class="field">
                <span class="label">Logo</span>
                <span class="value">${escapeHtml(data.logo)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.styles.length > 0
                  ? `
              <div class="field">
                <span class="label">Styles préférés</span>
                <div class="list-value">
                  ${data.styles.map((s) => `<span class="tag">${escapeHtml(s)}</span>`).join("")}
                </div>
              </div>
              `
                  : ""
              }
              ${
                data.apps_reference
                  ? `
              <div class="field">
                <span class="label">Applications de référence</span>
                <span class="value">${escapeHtml(data.apps_reference)}</span>
              </div>
              `
                  : ""
              }
            </div>

            <!-- SECTION 6: Contenu -->
            <div class="section">
              <h2 class="section-title">📝 Contenu</h2>
              ${
                data.types_contenu.length > 0
                  ? `
              <div class="field">
                <span class="label">Types de contenu</span>
                <div class="list-value">
                  ${data.types_contenu.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
                </div>
              </div>
              `
                  : ""
              }
              ${
                data.creation_contenu
                  ? `
              <div class="field">
                <span class="label">Création du contenu</span>
                <span class="value">${escapeHtml(data.creation_contenu)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.gestion_contenu
                  ? `
              <div class="field">
                <span class="label">Gestion du contenu</span>
                <span class="value">${escapeHtml(data.gestion_contenu)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.frequence_maj
                  ? `
              <div class="field">
                <span class="label">Fréquence de mise à jour</span>
                <span class="value">${escapeHtml(data.frequence_maj)}</span>
              </div>
              `
                  : ""
              }
            </div>

            <!-- SECTION 7: Technique -->
            <div class="section">
              <h2 class="section-title">💻 Aspects techniques</h2>
              ${
                data.plateformes.length > 0
                  ? `
              <div class="field">
                <span class="label">Plateformes</span>
                <div class="list-value">
                  ${data.plateformes.map((p) => `<span class="tag">${escapeHtml(p)}</span>`).join("")}
                </div>
              </div>
              `
                  : ""
              }
              ${
                data.priorite_plateformes
                  ? `
              <div class="field">
                <span class="label">Priorité des plateformes</span>
                <span class="value">${escapeHtml(data.priorite_plateformes)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.integrations
                  ? `
              <div class="field">
                <span class="label">Intégrations</span>
                <span class="value">${escapeHtml(data.integrations)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.donnees_sensibles
                  ? `
              <div class="field">
                <span class="label">Données sensibles</span>
                <span class="value">${escapeHtml(data.donnees_sensibles)}</span>
              </div>
              `
                  : ""
              }
            </div>

            <!-- SECTION 8: Budget -->
            <div class="section">
              <h2 class="section-title">💰 Budget et monétisation</h2>
              <div class="field">
                <span class="label">Budget envisagé</span>
                <span class="value">${escapeHtml(data.budget)}</span>
              </div>
              ${
                data.modele_revenus.length > 0
                  ? `
              <div class="field">
                <span class="label">Modèle de revenus</span>
                <div class="list-value">
                  ${data.modele_revenus.map((m) => `<span class="tag">${escapeHtml(m)}</span>`).join("")}
                </div>
              </div>
              `
                  : ""
              }
            </div>

            <!-- SECTION 9: Planning -->
            <div class="section">
              <h2 class="section-title">📅 Planning</h2>
              ${
                data.date_lancement
                  ? `
              <div class="field">
                <span class="label">Date de lancement souhaitée</span>
                <span class="value">${escapeHtml(data.date_lancement)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.flexibilite_date
                  ? `
              <div class="field">
                <span class="label">Flexibilité de la date</span>
                <span class="value">${escapeHtml(data.flexibilite_date)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.dates_cles
                  ? `
              <div class="field">
                <span class="label">Dates clés</span>
                <span class="value">${escapeHtml(data.dates_cles)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.disponibilite
                  ? `
              <div class="field">
                <span class="label">Disponibilité du client</span>
                <span class="value">${escapeHtml(data.disponibilite)}</span>
              </div>
              `
                  : ""
              }
            </div>

            <!-- SECTION 10: Maintenance -->
            <div class="section">
              <h2 class="section-title">🔧 Maintenance et formation</h2>
              ${
                data.maintenance
                  ? `
              <div class="field">
                <span class="label">Maintenance</span>
                <span class="value">${escapeHtml(data.maintenance)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.formation
                  ? `
              <div class="field">
                <span class="label">Formation</span>
                <span class="value">${escapeHtml(data.formation)}</span>
              </div>
              `
                  : ""
              }
            </div>

            <!-- SECTION 11: Concurrence -->
            <div class="section">
              <h2 class="section-title">🎯 Concurrence et positionnement</h2>
              ${
                data.concurrents
                  ? `
              <div class="field">
                <span class="label">Concurrents</span>
                <span class="value">${escapeHtml(data.concurrents)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.avantages
                  ? `
              <div class="field">
                <span class="label">Avantages concurrentiels</span>
                <span class="value">${escapeHtml(data.avantages)}</span>
              </div>
              `
                  : ""
              }
            </div>

            <!-- SECTION 12: Complémentaires -->
            ${
              data.contraintes || data.questions_supplementaires
                ? `
            <div class="section">
              <h2 class="section-title">➕ Informations complémentaires</h2>
              ${
                data.contraintes
                  ? `
              <div class="field">
                <span class="label">Contraintes</span>
                <span class="value">${escapeHtml(data.contraintes)}</span>
              </div>
              `
                  : ""
              }
              ${
                data.questions_supplementaires
                  ? `
              <div class="field">
                <span class="label">Questions / Éléments supplémentaires</span>
                <span class="value">${escapeHtml(data.questions_supplementaires)}</span>
              </div>
              `
                  : ""
              }
            </div>
            `
                : ""
            }

            <div style="text-align: center; margin-top: 40px;">
              <a href="mailto:${data.email}" class="cta-button">
                ✉️ Répondre au client
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p style="text-align: center; font-size: 14px; color: #94a3b8;">
              <strong>📅 Reçu le:</strong> ${new Date(
                data.timestamp,
              ).toLocaleString("fr-FR", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
            <hr class="divider">
            <p style="text-align: center; font-size: 12px; color: #64748b;">
              Diagnostic complet envoyé via le formulaire de diagnostic<br>
              <strong style="color: #43d9ad;">da.konate@gmail.com</strong>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Échapper les caractères HTML dangereux
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting avec Upstash
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          message:
            "Trop de requêtes. Veuillez réessayer plus tard. Limite: 2 diagnostics par heure.",
        },
        { status: 429 },
      );
    }

    // 2. Vérification du CSRF Token
    const csrfToken =
      request.headers.get("x-csrf-token") ||
      request.headers.get("X-CSRF-Token");
    const storedToken = request.cookies.get("csrf-token")?.value;

    if (
      !csrfToken ||
      !storedToken ||
      !validateCsrfToken(csrfToken, storedToken)
    ) {
      return NextResponse.json(
        {
          message:
            "Requête invalide. Veuillez actualiser la page et réessayer.",
        },
        { status: 403 },
      );
    }

    // 3. Parser le body
    const body = await request.json();

    // 4. Validation avec Zod
    const validatedData = DiagnosticFormSchema.parse(body);

    // 5. Envoyer l'email avec Resend
    const emailSent = await sendEmail(validatedData);

    if (!emailSent) {
      return NextResponse.json(
        {
          message:
            "Erreur lors de l'envoi du message. Veuillez réessayer ultérieurement.",
        },
        { status: 500 },
      );
    }

    // 6. Succès
    return NextResponse.json(
      {
        message:
          "✅ Diagnostic envoyé avec succès ! Je vous répondrai sous 3-5 jours ouvrés avec un devis personnalisé.",
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors;
      const errorMessages = Object.values(fieldErrors).flat();
      const firstError = errorMessages[0] || "Erreur de validation des données";

      return NextResponse.json(
        {
          message: firstError,
          errors: fieldErrors,
        },
        { status: 400 },
      );
    }

    console.error("❌ Erreur API diagnostic:", error);
    return NextResponse.json(
      { message: "Erreur serveur. Veuillez réessayer dans quelques instants." },
      { status: 500 },
    );
  }
}
