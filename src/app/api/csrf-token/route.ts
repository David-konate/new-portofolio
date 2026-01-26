// app/api/csrf-token/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request: NextRequest) {
    try {
        // Générer un token CSRF aléatoire
        const token = crypto.randomBytes(32).toString("hex");

        // Créer la réponse avec le token
        const response = NextResponse.json(
            { token },
            { status: 200 }
        );

        // Stocker le token dans un cookie (httpOnly: false pour accès JS)
        response.cookies.set({
            name: "csrf-token",
            value: token,
            httpOnly: false, // ⚠️ CHANGÉ: false pour permettre l'accès JavaScript
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600, // 1 heure
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Erreur CSRF:", error);
        return NextResponse.json(
            { message: "Erreur lors de la génération du token" },
            { status: 500 }
        );
    }
}