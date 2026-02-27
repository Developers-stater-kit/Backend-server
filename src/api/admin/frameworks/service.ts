import { eq } from "drizzle-orm";
import { db } from "../../../db/drizzle";
import { features, frameworkFeatures, frameworks } from "../../../db/schema/templets";
import { createFramework } from "./repository";


export async function createFrameworkService(payload: any) {
    const result = await createFramework({ data: payload });
    return result;
}

type FeatureAssignInput = {
    frameworkKey: string;
    featureKey: string;
};

type Response = { 
    success: boolean; 
    mssg: string; 
    data?: any 
}

export async function assignFeatureToFramework(data: FeatureAssignInput): Promise<Response> {
    try {
        if (!data.featureKey || !data.frameworkKey) {
            return {
                success: false,
                mssg: "featureKey and frameworkKey are required.",
                data: null
            };
        }

        const framework = await db
            .select({ id: frameworks.id })
            .from(frameworks)
            .where(eq(frameworks.uniqueKey, data.frameworkKey))
            .limit(1);

        if (!framework.length) {
            return {
                success: false,
                mssg: "Framework not found",
                data: null
            };
        }

        const feature = await db
            .select({ id: features.id })
            .from(features)
            .where(eq(features.uniqueKey, data.featureKey))
            .limit(1);

        if (!feature.length) {
            return {
                success: false,
                mssg: "Feature not found",
                data: null
            };
        }

        const result = await db
            .insert(frameworkFeatures)
            .values({
                frameworkId: framework[0].id,
                featureId: feature[0].id,
            })
            .returning();

        return {
            success: true,
            mssg: "Feature assigned to framework successfully",
            data: result[0],
        };
    } catch (error: any) {
        return {
            success: false,
            mssg: error.message || "Failed to assign feature to framework",
            data: null
        };
    }
}