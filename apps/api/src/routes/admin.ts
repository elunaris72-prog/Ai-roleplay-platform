import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Middleware: Check if admin
const isAdmin = (req: Request, res: Response, next: Function) => {
  // TODO: Implement role-based access control
  next();
};

// Get platform statistics
router.get('/stats', isAdmin, async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalCharacters = await prisma.character.count();
    const totalSessions = await prisma.chatSession.count();
    const totalMessages = await prisma.message.count();

    const activeUsers = await prisma.user.count({
      where: {
        chatSessions: {
          some: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        },
      },
    });

    const popularCharacters = await prisma.character.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { chatSessions: true, likes: true },
        },
      },
      orderBy: {
        chatSessions: {
          _count: 'desc',
        },
      },
      take: 10,
    });

    res.json({
      overview: {
        totalUsers,
        totalCharacters,
        totalSessions,
        totalMessages,
        activeUsers,
      },
      popularCharacters,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

// Get user analytics
router.get('/analytics/users', isAdmin, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        _count: {
          select: { chatSessions: true, characters: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    res.json({ data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user analytics' });
  }
});

// Get character analytics
router.get('/analytics/characters', isAdmin, async (req: Request, res: Response) => {
  try {
    const characters = await prisma.character.findMany({
      select: {
        id: true,
        name: true,
        createdBy: { select: { name: true } },
        createdAt: true,
        isPublic: true,
        _count: {
          select: { chatSessions: true, likes: true, bookmarks: true },
        },
      },
      orderBy: { chatSessions: { _count: 'desc' } },
      take: 100,
    });

    res.json({ data: characters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch character analytics' });
  }
});

// Get conversation analytics
router.get('/analytics/conversations', isAdmin, async (req: Request, res: Response) => {
  try {
    const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const dailyStats = await prisma.message.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: last7Days },
      },
      _count: { id: true },
    });

    const avgMessagesPerSession = await prisma.chatSession.findMany({
      select: {
        id: true,
        _count: { select: { messages: true } },
      },
    });

    const avg =
      avgMessagesPerSession.length > 0
        ? avgMessagesPerSession.reduce((sum, s) => sum + (s._count.messages || 0), 0) /
          avgMessagesPerSession.length
        : 0;

    res.json({
      dailyStats,
      averageMessagesPerSession: Math.round(avg),
      totalSessions: avgMessagesPerSession.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch conversation analytics' });
  }
});

// Suspend user
router.patch('/users/:userId/suspend', isAdmin, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.userId },
      data: { bio: 'SUSPENDED' },
    });

    res.json({ message: 'User suspended', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to suspend user' });
  }
});

export default router;
