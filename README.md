# CodeArena - Advanced Coding Platform

A comprehensive coding platform with enhanced features for collaboration, AI assistance, and interview preparation.

## Features

### 🚀 Core Features
- **Multi-language Support**: Java, C++, C, Python, JavaScript, Go, Rust
- **Real-time Collaboration**: Work together on problems with live code sharing
- **AI Assistant**: Get help when stuck with intelligent coding assistance
- **Project Workspace**: Create and collaborate on full projects
- **Interview Preparation**: Practice with company-specific problems

### 💎 Premium Features
- **FAANG Company Problems**: Access to problems from top tech companies
- **Advanced Analytics**: Detailed performance tracking and insights
- **Mock Interviews**: AI-powered interview simulations
- **System Design Practice**: Scalable system architecture problems

### 🎯 Problem Categories
- **Difficulty Levels**: Easy, Medium, Hard
- **Categories**: Arrays, Strings, Trees, Graphs, Dynamic Programming, etc.
- **Company Tags**: Google, Amazon, Microsoft, Apple, Meta, Netflix

### 🤝 Collaboration Features
- **Real-time Code Editing**: Multiple users can edit simultaneously
- **Voice/Video Chat**: Built-in communication tools
- **Screen Sharing**: Share your screen during collaboration
- **Team Projects**: Work on larger projects with your team

### 🏆 Contests & Competitions
- **Weekly Contests**: Regular competitive programming contests
- **Company Challenges**: Contests sponsored by tech companies
- **Leaderboards**: Track your ranking and progress
- **Achievement System**: Earn badges and rewards

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Code Editor**: Monaco Editor
- **Real-time**: Socket.io
- **AI Integration**: OpenAI API
- **Database**: Prisma (PostgreSQL)
- **Deployment**: Vercel

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `OPENAI_API_KEY`
   - `DATABASE_URL`
   - `RAPIDAPI_KEY` (for Judge0)

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
CodeArena/
├── app/                    # Next.js App Router
│   ├── problems/          # Problem listing and details
│   ├── contests/          # Contest pages
│   ├── interview/         # Interview preparation
│   ├── projects/          # Project workspace
│   └── collaborate/       # Collaboration features
├── components/            # Reusable UI components
├── lib/                   # Utilities and types
└── .amazonq/             # Project rules and guidelines
```

## Key Components

### Code Editor
- Monaco Editor integration
- Multi-language syntax highlighting
- Real-time collaboration support
- Code execution and testing

### AI Assistant
- Context-aware help
- Problem explanation
- Code debugging assistance
- Hint system

### Collaboration System
- Real-time code synchronization
- Team chat functionality
- Video conferencing integration
- Shared project workspace

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details