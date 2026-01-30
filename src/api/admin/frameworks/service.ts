import { createFramework } from "./repository";


export async function createFrameworkService(payload : any) {
    const result = await createFramework({ data: payload });
    return result;
}