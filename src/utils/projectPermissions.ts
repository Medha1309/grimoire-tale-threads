import { CollaborativeProject, CoAuthorRole } from '../types/collaborativeStory';

/**
 * Get user's role in project
 */
export function getUserRole(
  project: CollaborativeProject,
  userId: string
): CoAuthorRole | null {
  const coAuthor = project.coAuthors.find(ca => ca.userId === userId);
  return coAuthor?.role || null;
}

/**
 * Check if user is a co-author
 */
export function isCoAuthor(project: CollaborativeProject, userId: string): boolean {
  return project.coAuthors.some(ca => ca.userId === userId);
}

/**
 * Check if user is the owner
 */
export function isOwner(project: CollaborativeProject, userId: string): boolean {
  return project.ownerId === userId;
}

/**
 * Check if user is a reviewer (owner or reviewer role)
 */
export function isReviewer(project: CollaborativeProject, userId: string): boolean {
  const role = getUserRole(project, userId);
  return role === 'owner' || role === 'reviewer';
}

/**
 * Check if user can create proposals
 */
export function canCreateProposal(
  userId: string,
  project: CollaborativeProject
): boolean {
  // Must be a co-author and project must be active or recruiting
  return (
    isCoAuthor(project, userId) &&
    (project.status === 'active' || project.status === 'recruiting')
  );
}

/**
 * Check if user can edit project
 */
export function canEditProject(
  userId: string,
  project: CollaborativeProject
): boolean {
  // Owner or reviewers can edit
  return isOwner(project, userId) || isReviewer(project, userId);
}

/**
 * Check if user can review proposals
 */
export function canReviewProposal(
  project: CollaborativeProject,
  userId: string
): boolean {
  // Must be owner or reviewer
  return isReviewer(project, userId);
}

/**
 * Check if user can merge proposals
 */
export function canMergeProposal(
  project: CollaborativeProject,
  userId: string
): boolean {
  // Only owner can merge
  return isOwner(project, userId);
}

/**
 * Check if user can manage co-authors (add, remove, change roles)
 */
export function canManageCoAuthors(
  project: CollaborativeProject,
  userId: string
): boolean {
  // Only owner can manage co-authors
  return isOwner(project, userId);
}

/**
 * Check if user can finalize project
 */
export function canFinalizeProject(
  project: CollaborativeProject,
  userId: string
): boolean {
  // Only owner can finalize
  return isOwner(project, userId) && project.status === 'active';
}

/**
 * Check if user can sign project (during finalization)
 */
export function canSignProject(
  project: CollaborativeProject,
  userId: string
): boolean {
  // Must be a co-author and project must be finalizing
  return (
    isCoAuthor(project, userId) &&
    project.status === 'finalizing'
  );
}

/**
 * Check if user can edit project settings
 */
export function canEditSettings(
  project: CollaborativeProject,
  userId: string
): boolean {
  // Only owner can edit settings
  return isOwner(project, userId);
}

/**
 * Check if user can leave project
 */
export function canLeaveProject(
  project: CollaborativeProject,
  userId: string
): boolean {
  // Co-authors can leave, but not the owner
  return isCoAuthor(project, userId) && !isOwner(project, userId);
}

/**
 * Check if project can accept new members
 */
export function canAcceptNewMembers(project: CollaborativeProject): boolean {
  return (
    (project.status === 'recruiting' || project.status === 'active') &&
    project.coAuthors.length < project.maxCoAuthors
  );
}

/**
 * Get permission summary for user
 */
export function getPermissions(project: CollaborativeProject, userId: string) {
  return {
    isCoAuthor: isCoAuthor(project, userId),
    isOwner: isOwner(project, userId),
    isReviewer: isReviewer(project, userId),
    role: getUserRole(project, userId),
    canCreateProposal: canCreateProposal(userId, project),
    canReviewProposal: canReviewProposal(project, userId),
    canMergeProposal: canMergeProposal(project, userId),
    canManageCoAuthors: canManageCoAuthors(project, userId),
    canFinalizeProject: canFinalizeProject(project, userId),
    canSignProject: canSignProject(project, userId),
    canEditSettings: canEditSettings(project, userId),
    canLeaveProject: canLeaveProject(project, userId),
  };
}
