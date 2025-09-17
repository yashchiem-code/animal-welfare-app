// Report animal page functionality
let map, geocoder, marker;

// Initialize Google Maps
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: CONFIG.GOOGLE_MAPS.DEFAULT_CENTER,
        zoom: CONFIG.GOOGLE_MAPS.DEFAULT_ZOOM,
    });

    geocoder = new google.maps.Geocoder();
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
    });

    // Fetch existing animals and add markers
    fetchExistingAnimals();

    // Update map on location input change
    const locationInput = document.getElementById("location");
    if (locationInput) {
        locationInput.addEventListener("input", debounce(updateMapLocation, 500));
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

// Update map location based on input
async function updateMapLocation(event) {
    const location = event.target.value;
    if (location.length > 3) {
        try {
            const results = await geocoder.geocode({ address: location });
            if (results.results && results.results.length > 0) {
                const { lat, lng } = results.results[0].geometry.location;
                const position = { lat: lat(), lng: lng() };
                map.setCenter(position);
                marker.setPosition(position);
            }
        } catch (error) {
            console.error("Geocoding error:", error);
        }
    }
}

// Fetch existing animals from the backend
async function fetchExistingAnimals() {
    try {
        const url = API_UTILS.getFullUrl(CONFIG.API.ENDPOINTS.ALL_ANIMALS);
        const animals = await API_UTILS.fetchWithErrorHandling(url);

        animals.forEach((animal) => {
            const animalMarker = new google.maps.Marker({
                position: { lat: animal.lat, lng: animal.lng },
                map: map,
                title: animal.name,
                icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="4" r="2"/>
                            <circle cx="18" cy="8" r="2"/>
                            <circle cx="20" cy="16" r="2"/>
                            <path d="m9 10 5-5 5 5"/>
                            <path d="m15 5 5 5v7"/>
                        </svg>
                    `),
                    scaledSize: new google.maps.Size(30, 30)
                }
            });

            // Add info window (popup card) to the marker
            const infoWindow = new google.maps.InfoWindow({
                content: createAnimalInfoCard(animal),
            });

            animalMarker.addListener("click", () => {
                infoWindow.open(map, animalMarker);
            });
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
                // Convert location to lat/lng using Geocoding API
                const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(animalData.location)}&key=${CONFIG.GOOGLE_MAPS.API_KEY}`;
                const geocodeResponse = await fetch(geocodeUrl);

                if (!geocodeResponse.ok) {
                    throw new Error(`Geocoding failed: ${geocodeResponse.status}`);
                }

                const geocodeData = await geocodeResponse.json();

                if (geocodeData.status !== "OK" || geocodeData.results.length === 0) {
                    throw new Error("Invalid location provided or no results found.");
                }

                // Extract latitude and longitude
                const { lat, lng } = geocodeData.results[0].geometry.location;

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

                // Refresh the map with new animal
                if (map) {
                    fetchExistingAnimals();
                }

            } catch (error) {
                console.error("Error reporting animal:", error);
                alert("Failed to report the animal. Please check your location and try again.");
            }
        });
    }

    // Load Google Maps script dynamically
    loadGoogleMapsScript();
});

// Load Google Maps script
function loadGoogleMapsScript() {
    if (CONFIG.GOOGLE_MAPS.API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
        console.warn('Please update your Google Maps API key in config.js');
        document.getElementById('map').innerHTML = '<p class="error">Please configure Google Maps API key</p>';
        return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${CONFIG.GOOGLE_MAPS.API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}