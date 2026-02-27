import express from "express";
import composeRoute from "./api/compose/route";
import featuresRoute from "./api/admin/features/route";
import frameworkRoute from "./api/admin/frameworks/route";
import linkRoute from "./api/ff-relation/route";



const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.use("/api", composeRoute);
app.use("/api/features", featuresRoute);
app.use("/api/framweorks", frameworkRoute);
app.use("/api/link", linkRoute);


app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});