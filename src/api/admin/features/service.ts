import { createFeatures } from "./repository";
// import { features } from "../../../db/schema/templets";

export async function createFeatureService(payload : any) {
    const result = await createFeatures({ data: payload });
    return result;
}