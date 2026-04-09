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
    scope: z.array(z.string()).min(1),
});


export type featuresInput = z.infer<typeof featuresSchema>
export type frameworkInput = z.infer<typeof frameworkSchema>

export const templatesSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    subtitle: z.any().optional(),
    description: z.string().optional(),
    isFeatured: z.boolean().optional(),
    category: z.string().optional(),
    thumbnail: z.string().optional(),
    videoUrl: z.string().optional(),
    previewUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    cliCommand: z.string().optional(),
    pricingType: z.enum(['FREE', 'PAID']).optional(),
    authorName: z.string().optional(),
    authorAvatar: z.array(z.string()).optional(),
});

export type templatesInput = z.infer<typeof templatesSchema>;






