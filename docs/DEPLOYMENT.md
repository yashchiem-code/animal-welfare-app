# Deployment Guide

This guide covers different deployment options for the Animal Welfare Platform.

## 🚀 Quick Start

### Development Environment

1. **Prerequisites**
   - Docker and Docker Compose
   - Java 21+
   - Maven 3.6+
   - Python 3.x (for frontend server)

2. **Start Development Environment**
   ```bash
   chmod +x scripts/start-dev.sh
   ./scripts/start-dev.sh
   ```

3. **Access Services**
   - Frontend: http://localhost:5500
   - Backend API: http://localhost:8080/api/all
   - Database Admin: http://localhost:8081

### Production Deployment

1. **Using Docker Compose**
   ```bash
   chmod +x scripts/deploy-prod.sh
   ./scripts/deploy-prod.sh
   ```

2. **Access Application**
   - Application: http://localhost
   - API: http://localhost/api/all

## 📋 Configuration

### Environment Variables

Create a `.env` file in the deployment directory:

```env
# Aiven MySQL Database Configuration
DATABASE_URL=your-database-url
DB_USERNAME=your-username
DB_PASSWORD=your-password

# Google Maps API
GOOGLE_MAPS_API_KEY=your_api_key_here

# Application Settings
SPRING_PROFILES_ACTIVE=prod
```

### Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API (optional)
4. Create credentials (API Key)
5. Update the API key in `frontend/src/scripts/config.js`

## 🐳 Docker Deployment Options

### Option 1: Full Stack with Docker Compose (Aiven Database)

```bash
cd deployment
docker-compose -f docker-compose.aiven.yml up -d
```

### Option 2: Backend Only (with Aiven Database)

```bash
cd backend
docker build -t animal-welfare-backend .
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL="your-database-url" \
  -e SPRING_DATASOURCE_USERNAME=your-username \
  -e SPRING_DATASOURCE_PASSWORD=your-password \
  animal-welfare-backend
```

### Option 3: Frontend with Nginx

```bash
cd frontend
docker run -d -p 80:80 \
  -v $(pwd):/usr/share/nginx/html \
  -v $(pwd)/../deployment/nginx.conf:/etc/nginx/nginx.conf \
  nginx:alpine
```

## ☁️ Cloud Deployment

### Railway (Recommended for Backend)

1. Connect your GitHub repository to Railway
2. Set environment variables:
   ```
   SPRING_PROFILES_ACTIVE=prod
   SPRING_DATASOURCE_URL=your_railway_mysql_url
   SPRING_DATASOURCE_USERNAME=your_username
   SPRING_DATASOURCE_PASSWORD=your_password
   ```
3. Deploy automatically on push

### Vercel (Recommended for Frontend)

1. Connect your GitHub repository to Vercel
2. Set build settings:
   - Build Command: `echo "Static site, no build needed"`
   - Output Directory: `frontend`
3. Set environment variables for API URL

### Heroku

1. **Backend Deployment**
   ```bash
   cd backend
   heroku create your-app-name
   heroku addons:create cleardb:ignite
   heroku config:set SPRING_PROFILES_ACTIVE=prod
   git push heroku main
   ```

2. **Frontend Deployment**
   - Use Heroku's static buildpack
   - Set API URL to your backend Heroku app

## 🔧 Manual Deployment

### Backend (Spring Boot)

1. **Build the application**
   ```bash
   cd backend
   mvn clean package -DskipTests
   ```

2. **Run with production profile**
   ```bash
   java -jar target/animal-welfare-backend-1.0.0.jar \
     --spring.profiles.active=prod \
     --spring.datasource.url=jdbc:mysql://your-host:3306/animal_welfare \
     --spring.datasource.username=your_username \
     --spring.datasource.password=your_password
   ```

### Frontend (Static Files)

1. **Update configuration**
   - Edit `frontend/src/scripts/config.js`
   - Set correct API URL and Google Maps API key

2. **Deploy to web server**
   ```bash
   # Copy files to web server
   scp -r frontend/* user@your-server:/var/www/html/
   
   # Or use rsync
   rsync -av frontend/ user@your-server:/var/www/html/
   ```

## 🔍 Monitoring and Logs

### Docker Logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Application Health Checks
- Backend Health: `GET /api/all`
- Database Connection: Check application logs
- Frontend: Access main page

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check database credentials
   - Ensure database is running
   - Verify network connectivity

2. **CORS Errors**
   - Update CORS configuration in `WebConfig.java`
   - Add your domain to allowed origins

3. **Google Maps Not Loading**
   - Verify API key is correct
   - Check API key restrictions
   - Ensure required APIs are enabled

4. **Port Already in Use**
   ```bash
   # Find process using port
   lsof -i :8080
   
   # Kill process
   kill -9 <PID>
   ```

### Performance Optimization

1. **Database Indexing**
   - Indexes are created automatically via `init.sql`
   - Monitor slow queries

2. **Frontend Caching**
   - Static assets are cached for 1 year
   - API responses can be cached client-side

3. **Backend Optimization**
   - Enable JPA query caching
   - Use connection pooling
   - Monitor memory usage

## 📊 Scaling

### Horizontal Scaling

1. **Load Balancer Setup**
   ```nginx
   upstream backend {
       server backend1:8080;
       server backend2:8080;
       server backend3:8080;
   }
   ```

2. **Database Replication**
   - Master-slave MySQL setup
   - Read replicas for better performance

3. **CDN for Frontend**
   - Use CloudFlare or AWS CloudFront
   - Serve static assets from CDN

### Vertical Scaling

1. **Increase Container Resources**
   ```yaml
   backend:
     deploy:
       resources:
         limits:
           memory: 1G
           cpus: '1.0'
   ```

2. **Database Optimization**
   - Increase MySQL memory settings
   - Optimize queries and indexes