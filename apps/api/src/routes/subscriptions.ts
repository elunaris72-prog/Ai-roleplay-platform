import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

interface SubscriptionTier {
  tier: 'free' | 'pro' | 'premium';
  maxCharacters: number;
  maxSessions: number;
  voiceChat: boolean;
  aiPriority: 'low' | 'medium' | 'high';
}

const SUBSCRIPTION_TIERS: Record<string, SubscriptionTier> = {
  free: { tier: 'free', maxCharacters: 3, maxSessions: 5, voiceChat: false, aiPriority: 'low' },
  pro: { tier: 'pro', maxCharacters: 50, maxSessions: 100, voiceChat: true, aiPriority: 'medium' },
  premium: {
    tier: 'premium',
    maxCharacters: 500,
    maxSessions: 1000,
    voiceChat: true,
    aiPriority: 'high',
  },
};

// Get user subscription
router.get('/subscriptions/me', async (req: Request, res: Response) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.userId },
    });

    if (!subscription) {
      return res.json({
        tier: 'free',
        status: 'active',
        ...SUBSCRIPTION_TIERS.free,
      });
    }

    res.json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch subscription' });
  }
});

// Create subscription
router.post('/subscriptions', async (req: Request, res: Response) => {
  try {
    const { tier } = req.body;

    if (!['pro', 'premium'].includes(tier)) {
      return res.status(400).json({ message: 'Invalid subscription tier' });
    }

    // TODO: Integrate with Stripe for payment processing
    const subscription = await prisma.subscription.upsert({
      where: { userId: req.userId },
      update: {
        tier,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      create: {
        userId: req.userId,
        tier,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    res.status(201).json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create subscription' });
  }
});

// Cancel subscription
router.post('/subscriptions/cancel', async (req: Request, res: Response) => {
  try {
    const subscription = await prisma.subscription.update({
      where: { userId: req.userId },
      data: {
        status: 'cancelled',
        endDate: new Date(),
      },
    });

    res.json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to cancel subscription' });
  }
});

export default router;
