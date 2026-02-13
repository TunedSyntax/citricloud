# Citricloud - Complete Command Reference

## Table of Contents
1. [Docker Commands](#docker-commands)
2. [Kubernetes (kubectl) Commands](#kubernetes-kubectl-commands)
3. [Git Commands](#git-commands)
4. [Local Development](#local-development)
5. [Image Registry](#image-registry)
6. [Cluster Management](#cluster-management)
7. [Troubleshooting](#troubleshooting)

---

## Docker Commands

### Build Images

```bash
# Build frontend image
docker build -t ghcr.io/tunedsyntax/citricloud-frontend:latest ./frontend

# Build backend image
docker build -t ghcr.io/tunedsyntax/citricloud-backend:latest ./backend

# Build both images
docker build -t ghcr.io/tunedsyntax/citricloud-frontend:latest ./frontend ; docker build -t ghcr.io/tunedsyntax/citricloud-backend:latest ./backend

# Build without cache (force rebuild)
docker build --no-cache -t ghcr.io/tunedsyntax/citricloud-frontend:latest ./frontend
docker build --no-cache -t ghcr.io/tunedsyntax/citricloud-backend:latest ./backend
```

### Run Containers Locally

```bash
# Run frontend container
docker run -d --name citricloud-frontend -p 8080:80 ghcr.io/tunedsyntax/citricloud-frontend:latest

# Run backend container
docker run -d --name citricloud-backend -p 4000:4000 ghcr.io/tunedsyntax/citricloud-backend:latest

# Run both containers
docker run -d --name citricloud-frontend -p 8080:80 ghcr.io/tunedsyntax/citricloud-frontend:latest; docker run -d --name citricloud-backend -p 4000:4000 ghcr.io/tunedsyntax/citricloud-backend:latest
```

### Manage Containers

```bash
# View running containers
docker ps

# View running containers (formatted)
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}"

# Stop containers
docker stop citricloud-frontend citricloud-backend

# Remove containers
docker rm citricloud-frontend citricloud-backend

# Stop and remove in one command
docker stop citricloud-frontend citricloud-backend; docker rm citricloud-frontend citricloud-backend

# View container logs
docker logs citricloud-frontend
docker logs citricloud-backend

# View logs in real-time
docker logs -f citricloud-frontend
docker logs -f citricloud-backend

# Execute command in running container
docker exec -it citricloud-frontend /bin/sh
```

### Docker Registry (GHCR)

```bash
# Login to GitHub Container Registry
docker login ghcr.io

# Push frontend image to registry
docker push ghcr.io/tunedsyntax/citricloud-frontend:latest

# Push backend image to registry
docker push ghcr.io/tunedsyntax/citricloud-backend:latest

# Pull images from registry
docker pull ghcr.io/tunedsyntax/citricloud-frontend:latest
docker pull ghcr.io/tunedsyntax/citricloud-backend:latest

# Remove local images
docker rmi ghcr.io/tunedsyntax/citricloud-frontend:latest
docker rmi ghcr.io/tunedsyntax/citricloud-backend:latest
```

### Docker System Management

```bash
# Check Docker version
docker version

# Get Docker disk usage
docker system df

# Prune unused containers and images
docker system prune

# Prune unused containers only
docker container prune

# Prune unused images only
docker image prune
```

---

## Kubernetes (kubectl) Commands

### Cluster Connection

```bash
# View current kubectl context
kubectl config current-context

# List all available contexts
kubectl config get-contexts

# Get cluster information
kubectl cluster-info

# View all nodes in cluster
kubectl get nodes

# View node details
kubectl get nodes -o wide

# Describe specific node
kubectl describe node k3s-prod-01
```

### Namespace Management

```bash
# View available namespaces
kubectl get namespaces

# Create namespace (if not using manifests)
kubectl create namespace citricloud

# Delete namespace
kubectl delete namespace citricloud
```

### Deployment Management

```bash
# Apply all manifests
kubectl apply -f k8s/

# Apply specific manifest file
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml

# View deployments
kubectl get deployments
kubectl get deployments -n citricloud

# View deployment details
kubectl describe deployment citricloud-backend -n citricloud
kubectl describe deployment citricloud-frontend -n citricloud

# Delete deployment
kubectl delete deployment citricloud-backend -n citricloud
```

### Pod Management

```bash
# View all pods
kubectl get pods
kubectl get pods -n citricloud

# View pods with detailed info
kubectl get pods -o wide -n citricloud

# Describe specific pod
kubectl describe pod <pod-name> -n citricloud

# View pod logs
kubectl logs <pod-name> -n citricloud

# View logs in real-time
kubectl logs -f <pod-name> -n citricloud

# Execute command in pod
kubectl exec -it <pod-name> -n citricloud -- /bin/sh

# Delete pod (will be recreated by deployment)
kubectl delete pod <pod-name> -n citricloud
```

### Service Management

```bash
# View services
kubectl get services
kubectl get services -n citricloud

# View service details
kubectl describe service citricloud-backend -n citricloud

# Port forward to service
kubectl port-forward service/citricloud-frontend 8080:80 -n citricloud
kubectl port-forward service/citricloud-backend 4000:4000 -n citricloud

# Delete service
kubectl delete service citricloud-backend -n citricloud
```

### Ingress Management

```bash
# View ingress
kubectl get ingress
kubectl get ingress -n citricloud

# View ingress details
kubectl describe ingress citricloud -n citricloud

# Delete ingress
kubectl delete ingress citricloud -n citricloud

# Check ingress controller
kubectl get pods -n ingress-nginx
```

### Image Update & Rollout

```bash
# Rollout restart deployment (pulls latest image)
kubectl rollout restart deployment/citricloud-backend -n citricloud
kubectl rollout restart deployment/citricloud-frontend -n citricloud

# Rollout restart both
kubectl rollout restart deployment/citricloud-backend -n citricloud; kubectl rollout restart deployment/citricloud-frontend -n citricloud

# View rollout history
kubectl rollout history deployment/citricloud-backend -n citricloud

# Rollback to previous version
kubectl rollout undo deployment/citricloud-backend -n citricloud

# Watch rollout status
kubectl rollout status deployment/citricloud-backend -n citricloud
```

### Certificate Management

```bash
# View certificates
kubectl get certificates -n citricloud

# Describe certificate
kubectl describe certificate citricloud-tls -n citricloud

# View certificate requests
kubectl get certificaterequests -n citricloud

# Describe certificate request
kubectl describe certificaterequest <name> -n citricloud

# Manually trigger certificate renewal
kubectl delete certificate citricloud-tls -n citricloud
```

### Debugging

```bash
# Get all resources in namespace
kubectl get all -n citricloud

# View events in namespace (sorted by time)
kubectl get events -n citricloud --sort-by='.lastTimestamp'

# Watch pods in real-time
kubectl get pods -n citricloud -w

# Get detailed description of all resources
kubectl describe all -n citricloud

# Check kubelet logs on node
kubectl debug node/<node-name> -it --image=ubuntu
```

---

## Git Commands

### Repository Management

```bash
# Clone repository
git clone https://github.com/TunedSyntax/citricloud.git

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push changes to main
git push origin main

# Push specific branch
git push origin <branch-name>

# Pull latest changes
git pull origin main

# View status
git status

# View commit history
git log --oneline

# View changes
git diff

# Create branch
git branch <branch-name>

# Switch branch
git checkout <branch-name>

# Create and switch to new branch
git checkout -b <branch-name>

# Delete branch
git branch -d <branch-name>

# Merge branch
git merge <branch-name>
```

### Stashing

```bash
# Stash current changes
git stash

# View stashes
git stash list

# Apply stashed changes
git stash pop

# Apply specific stash
git stash apply stash@{0}
```

---

## Local Development

### Node.js Commands

```bash
# Install dependencies
npm install

# Install production dependencies only
npm install --production

# Run development server (Vite)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server Ports

```bash
# Frontend (Vite dev server with HMR)
npm run dev
# Access at: http://localhost:5173

# Frontend (Docker container)
# Access at: http://localhost:8080

# Backend (Node.js)
# Runs on: http://localhost:4000
```

---

## Image Registry

### Docker Hub Alternative

```bash
# If using Docker Hub instead of GHCR:

# Build for Docker Hub
docker build -t username/citricloud-frontend:latest ./frontend
docker build -t username/citricloud-backend:latest ./backend

# Login to Docker Hub
docker login

# Push to Docker Hub
docker push username/citricloud-frontend:latest
docker push username/citricloud-backend:latest

# Pull from Docker Hub
docker pull username/citricloud-frontend:latest
docker pull username/citricloud-backend:latest
```

---

## Cluster Management

### Initial Setup Commands

```bash
# Install kubectl (if not already installed)
# Download from: https://kubernetes.io/docs/tasks/tools/

# Configure kubectl context to remote k3s cluster
kubectl config set-cluster <cluster-name> --server=https://<ip>:6443

# Configure credentials
kubectl config set-credentials <user-name> --token=<token>

# Create context
kubectl config set-context <context-name> --cluster=<cluster-name> --user=<user-name>

# Use context
kubectl config use-context <context-name>
```

### Deployment Workflow

```bash
# Complete deployment workflow:

# Step 1: Build images locally
docker build -t ghcr.io/tunedsyntax/citricloud-frontend:latest ./frontend
docker build -t ghcr.io/tunedsyntax/citricloud-backend:latest ./backend

# Step 2: Login to registry
docker login ghcr.io

# Step 3: Push images to registry
docker push ghcr.io/tunedsyntax/citricloud-frontend:latest
docker push ghcr.io/tunedsyntax/citricloud-backend:latest

# Step 4: Apply manifests to k3s cluster
kubectl apply -f k8s/

# Step 5: Rollout restart to pull latest images
kubectl rollout restart deployment/citricloud-backend -n citricloud
kubectl rollout restart deployment/citricloud-frontend -n citricloud

# Step 6: Verify deployment
kubectl get pods -n citricloud
kubectl get services -n citricloud
kubectl get ingress -n citricloud
```

---

## Troubleshooting

### Debug Deployment Issues

```bash
# Check pod status
kubectl get pods -n citricloud -o wide

# Check pod events
kubectl describe pod <pod-name> -n citricloud

# View pod logs
kubectl logs <pod-name> -n citricloud

# View previous pod logs (if crashed)
kubectl logs <pod-name> -n citricloud --previous

# Check deployment status
kubectl describe deployment citricloud-backend -n citricloud

# Check service connectivity
kubectl get svc -n citricloud
kubectl describe svc citricloud-backend -n citricloud

# Test pod connectivity
kubectl exec -it <pod-name> -n citricloud -- curl http://localhost:4000/api/health

# Check ingress status
kubectl describe ingress citricloud -n citricloud

# View all events in namespace
kubectl get events -n citricloud --sort-by='.lastTimestamp'
```

### Common Issue Resolution

```bash
# Image pull errors - check authentication
kubectl get secrets -n citricloud
kubectl describe secrets regcred -n citricloud

# Certificate issues
kubectl describe certificate citricloud-tls -n citricloud
kubectl get certificaterequests -n citricloud

# DNS issues
kubectl exec -it <pod-name> -n citricloud -- nslookup kubernetes.default

# Network issues
kubectl exec -it <pod-name> -n citricloud -- ping <service-ip>

# If pods won't start, force delete and restart
kubectl delete pod <pod-name> -n citricloud --grace-period=0 --force
kubectl rollout restart deployment/citricloud-backend -n citricloud
```

### Docker Troubleshooting

```bash
# Check Docker status
docker version

# Test Docker connectivity
docker ps

# View Docker daemon logs
docker logs

# Check image details
docker inspect ghcr.io/tunedsyntax/citricloud-frontend:latest

# Check container resource usage
docker stats

# Clean up everything
docker system prune -a
```

---

## Environment Variables

### Required for kubectl Context

```bash
# Example environment setup (Linux/Mac)
export KUBECONFIG=/path/to/kubeconfig.yaml

# Or set context in kubeconfig file directly
# Location: ~/.kube/config
```

### Required for Docker Registry Auth

```bash
# GHCR authentication requires:
# - GitHub username
# - GitHub personal access token (with read:packages, write:packages scope)

# Can be passed as:
# 1. Interactive prompt: docker login ghcr.io
# 2. Environment: echo $TOKEN | docker login ghcr.io -u USERNAME --password-stdin
# 3. Docker config file: ~/.docker/config.json (auto-created by docker login)
```

---

## Quick Reference

### One-Line Deployment

```bash
# Full deployment cycle
docker build -t ghcr.io/tunedsyntax/citricloud-frontend:latest ./frontend && docker build -t ghcr.io/tunedsyntax/citricloud-backend:latest ./backend && docker push ghcr.io/tunedsyntax/citricloud-frontend:latest && docker push ghcr.io/tunedsyntax/citricloud-backend:latest && kubectl apply -f k8s/ && kubectl rollout restart deployment/citricloud-backend -n citricloud && kubectl rollout restart deployment/citricloud-frontend -n citricloud
```

### Status Check

```bash
# Quick health check
echo "=== Cluster Status ===" && kubectl get nodes && echo -e "\n=== Pods ===" && kubectl get pods -n citricloud && echo -e "\n=== Services ===" && kubectl get svc -n citricloud && echo -e "\n=== Ingress ===" && kubectl get ingress -n citricloud
```

### Full Cleanup (Warning: Destructive)

```bash
# Delete entire namespace and all resources
kubectl delete namespace citricloud

# Local Docker cleanup
docker stop citricloud-frontend citricloud-backend; docker rm citricloud-frontend citricloud-backend
```

---

## Notes

- All `kubectl` commands assume the context is set to your k3s cluster
- Image registry paths use `ghcr.io/tunedsyntax/` - replace with your registry
- Namespace is `citricloud` - check manifests for your actual namespace
- Authentication (GHCR token, kubectl kubeconfig) must be configured before running commands
- Port numbers: Frontend (8080), Backend (4000), Kubernetes API (6443)

For more information, see:
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
