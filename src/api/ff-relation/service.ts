import { eq, and } from "drizzle-orm";
import { db } from "../../db/drizzle";
import { features, frameworkFeatures, frameworks } from "../../db/schema/resources";

type Response = {
    success: boolean,
    mssg: string,
    data: any,
}


export async function linkFeatureToFramework(framweorkKey: string, featureKey: string): Promise<Response> {
    try {
        if (!framweorkKey || !featureKey) {
            throw new Error("Keys Not Found");
        };

        const [framework] = await db
            .select({ id: frameworks.id })
            .from(frameworks)
            .where(eq(frameworks.uniqueKey, framweorkKey))
            .limit(1);
        if (!framework?.id) {
            return {
                success: false,
                mssg: "Framework Not Found",
                data: null
            }
        };

        const [feature] = await db
            .select({ id: features.id })
            .from(features)
            .where(eq(features.uniqueKey, featureKey))
            .limit(1);
        if (!feature?.id) {
            return {
                success: false,
                mssg: "Feature Not Found",
                data: null
            }
        };

        const result = await db
            .insert(frameworkFeatures)
            .values({
                frameworkId: framework.id,
                featureId: feature.id,
            })
            .returning();

        return {
            success: true,
            mssg: "Feature Linked Successfully to Framework",
            data: result[0]
        }

    } catch (error: any) {
        if (error.code === "23505" || error.message.includes("uniqueFrameworkFeature")) {
            return {
                success: false,
                mssg: "This feature is already linked to this framework",
                data: null,
            };
        }
        return {
            success: false,
            mssg: `Error Details: ${error.message}`,
            data: null,
        };
    }
}

export async function getFeaturesForFramework(frameworkKey: string): Promise<Response> {
    try {
        const [framework] = await db
            .select({ id: frameworks.id })
            .from(frameworks)
            .where(eq(frameworks.uniqueKey, frameworkKey))
            .limit(1);

        if (!framework?.id) return { success: false, mssg: "Framework Not Found", data: [] };

        const result = await db
            .select({ feature: features })
            .from(frameworkFeatures)
            .innerJoin(features, eq(frameworkFeatures.featureId, features.id))
            .where(eq(frameworkFeatures.frameworkId, framework.id));

        return { success: true, mssg: "Features fetched successfully", data: result.map(r => r.feature) };
    } catch (error: any) {
        return { success: false, mssg: `Error Details: ${error.message}`, data: [] };
    }
}

export async function getFrameworksForFeature(featureKey: string): Promise<Response> {
    try {
        const [feature] = await db
            .select({ id: features.id })
            .from(features)
            .where(eq(features.uniqueKey, featureKey))
            .limit(1);

        if (!feature?.id) return { success: false, mssg: "Feature Not Found", data: [] };

        const result = await db
            .select({ framework: frameworks })
            .from(frameworkFeatures)
            .innerJoin(frameworks, eq(frameworkFeatures.frameworkId, frameworks.id))
            .where(eq(frameworkFeatures.featureId, feature.id));

        return { success: true, mssg: "Frameworks fetched successfully", data: result.map(r => r.framework) };
    } catch (error: any) {
        return { success: false, mssg: `Error Details: ${error.message}`, data: [] };
    }
}

export async function unlinkFeatureFromFramework(frameworkKey: string, featureKey: string): Promise<Response> {
    try {
        const [framework] = await db
            .select({ id: frameworks.id })
            .from(frameworks)
            .where(eq(frameworks.uniqueKey, frameworkKey))
            .limit(1);

        const [feature] = await db
            .select({ id: features.id })
            .from(features)
            .where(eq(features.uniqueKey, featureKey))
            .limit(1);

        if (!framework?.id || !feature?.id) {
            return { success: false, mssg: "Framework or Feature Not Found", data: null };
        }


        const result = await db
            .delete(frameworkFeatures)
            .where(and(eq(frameworkFeatures.frameworkId, framework.id), eq(frameworkFeatures.featureId, feature.id)))
            .returning();

        return { success: true, mssg: "Feature unlinked from framework successfully", data: result };
    } catch (error: any) {
        return { success: false, mssg: `Error Details: ${error.message}`, data: null };
    }
}