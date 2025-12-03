/**
 * Modal Component
 * Reusable modal with backdrop, animations, and accessibility
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalBackdrop, modalContent, transitions } from '../../utils/animation-system';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-full mx-4',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
}) => {
  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={modalBackdrop}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transitions.smooth}
            onClick={closeOnBackdrop ? onClose : undefined}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
          />

          {/* Modal content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={modalContent}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transitions.spring}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden pointer-events-auto ${className}`}
            >
              {/* Modal card */}
              <div className="bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-fog-light/20 
                            shadow-[0_0_60px_-15px_rgba(255,182,217,0.5)] overflow-hidden">
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="relative px-8 py-6 border-b border-fog-light/10">
                    {title && (
                      <h2 className="font-parisienne text-2xl text-fog-light text-center">
                        {title}
                      </h2>
                    )}
                    {showCloseButton && (
                      <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-zinc-500 hover:text-fog-light 
                                 transition-colors text-2xl leading-none"
                        aria-label="Close modal"
                      >
                        ×
                      </button>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * ModalHeader Component
 */
export const ModalHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`px-8 py-6 border-b border-fog-light/10 ${className}`}>
    {children}
  </div>
);

/**
 * ModalBody Component
 */
export const ModalBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`px-8 py-6 ${className}`}>
    {children}
  </div>
);

/**
 * ModalFooter Component
 */
export const ModalFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`px-8 py-6 border-t border-fog-light/10 flex justify-end gap-3 ${className}`}>
    {children}
  </div>
);
