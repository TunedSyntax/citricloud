# Citricloud Localhost Port Reference

## Development Ports (Docker Desktop Containers)

| Service | Port | URL | Command |
|---------|------|-----|---------|
| Frontend | 8080 | http://localhost:8080 | `docker run -p 8080:80 ghcr.io/tunedsyntax/citricloud-frontend:latest` |
| Backend | 4000 | http://localhost:4000 | `docker run -p 4000:4000 ghcr.io/tunedsyntax/citricloud-backend:latest` |

## Production Ports (k3s Cluster)

| Service | IP | Domain | Port |
|---------|-----|--------|------|
| Frontend | k3s-prod-01 (10.0.0.4) | citricloud.com | 80, 443 |
| Backend | k3s-prod-01 (10.0.0.4) | citricloud.com/api | 80, 443 |
| Ingress | 49.13.95.148 | citricloud.com | 80, 443 |

## VS Code Quick Links

Use Ctrl+Shift+P (Command Palette) and search for:
- `Open: Frontend in Browser` - Opens http://localhost:8080
- `Open: Backend API in Browser` - Opens http://localhost:4000
- `Forward: Frontend (localhost:8080)` - Shows frontend port info
- `Forward: Backend (localhost:4000)` - Shows backend port info

## Quick Access (Run from Terminal)

```powershell
# View all running containers and their ports
docker ps --format "table {{.Names}}\t{{.Ports}}"

# Stop all containers
docker stop $(docker ps -q)

# Remove all containers
docker rm $(docker ps -aq)
```
