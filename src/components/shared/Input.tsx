/**
 * GRIMOIRE Input Component
 * Matches forum/app styling
 */

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      type = 'text',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-zinc-400 font-sans text-xs mb-2 tracking-wider uppercase" style={{ letterSpacing: '0.1em' }}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full px-4 py-3 bg-black/5 border border-zinc-700/15
                     rounded text-zinc-100 font-sans text-sm
                     focus:outline-none focus:border-zinc-500/50 focus:bg-black/15
                     focus:shadow-[0_0_20px_rgba(161,161,170,0.15)]
                     placeholder:text-zinc-500/40
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 cursor-text backdrop-blur-lg
                     ${className}`}
          disabled={disabled}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400 font-sans">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-zinc-400 font-sans">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea Component
 */
interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      rows = 4,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-zinc-400 font-sans text-xs mb-2 tracking-wider uppercase" style={{ letterSpacing: '0.1em' }}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full px-4 py-3 bg-black/5 border border-zinc-700/15
                     rounded text-zinc-100 font-sans text-sm leading-relaxed
                     focus:outline-none focus:border-zinc-500/50 focus:bg-black/15
                     focus:shadow-[0_0_20px_rgba(161,161,170,0.15)]
                     placeholder:text-zinc-500/40
                     disabled:opacity-50 disabled:cursor-not-allowed
                     resize-vertical transition-all duration-300 cursor-text backdrop-blur-lg
                     ${className}`}
          disabled={disabled}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400 font-sans">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-zinc-400 font-sans">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
