// Configuration file for the Animal Welfare application
const CONFIG = {
    // API Configuration
    API: {
        BASE_URL: window.ENV_CONFIG?.API_BASE_URL || 'http://localhost:8080',
        ENDPOINTS: {
            ALL_ANIMALS: '/api/all',
            REPORT_ANIMAL: '/api/animals/report',
            FEED_ANIMAL: '/api/feed',
            ADOPT_ANIMAL: '/api/adopt'
        }
    },

    // OpenStreetMap Configuration (Free Alternative)
    MAP: {
        DEFAULT_CENTER: {
            lat: 22.572645,
            lng: 88.363892
        },
        DEFAULT_ZOOM: 13,
        TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        ATTRIBUTION: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },

    // Application Settings
    APP: {
        NAME: 'Animal Welfare Tracker',
        VERSION: '1.0.0'
    }
};

// Utility functions
const API_UTILS = {
    getFullUrl: (endpoint) => `${CONFIG.API.BASE_URL}${endpoint}`,

    async fetchWithErrorHandling(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
};

// Initialize Lucide icons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});