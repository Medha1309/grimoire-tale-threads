/**
 * UnifiedWritingModal Component
 * Sophisticated, reusable writing interface for all content types
 * Used for: Forum posts, Stories, Diary entries, etc.
 */

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalVariants } from '../../utils/animations';

export interface WritingModalField {
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'toggle';
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  options?: readonly string[] | string[]; // For select/multiselect
  rows?: number; // For textarea
}

export interface WritingModalData {
  [key: string]: string | string[] | boolean;
}

interface UnifiedWritingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WritingModalData) => Promise<void>;
  
  // Configuration
  title: string;
  submitButtonText?: string;
  submittingText?: string;
  
  // Fields configuration
  fields: WritingModalField[];
  
  // Initial values (for editing)
  initialValues?: WritingModalData;
  
  // Optional features
  showFormatting?: boolean;
  showWordCount?: boolean;
  showCharCount?: boolean;
  
  // Validation
  minContentLength?: number;
  
  // Styling
  accentColor?: string;
}

export const UnifiedWritingModal: React.FC<UnifiedWritingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  submitButtonText = 'Submit',
  submittingText = 'Submitting...',
  fields,
  initialValues = {},
  showFormatting = false,
  showWordCount = true,
  showCharCount = false,
  minContentLength = 10,
  accentColor = '#6a0000',
}) => {
  const [formData, setFormData] = useState<WritingModalData>(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});
  
  // Reset form data when initialValues change or modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData(initialValues);
      setError(null);
    }
  }, [isOpen, initialValues]);

  // Update field value
  const updateField = useCallback((name: string, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Toggle multiselect option
  const toggleMultiselect = useCallback((name: string, option: string) => {
    setFormData(prev => {
      const current = (prev[name] as string[]) || [];
      const updated = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option];
      return { ...prev, [name]: updated };
    });
  }, []);

  // Apply text formatting
  const applyFormatting = useCallback((fieldName: string, prefix: string, suffix: string = prefix) => {
    const textarea = textareaRefs.current[fieldName];
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const content = (formData[fieldName] as string) || '';
    const selectedText = content.substring(start, end);
    
    if (selectedText) {
      const newContent = 
        content.substring(0, start) + 
        prefix + selectedText + suffix + 
        content.substring(end);
      updateField(fieldName, newContent);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
      }, 0);
    } else {
      const newContent = 
        content.substring(0, start) + 
        prefix + suffix + 
        content.substring(end);
      updateField(fieldName, newContent);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, start + prefix.length);
      }, 0);
    }
  }, [formData, updateField]);

  // Calculate stats
  const getContentStats = (content: string) => {
    const words = content.trim().split(/\s+/).filter(w => w).length;
    const chars = content.length;
    return { words, chars };
  };

  // Validate form
  const validateForm = (): string | null => {
    for (const field of fields) {
      if (field.required) {
        const value = formData[field.name];
        
        if (field.type === 'multiselect') {
          if (!value || (value as string[]).length === 0) {
            return `${field.label} is required`;
          }
        } else if (field.type === 'textarea' || field.type === 'text') {
          const strValue = (value as string) || '';
          if (!strValue.trim()) {
            return `${field.label} is required`;
          }
          if (field.type === 'textarea' && strValue.trim().length < minContentLength) {
            return `${field.label} must be at least ${minContentLength} characters`;
          }
        }
      }
      
      if (field.maxLength && field.type !== 'multiselect') {
        const strValue = (formData[field.name] as string) || '';
        if (strValue.length > field.maxLength) {
          return `${field.label} exceeds maximum length of ${field.maxLength}`;
        }
      }
    }
    return null;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      await onSubmit(formData);
      
      // Reset form
      setFormData({});
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle close
  const handleClose = () => {
    if (!submitting) {
      setFormData({});
      setError(null);
      onClose();
    }
  };

  // Render field
  const renderField = (field: WritingModalField) => {
    const value = formData[field.name];

    switch (field.type) {
      case 'text':
        return (
          <div key={field.name}>
            <label className="block text-zinc-100 font-sans text-sm mb-2">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <input
              type="text"
              value={(value as string) || ''}
              onChange={(e) => updateField(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 bg-black/40 border border-zinc-800 
                         rounded-lg text-zinc-100 font-serif
                         focus:outline-none focus:border-[var(--accent)] 
                         placeholder:text-zinc-500 transition-colors"
              style={{ '--accent': accentColor } as React.CSSProperties}
              disabled={submitting}
              maxLength={field.maxLength}
            />
            {field.maxLength && (
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                {((value as string) || '').length}/{field.maxLength}
              </p>
            )}
          </div>
        );

      case 'textarea': {
        const stats = getContentStats((value as string) || '');
        return (
          <div key={field.name}>
            <label className="block text-zinc-100 font-sans text-sm mb-2">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            
            {/* Formatting toolbar */}
            {showFormatting && (
              <div className="flex items-center gap-1 mb-2 pb-2 border-b border-zinc-800/40">
                <button
                  type="button"
                  onClick={() => applyFormatting(field.name, '**')}
                  className="px-2 py-1 text-xs font-bold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 rounded transition-colors"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting(field.name, '*')}
                  className="px-2 py-1 text-xs italic text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 rounded transition-colors"
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting(field.name, '`')}
                  className="px-2 py-1 text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 rounded transition-colors"
                  title="Code"
                >
                  {'</>'}
                </button>
                <div className="flex-1" />
                <span className="text-xs text-zinc-600">Markdown supported</span>
              </div>
            )}
            
            <textarea
              ref={(el) => { textareaRefs.current[field.name] = el; }}
              value={(value as string) || ''}
              onChange={(e) => updateField(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={field.rows || 8}
              className="w-full px-4 py-3 bg-black/40 border border-zinc-800 
                         rounded-lg text-zinc-100 font-serif
                         focus:outline-none focus:border-[var(--accent)] 
                         placeholder:text-zinc-500 resize-none transition-colors"
              style={{ '--accent': accentColor } as React.CSSProperties}
              disabled={submitting}
              maxLength={field.maxLength}
            />
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-sans">
                {showWordCount && <span>{stats.words} words</span>}
                {showCharCount && <span>{stats.chars} characters</span>}
              </div>
              {field.maxLength && (
                <p className="text-xs text-zinc-400 font-sans">
                  {((value as string) || '').length}/{field.maxLength}
                </p>
              )}
            </div>
          </div>
        );
      }

      case 'select':
        return (
          <div key={field.name}>
            <label className="block text-zinc-100 font-sans text-sm mb-2">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <select
              value={(value as string) || ''}
              onChange={(e) => updateField(field.name, e.target.value)}
              className="w-full px-4 py-3 bg-black/40 border border-zinc-800 
                         rounded-lg text-zinc-100 font-serif
                         focus:outline-none focus:border-[var(--accent)]"
              style={{ '--accent': accentColor } as React.CSSProperties}
              disabled={submitting}
            >
              <option value="">Select...</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );

      case 'multiselect': {
        const selected = (value as string[]) || [];
        return (
          <div key={field.name}>
            <label className="block text-zinc-100 font-sans text-sm mb-3">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <div className="flex flex-wrap gap-2">
              {field.options?.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleMultiselect(field.name, option)}
                  disabled={submitting}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all
                    ${selected.includes(option)
                      ? 'bg-[var(--accent)]/30 text-zinc-100 border-2 border-[var(--accent)]'
                      : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-800'
                    } disabled:opacity-50`}
                  style={{ '--accent': accentColor } as React.CSSProperties}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      }

      case 'toggle':
        return (
          <div key={field.name} className="flex items-center justify-between">
            <label className="text-zinc-100 font-sans text-sm">
              {field.label}
            </label>
            <button
              type="button"
              onClick={() => updateField(field.name, !(value as boolean))}
              disabled={submitting}
              className={`relative w-12 h-6 rounded-full transition-colors
                ${(value as boolean) ? 'bg-[var(--accent)]' : 'bg-zinc-700'}`}
              style={{ '--accent': accentColor } as React.CSSProperties}
            >
              <motion.div
                className="absolute top-1 w-4 h-4 bg-white rounded-full"
                animate={{ left: (value as boolean) ? '28px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-zinc-900/95 border border-zinc-800 rounded-xl backdrop-blur-md
                         shadow-[0_0_60px_-10px_rgba(0,0,0,0.8)]
                         w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800/50 px-8 py-6 z-10">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl text-zinc-100">
                    {title}
                  </h2>
                  <button
                    onClick={handleClose}
                    disabled={submitting}
                    className="text-zinc-400 hover:text-zinc-100 transition-colors
                               disabled:opacity-50 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {fields.map(renderField)}

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg border border-red-800/40 bg-red-900/10"
                  >
                    <p className="text-red-300 text-sm font-sans">{error}</p>
                  </motion.div>
                )}

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={submitting}
                    className="flex-1 px-6 py-3 border border-zinc-800 rounded-lg 
                               text-zinc-400 font-sans text-sm
                               hover:bg-zinc-800/50 transition-colors
                               disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 rounded-lg text-zinc-100 font-sans text-sm
                               transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: `${accentColor}20`,
                      border: `1px solid ${accentColor}`,
                    }}
                  >
                    {submitting ? submittingText : submitButtonText}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
