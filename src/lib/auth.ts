// src/lib/auth.ts (Backend)
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "db/drizzle";
import { accounts, sessions, user, verificationTokens } from "db/schema/user";

export const auth = betterAuth({
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: user,
            account: accounts,
            session: sessions,
            verification: verificationTokens,

        },
    }),
    user: {
        additionalFields: {
            role: { type: "string", defaultValue: "USER" }
        }
    },
    trustedOrigins: [
        'http://localhost:3000',
        "https://admin.devbuilds.in",
    ],
    advanced: {
        useSecureCookies: true,
        crossSubDomainCookies: {
            enabled: true,
            domain: "devbuilds.in",
        },
    },
});