import dotenv from "dotenv";
import express from "express";

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
