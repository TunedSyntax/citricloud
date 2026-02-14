$ErrorActionPreference = "Stop"

Write-Host "=== Rebuilding Both Containers ===" -ForegroundColor Cyan

# Stop and remove old containers
Write-Host "Stopping old containers..." -ForegroundColor Yellow
docker stop citricloud-frontend citricloud-backend -ErrorAction SilentlyContinue | Out-Null; docker rm citricloud-frontend citricloud-backend -ErrorAction SilentlyContinue | Out-Null

# Build both images
Write-Host "Building frontend image..." -ForegroundColor Yellow
docker build --no-cache -t ghcr.io/tunedsyntax/citricloud-frontend:latest ./frontend
if ($LASTEXITCODE -ne 0) { throw "Frontend build failed." }

Write-Host "Building backend image..." -ForegroundColor Yellow
docker build --no-cache -t ghcr.io/tunedsyntax/citricloud-backend:latest ./backend
if ($LASTEXITCODE -ne 0) { throw "Backend build failed." }

# Start both containers
Write-Host "Starting containers..." -ForegroundColor Yellow
docker run -d --name citricloud-backend -p 4000:4000 ghcr.io/tunedsyntax/citricloud-backend:latest | Out-Null; docker run -d --name citricloud-frontend -p 8080:80 ghcr.io/tunedsyntax/citricloud-frontend:latest | Out-Null

Write-Host "Containers running successfully" -ForegroundColor Green
Write-Host "  Frontend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "  Backend: http://localhost:4000" -ForegroundColor Cyan
Write-Host "Refresh browser to see changes" -ForegroundColor Yellow
