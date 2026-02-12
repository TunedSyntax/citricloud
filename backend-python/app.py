from datetime import timedelta
import os
import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import check_password_hash, generate_password_hash

BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, "data.db")

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "dev-secret-change-me")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=8)

CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})
JWTManager(app)


def init_db():
    with sqlite3.connect(DB_PATH) as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        connection.commit()


def get_user_by_email(email):
    with sqlite3.connect(DB_PATH) as connection:
        connection.row_factory = sqlite3.Row
        cursor = connection.execute(
            "SELECT id, email, password_hash FROM users WHERE email = ?", (email,)
        )
        return cursor.fetchone()


def create_user(email, password):
    password_hash = generate_password_hash(password)
    with sqlite3.connect(DB_PATH) as connection:
        cursor = connection.execute(
            "INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, datetime('now'))",
            (email, password_hash),
        )
        connection.commit()
        return cursor.lastrowid


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.post("/api/auth/register")
def register():
    payload = request.get_json(silent=True) or {}
    email = str(payload.get("email", "")).strip().lower()
    password = str(payload.get("password", ""))

    if not email or "@" not in email:
        return jsonify({"message": "Valid email is required."}), 400
    if len(password) < 8:
        return jsonify({"message": "Password must be at least 8 characters."}), 400

    if get_user_by_email(email):
        return jsonify({"message": "Account already exists."}), 409

    user_id = create_user(email, password)
    token = create_access_token(identity={"id": user_id, "email": email})
    return jsonify({"access_token": token, "user": {"id": user_id, "email": email}})


@app.post("/api/auth/login")
def login():
    payload = request.get_json(silent=True) or {}
    email = str(payload.get("email", "")).strip().lower()
    password = str(payload.get("password", ""))

    user = get_user_by_email(email)
    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"message": "Invalid email or password."}), 401

    token = create_access_token(identity={"id": user["id"], "email": user["email"]})
    return jsonify({"access_token": token, "user": {"id": user["id"], "email": user["email"]}})


@app.get("/api/auth/me")
@jwt_required()
def me():
    identity = get_jwt_identity()
    return jsonify({"user": identity})


if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
