# Kubernetes Manifests

This directory contains Kubernetes manifests for deploying citricloud on K3s.

## Traefik Configuration Options

There are multiple Traefik configuration files in this directory. **Use only ONE of these approaches:**

### ⚠️ Option 1: Use K3s Built-in Traefik (RECOMMENDED)

K3s comes with Traefik pre-installed and pre-configured. This is the simplest and most reliable option.

**No additional Traefik deployment needed!** Just deploy your application:

```bash
kubectl apply -f namespace.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f ingress-simple.yaml  # or ingress.yaml
```

### Option 2: Use HelmChart Configuration (Alternative)

If you need custom Traefik configuration, use the HelmChart approach:

```bash
kubectl apply -f traefik-helmchart.yaml
kubectl apply -f traefik-helmchartconfig.yaml  # optional, for Let's Encrypt
```

This uses `NodePort` which is safer than `hostPort`.

### ⚠️ Option 3: Manual Traefik Deployment (NOT RECOMMENDED)

**DO NOT use `traefik.yaml`** - it uses `hostPort` which can break SSH connectivity!

The `traefik.yaml` file is kept for reference but should NOT be used as it:
- Uses `hostPort` bindings on ports 80 and 443
- Can interfere with host networking
- May cause SSH connectivity issues
- Conflicts with K3s built-in Traefik

## Application Manifests

- `namespace.yaml` - Creates the `citricloud` namespace
- `backend-deployment.yaml` - Backend Express app deployment
- `backend-service.yaml` - Backend service
- `frontend-deployment.yaml` - Frontend React/Vite app deployment
- `frontend-service.yaml` - Frontend service
- `ingress-simple.yaml` - Simple ingress configuration
- `ingress.yaml` - Ingress with TLS configuration

## Deployment Order

1. Create namespace:
   ```bash
   kubectl apply -f namespace.yaml
   ```

2. Deploy backend:
   ```bash
   kubectl apply -f backend-deployment.yaml
   kubectl apply -f backend-service.yaml
   ```

3. Deploy frontend:
   ```bash
   kubectl apply -f frontend-deployment.yaml
   kubectl apply -f frontend-service.yaml
   ```

4. Deploy ingress:
   ```bash
   kubectl apply -f ingress-simple.yaml
   ```

## Verification

Check that everything is running:

```bash
# Check pods
kubectl -n citricloud get pods

# Check services
kubectl -n citricloud get svc

# Check ingress
kubectl -n citricloud get ingress

# Check Traefik (K3s built-in)
kubectl -n kube-system get pods | grep traefik
```

## Troubleshooting

See the main [SETUP.md](../SETUP.md) file for troubleshooting steps, especially the SSH connectivity issues section.
