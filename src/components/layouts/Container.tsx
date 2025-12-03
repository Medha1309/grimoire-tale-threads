/**
 * Container Component
 * Reusable container with consistent max-width and padding
 */

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const sizeClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'xl',
  className = '',
  as: Component = 'div',
}) => {
  const Comp = Component as any;
  return (
    <Comp className={`${sizeClasses[size]} mx-auto px-6 ${className}`}>
      {children}
    </Comp>
  );
};
