# CodeArena - Complete Setup Guide

## Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

## Quick Setup

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd CodeArena
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

### 3. Database Setup
```bash
npx prisma migrate dev --name init
npx tsx lib/seed.ts
```

### 4. Start Development
```bash
npm run dev
```

## Environment Variables

Create `.env.local` with:

```env
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
```

## Project Structure

```
CodeArena/
├── app/                    # Next.js App Router
│   ├── problems/          # Problem pages
│   ├── contests/          # Contest system
│   ├── interview/         # Interview prep
│   ├── collaborate/       # Real-time collaboration
│   ├── leaderboard/       # Rankings
│   └── api/              # API endpoints
├── components/            # Reusable components
├── lib/                   # Utilities & database
├── prisma/               # Database schema & migrations
└── public/               # Static assets
```

## Features

### ✅ Implemented
- **Code Editor**: Monaco editor with syntax highlighting
- **Judge0 Integration**: Code execution with multiple languages
- **Problem Database**: SQLite with Prisma ORM
- **Local Storage**: Code persistence across sessions
- **Responsive UI**: LeetCode-style interface
- **Test Cases**: Individual case selection and testing

### 🚧 In Progress
- User authentication
- Real-time collaboration
- Contest system
- Advanced analytics

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open database GUI
npx prisma migrate   # Run database migrations
```

## Database Schema

- **Users**: User profiles and authentication
- **Problems**: Coding problems with test cases
- **Submissions**: Code submissions and results
- **Contests**: Contest management
- **ContestParticipants**: Contest participation tracking

## API Endpoints

- `GET /api/problems` - Fetch all problems
- `POST /api/execute` - Execute code with Judge0
- `POST /api/save-code` - Save user code (placeholder)

## Troubleshooting

### Common Issues

1. **Database not found**
   ```bash
   npx prisma migrate dev --name init
   ```

2. **Judge0 API errors**
   - Check RAPIDAPI_KEY in .env.local
   - Verify internet connection

3. **Monaco editor not loading**
   - Clear browser cache
   - Check console for errors

### Development Tips

- Use `localStorage` for temporary data persistence
- Problems are stored in SQLite database
- Code execution uses Judge0 cloud API
- UI follows dark/light theme patterns

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## Support

For issues and questions:
- Check existing GitHub issues
- Create new issue with detailed description
- Include error logs and environment details