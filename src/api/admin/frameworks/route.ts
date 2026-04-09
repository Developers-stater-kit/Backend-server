import { Router } from "express";
import { frameworkSchema } from "../input-valudation";
import { createFrameworkService, deleteFrameworkService, getAllFrameworksService, getFrameworkByIdService, updateFrameworkService } from "./service";

const router = Router();
//  FRAMEWORKS APIS

router.post("/create", async (req, res) => {
    try {
        const input = frameworkSchema.parse(req.body);
        const response = await createFrameworkService(input);
        res.status(response.success ? 201 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to create Framework" });
    }
});

router.get("/", async (req, res) => {
    try {
        const response = await getAllFrameworksService();
        res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to retrieve frameworks" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const response = await getFrameworkByIdService(req.params.id);
        res.status(response.success && response.data ? 200 : 404).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to retrieve framework" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const input = frameworkSchema.partial().parse(req.body);
        const response = await updateFrameworkService(req.params.id, input);
        res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to update framework" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const response = await deleteFrameworkService(req.params.id);
        res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to delete framework" });
    }
});

export default router;