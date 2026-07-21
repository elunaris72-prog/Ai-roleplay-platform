import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { memorySystem } from '../services/memorySystem';
import { aiService } from '../services/aiService';

const router = Router();
const prisma = new PrismaClient();

// Send message with AI response and memory management
router.post('/sessions/:sessionId/messages', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Message content required' });
    }

    // Get session and character
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: { character: true, user: true },
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Save user message
    const userMessage = await prisma.message.create({
      data: {
        sessionId,
        role: 'user',
        content,
      },
    });

    // Add to short-term memory
    await memorySystem.addMemory(
      sessionId,
      session.characterId,
      `User said: ${content}`,
      'short_term',
      3
    );

    // Get recent messages for context
    const recentMessages = await prisma.message.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Get memories
    const memories = await memorySystem.getMemories(sessionId, session.characterId);
    const memorySummary = await memorySystem.generateMemorySummary(memories);

    // Generate AI response
    const aiResponse = await aiService.generateResponse(
      recentMessages
        .reverse()
        .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      {
        name: session.character.name,
        personality: session.character.personality || '',
        backstory: session.character.backstory || '',
        greeting: session.character.greeting || '',
        memories: memorySummary,
      }
    );

    // Save AI message
    const aiMessage = await prisma.message.create({
      data: {
        sessionId,
        role: 'assistant',
        content: aiResponse,
      },
    });

    // Add AI response to memory if significant
    await memorySystem.addMemory(
      sessionId,
      session.characterId,
      `Talked about: ${content.substring(0, 100)}`,
      'long_term',
      2
    );

    res.status(201).json({
      userMessage,
      aiMessage,
      memories: {
        shortTermCount: memories.shortTerm.length,
        longTermCount: memories.longTerm.length,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Get memory stats
router.get('/sessions/:sessionId/memory-stats', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const shortTerm = await prisma.memory.count({
      where: {
        sessionId,
        type: 'short_term',
      },
    });

    const longTerm = await prisma.memory.count({
      where: {
        sessionId,
        type: 'long_term',
      },
    });

    res.json({ shortTerm, longTerm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get memory stats' });
  }
});

export default router;
