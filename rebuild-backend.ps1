$ErrorActionPreference = "Stop"

Write-Host "=== Rebuilding Backend ===" -ForegroundColor Cyan

# Stop and remove old container
Write-Host "Stopping old container..." -ForegroundColor Yellow
docker stop citricloud-backend -ErrorAction SilentlyContinue | Out-Null; docker rm citricloud-backend -ErrorAction SilentlyContinue | Out-Null

# Build new image (no cache for fresh build)
Write-Host "Building new backend image..." -ForegroundColor Yellow
docker build --no-cache -t ghcr.io/tunedsyntax/citricloud-backend:latest ./backend
if ($LASTEXITCODE -ne 0) { throw "Backend build failed." }

# Start new container
Write-Host "Starting new container..." -ForegroundColor Yellow
docker run -d --name citricloud-backend -p 4000:4000 ghcr.io/tunedsyntax/citricloud-backend:latest | Out-Null

Write-Host "✓ Backend restarted on http://localhost:4000" -ForegroundColor Green
