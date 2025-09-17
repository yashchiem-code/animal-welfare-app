// Environment configuration - load this before other scripts
window.ENV_CONFIG = {
    API_BASE_URL: window.location.hostname === 'localhost'
        ? 'http://localhost:8080'
        : 'https://animal-welfare-backend-6fuk.onrender.com', // Your live Render backend
    // No API key needed for OpenStreetMap - it's completely free!
};