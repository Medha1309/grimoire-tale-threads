/**
 * Typography Component
 * Provides consistent text styling across the application
 */

import React from 'react';
import { typographyClasses } from '../../design-system/typography';

// ============================================================================
// TYPES
// ============================================================================

type TextVariant = keyof typeof typographyClasses;
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TextAlign = 'left' | 'center' | 'right' | 'justify';

interface BaseTypographyProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  align?: TextAlign;
  truncate?: boolean | number; // true for single line, number for multi-line
}

interface HeadingProps extends BaseTypographyProps {
  as?: HeadingLevel;
  variant?: Extract<TextVariant, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
}

interface TextProps extends BaseTypographyProps {
  as?: 'p' | 'span' | 'div' | 'label' | 'em';
  variant?: Exclude<TextVariant, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
}

// ============================================================================
// HEADING COMPONENT
// ============================================================================

export const Heading: React.FC<HeadingProps> = ({
  as = 'h2',
  variant,
  children,
  className = '',
  style,
  align = 'left',
  truncate = false,
}) => {
  const Component = as;
  const variantClass = variant ? typographyClasses[variant] : typographyClasses[as];
  
  const truncateClass = truncate
    ? truncate === true
      ? 'overflow-hidden text-ellipsis whitespace-nowrap'
      : `line-clamp-${truncate}`
    : '';
  
  const alignClass = align !== 'left' ? `text-${align}` : '';
  
  return (
    <Component
      className={`${variantClass} ${truncateClass} ${alignClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// TEXT COMPONENT
// ============================================================================

export const Text: React.FC<TextProps> = ({
  as = 'p',
  variant = 'body',
  children,
  className = '',
  style,
  align = 'left',
  truncate = false,
}) => {
  const Component = as;
  const variantClass = typographyClasses[variant];
  
  const truncateClass = truncate
    ? truncate === true
      ? 'overflow-hidden text-ellipsis whitespace-nowrap'
      : `line-clamp-${truncate}`
    : '';
  
  const alignClass = align !== 'left' ? `text-${align}` : '';
  
  return (
    <Component
      className={`${variantClass} ${truncateClass} ${alignClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// SPECIALIZED COMPONENTS
// ============================================================================

/**
 * Page Title - For main page headers
 */
export const PageTitle: React.FC<Omit<HeadingProps, 'variant'>> = (props) => (
  <Heading variant="h1" {...props} />
);

/**
 * Section Header - For major sections
 */
export const SectionHeader: React.FC<Omit<HeadingProps, 'variant'>> = (props) => (
  <Heading variant="h2" {...props} />
);

/**
 * Card Title - For card headers
 */
export const CardTitle: React.FC<Omit<HeadingProps, 'variant'>> = (props) => (
  <Heading variant="h4" {...props} />
);

/**
 * Body Text - For main content
 */
export const BodyText: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="body" {...props} />
);

/**
 * Caption - For small descriptive text
 */
export const Caption: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="caption" {...props} />
);

/**
 * Label - For form labels and UI text
 */
export const Label: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="label" as="label" {...props} />
);

/**
 * Button Text - For button content
 */
export const ButtonText: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="button" as="span" {...props} />
);

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

/**
 * Emphasis - For italic/emphasized text
 */
export const Emphasis: React.FC<BaseTypographyProps> = ({
  children,
  className = '',
  ...props
}) => (
  <Text
    as="em"
    variant="body"
    className={`italic font-medium ${className}`}
    {...props}
  >
    {children}
  </Text>
);

/**
 * Strong - For bold text
 */
export const Strong: React.FC<BaseTypographyProps> = ({
  children,
  className = '',
  ...props
}) => (
  <Text
    as="span"
    variant="body"
    className={`font-semibold ${className}`}
    {...props}
  >
    {children}
  </Text>
);

/**
 * Code - For inline code
 */
export const Code: React.FC<BaseTypographyProps> = ({
  children,
  className = '',
  ...props
}) => (
  <Text
    as="span"
    variant="code"
    className={`bg-zinc-900/50 px-1.5 py-0.5 rounded ${className}`}
    {...props}
  >
    {children}
  </Text>
);

/**
 * Link Text - For styled links
 */
interface LinkTextProps extends BaseTypographyProps {
  href?: string;
  onClick?: () => void;
}

export const LinkText: React.FC<LinkTextProps> = ({
  children,
  className = '',
  href,
  onClick,
  ...props
}) => {
  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={`font-body text-base underline hover:no-underline transition-colors ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  Heading,
  Text,
  PageTitle,
  SectionHeader,
  CardTitle,
  BodyText,
  Caption,
  Label,
  ButtonText,
  Emphasis,
  Strong,
  Code,
  LinkText,
};
