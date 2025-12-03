/**
 * Costume Context - Theme Switcher for Kiroween Contest
 * Allows instant UI costume changes with one click
 */

import React, { createContext, useContext, useState } from 'react';

export type CostumeTheme = 
  | 'gothic-detective'
  | 'windows-98'
  | 'neon-cyberpunk'
  | 'vintage-sepia'
  | 'haunted-mansion';

interface CostumeContextType {
  costume: CostumeTheme;
  setCostume: (costume: CostumeTheme) => void;
  nextCostume: () => void;
}

const CostumeContext = createContext<CostumeContextType | undefined>(undefined);

const COSTUMES: CostumeTheme[] = [
  'gothic-detective',
  'windows-98',
  'neon-cyberpunk',
  'vintage-sepia',
  'haunted-mansion',
];

export const CostumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [costume, setCostumeState] = useState<CostumeTheme>(() => {
    const saved = localStorage.getItem('grimoire_costume');
    return (saved as CostumeTheme) || 'gothic-detective';
  });

  const setCostume = (newCostume: CostumeTheme) => {
    setCostumeState(newCostume);
    localStorage.setItem('grimoire_costume', newCostume);
  };

  const nextCostume = () => {
    const currentIndex = COSTUMES.indexOf(costume);
    const nextIndex = (currentIndex + 1) % COSTUMES.length;
    setCostume(COSTUMES[nextIndex]);
  };

  return (
    <CostumeContext.Provider value={{ costume, setCostume, nextCostume }}>
      {children}
    </CostumeContext.Provider>
  );
};

export const useCostume = () => {
  const context = useContext(CostumeContext);
  if (!context) {
    throw new Error('useCostume must be used within CostumeProvider');
  }
  return context;
};
