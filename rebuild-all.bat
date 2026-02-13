@echo off
echo === Rebuilding Both Containers ===
echo Stopping containers...
docker stop citricloud-frontend citricloud-backend >nul 2>&1
docker rm citricloud-frontend citricloud-backend >nul 2>&1

echo Building frontend...
docker build --no-cache -t ghcr.io/tunedsyntax/citricloud-frontend:latest ./frontend
if errorlevel 1 (
    echo ERROR: Frontend build failed
    exit /b 1
)

echo Building backend...
docker build --no-cache -t ghcr.io/tunedsyntax/citricloud-backend:latest ./backend
if errorlevel 1 (
    echo ERROR: Backend build failed
    exit /b 1
)

echo Starting containers...
docker run -d --name citricloud-backend -p 4000:4000 ghcr.io/tunedsyntax/citricloud-backend:latest
docker run -d --name citricloud-frontend -p 8080:80 ghcr.io/tunedsyntax/citricloud-frontend:latest

echo.
echo === DONE ===
echo Frontend: http://localhost:8080
echo Backend: http://localhost:4000
pause
