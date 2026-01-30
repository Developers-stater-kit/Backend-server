import { Router } from "express";



const router = Router();
//  FRAMEWORKS APIS

router.post("/create", async (req, res) => {
    try {

        // const input = featuresSchema.parse(req.body);
        // console.log(input);

    } catch (error: any) {
        res.status(400).json({
            error: error.message || "Failed to create feature",
        });
    }
});


// router.delete("/features", async (req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// });

export default router;