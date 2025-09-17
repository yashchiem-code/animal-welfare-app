# 🚀 Deployment Checklist for Resume

## Pre-Deployment Setup

### 1. Backend Deployment (Railway)
- [ ] Sign up at [Railway.app](https://railway.app)
- [ ] Connect GitHub repository
- [ ] Create new project → Deploy from GitHub
- [ ] Select your repository
- [ ] Choose `backend` folder as root directory
- [ ] Set environment variables:
  ```
  SPRING_PROFILES_ACTIVE=prod
  SPRING_DATASOURCE_URL=your-database-url
  SPRING_DATASOURCE_USERNAME=your-username
  SPRING_DATASOURCE_PASSWORD=your-password
  ```
- [ ] Deploy and note your Railway URL (e.g., `https://your-app-name.railway.app`)

### 2. Update Frontend Configuration
- [ ] Edit `frontend/env-config.js`
- [ ] Replace `https://your-railway-app.railway.app` with your actual Railway URL
- [ ] Commit and push changes

### 3. Frontend Deployment (Vercel)
- [ ] Sign up at [Vercel.com](https://vercel.com)
- [ ] Import project from GitHub
- [ ] Configure build settings:
  - Framework Preset: Other
  - Root Directory: `frontend`
  - Build Command: `echo "Static site"`
  - Output Directory: `./`
- [ ] Deploy

### 4. Final Configuration
- [ ] Test backend API: `https://your-railway-url.railway.app/api/all`
- [ ] Test frontend: `https://your-vercel-url.vercel.app`
- [ ] Update README.md with live demo links

## Alternative Free Hosting Options

### Option 1: Render (Backend) + Netlify (Frontend)
**Render (Backend):**
- 750 hours/month free
- Auto-deploy from GitHub
- Built-in database options

**Netlify (Frontend):**
- Unlimited static hosting
- Form handling
- Edge functions

### Option 2: Heroku (Full Stack)
**Note:** Heroku removed free tier, but you can use:
- Railway (500 hours/month)
- Render (750 hours/month)
- Fly.io (limited free tier)

### Option 3: GitHub Pages + Railway
**GitHub Pages (Frontend only):**
- Free static hosting
- Custom domain support
- Automatic deployments

## Security Improvements for Production

1. **Environment Variables:**
   ```javascript
   // In production, use environment variables
   GOOGLE_MAPS_API_KEY=your_actual_key
   DATABASE_PASSWORD=secure_password
   ```

2. **API Key Security:**
   - Restrict Google Maps API key to your domain
   - Use HTTP referrer restrictions

3. **Database Security:**
   - Use environment variables for credentials
   - Enable SSL connections (already configured)

## Testing Your Deployment

1. **Backend Health Check:**
   ```bash
   curl https://your-railway-url.railway.app/api/all
   ```

2. **Frontend Functionality:**
   - [ ] Map loads correctly
   - [ ] Can view animals
   - [ ] Can report new animals
   - [ ] API calls work

3. **Cross-Origin Requests:**
   - [ ] Frontend can communicate with backend
   - [ ] No CORS errors in browser console

## Resume Integration

Add to your resume:
```
🐾 Animal Welfare Platform
Live Demo: https://your-vercel-url.vercel.app
API: https://your-railway-url.railway.app/api/all
Tech: Spring Boot, MySQL, JavaScript, Google Maps API
```

## Troubleshooting

### Common Issues:
1. **CORS Errors:** Check backend CORS configuration
2. **API Not Loading:** Verify Railway URL in env-config.js
3. **Map Not Loading:** Check Google Maps API key and restrictions
4. **Database Connection:** Verify Aiven MySQL credentials

### Quick Fixes:
```bash
# Check backend logs on Railway
railway logs

# Test API endpoint
curl -X GET https://your-app.railway.app/api/all

# Check frontend console for errors
# Open browser dev tools → Console tab
```

## Cost Breakdown (Free Tiers)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| Railway | 500 hours/month | $5 credit monthly |
| Vercel | Unlimited | 100GB bandwidth |
| Aiven MySQL | 1 month free | Then $8/month |
| Google Maps | $200 credit | 28,000 map loads |

**Total Monthly Cost After Free Credits:** ~$8 (just for database)

## Next Steps After Deployment

1. **Custom Domain:** Add your own domain to Vercel
2. **SSL Certificate:** Automatic with Vercel/Netlify
3. **Monitoring:** Set up uptime monitoring
4. **Analytics:** Add Google Analytics
5. **Performance:** Optimize images and API calls