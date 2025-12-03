/**
 * Integrity Index Gauge
 * Professional status display for Digital Forensic Archive
 */

import React, { useEffect, useState } from 'react';
import { calculateIntegrityIndex, getStatusLabel, getStatusDescription, IntegrityMetrics } from '../../utils/integrityIndex';
import { CollaborativeProject, Proposal } from '../../types/collaborativeStory';

interface IntegrityGaugeProps {
  project: CollaborativeProject;
  proposals: Proposal[];
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

export const IntegrityGauge: React.FC<IntegrityGaugeProps> = ({
  project,
  proposals,
  size = 'medium',
  showDetails = true,
}) => {
  const [metrics, setMetrics] = useState<IntegrityMetrics | null>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const calculated = calculateIntegrityIndex(project, proposals);
    setMetrics(calculated);

    // Pulse animation for critical status
    if (calculated.status === 'critical') {
      setPulse(true);
      const interval = setInterval(() => {
        setPulse(p => !p);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [project, proposals]);

  if (!metrics) return null;

  const sizeClasses = {
    small: 'w-16 h-16 text-xs',
    medium: 'w-24 h-24 text-sm',
    large: 'w-32 h-32 text-base',
  };

  const radius = size === 'small' ? 28 : size === 'medium' ? 42 : 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (metrics.overallIndex / 100) * circumference;

  return (
    <div className="space-y-3">
      {/* Gauge Display */}
      <div className="relative inline-flex items-center justify-center">
        <svg
          className={`${sizeClasses[size]} transform -rotate-90`}
          viewBox="0 0 120 120"
        >
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke={metrics.statusColor}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-out ${
              pulse ? 'opacity-50' : 'opacity-100'
            }`}
            style={{
              filter: metrics.status === 'critical' 
                ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))' 
                : metrics.status === 'degraded'
                ? 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.6))'
                : 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.4))',
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div 
            className="font-mono font-bold"
            style={{ 
              color: metrics.statusColor,
              fontSize: size === 'small' ? '1rem' : size === 'medium' ? '1.25rem' : '1.5rem',
            }}
          >
            {metrics.overallIndex}
          </div>
          <div 
            className="text-xs font-mono tracking-wider opacity-70"
            style={{ color: metrics.statusColor }}
          >
            {getStatusLabel(metrics.status)}
          </div>
        </div>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="space-y-2 min-w-[280px]">
          {/* Status Description */}
          <div 
            className="text-xs font-mono px-3 py-2 rounded border"
            style={{
              backgroundColor: `${metrics.statusColor}15`,
              borderColor: `${metrics.statusColor}40`,
              color: metrics.statusColor,
            }}
          >
            {getStatusDescription(metrics.status)}
          </div>

          {/* Component Scores */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2">
              <div className="text-slate-400 mb-1">Cohesion</div>
              <div className="text-slate-200 font-semibold">{metrics.cohesionScore}%</div>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2">
              <div className="text-slate-400 mb-1">Latency</div>
              <div className="text-slate-200 font-semibold">{metrics.latencyScore}%</div>
            </div>
          </div>

          {/* Warnings */}
          {metrics.warnings.length > 0 && (
            <div className="space-y-1">
              {metrics.warnings.map((warning, idx) => (
                <div
                  key={idx}
                  className="text-xs font-mono px-3 py-2 rounded border border-red-500/30 bg-red-500/10 text-red-400 flex items-start gap-2"
                >
                  <span className="text-red-500 mt-0.5">⚠</span>
                  <span className="flex-1">{warning}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Compact Integrity Badge (for headers/cards)
 */
export const IntegrityBadge: React.FC<{
  project: CollaborativeProject;
  proposals: Proposal[];
}> = ({ project, proposals }) => {
  const metrics = calculateIntegrityIndex(project, proposals);

  return (
    <div 
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs"
      style={{
        backgroundColor: `${metrics.statusColor}15`,
        borderColor: `${metrics.statusColor}40`,
        color: metrics.statusColor,
      }}
    >
      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: metrics.statusColor }} />
      <span className="font-semibold">{metrics.overallIndex}</span>
      <span className="opacity-70">INTEGRITY</span>
    </div>
  );
};
