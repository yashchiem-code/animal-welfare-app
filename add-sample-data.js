// Script to add sample data to the database
const sampleAnimals = [
    {
        name: "Buddy",
        breed: "Golden Retriever",
        location: "Central Park, Kolkata",
        lat: 22.5726,
        lng: 88.3639,
        imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
        reportedBy: "John Doe"
    },
    {
        name: "Whiskers",
        breed: "Persian Cat",
        location: "Salt Lake, Kolkata",
        lat: 22.5675,
        lng: 88.4107,
        imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
        reportedBy: "Jane Smith"
    },
    {
        name: "Max",
        breed: "German Shepherd",
        location: "Park Street, Kolkata",
        lat: 22.5448,
        lng: 88.3426,
        imageUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop",
        reportedBy: "Mike Johnson"
    },
    {
        name: "Luna",
        breed: "Labrador Mix",
        location: "Howrah Bridge Area",
        lat: 22.5851,
        lng: 88.3468,
        imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop",
        reportedBy: "Sarah Wilson"
    },
    {
        name: "Tiger",
        breed: "Bengal Cat",
        location: "New Market, Kolkata",
        lat: 22.5569,
        lng: 88.3507,
        imageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop",
        reportedBy: "Raj Patel"
    },
    {
        name: "Rocky",
        breed: "Street Dog",
        location: "Esplanade, Kolkata",
        lat: 22.5697,
        lng: 88.3467,
        imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
        reportedBy: "Priya Sharma"
    },
    {
        name: "Mittens",
        breed: "Tabby Cat",
        location: "Gariahat, Kolkata",
        lat: 22.5186,
        lng: 88.3639,
        imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
        reportedBy: "David Brown"
    },
    {
        name: "Charlie",
        breed: "Beagle",
        location: "Ballygunge, Kolkata",
        lat: 22.5354,
        lng: 88.3644,
        imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
        reportedBy: "Lisa Davis"
    }
];

async function addSampleData() {
    const baseUrl = 'http://localhost:8080';

    console.log('🐾 Adding sample animals to database...');

    for (let i = 0; i < sampleAnimals.length; i++) {
        const animal = sampleAnimals[i];

        try {
            const response = await fetch(`${baseUrl}/api/animals/report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(animal)
            });

            if (response.ok) {
                const savedAnimal = await response.json();
                console.log(`✅ Added ${animal.name} (ID: ${savedAnimal.id})`);
            } else {
                console.error(`❌ Failed to add ${animal.name}: ${response.status}`);
            }
        } catch (error) {
            console.error(`❌ Error adding ${animal.name}:`, error.message);
        }

        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('🎉 Sample data addition complete!');
    console.log('🌐 Visit http://localhost:3000 to see the animals');
}

// Run the script
addSampleData();