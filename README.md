# 🎭 AI Roleplay Platform

A complete, modern AI roleplay platform built from scratch with realistic character interactions, immersive conversations, and premium features.

## 🎯 Core Mission

Create the most realistic AI roleplay experience where conversations feel like talking to real humans, not AI.

## 🚀 Features

### Character Creator
- Unlimited character creation with detailed customization
- Avatar, banner, bio, personality, appearance
- Voice and speaking style customization
- Greeting, backstory, lore, goals
- Likes, dislikes, relationships, traits, skills
- Example dialogues and memory settings
- Public/Private visibility

### Platform Features
- 🔐 Authentication (Email, Google, Apple)
- 🔍 Character search & categories
- 💬 Real-time chat with streaming responses
- 🧠 Long & short-term memory system
- 📱 Multiple chat sessions
- 🎙️ Voice chat support
- 🔊 Text-to-Speech & Speech-to-Text
- 👥 User profiles with likes, bookmarks, followers
- 📊 Admin dashboard & analytics
- 💳 Subscription system

## 🏗️ Technology Stack

### Frontend
- **Framework**: Next.js 14+
- **UI Library**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand/Redux
- **Real-time**: WebSocket
- **Theme**: Dark & Light Mode

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Cache**: Redis
- **Auth**: JWT + OAuth2
- **AI**: OpenAI-compatible APIs

## 📦 Project Structure

```
Ai-roleplay-platform/
├── apps/
│   ├── web/                 # Next.js frontend
│   └── api/                 # Express backend
├── packages/
│   ├── types/               # Shared TypeScript types
│   ├── utils/               # Shared utilities
│   └── ui/                  # Shared UI components
├─��� docs/                    # Documentation
├── docker-compose.yml       # Local development
├── .env.example             # Environment template
└── package.json             # Monorepo root
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 7+

### Quick Start

```bash
# Clone and install
git clone https://github.com/elunaris72-prog/Ai-roleplay-platform.git
cd Ai-roleplay-platform
npm install

# Setup environment
cp .env.example .env.local

# Start with Docker
docker-compose up -d

# Run migrations
cd apps/api
npx prisma migrate deploy

# Start development
npm run dev
```

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Memory System](./docs/MEMORY_SYSTEM.md)
- [Character Guidelines](./docs/CHARACTER_GUIDELINES.md)

## 🚀 Deployment

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for production deployment guides.

## 📝 License

MIT
