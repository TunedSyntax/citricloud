# Citricloud K3s Setup Guide

---
## 🚨🚨🚨 LOST SSH ACCESS? CLICK HERE: [EMERGENCY-SSH-RECOVERY.md](EMERGENCY-SSH-RECOVERY.md) 🚨🚨🚨
---

## ⚠️ CRITICAL: READ THIS BEFORE DEPLOYING ANYTHING

### ❌ DO NOT DEPLOY `k8s/traefik.yaml` - IT WILL BREAK YOUR SSH!

**Why?** It uses `hostPort` which binds to ports 80/443 on your host and breaks networking.

**What to use instead:**
- ✅ **K3s built-in Traefik** (already installed, no deployment needed)
- ✅ **`k8s/traefik-helmchart.yaml`** (uses NodePort - safe)

**Already deployed it and lost SSH?**
➡️ **[GO TO EMERGENCY RECOVERY GUIDE](EMERGENCY-SSH-RECOVERY.md)** ⬅️

---

## ⚠️ IMPORTANT: Traefik Configuration Warning

**DO NOT use `k8s/traefik.yaml`** - it uses `hostPort` which can break SSH connectivity!

The `hostPort` configuration in `traefik.yaml` binds directly to ports 80 and 443 on the host network interface. This can interfere with the host's networking stack and cause SSH connectivity issues.

**Recommended approaches:**
1. **Use K3s built-in Traefik** (default) - K3s comes with Traefik pre-configured
2. **Use `k8s/traefik-helmchart.yaml`** - Uses NodePort (safer than hostPort)

If you've already deployed `traefik.yaml` and lost SSH access:
```bash
# From Hetzner console or recovery mode, delete the problematic deployment:
# Note: --insecure-skip-tls-verify is needed when accessing from console/recovery mode
kubectl --insecure-skip-tls-verify=true delete -f k8s/traefik.yaml
# Then use K3s built-in Traefik or the HelmChart approach instead
```

## What's Running

- **Frontend (React/Vite)**: citricloud-frontend pods in `citricloud` namespace
- **Backend (Express)**: citricloud-backend pods in `citricloud` namespace
- **Ingress (Traefik)**: Built-in to k3s, routes traffic to services
- **DNS**: citricloud.com points to master IP (49.13.95.148)

## How Traffic Flows

```
User → Cloudflare → Master IP (49.13.95.148)
  ↓
  Firewall (Hetzner): Allow ports 22 (SSH), 80, 443
  ↓
  k3s Traefik Ingress Controller
  ↓
  citricloud-frontend (port 80) + citricloud-backend (port 4000)
```

## What You Need to Do

### 1. Firewall Setup (Hetzner Console)

In Hetzner Cloud → Firewalls → your firewall rules:

**Incoming Rules** (add these):
- **SSH**: Allow port 22 from all IPs (0.0.0.0/0) - **REQUIRED for remote access**
- **HTTP**: Allow port 80 from all IPs (0.0.0.0/0)
- **HTTPS**: Allow port 443 from all IPs (0.0.0.0/0)

DO NOT set up port ranges. Just allow ports 22, 80 and 443 directly.

### 2. DNS Setup (Cloudflare)

In Cloudflare → DNS Records:
- Type: **A**
- Name: **citricloud.com** (or @)
- Content: **49.13.95.148** (your master IP)
- Proxy: **DNS only** (not proxied)

Already done ✅

### 3. Deploy the Ingress

Once the k3s API is stable, run:

```bash
kubectl --insecure-skip-tls-verify=true apply -f k8s/ingress-simple.yaml
```

### 4. Verify It Works

Test from the master:

```bash
# From master node
curl http://localhost/
curl http://localhost:8000/

# From outside (once DNS propagates)
curl http://citricloud.com
curl http://citricloud.com/api/health
```

## TLS/HTTPS (Later)

Once HTTP is working, we'll add Let's Encrypt TLS. For now, keep it simple.

## Commands to Check Status

```bash
# Check pods running
kubectl --insecure-skip-tls-verify=true -n citricloud get pods

# Check services
kubectl --insecure-skip-tls-verify=true -n citricloud get svc

# Check ingress
kubectl --insecure-skip-tls-verify=true -n citricloud get ingress

# Check Traefik pods (built-in)
kubectl --insecure-skip-tls-verify=true -n kube-system get pods | grep traefik

# Traefik status
kubectl --insecure-skip-tls-verify=true -n kube-system get svc traefik
```

## Troubleshooting

### SSH Connectivity Issues

If you can't connect via SSH after deploying K3s/Traefik:

1. **Check if traefik.yaml was deployed with hostPort:**
   ```bash
   # From Hetzner console/recovery mode:
   # Note: --insecure-skip-tls-verify is needed when accessing from console/recovery mode
   kubectl --insecure-skip-tls-verify=true get pods -n kube-system -o yaml | grep hostPort
   ```

2. **Remove the problematic deployment:**
   ```bash
   # Note: --insecure-skip-tls-verify is needed when accessing from console/recovery mode
   kubectl --insecure-skip-tls-verify=true delete -f k8s/traefik.yaml
   ```

3. **Verify SSH is running on the host:**
   ```bash
   # From Hetzner console:
   systemctl status sshd
   # or
   systemctl status ssh
   ```

4. **Check firewall rules allow SSH (port 22):**
   - Go to Hetzner Cloud Console → Firewalls
   - Ensure port 22 is allowed from 0.0.0.0/0

5. **Restart SSH service if needed:**
   ```bash
   systemctl restart sshd
   ```

### Traefik Issues

If ingress says `ADDRESS: <none>`, Traefik isn't running. Check:
```bash
kubectl --insecure-skip-tls-verify=true -n kube-system get pods -l app=traefik
kubectl --insecure-skip-tls-verify=true -n kube-system logs -l app=traefik | tail -50
```

## Next Steps

1. Wait for k3s cluster to stabilize
2. Ensure firewall allows 80/443
3. Check DNS is correct: `nslookup citricloud.com`
4. Apply the ingress: `kubectl apply -f k8s/ingress-simple.yaml`
5. Test: `curl http://citricloud.com`
6. Once working, add TLS
