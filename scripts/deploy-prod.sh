#!/bin/bash

# Production deployment script for Animal Welfare Platform

echo "🐾 Deploying Animal Welfare Platform - Production Mode"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build and start all services with Aiven database
echo "🏗️ Building and starting production services..."
cd deployment
docker-compose -f docker-compose.aiven.yml up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are running
echo "🔍 Checking service status..."

# Check backend health
if curl -f http://localhost:8080/api/all > /dev/null 2>&1; then
    echo "✅ Backend is running"
else
    echo "❌ Backend is not responding"
fi

# Check frontend
if curl -f http://localhost > /dev/null 2>&1; then
    echo "✅ Frontend is running"
else
    echo "❌ Frontend is not responding"
fi

echo "🚀 Production deployment complete!"
echo "🌐 Application: http://localhost"
echo "🚀 API: http://localhost/api/all"
echo "📊 Database: Aiven MySQL"
echo ""
echo "To stop: docker-compose -f docker-compose.aiven.yml down"
echo "To view logs: docker-compose -f docker-compose.aiven.yml logs -f"