import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.memory.deleteMany();
  await prisma.chatSession.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.characterLike.deleteMany();
  await prisma.character.deleteMany();
  await prisma.userFollow.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.user.deleteMany();

  // Create demo user
  const user = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Demo User',
      bio: 'Welcome to AI Roleplay Platform',
    },
  });

  // Create demo character
  const character = await prisma.character.create({
    data: {
      name: 'Luna',
      bio: 'A mystical elf with ancient wisdom',
      personality: 'Wise, calm, mysterious, and thoughtful',
      appearance: 'Long silver hair, ethereal features, glowing eyes',
      voiceStyle: 'Soft, measured, slightly echoing',
      greeting: 'Greetings, wanderer. I sense your arrival...',
      backstory: 'Luna has lived for centuries in the enchanted forest',
      tags: ['elf', 'fantasy', 'wisdom', 'mysterious'],
      isPublic: true,
      createdById: user.id,
    },
  });

  // Create subscription
  await prisma.subscription.create({
    data: {
      userId: user.id,
      tier: 'pro',
      status: 'active',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  console.log(`✅ Seeded with user: ${user.email}`);
  console.log(`✅ Created character: ${character.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
