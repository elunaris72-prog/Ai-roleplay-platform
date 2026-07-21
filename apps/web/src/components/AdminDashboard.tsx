'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Stats {
  overview: {
    totalUsers: number;
    totalCharacters: number;
    totalSessions: number;
    totalMessages: number;
    activeUsers: number;
  };
  popularCharacters: Array<{
    id: string;
    name: string;
    _count: { chatSessions: number; likes: number };
  }>;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-white p-8">Loading...</div>;
  }

  if (!stats) {
    return <div className="text-center text-red-400 p-8">Failed to load statistics</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">📊 Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-700">
        {['overview', 'users', 'characters', 'conversations'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold ${
              activeTab === tab
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-gray-400 text-sm">Total Users</div>
              <div className="text-3xl font-bold text-white mt-2">{stats.overview.totalUsers}</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-gray-400 text-sm">Active Users (7d)</div>
              <div className="text-3xl font-bold text-green-400 mt-2">{stats.overview.activeUsers}</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-gray-400 text-sm">Total Characters</div>
              <div className="text-3xl font-bold text-white mt-2">{stats.overview.totalCharacters}</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-gray-400 text-sm">Chat Sessions</div>
              <div className="text-3xl font-bold text-white mt-2">{stats.overview.totalSessions}</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-gray-400 text-sm">Total Messages</div>
              <div className="text-3xl font-bold text-white mt-2">{stats.overview.totalMessages}</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">🔥 Top Characters</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-300">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-2">Name</th>
                    <th className="text-right p-2">Sessions</th>
                    <th className="text-right p-2">Likes</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.popularCharacters.map((char) => (
                    <tr key={char.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="p-2">{char.name}</td>
                      <td className="text-right p-2">{char._count.chatSessions}</td>
                      <td className="text-right p-2">{char._count.likes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {['users', 'characters', 'conversations'].includes(activeTab) && (
        <div className="bg-gray-800 p-8 rounded-lg text-center text-gray-400">
          <p>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} analytics coming soon...</p>
        </div>
      )}
    </div>
  );
}
