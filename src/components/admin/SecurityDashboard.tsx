/**
 * Security Dashboard Component
 * Admin view for monitoring security events
 */

import React, { useState, useEffect } from 'react';
import { securityMonitor } from '../../utils/securityMonitor';

export const SecurityDashboard: React.FC = () => {
  const [stats, setStats] = useState<ReturnType<typeof securityMonitor.getStats> | null>(null);
  const [timeWindow, setTimeWindow] = useState<'1h' | '24h' | '7d'>('24h');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const windowMs = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
    }[timeWindow];

    setStats(securityMonitor.getStats(windowMs));
  }, [timeWindow, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleExport = () => {
    const events = securityMonitor.exportEvents();
    const dataStr = JSON.stringify(events, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `security-events-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!stats) {
    return <div className="p-6">Loading security stats...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Security Dashboard</h2>
        <div className="flex gap-2">
          <select
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Events</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600">Blocked Events</div>
          <div className="text-3xl font-bold text-red-600 mt-2">{stats.blocked}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600">Block Rate</div>
          <div className="text-3xl font-bold text-orange-600 mt-2">
            {stats.total > 0 ? ((stats.blocked / stats.total) * 100).toFixed(1) : 0}%
          </div>
        </div>
      </div>

      {/* Events by Type */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Events by Type</h3>
        <div className="space-y-3">
          {Object.entries(stats.byType).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getTypeColor(type)}`} />
                <span className="text-gray-700 capitalize">{type.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-900 font-semibold">{count}</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getTypeColor(type)}`}
                    style={{ width: `${(count / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Users */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Users by Events</h3>
        <div className="space-y-2">
          {stats.topUsers.length > 0 ? (
            stats.topUsers.map((user, index) => (
              <div key={user.userId} className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-mono">#{index + 1}</span>
                  <span className="text-gray-700 font-mono text-sm">{user.userId}</span>
                </div>
                <span className="text-gray-900 font-semibold">{user.count} events</span>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-4">No events recorded</div>
          )}
        </div>
      </div>

      {/* Alerts */}
      {stats.blocked > 10 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-red-600 text-xl">⚠️</div>
            <div>
              <h4 className="text-red-900 font-semibold">High Security Activity Detected</h4>
              <p className="text-red-700 text-sm mt-1">
                {stats.blocked} blocked events in the selected time window. Review the logs and
                consider additional security measures.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    rate_limit: 'bg-yellow-500',
    validation_failed: 'bg-orange-500',
    xss_attempt: 'bg-red-600',
    injection_attempt: 'bg-red-700',
    unauthorized_access: 'bg-purple-600',
    suspicious_activity: 'bg-pink-600',
    authentication_failed: 'bg-blue-600',
  };
  return colors[type] || 'bg-gray-500';
};
