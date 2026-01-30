import { z } from "zod";

export const featuresSchema = z.object({
    uniqueKey: z.string().min(1),
    featureType: z.string().min(1), 
    name: z.string().min(1),
    repoName: z.string().min(1),
    status: z.string().optional(),
    isExperimental: z.boolean().optional(),
});


export const frameworkSchema = z.object({
    uniqueKey: z.string().min(1),
    name: z.string().min(1),
    repoName: z.string().min(1),
    status: z.string().optional(),
    isExperimental: z.boolean().optional(),
    scopes: z.array(z.string()).min(1),
});


export type featuresInput = z.infer<typeof featuresSchema>
export type frameworkInput = z.infer<typeof frameworkSchema>





