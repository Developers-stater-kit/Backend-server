import { Router } from "express";
import { featuresSchema } from "../input-valudation";
import { createFeatureService, deleteFeatureService, getAllFeaturesService, getFeatureByIdService, updateFeatureService } from "./service";

const router = Router();
//  FEATURES APIS

router.post("/create", async (req, res) => {
    try {
        const input = featuresSchema.parse(req.body);
        const response = await createFeatureService(input);
        res.status(response.success ? 201 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to create feature" });
    }
});

router.get("/", async (req, res) => {
    try {
        const response = await getAllFeaturesService();
        res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to retrieve features" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const response = await getFeatureByIdService(req.params.id);
        res.status(response.success && response.data ? 200 : 404).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to retrieve feature" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const input = featuresSchema.partial().parse(req.body);
        const response = await updateFeatureService(req.params.id, input);
        res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to update feature" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const response = await deleteFeatureService(req.params.id);
        res.status(response.success ? 200 : 400).json(response);
    } catch (error: any) {
        res.status(400).json({ error: error.message || "Failed to delete feature" });
    }
});

export default router;