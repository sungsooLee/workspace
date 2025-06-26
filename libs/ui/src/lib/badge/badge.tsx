import React, { forwardRef, PropsWithChildren } from 'react';

import { cn } from '@learnway/shared';

import { SelectOption } from '../type';
import styles from './badge.module.css';
import { Button } from '../button/button';

export interface BadgeComponentProps extends PropsWithChildren {
  option: SelectOption;
  variant?: 'dot' | 'number' | 'flag' | 'text' | 'outline' | 'alpha';
  status?:
    | 'primary'
    | 'disabled'
    | 'success'
    | 'warning'
    | 'caution'
    | 'new'
    | 'error'
    | 'ing'
    | 'gray'
    | 'blue';
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  rounded?: boolean;
  labelType?: 'normal' | 'bold';
  className?: string;
  onClick?: (option: SelectOption) => void;
}

const BadgeComponent = forwardRef<HTMLElement, BadgeComponentProps>(
  (
    {
      className,
      variant,
      size,
      status,
      rounded,
      labelType,
      onClick,
      option: { label, value },
      ...props
    },
    ref,
  ) => {
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
          rounded && styles.rounded_full,
          variant && styles[variant],
          status && styles[status],
          size && styles[size],
          size,
        )}
        onClick={handleClick}
      >
        <Button className={cn(styles.label, labelType && styles[labelType])} variant="text">
          {label}
        </Button>
      </span>
    );
  },
);

export const Badge = BadgeComponent;
