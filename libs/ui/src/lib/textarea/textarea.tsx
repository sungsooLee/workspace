import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';

import { cn } from '@learnway/shared';

import { BaseFieldProps } from '../type';

import styles from './textarea.module.css';

export interface TextareaComponentProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  dummy?: any;
  className?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  size?: 'sm' | 'md'; // textarea 높이(basic : md)
  border?: 'none'; // border 없는 경우
}

const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaComponentProps>(
  ({ size = 'md', resize, border, className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          styles.start,
          styles.textarea,
          className,
          'nlp--textarea',
          resize && styles[resize],
          size && styles[size],
          border && styles.bd_none,
        )}
        {...props}
      />
    );
  },
);

export const Textarea = TextareaComponent;
