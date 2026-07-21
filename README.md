# AI Roleplay Platform 🎭

An advanced AI-powered roleplay platform with character creation, intelligent memory systems, and real-time conversations.

## Features ✨

- **🤖 AI Characters**: Create and interact with sophisticated AI characters
- **🧠 Memory System**: Short-term and long-term memory management for context-aware conversations
- **💬 Real-time Chat**: WebSocket-based messaging with intelligent responses
- **👥 Social Features**: Follow users, bookmark characters, like content
- **💳 Subscription System**: Free, Pro, and Premium tiers
- **📊 Admin Dashboard**: Analytics and platform management
- **🎨 Modern UI**: Dark theme with Tailwind CSS

## Tech Stack 🛠️

### Backend
- **Node.js** with Express
- **PostgreSQL** with Prisma ORM
- **OpenAI API** for AI responses
- **TypeScript**

### Frontend
- **Next.js 14** (React framework)
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Axios** for API requests
- **React Hot Toast** for notifications

## Project Structure 📁

```
Ai-roleplay-platform/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   │   ├── auth.ts
│   │   │   │   ├── characters.ts
│   │   │   │   ├── chatEnhanced.ts
│   │   │   │   ├── admin.ts
│   │   │   │   └── subscriptions.ts
│   │   │   ├── services/
│   │   │   │   ├── memorySystem.ts
│   │   │   │   └── aiService.ts
│   │   │   └── middleware/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   └── package.json
│   │
│   └── web/
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx (Login)
│       │   │   ├── layout.tsx
│       │   │   └── globals.css
│       │   ├── components/
│       │   │   ├── ChatWindow.tsx
│       │   │   ├── CharacterCreator.tsx
│       │   │   ├── AdminDashboard.tsx
│       │   │   ├── SubscriptionManager.tsx
│       │   │   └── providers.tsx
│       │   ├── lib/
│       │   │   └── api.ts
│       │   └── store/
│       │       ├── authStore.ts
│       │       └── characterStore.ts
│       └── package.json
│
└── docker-compose.yml
```

## Getting Started 🚀

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/elunaris72-prog/Ai-roleplay-platform.git
   cd Ai-roleplay-platform
   ```

2. **Set up environment variables**

   Create `.env.local` in `apps/api`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/ai_roleplay"
   OPENAI_API_KEY="your_openai_api_key"
   OPENAI_MODEL="gpt-4-turbo"
   JWT_SECRET="your_jwt_secret"
   PORT=3001
   ```

   Create `.env.local` in `apps/web`:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3001/api"
   ```

3. **Install dependencies**
   ```bash
   cd apps/api && npm install
   cd ../web && npm install
   ```

4. **Set up database**
   ```bash
   cd apps/api
   npx prisma migrate dev
   npm run seed
   ```

5. **Run the application**

   Terminal 1 - API:
   ```bash
   cd apps/api
   npm run dev
   ```

   Terminal 2 - Web:
   ```bash
   cd apps/web
   npm run dev
   ```

Visit `http://localhost:3000` for the frontend and `http://localhost:3001/api` for the API.

## Docker Setup 🐳

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database (port 5432)
- API server (port 3001)
- Web application (port 3000)

## API Endpoints 📡

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Characters
- `GET /api/characters` - List all public characters
- `POST /api/characters` - Create new character
- `GET /api/characters/:id` - Get character details
- `PUT /api/characters/:id` - Update character
- `DELETE /api/characters/:id` - Delete character

### Chat
- `POST /api/chat/sessions` - Create chat session
- `POST /api/chat/sessions/:sessionId/messages` - Send message
- `GET /api/chat/sessions/:sessionId/messages` - Get conversation history
- `GET /api/chat/sessions/:sessionId/memory-stats` - Get memory statistics

### Admin
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/analytics/users` - User analytics
- `GET /api/admin/analytics/characters` - Character analytics
- `GET /api/admin/analytics/conversations` - Conversation analytics

### Subscriptions
- `GET /api/subscriptions/me` - Get current subscription
- `POST /api/subscriptions` - Create/upgrade subscription
- `POST /api/subscriptions/cancel` - Cancel subscription

## Features Deep Dive 🔍

### Memory System
The AI characters maintain both short-term and long-term memories:
- **Short-term**: Recent conversation context (max 20 entries)
- **Long-term**: Important facts and background (max 100 entries)
- Automatic pruning based on importance scores
- Context-aware response generation

### Character Creation
Define characters with:
- Personality traits
- Physical appearance
- Voice style
- Backstory and lore
- Greeting messages
- Skills and relationships
- Tags for discovery

### Subscription Tiers

| Feature | Free | Pro | Premium |
|---------|------|-----|----------|
| Characters | 3 | 50 | 500 |
| Chat Sessions | 5 | 100 | 1000 |
| Voice Chat | ❌ | ✅ | ✅ |
| AI Priority | Low | Medium | High |
| Price | Free | $9.99/mo | $19.99/mo |

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap 🗺️

- [ ] Voice chat functionality
- [ ] Multi-language support
- [ ] Advanced character customization
- [ ] Community character sharing
- [ ] Performance optimizations
- [ ] Mobile app
- [ ] Real-time collaborative sessions
- [ ] Advanced memory analytics

## License 📄

MIT License - see LICENSE file for details

## Support 💬

For issues and questions:
- Open an issue on GitHub
- Contact: elunaris72@gmail.com

## Acknowledgments 🙏

- OpenAI for powerful AI models
- Next.js and React communities
- PostgreSQL and Prisma teams

---

**Made with ❤️ by elunaris72-prog**
