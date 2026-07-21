# AI Roleplay Platform - Deployment Guide

## Production Deployment 🚀

### Prerequisites
- Docker and Docker Compose
- PostgreSQL 14+ or managed database service
- OpenAI API key
- Node.js 18+ (for manual deployment)
- Git

## Option 1: Docker Compose (Recommended)

### 1. Clone Repository
```bash
git clone https://github.com/elunaris72-prog/Ai-roleplay-platform.git
cd Ai-roleplay-platform
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with production values
```

### 3. Deploy
```bash
docker-compose -f docker-compose.yml up -d
```

### 4. Initialize Database
```bash
docker-compose exec api npx prisma migrate deploy
docker-compose exec api npm run seed
```

## Option 2: Manual Deployment

### Backend Setup
```bash
cd apps/api
npm install
npx prisma migrate deploy
npm run build
npm start
```

### Frontend Setup
```bash
cd apps/web
npm install
npm run build
npm start
```

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# API
JWT_SECRET=strong_random_secret_key
PORT=3001
NODE_ENV=production

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo

# Frontend
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Deployment Platforms

### Vercel (Frontend)
1. Connect GitHub repository
2. Set environment variables
3. Deploy

### Railway/Render (Backend)
1. Connect GitHub repository
2. Set environment variables
3. Set build command: `npm run build`
4. Set start command: `npm start`

### AWS/GCP/Azure
- Use managed database services
- Deploy via container services
- Configure load balancers

## Health Checks

```bash
# API health
curl http://localhost:3001/api/health

# Database connection
Docker logs can reveal database issues
```

## Monitoring

- Set up error tracking (Sentry)
- Monitor API response times
- Track database performance
- Monitor AI API usage and costs

## Security

- [ ] Use HTTPS/SSL certificates
- [ ] Set up firewall rules
- [ ] Rotate JWT secrets regularly
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Performance Optimization

- Enable database query caching
- Implement API response caching
- Use CDN for static assets
- Optimize OpenAI API calls
- Monitor and optimize memory usage

## Backup Strategy

- Daily database backups
- Store backups in separate location
- Test restore procedures
- Document recovery process

## Support

For deployment issues:
- Check logs: `docker-compose logs -f`
- Review error messages
- Contact support: elunaris72@gmail.com
