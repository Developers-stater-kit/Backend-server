import { getAllStats } from "./repository";



export async function getStatsService() {
    return await getAllStats();
}