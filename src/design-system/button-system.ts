/**
 * GRIMOIRE Button Design System
 * Consistent button styles, positions, and naming conventions
 */

// ============================================
// BUTTON VARIANTS
// ============================================

export const buttonVariants = {
  // Primary action buttons (Write, Create, Submit) - GRIMOIRE crimson (translucent)
  primary: `
    px-6 py-3 
    bg-[#6a0000]/30 
    backdrop-blur-sm
    border border-[#6a0000]/40
    text-zinc-100 
    rounded-lg 
    font-serif text-sm tracking-wider
    hover:bg-[#8B0000]/40 hover:border-[#8B0000]/50
    transition-all
    disabled:opacity-50 disabled:cursor-not-allowed
  `,

  // Secondary action buttons (Cancel, Back)
  secondary: `
    px-6 py-3 
    border border-zinc-800 
    text-zinc-400 
    rounded-lg 
    font-serif text-sm tracking-wider
    hover:border-zinc-700 hover:text-zinc-300 
    transition-colors
    disabled:opacity-50 disabled:cursor-not-allowed
  `,

  // Tertiary/Ghost buttons (Skip, Close)
  ghost: `
    px-4 py-2 
    text-zinc-500 
    font-serif text-sm
    hover:text-zinc-300 
    transition-colors
    disabled:opacity-50 disabled:cursor-not-allowed
  `,

  // Danger buttons (Delete, Remove) - GRIMOIRE crimson
  danger: `
    px-6 py-3 
    bg-[#4a0000]/20 
    border border-[#6a0000]/40 
    text-red-400 
    rounded-lg 
    font-serif text-sm tracking-wider
    hover:bg-[#4a0000]/30 hover:border-[#6a0000]/60 
    transition-colors
    disabled:opacity-50 disabled:cursor-not-allowed
  `,

  // Icon-only buttons
  icon: `
    p-2 
    text-zinc-500 
    rounded 
    hover:text-zinc-300 hover:bg-zinc-900/50 
    transition-colors
    disabled:opacity-50 disabled:cursor-not-allowed
  `,

  // Link-style buttons
  link: `
    text-zinc-500 
    font-serif text-sm
    hover:text-zinc-300 
    underline-offset-4 hover:underline 
    transition-colors
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
};

// ============================================
// BUTTON POSITIONS
// ============================================

export const buttonPositions = {
  // Primary action - always top-right
  primaryAction: 'absolute top-4 right-4',
  
  // Secondary action - always top-left
  secondaryAction: 'absolute top-4 left-4',
  
  // Back/Close - always top-left
  back: 'absolute top-4 left-4',
  
  // Skip - always bottom-center
  skip: 'absolute bottom-8 left-1/2 -translate-x-1/2',
  
  // Form actions - always bottom-right
  formActions: 'flex justify-end gap-3',
  
  // Modal actions - always bottom with full width
  modalActions: 'flex justify-between items-center w-full',
  
  // Centered single action
  centered: 'flex justify-center',
  
  // Floating action button (FAB) - bottom-right
  fab: 'fixed bottom-8 right-8 z-40',
};

// ============================================
// BUTTON NAMING CONVENTIONS
// ============================================

export const buttonLabels = {
  // Creation actions
  write: 'Write',
  create: 'Create',
  add: 'Add',
  compose: 'Compose',
  
  // Navigation actions
  back: 'Back',
  close: 'Close',
  skip: 'Skip',
  next: 'Next',
  
  // Confirmation actions
  save: 'Save',
  submit: 'Submit',
  confirm: 'Confirm',
  
  // Cancellation actions
  cancel: 'Cancel',
  discard: 'Discard',
  
  // Deletion actions
  delete: 'Delete',
  remove: 'Remove',
  
  // View actions
  view: 'View',
  read: 'Read',
  open: 'Open',
  
  // Edit actions
  edit: 'Edit',
  update: 'Update',
};

// ============================================
// BUTTON OPACITY STANDARDS
// ============================================

export const buttonOpacity = {
  // Default state
  default: 'opacity-100',
  
  // Hover state
  hover: 'hover:opacity-90',
  
  // Disabled state
  disabled: 'opacity-50',
  
  // Loading state
  loading: 'opacity-70',
  
  // Ghost/subtle buttons
  subtle: 'opacity-60 hover:opacity-100',
};

// ============================================
// BUTTON GROUPS
// ============================================

export const buttonGroups = {
  // Horizontal button group
  horizontal: 'flex items-center gap-3',
  
  // Vertical button group
  vertical: 'flex flex-col gap-2',
  
  // Split button group (left and right)
  split: 'flex justify-between items-center',
  
  // Centered button group
  centered: 'flex justify-center items-center gap-3',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get button classes by variant
 */
export const getButtonClasses = (
  variant: keyof typeof buttonVariants = 'primary',
  className?: string
): string => {
  return `${buttonVariants[variant]} ${className || ''}`.trim();
};

/**
 * Get button position classes
 */
export const getButtonPosition = (
  position: keyof typeof buttonPositions,
  className?: string
): string => {
  return `${buttonPositions[position]} ${className || ''}`.trim();
};

/**
 * Get button label by action type
 */
export const getButtonLabel = (action: keyof typeof buttonLabels): string => {
  return buttonLabels[action];
};

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// Primary Write button (top-right)
<button className={getButtonClasses('primary') + ' ' + getButtonPosition('primaryAction')}>
  {getButtonLabel('write')}
</button>

// Back button (top-left)
<button className={getButtonClasses('ghost') + ' ' + getButtonPosition('back')}>
  {getButtonLabel('back')}
</button>

// Skip button (bottom-center)
<button className={getButtonClasses('ghost') + ' ' + getButtonPosition('skip')}>
  {getButtonLabel('skip')}
</button>

// Form actions (bottom-right)
<div className={buttonGroups.horizontal + ' ' + buttonPositions.formActions}>
  <button className={getButtonClasses('secondary')}>
    {getButtonLabel('cancel')}
  </button>
  <button className={getButtonClasses('primary')}>
    {getButtonLabel('save')}
  </button>
</div>
*/
