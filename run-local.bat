@echo off
echo 🐾 Starting Animal Welfare Platform - Local Development
echo.

echo 📋 Checking prerequisites...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed or not running
    echo Please install Docker Desktop and try again
    pause
    exit /b 1
)

echo ✅ Docker is available
echo.

echo 🏗️ Building and starting services...
docker-compose -f docker-compose.local.yml up --build -d

echo.
echo ⏳ Waiting for services to start...
timeout /t 30 /nobreak >nul

echo.
echo 🔍 Checking service status...

echo Testing backend...
curl -s http://localhost:8080/api/all >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend is running at http://localhost:8080
) else (
    echo ⚠️ Backend is starting up... (may take a few more seconds)
)

echo Testing frontend...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend is running at http://localhost:3000
) else (
    echo ⚠️ Frontend is starting up...
)

echo.
echo 🚀 Application should be ready!
echo 🌐 Frontend: http://localhost:3000
echo 🚀 Backend API: http://localhost:8080/api/all
echo 📊 Database: Aiven MySQL (cloud)
echo.
echo 📝 To stop the application: docker-compose -f docker-compose.local.yml down
echo 📝 To view logs: docker-compose -f docker-compose.local.yml logs -f
echo.
pause