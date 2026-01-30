import { Router } from "express";
import { featuresSchema } from "../input-valudation";
import { createFeatureService } from "./service";



const router = Router();
//  FEATURES APIS

router.post("/create", async (req, res) => {
    try {

        const input = featuresSchema.parse(req.body);
        console.log(input);
        
        const response = await createFeatureService(input);
        res.status(response.success ? 201 : 400).json(response);

    } catch (error: any) {
        res.status(400).json({
            error: error.message || "Failed to create feature",
        });
    }
});


// router.delete("/delete/id:", async (req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// });

export default router;