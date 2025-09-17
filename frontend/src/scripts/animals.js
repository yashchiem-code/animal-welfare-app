// Animals page functionality

// Initialize individual animal map
function initAnimalMap(animal) {
    const mapId = `map-${animal.id}`;
    const mapElement = document.getElementById(mapId);

    if (!mapElement || typeof L === 'undefined') {
        console.warn(`Map element ${mapId} not found or Leaflet not loaded`);
        return;
    }

    try {
        // Create map centered on animal location
        const map = L.map(mapId).setView([animal.lat, animal.lng], 15);

        // Add OpenStreetMap tile layer
        L.tileLayer(CONFIG.MAP.TILE_LAYER, {
            attribution: CONFIG.MAP.ATTRIBUTION,
            maxZoom: 19
        }).addTo(map);

        // Create custom marker icon based on status
        const iconColor = {
            'reported': '#4f46e5',
            'available': '#059669',
            'pending': '#d97706',
            'adopted': '#dc2626'
        }[animal.status] || '#4f46e5';

        const customIcon = L.divIcon({
            html: `<div style="background-color: ${iconColor}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
                    <circle cx="11" cy="4" r="2"/>
                    <circle cx="18" cy="8" r="2"/>
                    <circle cx="20" cy="16" r="2"/>
                    <path d="m9 10 5-5 5 5"/>
                    <path d="m15 5 5 5v7"/>
                </svg>
            </div>`,
            className: 'custom-div-icon',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        // Add marker for the animal
        const marker = L.marker([animal.lat, animal.lng], {
            icon: customIcon,
            title: animal.name
        }).addTo(map);

        // Add popup with animal info
        marker.bindPopup(`
            <div class="animal-info-card">
                <h3>${animal.name}</h3>
                <p><strong>Breed:</strong> ${animal.breed}</p>
                <p><strong>Location:</strong> ${animal.location}</p>
                <p><strong>Status:</strong> <span class="status-${animal.status}">${animal.status}</span></p>
            </div>
        `);

    } catch (error) {
        console.error(`Error initializing map for ${animal.name}:`, error);
        mapElement.innerHTML = '<p style="padding: 20px; text-align: center; color: #6b7280;">Map unavailable</p>';
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.getElementById("animalCards");

    try {
        // Fetch animals from the backend
        const url = API_UTILS.getFullUrl(CONFIG.API.ENDPOINTS.ALL_ANIMALS);
        const animals = await API_UTILS.fetchWithErrorHandling(url);

        // Render each animal as a card
        animals.forEach((animal) => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <div class="animal-detail-card">
                    <div class="animal-info">
                        <img class="animal-image" src="${animal.imageUrl || '../assets/placeholder-animal.svg'}" alt="${animal.name}" loading="lazy" onerror="this.src='../assets/placeholder-animal.svg'; this.onerror=null;">
                        
                        <h3>${animal.name}</h3>
                        <p><strong>Breed:</strong> ${animal.breed}</p>
                        <p><strong>Location:</strong> ${animal.location}</p>
                        <p><strong>Reported By:</strong> ${animal.reportedBy}</p>
                        
                        <div class="card-footer">
                            <p><strong>Status:</strong> <span class="status-${animal.status}">${animal.status}</span></p>
                        </div>
                    </div>
                    
                    <div class="map-container">
                        <div id="map-${animal.id}" class="map-frame"></div>
                    </div>
                </div>
            `;

            cardsContainer.appendChild(card);
        });

        // Initialize maps for each animal after DOM is ready
        setTimeout(() => {
            animals.forEach((animal) => {
                initAnimalMap(animal);
            });
        }, 100);

        if (animals.length === 0) {
            cardsContainer.innerHTML = '<p class="no-results">No animals have been reported yet.</p>';
        }

    } catch (error) {
        console.error("Error fetching animals:", error);
        cardsContainer.innerHTML = `<p class="error">Unable to load animals. Please try again later.</p>`;
    }
});