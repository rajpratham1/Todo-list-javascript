# Vercel Deployment Guide 🚀

## What Was Fixed

✅ **Created `vercel.json`** - Tells Vercel how to build and run your app  
✅ **Modified `server.js`** - Now exports app for serverless functions  
✅ **Configured build settings** - Properly routes all requests to your Express app

---

## Complete Deployment Steps

### 1. **Update Your `.env` File**
Create a `.env` file in the root with:
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/todo_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

### 2. **Add Environment Variables to Vercel Dashboard**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings → Environment Variables**
4. Add these variables:
   - `MONGO_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string (use online generator)
   - `NODE_ENV` - Set to `production`
   - `JWT_EXPIRES_IN` - Set to `7d`

### 3. **Deploy to Vercel**

**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option B: Connect GitHub Repository**
1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select root directory (if needed)
5. Add environment variables
6. Click Deploy

### 4. **Verify Deployment**

After deployment, test these endpoints:

```bash
# Health check
curl https://your-vercel-url.vercel.app/

# Register a new user
curl -X POST https://your-vercel-url.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Login
curl -X POST https://your-vercel-url.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

---

## Troubleshooting 404 Errors

| Issue | Solution |
|-------|----------|
| 404 on root path | Make sure `vercel.json` is in the root directory |
| Routes not found | Check that environment variables are set on Vercel |
| Database connection fails | Verify `MONGO_URI` is correct and whitelisted |
| 500 errors | Check Vercel logs: `vercel logs` or dashboard Logs tab |

---

## Project Structure

```
files..1111/
├── vercel.json (NEW - Configuration for Vercel)
├── README.md
├── .git/
└── todo-api/
    └── todo-api/
        ├── server.js (UPDATED - Now exports app)
        ├── package.json
        ├── config/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── routes/
        └── utils/
```

---

## Important Notes

⚠️ **Never commit `.env` file** - Add to `.gitignore`:
```
.env
.env.local
node_modules/
```

✨ **All routes automatically work** - No additional configuration needed for:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/todos
- POST /api/todos
- PUT /api/todos/:id
- DELETE /api/todos/:id

---

## MongoDB Atlas Configuration (if using MongoDB)

1. Create free database at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Whitelist Vercel's IP range (use `0.0.0.0/0` for testing)
4. Add to Vercel environment variables as `MONGO_URI`

Good luck with your deployment! 🎉
