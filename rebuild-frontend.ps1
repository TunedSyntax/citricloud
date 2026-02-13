$ErrorActionPreference = "Stop"

Write-Host "=== Rebuilding Frontend ===" -ForegroundColor Cyan

# Stop and remove old container
Write-Host "Stopping old container..." -ForegroundColor Yellow
docker stop citricloud-frontend -ErrorAction SilentlyContinue | Out-Null; docker rm citricloud-frontend -ErrorAction SilentlyContinue | Out-Null

# Build new image (no cache for fresh build)
Write-Host "Building new frontend image..." -ForegroundColor Yellow
docker build --no-cache -t ghcr.io/tunedsyntax/citricloud-frontend:latest ./frontend
if ($LASTEXITCODE -ne 0) { throw "Frontend build failed." }

# Start new container
Write-Host "Starting new container..." -ForegroundColor Yellow
docker run -d --name citricloud-frontend -p 8080:80 ghcr.io/tunedsyntax/citricloud-frontend:latest | Out-Null

Write-Host "✓ Frontend restarted on http://localhost:8080" -ForegroundColor Green
Write-Host "Refresh your browser to see changes (Ctrl+Shift+R for hard refresh)" -ForegroundColor Cyan
