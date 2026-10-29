#!/bin/bash

echo "🚀 CodeArena Setup Script"
echo "========================="

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment file
if [ ! -f ".env.local" ]; then
    echo "⚙️ Creating environment file..."
    cp .env.example .env.local 2>/dev/null || cat > .env.local << EOF
# Database
DATABASE_URL="file:./dev.db"

# Judge0 API
RAPIDAPI_KEY="ca1fc996a0msh5afbb041e5d6ea6p1b042ajsn32b729830a4b"

# Authentication (Optional)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

# OpenAI (Optional)
OPENAI_API_KEY=""

# JWT Secret
JWT_SECRET="your-secret-key-here"
EOF
    echo "✅ Environment file created"
else
    echo "✅ Environment file already exists"
fi

# Setup database
echo "🗄️ Setting up database..."
npx prisma migrate dev --name init

# Seed database
echo "🌱 Seeding database..."
npx tsx lib/seed.ts

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. npm run dev        # Start development server"
echo "2. Open http://localhost:3000"
echo "3. Check SETUP.md for detailed documentation"
echo ""
echo "Happy coding! 🚀"