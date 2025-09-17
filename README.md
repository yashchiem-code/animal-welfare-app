# Animal Welfare Platform

A full-stack web application for tracking and managing stray animals with Google Maps integration.

## 🚀 Live Demo
**Frontend:** [Deploy to get your link]  
**API:** [Deploy to get your link]  
**Status:** Ready for deployment ✅

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript, Google Maps API
- **Backend**: Spring Boot, Java 21
- **Database**: MySQL (Aiven Cloud)

## 📱 Features
- Report stray animals with location
- Interactive Google Maps integration
- Track feeding and adoption status
- Responsive design

## 🚀 Quick Deploy

### Backend (Railway/Render)
1. Connect your GitHub repo
2. Set environment variables:
   ```
   SPRING_PROFILES_ACTIVE=prod
   ```
3. Deploy automatically

### Frontend (Vercel/Netlify)
1. Connect your GitHub repo
2. Set build directory: `frontend`
3. Update API URL in `frontend/src/scripts/config.js`
4. Deploy

## 🔧 Local Development
```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend (serve on port 5500)
cd frontend
python -m http.server 5500
```

## 📝 Configuration
- Update Google Maps API key in `frontend/src/scripts/config.js`
- Database is pre-configured for Aiven MySQL