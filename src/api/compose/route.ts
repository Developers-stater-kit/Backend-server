import { Router } from "express";
import { composeSchema } from "./types/input-validation";
import { composeService } from "./service/service";

const router = Router();

router.post("/compose", async (req, res) => {
  try {

    // 1️⃣ Validate input shape
    const input = composeSchema.parse(req.body);

    // console.log(input)

    // 2️⃣ Call core service
    const result = await composeService(input);

    // 3️⃣ Send build plan
    res.status(200).json(result);
  } catch (error: any) {
    // 4️⃣ Handle validation / service errors
    res.status(400).json({
      error: error.message || "Failed to compose project",
    });
  }
});

export default router;
