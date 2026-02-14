import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import SftpClient from "ssh2-sftp-client";
import path from "path";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigin = process.env.CORS_ORIGIN || "*";

// Hetzner Storage Box configuration
const HETZNER_HOST = process.env.HETZNER_HOST || "u544573.your-storagebox.de";
const HETZNER_USER = process.env.HETZNER_USER || "u544573";
const HETZNER_PASSWORD = process.env.HETZNER_PASSWORD || "äzHcX5°)fG5Ä(Mq";
const HETZNER_PORT = Number(process.env.HETZNER_PORT || 22);
const UPLOAD_FOLDER = "/upload";

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

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

// Upload file to Hetzner Storage Box via SFTP
async function uploadToHetzner(fileBuffer, filename) {
  const sftp = new SftpClient();
  try {
    await sftp.connect({
      host: HETZNER_HOST,
      port: HETZNER_PORT,
      username: HETZNER_USER,
      password: HETZNER_PASSWORD,
    });

    // Ensure upload directory exists
    const dirExists = await sftp.exists(UPLOAD_FOLDER);
    if (!dirExists) {
      await sftp.mkdir(UPLOAD_FOLDER, true);
    }

    // Upload file
    const remotePath = `${UPLOAD_FOLDER}/${filename}`;
    await sftp.put(fileBuffer, remotePath);

    await sftp.end();
    return { success: true, path: remotePath };
  } catch (error) {
    await sftp.end();
    return { success: false, error: error.message };
  }
}

// Upload endpoint
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const originalFilename = req.file.originalname;
    const extension = path.extname(originalFilename);
    const uniqueFilename = `${uuidv4()}${extension}`;

    // Upload to Hetzner
    const result = await uploadToHetzner(req.file.buffer, uniqueFilename);

    if (result.success) {
      res.status(201).json({
        message: "File uploaded successfully",
        filename: uniqueFilename,
        path: result.path,
        size: req.file.size,
        originalFilename: originalFilename,
      });
    } else {
      res.status(500).json({
        message: "Upload failed",
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
});

// Download file from Hetzner Storage Box
async function downloadFromHetzner(remotePath) {
  const sftp = new SftpClient();
  try {
    await sftp.connect({
      host: HETZNER_HOST,
      port: HETZNER_PORT,
      username: HETZNER_USER,
      password: HETZNER_PASSWORD,
    });

    const fileBuffer = await sftp.get(remotePath);
    await sftp.end();
    return { success: true, buffer: fileBuffer };
  } catch (error) {
    await sftp.end();
    return { success: false, error: error.message };
  }
}

// Serve files from storage box (for logos, assets, etc.)
app.get("/api/assets/*", async (req, res) => {
  try {
    // Get path after /api/assets/
    const filePath = req.params[0];
    const remotePath = `/uploads/${filePath}`;

    // Download from Hetzner
    const result = await downloadFromHetzner(remotePath);

    if (result.success) {
      // Determine content type based on extension
      const ext = path.extname(filePath).toLowerCase();
      const contentTypes = {
        ".svg": "image/svg+xml",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".ico": "image/x-icon",
      };

      const contentType = contentTypes[ext] || "application/octet-stream";
      
      res.set({
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000", // Cache for 1 year
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      });
      
      res.send(result.buffer);
    } else {
      res.status(404).json({
        message: "File not found",
        error: result.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve file",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Citricloud API listening on port ${port}`);
});
