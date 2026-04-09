import { createFeatures, deleteFeature, getAllFeatures, getFeatureById, updateFeature } from "./repository";

export async function createFeatureService(payload: any) {
    const result = await createFeatures({ data: payload });
    return result;
}

export async function getAllFeaturesService() {
    return await getAllFeatures();
}

export async function getFeatureByIdService(id: string) {
    return await getFeatureById(id);
}

export async function updateFeatureService(id: string, payload: any) {
    return await updateFeature(id, payload);
}

export async function deleteFeatureService(id: string) {
    return await deleteFeature(id);
}