import React, { forwardRef, PropsWithChildren } from 'react';

import { cn } from '@learnway/shared';

import { SelectOption } from '../type';
import styles from './badge.module.css';
import { Button } from '../button/button';

export interface BadgeComponentProps extends PropsWithChildren {
  option: SelectOption;
  variant?: 'dot' | 'number' | 'flag' | 'text';
  status?: 'primary' | 'disabled' | 'success' | 'warning' | 'caution' | 'new' | 'error' | 'ing';
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  className?: string;
  onClick?: (option: SelectOption) => void;
}

const BadgeComponent = forwardRef<HTMLElement, BadgeComponentProps>(
  ({ className, variant, size, status, onClick, option: { label, value }, ...props }, ref) => {
    const handleClick = (event: React.MouseEvent) => {
      const option: SelectOption = {
        label,
        value,
      };
      onClick?.(option);
    };

    return (
      <span
        {...props}
        ref={ref}
        className={cn(
          styles.start,
          styles.badge,
          className,
          'nlp--badge',
          variant && styles[variant],
          status && styles[status],
          size && styles[size],
        )}
        onClick={handleClick}
      >
        <Button className={cn(styles.label)} variant="text">
          {label}
        </Button>
      </span>
    );
  },
);

export const Badge = BadgeComponent;
