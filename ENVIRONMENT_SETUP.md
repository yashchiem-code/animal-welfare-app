# Environment Setup

## Important Security Note
This repository does NOT contain actual API keys or database passwords for security reasons.

## Setting Up Your Environment

### 1. Create your .env file
Copy `.env.example` to `.env` and update with your actual credentials:

```bash
cp .env.example .env
```

### 2. Update .env with your credentials
```env
# Your Aiven MySQL Database
DATABASE_URL=your-actual-database-url
DB_USERNAME=your-actual-username
DB_PASSWORD=your-actual-password

# Your Google Maps API Key
GOOGLE_MAPS_API_KEY=your-actual-api-key
```

### 3. Update frontend configuration
Edit `frontend/env-config.js` and replace:
```javascript
GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY_HERE'
```

With your actual API key.

## For Deployment

### Railway Environment Variables
Set these in your Railway dashboard:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME` 
- `SPRING_DATASOURCE_PASSWORD`
- `SPRING_PROFILES_ACTIVE=prod`

### Vercel Environment Variables
Set these in your Vercel dashboard:
- `GOOGLE_MAPS_API_KEY`

## Security Best Practices
- Never commit `.env` files
- Use environment variables in production
- Restrict API keys to specific domains
- Rotate credentials regularly