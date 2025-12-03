/**
 * Wrapper for Dollhouse page that shows creepy transition on first load
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollhouseTransition } from './DollhouseTransition';
import { NavigationProps } from '../../types';

interface DollhousePageWrapperProps {
  children: (props: NavigationProps) => React.ReactNode;
  go: NavigationProps['go'];
}

export const DollhousePageWrapper: React.FC<DollhousePageWrapperProps> = ({ children, go }) => {
  const [transitionComplete, setTransitionComplete] = useState(false);

  const handleTransitionComplete = () => {
    setTransitionComplete(true);
  };

  return (
    <>
      {/* Always show transition first */}
      {!transitionComplete && (
        <DollhouseTransition onComplete={handleTransitionComplete} />
      )}
      
      {/* Show page after transition */}
      {transitionComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        >
          {children({ go })}
        </motion.div>
      )}
    </>
  );
};
