# 🔧 Vercel 500 Error - Diagnostic Checklist

The 500 error is usually caused by missing environment variables or MongoDB connection issues. Follow this checklist:

## ✅ Step 1: Verify Environment Variables on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **Todo-list-javascript** project
3. Go to **Settings** → **Environment Variables**

**Required Variables (must all be present):**

```
✓ MONGO_URI        = mongodb+srv://username:password@cluster.mongodb.net/todo_db
✓ JWT_SECRET       = your_super_secret_key_change_this
✓ JWT_EXPIRES_IN   = 7d
✓ NODE_ENV         = production
```

**If any are missing, add them now!**

---

## ✅ Step 2: Check MongoDB Setup

### If using MongoDB Atlas (Cloud):

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Log in and find your project
3. Click **Databases** → Select your cluster
4. Click **Connect**
5. Copy the connection string that looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todo_db
   ```
6. **Add to Vercel as `MONGO_URI`**

### ⚠️ CRITICAL: IP Whitelist
In MongoDB Atlas:
1. Go to **Security** → **Network Access**
2. Click **Add IP Address**
3. Choose **Allow access from anywhere** (pick `0.0.0.0/0` for development)
   - ⚠️ Do NOT do this in production!
4. Click **Confirm**

---

## ✅ Step 3: Redeploy on Vercel

After adding environment variables:

1. Go to Vercel Dashboard → Your Project
2. Go to **Deployments**
3. Find your latest deployment → Click the 3-dots menu
4. Click **Redeploy** → **Confirm redeploy**

**Wait 2-3 minutes for deployment...**

---

## ✅ Step 4: Test Your API

After deployment completes, test these:

### Test 1: Health Check (should work even without DB)
```
GET https://your-project.vercel.app/
```

Should return:
```json
{
  "success": true,
  "message": "🚀 Todo API is running!",
  "database": "✅ Connected" or "❌ Not Connected"
}
```

### Test 2: Register User (needs working DB)
```
POST https://your-project.vercel.app/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Test 3: Login (needs working DB)
```
POST https://your-project.vercel.app/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 🔍 Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| 500 with no error details | Missing MONGO_URI env var | Add MONGO_URI to Vercel Environment Variables |
| Connection timeout | MongoDB IP not whitelisted | Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access |
| `Cast to ObjectId failed` | Invalid MongoDB connection | Verify MONGO_URI is correct |
| 404 on root path | Routes misconfigured | Check `vercel.json` is in root directory |
| Timeout on register/login | Slow MongoDB | Check MongoDB cluster status |

---

## 🚀 If Still Getting 500 Error

### Check Vercel Function Logs:

1. Vercel Dashboard → Your Project
2. Go to **Deployments** → Latest deployment
3. Scroll down to **Function Logs**
4. Look for error messages

### Common Log Errors:

```
"MONGO_URI is not defined"
→ Add MONGO_URI to Vercel environment variables

"connection ECONNREFUSED"
→ MongoDB IP whitelist issue

"authentication failed"
→ Wrong MongoDB username/password in MONGO_URI
```

---

## 📝 Vercel Environment Variables Format Reference

Get these exact values:

### MongoDB Atlas Example:
```
MONGO_URI=mongodb+srv://user123:pass456@cluster0.abc123.mongodb.net/todo_db?retryWrites=true&w=majority
```

### JWT Secret Example:
```
JWT_SECRET=aB$Pp9xQ2mL#nK7wR4vZ8$yF5jT3cX6hN9
```

---

## Quick Test Command

Use this to test without frontend:

```bash
# Test health check
curl https://your-project.vercel.app/

# Test register
curl -X POST https://your-project.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"123456"}'
```

---

**If you've added all environment variables and still see 500 error, check the Vercel Function Logs - that will show the exact error!**
