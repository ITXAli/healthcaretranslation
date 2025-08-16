import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import translateRoutes from "./routes/translate.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use the PORT from Render environment or default to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/translate", translateRoutes);

// Default route (serve index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Catch-all error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
