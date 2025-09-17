// Environment configuration - load this before other scripts
window.ENV_CONFIG = {
    API_BASE_URL: window.location.hostname === 'localhost'
        ? 'http://localhost:8080'
        : 'https://your-railway-app.railway.app', // Update this with your Railway URL
    GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY_HERE' // Replace with your actual API key
};