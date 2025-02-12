import React, { forwardRef, PropsWithChildren } from 'react';

import { cn } from '@learnway/shared';

import { SelectOption } from '../select/type';
import styles from './badge.module.css';
import { Button } from '../button/button';

export interface BadgeComponentProps extends PropsWithChildren {
  option: SelectOption;
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  className?: string;
  onClick?: (option: SelectOption) => void;
}

const BadgeComponent = forwardRef<HTMLElement, BadgeComponentProps>(
  ({ className, variant, size, onClick, option: { label, value }, ...props }) => {
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
        className={cn(styles.start, styles.badge, className, 'nlp--badge')}
        onClick={handleClick}>
        <Button className={cn(styles.label)}>{label}</Button>
      </span>
    );
  },
);

export const Badge = BadgeComponent;
