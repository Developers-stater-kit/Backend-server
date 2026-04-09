import { eq } from "drizzle-orm";
import { db } from "../../../db/drizzle";
import { templates } from "../../../db/schema/templates/templates";

type Response = {
    success: boolean;
    mssg: string;
    data: any;
};

export async function createTemplate({ data }: { data: typeof templates.$inferInsert }): Promise<Response> {
    try {
        const [existing] = await db
            .select()
            .from(templates)
            .where(eq(templates.slug, data.slug))
            .limit(1);

        if (existing) {
            return { success: false, mssg: `Template with slug '${data.slug}' already exists.`, data: null };
        }

        const [newTemplate] = await db.insert(templates).values(data).returning();
        return { success: true, mssg: "Template created successfully", data: newTemplate };
    } catch (error: any) {
        return { success: false, mssg: `Error creating template: ${error.message}`, data: null };
    }
}

export async function getAllTemplates(): Promise<Response> {
    try {
        const result = await db.select().from(templates);
        return { success: true, mssg: "Templates fetched successfully", data: result };
    } catch (error: any) {
        return { success: false, mssg: `Error fetching templates: ${error.message}`, data: null };
    }
}

export async function getTemplateById(id: string): Promise<Response> {
    try {
        const [template] = await db.select().from(templates).where(eq(templates.id, id)).limit(1);
        if (!template) return { success: false, mssg: "Template not found.", data: null };
        return { success: true, mssg: "Template fetched successfully", data: template };
    } catch (error: any) {
        return { success: false, mssg: `Error fetching template: ${error.message}`, data: null };
    }
}

export async function updateTemplate(id: string, data: Partial<typeof templates.$inferInsert>): Promise<Response> {
    try {
        const [updated] = await db.update(templates).set({ ...data, updatedAt: new Date() }).where(eq(templates.id, id)).returning();
        if (!updated) return { success: false, mssg: "Template not found.", data: null };
        return { success: true, mssg: "Template updated successfully", data: updated };
    } catch (error: any) {
        return { success: false, mssg: `Error updating template: ${error.message}`, data: null };
    }
}

export async function deleteTemplate(id: string): Promise<Response> {
    try {
        const [deleted] = await db.delete(templates).where(eq(templates.id, id)).returning();
        if (!deleted) return { success: false, mssg: "Template not found.", data: null };
        return { success: true, mssg: "Template deleted successfully.", data: deleted };
    } catch (error: any) {
        return { success: false, mssg: `Error deleting template: ${error.message}`, data: null };
    }
}
