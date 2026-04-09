import { Router } from "express";
import { templatesSchema } from "../input-valudation";
import { createTemplateService, deleteTemplateService, getAllTemplatesService, getTemplateByIdService, updateTemplateService } from "./service";

const router = Router();

router.post("/create", async (req, res) => {
    try {
        const input = templatesSchema.parse(req.body);
        const response = await createTemplateService(input);
        res.status(response.success ? 201 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to create template" });
    }
});

router.get("/", async (req, res) => {
    try {
        const response = await getAllTemplatesService();
        res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to retrieve templates" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const response = await getTemplateByIdService(req.params.id);
        res.status(response.success && response.data ? 200 : 404).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to retrieve template" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const input = templatesSchema.partial().parse(req.body);
        const response = await updateTemplateService(req.params.id, input);
        res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to update template" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const response = await deleteTemplateService(req.params.id);
        res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to delete template" });
    }
});

export default router;
