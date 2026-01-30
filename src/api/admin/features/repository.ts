import { eq } from "drizzle-orm";
import { db } from "../../../db/drizzle";
import { features, frameworks } from "../../../db/schema/templets";


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
                mssg: "Framework creation failed.",
                data: null,
            };
        }

        return {
            success: true,
            mssg: "Framework created successfully",
            data: newfeatures,
        };
    } catch (error) {
        console.error("Error creating framework:", error);
        return {
            success: false,
            mssg: "Error creating framework.",
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

