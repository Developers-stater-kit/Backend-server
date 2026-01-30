import { z } from "zod";

export const composeSchema = z.object({
    projectName: z.string().min(1),
    scope: z.enum(["frontend", "backend", "fullstack"]),
    appType: z.enum(["web", "mobile"]),
    framework: z.string().min(1), // uniqueKey for framework
    setupUpto: z.enum(["framework", "auth", "database", "payments"]),

    authLib: z.string().min(1).optional(), // uniqueKey for  Auth Provider
    authMethods: z.array(z.enum(["email", "social", "otp"])).optional(),
    socialProviders: z.array(z.enum(["google", "github", "custom"])).optional(),

    dbType: z.enum(["sql", "no-sql"]).optional(),
    orm: z.string().min(1).optional(), // uniqueKey for ORM

    paymentProvider: z.string().optional(),
});

export type ComposeInput = z.infer<typeof composeSchema>;