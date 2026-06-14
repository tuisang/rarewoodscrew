// server.js
// Main Express server for Forge & Timber Atelier backend
// Stack: Node.js + Express + Prisma + Neon PostgreSQL

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { verifyEmailConnection } from "./services/emailService.js";
import emailRoutes from "./routes/emailRoutes.js";

// ─── Load Environment Variables ───────────────────────────────────────────────
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Forge & Timber Atelier API is running." });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/email", emailRoutes);

// Add your other routes below as you build them, e.g:
// app.use("/api/products", productRoutes);
// app.use("/api/quotes", quoteRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/mpesa", mpesaRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error." });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await verifyEmailConnection();
});

export default app;