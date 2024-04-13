import dotenv from "dotenv";
import express from "express";

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
