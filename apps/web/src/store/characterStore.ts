import { create } from 'zustand';
import { api } from '@/lib/api';

interface Character {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  personality: string;
  greeting: string;
  tags: string[];
}

interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
  fetchCharacters: (search?: string) => Promise<void>;
  getCharacter: (id: string) => Promise<Character | null>;
  createCharacter: (data: Partial<Character>) => Promise<Character>;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  characters: [],
  loading: false,
  error: null,

  fetchCharacters: async (search?: string) => {
    try {
      set({ loading: true });
      const response = await api.get('/characters', { params: { search } });
      set({ characters: response.data.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getCharacter: async (id: string) => {
    try {
      const response = await api.get(`/characters/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  createCharacter: async (data: Partial<Character>) => {
    try {
      const response = await api.post('/characters', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}));
