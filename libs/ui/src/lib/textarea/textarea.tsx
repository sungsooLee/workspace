import { forwardRef, useMemo } from 'react';

import { cn } from '@learnway/shared';

import styles from './textarea.module.css';
import { t } from 'i18next';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  dummy?: any;
  className?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  size?: 'xs' | 'sm' | 'md'; // textarea 높이(basic : md)
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  hiddenPlaceholder?: boolean;
}

const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      resize,
      className,
      disabled,
      readOnly,
      maxLength,
      value,
      onChange,
      placeholder,
      hiddenPlaceholder,
      ...props
    },
    ref,
  ) => {
    // const [inputValue, setInputValue] = useState(value);

    // useEffect(() => {
    //   setInputValue(value);
    // }, [value]);

    // useEffect(() => {
    //   if (value !== inputValue) {
    //     const event = {
    //       target: {
    //         value: inputValue,
    //       },
    //     } as React.ChangeEvent<HTMLTextAreaElement>;
    //     onChange?.(event);
    //   }
    // }, [inputValue]);

    // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //   setInputValue(e.target.value);
    // };

    const placeholderText = useMemo(() => {
      if (hiddenPlaceholder) return '';
      if (placeholder) return t(placeholder);
      if (props && props.label)
        return `${t(props.label as any)} ${t('LABEL.form.input.placeholder')}`;
      return t('LABEL.form.input.placeholder');
    }, [placeholder, props?.label, hiddenPlaceholder]);

    const currentLength = (value as string)?.length || 0;

    return (
      <div
        className={cn(
          styles.start,
          styles.textarea_wrap,
          disabled && styles.disabled,
          readOnly && styles.readonly,
          'textarea_wrap',
          className,
        )}
      >
        {/* textarea */}
        <textarea
          value={value}
          className={cn(
            styles.textarea,
            className,
            'nlp--textarea',
            resize && styles[resize],
            size && styles[size],
          )}
          placeholder={placeholderText}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          {...props}
        />
        {/* 입력 글자수 */}
        {maxLength && (
          <p className={styles.text_limit}>
            <span className={styles.num}>{currentLength}</span>/{maxLength}
          </p>
        )}
      </div>
    );
  },
);

export const Textarea = TextareaComponent;
