/**
 * Integrity Index Calculator
 * Professional Digital Forensic Archive - Data Integrity Monitoring
 */

import { CollaborativeProject, Proposal } from '../types/collaborativeStory';


export interface IntegrityMetrics {
  cohesionScore: number; // 0-100
  latencyScore: number; // 0-100
  overallIndex: number; // 0-100
  status: 'optimal' | 'degraded' | 'critical';
  statusColor: string;
  warnings: string[];
}

/**
 * Calculate Cohesion Score (inversely related to rejection/rebase rate)
 */
export function calculateCohesionScore(
  totalProposals: number,
  rejectedProposals: number,
  rebasedProposals: number
): number {
  if (totalProposals === 0) return 100;

  const rejectionRate = rejectedProposals / totalProposals;
  const rebaseRate = rebasedProposals / totalProposals;
  
  // Combined failure rate (weighted: rejections are worse than rebases)
  const failureRate = (rejectionRate * 0.7) + (rebaseRate * 0.3);
  
  // Invert to get cohesion score
  const cohesion = (1 - failureRate) * 100;
  
  return Math.max(0, Math.min(100, cohesion));
}

/**
 * Calculate Latency Score (inversely related to merge time)
 */
export function calculateLatencyScore(
  proposals: Proposal[]
): number {
  const mergedProposals = proposals.filter(p => p.status === 'merged' && p.mergedAt && p.submittedAt);
  
  if (mergedProposals.length === 0) return 100;

  // Calculate average merge time in hours
  const mergeTimes = mergedProposals.map(p => {
    const submitted = p.submittedAt!.toMillis();
    const merged = p.mergedAt!.toMillis();
    return (merged - submitted) / (1000 * 60 * 60); // Convert to hours
  });

  const avgMergeTime = mergeTimes.reduce((a, b) => a + b, 0) / mergeTimes.length;

  // Optimal merge time: 0-12 hours = 100 score
  // Acceptable: 12-48 hours = 50-100 score
  // Degraded: 48+ hours = 0-50 score
  let score: number;
  if (avgMergeTime <= 12) {
    score = 100;
  } else if (avgMergeTime <= 48) {
    score = 100 - ((avgMergeTime - 12) / 36) * 50;
  } else {
    score = Math.max(0, 50 - ((avgMergeTime - 48) / 48) * 50);
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Calculate Overall Integrity Index
 */
export function calculateIntegrityIndex(
  _project: CollaborativeProject,
  proposals: Proposal[]
): IntegrityMetrics {
  // Count proposal statuses
  const totalProposals = proposals.length;
  const rejectedProposals = proposals.filter(p => p.status === 'rejected').length;
  const rebasedProposals = proposals.filter(p => 
    p.metadata?.rebaseCount && p.metadata.rebaseCount > 0
  ).length;

  // Calculate component scores
  const cohesionScore = calculateCohesionScore(totalProposals, rejectedProposals, rebasedProposals);
  const latencyScore = calculateLatencyScore(proposals);

  // Overall index (weighted average: 60% cohesion, 40% latency)
  const overallIndex = (cohesionScore * 0.6) + (latencyScore * 0.4);

  // Determine status
  let status: IntegrityMetrics['status'];
  let statusColor: string;
  
  if (overallIndex >= 80) {
    status = 'optimal';
    statusColor = '#10b981'; // Green
  } else if (overallIndex >= 50) {
    status = 'degraded';
    statusColor = '#f59e0b'; // Yellow/Amber
  } else {
    status = 'critical';
    statusColor = '#ef4444'; // Red
  }

  // Generate warnings
  const warnings: string[] = [];
  if (cohesionScore < 60) {
    warnings.push('High rejection rate detected - Chain cohesion compromised');
  }
  if (latencyScore < 60) {
    warnings.push('Elevated merge latency - Archive synchronization delayed');
  }
  if (overallIndex < 50) {
    warnings.push('CRITICAL: Chain integrity severely degraded');
  }

  return {
    cohesionScore: Math.round(cohesionScore),
    latencyScore: Math.round(latencyScore),
    overallIndex: Math.round(overallIndex),
    status,
    statusColor,
    warnings,
  };
}

/**
 * Get status label for display
 */
export function getStatusLabel(status: IntegrityMetrics['status']): string {
  switch (status) {
    case 'optimal':
      return 'OPTIMAL';
    case 'degraded':
      return 'DEGRADED';
    case 'critical':
      return 'CRITICAL';
  }
}

/**
 * Get status description
 */
export function getStatusDescription(status: IntegrityMetrics['status']): string {
  switch (status) {
    case 'optimal':
      return 'Chain integrity maintained. All systems nominal.';
    case 'degraded':
      return 'Chain integrity compromised. Monitor for anomalies.';
    case 'critical':
      return 'ALERT: Chain integrity failure imminent. Immediate intervention required.';
  }
}
