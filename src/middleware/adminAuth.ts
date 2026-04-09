import { Request, Response, NextFunction } from "express";
import { auth } from "lib/auth";
import { fromNodeHeaders } from "better-auth/node";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

if (!ADMIN_API_KEY) {
  throw new Error("FATAL: ADMIN_API_KEY is not defined in environment variables.");
}

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
    return next();
  }

  // 2. Check Better Auth Session (For Dashboard)
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });


  if (session?.user?.role === "ADMIN") {
    return next();
  }

  res.status(401).json({ success: false, error: "Unauthorized access" });
};
