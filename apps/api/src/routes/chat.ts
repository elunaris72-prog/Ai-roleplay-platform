import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Create chat session
router.post('/sessions', async (req: Request, res: Response) => {
  try {
    const { characterId } = req.body;

    if (!characterId) {
      return res.status(400).json({ message: 'Character ID required' });
    }

    const session = await prisma.chatSession.create({
      data: {
        userId: req.userId!,
        characterId,
      },
    });

    res.status(201).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create chat session' });
  }
});

// Get chat history
router.get('/sessions/:sessionId/messages', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const messages = await prisma.message.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });

    res.json({ data: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

// Send message
router.post('/sessions/:sessionId/messages', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Message content required' });
    }

    const userMessage = await prisma.message.create({
      data: {
        sessionId,
        role: 'user',
        content,
      },
    });

    // TODO: Generate AI response
    const aiMessage = await prisma.message.create({
      data: {
        sessionId,
        role: 'assistant',
        content: 'AI response placeholder',
      },
    });

    res.status(201).json({
      userMessage,
      aiMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

export default router;
