import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigin = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/api/message", (req, res) => {
  res.json({
    message: "Citricloud backend is online.",
    environment: process.env.NODE_ENV || "development"
  });
});

app.listen(port, () => {
  console.log(`Citricloud API listening on port ${port}`);
});
