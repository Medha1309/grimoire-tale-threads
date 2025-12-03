/**
 * Quick Integration Example
 * Copy-paste these examples into your existing pages
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IntegrityGauge, IntegrityBadge } from './src/components/collaborative/IntegrityGauge';
import { CovenOath, useCovenOath } from './src/components/collaborative/CovenOath';
import { HashDisplay, SegmentWithHash } from './src/components/collaborative/HashDisplay';
import { VetoButton } from './src/components/collaborative/SystemOverrideVeto';
import { useMergeAnimation } from './src/components/collaborative/MergeAnimation';
import { DigitalSeanceSession } from './src/components/sessions/DigitalSeanceSession';

// ============================================================================
// EXAMPLE 1: Add Integrity Index to Project Header
// ============================================================================

export const ProjectHeaderWithIntegrity = ({ project, proposals }) => {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-900/50 border-b border-slate-700">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">{project.title}</h1>
        <p className="text-sm text-slate-400">{project.description}</p>
      </div>
      
      {/* Integrity Gauge */}
      <IntegrityGauge 
        project={project} 
        proposals={proposals}
        size="medium"
        showDetails={true}
      />
    </div>
  );
};

// ============================================================================
// EXAMPLE 2: Add Coven Oath to Chains Page
// ============================================================================

export const ChainsPageWithOath = () => {
  const navigate = useNavigate();
  const { hasAccepted, acceptOath } = useCovenOath();
  const [showOath, setShowOath] = React.useState(!hasAccepted);

  return (
    <>
      {/* Coven Oath Modal */}
      <CovenOath
        isOpen={showOath}
        onAccept={() => {
          acceptOath();
          setShowOath(false);
        }}
        onDecline={() => navigate('/')}
      />

      {/* Rest of your page */}
      <div className="min-h-screen bg-slate-950 p-8">
        <h1 className="text-4xl font-bold text-red-400">⚡ TALE THREADS ⚡</h1>
        {/* Your content */}
      </div>
    </>
  );
};

// ============================================================================
// EXAMPLE 3: Display Segments with Hashes
// ============================================================================

export const SegmentList = ({ segments }) => {
  return (
    <div className="space-y-4">
      {segments.map(segment => (
        <SegmentWithHash
          key={segment.id}
          content={segment.content}
          hash={segment.hash}
          author={segment.authorName}
          timestamp={segment.createdAt.toDate()}
          isFlashing={false} // Set to true to trigger red flash
        />
      ))}
    </div>
  );
};

// ============================================================================
// EXAMPLE 4: Add System Override Veto to Proposal
// ============================================================================

export const ProposalWithVeto = ({ proposal, project, currentUser, onReject }) => {
  const isChainMaster = project.ownerId === currentUser?.uid;

  const handleVeto = async (reason: string) => {
    // Execute veto
    await onReject(proposal.id, {
      status: 'rejected',
      vetoedAt: new Date(),
      vetoedBy: currentUser.uid,
      vetoReason: reason,
    });
    
    // Flash previous segment hash (implement this in your segment component)
    // flashSegmentHash(previousSegmentId);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-slate-200 mb-2">
        {proposal.title}
      </h3>
      <p className="text-slate-400 mb-4">{proposal.description}</p>
      
      <div className="flex gap-3">
        {/* Regular actions */}
        <button className="px-4 py-2 bg-green-600 rounded">
          Approve
        </button>
        
        {/* Veto button (only for Chain Master) */}
        <VetoButton
          proposal={proposal}
          isChainMaster={isChainMaster}
          onVeto={handleVeto}
        />
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE 5: Add Merge Animation
// ============================================================================

export const ProposalMergeButton = ({ proposal, onMerge }) => {
  const { triggerMergeAnimation, MergeAnimationComponent } = useMergeAnimation();

  const handleMerge = async () => {
    // Merge the proposal
    const result = await onMerge(proposal.id);
    
    // Trigger animation
    triggerMergeAnimation(proposal, result.contentHash);
  };

  return (
    <>
      <button
        onClick={handleMerge}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
      >
        Merge Proposal
      </button>
      
      {/* Animation component */}
      {MergeAnimationComponent}
    </>
  );
};

// ============================================================================
// EXAMPLE 6: Digital Séance Session Page
// ============================================================================

export const SeanceSessionPage = ({ sessionId }) => {
  const navigate = useNavigate();
  const { session, addSegment } = useChainSession(sessionId);

  if (!session) return <div>Loading...</div>;

  return (
    <DigitalSeanceSession
      session={session}
      onAddSegment={async (content) => {
        await addSegment({
          content,
          authorId: currentUser.uid,
          authorName: currentUser.displayName,
        });
      }}
      onLeaveSession={() => navigate('/chains')}
    />
  );
};

// ============================================================================
// EXAMPLE 7: Compact Integrity Badge in Card
// ============================================================================

export const ProjectCard = ({ project, proposals }) => {
  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-slate-200">
          {project.title}
        </h3>
        
        {/* Compact badge */}
        <IntegrityBadge project={project} proposals={proposals} />
      </div>
      
      <p className="text-sm text-slate-400">{project.description}</p>
    </div>
  );
};

// ============================================================================
// EXAMPLE 8: Simple Hash Display
// ============================================================================

export const SimpleHashExample = ({ hash }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-400 text-sm">Content Hash:</span>
      <HashDisplay 
        hash={hash} 
        size="small" 
        showCopy={true}
      />
    </div>
  );
};

// ============================================================================
// COMPLETE INTEGRATION EXAMPLE: Full Project Page
// ============================================================================

export const CompleteProjectPage = ({ projectId }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { project } = useProject(projectId);
  const { proposals } = useProposals({ projectId });
  const { hasAccepted, acceptOath } = useCovenOath();
  const { triggerMergeAnimation, MergeAnimationComponent } = useMergeAnimation();

  const handleMerge = async (proposalId: string) => {
    const proposal = proposals.find(p => p.id === proposalId);
    const result = await mergeProposal(proposalId);
    triggerMergeAnimation(proposal, result.contentHash);
  };

  const handleVeto = async (proposalId: string, reason: string) => {
    await rejectProposal(proposalId, reason);
    // Flash previous segment hash
  };

  return (
    <>
      {/* Coven Oath */}
      <CovenOath
        isOpen={!hasAccepted}
        onAccept={acceptOath}
        onDecline={() => navigate('/')}
      />

      {/* Page Content */}
      <div className="min-h-screen bg-slate-950 p-8">
        {/* Header with Integrity Index */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">{project.title}</h1>
            <p className="text-slate-400">{project.description}</p>
          </div>
          <IntegrityGauge 
            project={project} 
            proposals={proposals}
            size="large"
            showDetails={true}
          />
        </div>

        {/* Proposals */}
        <div className="space-y-4">
          {proposals.map(proposal => (
            <div key={proposal.id} className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-200 mb-2">
                {proposal.title}
              </h3>
              
              {/* Content with hash */}
              <SegmentWithHash
                content={proposal.content}
                hash={proposal.metadata?.contentHash || 'pending'}
                author={proposal.authorName}
                timestamp={proposal.createdAt.toDate()}
              />

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleMerge(proposal.id)}
                  className="px-4 py-2 bg-green-600 rounded"
                >
                  Merge
                </button>
                
                <VetoButton
                  proposal={proposal}
                  isChainMaster={project.ownerId === currentUser?.uid}
                  onVeto={(reason) => handleVeto(proposal.id, reason)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Merge Animation */}
      {MergeAnimationComponent}
    </>
  );
};

export default CompleteProjectPage;
