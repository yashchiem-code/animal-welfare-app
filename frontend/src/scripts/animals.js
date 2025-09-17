// Animals page functionality
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
                        <img class="animal-image" src="${animal.imageUrl}" alt="${animal.name}" onerror="this.src='../assets/placeholder-animal.jpg'">
                        
                        <h3>${animal.name}</h3>
                        <p><strong>Breed:</strong> ${animal.breed}</p>
                        <p><strong>Location:</strong> ${animal.location}</p>
                        <p><strong>Reported By:</strong> ${animal.reportedBy}</p>
                        
                        <div class="card-footer">
                            <p><strong>Status:</strong> <span class="status-${animal.status}">${animal.status}</span></p>
                        </div>
                    </div>
                    
                    <div class="map-container">
                        <iframe 
                            class="map-frame"
                            src="https://www.google.com/maps/embed/v1/place?key=${CONFIG.GOOGLE_MAPS.API_KEY}&q=${animal.lat},${animal.lng}&zoom=14"
                            allowfullscreen
                            loading="lazy">
                        </iframe>
                    </div>
                </div>
            `;

            cardsContainer.appendChild(card);
        });

        if (animals.length === 0) {
            cardsContainer.innerHTML = '<p class="no-results">No animals have been reported yet.</p>';
        }

    } catch (error) {
        console.error("Error fetching animals:", error);
        cardsContainer.innerHTML = `<p class="error">Unable to load animals. Please try again later.</p>`;
    }
});