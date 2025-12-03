import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { populateMockData } from '../utils/populateMockData';
import { verifyMockData, formatVerificationReport } from '../utils/verifyMockData';
import { BackButton } from '../components/shared/NavigationButtons';

export const AdminPopulate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: any } | null>(null);
  const [verificationReport, setVerificationReport] = useState<string | null>(null);

  const handlePopulate = async () => {
    if (!confirm('This will populate the database with mock data. Continue?')) {
      return;
    }

    setLoading(true);
    setResult(null);
    setVerificationReport(null);

    try {
      const res = await populateMockData();
      setResult(res);
    } catch (error) {
      setResult({ success: false, error });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setVerificationReport(null);

    try {
      const report = await verifyMockData();
      const formatted = formatVerificationReport(report);
      setVerificationReport(formatted);
    } catch (error: any) {
      setVerificationReport(`Error during verification: ${error.message}`);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 border-b border-zinc-900/40 pb-6">
          <BackButton onClick={() => navigate('/admin')} variant="ghost" className="mb-6" />
          <h1 className="font-serif text-4xl tracking-wider text-zinc-300">
            Admin: Populate Mock Data
          </h1>
          <p className="mt-4 text-zinc-500">
            This page allows you to populate the Firebase database with mock book data,
            including stats, comments, and ratings for all stories in the library.
          </p>
        </header>

        <div className="space-y-6">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="mb-4 font-serif text-2xl text-zinc-300">
              What will be populated:
            </h2>
            <ul className="space-y-2 text-zinc-400">
              <li>• Story statistics (views, likes, bookmarks, ratings)</li>
              <li>• User comments with realistic timestamps</li>
              <li>• Comment replies and nested discussions</li>
              <li>• Like counts and engagement metrics</li>
              <li>• 18 stories with full mock data</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePopulate}
              disabled={loading || verifying}
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-4
                       font-serif text-lg text-zinc-100 transition-colors
                       hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Populating Database...' : 'Populate Mock Data'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleVerify}
              disabled={loading || verifying}
              className="flex-1 rounded-lg border border-blue-700 bg-blue-900/50 px-6 py-4
                       font-serif text-lg text-blue-100 transition-colors
                       hover:bg-blue-800/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {verifying ? 'Verifying...' : 'Verify Data'}
            </motion.button>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-lg border p-6 ${
                result.success
                  ? 'border-green-800 bg-green-900/20 text-green-300'
                  : 'border-red-800 bg-red-900/20 text-red-300'
              }`}
            >
              <h3 className="mb-2 font-serif text-xl">
                {result.success ? '✅ Success!' : '❌ Error'}
              </h3>
              <p>
                {result.success
                  ? result.message || 'Mock data has been populated successfully!'
                  : `Failed to populate data: ${result.error?.message || 'Unknown error'}`}
              </p>
            </motion.div>
          )}

          {verificationReport && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-blue-800 bg-blue-900/20 p-6"
            >
              <h3 className="mb-4 font-serif text-xl text-blue-300">
                Verification Report
              </h3>
              <pre className="whitespace-pre-wrap font-mono text-sm text-blue-200">
                {verificationReport}
              </pre>
            </motion.div>
          )}

          <div className="rounded-lg border border-yellow-800 bg-yellow-900/20 p-6">
            <h3 className="mb-2 font-serif text-xl text-yellow-300">⚠️ Warning</h3>
            <p className="text-yellow-200/80">
              This operation will create new documents in your Firebase database.
              Make sure you have the proper permissions and that you want to add this data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
