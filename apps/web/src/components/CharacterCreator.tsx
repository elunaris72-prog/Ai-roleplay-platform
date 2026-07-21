'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface CharacterFormProps {
  onSuccess?: () => void;
}

export function CharacterCreator({ onSuccess }: CharacterFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    personality: '',
    appearance: '',
    greeting: '',
    backstory: '',
    voiceStyle: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/characters', {
        ...formData,
        tags: formData.tags.split(',').map((t) => t.trim()),
      });
      toast.success('Character created!');
      setFormData({
        name: '',
        bio: '',
        personality: '',
        appearance: '',
        greeting: '',
        backstory: '',
        voiceStyle: '',
        tags: '',
      });
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create character');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Create Character</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Voice Style</label>
          <input
            type="text"
            name="voiceStyle"
            value={formData.voiceStyle}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-indigo-500"
            placeholder="e.g., Soft, Mysterious, Energetic"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-300">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-indigo-500"
          rows={3}
        />
      </div>

      <div>
        <label className="text-sm text-gray-300">Personality</label>
        <textarea
          name="personality"
          value={formData.personality}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-indigo-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="text-sm text-gray-300">Appearance</label>
        <textarea
          name="appearance"
          value={formData.appearance}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-indigo-500"
          rows={3}
        />
      </div>

      <div>
        <label className="text-sm text-gray-300">Greeting</label>
        <input
          type="text"
          name="greeting"
          value={formData.greeting}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="text-sm text-gray-300">Backstory</label>
        <textarea
          name="backstory"
          value={formData.backstory}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-indigo-500"
          rows={4}
        />
      </div>

      <div>
        <label className="text-sm text-gray-300">Tags (comma-separated)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-indigo-500"
          placeholder="e.g., fantasy, elf, wise"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Character'}
      </button>
    </form>
  );
}
