#!/bin/bash

echo "🚀 MrPorn Project Setup"
echo "========================"

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
    echo "✅ Node.js version $NODE_VERSION is compatible"
else
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to Node.js 18.0.0 or higher"
    echo "   You can use nvm: nvm install 18 && nvm use 18"
    exit 1
fi

# Check npm version
NPM_VERSION=$(npm -v)
REQUIRED_NPM="8.0.0"

if [ "$(printf '%s\n' "$REQUIRED_NPM" "$NPM_VERSION" | sort -V | head -n1)" = "$REQUIRED_NPM" ]; then
    echo "✅ npm version $NPM_VERSION is compatible"
else
    echo "❌ npm version $NPM_VERSION is too old. Please upgrade to npm 8.0.0 or higher"
    exit 1
fi

# Remove old node_modules and lock files
echo "🧹 Cleaning up old dependencies..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "✅ Setup complete! You can now run:"
echo "   npm start    - Start development server"
echo "   npm run build - Build for production" 