/**
 * PageLayout Component
 * Reusable page layout with consistent structure
 */

import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, transitions } from '../../utils/animation-system';

interface PageLayoutProps {
  children: React.ReactNode;
  background?: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  background,
  className = '',
  animate = true,
}) => {
  const Container = animate ? motion.section : 'section';
  const animationProps = animate
    ? {
        variants: pageVariants,
        initial: 'initial',
        animate: 'animate',
        exit: 'exit',
        transition: transitions.smooth,
      }
    : {};

  return (
    <Container
      className={`relative min-h-screen ${className}`}
      {...animationProps}
    >
      {background}
      {children}
    </Container>
  );
};
