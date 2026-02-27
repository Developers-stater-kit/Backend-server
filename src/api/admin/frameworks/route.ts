import { Router } from "express";
import { frameworkSchema } from "../input-valudation";
import { createFrameworkService } from "./service";



const router = Router();
//  FRAMEWORKS APIS

router.post("/create", async (req, res) => {
    try {

        const input = frameworkSchema.parse(req.body);
        console.log(input);


        const response = await createFrameworkService(input);
        res.status(response.success ? 201 : 400).json(response);

    } catch (error: any) {
        res.status(400).json({
            error: error.message || "Failed to create Framework",
        });
    }
});





// router.delete("/features", async (req, res) => {
//     try {

//     } catch (error) {

//     }
// });

export default router;