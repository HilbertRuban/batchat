import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { app, server } from "./socket/socket.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import userRoute from "./routes/userRoutes.js";

// Database import
import connectToMongoDB from "./db/connectToMongoDB.js";

const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
