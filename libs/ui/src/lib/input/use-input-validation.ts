import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface ValidationRule {
  regex: RegExp;
  errorMessageKey: string;
}

export interface UseInputValidationOptions {
  validationRule?: ValidationRule;
  onValidationError?: (message: string) => void;
  label?: string;
}

export const useInputValidation = (options: UseInputValidationOptions = {}) => {
  const { validationRule, onValidationError, label } = options;
  const { t } = useTranslation();

  const [validationError, setValidationError] = useState('');

  const clearValidationError = useCallback(() => {
    setValidationError('');
  }, []);

  const setError = useCallback(
    (errorMessage: string) => {
      // 검증 에러 설정
      setValidationError(errorMessage);
      onValidationError?.(errorMessage);
    },
    [onValidationError],
  );

  const validateInput = useCallback(
    (value: string): boolean => {
      if (!validationRule) return true;

      const isValid = validationRule.regex.test(value);
      if (!isValid) {
        const errorMessage = t(validationRule.errorMessageKey, { type: t(label ?? '') });
        setError(errorMessage);
        return false;
      }

      clearValidationError();
      return true;
    },
    [validationRule, clearValidationError, t, label, setError],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!validationRule) return;

      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
        'Tab',
        'Enter',
        'Escape',
      ];

      if (event.ctrlKey || event.metaKey) return;

      if (!allowedKeys.includes(event.key) && !validationRule.regex.test(event.key)) {
        event.preventDefault();
        const errorMessage = t(validationRule.errorMessageKey, { type: t(label ?? '') });
        setError(errorMessage);
      }
    },
    [validationRule, t, label, setError],
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (!validationRule) return;

      const pastedText = event.clipboardData.getData('text');
      if (!validationRule.regex.test(pastedText)) {
        event.preventDefault();
        const errorMessage = t(validationRule.errorMessageKey, { type: t(label ?? '') });
        setError(errorMessage);
      }
    },
    [validationRule, t, label, setError],
  );

  return {
    validationError,
    validateInput,
    handleKeyDown,
    handlePaste,
    clearValidationError,
  };
};

export const VALIDATION_RULES = {
  alphanumeric: {
    regex: /^[a-zA-Z0-9._|]*$/,
    errorMessageKey: 'LABEL.form.validation.alphanumeric',
  },
  url: {
    regex: /^[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*$/,
    errorMessageKey: 'LABEL.form.validation.url',
  },
} as const;
