import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';

import { cn } from '@learnway/shared';

import { BaseFieldProps } from '../type';

import styles from './textarea.module.scss';

export interface TextareaComponentProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  dummy?: any;
  className?: string;
}

const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaComponentProps>(
  ({ className, ...props }, ref,) => {
    return (
      <textarea className={cn(styles.start, className)} {...props} />
    );
  },
);

export const Textarea = TextareaComponent;
