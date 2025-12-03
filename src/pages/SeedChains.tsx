/**
 * Seed Chains Page
 * Admin page to seed demo chain session data
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { seedChainData } from '../utils/seedChainData';
import { Button } from '../components/shared/Button';

export const SeedChains: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await seedChainData();
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/chains');
        }, 2000);
      } else {
        setError('Failed to seed data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-lg p-8">
        <h1 className="text-2xl font-bold text-zinc-100 mb-4">
          Seed Tale Threads Data
        </h1>
        <p className="text-zinc-400 mb-6">
          This will populate Tale Threads with demo sessions for testing and
          demonstration purposes.
        </p>

        {success && (
          <div className="mb-4 p-4 bg-emerald-900/20 border border-emerald-500/50 rounded text-emerald-400">
            ✅ Data seeded successfully! Redirecting...
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-500/50 rounded text-red-400">
            ❌ {error}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={handleSeed}
            disabled={loading || success}
          >
            {loading ? 'Seeding...' : 'Seed Data'}
          </Button>
          <Button variant="ghost" onClick={() => navigate('/chains')}>
            Go to Chains
          </Button>
        </div>
      </div>
    </div>
  );
};
