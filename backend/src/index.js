import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import SftpClient from "ssh2-sftp-client";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigin = process.env.CORS_ORIGIN || "*";
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Hetzner Storage Box configuration
const HETZNER_HOST = process.env.HETZNER_HOST || "u544573.your-storagebox.de";
const HETZNER_USER = process.env.HETZNER_USER || "u544573";
const HETZNER_PASSWORD = process.env.HETZNER_PASSWORD || "äzHcX5°)fG5Ä(Mq";
const HETZNER_PORT = Number(process.env.HETZNER_PORT || 22);
const UPLOAD_FOLDER = "/upload";

// Database initialization
const DB_PATH = "./data/citricloud.db";
let db;

function initDatabase() {
  return new Promise((resolve, reject) => {
    // Ensure data directory exists
    if (!fs.existsSync("./data")) {
      fs.mkdirSync("./data", { recursive: true });
    }

    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        reject(err);
        return;
      }

      // Create users table if it doesn't exist
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log("Database initialized at " + DB_PATH);
          resolve();
        }
      });
    });
  });
}

// Database helper functions
function dbGet(query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function dbRun(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

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

// Authentication Endpoints

// Register endpoint
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    // Check if user exists
    const existingUser = await dbGet(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await dbRun(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hashedPassword]
    );

    // Generate JWT token
    const access_token = jwt.sign(
      { id: result.lastID, email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully",
      access_token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await dbGet(
      "SELECT id, email, password_hash FROM users WHERE email = ?",
      [email]
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const access_token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      access_token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

// Verify token and get user info
app.get("/api/auth/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.query.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await dbGet(
      "SELECT id, email, created_at FROM users WHERE id = ?",
      [decoded.id]
    );

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
      error: error.message,
    });
  }
});

app.listen(port, async () => {
  try {
    await initDatabase();
    console.log(`Citricloud API listening on port ${port}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
});
