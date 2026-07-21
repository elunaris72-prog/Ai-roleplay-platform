import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface MemoryEntry {
  id: string;
  content: string;
  importance: number;
  timestamp: Date;
}

interface CharacterMemory {
  shortTerm: MemoryEntry[];
  longTerm: MemoryEntry[];
}

export class MemorySystem {
  private MAX_SHORT_TERM = 20;
  private MAX_LONG_TERM = 100;

  async addMemory(
    sessionId: string,
    characterId: string,
    content: string,
    type: 'short_term' | 'long_term',
    importance: number
  ): Promise<void> {
    try {
      await prisma.memory.create({
        data: {
          sessionId,
          characterId,
          type,
          content,
          importance: Math.min(importance, 5),
        },
      });

      await this.pruneMemories(sessionId, characterId, type);
    } catch (error) {
      console.error('Failed to add memory:', error);
    }
  }

  async getMemories(sessionId: string, characterId: string): Promise<CharacterMemory> {
    try {
      const shortTerm = await prisma.memory.findMany({
        where: {
          sessionId,
          characterId,
          type: 'short_term',
        },
        orderBy: { createdAt: 'desc' },
        take: this.MAX_SHORT_TERM,
      });

      const longTerm = await prisma.memory.findMany({
        where: {
          sessionId,
          characterId,
          type: 'long_term',
        },
        orderBy: { importance: 'desc', createdAt: 'desc' },
        take: this.MAX_LONG_TERM,
      });

      return {
        shortTerm: shortTerm.map((m) => ({
          id: m.id,
          content: m.content,
          importance: m.importance,
          timestamp: m.createdAt,
        })),
        longTerm: longTerm.map((m) => ({
          id: m.id,
          content: m.content,
          importance: m.importance,
          timestamp: m.createdAt,
        })),
      };
    } catch (error) {
      console.error('Failed to get memories:', error);
      return { shortTerm: [], longTerm: [] };
    }
  }

  async pruneMemories(
    sessionId: string,
    characterId: string,
    type: 'short_term' | 'long_term'
  ): Promise<void> {
    const max = type === 'short_term' ? this.MAX_SHORT_TERM : this.MAX_LONG_TERM;

    const memories = await prisma.memory.findMany({
      where: { sessionId, characterId, type },
      orderBy: type === 'short_term' ? { createdAt: 'desc' } : { importance: 'asc' },
    });

    if (memories.length > max) {
      const toDelete = memories.slice(max);
      await prisma.memory.deleteMany({
        where: {
          id: { in: toDelete.map((m) => m.id) },
        },
      });
    }
  }

  async generateMemorySummary(memories: CharacterMemory): Promise<string> {
    const summary: string[] = [];

    if (memories.longTerm.length > 0) {
      summary.push('Key facts I remember:');
      memories.longTerm.slice(0, 5).forEach((m) => {
        summary.push(`- ${m.content}`);
      });
    }

    if (memories.shortTerm.length > 0) {
      summary.push('\nRecent context:');
      memories.shortTerm.slice(0, 3).forEach((m) => {
        summary.push(`- ${m.content}`);
      });
    }

    return summary.join('\n');
  }
}

export const memorySystem = new MemorySystem();
