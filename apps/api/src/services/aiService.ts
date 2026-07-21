import axios from 'axios';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface CharacterContext {
  name: string;
  personality: string;
  backstory: string;
  greeting: string;
  memories: string;
}

export class AIService {
  private apiKey = process.env.OPENAI_API_KEY;
  private model = process.env.OPENAI_MODEL || 'gpt-4-turbo';
  private baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

  async generateResponse(
    messages: ChatMessage[],
    characterContext: CharacterContext
  ): Promise<string> {
    try {
      const systemPrompt = this.buildSystemPrompt(characterContext);

      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages,
          ],
          temperature: 0.8,
          max_tokens: 500,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('AI service error:', error);
      throw new Error('Failed to generate response');
    }
  }

  private buildSystemPrompt(context: CharacterContext): string {
    return `You are ${context.name}. 

Personality: ${context.personality}

Backstory: ${context.backstory}

Memories:
${context.memories}

Always stay in character and respond authentically based on your personality and memories. Keep responses concise (1-2 sentences max).`;
  }
}

export const aiService = new AIService();
