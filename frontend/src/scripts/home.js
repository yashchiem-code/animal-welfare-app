// Home page functionality
let animals = [];

// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const feedingFilter = document.getElementById('feedingFilter');
const animalsGrid = document.getElementById('animalsGrid');

// Toggle mobile menu
if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Fetch animals from backend
async function fetchAnimals() {
    try {
        const url = API_UTILS.getFullUrl(CONFIG.API.ENDPOINTS.ALL_ANIMALS);
        animals = await API_UTILS.fetchWithErrorHandling(url);
        renderAnimals();
    } catch (error) {
        console.error("Failed to fetch animals:", error);
        showError("Failed to load animals. Please try again later.");
    }
}

// Filter animals based on search and filters
function filterAnimals() {
    const searchQuery = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;
    const feedingValue = feedingFilter.value;

    return animals.filter(animal => {
        const matchesSearch =
            animal.name.toLowerCase().includes(searchQuery) ||
            animal.breed.toLowerCase().includes(searchQuery) ||
            animal.location.toLowerCase().includes(searchQuery);

        const matchesStatus =
            statusValue === 'all' || animal.status === statusValue;

        const matchesFeeding =
            feedingValue === 'all' ||
            (feedingValue === 'fed' && animal.fedToday) ||
            (feedingValue === 'unfed' && !animal.fedToday);

        return matchesSearch && matchesStatus && matchesFeeding;
    });
}

// Create HTML for an animal card
function createAnimalCard(animal) {
    const statusClass = {
        available: 'status-available',
        pending: 'status-pending',
        adopted: 'status-adopted',
        reported: 'status-reported'
    }[animal.status] || 'status-reported';

    const lastFedDate = animal.lastFed ? new Date(animal.lastFed).toLocaleDateString() : 'Never';

    return `
        <div class="animal-card">
            <div class="animal-image">
                <img src="${animal.imageUrl}" alt="${animal.name}" onerror="this.src='src/assets/placeholder-animal.jpg'">
                <span class="status-badge ${statusClass}">
                    ${animal.status.charAt(0).toUpperCase() + animal.status.slice(1)}
                </span>
            </div>
            <div class="animal-info">
                <h3>${animal.name}</h3>
                <p class="breed">${animal.breed}</p>
                <div class="animal-meta">
                    <div class="meta-item">
                        <i data-lucide="map-pin"></i>
                        <span>${animal.location}</span>
                    </div>
                    <div class="meta-item">
                        <i data-lucide="clock"></i>
                        <span>Last fed: ${lastFedDate}</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button 
                        class="btn btn-feed" 
                        ${animal.fedToday ? 'disabled' : ''} 
                        onclick="handleFeed('${animal.id}')">
                        ${animal.fedToday ? 'Fed Today' : 'Mark as Fed'}
                    </button>
                    ${animal.status === 'available' || animal.status === 'reported' ? `
                        <button 
                            class="btn btn-adopt" 
                            onclick="handleAdopt('${animal.id}')">
                            <i data-lucide="heart"></i>
                            Adopt
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Render animals to the grid
function renderAnimals() {
    const filteredAnimals = filterAnimals();
    animalsGrid.innerHTML = '';

    if (filteredAnimals.length === 0) {
        animalsGrid.innerHTML = '<p class="no-results">No animals found matching your criteria.</p>';
        return;
    }

    filteredAnimals.forEach(animal => {
        animalsGrid.innerHTML += createAnimalCard(animal);
    });

    // Reinitialize icons for new content
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Show error message
function showError(message) {
    animalsGrid.innerHTML = `<p class="error">${message}</p>`;
}

// Event handlers
async function handleFeed(id) {
    const animal = animals.find(a => a.id == id);
    if (animal && !animal.fedToday) {
        try {
            const url = API_UTILS.getFullUrl(`${CONFIG.API.ENDPOINTS.FEED_ANIMAL}/${id}`);
            await API_UTILS.fetchWithErrorHandling(url, {
                method: 'PUT',
                body: JSON.stringify({
                    fedToday: true,
                    lastFed: new Date().toISOString()
                })
            });

            animal.fedToday = true;
            animal.lastFed = new Date().toISOString();
            renderAnimals();
        } catch (error) {
            console.error("Failed to update feeding status:", error);
            alert("Failed to update feeding status. Please try again.");
        }
    }
}

async function handleAdopt(id) {
    const animal = animals.find(a => a.id == id);
    if (animal && (animal.status === 'available' || animal.status === 'reported')) {
        try {
            const url = API_UTILS.getFullUrl(`${CONFIG.API.ENDPOINTS.ADOPT_ANIMAL}/${id}`);
            await API_UTILS.fetchWithErrorHandling(url, {
                method: 'PUT',
                body: JSON.stringify({ status: 'pending' })
            });

            animal.status = 'pending';
            renderAnimals();
        } catch (error) {
            console.error("Failed to update adoption status:", error);
            alert("Failed to update adoption status. Please try again.");
        }
    }
}

// Event listeners
if (searchInput) searchInput.addEventListener('input', renderAnimals);
if (statusFilter) statusFilter.addEventListener('change', renderAnimals);
if (feedingFilter) feedingFilter.addEventListener('change', renderAnimals);

// Initial fetch of animals
fetchAnimals();