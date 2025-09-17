#!/bin/bash

# Development startup script for Animal Welfare Platform

echo "🐾 Starting Animal Welfare Platform - Development Mode"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Using Aiven MySQL - no need to start local database
echo "📊 Using Aiven MySQL database..."
echo "🔗 Database: animal-service-yash-2ea6.b.aivencloud.com:16849"

# Start backend
echo "🚀 Starting backend server..."
cd ../backend
mvn spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 15

# Start frontend (using Python's built-in server)
echo "🌐 Starting frontend server..."
cd ../frontend
python -m http.server 5500 &
FRONTEND_PID=$!

echo "✅ Development environment is ready!"
echo "📊 Database: Aiven MySQL (animal-service-yash-2ea6.b.aivencloud.com)"
echo "🚀 Backend API: http://localhost:8080/api/all"
echo "🌐 Frontend: http://localhost:5500"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ All services stopped"
}

# Set trap to cleanup on script exit
trap cleanup EXIT

# Wait for user to stop
wait