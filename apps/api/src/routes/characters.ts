import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all public characters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, category, page = '1', limit = '20' } = req.query;

    const where: any = { isPublic: true };

    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { bio: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.tags = { has: String(category) };
    }

    const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));

    const characters = await prisma.character.findMany({
      where,
      skip,
      take: parseInt(String(limit)),
      select: {
        id: true,
        name: true,
        bio: true,
        avatar: true,
        tags: true,
        createdBy: true,
      },
    });

    const total = await prisma.character.count({ where });

    res.json({
      data: characters,
      pagination: {
        total,
        page: parseInt(String(page)),
        limit: parseInt(String(limit)),
        pages: Math.ceil(total / parseInt(String(limit))),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch characters' });
  }
});

// Get character by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const character = await prisma.character.findUnique({
      where: { id: req.params.id },
    });

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    res.json(character);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch character' });
  }
});

// Create character
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, bio, personality, appearance, greeting, backstory } = req.body;

    const character = await prisma.character.create({
      data: {
        name,
        bio,
        personality,
        appearance,
        greeting,
        backstory,
        createdById: req.userId,
        isPublic: false,
      },
    });

    res.status(201).json(character);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create character' });
  }
});

export default router;
