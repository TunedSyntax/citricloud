@echo off
echo === Rebuilding Backend ===
echo Stopping old container...
docker stop citricloud-backend >nul 2>&1
docker rm citricloud-backend >nul 2>&1

echo Building new backend image...
docker build --no-cache -t ghcr.io/tunedsyntax/citricloud-backend:latest ./backend
if errorlevel 1 (
    echo ERROR: Backend build failed
    exit /b 1
)

echo Starting new container...
docker run -d --name citricloud-backend -p 4000:4000 ghcr.io/tunedsyntax/citricloud-backend:latest

echo.
echo === DONE ===
echo Backend restarted on http://localhost:4000
pause
