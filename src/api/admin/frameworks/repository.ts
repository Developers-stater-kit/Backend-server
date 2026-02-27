import { eq } from "drizzle-orm";
import { db } from "../../../db/drizzle";
import { frameworks } from "../../../db/schema/templets";


type Response = {
    success: boolean;
    mssg: string;
    data: any;
};

export async function createFramework({ data }: { data: typeof frameworks.$inferInsert }): Promise<Response> {
    try {

        const [existing] = await db
            .select()
            .from(frameworks)
            .where(eq(frameworks.uniqueKey, data.uniqueKey))
            .limit(1);

        if (existing) {
            return {
                success: false,
                mssg: `Framework with key '${data.name}' already exists.`,
                data: null,
            };
        }

        const [newFramework] = await db
            .insert(frameworks)
            .values({
                name: data.name,
                uniqueKey: data.uniqueKey,
                repoName: data.repoName,
                scope: data.scope,
                status: data.status ?? "PENDING",
                isExperimental: data.isExperimental ?? false
            })
            .returning({ id: frameworks.id });

        if (!newFramework || !newFramework.id) {
            return {
                success: false,
                mssg: "Framework creation failed.",
                data: null,
            };
        }

        return {
            success: true,
            mssg: "Framework created successfully",
            data: newFramework,
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
 * Delete a framework by its UUID
 */
export async function deleteFramework(id: string): Promise<Response> {
    try {
        const [deleted] = await db
            .delete(frameworks)
            .where(eq(frameworks.id, id))
            .returning({ id: frameworks.id });

        if (!deleted) {
            return { success: false, mssg: "Framework not found.", data: null };
        }

        return { success: true, mssg: "Framework deleted successfully.", data: deleted };
    } catch (error) {
        console.error("Error deleting framework:", error);
        return { success: false, mssg: "Error deleting framework.", data: null };
    }
}