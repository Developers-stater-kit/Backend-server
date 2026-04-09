import { eq } from "drizzle-orm";
import { db } from "../../../db/drizzle";
import { features, frameworks } from "../../../db/schema/resources";


type Response = {
    success: boolean;
    mssg: string;
    data: any;
};

export async function createFeatures({ data }: { data: typeof features.$inferInsert }): Promise<Response> {
    try {
        const [newfeatures] = await db
            .insert(features)
            .values({
                name: data.name,
                uniqueKey: data.uniqueKey,
                featureType: data.featureType,
                repoName: data.repoName,
                status: data.status ?? "PENDING",
                isExperimental: data.isExperimental
            })
            .returning({ id: features.id });

        if (!newfeatures || !newfeatures.id) {
            return {
                success: false,
                mssg: "Feature creation failed.",
                data: null,
            };
        }

        return {
            success: true,
            mssg: "Feature created successfully",
            data: newfeatures,
        };
    } catch (error) {
        console.error("Error creating Feature:", error);
        return {
            success: false,
            mssg: "Error creating Feature.",
            data: null,
        };
    }
}


/**
 * Delete a feature by its ID
 */
export async function deleteFeature(id: string): Promise<Response> {
    try {
        const [deletedFeature] = await db
            .delete(features)
            .where(eq(features.id, id))
            .returning({ id: features.id });

        if (!deletedFeature) {
            return {
                success: false,
                mssg: "Feature not found or already deleted.",
                data: null,
            };
        }

        return {
            success: true,
            mssg: "Feature deleted successfully.",
            data: deletedFeature,
        };
    } catch (error) {
        console.error("Error deleting feature:", error);
        return {
            success: false,
            mssg: "Error occurred while deleting the feature.",
            data: null,
        };
    }
}

export async function getAllFeatures(): Promise<Response> {
    try {
        const result = await db.select().from(features);
        return { success: true, mssg: "Features fetched successfully", data: result };
    } catch (error) {
        console.error("Error fetching features:", error);
        return { success: false, mssg: "Error fetching features", data: null };
    }
}

export async function getFeatureById(id: string): Promise<Response> {
    try {
        const [feature] = await db
            .select()
            .from(features)
            .where(eq(features.id, id))
            .limit(1);

        if (!feature) {
            return { success: false, mssg: "Feature not found.", data: null };
        }

        return { success: true, mssg: "Feature fetched successfully", data: feature };
    } catch (error) {
        console.error("Error fetching feature:", error);
        return { success: false, mssg: "Error fetching feature", data: null };
    }
}

export async function updateFeature(id: string, data: Partial<typeof features.$inferInsert>): Promise<Response> {
    try {
        const [updated] = await db
            .update(features)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(features.id, id))
            .returning();

        if (!updated) {
            return { success: false, mssg: "Feature not found.", data: null };
        }

        return { success: true, mssg: "Feature updated successfully", data: updated };
    } catch (error) {
        console.error("Error updating feature:", error);
        return { success: false, mssg: "Error updating feature", data: null };
    }
}
