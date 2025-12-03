import { useState, useCallback } from 'react';
import {
  validateTitle,
  validatePostContent,
  validateEmail,
  validateLength,
  checkRateLimit,
} from '../utils/security';
import { SECURITY_CONFIG } from '../config/security';

interface ValidationError {
  field: string;
  message: string;
}

export const useValidation = () => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const addError = useCallback((field: string, message: string) => {
    setErrors((prev) => [...prev, { field, message }]);
  }, []);

  const validateField = useCallback(
    (field: string, value: string, type: 'title' | 'content' | 'email' | 'displayName' | 'bio') => {
      switch (type) {
        case 'title': {
          const result = validateTitle(value);
          if (!result.valid) {
            addError(field, result.error || 'Invalid title');
            return false;
          }
          break;
        }
        case 'content': {
          const result = validatePostContent(value);
          if (!result.valid) {
            addError(field, result.error || 'Invalid content');
            return false;
          }
          break;
        }
        case 'email': {
          if (!validateEmail(value)) {
            addError(field, 'Invalid email address');
            return false;
          }
          break;
        }
        case 'displayName': {
          if (!validateLength(value, 1, SECURITY_CONFIG.MAX_DISPLAY_NAME_LENGTH)) {
            addError(
              field,
              `Display name must be 1-${SECURITY_CONFIG.MAX_DISPLAY_NAME_LENGTH} characters`
            );
            return false;
          }
          break;
        }
        case 'bio': {
          if (value && !validateLength(value, 0, SECURITY_CONFIG.MAX_BIO_LENGTH)) {
            addError(field, `Bio must be less than ${SECURITY_CONFIG.MAX_BIO_LENGTH} characters`);
            return false;
          }
          break;
        }
      }
      return true;
    },
    [addError]
  );

  const checkActionRateLimit = useCallback(
    (action: keyof typeof SECURITY_CONFIG.RATE_LIMITS): boolean => {
      const limit = SECURITY_CONFIG.RATE_LIMITS[action];
      if (!checkRateLimit(action, limit.max, limit.windowMs)) {
        addError('rateLimit', 'Too many requests. Please wait a moment.');
        return false;
      }
      return true;
    },
    [addError]
  );

  const getFieldError = useCallback(
    (field: string): string | undefined => {
      return errors.find((e) => e.field === field)?.message;
    },
    [errors]
  );

  const hasErrors = errors.length > 0;

  return {
    errors,
    hasErrors,
    clearErrors,
    addError,
    validateField,
    checkActionRateLimit,
    getFieldError,
  };
};
