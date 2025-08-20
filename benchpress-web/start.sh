#!/bin/bash

# Benchpress Web Interface Startup Script

echo "🚀 Starting Benchpress Web Interface..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the benchpress-web directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the application
echo "🏗️  Building the application..."
npm run build

# Start the application
echo "🌐 Starting the web server..."
echo "🔗 Open your browser and navigate to: http://localhost:3000"
echo "✨ Press Ctrl+C to stop the server"

npm start

