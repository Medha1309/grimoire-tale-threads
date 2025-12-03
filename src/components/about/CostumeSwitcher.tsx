/**
 * Costume Switcher - Theme Toggle Button
 * Allows users to change the About page costume/theme
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCostume } from '../../contexts/CostumeContext';
import { COSTUME_THEMES } from '../../design-system/costume-themes';
import { CostumeTheme } from '../../contexts/CostumeContext';
import { Button } from '../shared/Button';

export const CostumeSwitcher: React.FC = () => {
  const { costume, setCostume } = useCostume();
  const [isOpen, setIsOpen] = useState(false);
  const currentConfig = COSTUME_THEMES[costume];

  const handleCostumeChange = (newCostume: CostumeTheme) => {
    setCostume(newCostume);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Button */}
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="shadow-2xl"
      >
        Change Theme
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ zIndex: -1 }}
            />

            {/* Menu */}
            <motion.div
              className="absolute bottom-full right-0 mb-2 w-80 rounded-lg overflow-hidden shadow-2xl"
              style={{
                background: currentConfig.colors.bgSecondary,
                border: `2px solid ${currentConfig.colors.border}`,
              }}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4">
                <h3
                  className="text-lg font-bold mb-3 pb-2"
                  style={{
                    color: currentConfig.colors.text,
                    borderBottom: `1px solid ${currentConfig.colors.border}`,
                  }}
                >
                  Choose Your Theme
                </h3>

                <div className="space-y-2">
                  {(Object.keys(COSTUME_THEMES) as CostumeTheme[]).map((themeKey) => {
                    const theme = COSTUME_THEMES[themeKey];
                    const isActive = costume === themeKey;

                    return (
                      <motion.button
                        key={themeKey}
                        onClick={() => handleCostumeChange(themeKey)}
                        className="w-full text-left p-3 rounded-lg transition-all"
                        style={{
                          background: isActive ? theme.colors.accent : theme.colors.bg,
                          border: `2px solid ${isActive ? theme.colors.accentSecondary : theme.colors.border}`,
                          color: theme.colors.text,
                        }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="font-bold text-sm">{theme.name}</div>
                            <div
                              className="text-xs mt-1"
                              style={{ color: theme.colors.textSecondary }}
                            >
                              {theme.description}
                            </div>
                          </div>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ background: theme.colors.accent }}
                            >
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div
                  className="mt-4 pt-3 text-xs text-center"
                  style={{
                    color: currentConfig.colors.textSecondary,
                    borderTop: `1px solid ${currentConfig.colors.border}`,
                  }}
                >
                  For Kiroween Costume Contest
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
