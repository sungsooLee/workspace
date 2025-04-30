import { forwardRef } from 'react';

import { cn } from '@learnway/shared';

import styles from './textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  dummy?: any;
  className?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  size?: 'xs' | 'sm' | 'md'; // textarea 높이(basic : md)
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      resize,
      className,
      disabled,
      readOnly,
      maxLength = 0,
      value,
      onChange,
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
          maxLength={maxLength > 0 ? maxLength : undefined}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          {...props}
        />
        {/* 입력 글자수 */}
        {maxLength > 0 && (
          <p className={styles.text_limit}>
            <span className={styles.num}>{currentLength}</span>/{maxLength}
          </p>
        )}
      </div>
    );
  },
);

export const Textarea = TextareaComponent;
