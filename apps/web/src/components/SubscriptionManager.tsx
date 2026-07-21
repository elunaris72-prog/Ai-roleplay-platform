'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface Subscription {
  tier: string;
  status: string;
  startDate: string;
  endDate?: string;
  maxCharacters: number;
  maxSessions: number;
  voiceChat: boolean;
}

export function SubscriptionManager() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await api.get('/subscriptions/me');
      setSubscription(response.data);
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (tier: string) => {
    try {
      await api.post('/subscriptions', { tier });
      toast.success(`Upgraded to ${tier}!`);
      fetchSubscription();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upgrade');
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">💳 Subscription Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <div className={`p-6 rounded-lg border ${
          subscription?.tier === 'free'
            ? 'bg-indigo-900 border-indigo-500'
            : 'bg-gray-800 border-gray-700'
        }`}>
          <h2 className="text-2xl font-bold text-white mb-4">Free</h2>
          <ul className="text-gray-300 space-y-2 mb-6">
            <li>✓ 3 Characters</li>
            <li>✓ 5 Chat Sessions</li>
            <li>✗ Voice Chat</li>
          </ul>
          <button
            disabled={subscription?.tier === 'free'}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            {subscription?.tier === 'free' ? 'Current Plan' : 'Downgrade'}
          </button>
        </div>

        {/* Pro Plan */}
        <div className={`p-6 rounded-lg border ${
          subscription?.tier === 'pro'
            ? 'bg-indigo-900 border-indigo-500'
            : 'bg-gray-800 border-gray-700'
        }`}>
          <h2 className="text-2xl font-bold text-white mb-2">Pro</h2>
          <p className="text-indigo-400 font-semibold mb-4">$9.99/month</p>
          <ul className="text-gray-300 space-y-2 mb-6">
            <li>✓ 50 Characters</li>
            <li>✓ 100 Chat Sessions</li>
            <li>✓ Voice Chat</li>
          </ul>
          <button
            onClick={() => handleUpgrade('pro')}
            disabled={subscription?.tier === 'pro'}
            className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded disabled:opacity-50"
          >
            {subscription?.tier === 'pro' ? 'Current Plan' : 'Upgrade'}
          </button>
        </div>

        {/* Premium Plan */}
        <div className={`p-6 rounded-lg border ${
          subscription?.tier === 'premium'
            ? 'bg-indigo-900 border-indigo-500'
            : 'bg-gray-800 border-gray-700'
        }`}>
          <h2 className="text-2xl font-bold text-white mb-2">Premium</h2>
          <p className="text-indigo-400 font-semibold mb-4">$19.99/month</p>
          <ul className="text-gray-300 space-y-2 mb-6">
            <li>✓ 500 Characters</li>
            <li>✓ 1000 Chat Sessions</li>
            <li>✓ Voice Chat</li>
            <li>✓ Priority AI</li>
          </ul>
          <button
            onClick={() => handleUpgrade('premium')}
            disabled={subscription?.tier === 'premium'}
            className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded disabled:opacity-50"
          >
            {subscription?.tier === 'premium' ? 'Current Plan' : 'Upgrade'}
          </button>
        </div>
      </div>
    </div>
  );
}
