# 🚨 EMERGENCY: SSH ACCESS RECOVERY

## YOU ARE HERE BECAUSE SSH IS BROKEN - FOLLOW THESE STEPS EXACTLY

Your SSH is broken because `k8s/traefik.yaml` was deployed with `hostPort` configuration, which interferes with the host's network stack.

---

## IMMEDIATE RECOVERY STEPS

### Step 1: Access Hetzner Web Console

1. Go to https://console.hetzner.cloud/
2. Log in to your Hetzner Cloud account
3. Click on your project
4. Click on your server (49.13.95.148)
5. Click the **"Console"** button (top right area)
6. A web-based terminal will open

**✅ You should now see a login prompt in the web console**

### Step 2: Login via Console

In the web console, enter your username and password:
```
login: root
password: [your-password]
```

Or whatever username you use (might be `ubuntu`, `debian`, etc.)

**✅ You should now be logged into your server via web console**

### Step 3: Delete the Problematic Traefik Deployment

Copy and paste these commands ONE AT A TIME into the console:

```bash
# First, let's see if the problematic deployment exists
kubectl get deployment -n kube-system traefik

# If it shows a traefik deployment, delete it:
kubectl delete deployment traefik -n kube-system

# Or if you have the yaml file on the server:
kubectl delete -f k8s/traefik.yaml
```

**✅ The deployment should be deleted**

### Step 4: Verify SSH Service is Running

```bash
# Check SSH status
systemctl status sshd

# If it shows as inactive or failed, restart it:
systemctl restart sshd

# Verify it's running now:
systemctl status sshd
```

You should see `active (running)` in green.

### Step 5: Check Firewall Rules

```bash
# Check if firewall is blocking SSH
# If you're using ufw:
ufw status

# If SSH (port 22) is not allowed, add it:
ufw allow 22/tcp
```

**Important:** Also check Hetzner Cloud Console:
- Go to your project in Hetzner Cloud Console
- Click "Firewalls" in the left menu
- Make sure you have a rule allowing **TCP port 22** from **0.0.0.0/0**

### Step 6: Test SSH Connection

From your local computer, try to SSH again:
```bash
ssh your-username@49.13.95.148
```

**✅ SSH should now work!**

---

## If SSH Still Doesn't Work

### Additional Troubleshooting

1. **Check if SSH is listening on port 22:**
   ```bash
   netstat -tlnp | grep :22
   # or
   ss -tlnp | grep :22
   ```

2. **Check SSH configuration:**
   ```bash
   cat /etc/ssh/sshd_config | grep Port
   ```
   Make sure it says `Port 22` (or is commented out, which defaults to 22)

3. **Check system logs for errors:**
   ```bash
   journalctl -u sshd -n 50 --no-pager
   ```

4. **Restart networking (CAREFUL - might disconnect console):**
   ```bash
   systemctl restart networking
   # Wait 10 seconds, then:
   systemctl restart sshd
   ```

5. **Check if K3s is using hostNetwork or hostPort:**
   ```bash
   kubectl get pods -A -o yaml | grep -E "hostNetwork|hostPort"
   ```
   If you see `hostPort: 22`, that's the problem! Delete that pod/deployment.

---

## Prevent This From Happening Again

### ❌ NEVER Deploy These Files:
- `k8s/traefik.yaml` (uses hostPort - BREAKS SSH)

### ✅ ALWAYS Use Instead:
1. **K3s built-in Traefik** (comes pre-installed, no deployment needed)
2. **k8s/traefik-helmchart.yaml** (uses NodePort - safe)

### Proper Deployment Steps:

```bash
# 1. Deploy your application (NOT Traefik)
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

# 2. Deploy ingress (uses K3s built-in Traefik)
kubectl apply -f k8s/ingress-simple.yaml
```

That's it! K3s has Traefik built-in, so you don't need to deploy Traefik separately.

---

## Why This Happened

The `k8s/traefik.yaml` file contains:
```yaml
ports:
  - name: web
    containerPort: 80
    hostPort: 80        # ← This is the problem
  - name: websecure
    containerPort: 443
    hostPort: 443       # ← This too
```

`hostPort` binds directly to the host's network interface. This interferes with the kernel's network stack and can break:
- SSH connectivity
- DNS resolution
- Other host-level networking

**Solution:** Use K3s built-in Traefik or NodePort service types instead.

---

## Quick Reference

| Problem | Solution |
|---------|----------|
| Can't SSH | Use Hetzner web console |
| Need to delete Traefik | `kubectl delete deployment traefik -n kube-system` |
| SSH service stopped | `systemctl restart sshd` |
| Firewall blocking SSH | Add port 22 in Hetzner Cloud Console |
| Need proper Traefik | Use K3s built-in (no deployment needed) |

---

## Contact

If you're still having issues after following all these steps:
1. Take screenshots of any error messages
2. Run `kubectl get pods -A` and share the output
3. Run `systemctl status sshd` and share the output
4. Check `/var/log/auth.log` for SSH errors

---

**Remember:** K3s comes with Traefik pre-installed. You don't need to deploy Traefik yourself!
