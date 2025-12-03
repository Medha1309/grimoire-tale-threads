/**
 * useForm Hook
 * Reusable form state management with validation
 */

import { useState, useCallback, FormEvent } from 'react';

interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

interface FieldConfig<T> {
  initialValue: T;
  rules?: ValidationRule<T>[];
}

interface FormConfig<T extends Record<string, any>> {
  fields: {
    [K in keyof T]: FieldConfig<T[K]>;
  };
  onSubmit: (values: T) => void | Promise<void>;
}

interface FieldState<T> {
  value: T;
  error: string | null;
  touched: boolean;
}

export function useForm<T extends Record<string, any>>(config: FormConfig<T>) {
  // Initialize form state
  const [fields, setFields] = useState<{ [K in keyof T]: FieldState<T[K]> }>(() => {
    const initialState = {} as { [K in keyof T]: FieldState<T[K]> };
    Object.keys(config.fields).forEach((key) => {
      const fieldKey = key as keyof T;
      initialState[fieldKey] = {
        value: config.fields[fieldKey].initialValue,
        error: null,
        touched: false,
      };
    });
    return initialState;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]): string | null => {
      const rules = config.fields[name].rules;
      if (!rules) return null;

      for (const rule of rules) {
        if (!rule.validate(value)) {
          return rule.message;
        }
      }
      return null;
    },
    [config.fields]
  );

  // Validate all fields
  const validateAll = useCallback((): boolean => {
    let isValid = true;
    const newFields = { ...fields };

    Object.keys(fields).forEach((key) => {
      const fieldKey = key as keyof T;
      const error = validateField(fieldKey, fields[fieldKey].value);
      newFields[fieldKey] = {
        ...fields[fieldKey],
        error,
        touched: true,
      };
      if (error) isValid = false;
    });

    setFields(newFields);
    return isValid;
  }, [fields, validateField]);

  // Set field value
  const setValue = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setFields((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          value,
          error: prev[name].touched ? validateField(name, value) : null,
        },
      }));
    },
    [validateField]
  );

  // Set field touched
  const setTouched = useCallback((name: keyof T, touched: boolean = true) => {
    setFields((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched,
        error: touched ? validateField(name, prev[name].value) : null,
      },
    }));
  }, [validateField]);

  // Handle field change
  const handleChange = useCallback(
    (name: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(name, e.target.value as T[keyof T]);
    },
    [setValue]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (name: keyof T) => () => {
      setTouched(name, true);
    },
    [setTouched]
  );

  // Handle form submit
  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (!validateAll()) {
        return;
      }

      setIsSubmitting(true);
      try {
        const values = {} as T;
        Object.keys(fields).forEach((key) => {
          const fieldKey = key as keyof T;
          values[fieldKey] = fields[fieldKey].value;
        });

        await config.onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [fields, validateAll, config]
  );

  // Reset form
  const reset = useCallback(() => {
    const resetState = {} as { [K in keyof T]: FieldState<T[K]> };
    Object.keys(config.fields).forEach((key) => {
      const fieldKey = key as keyof T;
      resetState[fieldKey] = {
        value: config.fields[fieldKey].initialValue,
        error: null,
        touched: false,
      };
    });
    setFields(resetState);
  }, [config.fields]);

  // Get field props for easy binding
  const getFieldProps = useCallback(
    (name: keyof T) => ({
      value: fields[name].value,
      onChange: handleChange(name),
      onBlur: handleBlur(name),
      error: fields[name].touched ? fields[name].error : null,
    }),
    [fields, handleChange, handleBlur]
  );

  // Check if form is valid
  const isValid = Object.values(fields).every((field) => !field.error);

  // Check if form is dirty
  const isDirty = Object.keys(fields).some((key) => {
    const fieldKey = key as keyof T;
    return fields[fieldKey].value !== config.fields[fieldKey].initialValue;
  });

  return {
    fields,
    isSubmitting,
    isValid,
    isDirty,
    setValue,
    setTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    getFieldProps,
  };
}

// Common validation rules
export const validators = {
  required: <T>(message: string = 'This field is required'): ValidationRule<T> => ({
    validate: (value) => {
      if (typeof value === 'string') return value.trim().length > 0;
      return value != null;
    },
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule<string> => ({
    validate: (value) => value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    validate: (value) => value.length <= max,
    message: message || `Must be at most ${max} characters`,
  }),

  email: (message: string = 'Invalid email address'): ValidationRule<string> => ({
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  pattern: (regex: RegExp, message: string): ValidationRule<string> => ({
    validate: (value) => regex.test(value),
    message,
  }),

  min: (min: number, message?: string): ValidationRule<number> => ({
    validate: (value) => value >= min,
    message: message || `Must be at least ${min}`,
  }),

  max: (max: number, message?: string): ValidationRule<number> => ({
    validate: (value) => value <= max,
    message: message || `Must be at most ${max}`,
  }),

  custom: <T>(validate: (value: T) => boolean, message: string): ValidationRule<T> => ({
    validate,
    message,
  }),
};
