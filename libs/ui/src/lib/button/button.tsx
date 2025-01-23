import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '@learnway/shared';

import styles from './button.module.scss';

export interface ButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'gray-outline'
    | 'ghost'
    | 'link'; // override from shadcn.button
  size?: 'xs' | 'sm' | 'md' | 'md-1' | 'lg' | 'icon'; // override from shadcn.button
  icon?: React.ReactNode;
  iconAlign?: 'left' | 'right';
  onlyIcon?: boolean;
  isLoading?: boolean;
  dummy?: boolean;
  className?: string;
}

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonComponentProps>(
  ({
    icon,
    iconAlign = 'left',
    onlyIcon = false,
    isLoading,
    disabled,
    children,
    className,
    ...props
  }) => {
    return (
      <button
        {...props}
        className={cn(styles.start, className, 'nlp--button')}
        disabled={disabled || isLoading}>
        {/* loading icon */}
        {isLoading && <Loader2 className="animate-spin" />}

        {/* left icon */}
        {iconAlign === 'left' && icon}

        {/* children */}
        {children}

        {/* right icon */}
        {iconAlign === 'right' && icon}
      </button>
    );
  },
);

export const Button = ButtonComponent;
