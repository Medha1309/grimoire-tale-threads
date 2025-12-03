/**
 * Investigation Room - Theme-Specific Layouts
 * Each theme has a STRUCTURALLY different layout
 */

import React from 'react';
import { useCostume } from '../../contexts/CostumeContext';
import { AboutPageLayout } from './AboutPageLayout';

export const InvestigationRoom: React.FC = () => {
  const { costume } = useCostume();

  // Pass the costume to the layout so it can render differently
  return <AboutPageLayout layoutStyle={costume} />;
};
