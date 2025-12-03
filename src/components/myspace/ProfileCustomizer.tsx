import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfileCustomization } from '../../hooks/useProfileCustomization';
import { MYSPACE_THEMES } from '../../types/myspace';

interface ProfileCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess?: () => void;
}

export const ProfileCustomizer: React.FC<ProfileCustomizerProps> = ({
  isOpen,
  onClose,
  userId,
  onSuccess,
}) => {
  const { customization, saveCustomization, saving } = useProfileCustomization(userId, true);
  const [activeTab, setActiveTab] = useState<'theme' | 'text' | 'music' | 'background'>('theme');
  
  const [formData, setFormData] = useState({
    backgroundColor: customization.backgroundColor,
    textColor: customization.textColor,
    linkColor: customization.linkColor,
    aboutMe: customization.aboutMe,
    interests: customization.interests,
    favoriteQuote: customization.favoriteQuote,
    backgroundImage: customization.backgroundImage || '',
    profileSongTitle: customization.profileSong?.title || '',
    profileSongArtist: customization.profileSong?.artist || '',
    profileSongUrl: customization.profileSong?.url || '',
  });

  const handleSave = async () => {
    const result = await saveCustomization({
      backgroundColor: formData.backgroundColor,
      textColor: formData.textColor,
      linkColor: formData.linkColor,
      aboutMe: formData.aboutMe,
      interests: formData.interests,
      favoriteQuote: formData.favoriteQuote,
      backgroundImage: formData.backgroundImage || undefined,
      profileSong: formData.profileSongTitle
        ? {
            title: formData.profileSongTitle,
            artist: formData.profileSongArtist,
            url: formData.profileSongUrl,
          }
        : undefined,
    });

    if (result.success) {
      onSuccess?.();
      onClose();
    } else {
      alert(result.error || 'Failed to save customization');
    }
  };

  const applyTheme = (themeKey: keyof typeof MYSPACE_THEMES) => {
    const theme = MYSPACE_THEMES[themeKey];
    setFormData(prev => ({
      ...prev,
      backgroundColor: theme.backgroundColor,
      textColor: theme.textColor,
      linkColor: theme.linkColor,
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[90vh] overflow-hidden z-50"
          >
            <div className="relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black backdrop-blur-xl shadow-2xl">
              {/* Header */}
              <div className="relative border-b border-zinc-800 bg-zinc-900/40 p-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors text-zinc-400 text-2xl font-bold leading-none"
                >
                  ×
                </button>
                
                <h2 className="font-serif text-2xl text-zinc-200">
                  Customize Your Profile
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Make your profile uniquely yours!
                </p>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-zinc-800 bg-black/20">
                {[
                  { id: 'theme', label: 'Theme' },
                  { id: 'text', label: 'About Me' },
                  { id: 'music', label: 'Profile Song' },
                  { id: 'background', label: 'Background' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'text-zinc-200 bg-zinc-800/50 border-b-2 border-zinc-600'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {activeTab === 'theme' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-zinc-200 mb-4">Quick Themes</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(MYSPACE_THEMES).map(([key, theme]) => (
                          <button
                            key={key}
                            onClick={() => applyTheme(key as keyof typeof MYSPACE_THEMES)}
                            className="p-4 rounded-lg border border-zinc-700 hover:border-purple-500/50 transition-all text-left group"
                            style={{
                              backgroundColor: theme.backgroundColor,
                              color: theme.textColor,
                            }}
                          >
                            <p className="font-medium mb-1">{theme.name}</p>
                            <p className="text-xs opacity-70">Click to apply</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-zinc-200">Custom Colors</h3>
                      
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Background Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={formData.backgroundColor}
                            onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                            className="w-16 h-10 rounded border border-zinc-700 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={formData.backgroundColor}
                            onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                            className="flex-1 px-4 py-2 rounded-lg border border-zinc-700 bg-black/40 text-zinc-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Text Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={formData.textColor}
                            onChange={(e) => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                            className="w-16 h-10 rounded border border-zinc-700 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={formData.textColor}
                            onChange={(e) => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                            className="flex-1 px-4 py-2 rounded-lg border border-zinc-700 bg-black/40 text-zinc-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Link Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={formData.linkColor}
                            onChange={(e) => setFormData(prev => ({ ...prev, linkColor: e.target.value }))}
                            className="w-16 h-10 rounded border border-zinc-700 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={formData.linkColor}
                            onChange={(e) => setFormData(prev => ({ ...prev, linkColor: e.target.value }))}
                            className="flex-1 px-4 py-2 rounded-lg border border-zinc-700 bg-black/40 text-zinc-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'text' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">About Me</label>
                      <textarea
                        value={formData.aboutMe}
                        onChange={(e) => setFormData(prev => ({ ...prev, aboutMe: e.target.value }))}
                        placeholder="Tell everyone about yourself..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-black/40 text-zinc-300 placeholder-zinc-600 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Interests</label>
                      <textarea
                        value={formData.interests}
                        onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                        placeholder="What do you like? (e.g., horror stories, gothic art, dark poetry)"
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-black/40 text-zinc-300 placeholder-zinc-600 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Favorite Quote</label>
                      <textarea
                        value={formData.favoriteQuote}
                        onChange={(e) => setFormData(prev => ({ ...prev, favoriteQuote: e.target.value }))}
                        placeholder="Your favorite quote or motto..."
                        rows={2}
                        className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-black/40 text-zinc-300 placeholder-zinc-600 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'music' && (
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-400">
                      Add a song that plays when people visit your profile (classic MySpace style!)
                    </p>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Song Title</label>
                      <input
                        type="text"
                        value={formData.profileSongTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, profileSongTitle: e.target.value }))}
                        placeholder="e.g., Haunted Melody"
                        className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-black/40 text-zinc-300 placeholder-zinc-600 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Artist</label>
                      <input
                        type="text"
                        value={formData.profileSongArtist}
                        onChange={(e) => setFormData(prev => ({ ...prev, profileSongArtist: e.target.value }))}
                        placeholder="e.g., The Gothic Orchestra"
                        className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-black/40 text-zinc-300 placeholder-zinc-600 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Song URL (optional)</label>
                      <input
                        type="url"
                        value={formData.profileSongUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, profileSongUrl: e.target.value }))}
                        placeholder="https://..."
                        className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-black/40 text-zinc-300 placeholder-zinc-600 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'background' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Background Image URL</label>
                      <input
                        type="url"
                        value={formData.backgroundImage}
                        onChange={(e) => setFormData(prev => ({ ...prev, backgroundImage: e.target.value }))}
                        placeholder="https://... (leave empty for solid color)"
                        className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-black/40 text-zinc-300 placeholder-zinc-600 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      />
                      <p className="text-xs text-zinc-500 mt-2">
                        Tip: Use a dark, subtle pattern for best readability
                      </p>
                    </div>

                    {formData.backgroundImage && (
                      <div className="rounded-lg border border-zinc-700 p-4 bg-black/40">
                        <p className="text-sm text-zinc-400 mb-2">Preview:</p>
                        <div
                          className="w-full h-32 rounded-lg bg-cover bg-center"
                          style={{ backgroundImage: `url(${formData.backgroundImage})` }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-zinc-800 bg-black/20 p-6 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 text-zinc-300 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-zinc-700"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
