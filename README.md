# citricloud

Citricloud is a simple full-stack starter with a React (Vite) frontend and an
Express backend. This repo includes Dockerfiles and a docker-compose dev setup.

## Local dev (without Docker)

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend (in another terminal):

```bash
cd backend
npm install
npm run dev
```

Optional env config: copy `backend/.env.example` to `backend/.env`.

Open http://localhost:5173 and the UI will call the API at
http://localhost:4000.

## Local dev (Docker)

```bash
docker compose -f docker-compose.dev.yml up --build
```

Frontend: http://localhost:5173
Backend: http://localhost:4000/api/health

## Production builds

Backend:

```bash
docker build -t citricloud-backend ./backend
```

Frontend:

```bash
docker build -t citricloud-frontend ./frontend
```

## CI images (GitHub Actions)

On push to `main`, GitHub Actions builds and pushes images to GHCR:

- ghcr.io/tunedsyntax/citricloud-frontend:latest
- ghcr.io/tunedsyntax/citricloud-frontend:<commit-sha>
- ghcr.io/tunedsyntax/citricloud-backend:latest
- ghcr.io/tunedsyntax/citricloud-backend:<commit-sha>

## k3s deployment

Apply manifests:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml
```

Notes:

- Update the host in `k8s/ingress.yaml` if you use a different domain.
- Update `CORS_ORIGIN` in `k8s/backend-deployment.yaml` if your frontend domain changes.
- If your GHCR images are private, add an imagePullSecret to the deployments.
