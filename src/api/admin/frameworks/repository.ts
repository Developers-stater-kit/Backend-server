import { db } from "../../../db/drizzle";
import { frameworks } from "../../../db/schema/templets";


type Response = {
    success: boolean;
    mssg: string;
    data: any;
};

export async function createFramework({ data }: { data: typeof frameworks.$inferInsert }): Promise<Response> {
    try {
        const [newFramework] = await db
            .insert(frameworks)
            .values({
                name: data.name,
                uniqueKey: data.uniqueKey,
                repoName: data.repoName,
                scopes: data.scopes,
                status: data.status ?? "PENDING",
                isExperimental: data.isExperimental
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
