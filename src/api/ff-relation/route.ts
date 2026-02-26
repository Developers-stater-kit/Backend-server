import { Router } from "express";
import { linkFeatureToFramework } from "./service";




const router = Router();

router.post("/frameworks/:frameworkKey/features/:featureKey", async (req, res) => {
    try {
        const { frameworkKey, featureKey } = req.params;

        if (!frameworkKey) {
            return res.status(400).json({ error: "frameworkKey is required" });
        }
        if (!featureKey) {
            return res.status(400).json({ error: "featureKey is required" });
        }

        const result = await linkFeatureToFramework(frameworkKey, featureKey);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.mssg,
            });
        }

        return res.status(201).json(result);

    } catch (error:any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

export default router;