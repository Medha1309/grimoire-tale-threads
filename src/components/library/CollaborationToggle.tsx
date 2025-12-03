import React, { useState } from 'react';
import { Button } from '../shared/Button';
import { Modal } from '../shared/Modal';
import { useToast } from '../../hooks/useToast';

interface CollaborationToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean, settings?: CollaborationSettings) => Promise<void>;
}

export interface CollaborationSettings {
  maxCoAuthors: number;
  requireApproval: boolean;
}

export const CollaborationToggle: React.FC<CollaborationToggleProps> = ({
  isEnabled,
  onToggle,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<CollaborationSettings>({
    maxCoAuthors: 5,
    requireApproval: true,
  });
  const { showToast } = useToast();

  const handleToggle = async () => {
    if (isEnabled) {
      // Disable collaboration
      if (confirm('Are you sure you want to disable collaboration? This will archive the Chain project.')) {
        setLoading(true);
        try {
          await onToggle(false);
          showToast('Collaboration disabled', 'success');
        } catch (error) {
          showToast('Failed to disable collaboration', 'error');
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    } else {
      // Show settings modal before enabling
      setShowSettings(true);
    }
  };

  const handleEnableWithSettings = async () => {
    setLoading(true);
    try {
      await onToggle(true, settings);
      showToast('Collaboration enabled! Chain project created.', 'success');
      setShowSettings(false);
    } catch (error) {
      showToast('Failed to enable collaboration', 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={handleToggle}
            disabled={loading}
            className="w-5 h-5 rounded border-2 border-amber-700/30 bg-amber-50/5 
                     checked:bg-amber-600 checked:border-amber-600 
                     focus:ring-2 focus:ring-amber-500/50 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className="text-sm font-medium text-amber-100">
            Enable Collaboration
          </span>
        </label>
        
        {isEnabled && (
          <span className="px-2 py-1 text-xs font-semibold bg-lime-500/20 text-lime-400 
                         rounded border border-lime-500/30">
            COLLABORATIVE
          </span>
        )}
      </div>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => !loading && setShowSettings(false)}
        title="Collaboration Settings"
      >
        <div className="space-y-6">
          <p className="text-sm text-amber-100/70">
            Configure how others can collaborate on this story. A Chain project will be created
            where co-authors can submit proposals for changes.
          </p>

          <div className="space-y-4">
            {/* Max Co-Authors */}
            <div>
              <label className="block text-sm font-medium text-amber-100 mb-2">
                Maximum Co-Authors
              </label>
              <input
                type="number"
                min={2}
                max={20}
                value={settings.maxCoAuthors}
                onChange={(e) =>
                  setSettings({ ...settings, maxCoAuthors: parseInt(e.target.value) || 2 })
                }
                className="w-full px-3 py-2 bg-black/30 border border-amber-700/30 
                         rounded text-amber-100 focus:outline-none focus:ring-2 
                         focus:ring-amber-500/50"
              />
              <p className="mt-1 text-xs text-amber-100/50">
                How many people can work on this story (including you)
              </p>
            </div>

            {/* Require Approval */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.requireApproval}
                  onChange={(e) =>
                    setSettings({ ...settings, requireApproval: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-2 border-amber-700/30 bg-amber-50/5 
                           checked:bg-amber-600 checked:border-amber-600 
                           focus:ring-2 focus:ring-amber-500/50"
                />
                <span className="text-sm text-amber-100">
                  Require approval for new co-authors
                </span>
              </label>
              <p className="mt-1 ml-6 text-xs text-amber-100/50">
                If enabled, you must approve join requests. Otherwise, anyone can join up to the limit.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-amber-700/30">
            <Button
              variant="ghost"
              onClick={() => setShowSettings(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleEnableWithSettings}
              disabled={loading}
            >
              {loading ? 'Enabling...' : 'Enable Collaboration'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
