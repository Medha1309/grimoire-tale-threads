import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CostumeTheme = 'gothic-detective' | 'neon-cyberpunk' | 'vintage-sepia' | 'windows-98' | 'haunted-mansion';

interface CostumeContextType {
  costume: CostumeTheme;
  setCostume: (costume: CostumeTheme) => void;
}

const CostumeContext = createContext<CostumeContextType | undefined>(undefined);

export const CostumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [costume, setCostume] = useState<CostumeTheme>('gothic-detective');

  return (
    <CostumeContext.Provider value={{ costume, setCostume }}>
      {children}
    </CostumeContext.Provider>
  );
};

export const useCostume = () => {
  const context = useContext(CostumeContext);
  if (!context) {
    throw new Error('useCostume must be used within a CostumeProvider');
  }
  return context;
};
