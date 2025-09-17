#!/bin/bash

# Test Aiven MySQL database connection

echo "🔍 Testing Aiven MySQL database connection..."

# Database connection details
DB_HOST="animal-service-yash-2ea6.b.aivencloud.com"
DB_PORT="16849"
DB_NAME="defaultdb"
DB_USER="avnadmin"
DB_PASS="your-database-password"

# Test connection using mysql client (if available)
if command -v mysql &> /dev/null; then
    echo "📊 Testing with MySQL client..."
    mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASS -D $DB_NAME --ssl-mode=REQUIRED -e "SELECT 1 as connection_test;" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ Database connection successful!"
    else
        echo "❌ Database connection failed!"
    fi
else
    echo "⚠️  MySQL client not found. Testing with curl..."
    # Alternative test - try to start the Spring Boot application briefly
    echo "🚀 Starting Spring Boot application to test database connection..."
    cd ../backend
    timeout 30s mvn spring-boot:run 2>&1 | grep -q "Started AnimalWelfareApplication"
    if [ $? -eq 0 ]; then
        echo "✅ Application started successfully - database connection working!"
    else
        echo "❌ Application failed to start - check database connection!"
    fi
fi

echo "📋 Database Details:"
echo "   Host: $DB_HOST"
echo "   Port: $DB_PORT"
echo "   Database: $DB_NAME"
echo "   Username: $DB_USER"
echo "   SSL: Required"