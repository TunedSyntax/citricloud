@echo off
echo === Rebuilding Frontend ===
echo Stopping old container...
docker stop citricloud-frontend >nul 2>&1
docker rm citricloud-frontend >nul 2>&1

echo Building new frontend image...
docker build --no-cache -t ghcr.io/tunedsyntax/citricloud-frontend:latest ./frontend
if errorlevel 1 (
    echo ERROR: Frontend build failed
    exit /b 1
)

echo Starting new container...
docker run -d --name citricloud-frontend -p 8080:80 ghcr.io/tunedsyntax/citricloud-frontend:latest

echo.
echo === DONE ===
echo Frontend restarted on http://localhost:8080
echo Refresh your browser to see changes (Ctrl+Shift+R)
pause
