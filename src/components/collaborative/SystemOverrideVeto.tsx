/**
 * System Override Veto - Chain Master's instant rejection power
 * Triggers hash flash and logs anomaly
 */

import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Proposal } from '../../types/collaborativeStory';

interface SystemOverrideVetoProps {
  proposal: Proposal;
  onVeto: (reason: string) => Promise<void>;
  onCancel: () => void;
}

export const SystemOverrideVeto: React.FC<SystemOverrideVetoProps> = ({
  proposal,
  onVeto,
  onCancel,
}) => {
  const [reason, setReason] = useState('');
  const [isVetoing, setIsVetoing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleVeto = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsVetoing(true);
    try {
      await onVeto(reason || 'Anomaly Detected: Chain Integrity Check Failed');
    } catch (error) {
      console.error('Veto failed:', error);
    } finally {
      setIsVetoing(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title=""
      size="md"
      className="bg-slate-950 border-2 border-red-600"
    >
      <div className="space-y-6">
        {/* Warning header */}
        <div className="text-center space-y-2">
          <div className="text-4xl animate-pulse">⚠</div>
          <h2 className="text-xl font-bold text-red-400 font-mono">
            SYSTEM OVERRIDE VETO
          </h2>
          <p className="text-xs text-slate-400 font-mono tracking-wider">
            CHAIN MASTER AUTHORITY • IRREVERSIBLE ACTION
          </p>
        </div>

        {/* Proposal info */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 space-y-2">
          <div className="text-sm text-slate-400">
            <span className="font-semibold text-slate-300">Proposal:</span> {proposal.title}
          </div>
          <div className="text-sm text-slate-400">
            <span className="font-semibold text-slate-300">Author:</span> {proposal.authorName}
          </div>
          <div className="text-xs text-slate-500 font-mono">
            ID: {proposal.id}
          </div>
        </div>

        {/* Reason input */}
        <div className="space-y-2">
          <label className="text-sm font-mono text-slate-300">
            VETO REASON (Optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Anomaly Detected: Chain Integrity Check Failed"
            className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 text-sm font-mono resize-none focus:outline-none focus:border-red-500/50"
          />
          <p className="text-xs text-slate-500">
            This reason will be permanently logged in the audit trail.
          </p>
        </div>

        {/* Warning message */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-400 text-sm font-mono leading-relaxed">
            ⚠ This action will:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-400 font-mono">
            <li>• Instantly reject the proposal</li>
            <li>• Flash the previous segment hash in red</li>
            <li>• Log the veto in the permanent audit trail</li>
            <li>• Notify all co-authors</li>
            <li>• Cannot be undone</li>
          </ul>
        </div>

        {/* Confirmation step */}
        {showConfirm && (
          <div className="bg-red-900/20 border border-red-600 rounded-lg p-4 animate-pulse">
            <p className="text-red-400 text-sm font-mono text-center font-semibold">
              CLICK AGAIN TO CONFIRM VETO
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isVetoing}
            className="flex-1 border-slate-700"
          >
            CANCEL
          </Button>
          <Button
            variant="primary"
            onClick={handleVeto}
            disabled={isVetoing}
            className={`flex-1 ${
              showConfirm 
                ? 'bg-red-600 hover:bg-red-700 border-red-500 animate-pulse' 
                : 'bg-red-600/50 hover:bg-red-600 border-red-500/50'
            }`}
          >
            {isVetoing ? 'EXECUTING...' : showConfirm ? 'CONFIRM VETO' : 'EXECUTE VETO'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

/**
 * Veto Button for Chain Master
 */
export const VetoButton: React.FC<{
  proposal: Proposal;
  isChainMaster: boolean;
  onVeto: (reason: string) => Promise<void>;
}> = ({ proposal, isChainMaster, onVeto }) => {
  const [showVetoModal, setShowVetoModal] = useState(false);

  if (!isChainMaster) return null;

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setShowVetoModal(true)}
        className="border-red-600 text-red-400 hover:bg-red-500/10"
      >
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        SYSTEM OVERRIDE VETO
      </Button>

      {showVetoModal && (
        <SystemOverrideVeto
          proposal={proposal}
          onVeto={async (reason) => {
            await onVeto(reason);
            setShowVetoModal(false);
          }}
          onCancel={() => setShowVetoModal(false)}
        />
      )}
    </>
  );
};
