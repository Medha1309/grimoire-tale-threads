/**
 * GRIMOIRE Button Component
 * Consistent button implementation across the app
 */

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { getButtonClasses, getButtonPosition, buttonLabels } from '../../design-system/button-system';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'icon' | 'link' | 'auth' | 'google';
type ButtonPosition = 'primaryAction' | 'secondaryAction' | 'back' | 'skip' | 'fab' | 'centered';
type ButtonAction = keyof typeof buttonLabels;
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant;
  position?: ButtonPosition;
  action?: ButtonAction;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  animated?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      position,
      action,
      size = 'md',
      loading = false,
      fullWidth = false,
      animated = true,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    // Variant-specific classes (extended for auth and google)
    const customVariantClasses: Record<string, string> = {
      auth: 'bg-gradient-to-b from-zinc-800/20 to-zinc-900/40 hover:from-zinc-800/30 hover:to-zinc-900/50 text-zinc-100 border border-zinc-700/40 shadow-lg backdrop-blur-sm',
      google: 'bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 shadow-sm',
    };
    
    // Build class string - use custom variants if available, otherwise use design system
    const baseClasses = variant in customVariantClasses 
      ? customVariantClasses[variant] 
      : getButtonClasses(variant as 'primary' | 'secondary' | 'ghost' | 'danger' | 'icon' | 'link');
    const positionClasses = position ? getButtonPosition(position) : '';
    const widthClass = fullWidth ? 'w-full' : '';
    const loadingClass = loading ? 'opacity-70 cursor-wait' : '';
    const sizeClass = sizeClasses[size];
    
    const combinedClasses = `
      ${baseClasses}
      ${sizeClass}
      ${positionClasses}
      ${widthClass}
      ${loadingClass}
      rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
      ${className}
    `.trim().replace(/\s+/g, ' ');

    // Get button label if action is provided
    const buttonText = action ? buttonLabels[action] : children;

    // Render animated or static button
    if (animated) {
      return (
        <motion.button
          ref={ref}
          className={combinedClasses}
          disabled={disabled || loading}
          whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
          whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
          {...(props as HTMLMotionProps<'button'>)}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {buttonText}
            </span>
          ) : (
            buttonText
          )}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={combinedClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {buttonText}
          </span>
        ) : (
          buttonText
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ============================================
// PRESET BUTTON COMPONENTS
// ============================================

/**
 * Primary Write Button (Top-Right)
 */
export const WriteButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'position' | 'action'>>(
  (props, ref) => (
    <Button
      ref={ref}
      variant="primary"
      position="primaryAction"
      action="write"
      {...props}
    />
  )
);
WriteButton.displayName = 'WriteButton';

/**
 * Primary Create Button (Top-Right)
 */
export const CreateButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'position' | 'action'>>(
  (props, ref) => (
    <Button
      ref={ref}
      variant="primary"
      position="primaryAction"
      action="create"
      {...props}
    />
  )
);
CreateButton.displayName = 'CreateButton';

/**
 * Back Button (Top-Left)
 */
export const BackButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'position' | 'action'>>(
  (props, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      position="back"
      action="back"
      {...props}
    />
  )
);
BackButton.displayName = 'BackButton';

/**
 * Skip Button (Bottom-Center)
 */
export const SkipButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'position' | 'action'>>(
  (props, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      position="skip"
      action="skip"
      {...props}
    />
  )
);
SkipButton.displayName = 'SkipButton';

/**
 * Close Button (Icon)
 */
export const CloseButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'action'>>(
  (props, ref) => (
    <Button
      ref={ref}
      variant="icon"
      action="close"
      {...props}
    >
      ✕
    </Button>
  )
);
CloseButton.displayName = 'CloseButton';

/**
 * Save Button
 */
export const SaveButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'action'>>(
  (props, ref) => (
    <Button
      ref={ref}
      variant="primary"
      action="save"
      {...props}
    />
  )
);
SaveButton.displayName = 'SaveButton';

/**
 * Cancel Button
 */
export const CancelButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'action'>>(
  (props, ref) => (
    <Button
      ref={ref}
      variant="secondary"
      action="cancel"
      {...props}
    />
  )
);
CancelButton.displayName = 'CancelButton';

/**
 * Delete Button
 */
export const DeleteButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'action'>>(
  (props, ref) => (
    <Button
      ref={ref}
      variant="danger"
      action="delete"
      {...props}
    />
  )
);
DeleteButton.displayName = 'DeleteButton';

// ============================================
// BUTTON GROUP COMPONENT
// ============================================

interface ButtonGroupProps {
  children: React.ReactNode;
  layout?: 'horizontal' | 'vertical' | 'split' | 'centered';
  position?: 'formActions' | 'modalActions';
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  layout = 'horizontal',
  position,
  className = '',
}) => {
  const layoutClasses = {
    horizontal: 'flex items-center gap-3',
    vertical: 'flex flex-col gap-2',
    split: 'flex justify-between items-center',
    centered: 'flex justify-center items-center gap-3',
  };

  const positionClasses = {
    formActions: 'flex justify-end gap-3',
    modalActions: 'flex justify-between items-center w-full',
  };

  const classes = `
    ${position ? positionClasses[position] : layoutClasses[layout]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return <div className={classes}>{children}</div>;
};

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// Using preset components
<WriteButton onClick={handleWrite} />
<BackButton onClick={handleBack} />
<SkipButton onClick={handleSkip} />

// Using base Button component
<Button variant="primary" position="primaryAction" action="write" onClick={handleWrite} />
<Button variant="ghost" position="back" action="back" onClick={handleBack} />

// Form actions
<ButtonGroup position="formActions">
  <CancelButton onClick={handleCancel} />
  <SaveButton onClick={handleSave} loading={isSaving} />
</ButtonGroup>

// Modal actions
<ButtonGroup position="modalActions">
  <DeleteButton onClick={handleDelete} />
  <div className="flex gap-3">
    <CancelButton onClick={handleCancel} />
    <SaveButton onClick={handleSave} />
  </div>
</ButtonGroup>

// Custom button
<Button variant="secondary" className="custom-class" onClick={handleClick}>
  Custom Label
</Button>
*/
