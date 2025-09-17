-- Initialize Aiven MySQL database with sample data
-- Run this script against your Aiven MySQL database

-- Use the default database
USE defaultdb;

-- The animals table will be created automatically by Hibernate
-- But we can insert some sample data after the application starts

-- Sample data (run this after the application has created the table)
-- You can run this manually or through the application

-- Note: The application will automatically create the table structure
-- based on the JPA entity definitions when it starts up

-- To insert sample data, you can use the API endpoints or run these INSERT statements:

/*
INSERT INTO animals (name, breed, location, lat, lng, image_url, fed_today, last_fed, status, reported_by, reported_at) VALUES
('Buddy', 'Golden Retriever', 'Central Park, New York', 40.7829, -73.9654, 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400', FALSE, NULL, 'reported', 'John Doe', NOW()),
('Whiskers', 'Tabby Cat', 'Brooklyn Bridge, NY', 40.7061, -73.9969, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', TRUE, NOW(), 'available', 'Jane Smith', NOW()),
('Max', 'German Shepherd', 'Times Square, NY', 40.7580, -73.9855, 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400', FALSE, NULL, 'pending', 'Mike Johnson', NOW());
*/

-- Create indexes for better performance (these will be created automatically by the application)
-- CREATE INDEX idx_animals_status ON animals(status);
-- CREATE INDEX idx_animals_fed_today ON animals(fed_today);
-- CREATE INDEX idx_animals_location ON animals(location);