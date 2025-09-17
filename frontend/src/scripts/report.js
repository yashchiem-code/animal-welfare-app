// Report animal page functionality
let map, marker;

// Initialize OpenStreetMap with Leaflet
function initMap() {
    // Create map centered on default location
    map = L.map('map').setView([CONFIG.MAP.DEFAULT_CENTER.lat, CONFIG.MAP.DEFAULT_CENTER.lng], CONFIG.MAP.DEFAULT_ZOOM);

    // Add OpenStreetMap tile layer (completely free!)
    L.tileLayer(CONFIG.MAP.TILE_LAYER, {
        attribution: CONFIG.MAP.ATTRIBUTION,
        maxZoom: 19
    }).addTo(map);

    // Add a draggable marker for new animal location
    marker = L.marker([CONFIG.MAP.DEFAULT_CENTER.lat, CONFIG.MAP.DEFAULT_CENTER.lng], {
        draggable: true
    }).addTo(map);

    // Update coordinates when marker is dragged
    marker.on('dragend', function (e) {
        const position = e.target.getLatLng();
        updateLocationFromCoords(position.lat, position.lng);
    });

    // Fetch existing animals and add markers
    fetchExistingAnimals();

    // Update map on location input change
    const locationInput = document.getElementById("location");
    if (locationInput) {
        locationInput.addEventListener("input", debounce(updateMapLocation, 1000));
    }
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update map location based on input using free Nominatim geocoding
async function updateMapLocation(event) {
    const location = event.target.value;
    if (location.length > 3) {
        try {
            // Use free Nominatim geocoding service
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`);
            const results = await response.json();

            if (results && results.length > 0) {
                const lat = parseFloat(results[0].lat);
                const lng = parseFloat(results[0].lon);

                // Update map center and marker position
                map.setView([lat, lng], CONFIG.MAP.DEFAULT_ZOOM);
                marker.setLatLng([lat, lng]);
            }
        } catch (error) {
            console.error("Geocoding error:", error);
        }
    }
}

// Update location input from coordinates (reverse geocoding)
async function updateLocationFromCoords(lat, lng) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const result = await response.json();

        if (result && result.display_name) {
            const locationInput = document.getElementById("location");
            if (locationInput) {
                locationInput.value = result.display_name;
            }
        }
    } catch (error) {
        console.error("Reverse geocoding error:", error);
    }
}

// Fetch existing animals from the backend
async function fetchExistingAnimals() {
    try {
        const url = API_UTILS.getFullUrl(CONFIG.API.ENDPOINTS.ALL_ANIMALS);
        const animals = await API_UTILS.fetchWithErrorHandling(url);

        animals.forEach((animal) => {
            // Create custom icon based on status
            const iconColor = {
                'reported': '#4f46e5',
                'available': '#059669',
                'pending': '#d97706',
                'adopted': '#dc2626'
            }[animal.status] || '#4f46e5';

            // Create custom marker with paw print icon
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

            const animalMarker = L.marker([animal.lat, animal.lng], {
                icon: customIcon,
                title: animal.name
            }).addTo(map);

            // Add popup with animal info
            animalMarker.bindPopup(createAnimalInfoCard(animal));
        });
    } catch (error) {
        console.error("Error fetching animals:", error);
    }
}

// Create popup card HTML for an animal
function createAnimalInfoCard(animal) {
    return `
        <div class="animal-info-card">
            <h3>${animal.name}</h3>
            <p><strong>Breed:</strong> ${animal.breed || "Unknown"}</p>
            <p><strong>Location:</strong> ${animal.location}</p>
            <img src="${animal.imageUrl}" alt="${animal.name}" style="width: 100%; max-height: 150px; object-fit: cover; margin: 10px 0; border-radius: 4px;" onerror="this.style.display='none'">
            <p><strong>Reported By:</strong> ${animal.reportedBy || "Anonymous"}</p>
            <p><strong>Status:</strong> <span class="status-${animal.status}">${animal.status}</span></p>
        </div>
    `;
}

// Handle form submission
document.addEventListener("DOMContentLoaded", () => {
    const reportForm = document.getElementById("reportForm");

    if (reportForm) {
        reportForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(reportForm);
            const animalData = {
                name: formData.get("animalName").trim(),
                breed: formData.get("breed").trim(),
                location: formData.get("location").trim(),
                imageUrl: formData.get("imageUrl").trim(),
                reportedBy: formData.get("reporterName").trim()
            };

            // Validate form data
            if (!animalData.name || !animalData.location || !animalData.reportedBy) {
                alert("Please fill in all required fields.");
                return;
            }

            try {
                // Get coordinates from marker position (user can drag marker to exact location)
                const markerPosition = marker.getLatLng();
                const lat = markerPosition.lat;
                const lng = markerPosition.lng;

                // Prepare the complete data payload
                const completeAnimalData = {
                    ...animalData,
                    lat: lat,
                    lng: lng,
                    fedToday: false,
                    lastFed: null,
                    status: "reported",
                    reportedAt: null // Will be set by the backend
                };

                // Send data to the backend
                const url = API_UTILS.getFullUrl(CONFIG.API.ENDPOINTS.REPORT_ANIMAL);
                const savedAnimal = await API_UTILS.fetchWithErrorHandling(url, {
                    method: "POST",
                    body: JSON.stringify(completeAnimalData)
                });

                alert(`Animal reported successfully! ID: ${savedAnimal.id}`);
                reportForm.reset();

                // Add new animal marker to map immediately
                if (map) {
                    const iconColor = '#4f46e5'; // reported status color
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

                    const newMarker = L.marker([lat, lng], {
                        icon: customIcon,
                        title: savedAnimal.name
                    }).addTo(map);

                    newMarker.bindPopup(createAnimalInfoCard(savedAnimal));
                }

            } catch (error) {
                console.error("Error reporting animal:", error);
                alert("Failed to report the animal. Please check your location and try again.");
            }
        });
    }

    // Initialize OpenStreetMap (no API key needed!)
    initializeMap();
});

// Initialize map when page loads (no API key needed!)
function initializeMap() {
    // Wait for Leaflet to load
    if (typeof L !== 'undefined') {
        initMap();
    } else {
        setTimeout(initializeMap, 100);
    }
}