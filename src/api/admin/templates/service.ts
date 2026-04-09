import { createTemplate, deleteTemplate, getAllTemplates, getTemplateById, updateTemplate } from "./repository";

export async function createTemplateService(payload: any) {
    return await createTemplate({ data: payload });
}

export async function getAllTemplatesService() {
    return await getAllTemplates();
}

export async function getTemplateByIdService(id: string) {
    return await getTemplateById(id);
}

export async function updateTemplateService(id: string, payload: any) {
    return await updateTemplate(id, payload);
}

export async function deleteTemplateService(id: string) {
    return await deleteTemplate(id);
}
