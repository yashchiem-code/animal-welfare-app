-- Initialize the database with some sample data
USE animal_welfare;

-- Create the animals table if it doesn't exist
CREATE TABLE IF NOT EXISTS animals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    breed VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    lat DOUBLE NOT NULL,
    lng DOUBLE NOT NULL,
    image_url VARCHAR(500),
    fed_today BOOLEAN DEFAULT FALSE,
    last_fed DATETIME,
    status VARCHAR(50) DEFAULT 'reported',
    reported_by VARCHAR(255) NOT NULL,
    reported_at DATETIME NOT NULL
);

-- Insert sample data
INSERT INTO animals (name, breed, location, lat, lng, image_url, fed_today, last_fed, status, reported_by, reported_at) VALUES
('Buddy', 'Golden Retriever', 'Central Park, New York', 40.7829, -73.9654, 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400', FALSE, NULL, 'reported', 'John Doe', NOW()),
('Whiskers', 'Tabby Cat', 'Brooklyn Bridge, NY', 40.7061, -73.9969, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', TRUE, NOW(), 'available', 'Jane Smith', NOW()),
('Max', 'German Shepherd', 'Times Square, NY', 40.7580, -73.9855, 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400', FALSE, NULL, 'pending', 'Mike Johnson', NOW());

-- Create indexes for better performance
CREATE INDEX idx_animals_status ON animals(status);
CREATE INDEX idx_animals_fed_today ON animals(fed_today);
CREATE INDEX idx_animals_location ON animals(location);