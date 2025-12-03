import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCollaborativeProjects } from '../hooks/useCollaborativeProjects';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/shared/Button';
import { LoadingSkeleton } from '../components/shared/LoadingSkeleton';
import { ProposalList } from '../components/collaborative/ProposalList';
import { ProposalEditor } from '../components/collaborative/ProposalEditor';
import { ProposalVoting } from '../components/collaborative/ProposalVoting';
import { ContributionStats } from '../components/collaborative/ContributionStats';
import { ActivityFeed } from '../components/collaborative/ActivityFeed';
import { StoryProgressBar } from '../components/collaborative/StoryProgressBar';
import { Proposal, Activity } from '../types/collaborativeStory';
import { canCreateProposal } from '../utils/projectPermissions';
import { Modal } from '../components/shared/Modal';
import { useProposals } from '../hooks/useProposals';

// Icons
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const Book = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export const CollaborativeProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const { projects, loading } = useCollaborativeProjects({
    userId: currentUser?.uid,
  });

  const [showProposalEditor, setShowProposalEditor] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [activeTab, setActiveTab] = useState<'story' | 'proposals' | 'collaborators' | 'stats' | 'activity'>('story');

  const project = projects.find((p) => p.id === projectId);
  
  // Fetch proposals for this project
  const { proposals } = useProposals({ projectId: projectId || '' });
  
  // Mock activity data (replace with real data from Firestore)
  const mockActivities: Activity[] = [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 p-8">
        <div className="max-w-6xl mx-auto">
          <LoadingSkeleton count={5} />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 p-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-stone-100 mb-4">
            Project Not Found
          </h1>
          <Button onClick={() => navigate('/chains')}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const canPropose = canCreateProposal(currentUser?.uid || '', project);
  const totalEligibleVoters = project.coAuthors.length;

  const userHasVoted = () => {
    // This would need to check the votes collection
    // For now, return false
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
      {/* Header */}
      <div className="border-b border-stone-700 bg-stone-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/chains')}
              className="flex items-center gap-2 text-stone-400 hover:text-stone-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Projects</span>
            </button>

            {canPropose && (
              <Button
                variant="primary"
                onClick={() => setShowProposalEditor(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Proposal
              </Button>
            )}
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-stone-100 mb-2">
                {project.title}
              </h1>
              <p className="text-stone-400">{project.description}</p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-stone-400">
                <Users className="w-5 h-5" />
                <span>{project.coAuthors.length} collaborators</span>
              </div>
              <div className="px-3 py-1 bg-lime-500/20 text-lime-400 rounded-full border border-lime-500/30">
                {project.visibility}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('story')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'story'
                  ? 'bg-stone-800 text-stone-100 border-b-2 border-lime-500'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Book className="w-5 h-5" />
                Story
              </div>
            </button>
            <button
              onClick={() => setActiveTab('proposals')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'proposals'
                  ? 'bg-stone-800 text-stone-100 border-b-2 border-lime-500'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Proposals {proposals.length > 0 && `(${proposals.length})`}
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'stats'
                  ? 'bg-stone-800 text-stone-100 border-b-2 border-lime-500'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              📊 Stats
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'activity'
                  ? 'bg-stone-800 text-stone-100 border-b-2 border-lime-500'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              🕐 Activity
            </button>
            <button
              onClick={() => setActiveTab('collaborators')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'collaborators'
                  ? 'bg-stone-800 text-stone-100 border-b-2 border-lime-500'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team ({project.coAuthors.length})
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {activeTab === 'story' && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-stone-800/50 rounded-lg border border-stone-700 p-6">
              <StoryProgressBar
                currentWords={project.currentContent?.split(/\s+/).filter(Boolean).length || 0}
                targetWords={50000}
                showDetails={true}
              />
            </div>

            {/* Story Content */}
            <div className="bg-stone-800/50 rounded-lg border border-stone-700 p-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-stone-300 whitespace-pre-wrap">
                  {project.currentContent || 'No content yet. Create a proposal to add content!'}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'proposals' && (
          <ProposalList
            projectId={project.id}
            onProposalClick={setSelectedProposal}
          />
        )}

        {activeTab === 'stats' && (
          <div className="bg-stone-800/50 rounded-lg border border-stone-700 p-6">
            <ContributionStats project={project} proposals={proposals} />
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-stone-800/50 rounded-lg border border-stone-700 p-6">
            <h3 className="text-xl font-semibold text-stone-200 mb-4">Recent Activity</h3>
            <ActivityFeed activities={mockActivities} maxItems={20} />
          </div>
        )}

        {activeTab === 'collaborators' && (
          <div className="space-y-4">
            {project.coAuthors.map((coAuthor) => (
              <div
                key={coAuthor.userId}
                className="flex items-center justify-between p-4 bg-stone-800/50 rounded-lg border border-stone-700"
              >
                <div>
                  <div className="font-semibold text-stone-100">
                    {coAuthor.userId === project.ownerId && '👑 '}
                    {coAuthor.displayName || `User ${coAuthor.userId.slice(0, 8)}`}
                  </div>
                  <div className="text-sm text-stone-400 capitalize">
                    {coAuthor.role}
                  </div>
                </div>
                {coAuthor.joinedAt && (
                  <div className="text-sm text-stone-500">
                    Joined {coAuthor.joinedAt instanceof Date 
                      ? coAuthor.joinedAt.toLocaleDateString()
                      : new Date(coAuthor.joinedAt.toMillis()).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Proposal Editor Modal */}
      {showProposalEditor && (
        <ProposalEditor
          isOpen={showProposalEditor}
          onClose={() => setShowProposalEditor(false)}
          projectId={project.id}
          originalText={project.currentContent || ''}
        />
      )}

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <Modal
          isOpen={!!selectedProposal}
          onClose={() => setSelectedProposal(null)}
          title={selectedProposal.title}
          size="xl"
        >
          <div className="space-y-6">
            {/* Proposal Info */}
            <div>
              <div className="text-sm text-stone-400 mb-2">Description</div>
              <p className="text-stone-300">{selectedProposal.description}</p>
            </div>

            {/* Proposed Text */}
            <div>
              <div className="text-sm text-stone-400 mb-2">Proposed Changes</div>
              <div className="p-4 bg-stone-800/50 rounded-lg border border-stone-700">
                <pre className="whitespace-pre-wrap text-sm text-stone-300 font-mono">
                  {selectedProposal.proposedText}
                </pre>
              </div>
            </div>

            {/* Voting */}
            <ProposalVoting
              proposalId={selectedProposal.id}
              totalEligibleVoters={totalEligibleVoters}
              userHasVoted={userHasVoted()}
              onVoteSuccess={() => {
                // Refresh or update UI
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
