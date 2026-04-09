import { Router } from "express";
import { getStatsService } from "./service";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const response = await getStatsService();
        res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to retrieve stats" });
    }
});

export default router;