// Environment configuration - load this before other scripts
window.ENV_CONFIG = {
    API_BASE_URL: window.location.hostname === 'localhost'
        ? 'http://localhost:8080'
        : 'https://your-railway-app.railway.app', // Update this with your Railway URL
    // No API key needed for OpenStreetMap - it's completely free!
};