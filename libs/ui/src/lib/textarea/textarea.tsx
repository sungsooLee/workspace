import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';

import { cn } from '@learnway/shared';

import { BaseFieldProps } from '../type';

import styles from './textarea.module.css';

export interface TextareaComponentProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  dummy?: any;
  className?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaComponentProps>(
  ({ className, ...props }, ref) => {
    const hasNoBorder = className?.includes('bd_none'); // border 없는 경우
    const resizeNone = className?.includes('resize_none'); // resize 없는 경우
    return (
      <textarea
        className={`${styles.start} ${styles.textarea} ${hasNoBorder ? styles.bd_none : ''} ${resizeNone ? styles.resize_none : ''} ${className}`}
        {...props}
      />
    );
  },
);

export const Textarea = TextareaComponent;
