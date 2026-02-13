$ErrorActionPreference = "Stop"

$backendImage = "ghcr.io/tunedsyntax/citricloud-backend:latest"
$frontendImage = "ghcr.io/tunedsyntax/citricloud-frontend:latest"

Write-Host "Building images..."
docker build -t $backendImage ./backend
if ($LASTEXITCODE -ne 0) { throw "Backend build failed." }

docker build -t $frontendImage ./frontend
if ($LASTEXITCODE -ne 0) { throw "Frontend build failed." }

Write-Host "Pushing images..."
docker push $backendImage
if ($LASTEXITCODE -ne 0) { throw "Backend push failed." }

docker push $frontendImage
if ($LASTEXITCODE -ne 0) { throw "Frontend push failed." }

Write-Host "Applying Kubernetes manifests..."
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml

Write-Host "Rolling out latest images..."
kubectl rollout restart deployment/citricloud-backend -n citricloud
kubectl rollout restart deployment/citricloud-frontend -n citricloud

Write-Host "Waiting for rollouts to complete..."
kubectl rollout status deployment/citricloud-backend -n citricloud --timeout=120s
kubectl rollout status deployment/citricloud-frontend -n citricloud --timeout=120s

Write-Host "Deployment complete."
