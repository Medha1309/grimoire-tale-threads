/**
 * Layout Components
 * Reusable layout primitives for consistent spacing and structure
 */

import React from 'react';
import { responsiveSpacing } from '../../design-system/spacing';

// ============================================================================
// TYPES
// ============================================================================

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface PageContainerProps extends BaseProps {
  size?: ContainerSize;
  noPadding?: boolean;
}

interface SectionProps extends BaseProps {
  spacing?: SpacingSize;
}

interface StackProps extends BaseProps {
  spacing?: SpacingSize;
  direction?: 'vertical' | 'horizontal';
}

interface GridProps extends BaseProps {
  cols?: { sm?: number; md?: number; lg?: number };
  gap?: SpacingSize;
}

// ============================================================================
// PAGE CONTAINER
// ============================================================================

/**
 * PageContainer - Main page wrapper with consistent padding and max-width
 */
export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  size = 'xl',
  noPadding = false,
  className = '',
  style,
}) => {
  const maxWidthClass = size === 'full' ? 'w-full' : `max-w-${size === '2xl' ? '7xl' : size === 'xl' ? '7xl' : size === 'lg' ? '5xl' : size === 'md' ? '3xl' : '2xl'}`;
  const paddingClass = noPadding ? '' : responsiveSpacing.pagePadding;
  
  return (
    <div
      className={`relative min-h-screen ${paddingClass} ${className}`.trim()}
      style={style}
    >
      <div className={`${maxWidthClass} mx-auto`}>
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// SECTION
// ============================================================================

/**
 * Section - Content section with consistent vertical spacing
 */
export const Section: React.FC<SectionProps> = ({
  children,
  spacing = 'md',
  className = '',
  style,
}) => {
  const spacingClass = spacing === 'xs' ? 'py-4 sm:py-6'
    : spacing === 'sm' ? 'py-6 sm:py-8'
    : spacing === 'md' ? 'py-8 sm:py-12 lg:py-16'
    : spacing === 'lg' ? 'py-12 sm:py-16 lg:py-20'
    : 'py-16 sm:py-20 lg:py-24';
  
  return (
    <section className={`${spacingClass} ${className}`.trim()} style={style}>
      {children}
    </section>
  );
};

// ============================================================================
// STACK
// ============================================================================

/**
 * Stack - Vertical or horizontal spacing between children
 */
export const Stack: React.FC<StackProps> = ({
  children,
  spacing = 'md',
  direction = 'vertical',
  className = '',
  style,
}) => {
  const spacingClass = direction === 'vertical'
    ? spacing === 'xs' ? 'space-y-2 sm:space-y-3'
      : spacing === 'sm' ? 'space-y-4 sm:space-y-6'
      : spacing === 'md' ? 'space-y-6 sm:space-y-8'
      : spacing === 'lg' ? 'space-y-8 sm:space-y-12'
      : 'space-y-12 sm:space-y-16'
    : spacing === 'xs' ? 'space-x-2 sm:space-x-3'
      : spacing === 'sm' ? 'space-x-4 sm:space-x-6'
      : spacing === 'md' ? 'space-x-6 sm:space-x-8'
      : spacing === 'lg' ? 'space-x-8 sm:space-x-12'
      : 'space-x-12 sm:space-x-16';
  
  const flexClass = direction === 'vertical' ? 'flex flex-col' : 'flex flex-row';
  
  return (
    <div className={`${flexClass} ${spacingClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
};

// ============================================================================
// GRID
// ============================================================================

/**
 * Grid - Responsive grid layout
 */
export const Grid: React.FC<GridProps> = ({
  children,
  cols = { sm: 1, md: 2, lg: 3 },
  gap = 'md',
  className = '',
  style,
}) => {
  const colsClass = `grid-cols-${cols.sm || 1} ${cols.md ? `md:grid-cols-${cols.md}` : ''} ${cols.lg ? `lg:grid-cols-${cols.lg}` : ''}`;
  
  const gapClass = gap === 'xs' ? 'gap-2 sm:gap-3'
    : gap === 'sm' ? 'gap-4 sm:gap-6'
    : gap === 'md' ? 'gap-6 sm:gap-8'
    : gap === 'lg' ? 'gap-8 sm:gap-12'
    : 'gap-12 sm:gap-16';
  
  return (
    <div className={`grid ${colsClass} ${gapClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
};

// ============================================================================
// CARD
// ============================================================================

interface CardProps extends BaseProps {
  padding?: SpacingSize;
  variant?: 'default' | 'large';
}

/**
 * Card - Content card with consistent padding
 */
export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  variant = 'default',
  className = '',
  style,
}) => {
  const paddingClass = variant === 'large' ? 'p-6 sm:p-8'
    : padding === 'xs' ? 'p-2 sm:p-3'
    : padding === 'sm' ? 'p-3 sm:p-4'
    : padding === 'md' ? 'p-4 sm:p-6'
    : padding === 'lg' ? 'p-6 sm:p-8'
    : 'p-8 sm:p-10';
  
  return (
    <div
      className={`${paddingClass} rounded-lg border backdrop-blur-md ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
};

// ============================================================================
// FLEX LAYOUTS
// ============================================================================

interface FlexProps extends BaseProps {
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: SpacingSize;
  wrap?: boolean;
}

/**
 * Flex - Flexible box layout
 */
export const Flex: React.FC<FlexProps> = ({
  children,
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap = false,
  className = '',
  style,
}) => {
  const alignClass = align === 'start' ? 'items-start'
    : align === 'center' ? 'items-center'
    : align === 'end' ? 'items-end'
    : 'items-stretch';
  
  const justifyClass = justify === 'start' ? 'justify-start'
    : justify === 'center' ? 'justify-center'
    : justify === 'end' ? 'justify-end'
    : justify === 'between' ? 'justify-between'
    : 'justify-around';
  
  const gapClass = gap === 'xs' ? 'gap-2'
    : gap === 'sm' ? 'gap-4'
    : gap === 'md' ? 'gap-6'
    : gap === 'lg' ? 'gap-8'
    : 'gap-12';
  
  const wrapClass = wrap ? 'flex-wrap' : '';
  
  return (
    <div
      className={`flex ${alignClass} ${justifyClass} ${gapClass} ${wrapClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
};

// ============================================================================
// CENTER
// ============================================================================

/**
 * Center - Center content horizontally and vertically
 */
export const Center: React.FC<BaseProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
};

// ============================================================================
// SPACER
// ============================================================================

interface SpacerProps {
  size?: SpacingSize;
  direction?: 'vertical' | 'horizontal';
}

/**
 * Spacer - Add space between elements
 */
export const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  direction = 'vertical',
}) => {
  const sizeClass = size === 'xs' ? (direction === 'vertical' ? 'h-2' : 'w-2')
    : size === 'sm' ? (direction === 'vertical' ? 'h-4' : 'w-4')
    : size === 'md' ? (direction === 'vertical' ? 'h-6' : 'w-6')
    : size === 'lg' ? (direction === 'vertical' ? 'h-8' : 'w-8')
    : (direction === 'vertical' ? 'h-12' : 'w-12');
  
  return <div className={sizeClass} aria-hidden="true" />;
};

// ============================================================================
// DIVIDER
// ============================================================================

interface DividerProps {
  spacing?: SpacingSize;
  className?: string;
}

/**
 * Divider - Visual separator with spacing
 */
export const Divider: React.FC<DividerProps> = ({
  spacing = 'md',
  className = '',
}) => {
  const spacingClass = spacing === 'xs' ? 'my-2'
    : spacing === 'sm' ? 'my-4'
    : spacing === 'md' ? 'my-6'
    : spacing === 'lg' ? 'my-8'
    : 'my-12';
  
  return (
    <hr
      className={`border-t border-zinc-800/30 ${spacingClass} ${className}`.trim()}
      aria-hidden="true"
    />
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  PageContainer,
  Section,
  Stack,
  Grid,
  Card,
  Flex,
  Center,
  Spacer,
  Divider,
};
