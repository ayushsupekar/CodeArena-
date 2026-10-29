@echo off
echo 🚀 CodeArena Setup Script
echo =========================

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js detected

:: Install dependencies
echo 📦 Installing dependencies...
call npm install

:: Setup environment file
if not exist ".env.local" (
    echo ⚙️ Creating environment file...
    (
        echo # Database
        echo DATABASE_URL="file:./dev.db"
        echo.
        echo # Judge0 API
        echo RAPIDAPI_KEY="ca1fc996a0msh5afbb041e5d6ea6p1b042ajsn32b729830a4b"
        echo.
        echo # Authentication ^(Optional^)
        echo NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
        echo CLERK_SECRET_KEY=""
        echo.
        echo # OpenAI ^(Optional^)
        echo OPENAI_API_KEY=""
        echo.
        echo # JWT Secret
        echo JWT_SECRET="your-secret-key-here"
    ) > .env.local
    echo ✅ Environment file created
) else (
    echo ✅ Environment file already exists
)

:: Setup database
echo 🗄️ Setting up database...
call npx prisma migrate dev --name init

:: Seed database
echo 🌱 Seeding database...
call npx tsx lib/seed.ts

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. npm run dev        # Start development server
echo 2. Open http://localhost:3000
echo 3. Check SETUP.md for detailed documentation
echo.
echo Happy coding! 🚀
pause