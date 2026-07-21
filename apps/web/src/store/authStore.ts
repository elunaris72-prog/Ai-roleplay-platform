import { create } from 'zustand';
import { api } from '@/lib/api';

interface AuthState {
  token: string | null;
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: null,
  loading: false,

  login: async (email, password) => {
    try {
      set({ loading: true });
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      set({ token: response.data.token, user: response.data.user });
    } finally {
      set({ loading: false });
    }
  },

  signup: async (email, password, name) => {
    try {
      set({ loading: true });
      const response = await api.post('/auth/signup', { email, password, name });
      localStorage.setItem('token', response.data.token);
      set({ token: response.data.token, user: response.data.user });
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },

  loadUser: async () => {
    try {
      const response = await api.get('/users/me');
      set({ user: response.data });
    } catch (error) {
      set({ token: null, user: null });
    }
  },
}));
