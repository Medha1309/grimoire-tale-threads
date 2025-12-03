import React, { useState } from 'react';
import { Button } from '../../components/ui';

export const SettingsTab: React.FC = () => {
  const [settings, setSettings] = useState({
    dataRetentionDays: 365,
    requireEmailVerification: false,
    allowGoogleAuth: true,
    maintenanceMode: false,
    privacyPolicyVersion: '1.0',
    termsVersion: '1.0',
    maxStoriesPerUser: 50,
    maxDiaryEntriesPerUser: 1000,
    contentModerationEnabled: true,
  });

  const handleSave = () => {
    alert('Settings saved successfully (feature coming soon)');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-zinc-400">
          System Settings
        </h2>
        <Button onClick={handleSave} variant="primary">
          Save Changes
        </Button>
      </div>

      {/* Data Retention */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="font-serif text-xl text-zinc-300 mb-4">
          Data Retention & Privacy
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-500 mb-2">
              Data Retention Period (days)
            </label>
            <input
              type="number"
              value={settings.dataRetentionDays}
              onChange={(e) => setSettings({ ...settings, dataRetentionDays: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-red-900"
            />
            <p className="text-xs text-zinc-600 mt-1">
              How long to retain deleted user data for compliance
            </p>
          </div>

          <div>
            <label className="block text-sm text-zinc-500 mb-2">
              Privacy Policy Version
            </label>
            <input
              type="text"
              value={settings.privacyPolicyVersion}
              onChange={(e) => setSettings({ ...settings, privacyPolicyVersion: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-red-900"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-500 mb-2">
              Terms of Service Version
            </label>
            <input
              type="text"
              value={settings.termsVersion}
              onChange={(e) => setSettings({ ...settings, termsVersion: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-red-900"
            />
          </div>
        </div>
      </div>

      {/* Authentication */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="font-serif text-xl text-zinc-300 mb-4">
          Authentication Settings
        </h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-800/50">
            <div>
              <div className="text-sm text-zinc-300">Require Email Verification</div>
              <div className="text-xs text-zinc-500">Users must verify email before accessing features</div>
            </div>
            <input
              type="checkbox"
              checked={settings.requireEmailVerification}
              onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
              className="ml-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-800/50">
            <div>
              <div className="text-sm text-zinc-300">Allow Google Authentication</div>
              <div className="text-xs text-zinc-500">Enable sign-in with Google</div>
            </div>
            <input
              type="checkbox"
              checked={settings.allowGoogleAuth}
              onChange={(e) => setSettings({ ...settings, allowGoogleAuth: e.target.checked })}
              className="ml-4"
            />
          </label>
        </div>
      </div>

      {/* Content Limits */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="font-serif text-xl text-zinc-300 mb-4">
          Content Limits
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-500 mb-2">
              Max Stories Per User
            </label>
            <input
              type="number"
              value={settings.maxStoriesPerUser}
              onChange={(e) => setSettings({ ...settings, maxStoriesPerUser: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-red-900"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-500 mb-2">
              Max Diary Entries Per User
            </label>
            <input
              type="number"
              value={settings.maxDiaryEntriesPerUser}
              onChange={(e) => setSettings({ ...settings, maxDiaryEntriesPerUser: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:border-red-900"
            />
          </div>
        </div>
      </div>

      {/* System */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="font-serif text-xl text-zinc-300 mb-4">
          System Controls
        </h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-800/50">
            <div>
              <div className="text-sm text-zinc-300">Maintenance Mode</div>
              <div className="text-xs text-zinc-500">Disable site access for non-admins</div>
            </div>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="ml-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-800/50">
            <div>
              <div className="text-sm text-zinc-300">Content Moderation</div>
              <div className="text-xs text-zinc-500">Enable automatic content filtering</div>
            </div>
            <input
              type="checkbox"
              checked={settings.contentModerationEnabled}
              onChange={(e) => setSettings({ ...settings, contentModerationEnabled: e.target.checked })}
              className="ml-4"
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} variant="primary">
          Save All Settings
        </Button>
      </div>
    </div>
  );
};
