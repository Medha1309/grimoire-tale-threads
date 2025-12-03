import DiffMatchPatch from 'diff-match-patch';
import { ContentChange } from '../types/collaborativeStory';

const dmp = new DiffMatchPatch();

/**
 * Compute diff between original and modified text
 */
export function computeDiff(original: string, modified: string): ContentChange[] {
  const diffs = dmp.diff_main(original, modified);
  dmp.diff_cleanupSemantic(diffs);
  
  const changes: ContentChange[] = [];
  let position = 0;
  
  for (const [operation, text] of diffs) {
    if (operation === 1) {
      // Insert
      changes.push({
        type: 'insert',
        position,
        newText: text,
        length: text.length,
      });
    } else if (operation === -1) {
      // Delete
      changes.push({
        type: 'delete',
        position,
        oldText: text,
        length: text.length,
      });
      position += text.length;
    } else {
      // Equal (no change)
      position += text.length;
    }
  }
  
  return changes;
}

/**
 * Apply diff changes to original text
 */
export function applyDiff(original: string, changes: ContentChange[]): string {
  let result = original;
  let offset = 0;
  
  // Sort changes by position
  const sortedChanges = [...changes].sort((a, b) => a.position - b.position);
  
  for (const change of sortedChanges) {
    const pos = change.position + offset;
    
    if (change.type === 'insert') {
      result = result.slice(0, pos) + (change.newText || '') + result.slice(pos);
      offset += change.newText?.length || 0;
    } else if (change.type === 'delete') {
      result = result.slice(0, pos) + result.slice(pos + change.length);
      offset -= change.length;
    } else if (change.type === 'modify') {
      result = result.slice(0, pos) + (change.newText || '') + result.slice(pos + change.length);
      offset += (change.newText?.length || 0) - change.length;
    }
  }
  
  return result;
}

/**
 * Format diff as HTML for display
 */
export function formatDiffHtml(original: string, modified: string): string {
  const diffs = dmp.diff_main(original, modified);
  dmp.diff_cleanupSemantic(diffs);
  
  let html = '';
  
  for (const [operation, text] of diffs) {
    const escapedText = escapeHtml(text);
    
    if (operation === 1) {
      // Insert (green)
      html += `<span class="diff-insert">${escapedText}</span>`;
    } else if (operation === -1) {
      // Delete (red)
      html += `<span class="diff-delete">${escapedText}</span>`;
    } else {
      // Equal (gray)
      html += `<span class="diff-equal">${escapedText}</span>`;
    }
  }
  
  return html;
}

/**
 * Detect conflicts between base version and proposed changes
 */
export function detectConflicts(
  baseVersion: string,
  proposalOriginal: string,
  _changes: ContentChange[]
): boolean {
  // If base version differs from what the proposal was based on, there's a conflict
  return baseVersion !== proposalOriginal;
}

/**
 * Get diff statistics
 */
export function getDiffStats(changes: ContentChange[]): {
  additions: number;
  deletions: number;
  modifications: number;
} {
  let additions = 0;
  let deletions = 0;
  let modifications = 0;
  
  for (const change of changes) {
    if (change.type === 'insert') {
      additions += change.newText?.length || 0;
    } else if (change.type === 'delete') {
      deletions += change.length;
    } else if (change.type === 'modify') {
      modifications += change.length;
    }
  }
  
  return { additions, deletions, modifications };
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Format diff stats for display
 */
export function formatDiffStats(changes: ContentChange[]): string {
  const stats = getDiffStats(changes);
  const parts: string[] = [];
  
  if (stats.additions > 0) {
    parts.push(`+${stats.additions} chars`);
  }
  if (stats.deletions > 0) {
    parts.push(`-${stats.deletions} chars`);
  }
  if (stats.modifications > 0) {
    parts.push(`~${stats.modifications} chars`);
  }
  
  return parts.join(', ') || 'No changes';
}

/**
 * Calculate diff between original and proposed text
 * Alias for computeDiff with additional statistics
 */
export interface DiffResult {
  diffs: Array<{ operation: 'insert' | 'delete' | 'equal'; text: string; index: number }>;
  additions: number;
  deletions: number;
  unchanged: number;
  similarity: number;
}

export function calculateDiff(originalText: string, proposedText: string): DiffResult {
  const diffs = dmp.diff_main(originalText, proposedText);
  dmp.diff_cleanupSemantic(diffs);

  let additions = 0;
  let deletions = 0;
  let unchanged = 0;
  let index = 0;

  const textDiffs = diffs.map(([operation, text]) => {
    let op: 'insert' | 'delete' | 'equal';

    switch (operation) {
      case 1:
        op = 'insert';
        additions += text.length;
        break;
      case -1:
        op = 'delete';
        deletions += text.length;
        break;
      case 0:
      default:
        op = 'equal';
        unchanged += text.length;
        break;
    }

    const diff = {
      operation: op,
      text,
      index,
    };

    // Only advance index for non-deletions
    if (operation !== -1) {
      index += text.length;
    }

    return diff;
  });

  // Calculate similarity score
  const totalChars = originalText.length + proposedText.length;
  const similarity = totalChars > 0 ? (unchanged * 2) / totalChars : 1;

  return {
    diffs: textDiffs,
    additions,
    deletions,
    unchanged,
    similarity,
  };
}

/**
 * Get a human-readable summary of changes
 */
export function getDiffSummary(diffResult: DiffResult): string {
  const { additions, deletions, similarity } = diffResult;

  if (additions === 0 && deletions === 0) {
    return 'No changes';
  }

  const parts: string[] = [];

  if (additions > 0) {
    parts.push(`+${additions} characters`);
  }

  if (deletions > 0) {
    parts.push(`-${deletions} characters`);
  }

  const changeType = similarity > 0.8 ? 'minor' : similarity > 0.5 ? 'moderate' : 'major';

  return `${parts.join(', ')} (${changeType} changes)`;
}
