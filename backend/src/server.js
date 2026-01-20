import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

// Middleware
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// **Connect to DB first**
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port :" + PORT);
  });
}).catch((err) => {
  console.error("Failed to start server:", err);
});




