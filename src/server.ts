import express from "express";
import composeRoute from "./api/compose/route";
import featuresRoute from "./api/admin/features/route";
import statsRoute from "./api/admin/stats/route";
import frameworkRoute from "./api/admin/frameworks/route";
import linkRoute from "./api/ff-relation/route";
import templatesRoute from "./api/admin/templates/route";
import cors from "cors";
import { adminAuth } from "./middleware/adminAuth";
import homePage from "./views/homePage";
import { toNodeHandler } from "better-auth/node";
import { auth } from "lib/auth";


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.all("/api/auth/*path", toNodeHandler(auth))
app.use(express.json());


// ==========================================
// PUBLIC ROUTES
// ==========================================
app.get("/", (req, res) => {
    res.send(homePage());
});
app.get("/healthcheck", (req, res) => {
    res.json({ message: "🚀 DevKit Backend is running!" });
});



app.use("/api", composeRoute);
app.use("/api/templates", (req, res, next) => {
    if (req.method === "GET") return next();
    return adminAuth(req, res, next);
}, templatesRoute);

// ==========================================
// ADMIN ROUTES
// ==========================================
app.use("/api/admin/stats", adminAuth, statsRoute);
app.use("/api/admin/features", adminAuth, featuresRoute);
app.use("/api/admin/frameworks", adminAuth, frameworkRoute);
app.use("/api/admin/link", adminAuth, linkRoute);


app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});