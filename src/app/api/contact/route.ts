// app/api/contact/route.ts
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Schéma Zod pour validation
const ContactFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(100, "Le nom ne doit pas dépasser 100 caractères")
        .regex(/^[a-zA-Z\s'-àâäçèéêëîïôùûüœæÀÂÄÇÈÉÊËÎÏÔÙÛÜŒÆ]*$/, "Le nom contient des caractères invalides"),

    email: z
        .string()
        .trim()
        .email("Adresse email invalide")
        .max(255, "L'email ne doit pas dépasser 255 caractères")
        .toLowerCase(),

    subject: z
        .string()
        .trim()
        .min(3, "L'objet doit contenir au moins 3 caractères")
        .max(200, "L'objet ne doit pas dépasser 200 caractères"),

    projectType: z
        .string()
        .optional()
        .refine(
            (val) => !val || ["Site web vitrine", "Application web", "Application mobile", "E-commerce", "Refonte/Optimisation", "Consultation/Audit", "Autre"].includes(val),
            "Type de projet invalide"
        ),

    message: z
        .string()
        .trim()
        .min(10, "Le message doit contenir au moins 10 caractères")
        .max(5000, "Le message ne doit pas dépasser 5000 caractères"),

    consent: z
        .boolean()
        .refine((val) => val === true, "Vous devez accepter le traitement de vos données"),

    timestamp: z.string().datetime(),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

// Configuration du Rate Limiting avec Upstash
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(
        process.env.NODE_ENV === "production" ? 3 : 100, // 100 en dev, 3 en prod
        "1 h"
    ),
});

// Validation du token CSRF
const validateCsrfToken = (token: string, storedToken: string): boolean => {
    return token === storedToken;
};

// Fonction pour envoyer l'email avec Resend
async function sendEmail(data: ContactFormData): Promise<boolean> {
    try {
        const response = await fetch(process.env.EMAIL_API_URL || "https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: process.env.EMAIL_FROM || "da.konate@gmail.fr",
                to: process.env.CONTACT_EMAIL || "contact@david-konate.fr",
                subject: `💼 Nouveau message de contact: ${data.subject}`,
                html: generateEmailHTML(data),
                reply_to: data.email,
            }),
        });

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

// Générer le contenu HTML de l'email avec le style de l'application
function generateEmailHTML(data: ContactFormData): string {
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
            max-width: 600px; 
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
            position: relative;
          }
          
          .header::before {
            content: '<';
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 48px;
            color: rgba(255, 255, 255, 0.3);
            font-weight: bold;
          }
          
          .header::after {
            content: '/>';
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 48px;
            color: rgba(255, 255, 255, 0.3);
            font-weight: bold;
          }
          
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            color: white;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          
          .header .emoji {
            font-size: 48px;
            display: block;
            margin-bottom: 10px;
          }
          
          .content { 
            padding: 40px 30px;
            background: rgba(26, 26, 46, 0.6);
          }
          
          .field { 
            margin: 24px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-left: 4px solid #43d9ad;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          
          .field:hover {
            background: rgba(67, 217, 173, 0.08);
            transform: translateX(4px);
          }
          
          .label { 
            font-weight: 600;
            font-family: 'Montserrat', sans-serif;
            color: #43d9ad;
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .value {
            color: #e2e8f0;
            word-break: break-word;
            font-size: 16px;
          }
          
          .value a {
            color: #43d9ad;
            text-decoration: none;
            border-bottom: 2px solid transparent;
            transition: border-color 0.3s ease;
          }
          
          .value a:hover {
            border-bottom-color: #43d9ad;
          }
          
          .message-section {
            margin: 30px 0;
          }
          
          .message-box {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(67, 217, 173, 0.2);
            padding: 24px;
            border-radius: 12px;
            margin-top: 12px;
            white-space: pre-wrap;
            word-wrap: break-word;
            color: #cbd5e1;
            font-family: 'Fira Mono', monospace;
            line-height: 1.8;
            box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
          }
          
          .footer { 
            margin-top: 30px; 
            padding: 30px;
            border-top: 1px solid rgba(67, 217, 173, 0.2);
            background: rgba(0, 0, 0, 0.2);
          }
          
          .footer-info {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 16px;
          }
          
          .footer-info p {
            font-size: 14px;
            color: #94a3b8;
            margin: 8px 0;
          }
          
          .footer-info strong {
            color: #43d9ad;
          }
          
          .rgpd-badge {
            display: inline-block;
            background: rgba(34, 197, 94, 0.15);
            color: #22c55e;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
            border: 1px solid rgba(34, 197, 94, 0.3);
          }
          
          .divider {
            border: none;
            border-top: 1px solid rgba(67, 217, 173, 0.2);
            margin: 20px 0;
          }
          
          .cta-button {
            display: inline-block;
            padding: 14px 28px;
            background: linear-gradient(135deg, #4d5bce 0%, #43d9ad 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin: 20px 0;
            font-weight: 600;
            font-family: 'Montserrat', sans-serif;
            box-shadow: 0 4px 15px rgba(67, 217, 173, 0.3);
            transition: all 0.3s ease;
          }
          
          .cta-button:hover {
            box-shadow: 0 6px 20px rgba(67, 217, 173, 0.4);
            transform: translateY(-2px);
          }
          
          @media (max-width: 600px) {
            .header h1 {
              font-size: 22px;
            }
            
            .content {
              padding: 24px 20px;
            }
            
            .field {
              padding: 16px;
            }
            
            .message-box {
              padding: 16px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="emoji">📧</span>
            <h1>Nouveau message de contact</h1>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">👤 Nom du contact</span>
              <span class="value">${escapeHtml(data.name)}</span>
            </div>
            
            <div class="field">
              <span class="label">📧 Adresse email</span>
              <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
            </div>
            
            <div class="field">
              <span class="label">📝 Sujet</span>
              <span class="value">${escapeHtml(data.subject)}</span>
            </div>
            
            ${data.projectType ? `
            <div class="field">
              <span class="label">🎯 Type de projet</span>
              <span class="value">${escapeHtml(data.projectType)}</span>
            </div>
            ` : ""}
            
            <div class="message-section">
              <span class="label">💬 Message complet</span>
              <div class="message-box">${escapeHtml(data.message)}</div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${data.email}" class="cta-button">
                ✉️ Répondre directement
              </a>
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-info">
              <p><strong>📅 Reçu le:</strong> ${new Date(data.timestamp).toLocaleString("fr-FR", {
        dateStyle: "full",
        timeStyle: "short"
    })}</p>
              <p><strong>📍 IP/Origine:</strong> Contrôlé par rate limiting</p>
            </div>
            
            <hr class="divider">
            
            <div style="text-align: center;">
              <span class="rgpd-badge">
                ✅ Consentement RGPD validé
              </span>
            </div>
            
            <hr class="divider">
            
            <p style="text-align: center; font-size: 12px; color: #64748b; margin-top: 20px;">
              Ce message a été envoyé via le formulaire de contact de votre portfolio<br>
              <strong style="color: #43d9ad;">contact@david-konate.fr</strong>
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

// Détecter le contenu suspect (URLs suspectes, spam, etc.)
function containsSuspiciousContent(text: string): boolean {
    const suspiciousPatterns = [
        /viagra|cialis|casino|lottery|prize|bitcoin|crypto|investment/gi,
        /http:\/\//g, // URLs non-HTTPS
        /(https:\/\/[^\s]+){5,}/g, // Plus de 5 URLs
        /\b(click here|buy now|limited offer|act now)\b/gi, // Termes de spam
    ];

    return suspiciousPatterns.some((pattern) => pattern.test(text));
}

export async function POST(request: NextRequest) {
    try {
        // 1. Rate limiting avec Upstash
        const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
        const { success } = await ratelimit.limit(ip);

        if (!success) {
            return NextResponse.json(
                {
                    message: "Trop de requêtes. Veuillez réessayer plus tard. Limite: 3 messages par heure.",
                },
                { status: 429 }
            );
        }

        // 2. Vérification du CSRF Token
        const csrfToken = request.headers.get("x-csrf-token") || request.headers.get("X-CSRF-Token");
        const storedToken = request.cookies.get("csrf-token")?.value;

        if (!csrfToken || !storedToken || !validateCsrfToken(csrfToken, storedToken)) {
            return NextResponse.json(
                { message: "Requête invalide. Veuillez actualiser la page et réessayer." },
                { status: 403 }
            );
        }

        // 3. Parser le body
        const body = await request.json();

        // 4. Validation avec Zod
        const validatedData = ContactFormSchema.parse(body);

        // 5. Vérifications supplémentaires
        if (containsSuspiciousContent(validatedData.message) || containsSuspiciousContent(validatedData.subject)) {
            return NextResponse.json(
                { message: "Votre message contient du contenu suspect et ne peut être envoyé." },
                { status: 400 }
            );
        }

        // 6. Envoyer l'email avec Resend
        const emailSent = await sendEmail(validatedData);

        if (!emailSent) {
            return NextResponse.json(
                { message: "Erreur lors de l'envoi du message. Veuillez réessayer ultérieurement." },
                { status: 500 }
            );
        }

        // 7. Succès
        return NextResponse.json(
            {
                message: "✅ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.",
                success: true
            },
            { status: 200 }
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
                { status: 400 }
            );
        }

        console.error("❌ Erreur API contact:", error);
        return NextResponse.json(
            { message: "Erreur serveur. Veuillez réessayer dans quelques instants." },
            { status: 500 }
        );
    }
}