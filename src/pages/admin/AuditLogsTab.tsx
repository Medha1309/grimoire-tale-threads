import React from 'react';
import { AdminLog } from '../../types';

interface AuditLogsTabProps {
  logs: AdminLog[];
}

export const AuditLogsTab: React.FC<AuditLogsTabProps> = ({ logs }) => {
  const getActionColor = (action: string) => {
    if (action.includes('delete')) return 'text-red-400';
    if (action.includes('suspend')) return 'text-yellow-400';
    if (action.includes('update')) return 'text-blue-400';
    if (action.includes('export')) return 'text-green-400';
    return 'text-zinc-400';
  };

  const getActionIcon = (action: string) => {
    if (action.includes('delete')) return '🗑️';
    if (action.includes('suspend')) return '⚠️';
    if (action.includes('update')) return '✏️';
    if (action.includes('export')) return '📥';
    if (action.includes('create')) return '➕';
    return '📋';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-zinc-400">
          Audit Logs ({logs.length})
        </h2>
        <p className="text-sm text-zinc-500">
          Last 100 administrative actions
        </p>
      </div>

      {logs.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-12 text-center">
          <p className="text-zinc-500">No audit logs yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 hover:bg-zinc-900/70 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{getActionIcon(log.action)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`font-serif text-lg ${getActionColor(log.action)}`}>
                      {log.action.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-zinc-800 text-zinc-500">
                      {log.targetType}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-zinc-500">
                    <p>
                      <span className="text-zinc-600">Admin:</span> {log.adminEmail}
                    </p>
                    <p>
                      <span className="text-zinc-600">Target:</span> {log.targetId}
                    </p>
                    <p>
                      <span className="text-zinc-600">Time:</span>{' '}
                      {log.timestamp?.toDate?.()?.toLocaleString() || 'Just now'}
                    </p>
                    {log.ipAddress && (
                      <p>
                        <span className="text-zinc-600">IP:</span> {log.ipAddress}
                      </p>
                    )}
                  </div>

                  {Object.keys(log.details).length > 0 && (
                    <details className="mt-3">
                      <summary className="text-xs text-zinc-600 cursor-pointer hover:text-zinc-400">
                        View Details
                      </summary>
                      <pre className="mt-2 p-3 bg-zinc-950 rounded border border-zinc-800 text-xs text-zinc-400 overflow-x-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
