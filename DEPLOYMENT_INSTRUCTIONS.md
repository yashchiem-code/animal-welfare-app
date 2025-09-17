# 🚀 Deployment Instructions - Animal Welfare Platform

## Quick Deployment Guide

### Step 1: Deploy Backend (Railway)

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **New Project → Deploy from GitHub repo**
4. **Select:** `yashchiem-code/animal-welfare-app`
5. **Root Directory:** `backend`
6. **Add Environment Variables:**
   ```
   SPRING_PROFILES_ACTIVE=prod
   SPRING_DATASOURCE_URL=jdbc:mysql://your-database-host:port/defaultdb?useSSL=true&requireSSL=true&serverTimezone=UTC&allowPublicKeyRetrieval=true
   SPRING_DATASOURCE_USERNAME=your-username
   SPRING_DATASOURCE_PASSWORD=your-password
   ```
7. **Deploy** - You'll get a URL like: `https://your-app.railway.app`

### Step 2: Update Frontend Configuration

1. **Copy your Railway backend URL**
2. **Update `frontend/env-config.js`:**
   ```javascript
   API_BASE_URL: window.location.hostname === 'localhost'
       ? 'http://localhost:8080'
       : 'https://YOUR-ACTUAL-RAILWAY-URL.railway.app', // Replace this
   ```
3. **Commit and push changes:**
   ```bash
   git add frontend/env-config.js
   git commit -m "Update backend URL for production"
   git push origin main
   ```

### Step 3: Deploy Frontend (Vercel)

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **New Project → Import Git Repository**
4. **Select:** `yashchiem-code/animal-welfare-app`
5. **Configure Project:**
   - Framework Preset: **Other**
   - Root Directory: **frontend**
   - Build Command: `echo "Static site - no build needed"`
   - Output Directory: `./`
6. **Deploy**

### Step 4: Test Your Live Application

After deployment, you'll have:
- **Backend API:** `https://your-app.railway.app/api/all`
- **Frontend:** `https://your-app.vercel.app`

Test these URLs:
1. Backend health: `https://your-app.railway.app/api/all`
2. Frontend homepage: `https://your-app.vercel.app`
3. Animals page: `https://your-app.vercel.app/src/pages/animals.html`
4. Report page: `https://your-app.vercel.app/src/pages/report.html`

### Step 5: Add Sample Data to Production

Run this script to populate your production database:

```javascript
// Update the baseUrl to your Railway backend URL
const baseUrl = 'https://your-app.railway.app';

// Then run the add-sample-data.js script
node add-sample-data.js
```

## Resume Links

Once deployed, add these to your resume:

```
🐾 Animal Welfare Platform
Live Demo: https://your-app.vercel.app
API: https://your-app.railway.app/api/all
GitHub: https://github.com/yashchiem-code/animal-welfare-app
Tech Stack: Spring Boot, MySQL, JavaScript, OpenStreetMap, Docker
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Check that your backend URL is correct in `env-config.js`
   - Verify Railway deployment is successful

2. **Database Connection**
   - Ensure all environment variables are set in Railway
   - Check Railway logs for connection errors

3. **Maps Not Loading**
   - OpenStreetMap should work without any configuration
   - Check browser console for JavaScript errors

4. **Images Not Loading**
   - Unsplash images should load automatically
   - Fallback to SVG placeholder if images fail

### Railway Logs:
```bash
# View logs in Railway dashboard or CLI
railway logs
```

### Vercel Logs:
```bash
# View logs in Vercel dashboard
# Functions → View Function Logs
```

## Cost Breakdown

| Service | Free Tier | Monthly Cost |
|---------|-----------|--------------|
| Railway | 500 hours | $0 |
| Vercel | Unlimited | $0 |
| Aiven MySQL | 1 month free | $8 after trial |
| OpenStreetMap | Unlimited | $0 |
| **Total** | | **$8/month** |

## Production Features

✅ **Security:** Environment variables, no hardcoded secrets  
✅ **Performance:** CDN delivery, optimized images  
✅ **Reliability:** Health checks, error handling  
✅ **Scalability:** Serverless frontend, containerized backend  
✅ **Monitoring:** Built-in logs and metrics  
✅ **SEO:** Proper meta tags and structure  

Your application is production-ready! 🎉